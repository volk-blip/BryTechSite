import React, { Suspense, lazy, memo, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import type { SiteCopy, PartId } from '../content';
import { PARTS } from '../content';
import type { JourneyCopy } from '../journey';
import type { HomeCopy } from '../homeCopy';
import { href } from '../lib';
import {
  Aurora,
  BotLoop,
  BuildWindow,
  Diagram,
  FloatChips,
  OwnWindow,
  PartFragment,
  ProductFrame,
  Scaled,
  WorkflowMap,
} from '../Visuals';
import { ParticleHero } from '../fx/ParticleHero';
import { PartsAssembly } from '../fx/PartsAssembly';
import { ConsoleCard, Dashboard } from '../fx/SystemMocks';
import { decode } from '../fx/motion';
import type { MockCopy } from '../mockCopy';

/*
  Home — page plan (taste-skill, kind: software; the client asked for more colour and motion)
  1 hero        collage over a living aurora: words left, the system window right, bot loop + floating notifications
  2 #system     big scene powers-of-ten-pullback: the camera pulls back from the system's screen to the device
  3 #parts      the Assembly: six parts float in 3D and lock into one system as the visitor scrolls
  4 #process    moment pinned-chapters: three steps hold on screen, drawn windows change per step
  5 #leads      gradient-mesh frame (magenta/indigo) holding a pulsing fan-in diagram: every lead into one CRM
  6 #figures    moment counter-rolls: four real figures roll like an odometer
  close         footer.closing over the aurora
  Founder photographs live on the About page only (client's request).
*/

type Props = { c: SiteCopy; j: JourneyCopy; hc: HomeCopy; m: MockCopy };

const TONE: Record<PartId, string> = {
  website: 'coral',
  booking: 'amber',
  crm: 'indigo',
  bots: 'teal',
  portal: 'sky',
  finance: 'magenta',
};

/* the hero's 3D Core loads on its own (three.js), so the page paints first */
const Core3D = lazy(() => import('../fx/Core3D'));

function StatusLine({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = window.setTimeout(() => decode(el), 250);
    return () => clearTimeout(t);
  }, [text]);
  return (
    <p className="hero__status">
      <span className="hero__pulse" aria-hidden="true" />
      <span ref={ref}>{text}</span>
    </p>
  );
}

