import React, { useState, useEffect } from 'react';
import { Language, TRANSLATIONS } from '../i18n/translations';
import { ALTEGIO_PLATFORM_DATA } from '../data/altegioPlatformData';
import {
  Menu,
  X,
  Lock,
  Layers,
  Building2,
  CreditCard,
  Sparkles,
  PhoneCall,
  Info,
  Sliders,
  Briefcase,
} from 'lucide-react';
import { BryTechLogo } from './BryTechLogo';

export type ActivePageView =
  | 'overview'
  | 'business-types'
  | 'industries'
  | 'solutions'
  | 'simulator'
  | 'cases'
  | 'pricing'
  | 'about'
  | 'contact';

interface NavbarProps {
  lang: Language;
  onChangeLang: (lang: Language) => void;
  onOpenPortal: () => void;
  activePage?: ActivePageView;
  onSelectPage?: (page: ActivePageView) => void;
}

const EXTRA_NAV_LABELS: Record<
  Language,
  {
    simulator: string;
    cases: string;
  }
> = {
  en: {
    simulator: 'System Builder',
    cases: 'Case Studies',
  },
  ru: {
    simulator: 'Конструктор',
    cases: 'Кейсы',
  },
  uk: {
    simulator: 'Конструктор',
    cases: 'Кейси',
  },
  he: {
    simulator: 'סימולטור',
    cases: 'סיפורי הצלחה',
  },
};

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onChangeLang,
  onOpenPortal,
  activePage = 'overview',
  onSelectPage,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = TRANSLATIONS[lang];
  const altNav = ALTEGIO_PLATFORM_DATA[lang].navExtended;
  const extraNav = EXTRA_NAV_LABELS[lang];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'EN' },
    { code: 'uk', label: 'UA' },
    { code: 'ru', label: 'RU' },
    { code: 'he', label: 'HE' },
  ];

  const handlePageSelect = (page: ActivePageView) => {
    setMobileMenuOpen(false);
    if (onSelectPage) {
      onSelectPage(page);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems: {
    id: ActivePageView;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }[] = [
    { id: 'overview', label: altNav.overview, icon: Sparkles },
    { id: 'solutions', label: altNav.solutions, icon: Layers },
    { id: 'industries', label: altNav.industries, icon: Building2 },
    { id: 'business-types', label: altNav.businessTypes, icon: Briefcase },
    { id: 'simulator', label: extraNav.simulator, icon: Sliders },
    { id: 'cases', label: extraNav.cases, icon: Sparkles },
    { id: 'pricing', label: altNav.pricing, icon: CreditCard },
    { id: 'about', label: t.nav.about, icon: Info },
    { id: 'contact', label: t.nav.contact, icon: PhoneCall },
  ];

  return (
    <header
      dir={t.dir}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled || mobileMenuOpen
          ? 'bg-white/92 backdrop-blur-xl border-b border-black/[0.08] py-3 shadow-[0_4px_24px_rgba(0,0,0,0.04)]'
          : 'bg-white/80 backdrop-blur-md border-b border-black/[0.05] py-3.5'
      }`}
    >
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 flex items-center justify-between gap-3">
        {/* Clean Brand Logo */}
        <button
          type="button"
          onClick={() => handlePageSelect('overview')}
          className="flex items-center gap-2.5 group cursor-pointer bg-transparent border-0 p-0 text-start shrink-0"
        >
          <BryTechLogo
            theme="light-surface"
            size="md"
            subtitle="Custom Business OS"
          />
        </button>

        {/* Dedicated Pages Navigation */}
        <nav className="hidden xl:flex items-center gap-1 bg-[#f5f5f7] p-1 rounded-full border border-black/[0.05]">
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handlePageSelect(item.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-white text-[#1d1d1f] shadow-xs'
                    : 'text-[#6e6e73] hover:text-[#1d1d1f]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Controls: Language Switcher + Client Area Button */}
        <div className="hidden md:flex items-center gap-2.5 shrink-0">
          {/* Language Switcher (EN / UA / RU / HE) */}
          <div
            className="flex items-center bg-[#f5f5f7] rounded-full p-1 border border-black/[0.05]"
            role="group"
            aria-label="Select Language"
          >
            {languages.map((l) => (
              <button
                key={l.code}
                type="button"
                onClick={() => onChangeLang(l.code)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-full transition-all duration-200 cursor-pointer ${
                  lang === l.code
                    ? 'bg-white text-[#1d1d1f] shadow-xs'
                    : 'text-[#6e6e73] hover:text-[#1d1d1f]'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Client Area Login Button */}
          <button
            type="button"
            onClick={onOpenPortal}
            className="px-4 py-2 rounded-full bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[#1d1d1f] text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Lock className="w-3.5 h-3.5 text-[#0071e3]" />
            <span>{t.nav.clientArea}</span>
          </button>

          {/* Primary Action Button */}
          <button
            type="button"
            onClick={() => handlePageSelect('contact')}
            className="px-5 py-2 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-semibold transition-all duration-200 shadow-xs cursor-pointer"
          >
            {t.hero.ctaPrimary}
          </button>
        </div>

        {/* Mobile / Tablet Menu Button */}
        <div className="flex xl:hidden items-center gap-2">
          <div className="flex md:hidden items-center bg-[#f5f5f7] rounded-full p-0.5 border border-black/[0.05]">
            {languages.map((l) => (
              <button
                key={l.code}
                type="button"
                onClick={() => onChangeLang(l.code)}
                className={`px-2 py-1 text-[11px] font-semibold rounded-full transition-all cursor-pointer ${
                  lang === l.code ? 'bg-white text-[#1d1d1f] shadow-xs' : 'text-[#6e6e73]'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
            className="p-2 rounded-full bg-[#f5f5f7] text-[#1d1d1f] cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Clean Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-black/[0.08] px-5 pt-3 pb-6 space-y-3 shadow-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handlePageSelect(item.id)}
                  className={`w-full text-start px-4 py-3 rounded-2xl text-sm font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#0071e3]/10 text-[#0071e3]'
                      : 'text-[#1d1d1f] hover:bg-[#f5f5f7]'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-[#0071e3]" />
                    <span>{item.label}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-black/[0.06] grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPortal();
              }}
              className="w-full py-3 px-4 rounded-2xl bg-[#f5f5f7] text-[#1d1d1f] font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <Lock className="w-4 h-4 text-[#0071e3]" />
              <span>{t.nav.clientArea}</span>
            </button>

            <button
              type="button"
              onClick={() => handlePageSelect('contact')}
              className="w-full py-3.5 px-4 rounded-2xl bg-[#0071e3] text-white font-semibold text-sm text-center cursor-pointer"
            >
              {t.hero.ctaPrimary}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
