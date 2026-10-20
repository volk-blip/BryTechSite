import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useIsMobile } from '../hooks/useIsMobile';
import { MousePosition } from '../hooks/useMousePosition';
import { Language, TRANSLATIONS } from '../i18n/translations';
import { Check, ArrowRight, Sparkles } from 'lucide-react';

interface SystemSimulatorSectionProps {
  mousePos?: MousePosition;
  lang: Language;
  onSelectCustomStack?: (summary: string) => void;
  onSelectPackage?: (summary: string) => void;
}

interface ModuleOption {
  id: string;
  title: Record<Language, string>;
  category: Record<Language, string>;
  brytechUsd: number;
  agencyUsd: number;
  days: number;
}

const MODULES: ModuleOption[] = [
  {
    id: 'web',
    title: {
      en: 'Custom High-Converting Web Platform (EN/UA/RU/HE)',
      uk: 'Висококонверсійна Веб-Платформа (UA/EN/RU/HE)',
      ru: 'Кастомная Высококонверсионная Веб-Платформа (RU/EN/UA/HE)',
      he: 'פלטפורמת אינטרנט ומכירות רב-לשונית מותאמת (HE/EN/UA/RU)',
    },
    category: { en: 'Web & Intake', uk: 'Веб та Ліди', ru: 'Веб и Лиды', he: 'אתר וקליטת לידים' },
    brytechUsd: 650,
    agencyUsd: 2600,
    days: 7,
  },
  {
    id: 'booking',
    title: {
      en: '24/7 Smart Online Booking & Resource Scheduling Engine',
      uk: 'Онлайн-Запис 24/7 та Розподіл Ресурсів і Передоплат',
      ru: 'Умная Онлайн-Запись 24/7 и Распределение Ресурсов',
      he: 'מנוע זימון תורים חכם 24/7 וניהול משאבים ומקדמות',
    },
    category: { en: 'Booking', uk: 'Онлайн-Запис', ru: 'Онлайн-Запись', he: 'זימון תורים' },
    brytechUsd: 450,
    agencyUsd: 2100,
    days: 4,
  },
  {
    id: 'crm',
    title: {
      en: 'Custom Unified CRM, Client Cards & Deal Pipeline',
      uk: 'Кастомна Єдина CRM, База Клієнтів та Воронки Продажів',
      ru: 'Единая Кастомная CRM, База Клиентов и Воронки Продаж',
      he: 'מערכת CRM מאוחדת בהתאמה אישית, תיקי לקוח וצנרת מכירות',
    },
    category: { en: 'CRM Core', uk: 'CRM Ядро', ru: 'Ядро CRM', he: 'ליבת CRM' },
    brytechUsd: 850,
    agencyUsd: 3800,
    days: 9,
  },
  {
    id: 'portal',
    title: {
      en: 'Branded Client Self-Service Area (Progress, Notes & Live Chat)',
      uk: 'Особистий Кабінет Клієнта (Прогрес, Нотатки та Чат з Адміном)',
      ru: 'Личный Кабинет Клиента (Статус, Заметки и Живой Чат)',
      he: 'אזור אישי ללקוח (מעקב התקדמות, הערות וצ׳אט חי עם מנהל)',
    },
    category: { en: 'Client Area', uk: 'Кабінет Клієнта', ru: 'Кабинет Клиента', he: 'אזור לקוח' },
    brytechUsd: 750,
    agencyUsd: 3600,
    days: 8,
  },
  {
    id: 'bots',
    title: {
      en: '2-Way Telegram, WhatsApp & SMS Automation Bots',
      uk: 'Двосторонні Боти та Нагадування в Telegram, WhatsApp і SMS',
      ru: 'Двусторонние Боты и Авто-Напоминания в Telegram и WhatsApp',
      he: 'בוטים דו-כיווניים ותזכורות אוטומטיות ב-WhatsApp, Telegram ו-SMS',
    },
    category: { en: 'Automation', uk: 'Автоматизація', ru: 'Автоматизация', he: 'אוטומציה' },
    brytechUsd: 380,
    agencyUsd: 1650,
    days: 4,
  },
  {
    id: 'pos-finance',
    title: {
      en: 'Smart POS, Payroll Commissions, Invoicing & Live P&L',
      uk: 'Розумна Каса, Зарплати Фахівців, Рахунки та P&L',
      ru: 'Умная Касса, Расчет Зарплат, Счета и Управленческий P&L',
      he: 'קופה חכמה, חישוב עמלות עובדים, חשבוניות ודוח רווח והפסד',
    },
    category: { en: 'Finance & POS', uk: 'Фінанси та Каса', ru: 'Финансы и Касса', he: 'פיננסים וקופה' },
    brytechUsd: 490,
    agencyUsd: 2200,
    days: 5,
  },
  {
    id: 'loyalty',
    title: {
      en: 'Custom Loyalty Engine, Cashback, Packages & Memberships',
      uk: 'Система Лояльності, Кешбек, Пакети Послуг та Абонементи',
      ru: 'Система Лояльности, Кэшбэк, Пакеты Услуг и Абонементы',
      he: 'מנוע מועדון לקוחות, כרטיסיות, חבילות טיפולים וקאשבק',
    },
    category: { en: 'Retention', uk: 'Лояльність', ru: 'Лояльность', he: 'שימור לקוחות' },
    brytechUsd: 350,
    agencyUsd: 1500,
    days: 3,
  },
  {
    id: 'inventory',
    title: {
      en: 'Warehouse Inventory & Auto Consumables Deduction',
      uk: 'Складський Облік та Авто-Списання Матеріалів по Техкартах',
      ru: 'Складской Учет и Авто-Списание Расходников по Техкартам',
      he: 'ניהול מלאי וניכוי אוטומטי של חומרים מתכלים בטיפול',
    },
    category: { en: 'Inventory', uk: 'Склад', ru: 'Склад', he: 'ניהול מלאי' },
    brytechUsd: 420,
    agencyUsd: 1850,
    days: 4,
  },
];