const Hero = ({ c, j, hc, m }: Props) => {
  const words = c.home.lead.split(' ');
  const pills = j.proof.split(' · ');
  return (
    <section className="hero hero--collage hero--aurora hero--core" aria-labelledby="hero-title">
      <Aurora variant="hero" />
      <div className="hero__floor" aria-hidden="true">
        <i />
      </div>
      <div className="hero__beam" aria-hidden="true" />
      <ParticleHero targetId="hero-title" runKey={j.heroH1a} />
      <div className="wrap hero__grid">
        <div className="hero__copy" data-enter>
          <StatusLine text={hc.status} />
          <h1 id="hero-title" className="display display--hero is-assembling">
            {j.heroH1a} <span className="grad">{j.heroH1b}</span>
          </h1>
          <p className="lead lead--words">
            {words.map((w, i) => (
              <span key={i} style={{ ['--i' as string]: i }}>
                {w}{' '}
              </span>
            ))}
          </p>
          <div className="hero__actions">
            <a className="btn btn--primary" href={href('pricing')}>
              {c.actions.primary}
              <ArrowRight className="flip" aria-hidden="true" />
            </a>
            <a className="btn btn--quiet" href={href('contact')}>
              {c.actions.secondary}
            </a>
          </div>
          <ul className="hero__pills">
            {pills.map((p, i) => (
              <li key={p} style={{ ['--i' as string]: i }}>
                <i aria-hidden="true" />
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="hero__visual" data-enter-stage>
          <Suspense fallback={<div className="core core--fallback" aria-hidden="true" />}>
            <Core3D />
          </Suspense>
          <FloatChips items={hc.chips} />
          <div className="hero__console">
            <ConsoleCard m={m} />
          </div>
        </div>
      </div>
    </section>
  );
};

/* Static: the scene and the moments rewrite their own DOM, so React never re-renders them. */
const SystemScene = memo(({ c, j, m }: { c: SiteCopy; j: JourneyCopy; m: MockCopy }) => (
  <section
    className="sc"
    id="system"
    data-big-scene="powers-of-ten-pullback"
    data-big-scene-opts='{"hold":1}'
    style={{ ['--h' as string]: 1 }}
    aria-labelledby="pb-h"
  >
    <div className="sc__stage">
      <div className="pb__ground" aria-hidden="true" />
      <div className="pb__copy">
        <p className="t-label">{j.scene.label}</p>
        <h2 id="pb-h">{j.scene.h2}</h2>
        <p>{j.scene.p}</p>
        <div className="btn-row">
          <a className="btn btn--quiet" href={href('systems')}>
            {j.scene.action}
            <ArrowRight className="flip" aria-hidden="true" />
          </a>
        </div>
      </div>
      <div className="pb__device">
        <div className="pb__screen">
          <Scaled w={1280} h={800}>
            <Dashboard c={c} m={m} />
          </Scaled>
        </div>
      </div>
    </div>
  </section>
));

const Process = memo(({ c, j, hc }: Props) => (
  <section className="section section--elevated" id="process" data-moment="pinned-chapters" aria-labelledby="process-title">
    <div className="wrap mo-pc__grid">
      <div className="mo-pc__text">
        <h2 id="process-title" className="h2">
          {c.home.processH2}
        </h2>
        <ol className="mo-pc__steps">
          {c.home.steps.map((s, i) => (
            <li key={s.t} className="mo-pc__step">
              <h3>{s.t}</h3>
              <p>{s.b}</p>
              <figure className={`mo-pc__visual mo-pc__visual--lit mo-pc__visual--t${i + 1}`}>
                {i === 0 && <WorkflowMap title={hc.map.title} steps={hc.map.steps} />}
                {i === 1 && <BuildWindow c={c} j={j} />}
                {i === 2 && <OwnWindow j={j} />}
              </figure>
            </li>
          ))}
        </ol>
      </div>
      <div className="mo-pc__visuals frame" />
    </div>
  </section>
));

const Leads = memo(({ hc }: { hc: HomeCopy }) => {
  const icons = ['ui:globe', 'instagram', 'whatsapp', 'telegram', 'ui:phone'];
  const spec = {
    layout: 'fanin',
    alt: hc.leads.alt,
    sources: hc.leads.sources.map((s, i) => ({ label: s.label, sub: s.sub, icon: icons[i] })),
    target: { label: hc.leads.target, icon: 'ui:inbox' },
    then: { label: hc.leads.then, icon: 'ui:users', meta: 'live' },
    motion: { cycle: 3.4 },
    phoneLoop: true,
  };
  return (
    <section className="section" id="leads" aria-labelledby="leads-title">
      <div className="wrap">
        <div className="section__head">
          <h2 id="leads-title" className="h2">
            {hc.leads.h2}
          </h2>
          <p className="lead">{hc.leads.lead}</p>
        </div>
        <div
          className="vframe vframe--wide"
          data-fx="gradient-mesh"
          data-fx-seed="58"
          data-fx-palette='{"bg":"#170f22","surface":"#2a1f52","muted":"#6b5cff","accent":"#ff3d8b","ink":"#ffb8a8"}'
          data-fx-params='{"speed":0.07,"tint":0.55,"calm":0.55,"calmX":0.5,"calmY":0.5,"softness":0.6}'
        >
          <Diagram spec={spec} />
        </div>
      </div>
    </section>
  );
});

const Figures = memo(({ hc }: { hc: HomeCopy }) => (
  <section className="section figures" id="figures" aria-labelledby="figures-title">
    <div className="wrap">
      <h2 id="figures-title" className="h2">
        {hc.figures.h2}
      </h2>
      <div className="figs" data-moment="counter-rolls" data-moment-opts='{"duration": 1600, "stagger": 120}'>
        {hc.figures.items.map((f) => (
          <div key={f.l} className="fig">
            <p className="t-stat">{f.v}</p>
            <p className="fig__l">{f.l}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
));

export function Home({ c, j, hc, m }: Props) {
  const h = c.home;
  return (
    <>
      <Hero c={c} j={j} hc={hc} m={m} />
      <SystemScene c={c} j={j} m={m} />

      <PartsAssembly c={c} hc={hc} />

      <Process c={c} j={j} hc={hc} m={m} />
      <Leads hc={hc} />
      <Figures hc={hc} />
    </>
  );
}
