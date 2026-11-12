import { useEffect } from 'react';

/*
  Phone & tablet scroll layer (web-design-skills · field-io recipe: "scroll-driven not just for parallax
  but for state changes", "choreographed multi-element entries"). Under 1024px, with motion allowed:

  - [data-scrub] blocks: each one is scrubbed by its own position — it rises, un-tilts, sharpens and
    reaches full opacity as it travels from the bottom of the screen to ~55% height (CSS reads --q).
    Blocks are picked automatically (cards, rows, figures, photos, form, FAQ ...).
  - the hero folds away as you scroll past it (--out on .hero / .about-hero / .page-head).
  - pinned-chapters at rest: each step's line fills as you read it (--s on .mo-pc__step).
  - photographs drift inside their frames (--par on .photo / .founder__photo / .person__photo).

  Everything is a CSS custom property set in one rAF loop for the elements on screen only.
  Desktop keeps its own choreography; reduced motion turns this off.
*/

const PICK = [
  '.section__head',
  '.card:not(.asm__card)',
  '.part-row',
  '.fig',
  '.factstrip li',
  '.principles2 li',
  '.opt',
  '.preset',
  '.summary',
  '.faq details',
  '.channel',
  '.form',
  '.vframe',
  '.panel--diagram',
  '.photos .photo',
  '.split__text > *',
  '.founder__text > *',
  '.mo-pc__visual',
  '.closing__cta > *:not(.aurora)',
  '.foot__col',
  '.ticks li',
  '.factstrip li',
].join(',');

export function useMobileScroll(rootId: string, key: string) {
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)');
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!mq.matches || rm.matches) return;
    const root = document.getElementById(rootId);
    if (!root) return;
    const doc = document.documentElement;
    doc.classList.add('m-scroll');

    // pick the blocks (and the page's closing section, which lives outside main)
    const scope = [root, document.querySelector('.closing')].filter(Boolean) as Element[];
    const blocks = scope.flatMap((s) =>
      [...s.querySelectorAll<HTMLElement>(PICK)].filter(
        (el) =>
          !el.closest('[data-big-scene], .asm, .dash, .ops, [aria-hidden="true"], [data-moment="iris-opens"], [data-moment="line-carries-colour"], [data-moment="letters-assemble"]') &&
          !el.parentElement?.closest('[data-scrub]'),
      ),
    );
    blocks.forEach((el, i) => {
      el.setAttribute('data-scrub', '');
      // alternate the tilt direction for a bit of rhythm
      el.style.setProperty('--tilt', i % 2 ? '1' : '-1');
    });
    // entry groups on phones are scrubbed instead of played once
    root.querySelectorAll('[data-enter-group]').forEach((g) => g.classList.add('is-in'));

    const heroes = [...root.querySelectorAll<HTMLElement>('.hero, .about-hero, .page-head')];
    const steps = [...root.querySelectorAll<HTMLElement>('[data-moment="pinned-chapters"] .mo-pc__step')];
    const photos = [...root.querySelectorAll<HTMLElement>('.photo, .founder__photo, .person__photo')];

    // track what is on screen so the loop stays cheap
    const live = new Set<HTMLElement>();
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          const el = e.target as HTMLElement;
          if (e.isIntersecting) live.add(el);
          else {
            live.delete(el);
            // left through the top: it is fully revealed
            if (e.boundingClientRect.top < 0 && el.hasAttribute('data-scrub')) el.style.setProperty('--q', '1');
          }
        }),
      { rootMargin: '20% 0px 20% 0px' },
    );
    [...blocks, ...heroes, ...steps, ...photos].forEach((el) => io.observe(el));

    let raf = 0;
    const clamp = (v: number) => Math.min(1, Math.max(0, v));
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      for (const el of live) {
        const r = el.getBoundingClientRect();
        if (el.hasAttribute('data-scrub')) {
          // 0 when the top touches the bottom edge, 1 when it reaches 55% of the screen
          const q = clamp((vh - r.top) / (vh * 0.45));
          el.style.setProperty('--q', q.toFixed(3));
        }
        if (heroes.includes(el)) {
          el.style.setProperty('--out', clamp(-r.top / (r.height * 0.85)).toFixed(3));
        }
        if (steps.includes(el)) {
          el.style.setProperty('--s', clamp((vh * 0.8 - r.top) / Math.max(1, r.height)).toFixed(3));
        }
        if (photos.includes(el)) {
          // -1 below, 0 centred, +1 above
          const c = (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2);
          el.style.setProperty('--par', Math.max(-1, Math.min(1, c)).toFixed(3));
        }
      }
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    // first paint: everything already in view starts finished
    requestAnimationFrame(() => {
      blocks.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.55) el.style.setProperty('--q', '1');
      });
      update();
    });
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('scroll', on);
      window.removeEventListener('resize', on);
      doc.classList.remove('m-scroll');
    };
  }, [rootId, key]);
}
