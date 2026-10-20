import React from 'react';
import { motion } from 'motion/react';
import { Language, TRANSLATIONS } from '../i18n/translations';
import { ActivePageView } from './Navbar';
import {
  Layers,
  Building2,
  Briefcase,
  Sliders,
  CreditCard,
  Sparkles,
  Info,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Workflow,
  ShieldCheck,
} from 'lucide-react';

interface UnifiedVisionOverviewSectionProps {
  lang: Language;
  onSelectPage: (page: ActivePageView) => void;
  onOpenPortal: () => void;
}

const OVERVIEW_COPY: Record<
  Language,
  {
    badge: string;
    title: string;
    subtitle: string;
    pillars: {
      title: string;
      desc: string;
      metric: string;
    }[];
    directoryKicker: string;
    directoryTitle: string;
    directorySub: string;
    cards: {
      page: ActivePageView;
      badge: string;
      title: string;
      desc: string;
      cta: string;
    }[];
  }
> = {
  en: {
    badge: 'Core Vision · Custom-Built Unified Business Systems',
    title: 'One Custom System Built Around Your Exact Operations.',
    subtitle:
      'Instead of forcing your business into rigid off-the-shelf software or juggling 7 disconnected tools, we architect a single unified platform that covers 100% of your operations — tailored to your workflows.',
    pillars: [
      {
        title: '100% Tailored Workflow Fit',
        desc: 'Every CRM pipeline, booking rule, role permission, and financial report is engineered around how your business actually runs.',
        metric: 'Custom Architecture',
      },
      {
        title: 'All Departments in One Core',
        desc: 'Website, online booking, custom CRM, 2-way WhatsApp/Telegram bots, inventory, payroll, and client portal share one live database.',
        metric: '1 Unified Database',
      },
      {
        title: 'Full Ownership & Zero Per-Seat Tax',
        desc: 'Eliminate recurring per-employee SaaS fees. Add unlimited staff, branches, and clients on your own dedicated platform.',
        metric: '$0 Per-User Tax',
      },
    ],
    directoryKicker: 'EXPLORE DEDICATED PLATFORM PAGES',
    directoryTitle: 'Dive Into Every Layer of Your Custom System',
    directorySub:
      'We organized our platform into dedicated pages so you can explore modules, industry blueprints, interactive calculators, and custom pricing with clarity.',
    cards: [
      {
        page: 'solutions',
        badge: '12 Custom Modules',
        title: 'Solutions & Core Capabilities',
        desc: 'Explore the 4 foundational pillars and 12 custom-engineered modules — from CRM and Booking to Messenger Bots and ERP.',
        cta: 'Explore Solutions Page',
      },
      {
        page: 'industries',
        badge: '12+ Business Verticals',
        title: 'Industries & Live Booking Demo',
        desc: 'Test our interactive live booking widget and see how we tailor unified systems for clinics, salons, fitness, auto, and B2B.',
        cta: 'Open Industries Page',
      },
      {
        page: 'business-types',
        badge: 'By Operational Scale',
        title: 'Business Scale & Topologies',
        desc: 'See how our custom architecture adapts from single-location studios to multi-branch networks and enterprise franchises.',
        cta: 'View Business Scales',
      },
      {
        page: 'pricing',
        badge: 'Interactive Scope Builder',
        title: 'Tailored System Pricing',
        desc: 'Configure your operational scale, pick the workflows you want unified, and calculate your annual SaaS savings.',
        cta: 'Configure Custom Pricing',
      },
      {
        page: 'simulator',
        badge: 'Live ROI & Timeline',
        title: 'Interactive System Simulator',
        desc: 'Simulate your custom module combination and compare turnaround speed and cost against traditional agencies.',
        cta: 'Launch Simulator Page',
      },
      {
        page: 'cases',
        badge: 'Proven Deployments',
        title: 'Client Case Studies & Results',
        desc: 'Inspect real-world custom systems that reduced no-shows by 68%, cut manual routine by 82%, and tripled lead velocity.',
        cta: 'Read Case Studies',
      },
      {
        page: 'about',
        badge: 'Our Philosophy',
        title: 'About BryTech & Our Vision',
        desc: 'Learn how our engineering team builds custom unified systems that maximize business potential and reduce operational costs.',
        cta: 'Read Our Vision',
      },
    ],
  },
  ru: {
    badge: 'Наше Видение · Индивидуальные Единые Системы Бизнеса',
    title: 'Одна Кастомная Система, Созданная Под Ваши Процессы.',
    subtitle:
      'Вместо того чтобы подстраивать компанию под ограничения коробочных сервисов или оплачивать 7 разных программ, мы создаем для вас единую систему, которая закрывает 100% операционных задач вашего бизнеса.',
    pillars: [
      {
        title: '100% Под Ваши Бизнес-Процессы',
        desc: 'Каждая воронка CRM, правило онлайн-записи, роль сотрудника и финансовый отчет проектируются индивидуально под вашу логику.',
        metric: 'Индивидуальная Архитектура',
      },
      {
        title: 'Все Отделы в Едином Ядре',
        desc: 'Сайт, онлайн-запись, кастомная CRM, боты WhatsApp/Telegram, склад, зарплаты и клиентский портал работают на одной базе.',
        metric: '1 Единая База Данных',
      },
      {
        title: 'Полная Собственность · $0 за Сотрудников',
        desc: 'Никакой абонплаты за каждого нового мастера или менеджера. Добавляйте сколько угодно сотрудников и филиалов.',
        metric: '$0 Налог на Рост',
      },
    ],
    directoryKicker: 'РАЗДЕЛЫ ПЛАТФОРМЫ',
    directoryTitle: 'Изучите Каждую Деталь Вашей Будущей Системы',
    directorySub:
      'Мы разделили платформу на отдельные специализированные страницы, чтобы вы могли удобно изучить модули, отрасли, кейсы и конструктор стоимости.',
    cards: [
      {
        page: 'solutions',
        badge: '12 Кастомных Модулей',
        title: 'Решения и Возможности Системы',
        desc: 'Изучите 4 базовых ядра и 12 модулей — от кастомной CRM и онлайн-записи до двусторонних ботов и финансового учета.',
        cta: 'Открыть страницу Решений',
      },
      {
        page: 'industries',
        badge: '12+ Отраслей Бизнеса',
        title: 'Отрасли и Живое Демо Записи',
        desc: 'Протестируйте интерактивный виджет записи и посмотрите решения для клиник, салонов, фитнеса, автосервисов и B2B.',
        cta: 'Перейти к Отраслям',
      },
      {
        page: 'business-types',
        badge: 'По Масштабу Компании',
        title: 'Масштаб и Топологии Бизнеса',
        desc: 'Посмотрите, как архитектура адаптируется под одиночные студии, многофилиальные сети и крупные франшизы.',
        cta: 'Смотреть Масштабы Бизнеса',
      },
      {
        page: 'pricing',
        badge: 'Интерактивный Конфигуратор',
        title: 'Индивидуальная Стоимость Системы',
        desc: 'Выберите масштаб бизнеса и нужные процессы, чтобы собрать архитектуру вашей системы и рассчитать экономию.',
        cta: 'Собрать Стоимость Системы',
      },
      {
        page: 'simulator',
        badge: 'Расчет Сроков и ROI',
        title: 'Симулятор Архитектуры',
        desc: 'Соберите комбинацию модулей в реальном времени и сравните сроки и инвестиции с традиционной разработкой.',
        cta: 'Открыть Симулятор',
      },
      {
        page: 'cases',
        badge: 'Реальные Внедрения',
        title: 'Кейсы Клиентов и Результаты',
        desc: 'Посмотрите, как кастомные системы снижают неявки на 68%, убирают 82% рутины и ускоряют обработку заявок в 3 раза.',
        cta: 'Смотреть Кейсы',
      },
      {
        page: 'about',
        badge: 'Философия Компании',
        title: 'О Компании BryTech и Видении',
        desc: 'Узнайте, как мы помогаем бизнесу снижать издержки и максимизировать прибыль с помощью единых кастомных систем.',
        cta: 'О Нашем Видении',
      },
    ],
  },
  uk: {
    badge: 'Наша Візія · Індивідуальні Єдині Системи Бізнесу',
    title: 'Одна Кастомна Система, Створена Під Ваші Процеси.',
    subtitle:
      'Замість того щоб підлаштовувати бізнес під обмеження коробкових сервісів або платити за 7 різних програм, ми проєктуємо єдину платформу, яка закриває 100% операційних завдань вашої компанії.',
    pillars: [
      {
        title: '100% Під Ваші Бізнес-Процеси',
        desc: 'Кожна воронка CRM, правило онлайн-запису, роль працівника та фінансовий звіт проєктуються індивідуально під вашу логіку.',
        metric: 'Індивідуальна Архітектура',
      },
      {
        title: 'Усі Відділи в Єдиному Ядрі',
        desc: 'Сайт, онлайн-запис, кастомна CRM, боти WhatsApp/Telegram, склад, зарплати та клієнтський кабінет працюють на одній базі.',
        metric: '1 Єдина База Даних',
      },
      {
        title: 'Повна Власність · $0 за Співробітників',
        desc: 'Жодної абонплати за кожного нового майстра чи менеджера. Додавайте необмежену кількість співробітників та філій.',
        metric: '$0 Податок на Ріст',
      },
    ],
    directoryKicker: 'РОЗДІЛИ ПЛАТФОРМИ',
    directoryTitle: 'Дослідіть Кожен Рівень Вашої Майбутньої Системи',
    directorySub:
      'Ми розділили платформу на окремі спеціалізовані сторінки, щоб ви могли зручно ознайомитися з модулями, галузями, кейсами та конструктором вартості.',
    cards: [
      {
        page: 'solutions',
        badge: '12 Кастомних Модулів',
        title: 'Рішення та Можливості Системи',
        desc: 'Дослідіть 4 базові ядра та 12 модулів — від кастомної CRM та онлайн-запису до двосторонніх ботів і фінансів.',
        cta: 'Відкрити сторінку Рішень',
      },
      {
        page: 'industries',
        badge: '12+ Галузей Бізнесу',
        title: 'Галузі та Живе Демо Запису',
        desc: 'Протестуйте інтерактивний віджет запису та перегляньте рішення для клінік, салонів, фітнесу, автосервісів та B2B.',
        cta: 'Перейти до Галузей',
      },
      {
        page: 'business-types',
        badge: 'За Масштабом Компанії',
        title: 'Масштаб та Топології Бізнесу',
        desc: 'Подивіться, як архітектура адаптується під окремі студії, багатофіліальні мережі та великі франшизи.',
        cta: 'Переглянути Масштаби',
      },
      {
        page: 'pricing',
        badge: 'Інтерактивний Конфігуратор',
        title: 'Індивідуальна Вартість Системи',
        desc: 'Оберіть масштаб бізнесу та потрібні процеси, щоб зібрати архітектуру вашої системи та розрахувати економію.',
        cta: 'Зібрати Вартість Системи',
      },
      {
        page: 'simulator',
        badge: 'Розрахунок Термінів і ROI',
        title: 'Симулятор Архітектури',
        desc: 'Зберіть комбінацію модулів у реальному часі та порівняйте терміни й інвестиції з традиційною розробкою.',
        cta: 'Відкрити Симулятор',
      },
      {
        page: 'cases',
        badge: 'Реальні Впровадження',
        title: 'Кейси Клієнтів та Результати',
        desc: 'Перегляньте, як кастомні системи знижують неявки на 68%, прибирають 82% рутини та прискорюють обробку лідів у 3 рази.',
        cta: 'Дивитися Кейси',
      },
      {
        page: 'about',
        badge: 'Філософія Компанії',
        title: 'Про Компанію BryTech та Візію',
        desc: 'Дізнайтеся, як ми допомагаємо бізнесу знижувати витрати та максимізувати прибуток завдяки єдиним кастомним системам.',
        cta: 'Про Нашу Візію',
      },
    ],
  },
  he: {
    badge: 'חזון הליבה · מערכות עסקיות אחודות בהתאמה אישית',
    title: 'מערכת אחת בבנייה אישית סביב תהליכי העבודה שלך.',
    subtitle:
      'במקום לאלץ את העסק להתאים לתוכנות מדף סגורות או לתפעל 7 כלים מנותקים, אנו מתכננים ובונים פלטפורמה מאוחדת אחת המכסה 100% מתהליכי העבודה שלך.',
    pillars: [
      {
        title: 'התאמה של 100% לתהליכי העבודה',
        desc: 'כל משפך CRM, חוק יומן תורים, הרשאת עובד ודוח כספי מתוכננים בדיוק לפי האופן שבו העסק שלך פועל.',
        metric: 'ארכיטקטורה מותאמת',
      },
      {
        title: 'כל המחלקות בליבה אחת',
        desc: 'האתר, הזמנת התורים, ה-CRM, הבוטים לוואטסאפ/טלגרם, המלאי, השכר ופורטל הלקוחות פועלים על מסד נתונים חי אחד.',
        metric: 'מסד נתונים אחוד 1',
      },
      {
        title: 'בעלות מלאה · $0 מס לכל עובד',
        desc: 'ללא דמי מנוי חודשיים לכל עובד חדש. הוסף צוות, סניפים ולקוחות ללא הגבלה במערכת ששייכת לך.',
        metric: '$0 מס למשתמש',
      },
    ],
    directoryKicker: 'עמודי הפלטפורמה הייעודיים',
    directoryTitle: 'צלול לכל שכבה במערכת המותאמת שלך',
    directorySub:
      'חילקנו את הפלטפורמה לעמודים ייעודיים כדי שתוכל לבחון את המודולים, הענפים, סיפורי ההצלחה ומחשבון התמחור בבהירות מלאה.',
    cards: [
      {
        page: 'solutions',
        badge: '12 מודולים מותאמים',
        title: 'פתרונות ויכולות ליבה',
        desc: 'גלה את 4 עמודי התווך ו-12 המודולים — מ-CRM ויומן תורים ועד בוטים דו-כיווניים וניהול כספים.',
        cta: 'לעמוד הפתרונות',
      },
      {
        page: 'industries',
        badge: '12+ ענפי פעילות',
        title: 'ענפים והדגמת יומן תורים חי',
        desc: 'נסה את ווידג׳ט הזמנת התורים החי וראה כיצד אנו מתאימים מערכות למרפאות, מכוני יופי, כושר, רכב ו-B2B.',
        cta: 'לעמוד הענפים',
      },
      {
        page: 'business-types',
        badge: 'לפי היקף פעילות',
        title: 'סוגי עסקים ורשתות',
        desc: 'ראה כיצד הארכיטקטורה מותאמת מסטודיו בוטיק ועד רשתות מרובות סניפים וזכיינויות.',
        cta: 'לעמוד סוגי העסקים',
      },
      {
        page: 'pricing',
        badge: 'מאפיין מערכת אינטראקטיבי',
        title: 'תמחור מערכת בהתאמה אישית',
        desc: 'בחר את היקף הפעילות והתהליכים שתרצה לאחד למערכת אחת וחשב את החיסכון השנתי במנויי תוכנה.',
        cta: 'לאפיון ותמחור מערכת',
      },
      {
        page: 'simulator',
        badge: 'סימולטור החזר השקעה',
        title: 'סימולטור ארכיטקטורה וזמנים',
        desc: 'הרכב את שילוב המודולים שלך בזמן אמת והשווה זמני פיתוח ועלויות מול סוכנויות מסורתיות.',
        cta: 'לעמוד הסימולטור',
      },
      {
        page: 'cases',
        badge: 'מערכות מוכחות בשטח',
        title: 'סיפורי הצלחה ותוצאות',
        desc: 'ראה מערכות שצמצמו אי-הגעות ב-68%, חסכו 82% מהעבודה הידנית והכפילו פי 3 את קצב המרת הלידים.',
        cta: 'לסיפורי ההצלחה',
      },
      {
        page: 'about',
        badge: 'הפילוסופיה שלנו',
        title: 'אודות BryTech והחזון שלנו',
        desc: 'למד כיצד צוות ההנדסה שלנו בונה מערכות אחודות שמפחיתות עלויות וממקסמות את פוטנציאל העסק.',
        cta: 'לעמוד אודות',
      },
    ],
  },
};

