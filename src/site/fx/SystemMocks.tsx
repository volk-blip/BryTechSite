import React, { useEffect, useRef, useState } from 'react';
import {
  BarChart3,
  Bot,
  CalendarDays,
  CreditCard,
  Globe,
  Inbox,
  LayoutGrid,
  Mic,
  Package,
  Search,
  Sparkles,
  UserCog,
  Users,
} from 'lucide-react';
import type { SiteCopy } from '../content';
import type { MockCopy, Src } from '../mockCopy';

/*
  Product mockups that show an advanced, integrated system (illustrative UI, not data):
  - <Dashboard>  full operations view (sidebar + connected apps, KPIs with sparklines, a resource
                 timeline coloured by the channel each booking came from, an AI bar, a live feed)
  - <LiveOps>    the hero's live-operations panel, fed by a rail of real app icons
  Every loop runs only on screen and rests under reduced motion.
*/

const reduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const SRC_NAME: Record<Src, string> = {
  whatsapp: 'WhatsApp',
  instagram: 'Instagram',
  telegram: 'Telegram',
  stripe: 'Stripe',
  website: 'Website',
  sheets: 'Google Sheets',
};

export function AppIcon({ src, size = 18 }: { src: Src; size?: number }) {
  if (src === 'website') return <Globe className="appic appic--web" width={size} height={size} aria-hidden="true" />;
  const file = { whatsapp: 'whatsapp', instagram: 'instagram', telegram: 'telegram', stripe: 'stripe', sheets: 'google-sheets' }[src];
  return (
    <img
      className={`appic appic--${src}${src === 'instagram' ? ' ic-ink' : ''}`}
      src={`/icons/${file}.svg`}
      alt=""
      width={size}
      height={size}
    />
  );
}

/** Rotates a list on a timer while the element is on screen. */
function useOnScreen<T extends Element>(ref: React.RefObject<T | null>) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOn(e.isIntersecting), { rootMargin: '100px' });
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
  return on;
}

export function useFeed<T>(items: T[], every = 2600, active = true) {
  const [head, setHead] = useState(0);
  useEffect(() => {
    if (!active || reduced()) return;
    const t = window.setInterval(() => setHead((h) => (h + 1) % items.length), every);
    return () => clearInterval(t);
  }, [items.length, every, active]);
  // newest first
  return { head, list: items.map((_, i) => items[(head - i + items.length * 2) % items.length]) };
}

/** Types a question, then shows the answer chip; repeats while on screen. */
function useTyping(text: string, active: boolean) {
  const [n, setN] = useState(text.length);
  const [answered, setAnswered] = useState(true);
  useEffect(() => {
    if (!active || reduced()) {
      setN(text.length);
      setAnswered(true);
      return;
    }
    let i = 0;
    let t = 0;
    const timers: number[] = [];
    const step = () => {
      setAnswered(false);
      i = 0;
      const type = () => {
        i++;
        setN(i);
        if (i < text.length) timers.push(window.setTimeout(type, 38));
        else timers.push(window.setTimeout(() => setAnswered(true), 500));
      };
      type();
    };
    step();
    t = window.setInterval(step, text.length * 38 + 4200);
    return () => {
      clearInterval(t);
      timers.forEach(clearTimeout);
    };
  }, [text, active]);
  return { typed: text.slice(0, n), answered, typing: n < text.length };
}

function Spark({ points, tone }: { points: number[]; tone: string }) {
  const w = 120, h = 34;
  const max = Math.max(...points), min = Math.min(...points);
  const xy = points.map((p, i) => [(i / (points.length - 1)) * w, h - ((p - min) / Math.max(1, max - min)) * (h - 4) - 2]);
  const d = xy.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
  return (
    <svg className="spark" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id={`sg-${tone}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={`var(--${tone})`} stopOpacity="0.35" />
          <stop offset="1" stopColor={`var(--${tone})`} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${d} L${w},${h} L0,${h} Z`} fill={`url(#sg-${tone})`} />
      <path className="spark__line" d={d} fill="none" stroke={`var(--${tone})`} strokeWidth="1.8" />
    </svg>
  );
}

function Feed({ m, active, limit, onHead }: { m: MockCopy; active: boolean; limit: number; onHead?: (s: Src) => void }) {
  const { head, list } = useFeed(m.events, 2600, active);
  useEffect(() => {
    onHead?.(list[0].src);
  }, [head]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <ol className="feed">
      {list.slice(0, limit).map((e, i) => (
        <li key={`${e.src}-${head}-${i}`} className={`feed__item${i === 0 ? ' is-new' : ''}`} data-src={e.src}>
          <span className="feed__ic">
            <AppIcon src={e.src} />
          </span>
          <span className="feed__text">{e.text}</span>
          <span className="feed__to">→ {e.to}</span>
        </li>
      ))}
    </ol>
  );
}

