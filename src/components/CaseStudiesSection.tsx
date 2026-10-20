import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useIsMobile } from '../hooks/useIsMobile';
import { Language, TRANSLATIONS } from '../i18n/translations';
import { BryTechVisualArtwork, ArtworkVariant } from './BryTechVisualArtwork';
import { ArrowUpRight, Sparkles } from 'lucide-react';

interface CaseStudiesSectionProps {
  lang: Language;
  onSelectCaseStudy: (caseTitle: string) => void;
}

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({
  lang,
  onSelectCaseStudy,
}) => {
  const isMobile = useIsMobile(768);
  const t = TRANSLATIONS[lang];
  const [filterMarket, setFilterMarket] = useState<'ALL' | 'ukraine' | 'israel'>('ALL');
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const yHeader = useTransform(scrollYProgress, [0, 1], [30, -25]);

  const filteredItems = t.cases.studies.filter((item) => {
    if (filterMarket === 'ALL') return true;
    return item.market === filterMarket;
  });

  const getCaseVariant = (market: 'ukraine' | 'israel', idx: number): ArtworkVariant => {
    if (market === 'ukraine' && idx === 0) return 'clinic-case';
    if (market === 'israel' && idx === 1) return 'telaviv-case';
    if (market === 'ukraine') return 'lviv-case';
    return 'haifa-case';
  };

  return (
    <section
      ref={sectionRef}
      id="cases"
      dir={t.dir}
      className="relative w-full min-h-[100svh] flex flex-col justify-center bg-[#f5f5f7] text-[#1d1d1f] py-24 px-4 sm:px-8 border-t border-black/[0.06] overflow-hidden"
    >
      <div className="max-w-[1920px] w-full mx-auto my-auto px-0 sm:px-4 lg:px-8">
        <motion.div
          style={{ y: isMobile ? 0 : yHeader }}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
        >
          <div>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0071e3]/10 text-[#0071e3] text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              {t.cases.primaryOutcomeLabel}
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-[-0.035em] text-[#1d1d1f] leading-tight">
              {t.cases.line1} <span className="text-[#0071e3]">{t.cases.line2}</span>
            </h2>
          </div>

          <div className="inline-flex items-center bg-white p-1 rounded-full border border-black/[0.06] self-start">
            {(
              [
                { code: 'ALL', label: t.cases.filterAll },
                { code: 'ukraine', label: t.cases.filterUkraine },
                { code: 'israel', label: t.cases.filterIsrael },
              ] as const
            ).map((tab) => (
              <button
                key={tab.code}
                type="button"
                onClick={() => setFilterMarket(tab.code)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  filterMarket === tab.code
                    ? 'bg-[#1d1d1f] text-white'
                    : 'text-[#6e6e73] hover:text-[#1d1d1f]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              whileHover={{ y: -6 }}
              className="rounded-[32px] bg-white border border-black/[0.06] shadow-[0_12px_36px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col justify-between"
            >
              <div>
                <BryTechVisualArtwork
                  variant={getCaseVariant(item.market, idx)}
                />

                <div className="p-7 sm:p-8">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-semibold text-[#6e6e73]">
                      {item.city} · {item.marketLabel}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold">
                      {item.secondaryMetric}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-[#1d1d1f] tracking-tight mb-2">
                    {item.client}
                  </h3>
                  <p className="text-sm sm:text-base text-[#6e6e73] leading-relaxed mb-6">
                    {item.summary}
                  </p>

                  <div className="pt-5 border-t border-black/[0.06] flex items-center justify-between gap-4">
                    <div>
                      <div className="text-xl font-bold text-[#0071e3]">
                        {item.primaryMetric}
                      </div>
                      <div className="text-xs text-[#6e6e73]">{item.title}</div>
                    </div>

                    <button
                      type="button"
                      onClick={() => onSelectCaseStudy(item.client)}
                      className="px-5 py-2.5 rounded-full bg-[#f5f5f7] hover:bg-[#0071e3] text-[#1d1d1f] hover:text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>{t.cases.inspectBtn}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
