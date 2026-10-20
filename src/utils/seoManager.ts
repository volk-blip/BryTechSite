import { Language } from '../i18n/translations';
import { ActivePageView } from '../components/Navbar';

interface PageSeoMetadata {
  title: string;
  description: string;
}

const SEO_METADATA: Record<Language, Record<ActivePageView, PageSeoMetadata>> = {
  en: {
    overview: {
      title: 'BryTech — Custom CRM, AI Automation & Business Systems',
      description:
        'BryTech builds custom unified business systems, CRM, online booking, client portals, and WhatsApp/Telegram/Instagram AI bots tailored to your workflow.',
    },
    solutions: {
      title: 'Custom Business Solutions, CRM & AI Bots | BryTech',
      description:
        'Explore BryTech custom modules: unified CRM, 24/7 online booking, WhatsApp & Telegram automation bots, ERP inventory, and branded client portals.',
    },
    industries: {
      title: 'Industry-Tailored Operating Systems & CRM | BryTech',
      description:
        'Custom-engineered business operating systems for clinics, beauty studios, real estate, e-commerce, fitness clubs, auto service, and service enterprises.',
    },
    'business-types': {
      title: 'Scalable Systems for Single & Multi-Branch Businesses | BryTech',
      description:
        'From fast-growing single locations to multi-branch franchises and enterprise networks — BryTech builds one system around your exact operations.',
    },
    simulator: {
      title: 'Interactive System Architecture Simulator | BryTech',
      description:
        'Test and configure your custom business operating system interactively — combine CRM, scheduling, client portal, and AI bots in real time.',
    },
    cases: {
      title: 'Client Case Studies & Custom System ROI | BryTech',
      description:
        'See how businesses cut SaaS software overhead by up to 70% and unified their operations with custom-engineered BryTech platforms.',
    },
    pricing: {
      title: 'Custom System Architecture & Transparent Pricing | BryTech',
      description:
        'Build your custom business system scope with zero per-user monthly fees and 100% platform ownership. Get an instant tailored architecture estimate.',
    },
    about: {
      title: 'About BryTech & Founder Boris Brygin | Custom Business Systems',
      description:
        'Founded by Boris Brygin with 15+ years of enterprise tech & sales leadership, BryTech brings enterprise-level efficiency directly to growing businesses.',
    },
    contact: {
      title: 'Contact BryTech — Telegram, WhatsApp, Instagram & Direct Call',
      description:
        'Connect directly with BryTech on Telegram (@Brytech_systems), WhatsApp (+380637127001), Instagram (@BryTech_Systems), or request your custom system blueprint.',
    },
  },
  ru: {
    overview: {
      title: 'BryTech — Кастомные CRM, ИИ-Автоматизация и Системы Бизнеса',
      description:
        'BryTech разрабатывает единые кастомные системы управления бизнесом: CRM, онлайн-запись, клиентский кабинет и боты Telegram/WhatsApp/Instagram.',
    },
    solutions: {
      title: 'Решения для Бизнеса: Кастомная CRM, Запись и ИИ-Боты | BryTech',
      description:
        'Все модули вашего бизнеса в одной системе: CRM, онлайн-расписание, двусторонние боты WhatsApp и Telegram, склад, финансы и клиентский портал.',
    },
    industries: {
      title: 'Отраслевые Системы Автоматизации Бизнеса | BryTech',
      description:
        'Индивидуальные операционные системы для клиник, салонов красоты, недвижимости, e-commerce, фитнес-клубов, автосервисов и сервисных компаний.',
    },
    'business-types': {
      title: 'Системы для Локального Бизнеса, Сетей и Франшиз | BryTech',
      description:
        'От одной студии до международной сети филиалов — проектируем единую платформу под процессы вашей компании без абонплаты за сотрудников.',
    },
    simulator: {
      title: 'Интерактивный Конструктор Архитектуры Системы | BryTech',
      description:
        'Соберите и протестируйте конфигурацию вашей будущей системы управления бизнесом в реальном времени.',
    },
    cases: {
      title: 'Кейсы Клиентов и Результаты Внедрения | BryTech',
      description:
        'Реальные примеры того, как компании сокращают расходы на ПО до 70% и объединяют все отделы в единой системе BryTech.',
    },
    pricing: {
      title: 'Индивидуальный Расчет Стоимости Системы | BryTech',
      description:
        'Прозрачный расчет стоимости кастомной системы под ваши задачи — без ежемесячной платы за каждого пользователя и с полной собственностью на платформу.',
    },
    about: {
      title: 'О Компании BryTech и Основателе Борисе Брыгине',
      description:
        'Борис Брыгин (15+ лет опыта в enterprise-технологиях и управлении продажами) основал BryTech, чтобы создавать эффективные кастомные системы для растущего бизнеса.',
    },
    contact: {
      title: 'Контакты BryTech — Telegram, WhatsApp, Instagram и Прямой Звонок',
      description:
        'Свяжитесь с BryTech напрямую в Telegram (@Brytech_systems), WhatsApp (+380637127001), Instagram (@BryTech_Systems) или оставьте заявку на архитектуру системы.',
    },
  },
  uk: {
    overview: {
      title: 'BryTech — Кастомні CRM, ШІ-Автоматизація та Системи Бізнесу',
      description:
        'BryTech створює індивідуальні єдині системи управління бізнесом: CRM, онлайн-запис, кабінет клієнта та боти Telegram/WhatsApp/Instagram.',
    },
    solutions: {
      title: 'Рішення для Бізнесу: Кастомна CRM, Запис та ШІ-Боти | BryTech',
      description:
        'Усі процеси компанії в одній платформі: CRM, онлайн-запис, автоматизація Telegram/WhatsApp/Instagram, фінанси, склад та клієнтський портал.',
    },
    industries: {
      title: 'Галузеві Системи Автоматизації Бізнесу | BryTech',
      description:
        'Індивідуальні операційні системи для медичних клінік, салонів краси, нерухомості, логістики, e-commerce, фітнес-клубів та сервісних компаній.',
    },
    'business-types': {
      title: 'Системи для Локального Бізнесу, Мереж та Франшиз | BryTech',
      description:
        'Від однієї локації до мережі філій — розробляємо єдину кастомну систему під ваші бізнес-правила без абонплати за кожного працівника.',
    },
    simulator: {
      title: 'Інтерактивний Симулятор Архітектури Системи | BryTech',
      description:
        'Зберіть та протестуйте конфігурацію вашої майбутньої системи управління бізнесом онлайн.',
    },
    cases: {
      title: 'Кейси Клієнтів та Ефективність Впровадження | BryTech',
      description:
        'Як бізнеси скорочують витрати на підписки до 70% та об’єднують усі процеси в єдиній кастомній системі BryTech.',
    },
    pricing: {
      title: 'Індивідуальний Прорахунок Вартості Системи | BryTech',
      description:
        'Прозорий розрахунок кастомної системи під ваші модулі — 0$ абонплати за користувачів та 100% власність на платформу.',
    },
    about: {
      title: 'Про Компанію BryTech та Засновника Бориса Бригіна',
      description:
        'Засновник BryTech Борис Бригін (15+ років досвіду в enterprise-технологіях та продажах) створює індивідуальні системи та ШІ-рішення для швидкого росту бізнесу.',
    },
    contact: {
      title: 'Контакти BryTech — Telegram, WhatsApp, Instagram та Телефон',
      description:
        'Напишіть нам напряму в Telegram (@Brytech_systems), WhatsApp (+380637127001), Instagram (@BryTech_Systems) або залиште заявку на прорахунок системи.',
    },
  },
  he: {
    overview: {
      title: 'BryTech — מערכות CRM מותאמות אישית, אוטומציית AI ומערכות לעסקים',
      description:
        'BryTech בונה מערכות הפעלה עסקיות אחודות בהתאמה אישית: CRM, יומן תורים אונליין, פורטל לקוחות ובוטים חכמים לוואטסאפ, טלגרם ואינסטגרם.',
    },
    solutions: {
      title: 'פתרונות מותאמים לעסקים: CRM, יומן תורים ובוטים | BryTech',
      description:
        'כל תהליכי העסק במערכת אחת: CRM מותאם אישית, הזמנת תורים 24/7, אוטומציה בוואטסאפ וטלגרם, ניהול מלאי וכספים ופורטל לקוחות ממותג.',
    },
    industries: {
      title: 'מערכות ניהול מותאמות אישית לכל ענף עסקי | BryTech',
      description:
        'מערכות הפעלה עסקיות למרפאות, מכוני יופי, נדל״ן, מסחר אלקטרוני, מועדוני כושר, מוסכים וחברות שירותים.',
    },
    'business-types': {
      title: 'מערכות לעסקים מקומיים, רשתות וזכיינויות | BryTech',
      description:
        'ממיקום בודד ועד רשת סניפים ארצית או בינלאומית — מערכת אחת שמותאמת בדיוק לתהליכי העבודה שלכם ללא תשלום חודשי לפי משתמש.',
    },
    simulator: {
      title: 'סימולטור אינטראקטיבי לאפיון מערכת עסקית | BryTech',
      description:
        'הרכיבו ובדקו בזמן אמת את ארכיטקטורת המערכת העסקית שלכם — CRM, תורים, בוטים ופורטל לקוחות.',
    },
    cases: {
      title: 'סיפורי הצלחה וחיסכון בעלויות תוכנה | BryTech',
      description:
        'גלו כיצד עסקים חסכו עד 70% בעלויות התוכנה ואיחדו את כל הפעילות למערכת אחת של BryTech.',
    },
    pricing: {
      title: 'תמחור מותאם אישית לארכיטקטורת המערכת שלך | BryTech',
      description:
        'תמחור שקוף לפי המודולים שהעסק שלך צריך — ללא דמי מנוי לכל עובד ובבעלות מלאה על המערכת.',
    },
    about: {
      title: 'אודות BryTech והמייסד בוריס בריגין | מערכות עסקיות חכמות',
      description:
        'בוריס בריגין, מייסד BryTech (מעל 15 שנות ניסיון בהובלת טכנולוגיה ומכירות בארגונים גדולים), מתמחה בבניית מערכות מותאמות אישית ופתרונות AI לעסקים צומחים.',
    },
    contact: {
      title: 'יצירת קשר עם BryTech — טלגרם, וואטסאפ, אינסטגרם וטלפון ישיר',
      description:
        'דברו איתנו ישירות בטלגרם (@Brytech_systems), בוואטסאפ (+380637127001), באינסטגרם (@BryTech_Systems) או השאירו פרטים לאפיון מערכת.',
    },
  },
};

