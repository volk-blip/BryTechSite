import { useEffect } from 'react';

/*
 * Bridges the taste-skill kit (plain ES modules in /public/kit) into the React pages.
 * Each page mounts its own scene, moments, diagrams and effect after it renders, and
 * tears them down when the visitor leaves the page or switches language.
 */

type Mod = Record<string, any>;
const cache = new Map<string, Promise<Mod>>();
const load = (path: string): Promise<Mod> => {
  if (!cache.has(path)) {
    const url = new URL(path, window.location.origin).href;
    cache.set(path, import(/* @vite-ignore */ url));
  }
  return cache.get(path)!;
};

declare global {
  interface Window {
    __momentsManual?: boolean;
    __scenesManual?: boolean;
  }
}

const linkCss = (path: string) =>
  new Promise<void>((res) => {
    if (document.querySelector(`link[data-kit="${path}"]`)) return res();
    const l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = path;
    l.dataset.kit = path;
    l.onload = l.onerror = () => res();
    document.head.appendChild(l);
  });

export function useKit(rootId: string, key: string) {
  useEffect(() => {
    const root = document.getElementById(rootId);
    if (!root) return;
    window.__momentsManual = true;
    window.__scenesManual = true;
    let alive = true;
    const diagrams: { destroy?: () => void }[] = [];
    const mods: { sc?: Mod; fx?: Mod } = {};

    (async () => {
      try {
        if (root.querySelector('[data-big-scene]')) {
          mods.sc = await load('/kit/scenes/scenes.js');
          if (!alive) return;
          await mods.sc.mountAll(root);
        }
        if (root.querySelector('[data-moment]')) {
          const mo = await load('/kit/moments/moments.js');
          if (!alive) return;
          await mo.mountAll(root);
        }
        if (root.querySelector('[data-diagram]')) {
          const [m] = await Promise.all([load('/kit/diagrams/diagram.js'), linkCss('/kit/diagrams/diagram.css')]);
          const dg = m.default;
          if (!alive) return;
          for (const el of root.querySelectorAll<HTMLElement>('[data-diagram]')) {
            try {
              const raw = el.querySelector('script[type="application/json"]')?.textContent || el.dataset.diagram || '';
              diagrams.push(await dg.mount(el, JSON.parse(raw)));
            } catch (err) {
              console.warn('diagram failed', err);
            }
          }
        }
        if (root.querySelector('[data-fx]')) {
          const fx = (await load('/kit/effects/fx.js')).default;
          mods.fx = fx;
          if (!alive) return;
          await fx.mountAll(root);
        }
      } catch (err) {
        console.warn('kit: a part failed to load; the page shows its finished state', err);
        document.documentElement.classList.add('mo-safe', 'sc-safe');
      }
    })();

    return () => {
      alive = false;
      try {
        mods.sc?.unmountAll(root);
      } catch {
        /* gone */
      }
      root.querySelectorAll<HTMLElement & { __moment?: { destroy?: () => void } }>('[data-moment-mounted]').forEach((el) => {
        try {
          el.__moment?.destroy?.();
        } catch {
          /* gone */
        }
      });
      diagrams.forEach((d) => {
        try {
          d?.destroy?.();
        } catch {
          /* gone */
        }
      });
      try {
        mods.fx?.unmountAll(root);
      } catch {
        /* gone */
      }
    };
  }, [rootId, key]);
}
