import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Language, TRANSLATIONS } from '../i18n/translations';
import { ALTEGIO_PLATFORM_DATA } from '../data/altegioPlatformData';
import { BryTechVisualArtwork, ArtworkVariant } from './BryTechVisualArtwork';
import {
  ArrowRight,
  Lock,
  Sparkles,
  CheckCircle2,
  Calendar,
  Users,
  MessageSquare,
  Layers,
} from 'lucide-react';
import { ActivePageView } from './Navbar';

interface HeroSectionProps {
  lang: Language;
  onOpenPortal: () => void;
  onSelectPage?: (page: ActivePageView) => void;
}

const HERO_EXTRA_COPY: Record<
  Language,
  {
    kicker: string;
    secondaryCta: string;
    stageTitle: string;
    stageSub: string;
  }
> = {
  en: {
    kicker: 'Custom-Engineered Unified Business Operating Systems',
    secondaryCta: 'Explore Custom Modules',
    stageTitle: 'Every Business Operation in One Custom System',
    stageSub:
      'Instead of juggling disconnected SaaS tools, we architect a single unified platform around your exact workflows — CRM, booking, messenger bots, finance, and client portals.',
  },
  ru: {
    kicker: 'Индивидуальные Единые Операционные Системы Бизнеса',
    secondaryCta: 'Изучить Модули Системы',
    stageTitle: 'Все Процессы Вашего Бизнеса в Одной Системе',
    stageSub:
      'Вместо разрозненных коробочных сервисов мы проектируем единую платформу под ваши процессы — CRM, запись, боты мессенджеров, финансы и клиентский портал.',
  },
  uk: {
    kicker: 'Індивідуальні Єдині Операційні Системи Бізнесу',
    secondaryCta: 'Дослідити Модулі Системи',
    stageTitle: 'Усі Процеси Вашого Бізнесу в Одній Системі',
    stageSub:
      'Замість розрізнених коробкових сервісів ми проєктуємо єдину платформу під ваші процеси — CRM, запис, боти месенджерів, фінанси та клієнтський портал.',
  },
  he: {
    kicker: 'מערכות הפעלה עסקיות אחודות בהתאמה אישית מלאה',
    secondaryCta: 'לחקור מודולים מותאמים',
    stageTitle: 'כל תהליכי העסק במערכת אחודה אחת',
    stageSub:
      'במקום לתפעל תוכנות מנותקות, אנו מתכננים פלטפורמה אחת סביב תהליכי העבודה שלך — CRM, יומן תורים, בוטים, כספים ופורטל לקוחות.',
  },
};

