import { useEffect } from 'react';

/*
  Site-wide motion layer (web-design-skills · field-io recipe).
  Everything here is progressive: content is complete and visible without it, and
  prefers-reduced-motion turns it off.
*/

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- 1. Headings decode from random glyphs into the real words ---------- */
const LATIN = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789#%&*+/<>';
const CYR = 'БГДЖЗИЛПФЦЧШЩЭЮЯ0123456789#%&*+/';
const HEB = 'אבגדהוזחטיכלמנסעפצקרשת0123456789#';
const poolFor = (ch: string) => (/[֐-׿]/.test(ch) ? HEB : /[Ѐ-ӿ]/.test(ch) ? CYR : LATIN);

export function decode(el: HTMLElement) {
  const node = el.firstChild;
  if (!node || node.nodeType !== Node.TEXT_NODE || el.childElementCount > 0) return;
  const final = node.nodeValue || '';
  if (!final.trim()) return;
  const dur = Math.min(1300, 500 + final.length * 18);
  const reveal = [...final].map((_, i) => (i / final.length) * 0.65 * dur + Math.random() * 0.35 * dur);
  el.setAttribute('aria-label', final);
  el.style.minHeight = `${el.getBoundingClientRect().height}px`;
  el.classList.add('is-decoding');
  const t0 = performance.now();
  let last = 0;
  const tick = (now: number) => {
    const t = now - t0;
    if (t - last > 45 || t >= dur) {
      last = t;
      let out = '';
      for (let i = 0; i < final.length; i++) {
        const ch = final[i];
        if (ch === ' ' || t >= reveal[i]) out += ch;
        else {
          const pool = poolFor(ch);
          out += pool[(Math.random() * pool.length) | 0];
        }
      }
      node.nodeValue = out;
    }
    if (t < dur) requestAnimationFrame(tick);
    else {
      node.nodeValue = final;
      el.style.minHeight = '';
      el.classList.remove('is-decoding');
      el.removeAttribute('aria-label');
    }
  };
  requestAnimationFrame(tick);
}

/* ---------- 2. Elements that enter once, in a choreographed stagger ---------- */
/* ---------- 3. Scroll-linked custom property --p (0 → 1) on [data-scroll-var] ---------- */
/* ---------- 4. Cursor spotlight on [data-spotlight] cards ---------- */

export function useMotion(rootId: string, key: string) {
  useEffect(() => {
    const root = document.getElementById(rootId);
    if (!root) return;
    if (reduced()) {
      root.querySelectorAll('[data-enter-group]').forEach((g) => g.classList.add('is-in'));
      return;
    }
    const cleanups: (() => void)[] = [];

    // headings: every section and page heading outside the kit's own moments and scenes
    const heads = [...root.querySelectorAll<HTMLElement>('h2.h2, h1.h1')].filter(
      (h) => !h.closest('[data-moment], [data-big-scene]') && h.childElementCount === 0,
    );
    const ioHead = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            ioHead.unobserve(e.target);
            decode(e.target as HTMLElement);
          }
        }),
      { threshold: 0.6 },
    );
    heads.forEach((h) => ioHead.observe(h));
    cleanups.push(() => ioHead.disconnect());

    // choreographed groups
    const groups = root.querySelectorAll<HTMLElement>('[data-enter-group]');
    const ioGroup = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            ioGroup.unobserve(e.target);
          }
        }),
      { threshold: 0.12 },
    );
    groups.forEach((g) => {
      [...g.children].forEach((c, i) => (c as HTMLElement).style.setProperty('--i', String(i)));
      ioGroup.observe(g);
    });
    cleanups.push(() => ioGroup.disconnect());

    // scroll-linked variables
    const vars = [...root.querySelectorAll<HTMLElement>('[data-scroll-var]')];
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      for (const el of vars) {
        const r = el.getBoundingClientRect();
        // 0 when the element's top enters the bottom of the screen, 1 when it reaches 30% from the top
        const p = Math.min(1, Math.max(0, (vh - r.top) / (vh * 0.7)));
        el.style.setProperty('--p', p.toFixed(3));
        if (p > 0.55) el.classList.add('is-seen');
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    if (vars.length) {
      update();
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll);
      cleanups.push(() => {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
        cancelAnimationFrame(raf);
      });
    }

    // spotlight cards
    const onPointer = (e: PointerEvent) => {
      const card = (e.target as HTMLElement | null)?.closest?.('[data-spotlight]') as HTMLElement | null;
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    };
    root.addEventListener('pointermove', onPointer, { passive: true });
    cleanups.push(() => root.removeEventListener('pointermove', onPointer));

    return () => cleanups.forEach((f) => f());
  }, [rootId, key]);
}

/* ---------- 5. Scroll progress line under the nav ---------- */
export function useScrollProgress() {
  useEffect(() => {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    const ro = new ResizeObserver(on);
    ro.observe(document.body);
    return () => {
      window.removeEventListener('scroll', on);
      window.removeEventListener('resize', on);
      ro.disconnect();
    };
  }, []);
}
