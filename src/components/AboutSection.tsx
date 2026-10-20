import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useIsMobile } from '../hooks/useIsMobile';
import { MousePosition } from '../hooks/useMousePosition';
import { Language, TRANSLATIONS } from '../i18n/translations';
import { BryTechVisualArtwork } from './BryTechVisualArtwork';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

interface AboutSectionProps {
  mousePos?: MousePosition;
  lang: Language;
  onOpenLearnMoreModal: () => void;
  onNavigateAboutPage?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  lang,
  onOpenLearnMoreModal,
  onNavigateAboutPage,
}) => {
  const isMobile = useIsMobile(768);
  const t = TRANSLATIONS[lang];
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const yHeader = useTransform(scrollYProgress, [0, 1], [35, -35]);
  const yCards = useTransform(scrollYProgress, [0, 1], [50, -30]);

  const cards = [
    {
      num: '01',
      tag: t.about.tabMission,
      title: t.about.tabMission,
      desc: t.about.textMission,
      metric: '100% Ownership',
    },
    {
      num: '02',
      tag: t.about.tabMarkets,
      title: t.about.tabMarkets,
      desc: t.about.textMarkets,
      metric: 'EN · UA · HE',
    },
    {
      num: '03',
      tag: t.about.tabAffordability,
      title: t.about.tabAffordability,
      desc: t.about.textAffordability,
      metric: 'Up to 70% Saved',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      dir={t.dir}
      className="relative w-full min-h-[100svh] flex flex-col justify-center bg-white text-[#1d1d1f] py-24 px-4 sm:px-8 border-t border-black/[0.06] overflow-hidden"
    >
      <div className="max-w-[1920px] w-full mx-auto my-auto px-0 sm:px-4 lg:px-8">
        <motion.div
          style={{ y: isMobile ? 0 : yHeader }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-14 sm:mb-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-5"
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0071e3]/10 text-[#0071e3] text-xs font-semibold tracking-tight">
              <Sparkles className="w-3.5 h-3.5" />
              {t.about.tabMission}
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-[52px] font-bold tracking-[-0.035em] text-[#1d1d1f] leading-[1.08]">
              {t.about.line1}{' '}
              <span className="text-[#0071e3]">{t.about.line2}</span>
            </h2>
            <p className="text-base sm:text-lg text-[#6e6e73] leading-relaxed">
              {t.about.textMission}
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              {onNavigateAboutPage && (
                <button
                  type="button"
                  onClick={onNavigateAboutPage}
                  className="px-6 py-3.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-sm font-semibold inline-flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <span>Read Our Vision &amp; ROI Story</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                onClick={onOpenLearnMoreModal}
                className="px-6 py-3.5 rounded-full bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[#1d1d1f] text-sm font-semibold inline-flex items-center gap-2 transition-colors cursor-pointer"
              >
                <span>{t.about.ctaLearnMore}</span>
              </button>
            </div>

            {onNavigateAboutPage && (
              <div
                onClick={onNavigateAboutPage}
                className="pt-2 inline-flex items-center gap-3 cursor-pointer group"
              >
                <div className="flex -space-x-2">
                  <img
                    src="/assets/aistudio/Gemini_Generated_Image_vhds4cvhds4cvhds_3072b664.jpg"
                    alt="Boris Brygin — Founder"
                    className="w-9 h-9 rounded-full object-cover object-[center_18%] border-2 border-white contrast-[1.06] saturate-[0.90] brightness-[1.01] shadow-xs group-hover:scale-105 transition-transform"
                  />
                  <img
                    src="/assets/aistudio/IMG_0904_62bab2d3.jpeg"
                    alt="Danil Brygin — Co-Founder & CTO"
                    className="w-9 h-9 rounded-full object-cover object-[center_15%] border-2 border-white contrast-[1.06] saturate-[0.90] brightness-[1.01] shadow-xs group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="text-xs text-[#6e6e73] group-hover:text-[#0071e3] transition-colors leading-tight">
                  <div className="font-semibold text-[#1d1d1f]">Boris Brygin &amp; Danil Brygin</div>
                  <div className="text-[11px] text-[#86868b]">Founder &amp; Co-Founder / CTO · Executive Leadership</div>
                </div>
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 28 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <BryTechVisualArtwork variant="corridor" />
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: isMobile ? 0 : yCards }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {cards.map((card, idx) => {
            const isActive = hoveredCard === idx;
            return (
              <motion.div
                key={card.num}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6 }}
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`rounded-[32px] p-7 sm:p-8 transition-all duration-300 border ${
                  isActive
                    ? 'bg-white border-[#0071e3]/30 shadow-[0_24px_60px_rgba(0,113,227,0.1)]'
                    : 'bg-[#f5f5f7] border-black/[0.05]'
                }`}
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="px-3.5 py-1 rounded-full bg-white text-xs font-semibold text-[#0071e3] border border-black/[0.06]">
                    {card.tag}
                  </span>
                  <span className="text-sm font-bold text-[#86868b]">
                    {card.num}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1d1d1f] mb-2.5">
                  {card.title}
                </h3>

                <p className="text-sm sm:text-base text-[#6e6e73] leading-relaxed mb-6">
                  {card.desc}
                </p>

                <div className="pt-4 border-t border-black/[0.06] flex items-center justify-between">
                  <span className="text-sm font-bold text-[#0071e3]">
                    {card.metric}
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