export const HeroSection: React.FC<HeroSectionProps> = ({
  lang,
  onOpenPortal,
  onSelectPage,
}) => {
  const t = TRANSLATIONS[lang];
  const altData = ALTEGIO_PLATFORM_DATA[lang];
  const extra = HERO_EXTRA_COPY[lang];

  const [activePreview, setActivePreview] = useState<ArtworkVariant>('websites');

  const previewTabs: {
    id: ArtworkVariant;
    label: Record<Language, string>;
    metric: string;
    icon: React.ComponentType<{ className?: string }>;
  }[] = [
    {
      id: 'websites',
      label: {
        en: 'Custom Booking & Web',
        uk: 'Кастомний Запис і Сайт',
        ru: 'Кастомная Запись и Сайт',
        he: 'הזמנות ואתר מותאם',
      },
      metric: '+68% Direct Conversions',
      icon: Calendar,
    },
    {
      id: 'crm',
      label: {
        en: 'Unified Custom CRM',
        uk: 'Єдина Кастомна CRM',
        ru: 'Единая Кастомная CRM',
        he: 'מערכת CRM מאוחדת',
      },
      metric: '100% Workflow Fit',
      icon: Users,
    },
    {
      id: 'automation',
      label: {
        en: 'WhatsApp & Telegram Bots',
        uk: 'WhatsApp і Telegram Боти',
        ru: 'Боты WhatsApp и Telegram',
        he: 'בוטים לוואטסאפ וטלגרם',
      },
      metric: '-78% Manual Routine',
      icon: MessageSquare,
    },
    {
      id: 'portal',
      label: {
        en: 'Client Self-Service Area',
        uk: 'Кабінет Клієнта',
        ru: 'Личный Кабинет Клиента',
        he: 'אזור אישי ללקוחות',
      },
      metric: '24/7 Live Transparency',
      icon: Layers,
    },
  ];

  const statItems = [
    { label: t.hero.stats.label1, value: t.hero.stats.val1 },
    { label: t.hero.stats.label2, value: t.hero.stats.val2 },
    { label: t.hero.stats.label3, value: t.hero.stats.val3 },
    { label: t.hero.stats.label4, value: t.hero.stats.val4 },
  ];

  return (
    <section
      id="hero"
      dir={t.dir}
      className="relative w-full min-h-[100svh] flex flex-col justify-center pt-28 pb-20 px-4 sm:px-8 lg:px-12 xl:px-16 overflow-hidden bg-gradient-to-b from-[#f5f5f7] via-white to-[#f5f5f7]"
    >
      {/* Subtle Apple Ambient Radial Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[560px] rounded-full opacity-55 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(0,113,227,0.11) 0%, rgba(21,188,223,0.06) 45%, transparent 75%)',
        }}
      />

      <div className="relative z-10 w-full max-w-[1920px] mx-auto my-auto">
        {/* Centered Apple-Style Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-5xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0071e3]/10 text-[#0071e3] text-xs font-semibold tracking-tight mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{extra.kicker}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-[66px] font-bold tracking-[-0.035em] text-[#1d1d1f] leading-[1.06] mb-6">
            {t.hero.lines[0]} {t.hero.lines[1]}{' '}
            <span className="bg-gradient-to-r from-[#0071e3] to-[#00a2ff] bg-clip-text text-transparent">
              {t.hero.lines[2]} {t.hero.lines[3]}
            </span>{' '}
            {t.hero.lines[4]} {t.hero.lines[5]}
          </h1>

          <p className="text-base sm:text-xl text-[#6e6e73] max-w-3xl mx-auto leading-relaxed font-normal mb-9">
            {t.hero.subtitle}
          </p>

          {/* Clean CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 mb-12">
            <button
              type="button"
              onClick={() => {
                if (onSelectPage) onSelectPage('pricing');
              }}
              className="px-8 py-4 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-semibold text-sm sm:text-base flex items-center gap-2.5 shadow-[0_10px_28px_rgba(0,113,227,0.28)] transition-all duration-200 cursor-pointer"
            >
              <span>{t.hero.ctaPrimary}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => {
                if (onSelectPage) onSelectPage('solutions');
              }}
              className="px-7 py-4 rounded-full bg-[#1d1d1f] hover:bg-[#333336] text-white font-semibold text-sm sm:text-base flex items-center gap-2 transition-all duration-200 cursor-pointer"
            >
              <Layers className="w-4 h-4 text-[#d4af37]" />
              <span>{extra.secondaryCta}</span>
            </button>

            <button
              type="button"
              onClick={onOpenPortal}
              className="px-7 py-4 rounded-full bg-white hover:bg-[#f5f5f7] text-[#1d1d1f] font-semibold text-sm sm:text-base border border-black/[0.1] flex items-center gap-2 shadow-xs transition-all duration-200 cursor-pointer"
            >
              <Lock className="w-4 h-4 text-[#0071e3]" />
              <span>{t.hero.ctaClientArea}</span>
            </button>
          </div>
        </motion.div>

        {/* Interactive Apple/Alteg.io Product Stage */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="w-full"
        >
          {/* Interactive Module Switcher Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
            {previewTabs.map((tab) => {
              const Icon = tab.icon;
              const active = activePreview === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActivePreview(tab.id)}
                  className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all duration-200 cursor-pointer ${
                    active
                      ? 'bg-[#1d1d1f] text-white shadow-md'
                      : 'bg-white text-[#6e6e73] hover:text-[#1d1d1f] border border-black/[0.07]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-[#52a8ff]' : 'text-[#0071e3]'}`} />
                  <span>{tab.label[lang]}</span>
                </button>
              );
            })}
          </div>

          {/* Main Elevated Glass Showcase Card */}
          <div className="rounded-[32px] bg-white p-4 sm:p-8 border border-black/[0.07] shadow-[0_24px_70px_rgba(0,0,0,0.07)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left 8 Columns: Animated Product Visual */}
              <div className="lg:col-span-8 h-[340px] sm:h-[460px] xl:h-[520px] rounded-2xl overflow-hidden bg-[#f5f5f7] border border-black/[0.05]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activePreview}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.35 }}
                    className="w-full h-full"
                  >
                    <BryTechVisualArtwork variant={activePreview} />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right 4 Columns: Clean Value Summary & Metrics */}
              <div className="lg:col-span-4 flex flex-col justify-between space-y-6 p-2 sm:p-4">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#0071e3] block mb-2">
                    {altData.solutionsSection.kicker}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1d1d1f] leading-snug mb-3">
                    {extra.stageTitle}
                  </h2>
                  <p className="text-sm sm:text-base text-[#6e6e73] leading-relaxed">
                    {extra.stageSub}
                  </p>
                </div>

                <div className="space-y-3 border-t border-black/[0.06] pt-5">
                  {statItems.map((m) => (
                    <div
                      key={m.label}
                      className="flex items-center justify-between p-4 rounded-2xl bg-[#f5f5f7]"
                    >
                      <div className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#0071e3] shrink-0" />
                        <span className="text-xs sm:text-sm font-medium text-[#424245]">
                          {m.label}
                        </span>
                      </div>
                      <span className="text-base sm:text-lg font-bold text-[#1d1d1f] tabular-nums">
                        {m.value}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {(['business-types', 'industries', 'solutions', 'pricing'] as const).map((pg) => (
                    <button
                      key={pg}
                      type="button"
                      onClick={() => onSelectPage?.(pg)}
                      className="px-4 py-2 rounded-full bg-[#f5f5f7] hover:bg-[#e8e8ed] text-xs font-semibold text-[#1d1d1f] transition-colors cursor-pointer"
                    >
                      {pg === 'business-types'
                        ? altData.navExtended.businessTypes
                        : pg === 'industries'
                        ? altData.navExtended.industries
                        : pg === 'solutions'
                        ? altData.navExtended.solutions
                        : altData.navExtended.pricing}{' '}
                      →
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
