import React, { memo } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import type { SiteCopy } from '../content';
import { CONTACTS, PARTS } from '../content';
import type { JourneyCopy } from '../journey';
import { formatUsd, href, INSTAGRAM_URL, TELEGRAM_URL, whatsappUrl } from '../lib';
import { Diagram } from '../Visuals';

/*
  Page plan (taste-skill, kind: software)
  deal: effect gradient-mesh (the one [data-visual] frame, holding the hub diagram) · moment marquee-row
  1 head        split: words left, the effect frame right with the pulsing hub (one system, eight parts)
  2 parts       calm rows: every part with its price and build time
  3 #flow       lanes diagram: one WhatsApp message, three jobs
  4 #built-for  photographs + the trades marquee as its last row (beat)
  5 channels    real messenger icons
*/

type Props = { c: SiteCopy; j: JourneyCopy };

const HeadVisual = memo(({ c, j }: Props) => {
  const spec = {
    layout: 'hub',
    alt: j.hubAlt,
    center: { label: j.hubCenter, icon: 'ui:layout-dashboard' },
    spokes: [
      { label: c.parts.website.name, icon: 'ui:globe' },
      { label: c.parts.booking.name, icon: 'ui:calendar' },
      { label: c.parts.crm.name, icon: 'ui:users' },
      { label: c.parts.portal.name, icon: 'ui:user-round' },
      { label: c.parts.finance.name, icon: 'ui:credit-card' },
      { label: 'WhatsApp', icon: 'whatsapp' },
      { label: 'Telegram', icon: 'telegram' },
      { label: 'Instagram', icon: 'instagram' },
    ],
    motion: { cycle: 3.2 },
    size: 'band',
  };
  return (
    <div
      className="vframe"
      data-visual=""
      data-fx="gradient-mesh"
      data-fx-seed="31"
      data-fx-palette='{"accent":"#9a3f39","surface":"#2c2b47"}'
      data-fx-params='{"speed":0.05,"tint":0.16,"calm":0.75,"calmX":0.5,"calmY":0.5,"softness":0.7}'
    >
      <Diagram spec={spec} />
    </div>
  );
});

const Flow = memo(({ j }: { j: JourneyCopy }) => {
  const spec = {
    layout: 'lanes',
    alt: j.lanes.alt,
    input: { label: j.lanes.input, icon: 'whatsapp' },
    core: { label: j.lanes.core, icon: 'ui:bot' },
    lanes: [
      { label: j.lanes.outs[0], icon: 'ui:calendar', done: true },
      { label: j.lanes.outs[1], icon: 'ui:users', done: true },
      { label: j.lanes.outs[2], icon: 'ui:bell', done: true },
    ],
    motion: { cycle: 3.6 },
  };
  return (
    <div className="panel panel--diagram">
      <Diagram spec={spec} />
    </div>
  );
});

const Marquee = memo(({ items }: { items: string[] }) => (
  <div className="marquee" data-moment="marquee-row" data-moment-opts='{"speed": 34}'>
    <ul className="mo-mq__track">
      {items.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ul>
  </div>
));

export function Systems({ c, j }: Props) {
  const s = c.systems;
  return (
    <>
      <header className="page-head page-head--split">
        <div className="wrap split split--head">
          <div className="split__text" data-enter>
            <h1 className="h1">{s.h1}</h1>
            <p className="lead">{s.lead}</p>
            <div>
              <a className="btn btn--primary" href={href('pricing')}>
                {c.actions.primary}
                <ArrowRight className="flip" aria-hidden="true" />
              </a>
            </div>
          </div>
          <div data-enter-stage>
            <HeadVisual c={c} j={j} />
          </div>
        </div>
      </header>

      <section className="section" style={{ paddingTop: 24 }} aria-label={c.nav.systems}>
        <div className="wrap">
          <div data-enter-group="">
          {PARTS.map((p) => {
            const pc = c.parts[p.id];
            return (
              <article key={p.id} className="part-row">
                <div>
                  <span className="label">{pc.name}</span>
                  <h2 className="h3" style={{ marginTop: 8, fontSize: 'clamp(24px, 2.2vw, 30px)' }}>
                    {pc.title}
                  </h2>
                  <p>{pc.body}</p>
                </div>
                <ul className="ticks">
                  {pc.bullets.map((b) => (
                    <li key={b}>
                      <Check aria-hidden="true" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <div className="part-row__price">
                  <span className="label">{s.from}</span>
                  <b className="num">{formatUsd(p.priceUsd)}</b>
                  <span className="label">
                    {p.days} {s.days}
                  </span>
                </div>
              </article>
            );
          })}
          </div>
        </div>
      </section>

      <section className="section section--elevated" id="flow" aria-labelledby="flow-title">
        <div className="wrap">
          <div className="section__head">
            <h2 id="flow-title" className="h2">
              {j.lanes.h2}
            </h2>
            <p className="lead">{j.lanes.lead}</p>
          </div>
          <Flow j={j} />
        </div>
      </section>

      <section className="section" id="built-for" aria-labelledby="built-for-title">
        <div className="wrap split">
          <div className="split__text">
            <h2 id="built-for-title" className="h2">
              {s.builtForH2}
            </h2>
            <p className="lead">{s.builtForLead}</p>
            <ul className="ticks ticks--quiet" style={{ marginTop: 8 }}>
              {s.builtForList.map((x) => (
                <li key={x}>
                  <Check aria-hidden="true" />
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="photos">
            <div className="photo">
              <img src="/img/clinic.jpg" alt={s.clinicAlt} loading="lazy" decoding="async" width={960} height={1438} />
            </div>
            <div className="photo">
              <img
                src="/img/salon.jpg"
                alt={s.salonAlt}
                loading="lazy"
                decoding="async"
                width={960}
                height={539}
                style={{ objectPosition: '35% 50%' }}
              />
            </div>
          </div>
        </div>
        <div className="wrap" style={{ marginTop: 80 }}>
          <Marquee items={j.trades} />
        </div>
      </section>

      <section className="section section--elevated" aria-labelledby="channels">
        <div className="wrap">
          <div className="section__head">
            <h2 id="channels" className="h2">
              {s.channelsH2}
            </h2>
            <p className="lead">{s.channelsLead}</p>
          </div>
          <div className="channels" data-enter-group="">
            <a className="channel" href={whatsappUrl('')} target="_blank" rel="noopener noreferrer">
              <img src="/icons/whatsapp.svg" alt="" width={40} height={40} />
              <span>
                WhatsApp<small>{CONTACTS.whatsappDisplay}</small>
              </span>
            </a>
            <a className="channel" href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer">
              <img src="/icons/telegram.svg" alt="" width={40} height={40} />
              <span>
                Telegram<small>@{CONTACTS.telegramHandle}</small>
              </span>
            </a>
            <a className="channel" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
              <img src="/icons/instagram.svg" alt="" width={40} height={40} className="ic-ink" />
              <span>
                Instagram<small>@{CONTACTS.instagramHandle}</small>
              </span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
