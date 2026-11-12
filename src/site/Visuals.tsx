import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { CalendarDays, Check, CreditCard, Inbox, LayoutGrid, Mic, Pause, Play, Users } from 'lucide-react';
import type { SiteCopy, PartId } from './content';
import type { JourneyCopy } from './journey';

const NAV_ICONS = [LayoutGrid, CalendarDays, Users, Inbox, CreditCard];

/** Live HTML mock of a BryTech-built system: schedule + WhatsApp bot + AI ask bar. */
export function ProductFrame({ c, variant = 'full', fixed = false }: { c: SiteCopy; variant?: 'full' | 'window'; fixed?: boolean }) {
  const m = c.mock;
  return (
    <div
      className={`app${fixed ? ' app--fixed' : ' app--fluid'}${variant === 'window' ? ' app--window' : ''}`}
      role="img"
      aria-label={`${m.company}: ${m.today}, ${m.count}`}
    >
      <aside className="app__side" aria-hidden="true">
        <div className="app__brand">
          <i />
          {m.company}
        </div>
        {m.nav.map((label, i) => {
          const Icon = NAV_ICONS[i];
          return (
            <div key={label} className={`app__item${i === 0 ? ' is-active' : ''}`}>
              <Icon />
              {label}
              {i === 3 && <span className="app__badge">3</span>}
            </div>
          );
        })}
      </aside>

      <div className="app__main" aria-hidden="true">
        <div className="app__bar">
          <div>
            <div className="app__title">{m.today}</div>
            <small style={{ color: 'var(--text-2)' }}>{m.count}</small>
          </div>
          <div className="app__stats">
            {m.stats.map((s) => (
              <div key={s.k} className="app__stat">
                <b className="num">{s.v}</b>
                <span>{s.k}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="app__rows">
          {m.rows.map((r) => (
            <div key={r.time} className="app__row">
              <time>{r.time}</time>
              <div>
                <strong>{r.name}</strong>
                <small>
                  {r.what} · {r.room}
                </small>
              </div>
              <span className={`pill pill--${r.tone}`}>{r.status}</span>
            </div>
          ))}
        </div>
        <div className="app__ask">
          <span className="dot" />
          {m.ask}
          <Mic />
        </div>
      </div>

      {variant === 'full' && (
      <aside className="app__chat" aria-hidden="true">
        <div className="app__chat-head">
          <img src="/icons/whatsapp.svg" alt="" width={22} height={22} />
          {m.chatTitle}
        </div>
        {m.chat.map((b, i) => (
          <div key={i} className={`bubble bubble--${b.from}`}>
            {b.from === 'bot' && <span className="bubble__tag">{m.bot}</span>}
            {b.text}
          </div>
        ))}
      </aside>
      )}
    </div>
  );
}

/** Renders children at a fixed design size and scales them to cover the parent, like a screenshot. */
export function Scaled({ w, h, children }: { w: number; h: number; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [s, setS] = useState(0.5);
  useLayoutEffect(() => {
    const el = ref.current?.parentElement;
    if (!el) return;
    // layout size, not getBoundingClientRect: the scene scales the device with a transform
    const fit = () => {
      const pw = el.clientWidth, ph = el.clientHeight;
      if (pw && ph) setS(Math.max(pw / w, ph / h));
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, [w, h]);
  return (
    <div ref={ref} className="scaled" style={{ width: w, height: h, transform: `scale(${s})` }}>
      {children}
    </div>
  );
}

const still = () =>
  typeof window !== 'undefined' &&
  (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.matchMedia('(max-width: 639px)').matches);

/**
 * The hero's small result card. Shows finished first, holds, then its three steps arrive 0.7 s apart
 * and it holds again (a 4 s cycle). Restarts when the pointer enters; pause button; still on a phone.
 */
export function BotLoop({ j }: { j: JourneyCopy }) {
  const [shown, setShown] = useState(3);
  const [paused, setPaused] = useState(false);
  const [run, setRun] = useState(0);
  useEffect(() => {
    if (paused || still()) {
      setShown(3);
      return;
    }
    const timers: number[] = [];
    const at = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms));
    const cycle = (t0: number) => {
      at(t0 + 1800, () => setShown(0));
      at(t0 + 2100, () => setShown(1));
      at(t0 + 2800, () => setShown(2));
      at(t0 + 3500, () => setShown(3));
    };
    for (let k = 0; k < 4; k++) cycle(k * 4000); // four rounds, then it rests finished
    return () => timers.forEach(clearTimeout);
  }, [paused, run]);
  return (
    <div className="botcard" onPointerEnter={() => !paused && setRun((r) => r + 1)}>
      <div className="botcard__head">
        <img src="/icons/whatsapp.svg" alt="" width={20} height={20} />
        <span>{j.loop.title}</span>
        <button
          type="button"
          className="pause"
          aria-label={paused ? j.play : j.pause}
          aria-pressed={paused}
          onClick={() => setPaused((p) => !p)}
        >
          {paused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}
        </button>
      </div>
      <ol className="botcard__steps">
        {j.loop.steps.map((t, i) => (
          <li key={t} className={i < shown ? 'is-on' : undefined}>
            <span className={`tick${i === 2 ? ' tick--done' : ''}`} aria-hidden="true">
              <Check />
            </span>
            {t}
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Pinned-chapters step 2: the build, as the client sees it in the client area. */
export function BuildWindow({ c, j }: { c: SiteCopy; j: JourneyCopy }) {
  const rows: [PartId, number][] = [
    ['website', 100],
    ['booking', 100],
    ['crm', 72],
    ['bots', 40],
  ];
  return (
    <div className="mini" aria-hidden="true">
      <div className="mini__head">
        <strong>{j.build.title}</strong>
        <span className="pill pill--ok">{j.build.note}</span>
      </div>
      {rows.map(([id, pct]) => (
        <div key={id} className="mini__row">
          <div className="line-row">
            <span>{c.parts[id].name}</span>
            <small className="num">{pct}%</small>
          </div>
          <div className="bar bar--still">
            <i style={{ width: `${pct}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

/** Pinned-chapters step 3: the handover. */
export function OwnWindow({ j }: { j: JourneyCopy }) {
  return (
    <div className="mini" aria-hidden="true">
      <div className="mini__head">
        <strong>{j.own.title}</strong>
      </div>
      {j.own.items.map((t) => (
        <div key={t} className="mini__check">
          <span className="tick tick--done">
            <Check />
          </span>
          {t}
        </div>
      ))}
      <div className="mini__fee">
        <span>{j.own.fees}</span>
        <b className="num">$0</b>
      </div>
    </div>
  );
}

/** Small UI fragment shown at the top of each part card. */
export function PartFragment({ id, c }: { id: PartId; c: SiteCopy }) {
  const f = c.frag;
  switch (id) {
    case 'website':
      return (
        <div className="frag" aria-hidden="true">
          <span className="frag__label">{f.pickTime}</span>
          <div className="slots">
            <span className="slot">09:30</span>
            <span className="slot is-on">11:00</span>
            <span className="slot">12:30</span>
            <span className="slot">15:00</span>
          </div>
        </div>
      );
    case 'booking':
      return (
        <div className="frag" aria-hidden="true">
          <span className="frag__label">{f.week}</span>
          <div className="week">
            {Array.from({ length: 15 }).map((_, i) => (
              <span key={i} className={i === 7 ? 'is-hot' : undefined} />
            ))}
          </div>
        </div>
      );
    case 'crm':
      return (
        <div className="frag" aria-hidden="true">
          <div className="who">
            <span className="who__av">AK</span>
            <div>
              <strong>{c.mock.rows[0].name}</strong>
              <small>
                {f.visits} · {f.vip}
              </small>
            </div>
          </div>
          <div className="who">
            <span className="who__av" style={{ background: 'var(--raised)' }}>
              ML
            </span>
            <div>
              <strong>{c.mock.rows[1].name}</strong>
              <small>{c.mock.rows[1].what}</small>
            </div>
          </div>
        </div>
      );
    case 'bots':
      return (
        <div className="frag" aria-hidden="true" style={{ justifyContent: 'flex-end' }}>
          <div className="bubble bubble--bot" style={{ animation: 'none', maxWidth: '92%' }}>
            {f.botHi}
          </div>
          <div className="bubble bubble--client" style={{ animation: 'none' }}>
            {f.clientHi}
          </div>
        </div>
      );
    case 'portal':
      return (
        <div className="frag" aria-hidden="true">
          <div className="line-row">
            <span>{f.progress}</span>
            <small className="num">72%</small>
          </div>
          <div className="bar">
            <i />
          </div>
          <div className="line-row" style={{ marginTop: 6 }}>
            <span>{f.contract}</span>
            <small>PDF</small>
          </div>
        </div>
      );
    case 'finance':
      return (
        <div className="frag" aria-hidden="true">
          <div className="line-row">
            <span>{f.invoice}</span>
            <span className="pill pill--ok">{f.paid}</span>
          </div>
          <div className="line-row">
            <small>{f.commission}</small>
            <span className="num">$84</span>
          </div>
        </div>
      );
  }
}

/** A living colour field: soft blobs of the brand spectrum drifting slowly (CSS transforms only, no WebGL). */
export function Aurora({ variant = 'hero' }: { variant?: 'hero' | 'close' | 'soft' }) {
  return (
    <div className={`aurora aurora--${variant}`} aria-hidden="true">
      <i className="a1" />
      <i className="a2" />
      <i className="a3" />
      <i className="a4" />
      <i className="a5" />
    </div>
  );
}

/** Live notifications that float in around the hero window, one after another. */
export function FloatChips({ items }: { items: [string, string, string] }) {
  const tones = ['teal', 'magenta', 'amber'];
  return (
    <div className="floats" aria-hidden="true">
      {items.map((t, i) => (
        <span key={t} className={`float float--${i + 1} float--${tones[i]}`}>
          <span className="float__dot" />
          {t}
        </span>
      ))}
    </div>
  );
}

/** Pinned-chapters step 1: the workflow mapped on the first call. */
export function WorkflowMap({ title, steps }: { title: string; steps: [string, string, string, string] }) {
  return (
    <div className="mini mini--map" aria-hidden="true">
      <div className="mini__head">
        <strong>{title}</strong>
      </div>
      <ol className="flowmap">
        {steps.map((s, i) => (
          <li key={s} style={{ ['--i' as string]: i }}>
            <span className="flowmap__n num">{i + 1}</span>
            {s}
          </li>
        ))}
      </ol>
    </div>
  );
}

/** A taste-skill diagram; the kit mounts it (src/site/kit.ts). Memo: the kit rewrites its DOM. */
export const Diagram = React.memo(({ spec, className }: { spec: object; className?: string }) => (
  <div className={`dg ${className || ''}`} data-diagram="" data-icon-base="/icons/">
    <script type="application/json" dangerouslySetInnerHTML={{ __html: JSON.stringify(spec) }} />
  </div>
));
