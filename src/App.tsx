import React, { useState, useEffect } from 'react';
import { Language, TRANSLATIONS } from './i18n/translations';
import { ALTEGIO_PLATFORM_DATA } from './data/altegioPlatformData';
import { Navbar, ActivePageView } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { UnifiedVisionOverviewSection } from './components/UnifiedVisionOverviewSection';
import { AboutSection } from './components/AboutSection';
import { AboutCompanyPage } from './components/AboutCompanyPage';
import { CapabilitiesSection } from './components/CapabilitiesSection';
import { SystemSimulatorSection } from './components/SystemSimulatorSection';
import { CaseStudiesSection } from './components/CaseStudiesSection';
import { AltegioPricingSection } from './components/AltegioPricingSection';
import {
  AltegioBusinessTypesSection,
  AltegioIndustriesSection,
  AltegioSolutionsEcosystemSection,
} from './components/AltegioPagesView';
import { DirectMessengerRibbon } from './components/DirectMessengerRibbon';
import { ContactSection } from './components/ContactSection';
import { ClientAreaPortal } from './components/ClientAreaPortal';
import { VisitorLiveChatWidget } from './components/VisitorLiveChatWidget';
import { BryTechLogo } from './components/BryTechLogo';
import { ArrowLeft, Shield, Send, MessageCircle, Instagram, PhoneCall } from 'lucide-react';