function AskBar({ m, active }: { m: MockCopy; active: boolean }) {
  const { typed, answered, typing } = useTyping(m.ask, active);
  return (
    <div className="askbar">
      <Sparkles className="askbar__spark" aria-hidden="true" />
      <span className="askbar__q">
        {typed}
        {typing && <i className="caret" />}
      </span>
      <span className={`askbar__a${answered ? ' is-on' : ''}`}>
        <b>{m.answer}</b>
        <span className="askbar__btn">
          <AppIcon src="whatsapp" size={14} />
          {m.answerAction}
        </span>
      </span>
      <Mic className="askbar__mic" aria-hidden="true" />
    </div>
  );
}

/* ------------------------------------------------------------------ the full dashboard */

const NAV_ICONS = [LayoutGrid, CalendarDays, Users, Inbox, CreditCard, UserCog, Package, BarChart3, Bot];
const APPS: Src[] = ['whatsapp', 'instagram', 'telegram', 'stripe', 'sheets'];
// bookings on the timeline: [room, start hour, length, source, name index]
const BLOCKS: [number, number, number, Src, number][] = [
  [0, 9.5, 1, 'website', 0],
  [0, 13, 1, 'instagram', 2],
  [0, 15.5, 1, 'telegram', 3],
  [1, 9, 1, 'whatsapp', 3],
  [1, 10.5, 1.5, 'stripe', 2],
  [1, 14, 1, 'website', 3],
  [1, 16, 1, 'whatsapp', 0],
  [2, 10, 1, 'instagram', 1],
  [2, 12.5, 1, 'website', 0],
  [2, 15, 1, 'telegram', 1],
  [3, 9.5, 0.5, 'whatsapp', 1],
  [3, 13.5, 1, 'website', 2],
  [3, 16, 0.5, 'telegram', 3],
];
const H0 = 9, H1 = 17;

export function Dashboard({ c, m }: { c: SiteCopy; m: MockCopy }) {
  const ref = useRef<HTMLDivElement>(null);
  const on = useOnScreen(ref);
  const names = c.mock.rows.map((r) => r.name);
  return (
    <div ref={ref} className="dash" role="img" aria-label={`${m.company}: ${m.kpis.map((k) => `${k.k} ${k.v}`).join(', ')}`}>
      <aside className="dash__side" aria-hidden="true">
        <div className="dash__brand">
          <i />
          {m.company}
        </div>
        <nav className="dash__nav">
          {m.nav.map((label, i) => {
            const Icon = NAV_ICONS[i];
            return (
              <span key={label} className={`dash__item${i === 0 ? ' is-active' : ''}`}>
                <Icon />
                {label}
                {i === 3 && <b className="dash__badge">3</b>}
              </span>
            );
          })}
        </nav>
        <div className="dash__apps">
          <span className="dash__apps-title">{m.apps}</span>
          {APPS.map((a) => (
            <span key={a} className="dash__app">
              <AppIcon src={a} size={16} />
              {SRC_NAME[a]}
              <span className="dash__sync">
                <i />
                {m.synced}
              </span>
            </span>
          ))}
        </div>
      </aside>

      <div className="dash__main" aria-hidden="true">
        <div className="dash__top">
          <strong>{c.mock.today}</strong>
          <span className="dash__search">
            <Search />
            {m.search}
          </span>
          <span className="livechip">
            <i />
            {m.live}
          </span>
        </div>

        <div className="dash__kpis">
          <div className="kpi">
            <span>{m.kpis[0].k}</span>
            <b>{m.kpis[0].v}</b>
            <em className="up">{m.kpis[0].d}</em>
            <Spark points={[4, 6, 5, 9, 8, 12, 14, 13, 18]} tone="coral" />
          </div>
          <div className="kpi">
            <span>{m.kpis[1].k}</span>
            <b>{m.kpis[1].v}</b>
            <em className="up">{m.kpis[1].d}</em>
            <Spark points={[3, 5, 4, 7, 6, 9, 8, 12, 13]} tone="teal" />
          </div>
          <div className="kpi">
            <span>{m.kpis[2].k}</span>
            <b>{m.kpis[2].v}</b>
            <em>{m.kpis[2].d}</em>
            <div className="chanbar">
              <i style={{ flex: 3, background: 'var(--magenta)' }} />
              <i style={{ flex: 2, background: '#25d366' }} />
              <i style={{ flex: 2, background: 'var(--coral)' }} />
            </div>
          </div>
          <div className="kpi">
            <span>{m.kpis[3].k}</span>
            <b>{m.kpis[3].v}</b>
            <em>{m.kpis[3].d}</em>
            <div className="ring">
              <i />
            </div>
          </div>
        </div>

        <div className="sched">
          <div className="sched__head">
            <strong>{m.schedule}</strong>
            <span className="sched__legend">
              {(['whatsapp', 'instagram', 'website', 'telegram', 'stripe'] as Src[]).map((s) => (
                <span key={s} data-src={s}>
                  <i />
                  {SRC_NAME[s]}
                </span>
              ))}
            </span>
          </div>
          <div className="sched__grid">
            <div className="sched__hours">
              {Array.from({ length: H1 - H0 + 1 }).map((_, i) => (
                <span key={i} style={{ left: `${(i / (H1 - H0)) * 100}%` }}>
                  {String(H0 + i).padStart(2, '0')}:00
                </span>
              ))}
            </div>
            {m.rooms.map((room, r) => (
              <div key={room} className="sched__row">
                <span className="sched__room">{room}</span>
                <div className="sched__lane">
                  {BLOCKS.filter((b) => b[0] === r).map(([, s, len, src, ni], k) => (
                    <span
                      key={k}
                      className={`blk${src === 'stripe' ? ' blk--paid' : ''}`}
                      data-src={src}
                      style={{ left: `${((s - H0) / (H1 - H0)) * 100}%`, width: `${(len / (H1 - H0)) * 100}%` }}
                    >
                      <AppIcon src={src} size={12} />
                      {names[ni]}
                    </span>
                  ))}
                </div>
              </div>
            ))}
            <div className="sched__now" style={{ left: `calc(84px + (100% - 84px) * ${(11.7 - H0) / (H1 - H0)})` }}>
              <span>{m.now}</span>
            </div>
          </div>
        </div>

        <AskBar m={m} active={on} />
      </div>

      <aside className="dash__feed" aria-hidden="true">
        <div className="dash__feed-head">
          <strong>{m.feed}</strong>
          <span className="livechip">
            <i />
            {m.live}
          </span>
        </div>
        <Feed m={m} active={on} limit={6} />
      </aside>
    </div>
  );
}