export const SystemSimulatorSection: React.FC<SystemSimulatorSectionProps> = ({
  lang,
  onSelectCustomStack,
  onSelectPackage,
}) => {
  const isMobile = useIsMobile(768);
  const t = TRANSLATIONS[lang];
  const [selectedIds, setSelectedIds] = useState<string[]>([
    'web',
    'booking',
    'crm',
    'portal',
  ]);
  const [currency, setCurrency] = useState<'USD' | 'UAH' | 'ILS'>(
    lang === 'uk' ? 'UAH' : lang === 'he' ? 'ILS' : 'USD'
  );

  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const yHeader = useTransform(scrollYProgress, [0, 1], [30, -25]);

  const toggleModule = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.length > 1
          ? prev.filter((item) => item !== id)
          : prev
        : [...prev, id]
    );
  };

  const selectedModules = MODULES.filter((m) => selectedIds.includes(m.id));
  const totalBrytechUsd = selectedModules.reduce((acc, m) => acc + m.brytechUsd, 0);
  const totalAgencyUsd = selectedModules.reduce((acc, m) => acc + m.agencyUsd, 0);
  const savedUsd = totalAgencyUsd - totalBrytechUsd;
  const maxDays = selectedModules.reduce((acc, m) => Math.max(acc, m.days), 7) + 5;

  const formatPrice = (usd: number) => {
    if (currency === 'UAH') return `${Math.round(usd * 41).toLocaleString()} ₴`;
    if (currency === 'ILS') return `₪${Math.round(usd * 3.7).toLocaleString()}`;
    return `$${usd.toLocaleString()}`;
  };

  return (
    <section
      ref={sectionRef}
      id="simulator"
      dir={t.dir}
      className="relative w-full min-h-[100svh] flex flex-col justify-center bg-white text-[#1d1d1f] py-24 px-4 sm:px-8 border-t border-black/[0.06] overflow-hidden"
    >
      <div className="max-w-[1920px] w-full mx-auto my-auto px-0 sm:px-4 lg:px-8">
        <motion.div
          style={{ y: isMobile ? 0 : yHeader }}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0071e3]/10 text-[#0071e3] text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              {t.simulator.blueprintTag}
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-[-0.035em] text-[#1d1d1f] leading-tight">
              {t.simulator.line1} <span className="text-[#0071e3]">{t.simulator.line2}</span>
            </h2>
          </div>

          <div className="inline-flex items-center bg-[#f5f5f7] p-1 rounded-full border border-black/[0.06] self-start">
            {(['USD', 'UAH', 'ILS'] as const).map((curr) => (
              <button
                key={curr}
                type="button"
                onClick={() => setCurrency(curr)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  currency === curr
                    ? 'bg-white text-[#1d1d1f] shadow-xs'
                    : 'text-[#6e6e73] hover:text-[#1d1d1f]'
                }`}
              >
                {curr}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {MODULES.map((mod, idx) => {
              const isSelected = selectedIds.includes(mod.id);
              return (
                <motion.div
                  key={mod.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  onClick={() => toggleModule(mod.id)}
                  className={`p-5 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                    isSelected
                      ? 'bg-[#0071e3]/[0.05] border-[#0071e3] shadow-xs'
                      : 'bg-[#f5f5f7] border-transparent hover:bg-[#ebebf0]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-[#0071e3] text-white'
                          : 'bg-white border border-black/15 text-transparent'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-sm font-bold text-[#0071e3] tabular-nums">
                      {formatPrice(mod.brytechUsd)}
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] font-semibold text-[#6e6e73] block mb-0.5">
                      {mod.category[lang]}
                    </span>
                    <div className="text-sm font-bold text-[#1d1d1f] leading-snug">
                      {mod.title[lang]}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 24 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 rounded-[32px] bg-[#1d1d1f] text-white p-7 sm:p-9 shadow-2xl space-y-6 sticky top-24"
          >
            <div>
              <div className="text-xs font-semibold text-white/60 mb-1">
                {t.simulator.yourPriceLabel} ({selectedModules.length} {t.simulator.activeLabel})
              </div>
              <div className="text-4xl sm:text-5xl font-bold tracking-tight text-white tabular-nums">
                {formatPrice(totalBrytechUsd)}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.06] border border-white/10 space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-white/60">{t.simulator.agencyPriceLabel}</span>
                <span className="text-white/40 line-through tabular-nums">
                  {formatPrice(totalAgencyUsd)}
                </span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <span className="font-semibold text-emerald-400">
                  {t.simulator.savingsNote}
                </span>
                <span className="font-bold text-emerald-400 tabular-nums text-base">
                  {formatPrice(savedUsd)}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-white/70">
              <span>{t.simulator.launchTimeLabel}</span>
              <strong className="text-white">
                ~{maxDays} {t.simulator.weeksUnit}
              </strong>
            </div>

            <button
              type="button"
              onClick={() =>
                (onSelectCustomStack || onSelectPackage)?.(
                  `Custom Turnkey Stack (${selectedModules.length} modules) — Est. ${formatPrice(
                    totalBrytechUsd
                  )}`
                )
              }
              className="w-full py-4 px-6 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-lg shadow-[#0071e3]/25"
            >
              <span>{t.simulator.ctaDeploy}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
