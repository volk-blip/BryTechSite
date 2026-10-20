import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Language, TRANSLATIONS } from '../i18n/translations';
import { ALTEGIO_PLATFORM_DATA } from '../data/altegioPlatformData';
import { EXTRA_INDUSTRIES, EXTRA_SOLUTIONS } from '../data/catalogExpansionData';
import {
  Check,
  ArrowRight,
  Calendar,
  Sparkles,
  Users,
  Layers,
  Clock,
  CheckCircle2,
  Zap,
  Globe,
} from 'lucide-react';

interface AltegioBusinessTypesSectionProps {
  lang: Language;
  onSelectTierForPricing: (tierId: string) => void;
  onSelectPackage: (packageName: string) => void;
}

export const AltegioBusinessTypesSection: React.FC<AltegioBusinessTypesSectionProps> = ({
  lang,
  onSelectTierForPricing,
  onSelectPackage,
}) => {
  const t = TRANSLATIONS[lang];
  const data = ALTEGIO_PLATFORM_DATA[lang].businessTypesSection;
  const [activeTypeId, setActiveTypeId] = useState<string>(data.items[1]?.id || 'smb');
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const yHeader = useTransform(scrollYProgress, [0, 1], [30, -25]);

  return (
    <section
      ref={sectionRef}
      id="business-types"
      dir={t.dir}
      className="relative w-full min-h-[100svh] flex flex-col justify-center bg-white text-[#1d1d1f] py-24 px-4 sm:px-8 border-t border-black/[0.06] overflow-hidden"
    >
      <div className="max-w-[1920px] w-full mx-auto my-auto px-0 sm:px-4 lg:px-8">
        <motion.div
          style={{ y: yHeader }}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0071e3]/10 text-[#0071e3] text-xs font-semibold mb-4">
            <Users className="w-3.5 h-3.5" />
            {data.kicker}
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-[52px] font-bold tracking-[-0.035em] text-[#1d1d1f] leading-[1.08] mb-4">
            {data.title}
          </h2>
          <p className="text-base sm:text-lg text-[#6e6e73] leading-relaxed">
            {data.subtitle}
          </p>
        </motion.div>

        {/* 4 Clean Apple Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.items.map((item, idx) => {
            const isSelected = item.id === activeTypeId;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.55, delay: idx * 0.08 }}
                whileHover={{ y: -5 }}
                onClick={() => setActiveTypeId(item.id)}
                className={`rounded-[32px] p-7 sm:p-8 transition-all cursor-pointer flex flex-col justify-between border ${
                  isSelected
                    ? 'bg-white border-[#0071e3] shadow-[0_24px_60px_rgba(0,113,227,0.12)]'
                    : 'bg-[#f5f5f7] border-black/[0.05] hover:bg-white'
                }`}
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
                    <span className="px-3.5 py-1 rounded-full bg-[#0071e3]/10 text-[#0071e3] text-xs font-semibold">
                      {item.badge}
                    </span>
                    <span className="text-sm font-bold text-[#0071e3]">
                      {item.metricHighlight}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1d1d1f] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm font-medium text-[#6e6e73] mb-4">
                    {item.subtitle}
                  </p>
                  <p className="text-sm text-[#424245] leading-relaxed mb-6">
                    {item.description}
                  </p>

                  {/* Included Modules Pills */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {item.includedModules.map((mod) => (
                      <span
                        key={mod}
                        className="px-3 py-1 rounded-full bg-white border border-black/[0.07] text-xs font-medium text-[#1d1d1f]"
                      >
                        {mod}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-5 border-t border-black/[0.06] flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs font-semibold text-[#6e6e73]">
                    {item.staffRange}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectTierForPricing(item.recommendedTeamTierId);
                      }}
                      className="px-4 py-2 rounded-full bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[#1d1d1f] text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Pricing Calculator
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectPackage(`${item.title} (${item.staffRange})`);
                      }}
                      className="px-4 py-2 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>Select</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

interface AltegioIndustriesSectionProps {
  lang: Language;
  onSelectPackage: (packageName: string) => void;
}

export const AltegioIndustriesSection: React.FC<AltegioIndustriesSectionProps> = ({
  lang,
  onSelectPackage,
}) => {
  const t = TRANSLATIONS[lang];
  const baseData = ALTEGIO_PLATFORM_DATA[lang].industriesSection;
  const allIndustries = [...baseData.items, ...EXTRA_INDUSTRIES[lang]];

  const [selectedIndustryId, setSelectedIndustryId] = useState<string>(
    allIndustries[0]?.id || 'medical'
  );
  const [selectedServiceIdx, setSelectedServiceIdx] = useState<number>(0);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('11:30');
  const [bookingSuccessToast, setBookingSuccessToast] = useState<boolean>(false);

  const activeIndustry =
    allIndustries.find((ind) => ind.id === selectedIndustryId) || allIndustries[0];

  const timeSlots = ['09:30', '11:30', '14:00', '16:30', '18:00'];

  const handleSimulatedBooking = () => {
    setBookingSuccessToast(true);
    setTimeout(() => setBookingSuccessToast(false), 3200);
  };

  return (
    <section
      id="industries"
      dir={t.dir}
      className="relative w-full min-h-[100svh] flex flex-col justify-center bg-[#f5f5f7] text-[#1d1d1f] py-24 px-4 sm:px-8 border-t border-black/[0.06] overflow-hidden"
    >
      <div className="max-w-[1920px] w-full mx-auto my-auto px-0 sm:px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65 }}
          className="text-center max-w-3xl mx-auto mb-10"
        >
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0071e3]/10 text-[#0071e3] text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            12 Specialized Industry Templates
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-[52px] font-bold tracking-[-0.035em] text-[#1d1d1f] leading-[1.08] mb-4">
            {baseData.title}
          </h2>
          <p className="text-base sm:text-lg text-[#6e6e73] leading-relaxed">
            {baseData.subtitle}
          </p>
        </motion.div>

        {/* 12 Industry Selector Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {allIndustries.map((ind) => {
            const active = ind.id === activeIndustry.id;
            return (
              <button
                key={ind.id}
                type="button"
                onClick={() => {
                  setSelectedIndustryId(ind.id);
                  setSelectedServiceIdx(0);
                  setBookingSuccessToast(false);
                }}
                className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  active
                    ? 'bg-[#1d1d1f] text-white shadow-md scale-[1.02]'
                    : 'bg-white text-[#6e6e73] hover:text-[#1d1d1f] border border-black/[0.06]'
                }`}
              >
                {ind.shortTitle}
              </button>
            );
          })}
        </div>

        {/* Interactive Split Showcase: Left Industry Details + Right Live Booking Simulator */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndustry.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
          >
            {/* Left Details Card */}
            <div className="lg:col-span-6 rounded-[32px] bg-white p-7 sm:p-10 border border-black/[0.06] shadow-[0_14px_40px_rgba(0,0,0,0.04)] flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
                  <span className="px-3.5 py-1 rounded-full bg-[#0071e3]/10 text-[#0071e3] text-xs font-semibold">
                    {activeIndustry.category}
                  </span>
                  <span className="px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold">
                    {activeIndustry.kpiMetric}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#1d1d1f] mb-4">
                  {activeIndustry.title}
                </h3>

                <p className="text-sm sm:text-base text-[#6e6e73] leading-relaxed mb-7">
                  {activeIndustry.description}
                </p>

                <div className="space-y-3 mb-8 pt-6 border-t border-black/[0.06]">
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#86868b] mb-2">
                    {baseData.automationsLabel}
                  </div>
                  {activeIndustry.automations.map((auto) => (
                    <div key={auto} className="flex items-start gap-3 text-sm text-[#1d1d1f]">
                      <div className="w-5 h-5 rounded-full bg-[#0071e3]/10 text-[#0071e3] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="font-medium">{auto}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-5 border-t border-black/[0.06] flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs font-medium text-[#6e6e73]">
                  {activeIndustry.exampleLocations}
                </span>
                <button
                  type="button"
                  onClick={() => onSelectPackage(`Industry System: ${activeIndustry.title}`)}
                  className="px-6 py-3 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-sm font-semibold inline-flex items-center gap-2 transition-colors cursor-pointer shadow-sm"
                >
                  <span>{baseData.bookNowDemo}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Interactive Live Booking Widget Preview */}
            <div className="lg:col-span-6 rounded-[32px] bg-[#1d1d1f] text-white p-7 sm:p-10 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 pb-5 mb-6 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <Calendar className="w-4 h-4 text-[#0071e3]" />
                    <span className="text-xs font-semibold text-white/70">
                      {baseData.liveWidgetTag}
                    </span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-white/10 text-[11px] font-semibold text-emerald-400">
                    24/7 Self-Booking
                  </span>
                </div>

                <h4 className="text-lg sm:text-xl font-bold text-white mb-5">
                  {activeIndustry.bookingPreviewTitle}
                </h4>

                {/* Selectable Services */}
                <div className="space-y-2.5 mb-6">
                  {activeIndustry.bookingServices.map((srv, idx) => {
                    const isPicked = selectedServiceIdx === idx;
                    return (
                      <div
                        key={srv.name}
                        onClick={() => setSelectedServiceIdx(idx)}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                          isPicked
                            ? 'bg-white/12 border-[#0071e3]'
                            : 'bg-white/[0.04] border-white/10 hover:bg-white/[0.08]'
                        }`}
                      >
                        <div>
                          <div className="text-sm font-semibold text-white">{srv.name}</div>
                          <div className="text-xs text-white/55 mt-0.5">
                            {srv.duration} · {srv.staff}
                          </div>
                        </div>
                        <span className="text-sm font-bold text-[#15BCDF] shrink-0">
                          ${srv.priceUsd}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Time Slots */}
                <div className="mb-6">
                  <div className="text-xs font-medium text-white/60 mb-2.5">
                    Select Available Slot
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {timeSlots.map((slot) => {
                      const active = selectedTimeSlot === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedTimeSlot(slot)}
                          className={`py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                            active
                              ? 'bg-[#0071e3] text-white'
                              : 'bg-white/10 text-white/75 hover:bg-white/15'
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div>
                {bookingSuccessToast ? (
                  <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs sm:text-sm font-semibold text-center">
                    ✓ Test booking confirmed for {selectedTimeSlot}! Synced to CRM &amp; WhatsApp Bot.
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleSimulatedBooking}
                    className="w-full py-3.5 px-6 rounded-full bg-white text-[#1d1d1f] hover:bg-[#f5f5f7] text-sm font-bold transition-colors cursor-pointer"
                  >
                    Simulate Instant Booking ({selectedTimeSlot})
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Compact 12-Industry Directory Grid for Quick Scanning */}
        <div className="mt-14 pt-10 border-t border-black/[0.06]">
          <div className="text-xs font-semibold uppercase tracking-widest text-[#86868b] text-center mb-6">
            All 12 Supported Business Verticals — Click Any Industry Above to Preview Live
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {allIndustries.map((ind) => {
              const isAct = ind.id === activeIndustry.id;
              return (
                <div
                  key={ind.id}
                  onClick={() => setSelectedIndustryId(ind.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isAct
                      ? 'bg-white border-[#0071e3] shadow-sm'
                      : 'bg-white/60 border-black/[0.05] hover:bg-white'
                  }`}
                >
                  <div className="text-[11px] font-semibold text-[#0071e3] truncate">
                    {ind.kpiMetric}
                  </div>
                  <div className="text-xs font-bold text-[#1d1d1f] mt-1 truncate">
                    {ind.shortTitle}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

interface AltegioSolutionsEcosystemSectionProps {
  lang: Language;
  onSelectPackage: (packageName: string) => void;
  onOpenClientPortal: () => void;
}

export const AltegioSolutionsEcosystemSection: React.FC<
  AltegioSolutionsEcosystemSectionProps
> = ({ lang, onSelectPackage, onOpenClientPortal }) => {
  const t = TRANSLATIONS[lang];
  const baseData = ALTEGIO_PLATFORM_DATA[lang].solutionsSection;
  const allModules = [...baseData.items, ...EXTRA_SOLUTIONS[lang]];

  const [selectedCategory, setSelectedCategory] = useState<
    'all' | 'booking' | 'crm' | 'portal' | 'automation' | 'finance' | 'analytics'
  >('all');

  const filteredModules =
    selectedCategory === 'all'
      ? allModules
      : allModules.filter((m) => m.category === selectedCategory);

  const categoryKeys: Array<
    'all' | 'booking' | 'crm' | 'portal' | 'automation' | 'finance' | 'analytics'
  > = ['all', 'booking', 'crm', 'portal', 'automation', 'finance', 'analytics'];

  return (
    <section
      id="solutions-ecosystem"
      dir={t.dir}
      className="relative w-full min-h-[100svh] flex flex-col justify-center bg-white text-[#1d1d1f] py-24 px-4 sm:px-8 border-t border-black/[0.06] overflow-hidden"
    >
      <div className="max-w-[1920px] w-full mx-auto my-auto px-0 sm:px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65 }}
          className="text-center max-w-3xl mx-auto mb-10"
        >
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0071e3]/10 text-[#0071e3] text-xs font-semibold mb-4">
            <Layers className="w-3.5 h-3.5" />
            12 Core Product Modules · Zero Feature Gates
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-[52px] font-bold tracking-[-0.035em] text-[#1d1d1f] leading-[1.08] mb-4">
            {baseData.title}
          </h2>
          <p className="text-base sm:text-lg text-[#6e6e73] leading-relaxed">
            {baseData.subtitle}
          </p>
        </motion.div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categoryKeys.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  active
                    ? 'bg-[#0071e3] text-white shadow-xs'
                    : 'bg-[#f5f5f7] text-[#6e6e73] hover:text-[#1d1d1f]'
                }`}
              >
                {baseData.categories[cat]}
              </button>
            );
          })}
        </div>

        {/* 12 Product Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModules.map((mod, idx) => (
            <motion.div
              key={mod.id}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.45, delay: (idx % 6) * 0.06 }}
              whileHover={{ y: -5 }}
              className="rounded-[28px] bg-[#f5f5f7] hover:bg-white p-7 border border-black/[0.05] hover:border-[#0071e3]/35 hover:shadow-[0_20px_50px_rgba(0,113,227,0.08)] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full bg-white text-xs font-bold text-[#0071e3] border border-black/[0.06]">
                    Module {mod.number}
                  </span>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                    {mod.metric}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#1d1d1f] tracking-tight mb-2">
                  {mod.title}
                </h3>
                <p className="text-xs font-semibold text-[#0071e3] mb-3">
                  {mod.subtitle}
                </p>
                <p className="text-sm text-[#6e6e73] leading-relaxed mb-5">
                  {mod.description}
                </p>

                <div className="space-y-2 mb-6 pt-4 border-t border-black/[0.06]">
                  {mod.highlights.map((h) => (
                    <div key={h} className="flex items-start gap-2 text-xs text-[#1d1d1f]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#0071e3] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {mod.localIntegrations.map((ig) => (
                    <span
                      key={ig}
                      className="px-2.5 py-0.5 rounded-full bg-white border border-black/[0.06] text-[11px] font-medium text-[#6e6e73]"
                    >
                      {ig}
                    </span>
                  ))}
                </div>

                <div className="pt-3 border-t border-black/[0.06] flex items-center justify-between">
                  {mod.category === 'portal' ? (
                    <button
                      type="button"
                      onClick={onOpenClientPortal}
                      className="text-xs font-semibold text-[#0071e3] hover:underline cursor-pointer"
                    >
                      Open Live Client Area →
                    </button>
                  ) : (
                    <span className="text-[11px] font-semibold text-[#86868b]">
                      Included in All Plans
                    </span>
                  )}

                  <button
                    type="button"
                    onClick={() => onSelectPackage(`Module: ${mod.title}`)}
                    className="px-4 py-2 rounded-full bg-[#1d1d1f] hover:bg-[#0071e3] text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Configure
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
