import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import { Check, Plus } from 'lucide-react';
import type { SiteCopy, PartId } from '../content';
import { PARTS, PRESETS } from '../content';
import { copyText, formatUsd, TELEGRAM_URL, whatsappUrl } from '../lib';
import type { JourneyCopy } from '../journey';

/*
  Page plan (taste-skill, kind: software)
  deal: effect gradient-mesh (head layer, calm under the words) · moment letters-assemble
  1 head · 2 the price tool (calm) · 3 statement: letters fly into "You own the code." (beat) · 4 questions
*/
const OwnStatement = memo(({ j }: { j: JourneyCopy }) => (
  <section className="section section--statement" data-moment="letters-assemble" aria-label={j.ownStatement.h2}>
    <div className="wrap">
      <h2 className="mo-la__type">{j.ownStatement.h2}</h2>
      <p className="mo-la__sub">{j.ownStatement.sub}</p>
    </div>
  </section>
));

const sameSet = (a: PartId[], b: Set<PartId>) => a.length === b.size && a.every((x) => b.has(x));

export function Pricing({ c, j }: { c: SiteCopy; j: JourneyCopy }) {
  const p = c.pricing;
  const [picked, setPicked] = useState<Set<PartId>>(() => new Set(PRESETS[1].parts));
  const [note, setNote] = useState<string | null>(null);
  const [summaryVisible, setSummaryVisible] = useState(true);
  const summaryRef = useRef<HTMLDivElement>(null);

  const chosen = PARTS.filter((x) => picked.has(x.id));
  const total = chosen.reduce((s, x) => s + x.priceUsd, 0);
  const days = chosen.reduce((s, x) => s + x.days, 0);

  useEffect(() => {
    const el = summaryRef.current;
    if (!el || !('IntersectionObserver' in window)) return;
    // Show the phone bar only while the summary is still below the screen (the visitor is picking parts).
    const io = new IntersectionObserver(
      ([e]) => setSummaryVisible(e.isIntersecting || e.boundingClientRect.top < 0),
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const toggle = (id: PartId) => {
    setNote(null);
    setPicked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const presetTotals = useMemo(
    () =>
      Object.fromEntries(
        PRESETS.map((pr) => [pr.id, PARTS.filter((x) => pr.parts.includes(x.id)).reduce((s, x) => s + x.priceUsd, 0)]),
      ),
    [],
  );

  const message = () =>
    [
      p.message,
      ...chosen.map((x) => `• ${c.parts[x.id].name} — ${formatUsd(x.priceUsd)}`),
      `${p.total}: ${formatUsd(total)}`,
      `${p.time}: ${days} ${p.daysUnit}`,
    ].join('\n');

  const sendTelegram = async () => {
    await copyText(message());
    setNote(p.copied);
    window.open(TELEGRAM_URL, '_blank', 'noopener');
  };

  const empty = chosen.length === 0;

  return (
    <>
      <header className="page-head page-head--fx" style={{ paddingBottom: 56 }}>
        <div
          className="page-head__fx"
          aria-hidden="true"
          data-fx="gradient-mesh"
          data-fx-palette='{"accent":"#9a3f39","surface":"#2c2b47"}'
          data-fx-seed="11"
          data-fx-params='{"speed":0.05,"tint":0.14,"calm":0.85,"calmX":0.22,"calmY":0.55,"softness":0.7}'
        />
        <div className="wrap" data-enter>
          <h1 className="h1">{p.h1}</h1>
          <p className="lead">{p.lead}</p>
        </div>
      </header>

      <section className="section" style={{ paddingTop: 0 }} aria-label={p.summary}>
        <div className="wrap pricer">
          <div>
            <span className="label" id="presets-label">
              {p.presetsLabel}
            </span>
            <div className="presets" role="group" aria-labelledby="presets-label">
              {PRESETS.map((pr) => (
                <button
                  key={pr.id}
                  type="button"
                  className="preset"
                  aria-pressed={sameSet(pr.parts, picked)}
                  onClick={() => {
                    setNote(null);
                    setPicked(new Set(pr.parts));
                  }}
                >
                  {p.presets[pr.id]}
                  <small className="num">{formatUsd(presetTotals[pr.id])}</small>
                </button>
              ))}
            </div>

            <fieldset style={{ border: 0, margin: 0, padding: 0 }}>
              <legend className="label">{p.partsLabel}</legend>
              <div className="opts" data-enter-group="">
                {PARTS.map((x) => {
                  const pc = c.parts[x.id];
                  return (
                    <label key={x.id} className="opt">
                      <input type="checkbox" checked={picked.has(x.id)} onChange={() => toggle(x.id)} />
                      <span className="opt__box" aria-hidden="true">
                        <Check />
                      </span>
                      <span className="opt__body">
                        <strong>{pc.name}</strong>
                        <span>{pc.title}</span>
                      </span>
                      <span className="opt__price">
                        {formatUsd(x.priceUsd)}
                        <small>
                          {x.days} {p.daysUnit}
                        </small>
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          </div>

          <div className="summary" ref={summaryRef} aria-live="polite">
            <div>
              <span className="label">{p.total}</span>
              <div className="summary__total">{empty ? '—' : formatUsd(total)}</div>
            </div>
            <div className="summary__meta">
              <div>
                <span className="label">{p.time}</span>
                <b className="num">{empty ? '—' : `${days} ${p.daysUnit}`}</b>
              </div>
              <div>
                <span className="label">{p.summary}</span>
                <b className="num">{chosen.length} / {PARTS.length}</b>
              </div>
            </div>
            {empty ? (
              <p style={{ margin: 0 }}>{p.none}</p>
            ) : (
              <div className="summary__chips">
                {chosen.map((x) => (
                  <span key={x.id}>{c.parts[x.id].name}</span>
                ))}
              </div>
            )}
            <ul className="ticks">
              {p.notes.map((n) => (
                <li key={n}>
                  <Check aria-hidden="true" />
                  <span>{n}</span>
                </li>
              ))}
            </ul>
            <div className="summary__actions">
              <a
                className="btn btn--primary btn--block"
                href={empty ? undefined : whatsappUrl(message())}
                target="_blank"
                rel="noopener noreferrer"
                aria-disabled={empty}
                onClick={(e) => empty && e.preventDefault()}
              >
                <img src="/icons/whatsapp.svg" alt="" className="ic" width={20} height={20} />
                {c.actions.whatsapp}
              </a>
              <button type="button" className="btn btn--quiet btn--block" disabled={empty} onClick={sendTelegram}>
                <img src="/icons/telegram.svg" alt="" className="ic" width={20} height={20} />
                {c.actions.telegram}
              </button>
              {note && (
                <p className="note" role="status">
                  {note}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <OwnStatement j={j} />

      <section className="section section--elevated" aria-labelledby="faq-title">
        <div className="wrap">
          <div className="section__head">
            <h2 id="faq-title" className="h2">
              {p.faqH2}
            </h2>
          </div>
          <div className="faq">
            {p.faq.map((f, i) => (
              <details key={f.q} open={i === 0}>
                <summary>
                  {f.q}
                  <Plus aria-hidden="true" />
                </summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <div className={`pbar${!summaryVisible && !empty ? ' is-on' : ''}`} aria-hidden={summaryVisible}>
        <div>
          <b className="num">{formatUsd(total)}</b>
          <small>
            {days} {p.daysUnit}
          </small>
        </div>
        <a
          className="btn btn--primary btn--sm"
          href={whatsappUrl(message())}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={summaryVisible ? -1 : 0}
        >
          {c.actions.whatsapp}
        </a>
      </div>
    </>
  );
}
