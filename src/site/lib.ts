import { useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import type { Language } from '../i18n/translations';
import { CONTACTS, Route } from './content';

const ROUTES: Route[] = ['home', 'systems', 'pricing', 'studio', 'contact', 'credits'];

// the Studio page lives at /about (its old path /studio still works)
const PATH: Partial<Record<Route, string>> = { studio: 'about' };
const ALIAS: Record<string, Route> = { about: 'studio' };

export function href(route: Route): string {
  return route === 'home' ? '/' : `/${PATH[route] || route}`;
}

function readRoute(): Route {
  // old #/pricing links still land on the right page
  const fromHash = window.location.hash.match(/^#\/([a-z]+)/)?.[1];
  const seg = fromHash || window.location.pathname.replace(/^\/+|\/+$/g, '').split('/')[0];
  const raw = ALIAS[seg] || seg;
  return (ROUTES as string[]).includes(raw) ? (raw as Route) : 'home';
}

/** Navigate without a page reload (History API). */
export function navigate(path: string) {
  if (path === window.location.pathname + window.location.search) return;
  const go = () => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };
  // a film cut between pages where the browser supports View Transitions
  const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
  if (doc.startViewTransition && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) doc.startViewTransition(go);
  else go();
}

/**
 * Path router: real URLs (/systems, /pricing …) that work on Vercel through the rewrite in vercel.json.
 * Same-origin <a href="/…"> clicks are taken over so pages switch instantly.
 */
export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(readRoute);
  useEffect(() => {
    if (window.location.hash.startsWith('#/')) {
      const r = readRoute();
      window.history.replaceState({}, '', href(r) + window.location.search);
    }
    const onPop = () => {
      // synchronous, so a View Transition captures the new page
      flushSync(() => setRoute(readRoute()));
      window.scrollTo(0, 0);
    };
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement | null)?.closest?.('a');
      if (!a || a.target === '_blank' || a.hasAttribute('download')) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      const first = url.pathname.replace(/^\/+/, '').split('/')[0];
      if (url.pathname !== '/' && !(ROUTES as string[]).includes(ALIAS[first] || first)) return;
      e.preventDefault();
      if (url.hash && url.pathname === window.location.pathname) {
        document.querySelector(url.hash)?.scrollIntoView();
        return;
      }
      navigate(url.pathname + window.location.search);
    };
    window.addEventListener('popstate', onPop);
    document.addEventListener('click', onClick);
    return () => {
      window.removeEventListener('popstate', onPop);
      document.removeEventListener('click', onClick);
    };
  }, []);
  return route;
}

const LANG_KEY = 'brytech.lang';
const VALID: Language[] = ['en', 'uk', 'ru', 'he'];

export function initialLang(): Language {
  try {
    const q = new URLSearchParams(window.location.search).get('lang');
    if (q && (VALID as string[]).includes(q)) return q as Language;
    const saved = localStorage.getItem(LANG_KEY);
    if (saved && (VALID as string[]).includes(saved)) return saved as Language;
  } catch {
    /* storage blocked: fall through */
  }
  return 'en';
}

export function saveLang(lang: Language) {
  try {
    localStorage.setItem(LANG_KEY, lang);
  } catch {
    /* ignore */
  }
}

export function formatUsd(n: number): string {
  return '$' + n.toLocaleString('en-US');
}

export function whatsappUrl(text: string): string {
  return `https://wa.me/${CONTACTS.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export const TELEGRAM_URL = `https://t.me/${CONTACTS.telegramHandle}`;
export const INSTAGRAM_URL = `https://instagram.com/${CONTACTS.instagramHandle}`;

/** Telegram cannot prefill a message to a user, so copy it first, then open the chat. */
export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand('copy');
      ta.remove();
      return ok;
    } catch {
      return false;
    }
  }
}
