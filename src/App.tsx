import React, { Suspense, lazy, useEffect, useState } from 'react';
import type { Language } from './i18n/translations';
import { applyDynamicPageSeo } from './utils/seoManager';
import type { ActivePageView } from './components/Navbar';
import { COPY, Route } from './site/content';
import { initialLang, saveLang, useRoute } from './site/lib';
import { JOURNEY } from './site/journey';
import { HOME } from './site/homeCopy';
import { MOCK, ABOUT } from './site/mockCopy';
import { useKit } from './site/kit';
import { useMotion, useScrollProgress } from './site/fx/motion';
import { useMobileScroll } from './site/fx/mobileScroll';
import { SiteFooter, SiteNav } from './site/Chrome';
import { Home } from './site/pages/Home';
import { Systems } from './site/pages/Systems';
import { Pricing } from './site/pages/Pricing';
import { Studio } from './site/pages/Studio';
import { Contact, Credits } from './site/pages/Contact';

const ClientAreaPortal = lazy(() =>
  import('./components/ClientAreaPortal').then((m) => ({ default: m.ClientAreaPortal })),
);

const SEO_PAGE: Record<Route, ActivePageView> = {
  home: 'overview',
  systems: 'solutions',
  pricing: 'pricing',
  studio: 'about',
  contact: 'contact',
  credits: 'overview',
};

export function App() {
  const [lang, setLang] = useState<Language>(initialLang);
  const route = useRoute();
  const [portalOpen, setPortalOpen] = useState(false);
  const [portalMode, setPortalMode] = useState<'client' | 'admin'>('client');

  const c = COPY[lang];
  const j = JOURNEY[lang];
  useKit('main', `${route}-${lang}`);
  useMotion('main', `${route}-${lang}`);
  useMobileScroll('main', `${route}-${lang}`);
  useScrollProgress();
  const dir = lang === 'he' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
    applyDynamicPageSeo(lang, SEO_PAGE[route]);
  }, [lang, dir, route]);

  const changeLang = (l: Language) => {
    setLang(l);
    saveLang(l);
  };

  const openPortal = (mode: 'client' | 'admin') => {
    setPortalMode(mode);
    setPortalOpen(true);
  };

  return (
    <div className="site" dir={dir}>
      <a className="skip" href="#main">
        {c.nav.skip}
      </a>
      <SiteNav lang={lang} route={route} onLang={changeLang} onClientArea={() => openPortal('client')} />
      <div className="scroll-progress" aria-hidden="true">
        <i id="scroll-progress" />
      </div>

      <main id="main" key={`${route}-${lang}`}>
        {route === 'home' && <Home c={c} j={j} hc={HOME[lang]} m={MOCK[lang]} />}
        {route === 'systems' && <Systems c={c} j={j} />}
        {route === 'pricing' && <Pricing c={c} j={j} />}
        {route === 'studio' && <Studio c={c} a={ABOUT[lang]} />}
        {route === 'contact' && <Contact c={c} />}
        {route === 'credits' && <Credits c={c} />}
      </main>

      <SiteFooter lang={lang} onAdmin={() => openPortal('admin')} />

      {portalOpen && (
        <Suspense fallback={null}>
          <ClientAreaPortal
            isOpen={portalOpen}
            onClose={() => setPortalOpen(false)}
            lang={lang}
            onChangeLang={changeLang}
            initialMode={portalMode}
          />
        </Suspense>
      )}
    </div>
  );
}

export default App;
