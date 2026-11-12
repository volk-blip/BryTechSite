import React, { useEffect, useState } from 'react';
import { ArrowRight, Globe, Menu, Shield, X } from 'lucide-react';
import type { Language } from '../i18n/translations';
import { COPY, CONTACTS, LANGS, Route } from './content';
import { href, INSTAGRAM_URL, TELEGRAM_URL, whatsappUrl } from './lib';
import { Aurora } from './Visuals';

const NAV_ROUTES: Route[] = ['systems', 'pricing', 'studio', 'contact'];

export function Brand({ label }: { label: string }) {
  return (
    <a className="brand" href={href('home')} aria-label={label}>
      <span className="brand__mark" aria-hidden="true">
        <span />
      </span>
      BryTech
    </a>
  );
}

function LangSelect({ lang, onChange, label }: { lang: Language; onChange: (l: Language) => void; label: string }) {
  return (
    <label className="lang">
      <Globe aria-hidden="true" />
      <span className="sr-only" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>
        {label}
      </span>
      <select value={lang} onChange={(e) => onChange(e.target.value as Language)} aria-label={label}>
        {LANGS.map((l) => (
          <option key={l.id} value={l.id}>
            {l.short}
          </option>
        ))}
      </select>
    </label>
  );
}

export function SiteNav({
  lang,
  route,
  onLang,
  onClientArea,
}: {
  lang: Language;
  route: Route;
  onLang: (l: Language) => void;
  onClientArea: () => void;
}) {
  const c = COPY[lang];
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [route]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const label = (r: Route) => c.nav[r as 'systems' | 'pricing' | 'studio' | 'contact'];

  return (
    <>
      <header className={`nav${scrolled ? ' is-scrolled' : ''}`}>
        <div className="wrap nav__in">
          <Brand label={c.nav.home} />
          <nav className="nav__links" aria-label="Main">
            {NAV_ROUTES.map((r) => (
              <a key={r} href={href(r)} aria-current={route === r ? 'page' : undefined}>
                {label(r)}
              </a>
            ))}
          </nav>
          <div className="nav__actions">
            <LangSelect lang={lang} onChange={onLang} label={c.nav.language} />
            <button type="button" className="btn btn--ghost btn--sm" onClick={onClientArea}>
              {c.nav.clientArea}
            </button>
            <a className="btn btn--primary btn--sm" href={href('pricing')}>
              {c.actions.primary}
            </a>
            <button
              type="button"
              className="menu-btn"
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label={c.nav.openMenu}
              onClick={() => setOpen(true)}
            >
              <Menu aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="sheet" id="site-menu" role="dialog" aria-modal="true" aria-label={c.nav.openMenu}>
          <div className="sheet__top">
            <Brand label={c.nav.home} />
            <button type="button" className="menu-btn" aria-label={c.nav.closeMenu} onClick={() => setOpen(false)}>
              <X aria-hidden="true" />
            </button>
          </div>
          <nav className="sheet__links" aria-label="Main">
            {NAV_ROUTES.map((r) => (
              <a key={r} href={href(r)} aria-current={route === r ? 'page' : undefined}>
                {label(r)}
              </a>
            ))}
          </nav>
          <div className="sheet__foot">
            <div className="sheet__langs" role="group" aria-label={c.nav.language}>
              {LANGS.map((l) => (
                <button key={l.id} type="button" className="chip" aria-pressed={lang === l.id} onClick={() => onLang(l.id)}>
                  {l.label}
                </button>
              ))}
            </div>
            <button
              type="button"
              className="btn btn--quiet btn--block"
              onClick={() => {
                setOpen(false);
                onClientArea();
              }}
            >
              {c.nav.clientArea}
            </button>
            <a className="btn btn--primary btn--block" href={href('pricing')}>
              {c.actions.primary}
            </a>
          </div>
        </div>
      )}
    </>
  );
}

export function SiteFooter({ lang, onAdmin }: { lang: Language; onAdmin: () => void }) {
  const c = COPY[lang];
  return (
    <footer className="closing">
      <div className="wrap">
        <div className="closing__cta">
          <Aurora variant="close" />
          <h2 className="display">{c.close.h2}</h2>
          <p className="lead">{c.close.lead}</p>
          <div className="closing__actions">
            <a className="btn btn--primary" href={href('pricing')}>
              {c.actions.primary}
              <ArrowRight className="flip" aria-hidden="true" />
            </a>
            <a className="btn btn--quiet" href={href('contact')}>
              {c.actions.secondary}
            </a>
          </div>
        </div>

        <div className="foot">
          <div className="foot__col">
            <Brand label={c.nav.home} />
            <p style={{ margin: '8px 0 0', maxWidth: '36ch' }}>{c.footer.tagline}</p>
          </div>
          <div className="foot__col">
            <h3>{c.footer.pages}</h3>
            {NAV_ROUTES.map((r) => (
              <a key={r} className="link" href={href(r)}>
                {c.nav[r as 'systems' | 'pricing' | 'studio' | 'contact']}
              </a>
            ))}
          </div>
          <div className="foot__col">
            <h3>{c.footer.follow}</h3>
            <a className="link" href={whatsappUrl('')} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
            <a className="link" href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer">
              Telegram
            </a>
            <a className="link" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
          </div>
        </div>

        <div className="foot__legal">
          <span>© {new Date().getFullYear()} BryTech · {CONTACTS.whatsappDisplay}</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <a className="link" href={href('credits')}>
              {c.footer.credits}
            </a>
            <span>{c.footer.trademarks}</span>
            <button type="button" className="admin-btn" onClick={onAdmin} aria-label={c.footer.admin} title={c.footer.admin}>
              <Shield aria-hidden="true" />
            </button>
          </span>
        </div>
      </div>
    </footer>
  );
}