/* ------------------------------------------------------------------ the hero's live panel + rail */

export function LiveOps({ c, m }: { c: SiteCopy; m: MockCopy }) {
  const ref = useRef<HTMLDivElement>(null);
  const on = useOnScreen(ref);
  const [ping, setPing] = useState<Src>('whatsapp');
  const rail: Src[] = ['whatsapp', 'instagram', 'website', 'telegram', 'stripe', 'sheets'];
  return (
    <div ref={ref} className="ops-wrap" role="img" aria-label={`${m.feed}: ${m.events.map((e) => e.text).join('; ')}`}>
      <div className="rail" aria-hidden="true">
        {rail.map((s, i) => (
          <span key={s} className={`rail__node${ping === s ? ' is-ping' : ''}`} data-src={s} style={{ ['--i' as string]: i }}>
            <AppIcon src={s} size={20} />
            <i className="rail__wire">
              <b />
            </i>
          </span>
        ))}
      </div>
      <div className="ops" aria-hidden="true">
        <div className="ops__head">
          <span className="dash__brand">
            <i />
            {m.company}
          </span>
          <span className="livechip">
            <i />
            {m.live}
          </span>
        </div>
        <div className="ops__kpis">
          <div className="kpi">
            <span>{m.kpis[0].k}</span>
            <b>{m.kpis[0].v}</b>
            <Spark points={[4, 6, 5, 9, 8, 12, 14, 13, 18]} tone="coral" />
          </div>
          <div className="kpi">
            <span>{m.kpis[1].k}</span>
            <b>{m.kpis[1].v}</b>
            <Spark points={[3, 5, 4, 7, 6, 9, 8, 12, 13]} tone="teal" />
          </div>
          <div className="kpi">
            <span>{m.kpis[2].k}</span>
            <b>{m.kpis[2].v}</b>
            <div className="chanbar">
              <i style={{ flex: 3, background: 'var(--magenta)' }} />
              <i style={{ flex: 2, background: '#25d366' }} />
              <i style={{ flex: 2, background: 'var(--coral)' }} />
            </div>
          </div>
        </div>
        <div className="ops__feed">
          <div className="dash__feed-head">
            <strong>{m.feed}</strong>
            <span className="ops__sub">{c.mock.count}</span>
          </div>
          <Feed m={m} active={on} limit={6} onHead={setPing} />
        </div>
        <AskBar m={m} active={on} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ the hero's compact console */
export function ConsoleCard({ m }: { m: MockCopy }) {
  const ref = useRef<HTMLDivElement>(null);
  const on = useOnScreen(ref);
  return (
    <div ref={ref} className="console" role="img" aria-label={`${m.feed}: ${m.events.map((e) => e.text).join('; ')}`}>
      <div className="dash__feed-head" aria-hidden="true">
        <strong>{m.feed}</strong>
        <span className="livechip">
          <i />
          {m.live}
        </span>
      </div>
      <div aria-hidden="true">
        <Feed m={m} active={on} limit={3} />
      </div>
    </div>
  );
}