export const UnifiedVisionOverviewSection: React.FC<UnifiedVisionOverviewSectionProps> = ({
  lang,
  onSelectPage,
}) => {
  const t = TRANSLATIONS[lang];
  const copy = OVERVIEW_COPY[lang];

  const getIconForPage = (page: ActivePageView) => {
    switch (page) {
      case 'solutions':
        return Layers;
      case 'industries':
        return Building2;
      case 'business-types':
        return Briefcase;
      case 'pricing':
        return CreditCard;
      case 'simulator':
        return Sliders;
      case 'cases':
        return Sparkles;
      default:
        return Info;
    }
  };

  return (
    <section
      id="unified-vision-overview"
      dir={t.dir}
      className="relative w-full bg-white text-[#1d1d1f] py-24 px-4 sm:px-8 lg:px-12 xl:px-16 border-t border-black/[0.06] overflow-hidden"
    >
      <div className="w-full max-w-[1920px] mx-auto space-y-24">
        {/* Part 1: Executive Custom System Vision Summary */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto mb-14"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1d1d1f] text-[#d4af37] text-xs font-semibold mb-5 border border-[#d4af37]/30">
              <Cpu className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>{copy.badge}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-[54px] font-bold tracking-[-0.035em] text-[#1d1d1f] leading-[1.08] mb-5">
              {copy.title}
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-[#6e6e73] leading-relaxed">
              {copy.subtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
            {copy.pillars.map((pillar, idx) => {
              const Icon = idx === 0 ? Workflow : idx === 1 ? Layers : ShieldCheck;
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="rounded-[32px] bg-[#f5f5f7] p-8 sm:p-10 border border-black/[0.05] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-6">
                      <span className="px-3.5 py-1 rounded-full bg-white text-xs font-bold text-[#0071e3] border border-black/[0.06]">
                        {pillar.metric}
                      </span>
                      <div className="w-11 h-11 rounded-2xl bg-[#0071e3] text-white flex items-center justify-center shadow-xs">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#1d1d1f] tracking-tight mb-3">
                      {pillar.title}
                    </h3>
                    <p className="text-sm sm:text-base text-[#6e6e73] leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-black/[0.06] flex items-center gap-2 text-xs font-semibold text-emerald-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Engineered Around Your Business</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Part 2: Multi-Page Architecture Directory */}
        <div className="rounded-[36px] bg-[#141416] text-white p-7 sm:p-12 lg:p-16 border border-[#d4af37]/30 shadow-[0_24px_70px_rgba(0,0,0,0.16)]">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37] block mb-2">
              {copy.directoryKicker}
            </span>
            <h3 className="text-2xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-white leading-tight mb-3">
              {copy.directoryTitle}
            </h3>
            <p className="text-sm sm:text-base text-white/70 leading-relaxed">
              {copy.directorySub}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {copy.cards.map((card, idx) => {
              const Icon = getIconForPage(card.page);
              const isPricing = card.page === 'pricing';
              return (
                <motion.div
                  key={card.page}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: idx * 0.05 }}
                  whileHover={{ y: -5 }}
                  onClick={() => {
                    onSelectPage(card.page);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`group rounded-[28px] p-7 border transition-all cursor-pointer flex flex-col justify-between ${
                    isPricing
                      ? 'bg-gradient-to-br from-[#0071e3] to-[#004a99] border-[#d4af37]/60 text-white shadow-xl'
                      : 'bg-white/[0.05] hover:bg-white/[0.09] border-white/10 hover:border-[#d4af37]/45 text-white'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-5">
                      <span
                        className={`px-3 py-1 rounded-full text-[11px] font-bold ${
                          isPricing
                            ? 'bg-white text-[#0071e3]'
                            : 'bg-white/10 text-[#d4af37]'
                        }`}
                      >
                        {card.badge}
                      </span>
                      <div
                        className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                          isPricing ? 'bg-white/20 text-white' : 'bg-white/10 text-[#52a8ff]'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    <h4 className="text-xl font-bold tracking-tight mb-2.5">
                      {card.title}
                    </h4>
                    <p
                      className={`text-xs sm:text-sm leading-relaxed mb-6 ${
                        isPricing ? 'text-white/90' : 'text-white/70'
                      }`}
                    >
                      {card.desc}
                    </p>
                  </div>

                  <div
                    className={`pt-4 border-t flex items-center justify-between text-xs font-bold ${
                      isPricing
                        ? 'border-white/20 text-white'
                        : 'border-white/10 text-[#d4af37] group-hover:text-white'
                    }`}
                  >
                    <span>{card.cta}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
