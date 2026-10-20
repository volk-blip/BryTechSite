import React from 'react';
import { motion } from 'motion/react';
import { Language, TRANSLATIONS } from '../i18n/translations';
import { BryTechVisualArtwork } from './BryTechVisualArtwork';
import { BryTechLogo } from './BryTechLogo';
import {
  Sparkles,
  TrendingDown,
  TrendingUp,
  ShieldCheck,
  Zap,
  CheckCircle2,
  ArrowRight,
  Layers,
  Cpu,
  Quote,
  Award,
  Briefcase,
  Workflow,
} from 'lucide-react';
import { ActivePageView } from './Navbar';

interface AboutCompanyPageProps {
  lang: Language;
  onSelectPage: (page: ActivePageView) => void;
  onOpenPortal: () => void;
}

const FOUNDER_BIO_COPY: Record<
  Language,
  {
    kicker: string;
    roleBadge: string;
    greeting: string;
    paragraph1: string;
    paragraph2: string;
    paragraph3: string;
    quoteHighlight: string;
    founderName: string;
    founderTitle: string;
    stats: {
      value: string;
      label: string;
    }[];
    ctaConsult: string;
    ctaConfigure: string;
  }
> = {
  en: {
    kicker: 'FOUNDER & EXECUTIVE LEADERSHIP',
    roleBadge: 'Founder of BryTech · Enterprise Systems & Sales Architecture',
    greeting: 'Hi, I’m Boris Brygin, Founder of BryTech.',
    paragraph1:
      'With over 15 years of hands-on experience bridging technology and sales management across enterprise environments and large-scale projects, I founded BryTech with a clear mission: to bring enterprise-level efficiency directly to growing businesses.',
    paragraph2:
      "In today’s fast-moving digital landscape, businesses don't need off-the-shelf complexity, they need smart, tailor-made solutions that genuinely move the needle.",
    paragraph3:
      'At BryTech, we specialize in designing custom workflows and AI-driven systems engineered to streamline your operations, eliminate bottlenecks, and make your day-to-day business dramatically faster and more efficient.',
    quoteHighlight:
      "Businesses don't need off-the-shelf complexity — they need smart, tailor-made solutions that genuinely move the needle.",
    founderName: 'Boris Brygin',
    founderTitle: 'Founder of BryTech',
    stats: [
      { value: '15+ Years', label: 'Enterprise Tech & Sales Leadership' },
      { value: '100% Custom', label: 'Tailor-Made Workflows & AI Systems' },
      { value: 'Zero Bottlenecks', label: 'Engineered for Speed & Efficiency' },
    ],
    ctaConsult: 'Speak Directly with Boris',
    ctaConfigure: 'Design Your Custom System',
  },
  ru: {
    kicker: 'ОСНОВАТЕЛЬ И РУКОВОДСТВО КОМПАНИИ',
    roleBadge: 'Основатель BryTech · Корпоративные Системы и Архитектура Продаж',
    greeting: 'Привет, я Борис Брыгин, основатель BryTech.',
    paragraph1:
      'Обладая более чем 15-летним практическим опытом на стыке технологий и управления продажами в корпоративной среде и крупных проектах, я основал BryTech с четкой миссией: сделать эффективность уровня крупного бизнеса доступной для растущих компаний.',
    paragraph2:
      'В современном динамичном цифровом мире бизнесу не нужна шаблонная сложность «коробочных» программ — ему нужны умные, индивидуально созданные решения, которые дают реальный измеримый результат.',
    paragraph3:
      'В BryTech мы специализируемся на проектировании кастомных бизнес-процессов и AI-систем, созданных для того, чтобы оптимизировать ваши операции, устранить узкие места и сделать ежедневную работу вашего бизнеса кратно быстрее и эффективнее.',
    quoteHighlight:
      'Бизнесу не нужна шаблонная сложность — нужны умные индивидуальные решения, которые дают реальный результат.',
    founderName: 'Boris Brygin',
    founderTitle: 'Основатель BryTech',
    stats: [
      { value: '15+ Лет', label: 'Опыта в Tech и Управлении Продажами' },
      { value: '100% Кастом', label: 'Индивидуальные Процессы и AI-Системы' },
      { value: '0 Узких Мест', label: 'Максимальная Скорость Операций' },
    ],
    ctaConsult: 'Связаться с Борисом',
    ctaConfigure: 'Собрать Свою Систему',
  },
  uk: {
    kicker: 'ЗАСНОВНИК ТА КЕРІВНИЦТВО КОМПАНІЇ',
    roleBadge: 'Засновник BryTech · Корпоративні Системи та Архітектура Продажів',
    greeting: 'Привіт, я Борис Бригін, засновник BryTech.',
    paragraph1:
      'Маючи понад 15 років практичного досвіду на перетині технологій та управління продажами в корпоративному середовищі та масштабних проєктах, я заснував BryTech із чіткою місією: принести ефективність корпоративного рівня безпосередньо зростаючому бізнесу.',
    paragraph2:
      'У сучасному динамічному цифровому світі бізнесу не потрібна шаблонна складність готових рішень — йому потрібні розумні, індивідуально створені системи, які реально рухають показники вперед.',
    paragraph3:
      'У BryTech ми спеціалізуємося на проєктуванні кастомних робочих процесів та AI-систем, створених для оптимізації ваших операцій, усунення вузьких місць та кардинального прискорення щоденної роботи бізнесу.',
    quoteHighlight:
      'Бізнесу не потрібна шаблонна складність — потрібні розумні індивідуальні рішення, що реально дають результат.',
    founderName: 'Boris Brygin',
    founderTitle: 'Засновник BryTech',
    stats: [
      { value: '15+ Років', label: 'Досвіду в Tech та Управлінні Продажами' },
      { value: '100% Кастом', label: 'Індивідуальні Процеси та AI-Системи' },
      { value: 'Без Затримок', label: 'Максимальна Швидкість Операцій' },
    ],
    ctaConsult: 'Зв’язатися з Борисом',
    ctaConfigure: 'Створити Свою Систему',
  },
  he: {
    kicker: 'מייסד והנהגת החברה',
    roleBadge: 'מייסד BryTech · מערכות ארגוניות וארכיטקטורת מכירות',
    greeting: 'היי, אני בוריס בריגין (Boris Brygin), מייסד BryTech.',
    paragraph1:
      'עם יותר מ-15 שנות ניסיון מעשי בגישור בין טכנולוגיה לניהול מכירות בסביבות ארגוניות (Enterprise) ובפרויקטים רחבי היקף, הקמתי את BryTech עם שליחות ברורה: להנגיש יעילות ברמה ארגונית ישירות לעסקים בצמיחה.',
    paragraph2:
      'במציאות הדיגיטלית המהירה של היום, עסקים לא צריכים מורכבות של תוכנות מדף גנריות — הם צריכים פתרונות חכמים ותפורים אישית שבאמת מזיזים את המחט ומביאים תוצאות.',
    paragraph3:
      'ב-BryTech אנו מתמחים בתכנון תהליכי עבודה מותאמים אישית ומערכות מבוססות AI שנועדו לייעל את התפעול שלך, לחסל צווארי בקבוק ולהפוך את העבודה היומיומית של העסק למהירה ויעילה לאין שיעור.',
    quoteHighlight:
      'עסקים לא צריכים מורכבות גנרית מהמדף — הם צריכים פתרונות חכמים ותפורים אישית שבאמת מביאים תוצאות.',
    founderName: 'Boris Brygin',
    founderTitle: 'מייסד BryTech',
    stats: [
      { value: '+15 שנים', label: 'ניסיון בטכנולוגיה וניהול מכירות ארגוני' },
      { value: '100% מותאם', label: 'תהליכי עבודה חכמים ומערכות AI' },
      { value: 'אפס חסמים', label: 'תפעול מהיר, חלק ויעיל יותר' },
    ],
    ctaConsult: 'שיחה ישירה עם בוריס',
    ctaConfigure: 'אפיון המערכת שלך',
  },
};

