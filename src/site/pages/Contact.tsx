import React, { useState } from 'react';
import type { SiteCopy } from '../content';
import { CONTACTS, PHOTO_CREDITS } from '../content';
import { copyText, href, INSTAGRAM_URL, TELEGRAM_URL, whatsappUrl } from '../lib';

export function Contact({ c }: { c: SiteCopy }) {
  const k = c.contact;
  const [name, setName] = useState('');
  const [business, setBusiness] = useState('');
  const [need, setNeed] = useState(k.needOptions[0]);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<{ name?: string; message?: string }>({});
  const [sent, setSent] = useState<string | null>(null);

  const compose = () =>
    [k.intro, `${k.name}: ${name.trim()}`, business.trim() && `${k.business}: ${business.trim()}`, `${k.need}: ${need}`, message.trim()]
      .filter(Boolean)
      .join('\n');

  const validate = () => {
    const e: typeof errors = {};
    if (!name.trim()) e.name = k.errorName;
    if (!message.trim()) e.message = k.errorMessage;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const sendWhatsApp = () => {
    if (!validate()) return;
    window.open(whatsappUrl(compose()), '_blank', 'noopener');
    setSent(k.sentWhatsApp);
  };

  const sendTelegram = async () => {
    if (!validate()) return;
    await copyText(compose());
    window.open(TELEGRAM_URL, '_blank', 'noopener');
    setSent(k.sentTelegram);
  };

  return (
    <>
      <header className="page-head page-head--fx">
        <div
          className="page-head__fx"
          aria-hidden="true"
          data-fx="gradient-mesh"
          data-fx-palette='{"accent":"#9a3f39","surface":"#2c2b47"}'
          data-fx-seed="37"
          data-fx-params='{"speed":0.05,"tint":0.14,"calm":0.85,"calmX":0.22,"calmY":0.55,"softness":0.7}'
        />
        <div className="wrap" data-enter>
          <h1 className="h1">{k.h1}</h1>
          <p className="lead">{k.lead}</p>
        </div>
      </header>

      {/* moment: iris-opens — the form's section sits on the deep ground and opens through a circle */}
      <section
        className="section section--deep section--iris"
        data-moment="iris-opens"
        data-moment-opts='{"from": "base"}'
        aria-label={k.formTitle}
      >
        <div className="wrap contact-grid">
          <div className="contact-list" data-enter-group="">
            <span className="label" style={{ marginBottom: 4 }}>
              {k.channelsLabel}
            </span>
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

          <form
            className="form"
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              sendWhatsApp();
            }}
          >
            <h2 className="h3">{k.formTitle}</h2>
            <div className="form__row">
              <div className="field">
                <label htmlFor="f-name">{k.name}</label>
                <input
                  id="f-name"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'f-name-err' : undefined}
                />
                {errors.name && (
                  <p className="field__err" id="f-name-err">
                    {errors.name}
                  </p>
                )}
              </div>
              <div className="field">
                <label htmlFor="f-biz">{k.business}</label>
                <input id="f-biz" autoComplete="organization" value={business} onChange={(e) => setBusiness(e.target.value)} />
              </div>
            </div>
            <div className="field">
              <label htmlFor="f-need">{k.need}</label>
              <select id="f-need" value={need} onChange={(e) => setNeed(e.target.value)}>
                {k.needOptions.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="f-msg">{k.message}</label>
              <textarea
                id="f-msg"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'f-msg-err' : undefined}
              />
              {errors.message && (
                <p className="field__err" id="f-msg-err">
                  {errors.message}
                </p>
              )}
            </div>
            <div className="form__actions">
              <button type="submit" className="btn btn--primary">
                <img src="/icons/whatsapp.svg" alt="" className="ic" width={20} height={20} />
                {c.actions.whatsapp}
              </button>
              <button type="button" className="btn btn--quiet" onClick={sendTelegram}>
                <img src="/icons/telegram.svg" alt="" className="ic" width={20} height={20} />
                {c.actions.telegram}
              </button>
            </div>
            {sent && (
              <p className="note" role="status">
                {sent}
              </p>
            )}
          </form>
        </div>
      </section>
    </>
  );
}

export function Credits({ c }: { c: SiteCopy }) {
  return (
    <>
      <header className="page-head">
        <div className="wrap" data-enter>
          <h1 className="h1">{c.credits.h1}</h1>
          <p className="lead">{c.credits.lead}</p>
        </div>
      </header>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap credit-list">
          {PHOTO_CREDITS.map((p) => (
            <div key={p.file} className="credit-item">
              <img src={p.file} alt="" loading="lazy" />
              <p style={{ margin: 0 }}>
                <a className="link" href={p.page} target="_blank" rel="noopener noreferrer">
                  {p.title}
                </a>
                <br />
                {p.by} ·{' '}
                <a className="link" href={p.licenceUrl} target="_blank" rel="noopener noreferrer">
                  {p.licence}
                </a>{' '}
                · Wikimedia Commons
              </p>
            </div>
          ))}
          <p style={{ marginTop: 24 }}>
            <a className="link" href={href('home')}>
              {c.credits.back}
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
