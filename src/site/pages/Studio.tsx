import React, { memo, useEffect, useState } from 'react';
import { KeyRound } from 'lucide-react';
import type { SiteCopy } from '../content';
import type { AboutCopy } from '../mockCopy';

/*
  About — page plan (web-design-skills · field-io recipe, taste-skill kit)
  1 hero        the claim, two live city clocks, the studio globe (dotted-globe variant: arcs Kyiv ↔ Tel Aviv)
                and a strip of four real facts that enters in a stagger
  2 founders    two cinematic panels: the photograph opens with the scroll (clip + parallax), a scan line
                passes once, name decodes, focus chips arrive in a stagger
  3 principles  moment line-carries-colour; each principle carries its own small live visual
*/

const TZ = ['Europe/Kyiv', 'Asia/Jerusalem'];

function Clocks({ a }: { a: AboutCopy }) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = window.setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="clocks">
      {a.cities.map((city, i) => {
        let time = '';
        try {
          time = new Intl.DateTimeFormat('en-GB', { timeZone: TZ[i], hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(now);
        } catch {
          time = '';
        }
        return (
          <div key={city} className="clock">
            <span className="clock__dot" />
            <span className="clock__city">{city}</span>
            <span className="clock__time num" suppressHydrationWarning>
              {time}
            </span>
            <span className="clock__label">{a.localTime}</span>
          </div>
        );
      })}
    </div>
  );
}

const Globe = memo(() => (
  <div
    className="globe"
    aria-hidden="true"
    data-fx="studio-globe"
    data-fx-seed="7"
    data-fx-palette='{"bg":"#181824","surface":"#26253b","ink":"#f2efff","muted":"#6b6a86","accent":"#ff4a36"}'
    data-fx-params='{"speed":0.9,"size":0.98,"spacing":6.5,"dot":1.1,"arcs":2.4,"glow":0.7,"tilt":24,"calm":0,"calmX":0.5,"calmY":1,"back":0.16}'
  />
));

/* principle visuals */
function OwnViz({ a }: { a: AboutCopy }) {
  return (
    <div className="pviz pviz--own" aria-hidden="true">
      <span className="pviz__node">{a.own.from}</span>
      <span className="pviz__track">
        <i className="pviz__packet">
          <KeyRound />
        </i>
      </span>
      <span className="pviz__node pviz__node--to">{a.own.to}</span>
    </div>
  );
}
function SeatsViz({ a }: { a: AboutCopy }) {
  return (
    <div className="pviz pviz--seats" aria-hidden="true">
      <div className="seats">
        {Array.from({ length: 24 }).map((_, i) => (
          <i key={i} style={{ ['--i' as string]: i }} />
        ))}
      </div>
      <div className="seats__meta">
        <span>{a.seats.label}</span>
        <b>{a.seats.price}</b>
      </div>
    </div>
  );
}
function OrbitViz() {
  return (
    <div className="pviz pviz--orbit" aria-hidden="true">
      <span className="orbit__core" />
      <span className="orbit__ring">
        {['coral', 'amber', 'teal', 'sky', 'magenta', 'indigo'].map((t, i) => (
          <i key={t} style={{ ['--a' as string]: `${i * 60}deg`, ['--tone' as string]: `var(--${t})` }} />
        ))}
      </span>
    </div>
  );
}
function LangViz() {
  const words = ['Hello', 'Привіт', 'Привет', 'שלום'];
  return (
    <div className="pviz pviz--lang" aria-hidden="true">
      {words.map((w, i) => (
        <span key={w} dir={i === 3 ? 'rtl' : 'ltr'} style={{ ['--i' as string]: i }}>
          {w}
        </span>
      ))}
    </div>
  );
}

const Principles = memo(({ c, a }: { c: SiteCopy; a: AboutCopy }) => {
  const s = c.studio;
  const viz = [<OwnViz a={a} />, <SeatsViz a={a} />, <OrbitViz />, <LangViz />];
  return (
    <section
      className="section section--elevated"
      data-moment="line-carries-colour"
      data-moment-opts='{"from": "base"}'
      aria-labelledby="principles"
    >
      <div className="wrap">
        <div className="section__head">
          <h2 id="principles" className="h2">
            {s.principlesH2}
          </h2>
        </div>
        <ul className="principles2">
          {s.principles.map((x, i) => (
            <li key={x.t}>
              {viz[i]}
              <span className="principles2__n num">0{i + 1}</span>
              <h3 className="h3">{x.t}</h3>
              <p>{x.b}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
});

export function Studio({ c, a }: { c: SiteCopy; a: AboutCopy }) {
  const s = c.studio;
  return (
    <>
      <header className="about-hero">
        <div className="wrap about-hero__grid">
          <div className="about-hero__copy" data-enter>
            <p className="eyebrow">{a.label}</p>
            <h1 className="h1 about-hero__h1">{s.h1}</h1>
            <p className="lead">{s.lead}</p>
            <Clocks a={a} />
          </div>
          <div className="about-hero__globe" data-enter-stage>
            <Globe />
          </div>
        </div>
        <div className="wrap">
          <ul className="factstrip" data-enter-group="">
            {a.facts.map((f) => (
              <li key={f.l}>
                <b className="num">{f.v}</b>
                <span>{f.l}</span>
              </li>
            ))}
          </ul>
        </div>
      </header>

      <section className="section founders2" aria-label={c.home.foundersH2}>
        <div className="wrap">
          {(['boris', 'danil'] as const).map((k, i) => {
            const p = c.people[k];
            return (
              <article key={k} className={`founder${i % 2 ? ' founder--rev' : ''}`} data-scroll-var="">
                <div className="founder__photo">
                  <img
                    src={`/img/${k}.jpg`}
                    alt={p.alt}
                    loading={k === 'boris' ? 'eager' : 'lazy'}
                    decoding="async"
                    style={{ objectPosition: k === 'boris' ? '50% 18%' : '50% 20%' }}
                  />
                  <span className="founder__scan" aria-hidden="true" />
                  <span className="founder__tag" aria-hidden="true">
                    {a.index[i]}
                  </span>
                </div>
                <div className="founder__text">
                  <span className="eyebrow">{a.index[i]}</span>
                  <h2 className="h2">{p.name}</h2>
                  <p className="lead">{p.p1}</p>
                  <p>{p.p2}</p>
                  <ul className="focus" data-enter-group="">
                    {a.focus[k].map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <Principles c={c} a={a} />
    </>
  );
}