const ABOUT_VISION_COPY: Record<
  Language,
  {
    badge: string;
    heroTitle: string;
    heroAccent: string;
    heroSub: string;
    visionTitle: string;
    visionParagraph1: string;
    visionParagraph2: string;
    pillars: {
      tag: string;
      metric: string;
      title: string;
      desc: string;
      bullets: string[];
    }[];
    formulaTitle: string;
    formulaSub: string;
    formulaSteps: {
      step: string;
      title: string;
      desc: string;
    }[];
    ctaTitle: string;
    ctaSub: string;
    ctaPrimary: string;
    ctaSecondary: string;
  }
> = {
  en: {
    badge: 'BryTech Vision & Custom System Engineering',
    heroTitle: 'One Custom-Built System to Run',
    heroAccent: 'Your Entire Business Operations.',
    heroSub:
      'Most growing companies are trapped paying for 5 to 8 disconnected software subscriptions while their staff wastes hours copying data between spreadsheets, messengers, and rigid CRMs. Our vision is simple: we engineer one unified, custom-built operating system tailored 100% around your business.',
    visionTitle: 'Built Around Your Workflows — Never Forced Into a Box',
    visionParagraph1:
      'We founded BryTech with a clear mission: give ambitious businesses the exact custom digital infrastructure they need to cover every single operational workflow — from first lead intake and online scheduling to custom CRM pipelines, 2-way WhatsApp/Telegram bots, inventory, payroll, and client portals — inside one seamless system.',
    visionParagraph2:
      'Combining enterprise-grade systems engineering with deep sales operations expertise, we deliver tailor-made platforms in weeks instead of months — with full source-code ownership and zero per-user SaaS tax.',
    pillars: [
      {
        tag: 'Pillar 01 · Unification',
        metric: '1 System Instead of 7',
        title: 'Cover Every Department in One Unified Core',
        desc: 'Eliminate data silos forever. Your website, booking calendar, CRM, messenger bots, warehouse, and financial P&L share a single real-time database.',
        bullets: [
          'Zero per-employee or per-booking license fees',
          'Single login for owners, managers, and staff',
          '100% tailored to your exact business logic and rules',
        ],
      },
      {
        tag: 'Pillar 02 · Cost Reduction',
        metric: '-65% Operational Overhead',
        title: 'Slash SaaS Subscriptions & Manual Routine',
        desc: 'Our 2-way WhatsApp & Telegram bots and automated workflows handle confirmations, rescheduling, deposits, and inventory write-offs automatically.',
        bullets: [
          'Replace 5–8 fragmented monthly SaaS subscriptions',
          'Cut missed appointments by 78% with smart reminders',
          'Automated daily P&L, payroll commissions, and KPIs',
        ],
      },
      {
        tag: 'Pillar 03 · Revenue Velocity',
        metric: '+42% Conversion & Retention',
        title: 'Turn Every Client Touchpoint Into Growth',
        desc: 'Frictionless 3-tap booking, instant AI/bot lead responses in under 3 seconds, and automated VIP loyalty reactivation keep your schedule full.',
        bullets: [
          '24/7 self-service client portal & mobile-first booking',
          'Automated 5★ review collection and reactivation',
          'Full IP & database ownership that scales with you',
        ],
      },
    ],
    formulaTitle: 'How We Engineer Your Custom Unified System',
    formulaSub:
      'A transparent 4-stage architectural process designed around speed, precision, and measurable ROI.',
    formulaSteps: [
      {
        step: '01',
        title: 'Operational Audit & System Blueprint',
        desc: 'We map every department, bottleneck, and disconnected tool in your company to design a single unified system blueprint.',
      },
      {
        step: '02',
        title: 'Custom Core & Database Engineering',
        desc: 'We build your custom CRM, scheduling engine, role permissions, and financial logic around your exact operational rules.',
      },
      {
        step: '03',
        title: 'Bots, Payments & API Unification',
        desc: 'We connect 2-way WhatsApp/Telegram bots, payment gateways, telephony, and migrate 100% of your historical client data.',
      },
      {
        step: '04',
        title: 'Launch, Team Onboarding & Evolution',
        desc: 'Your team goes live on one intuitive platform with full training, live Client Area tracking, and continuous support.',
      },
    ],
    ctaTitle: 'Ready to Unify All Your Business Operations Into One Custom System?',
    ctaSub:
      'Configure your custom architecture on our Pricing page or speak directly with Boris Brygin and our architecture team right now.',
    ctaPrimary: 'Configure Custom System & Pricing',
    ctaSecondary: 'Speak with Boris & Team',
  },
  ru: {
    badge: 'Видение BryTech · Индивидуальная Инженерия Бизнеса',
    heroTitle: 'Одна Кастомная Система для Управления',
    heroAccent: 'Всеми Процессами Вашего Бизнеса.',
    heroSub:
      'Большинство компаний вынуждены оплачивать от 5 до 8 разрозненных сервисов, пока сотрудники тратят часы на перенос данных между таблицами, мессенджерами и шаблонными CRM. Наше видение простое: мы создаем для каждого клиента единую индивидуальную систему, которая закрывает 100% задач его бизнеса.',
    visionTitle: 'Система Подстраивается Под Ваш Бизнес — А Не Наоборот',
    visionParagraph1:
      'Мы создали BryTech с четкой целью: дать бизнесу индивидуальную цифровую платформу, которая объединяет все операционные процессы — от первого обращения клиента и онлайн-записи до кастомной CRM, двусторонних ботов Telegram/WhatsApp, склада, расчета зарплат и личного кабинета клиента — в одной безупречной системе.',
    visionParagraph2:
      'Объединяя корпоративную системную инженерию с глубокой экспертизой в продажах и AI-автоматизации, мы разрабатываем кастомные платформы за недели, а не месяцы — с передачей 100% прав на систему и без абонплаты за каждого сотрудника.',
    pillars: [
      {
        tag: 'Принцип 01 · Единая Экосистема',
        metric: '1 Система Вместо 7',
        title: 'Все Отделы Компании в Одном Ядре',
        desc: 'Никаких потерянных лидов и рассинхронизации. Ваш сайт, календарь записи, CRM, боты мессенджеров, склад и финансы работают на единой базе данных.',
        bullets: [
          'Ноль доплат за каждого нового сотрудника или филиал',
          'Единое окно работы для собственника, админов и мастеров',
          '100% соответствие вашей уникальной бизнес-логике',
        ],
      },
      {
        tag: 'Принцип 02 · Снижение Затрат',
        metric: '-65% Операционных Расходов',
        title: 'Отказ от Лишних Подписок и Ручной Рутины',
        desc: 'Двусторонние боты в WhatsApp и Telegram и умные сценарии берут на себя подтверждение записей, предоплаты, списание расходников и отчеты.',
        bullets: [
          'Замена 5–8 ежемесячных платных SaaS-сервисов',
          'Снижение неявок клиентов на 78% за счет умных напоминаний',
          'Автоматический расчет зарплат, бонусов и P&L в реальном времени',
        ],
      },
      {
        tag: 'Принцип 03 · Рост Прибыли',
        metric: '+42% к Конверсии и Возврату',
        title: 'Каждое Касание с Клиентом Работает на Продажи',
        desc: 'Удобная онлайн-запись в 3 клика, мгновенная реакция бота за 3 секунды и автоматический возврат спящих клиентов обеспечивают полную загрузку.',
        bullets: [
          'Круглосуточный личный кабинет клиента и онлайн-запись',
          'Автоматический сбор 5★ отзывов и реактивация базы',
          'Полная собственность на платформу и клиентскую базу',
        ],
      },
    ],
    formulaTitle: 'Как Мы Создаем Вашу Единую Кастомную Систему',
    formulaSub:
      'Прозрачный процесс из 4 этапов, ориентированный на быстрый запуск и измеримую окупаемость.',
    formulaSteps: [
      {
        step: '01',
        title: 'Аудит Процессов и Архитектурный Проект',
        desc: 'Изучаем все отделы, узкие места и текущие программы вашей компании, формируя ТЗ единой системы.',
      },
      {
        step: '02',
        title: 'Разработка Кастомного Ядра и CRM',
        desc: 'Создаем индивидуальную базу данных, воронки CRM, расписание, права доступа и финансовый модуль под ваши правила.',
      },
      {
        step: '03',
        title: 'Интеграция Ботов, Оплат и Миграция Базы',
        desc: 'Подключаем ботов WhatsApp/Telegram, эквайринг, телефонию и бережно переносим всю вашу текущую базу клиентов.',
      },
      {
        step: '04',
        title: 'Запуск, Обучение Команды и Масштабирование',
        desc: 'Переводим команду на единую платформу без остановки бизнеса и развиваем систему вместе с ростом вашей компании.',
      },
    ],
    ctaTitle: 'Готовы Объединить Все Процессы Бизнеса в Одну Кастомную Систему?',
    ctaSub:
      'Соберите архитектуру вашей системы на странице Тарифов или обсудите проект напрямую с Борисом Брыгиным.',
    ctaPrimary: 'Собрать Конфигурацию Системы',
    ctaSecondary: 'Связаться с Борисом',
  },
  uk: {
    badge: 'Візія BryTech · Індивідуальна Інженерія Бізнесу',
    heroTitle: 'Одна Кастомна Система для Управління',
    heroAccent: 'Усіма Процесами Вашого Бізнесу.',
    heroSub:
      'Більшість компаній змушені платити за 5–8 розрізнених сервісів, поки співробітники витрачають години на копіювання даних між таблицями, месенджерами та шаблонними CRM. Наша візія проста: ми створюємо для кожного клієнта єдину індивідуальну систему, яка закриває 100% потреб його бізнесу.',
    visionTitle: 'Система Підлаштовується Під Ваш Бізнес — А Не Навпаки',
    visionParagraph1:
      'Ми заснували BryTech із чіткою метою: надати бізнесу індивідуальну цифрову платформу, що об’єднує всі операційні процеси — від першого звернення та онлайн-запису до кастомної CRM, двосторонніх ботів Telegram/WhatsApp, складу, зарплат та клієнтського порталу — в одній цілісній системі.',
    visionParagraph2:
      'Поєднуючи корпоративну інженерію систем із глибоким досвідом управління продажами та AI, ми створюємо кастомні платформи за тижні, а не місяці — зі 100% передачею прав власності та без щомісячного податку за кожного працівника.',
    pillars: [
      {
        tag: 'Принцип 01 · Єдина Екосистема',
        metric: '1 Система Замість 7',
        title: 'Усі Відділи Компанії в Одному Ядрі',
        desc: 'Жодних втрачених лідів та розсинхронизації. Ваш сайт, розклад, CRM, боти месенджерів, склад і фінанси працюють на єдиній базі даних.',
        bullets: [
          'Нуль доплат за кожного нового співробітника чи філію',
          'Єдине вікно роботи для власника, адмінів та фахівців',
          '100% відповідність вашій унікальній бізнес-логіці',
        ],
      },
      {
        tag: 'Принцип 02 · Зниження Витрат',
        metric: '-65% Операційних Витрат',
        title: 'Відмова від Зайвих Підписок та Ручної Рутини',
        desc: 'Двосторонні боти у WhatsApp і Telegram та розумні сценарії автоматизують підтвердження візитів, передоплати, списання матеріалів та звіти.',
        bullets: [
          'Заміна 5–8 щомісячних платних SaaS-підписок',
          'Зменшення неявок клієнтів на 78% завдяки нагадуванням',
          'Автоматичний розрахунок зарплат, бонусів та P&L',
        ],
      },
      {
        tag: 'Принцип 03 · Зростання Прибутку',
        metric: '+42% до Конверсії та Утримання',
        title: 'Кожен Контакт із Клієнтом Працює на Продажі',
        desc: 'Онлайн-запис у 3 кліки, миттєва відповідь бота за 3 секунди та автоматичне повернення клієнтів забезпечують повне завантаження.',
        bullets: [
          'Цілодобовий особистий кабінет клієнта та онлайн-запис',
          'Автоматичний збір 5★ відгуків та реактивація бази',
          'Повна власність на платформу та клієнтську базу',
        ],
      },
    ],
    formulaTitle: 'Як Ми Створюємо Вашу Єдину Кастомну Систему',
    formulaSub:
      'Прозорий процес із 4 етапів, орієнтований на швидкий запуск та вимірювану окупність.',
    formulaSteps: [
      {
        step: '01',
        title: 'Аудит Процесів та Архітектурний Проєкт',
        desc: 'Досліджуємо всі відділи, вузькі місця та поточні сервіси вашої компанії, формуючи архітектуру єдиної системи.',
      },
      {
        step: '02',
        title: 'Розробка Кастомного Ядра та CRM',
        desc: 'Створюємо індивідуальну базу даних, воронки CRM, розклад, права доступу та фінансовий модуль під ваші правила.',
      },
      {
        step: '03',
        title: 'Інтеграція Ботів, Оплат та Міграція Бази',
        desc: 'Підключаємо ботів WhatsApp/Telegram, еквайринг, телефонію та переносимо всю вашу поточну базу клієнтів.',
      },
      {
        step: '04',
        title: 'Запуск, Навчання Команди та Масштабування',
        desc: 'Переводимо команду на єдину платформу без зупинки бізнесу та розвиваємо систему разом із вашою компанією.',
      },
    ],
    ctaTitle: 'Готові Об’єднати Всі Процеси Бізнесу в Одну Кастомну Систему?',
    ctaSub:
      'Зберіть архітектуру вашої системи на сторінці Тарифів або обговоріть проєкт напряму з Борисом Бригіним.',
    ctaPrimary: 'Зібрати Конфігурацію Системи',
    ctaSecondary: 'Зв’язатися з Борисом',
  },
  he: {
    badge: 'החזון של BryTech · הנדסת מערכות מותאמות אישית',
    heroTitle: 'מערכת אחת בבנייה אישית לניהול',
    heroAccent: 'כל תהליכי העסק שלך.',
    heroSub:
      'רוב העסקים בצמיחה נאלצים לשלם על 5 עד 8 מנויי תוכנה מנותקים בזמן שהצוות מבזבז שעות על העתקת נתונים בין אקסלים, וואטסאפ ומערכות CRM גנריות. החזון שלנו פשוט: אנו מתכננים ובונים עבור כל לקוח מערכת אחודה אחת המותאמת ב-100% למידות העסק שלו.',
    visionTitle: 'מערכת שנבנית סביב תהליכי העבודה שלך — ללא פשרות',
    visionParagraph1:
      'הקמנו את BryTech עם מטרה ברורה: להעניק לעסקים תשתית דיגיטלית אחודה המכסה כל תהליך תפעולי — מקליטת לידים וזימון תורים אונליין ועד CRM מותאם אישית, בוטים דו-כיווניים לוואטסאפ וטלגרם, ניהול מלאי, שכר ופורטל לקוחות — בתוך מערכת אחת חלקה.',
    visionParagraph2:
      'בשילוב ניסיון הנדסי ארגוני ומומחיות בניהול מכירות ו-AI, אנו מספקים מערכות ארגוניות בהתאמה אישית תוך שבועות ספורים — עם בעלות מלאה על הקוד וללא "מס SaaS" חודשי לכל עובד.',
    pillars: [
      {
        tag: 'עיקרון 01 · איחוד מלא',
        metric: 'מערכת 1 במקום 7',
        title: 'כל מחלקות העסק בליבה מאוחדת אחת',
        desc: 'סוף לפיצול מידע. האתר, יומן התורים, ה-CRM, הבוטים, המלאי ודוחות הרווח וההפסד פועלים על מסד נתונים חי אחד.',
        bullets: [
          'אפס עמלות או תוספת תשלום לכל עובד חדש',
          'ממשק אחד לבעלים, למנהלים ולצוות המקצועי',
          'התאמה של 100% לחוקי העבודה הייחודיים של העסק שלך',
        ],
      },
      {
        tag: 'עיקרון 02 · חיסכון בעלויות',
        metric: '-65% בעלויות תפעול',
        title: 'ביטול מנויי תוכנה כפולים ועבודה ידנית',
        desc: 'הבוטים הדו-כיווניים לוואטסאפ וטלגרם ותהליכי האוטומציה מטפלים באישורי הגעה, גביית מקדמות והורדת מלאי באופן אוטומטי.',
        bullets: [
          'החלפת 5–8 מנויי SaaS חודשיים יקרים במערכת אחת',
          'צמצום אי-הגעות ב-78% באמצעות תזכורות חכמות',
          'חישוב אוטומטי של עמלות עובדים ודוח רווח והפסד יומי',
        ],
      },
      {
        tag: 'עיקרון 03 · האצת הכנסות',
        metric: '+42% בהמרות ושימור',
        title: 'הפיכת כל אינטראקציה עם לקוח לצמיחה',
        desc: 'הזמנת תור ב-3 לחיצות, מענה אוטומטי ללידים תוך 3 שניות והחזרת לקוחות רדומים שומרים על יומן מלא.',
        bullets: [
          'פורטל לקוחות בשירות עצמי וזימון תורים 24/7',
          'איסוף ביקורות 5 כוכבים אוטומטי בגוגל',
          'בעלות מלאה על המערכת ומאגר הנתונים',
        ],
      },
    ],
    formulaTitle: 'כיצד אנו בונים את המערכת המאוחדת שלך',
    formulaSub: 'תהליך הנדסי שקוף ב-4 שלבים המתוכנן למהירות, דיוק והחזר השקעה מוכח.',
    formulaSteps: [
      {
        step: '01',
        title: 'מיפוי תהליכים ואפיון ארכיטקטורה',
        desc: 'אנו ממפים את כל המחלקות, צווארי הבקבוק והמערכות הקיימות כדי לתכנן מערכת מאוחדת אחת.',
      },
      {
        step: '02',
        title: 'פיתוח ליבת המערכת וה-CRM המותאם',
        desc: 'בונים את מסד הנתונים, משפכי ה-CRM, מנוע התורים, ההרשאות והמודול הפיננסי סביב החוקים שלך.',
      },
      {
        step: '03',
        title: 'חיבור בוטים, סליקה והסבת נתונים',
        desc: 'מחברים בוטים לוואטסאפ/טלגרם, סליקה וטלפוניה, ומייבאים בבטחה 100% מהיסטוריית הלקוחות שלך.',
      },
      {
        step: '04',
        title: 'השקה, הדרכת צוות וצמיחה מתמשכת',
        desc: 'הצוות שלך עולה לאוויר במערכת אחת אינטואיטיבית עם ליווי מלא בפורטל הלקוחות.',
      },
    ],
    ctaTitle: 'מוכן לאחד את כל תהליכי העסק למערכת מותאמת אחת?',
    ctaSub: 'אפיין את המערכת שלך בעמוד התמחור או דבר ישירות עם בוריס בריגין וצוות האדריכלים שלנו.',
    ctaPrimary: 'לאפיון מערכת ותמחור מותאם',
    ctaSecondary: 'שיחה עם בוריס והצוות',
  },
};