function setOrUpdateMeta(attrName: 'name' | 'property', attrValue: string, content: string) {
  let el = document.head.querySelector(`meta[${attrName}="${attrValue}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attrName, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export function applyDynamicPageSeo(lang: Language, activePage: ActivePageView) {
  if (typeof document === 'undefined' || typeof window === 'undefined') return;

  const meta = SEO_METADATA[lang]?.[activePage] || SEO_METADATA.en.overview;

  // Update <html lang="...">
  document.documentElement.lang = lang === 'uk' ? 'uk' : lang === 'ru' ? 'ru' : lang === 'he' ? 'he' : 'en';

  // Update <title>
  document.title = meta.title;

  // Update standard & social description/title tags
  setOrUpdateMeta('name', 'description', meta.description);
  setOrUpdateMeta('property', 'og:title', meta.title);
  setOrUpdateMeta('property', 'og:description', meta.description);
  setOrUpdateMeta('name', 'twitter:title', meta.title);
  setOrUpdateMeta('name', 'twitter:description', meta.description);

  const canonicalUrl =
    activePage === 'overview'
      ? `${window.location.origin}${window.location.pathname}`
      : `${window.location.origin}${window.location.pathname}?page=${activePage}`;

  setOrUpdateMeta('property', 'og:url', canonicalUrl);

  let canonicalLink = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', canonicalUrl);
}