export function App() {
  const [lang, setLang] = useState<Language>('en');
  const [activePage, setActivePage] = useState<ActivePageView>('overview');
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [isPortalOpen, setIsPortalOpen] = useState<boolean>(false);
  const [portalInitialMode, setPortalInitialMode] = useState<'client' | 'admin'>('client');
  const [prefilledChatTopic, setPrefilledChatTopic] = useState<string | null>(null);

  useEffect(() => {
    const dir = TRANSLATIONS[lang].dir;
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
  }, [lang]);

  const handleSelectPackage = (pkgName: string) => {
    setSelectedPackage(pkgName);
    setActivePage('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTierForPricing = (_tierId: string) => {
    setActivePage('pricing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenClientArea = () => {
    setPortalInitialMode('client');
    setIsPortalOpen(true);
  };

  const handleOpenAdminArea = () => {
    setPortalInitialMode('admin');
    setIsPortalOpen(true);
  };

  const handleNavigatePage = (page: ActivePageView) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const altNav = ALTEGIO_PLATFORM_DATA[lang].navExtended;
  const t = TRANSLATIONS[lang];

  return (
    <div
      dir={t.dir}
      className="min-h-screen w-full bg-[#f5f5f7] text-[#1d1d1f] selection:bg-[#0071e3]/15 selection:text-[#0071e3] overflow-x-hidden flex flex-col justify-between"
    >
      <Navbar
        lang={lang}
        onChangeLang={setLang}
        onOpenPortal={handleOpenClientArea}
        activePage={activePage}
        onSelectPage={handleNavigatePage}
      />

      <main className="w-full flex-1">
        {/* Sub-page Breadcrumb Header when viewing a dedicated page */}
        {activePage !== 'overview' && (
          <div className="pt-20 pb-3 px-4 sm:px-8 lg:px-12 xl:px-16 bg-white/85 backdrop-blur-md border-b border-black/[0.06]">
            <div className="w-full max-w-[1920px] mx-auto flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => handleNavigatePage('overview')}
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#0071e3] hover:underline cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{altNav.backToHome}</span>
              </button>

              <div className="flex flex-wrap items-center gap-2 text-xs text-[#6e6e73]">
                <span>Dedicated Page:</span>
                <span className="px-3 py-1 rounded-full bg-[#f5f5f7] text-[#1d1d1f] font-semibold">
                  {activePage === 'business-types'
                    ? altNav.businessTypes
                    : activePage === 'industries'
                    ? altNav.industries
                    : activePage === 'solutions'
                    ? altNav.solutions
                    : activePage === 'pricing'
                    ? altNav.pricing
                    : activePage === 'simulator'
                    ? t.nav.calculator
                    : activePage === 'cases'
                    ? t.nav.cases
                    : activePage === 'about'
                    ? t.nav.about
                    : t.nav.contact}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* PAGE 1: MAIN OVERVIEW PAGE (Clean executive overview, not a one-page dump) */}
        {activePage === 'overview' && (
          <>
            <HeroSection
              lang={lang}
              onOpenPortal={handleOpenClientArea}
              onSelectPage={handleNavigatePage}
            />
            <UnifiedVisionOverviewSection
              lang={lang}
              onSelectPage={handleNavigatePage}
              onOpenPortal={handleOpenClientArea}
            />
            <DirectMessengerRibbon lang={lang} onSelectPage={handleNavigatePage} />
          </>
        )}

        {/* PAGE 2: DEDICATED SOLUTIONS & CUSTOM MODULES PAGE */}
        {activePage === 'solutions' && (
          <>
            <CapabilitiesSection
              lang={lang}
              onSelectPackage={handleSelectPackage}
              onOpenClientPortal={handleOpenClientArea}
            />
            <AltegioSolutionsEcosystemSection
              lang={lang}
              onSelectPackage={handleSelectPackage}
              onOpenClientPortal={handleOpenClientArea}
            />
          </>
        )}

        {/* PAGE 3: DEDICATED INDUSTRIES & INTERACTIVE BOOKING PAGE */}
        {activePage === 'industries' && (
          <AltegioIndustriesSection lang={lang} onSelectPackage={handleSelectPackage} />
        )}

        {/* PAGE 4: DEDICATED BUSINESS TYPES & SCALE PAGE */}
        {activePage === 'business-types' && (
          <AltegioBusinessTypesSection
            lang={lang}
            onSelectPackage={handleSelectPackage}
            onSelectTierForPricing={handleSelectTierForPricing}
          />
        )}

        {/* PAGE 5: DEDICATED INTERACTIVE SYSTEM SIMULATOR PAGE */}
        {activePage === 'simulator' && (
          <SystemSimulatorSection lang={lang} onSelectPackage={handleSelectPackage} />
        )}

        {/* PAGE 6: DEDICATED CASE STUDIES PAGE */}
        {activePage === 'cases' && (
          <CaseStudiesSection
            lang={lang}
            onSelectCaseStudy={(caseName) => handleSelectPackage(caseName)}
          />
        )}

        {/* PAGE 7: DEDICATED CUSTOM SYSTEM PRICING PAGE */}
        {activePage === 'pricing' && (
          <AltegioPricingSection
            lang={lang}
            onSelectPackage={handleSelectPackage}
            onOpenVisitorChatWithBlueprint={(blueprintSummary) => {
              setPrefilledChatTopic(blueprintSummary);
            }}
          />
        )}

        {/* PAGE 8: DEDICATED ABOUT COMPANY & VISION PAGE */}
        {activePage === 'about' && (
          <>
            <AboutCompanyPage
              lang={lang}
              onSelectPage={handleNavigatePage}
              onOpenPortal={handleOpenClientArea}
            />
            <AboutSection
              lang={lang}
              onOpenLearnMoreModal={() => handleSelectPackage('Custom System Architecture')}
            />
          </>
        )}

        {/* PAGE 9: DEDICATED CONTACT PAGE */}
        {activePage === 'contact' && (
          <ContactSection
            lang={lang}
            prefilledSubject={selectedPackage}
            onOpenAdminGate={handleOpenAdminArea}
          />
        )}
      </main>

      {/* Global Clean Apple-Style Footer with Direct Contacts & Subtle Admin Icon */}
      <footer
        dir={t.dir}
        className="w-full bg-white border-t border-black/[0.06] py-8 px-4 sm:px-8 lg:px-12 xl:px-16"
      >
        <div className="w-full max-w-[1920px] mx-auto flex flex-col gap-5 text-xs text-[#6e6e73]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <BryTechLogo theme="light-surface" size="sm" />
              <span>·</span>
              <span>{t.contact.footerTagline}</span>
            </div>

            {/* Direct Contact Badges in Footer */}
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              <a
                href="https://t.me/Brytech_systems"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f5f5f7] hover:bg-[#0088cc] text-[#1d1d1f] hover:text-white font-semibold transition-all no-underline"
              >
                <Send className="w-3.5 h-3.5 text-[#0088cc] group-hover:text-white" />
                <span>@Brytech_systems</span>
              </a>
              <a
                href="https://wa.me/380637127001"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f5f5f7] hover:bg-emerald-500 text-[#1d1d1f] hover:text-white font-semibold transition-all no-underline"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-500" />
                <span>+380 63 712 7001</span>
              </a>
              <a
                href="https://instagram.com/BryTech_Systems"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f5f5f7] hover:bg-pink-600 text-[#1d1d1f] hover:text-white font-semibold transition-all no-underline"
              >
                <Instagram className="w-3.5 h-3.5 text-pink-600" />
                <span>@BryTech_Systems</span>
              </a>
              <a
                href="tel:+380637127001"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f5f5f7] hover:bg-[#0071e3] text-[#1d1d1f] hover:text-white font-semibold transition-all no-underline"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#0071e3]" />
                <span>+380 63 712 7001</span>
              </a>
            </div>
          </div>

          <div className="pt-4 border-t border-black/[0.05] flex flex-wrap items-center justify-center md:justify-end gap-4">
            <button
              type="button"
              onClick={() => handleNavigatePage('overview')}
              className="hover:text-[#1d1d1f] transition-colors cursor-pointer"
            >
              {altNav.overview}
            </button>
            <button
              type="button"
              onClick={() => handleNavigatePage('solutions')}
              className="hover:text-[#1d1d1f] transition-colors cursor-pointer"
            >
              {altNav.solutions}
            </button>
            <button
              type="button"
              onClick={() => handleNavigatePage('industries')}
              className="hover:text-[#1d1d1f] transition-colors cursor-pointer"
            >
              {altNav.industries}
            </button>
            <button
              type="button"
              onClick={() => handleNavigatePage('business-types')}
              className="hover:text-[#1d1d1f] transition-colors cursor-pointer"
            >
              {altNav.businessTypes}
            </button>
            <button
              type="button"
              onClick={() => handleNavigatePage('simulator')}
              className="hover:text-[#1d1d1f] transition-colors cursor-pointer"
            >
              {t.nav.calculator}
            </button>
            <button
              type="button"
              onClick={() => handleNavigatePage('cases')}
              className="hover:text-[#1d1d1f] transition-colors cursor-pointer"
            >
              {t.nav.cases}
            </button>
            <button
              type="button"
              onClick={() => handleNavigatePage('pricing')}
              className="hover:text-[#1d1d1f] transition-colors cursor-pointer"
            >
              {altNav.pricing}
            </button>
            <button
              type="button"
              onClick={() => handleNavigatePage('about')}
              className="hover:text-[#1d1d1f] transition-colors cursor-pointer"
            >
              {t.nav.about}
            </button>
            <button
              type="button"
              onClick={() => handleNavigatePage('contact')}
              className="hover:text-[#1d1d1f] transition-colors cursor-pointer"
            >
              {t.nav.contact}
            </button>

            {/* Discreet Small Admin Lock Icon in Footer */}
            <button
              type="button"
              onClick={handleOpenAdminArea}
              title="Admin Access"
              aria-label="Admin Access"
              className="w-7 h-7 rounded-full bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[#86868b] hover:text-[#1d1d1f] flex items-center justify-center transition-colors cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </footer>

      {/* Floating Bottom-Right Visitor Chat Widget (AI Bot -> Live Human Architect) */}
      <VisitorLiveChatWidget
        lang={lang}
        prefilledTopic={prefilledChatTopic}
        onClearPrefilledTopic={() => setPrefilledChatTopic(null)}
      />

      {/* Full-Featured Client Area & Executive Admin Portal */}
      <ClientAreaPortal
        isOpen={isPortalOpen}
        onClose={() => setIsPortalOpen(false)}
        lang={lang}
        onChangeLang={setLang}
        initialMode={portalInitialMode}
      />
    </div>
  );
}

export default App;