export const AboutCompanyPage: React.FC<AboutCompanyPageProps> = ({
  lang,
  onSelectPage,
  onOpenPortal,
}) => {
  const t = TRANSLATIONS[lang];
  const copy = ABOUT_VISION_COPY[lang];
  const bio = FOUNDER_BIO_COPY[lang];

  return (
    <section
      id="about-company-page"
      dir={t.dir}
      className="relative w-full min-h-[100svh] bg-white text-[#1d1d1f] pt-16 pb-24 px-4 sm:px-8 lg:px-12 xl:px-16 overflow-hidden"
    >
      <div className="w-full max-w-[1920px] mx-auto space-y-24">
        {/* Executive Hero Block */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-5xl mx-auto"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0071e3]/10 text-[#0071e3] text-xs font-semibold tracking-tight mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{copy.badge}</span>
          </span>

          <h1 className="text-4xl sm:text-6xl lg:text-[64px] font-bold tracking-[-0.035em] text-[#1d1d1f] leading-[1.06] mb-6">
            {copy.heroTitle}{' '}
            <span className="bg-gradient-to-r from-[#0071e3] to-[#00a2ff] bg-clip-text text-transparent">
              {copy.heroAccent}
            </span>
          </h1>

          <p className="text-base sm:text-xl text-[#6e6e73] leading-relaxed max-w-4xl mx-auto">
            {copy.heroSub}
          </p>
        </motion.div>

        {/* FOUNDER BIO & EXECUTIVE PORTRAIT SPOTLIGHT (Boris Brygin) */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-[40px] bg-gradient-to-br from-[#f5f5f7] via-white to-[#eef4fc] p-6 sm:p-10 lg:p-14 xl:p-16 border border-black/[0.07] shadow-[0_28px_80px_rgba(0,0,0,0.06)] overflow-hidden"
        >
          {/* Ambient Apple-style sapphire & gold soft glow */}
          <div className="pointer-events-none absolute -top-36 -left-36 w-96 h-96 rounded-full bg-[#0071e3]/[0.07] blur-3xl" />
          <div className="pointer-events-none absolute -bottom-36 -right-36 w-96 h-96 rounded-full bg-[#d4af37]/[0.08] blur-3xl" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Clean Portrait on Apple Studio Filter (No top menu, refined bottom nameplate) */}
            <div className="lg:col-span-5 flex flex-col">
              <div className="relative group rounded-[32px] overflow-hidden bg-[#0e1726] border border-black/[0.08] shadow-[0_24px_60px_rgba(0,40,95,0.18)] aspect-[4/5] w-full max-w-[520px] mx-auto">
                {/* Founder Portrait Image permanently on Apple Studio Filter */}
                <img
                  src="/assets/aistudio/Gemini_Generated_Image_vhds4cvhds4cvhds_3072b664.jpg"
                  alt="Boris Brygin — Founder of BryTech"
                  className="w-full h-full object-cover object-[center_18%] transition-transform duration-700 group-hover:scale-[1.02] contrast-[1.06] saturate-[0.90] brightness-[1.01]"
                />

                {/* Subtle Apple Studio Vignette & Editorial Lower-Third Lighting */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080f1a]/85 via-[#0b1526]/15 to-transparent" />

                {/* Refined Executive Nameplate — Only Name & Title */}
                <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-[#0b111a]/75 backdrop-blur-2xl border border-white/[0.14] px-6 py-5 text-white shadow-[0_16px_40px_rgba(0,0,0,0.35)]">
                  <div className="flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0071e3]" />
                        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
                          {bio.founderTitle}
                        </span>
                      </div>
                      <div className="text-xl sm:text-2xl font-bold tracking-[-0.02em] text-white leading-tight">
                        {bio.founderName}
                      </div>
                    </div>

                    <BryTechLogo
                      theme="dark-surface"
                      size="sm"
                      showWordmark={false}
                      className="opacity-95"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Boris Brygin Bio & Executive Story */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#0071e3]">
                  {bio.kicker}
                </div>
                <div className="text-xs sm:text-sm text-[#6e6e73] font-medium">
                  {bio.roleBadge}
                </div>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-[-0.03em] text-[#1d1d1f] leading-[1.1]">
                {bio.greeting}
              </h2>

              {/* Main 3 Bio Paragraphs */}
              <div className="space-y-4 text-base sm:text-lg text-[#424245] leading-relaxed">
                <p className="font-medium text-[#1d1d1f]">{bio.paragraph1}</p>
                <p>{bio.paragraph2}</p>
                <p>{bio.paragraph3}</p>
              </div>

              {/* Editorial Pull-Quote Callout */}
              <div className="rounded-2xl bg-white/90 border border-[#0071e3]/15 p-5 sm:p-6 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#0071e3]/10 text-[#0071e3] flex items-center justify-center shrink-0 mt-0.5">
                  <Quote className="w-5 h-5" />
                </div>
                <div className="space-y-1.5">
                  <p className="text-sm sm:text-base font-semibold text-[#1d1d1f] italic leading-snug">
                    “{bio.quoteHighlight}”
                  </p>
                  <div className="text-xs font-semibold text-[#6e6e73]">
                    — {bio.founderName}, {bio.founderTitle}
                  </div>
                </div>
              </div>

              {/* 3 Executive Metrics Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
                {bio.stats.map((st, i) => {
                  const StatIcon = i === 0 ? Award : i === 1 ? Workflow : Briefcase;
                  return (
                    <div
                      key={st.label}
                      className="rounded-2xl bg-white p-4 border border-black/[0.06] shadow-xs flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xl sm:text-2xl font-bold text-[#0071e3] tracking-tight">
                          {st.value}
                        </span>
                        <StatIcon className="w-4 h-4 text-[#86868b]" />
                      </div>
                      <span className="text-xs font-medium text-[#6e6e73] leading-snug">
                        {st.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Founder Direct CTAs */}
              <div className="pt-3 flex flex-wrap items-center gap-3.5">
                <button
                  type="button"
                  onClick={() => onSelectPage('contact')}
                  className="px-7 py-3.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-sm font-semibold inline-flex items-center gap-2 transition-all cursor-pointer shadow-[0_10px_25px_rgba(0,113,227,0.25)]"
                >
                  <span>{bio.ctaConsult}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onSelectPage('pricing')}
                  className="px-7 py-3.5 rounded-full bg-white hover:bg-[#ebebf0] text-[#1d1d1f] text-sm font-semibold border border-black/[0.08] transition-colors cursor-pointer"
                >
                  {bio.ctaConfigure}
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Vision & Unified System Showcase Card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="rounded-[36px] bg-[#f5f5f7] p-7 sm:p-12 lg:p-16 border border-black/[0.06] grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
        >
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0071e3]">
              <Layers className="w-4 h-4" />
              <span>Custom Business Operating System</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#1d1d1f] leading-tight">
              {copy.visionTitle}
            </h2>
            <p className="text-sm sm:text-base text-[#424245] leading-relaxed">
              {copy.visionParagraph1}
            </p>
            <p className="text-sm sm:text-base text-[#6e6e73] leading-relaxed">
              {copy.visionParagraph2}
            </p>

            <div className="pt-4 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => onSelectPage('pricing')}
                className="px-6 py-3.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-sm font-semibold inline-flex items-center gap-2 transition-all cursor-pointer shadow-sm"
              >
                <span>{copy.ctaPrimary}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={onOpenPortal}
                className="px-6 py-3.5 rounded-full bg-white hover:bg-[#ebebf0] text-[#1d1d1f] text-sm font-semibold border border-black/[0.08] transition-colors cursor-pointer"
              >
                {t.nav.clientArea}
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <BryTechVisualArtwork variant="corridor" />
          </div>
        </motion.div>

        {/* 3 Core Pillars: Unification, Cost Reduction, Revenue Velocity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
          {copy.pillars.map((pillar, idx) => {
            const Icon = idx === 0 ? Cpu : idx === 1 ? TrendingDown : TrendingUp;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className="rounded-[32px] bg-white p-8 sm:p-10 border border-black/[0.07] shadow-[0_16px_45px_rgba(0,0,0,0.04)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-6">
                    <span className="text-xs font-semibold text-[#6e6e73]">
                      {pillar.tag}
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-[#0071e3]/10 text-[#0071e3] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="text-3xl sm:text-4xl font-bold text-[#0071e3] tracking-tight mb-3">
                    {pillar.metric}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-[#1d1d1f] tracking-tight mb-3">
                    {pillar.title}
                  </h3>

                  <p className="text-sm text-[#6e6e73] leading-relaxed mb-6">
                    {pillar.desc}
                  </p>
                </div>

                <div className="space-y-2.5 pt-5 border-t border-black/[0.06]">
                  {pillar.bullets.map((b) => (
                    <div key={b} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#1d1d1f]">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="font-medium">{b}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* 4-Step Engineering Formula */}
        <div className="rounded-[36px] bg-[#1d1d1f] text-white p-8 sm:p-14 lg:p-16">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 text-[#15BCDF] text-xs font-semibold mb-4">
              <Zap className="w-3.5 h-3.5" />
              <span>Custom System Architecture Lifecycle</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">
              {copy.formulaTitle}
            </h2>
            <p className="text-sm sm:text-base text-white/70">{copy.formulaSub}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {copy.formulaSteps.map((st, idx) => (
              <motion.div
                key={st.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="rounded-3xl bg-white/[0.06] border border-white/10 p-6 sm:p-7 flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-bold text-[#d4af37] block mb-3">
                    STEP {st.step}
                  </span>
                  <h3 className="text-lg font-bold text-white mb-2.5">{st.title}</h3>
                  <p className="text-xs sm:text-sm text-white/65 leading-relaxed">
                    {st.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-emerald-400 font-semibold">
                  <span>100% Custom Scoped</span>
                  <ShieldCheck className="w-4 h-4" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Sales CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-[36px] bg-gradient-to-r from-[#0071e3] to-[#005bb8] text-white p-8 sm:p-14 text-center shadow-[0_24px_60px_rgba(0,113,227,0.25)]"
        >
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight max-w-3xl mx-auto mb-4">
            {copy.ctaTitle}
          </h2>
          <p className="text-sm sm:text-lg text-white/85 max-w-2xl mx-auto mb-8">
            {copy.ctaSub}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => onSelectPage('pricing')}
              className="px-8 py-4 rounded-full bg-white text-[#1d1d1f] hover:bg-[#f5f5f7] font-bold text-sm sm:text-base inline-flex items-center gap-2 transition-colors cursor-pointer shadow-lg"
            >
              <span>{copy.ctaPrimary}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onSelectPage('contact')}
              className="px-8 py-4 rounded-full bg-black/25 hover:bg-black/35 text-white border border-white/25 font-semibold text-sm sm:text-base transition-colors cursor-pointer"
            >
              {copy.ctaSecondary}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
