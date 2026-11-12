import React, { useEffect, useRef, useState } from 'react';
import type { SiteCopy, PartId } from '../content';
import { PARTS } from '../content';
import type { HomeCopy } from '../homeCopy';
import { href } from '../lib';
import { PartFragment } from '../Visuals';

/*
  "Six parts. One system." — a scroll set-piece (web-design-skills · field-io recipe:
  "section breaks where the page state transforms", "choreographed multi-element entries").

  Live (≥1024 wide, ≥640 tall, motion allowed): the section holds on screen for ~1.8 screens
  of scroll. The six parts start scattered in 3D space and lock one by one into a 2×3 grid;
  a readout counts the connected parts; a frame titled "Your system" draws around them;
  data pulses run between the panels; the headline's light moves from "Six parts." to
  "One system.".
  At rest (phones, reduced motion, no JS): the finished, assembled system.
*/

const TONE: Record<PartId, string> = {
  website: 'coral',
  booking: 'amber',
  crm: 'indigo',
  bots: 'teal',
  portal: 'sky',
  finance: 'magenta',
};

// where each part floats before it locks in (offset from its place in the grid)
const SCATTER: Record<PartId, { x: string; y: string; z: number; rx: number; ry: number; rz: number }> = {
  website: { x: '-6vw', y: '-62vh', z: -380, rx: 26, ry: 18, rz: -12 },
  booking: { x: '24vw', y: '-40vh', z: -260, rx: -22, ry: -30, rz: 12 },
  crm: { x: '4vw', y: '-4vh', z: -1300, rx: 14, ry: 34, rz: 8 },
  bots: { x: '32vw', y: '6vh', z: -340, rx: -16, ry: -38, rz: -10 },
  portal: { x: '-2vw', y: '60vh', z: -520, rx: -28, ry: 20, rz: -8 },
  finance: { x: '28vw', y: '46vh', z: -380, rx: 22, ry: -26, rz: 14 },
};

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const expo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));
// each part locks in during its own window of the scroll
const windowFor = (i: number) => [0.06 + i * 0.075, 0.36 + i * 0.075] as const;

function splitHeading(t: string): [string, string] {
  const k = t.indexOf('. ');
  return k > 0 ? [t.slice(0, k + 1), t.slice(k + 2)] : [t, ''];
}

export function PartsAssembly({ c, hc }: { c: SiteCopy; hc: HomeCopy }) {
  const ref = useRef<HTMLElement>(null);
  const [live, setLive] = useState(false);
  const [locked, setLocked] = useState(6);
  const [l1, l2] = splitHeading(c.home.partsH2);

  // decide live vs rest, and follow media changes
  useEffect(() => {
    const mqs = [
      window.matchMedia('(min-width: 1024px)'),
      window.matchMedia('(min-height: 640px)'),
      window.matchMedia('(prefers-reduced-motion: no-preference)'),
    ];
    const decide = () => setLive(mqs.every((m) => m.matches));
    decide();
    mqs.forEach((m) => m.addEventListener('change', decide));
    return () => mqs.forEach((m) => m.removeEventListener('change', decide));
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const cards = [...el.querySelectorAll<HTMLElement>('.asm__card')];
    if (!live) {
      el.style.setProperty('--p', '1');
      cards.forEach((card) => card.style.setProperty('--k', '1'));
      setLocked(6);
      return;
    }
    let raf = 0;
    let lastLocked = -1;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const run = el.offsetHeight - window.innerHeight;
      const p = clamp(-r.top / Math.max(1, run));
      el.style.setProperty('--p', p.toFixed(4));
      let n = 0;
      cards.forEach((card, i) => {
        const [a, b] = windowFor(i);
        const k = expo(clamp((p - a) / (b - a)));
        card.style.setProperty('--k', k.toFixed(4));
        if (k > 0.985) {
          n++;
          card.classList.add('is-locked');
        } else card.classList.remove('is-locked');
      });
      if (n !== lastLocked) {
        lastLocked = n;
        setLocked(n);
      }
      el.classList.toggle('is-whole', p > 0.8);
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', on);
      window.removeEventListener('resize', on);
    };
  }, [live]);

  return (
    <section
      ref={ref}
      className={`asm${live ? ' is-live' : ' is-whole'}`}
      id="parts"
      aria-labelledby="parts-title"
    >
      <div className="asm__stage">
        <div className="wrap asm__grid">
          <div className="asm__copy">
            <h2 id="parts-title" className="asm__title">
              <span className="asm__l1">{l1}</span> <span className="asm__l2">{l2}</span>
            </h2>
            <p className="lead">{c.home.partsLead}</p>
            <div className="asm__hud" aria-hidden="true">
              <div className="asm__count num">
                <b>{locked}</b>
                <span>/6</span>
              </div>
              <div className="asm__meter">
                <span className="asm__meter-label">{hc.asm.connected}</span>
                <span className="asm__ticks">
                  {PARTS.map((p, i) => (
                    <i key={p.id} className={i < locked ? 'is-on' : undefined} data-tone={TONE[p.id]} />
                  ))}
                </span>
                <span className="asm__synced">{hc.asm.synced}</span>
              </div>
            </div>
          </div>

          <div className="asm__sys">
            <div className="asm__frame" aria-hidden="true">
              <div className="asm__bar">
                <span className="asm__dots">
                  <i />
                  <i />
                  <i />
                </span>
                <span className="asm__name">{hc.asm.system}</span>
                <span className="asm__live">
                  <i />
                  {hc.asm.live}
                </span>
              </div>
            </div>
            <div className="asm__cards">
              {PARTS.map((p) => {
                const pc = c.parts[p.id];
                const s = SCATTER[p.id];
                return (
                  <a
                    key={p.id}
                    className="card card--tone asm__card"
                    data-tone={TONE[p.id]}
                    data-spotlight=""
                    href={href('systems')}
                    style={
                      {
                        '--sx': s.x,
                        '--sy': s.y,
                        '--sz': `${s.z}px`,
                        '--rx': `${s.rx}deg`,
                        '--ry': `${s.ry}deg`,
                        '--rz': `${s.rz}deg`,
                      } as React.CSSProperties
                    }
                  >
                    <PartFragment id={p.id} c={c} />
                    <span className="card__label">
                      <span className="card__dot" />
                      {pc.name}
                    </span>
                    <h3 className="h3">{pc.title}</h3>
                    <p className="asm__body">{pc.body}</p>
                  </a>
                );
              })}
            </div>
            <div className="asm__links" aria-hidden="true">
              {['h1', 'h2', 'h3', 'v1', 'v2', 'v3', 'v4'].map((k, i) => (
                <i key={k} className={`asm__link asm__link--${k}`} style={{ ['--d' as string]: `${i * 0.42}s` }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
