import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useIsMobile } from '../hooks/useIsMobile';
import { Language, TRANSLATIONS } from '../i18n/translations';
import { BryTechVisualArtwork, ArtworkVariant } from './BryTechVisualArtwork';
import { Check, ArrowRight, Sparkles } from 'lucide-react';

interface CapabilitiesSectionProps {
  lang: Language;
  onSelectPackage: (packageName: string) => void;
  onOpenClientPortal: () => void;
}

export const CapabilitiesSection: React.FC<CapabilitiesSectionProps> = ({
  lang,
  onSelectPackage,
  onOpenClientPortal,
}) => {
  const isMobile = useIsMobile(768);
  const t = TRANSLATIONS[lang];
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const yHeader = useTransform(scrollYProgress, [0, 1], [35, -25]);

  const cardArtworkVariants: ArtworkVariant[] = [
    'websites',
    'crm',
    'portal',
    'automation',
  ];

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      dir={t.dir}
      className="relative w-full min-h-[100svh] flex flex-col justify-center bg-[#f5f5f7] text-[#1d1d1f] py-24 px-4 sm:px-8 border-t border-black/[0.06] overflow-hidden"
    >
      <div className="max-w-[1920px] w-full mx-auto my-auto px-0 sm:px-4 lg:px-8">
        <motion.div
          style={{ y: isMobile ? 0 : yHeader }}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-14 sm:mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0071e3]/10 text-[#0071e3] text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            {t.capabilities.specHeader}
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-[52px] font-bold tracking-[-0.035em] text-[#1d1d1f] leading-[1.08] mb-4">
            {t.capabilities.line1}{' '}
            <span className="text-[#0071e3]">{t.capabilities.line2}</span>
          </h2>
          <p className="text-base sm:text-lg text-[#6e6e73] leading-relaxed">
            {t.capabilities.intro}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
          {t.capabilities.items.map((item, idx) => {
            const isHovered = hoveredIndex === idx;
            const isPortalCard = idx === 2;
            const artworkVariant = cardArtworkVariants[idx] || 'websites';

            return (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 36, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6 }}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`rounded-[32px] bg-white p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 border ${
                  isHovered
                    ? 'border-[#0071e3]/35 shadow-[0_24px_60px_rgba(0,113,227,0.1)]'
                    : 'border-black/[0.06] shadow-[0_10px_30px_rgba(0,0,0,0.03)]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <span className="px-3.5 py-1 rounded-full bg-[#f5f5f7] text-xs font-semibold text-[#1d1d1f]">
                      {item.subtitle}
                    </span>
                    <span className="px-3.5 py-1 rounded-full bg-[#0071e3]/10 text-[#0071e3] text-xs font-bold">
                      {item.metricValue}
                    </span>
                  </div>

                  <div className="mb-6 rounded-2xl overflow-hidden">
                    <BryTechVisualArtwork variant={artworkVariant} />
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1d1d1f] mb-2.5">
                    {item.title}
                  </h3>

                  <p className="text-sm sm:text-base text-[#6e6e73] leading-relaxed mb-6">
                    {item.description}
                  </p>

                  <div className="space-y-2.5 mb-7 pt-5 border-t border-black/[0.06]">
                    {item.deliverables.slice(0, 3).map((d) => (
                      <div key={d} className="flex items-start gap-2.5 text-sm text-[#1d1d1f]">
                        <div className="w-5 h-5 rounded-full bg-[#0071e3]/10 text-[#0071e3] flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3" />
                        </div>
                        <span className="font-medium">{d}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-black/[0.06] flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs font-semibold text-[#6e6e73]">
                    {item.metricContext}
                  </span>

                  <div className="flex items-center gap-2.5">
                    {isPortalCard && (
                      <button
                        type="button"
                        onClick={onOpenClientPortal}
                        className="px-4 py-2.5 rounded-full bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[#1d1d1f] text-xs font-semibold transition-colors cursor-pointer"
                      >
                        {t.hero.ctaClientArea}
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => onSelectPackage(item.title)}
                      className="px-5 py-2.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                    >
                      <span>{t.capabilities.ctaScope}</span>
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
