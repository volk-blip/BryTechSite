import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Language, TRANSLATIONS } from '../i18n/translations';
import { ALTEGIO_PLATFORM_DATA } from '../data/altegioPlatformData';
import {
  Check,
  Sparkles,
  ArrowRight,
  HelpCircle,
  ShieldCheck,
  Layers,
  Cpu,
  Sliders,
  MessageSquare,
  CheckCircle2,
  Building2,
  Workflow,
  Code2,
} from 'lucide-react';

interface AltegioPricingSectionProps {
  lang: Language;
  onSelectPackage: (packageName: string) => void;
  onOpenVisitorChatWithBlueprint?: (blueprintSummary: string) => void;
}

interface CustomModuleOption {
  id: string;
  title: string;
  desc: string;
  replacesTool: string;
  estMonthlySaasSaved: number;
  defaultIncluded?: boolean;
}

const BUILDER_I18N: Record<
  Language,
  {
    badge: string;
    builderTitle: string;
    builderSubtitle: string;
    step1Title: string;
    step2Title: string;
    step3Title: string;
    scales: {
      id: 'single' | 'multi' | 'enterprise';
      title: string;
      subtitle: string;
      timeline: string;
      architectureTag: string;
    }[];
    modules: CustomModuleOption[];
    deliveryModels: {
      id: 'turnkey' | 'phased' | 'partner';
      title: string;
      desc: string;
      badge: string;
    }[];
    summaryTitle: string;
    summarySubtitle: string;
    selectedScaleLabel: string;
    selectedModulesLabel: string;
    deliveryModelLabel: string;
    estTimelineLabel: string;
    replacedSaasLabel: string;
    annualSaasSavedLabel: string;
    tailoredModelLabel: string;
    tailoredModelValue: string;
    sendToChatBtn: string;
    requestProposalBtn: string;
    visionBannerTitle: string;
    visionBannerDesc: string;
    blueprintsHeading: string;
    blueprintsSub: string;
  }
> = {
  en: {
    badge: 'Tailored System Architecture · Not Fixed Boxed Products',
    builderTitle: 'Configure Your Custom Unified Business System',
    builderSubtitle:
      'Every company operates differently. Instead of forcing your team into rigid fixed-price templates or charging per-user SaaS fees, we engineer a single unified system around your exact workflows.',
    step1Title: '1. Select Your Operational Scale',
    step2Title: '2. Choose the Workflows to Unify into One System',
    step3Title: '3. Select Your Implementation & Ownership Model',
    scales: [
      {
        id: 'single',
        title: 'Single-Location / Boutique OS',
        subtitle: '1 location · Up to 20 staff · Unified front & back office',
        timeline: '3 – 4 Weeks Delivery',
        architectureTag: 'Custom Core Architecture',
      },
      {
        id: 'multi',
        title: 'Multi-Branch Network OS',
        subtitle: '2 – 10 locations · Centralized CRM, inventory, bots & P&L',
        timeline: '4 – 7 Weeks Delivery',
        architectureTag: 'Multi-Branch Unified Cloud',
      },
      {
        id: 'enterprise',
        title: 'Enterprise & Franchise Ecosystem',
        subtitle: '10+ branches or custom B2B/B2C workflows & ERP integrations',
        timeline: '6 – 10 Weeks Delivery',
        architectureTag: 'Dedicated Custom Cluster',
      },
    ],
    modules: [
      {
        id: 'crm',
        title: 'Custom CRM & Client Lifecycle Core',
        desc: 'Tailored client cards, custom pipelines, visit history, loyalty rules & automated retention.',
        replacesTool: 'Replaces HubSpot / Pipedrive',
        estMonthlySaasSaved: 240,
        defaultIncluded: true,
      },
      {
        id: 'booking',
        title: 'Smart Booking, Scheduling & Resource Engine',
        desc: '24/7 online booking, multi-specialist calendar, room/equipment allocation & deposits.',
        replacesTool: 'Replaces Calendly / Boxed Booking SaaS',
        estMonthlySaasSaved: 190,
        defaultIncluded: true,
      },
      {
        id: 'bots',
        title: '2-Way WhatsApp & Telegram Automation Bots',
        desc: 'Automated appointment confirmations, rescheduling, lead qualification & 5★ review collection.',
        replacesTool: 'Replaces ManyChat / WATI / Twilio',
        estMonthlySaasSaved: 210,
        defaultIncluded: true,
      },
      {
        id: 'finance',
        title: 'POS, Invoicing, Split Payments & Live P&L',
        desc: 'Integrated checkout, fiscal receipts, multi-currency acquiring & real-time profitability.',
        replacesTool: 'Replaces Fragmented Billing Tools',
        estMonthlySaasSaved: 160,
        defaultIncluded: true,
      },
      {
        id: 'portal',
        title: 'Custom Web Platform & Client Self-Service Area',
        desc: 'High-converting brand website with personal client cabinet, documents, notes & live chat.',
        replacesTool: 'Replaces Webflow + Portal Plugins',
        estMonthlySaasSaved: 150,
      },
      {
        id: 'inventory',
        title: 'Warehouse, Inventory & Auto-Consumption',
        desc: 'Automatic material write-offs per service, low-stock alerts, supplier orders & barcode scan.',
        replacesTool: 'Replaces Standalone Inventory SaaS',
        estMonthlySaasSaved: 170,
      },
      {
        id: 'payroll',
        title: 'Staff KPI, Shifts & Automated Commissions',
        desc: 'Custom % commission rules, tiered bonuses, shift rosters & instant salary calculation.',
        replacesTool: 'Replaces Manual Excel & HR Tools',
        estMonthlySaasSaved: 140,
      },
      {
        id: 'erp',
        title: 'Legacy Data Migration & Custom API Bridges',
        desc: 'Zero-downtime import of your existing client base + custom webhooks to accounting/ERP.',
        replacesTool: 'Replaces Zapier / Make Subscriptions',
        estMonthlySaasSaved: 180,
      },
    ],
    deliveryModels: [
      {
        id: 'turnkey',
        title: 'Turnkey Custom Build (100% Ownership)',
        desc: 'Scoped milestone investment. You own 100% of the custom platform and database with $0 per-user monthly fees.',
        badge: 'Most Popular · Best ROI',
      },
      {
        id: 'phased',
        title: 'Phased Modular Rollout',
        desc: 'Launch your core operational hub first in 3 weeks, then add custom departments step-by-step as you scale.',
        badge: 'Flexible Cashflow',
      },
      {
        id: 'partner',
        title: 'Dedicated Engineering Partnership',
        desc: 'Continuous custom development, dedicated system architect, 24/7 SLA monitoring, and ongoing feature expansion.',
        badge: 'For High-Growth Networks',
      },
    ],
    summaryTitle: 'Your Custom System Blueprint',
    summarySubtitle: 'Live architectural scope tailored to your selections',
    selectedScaleLabel: 'System Topology',
    selectedModulesLabel: 'Unified Modules Selected',
    deliveryModelLabel: 'Partnership Model',
    estTimelineLabel: 'Estimated Launch Window',
    replacedSaasLabel: 'Disconnected SaaS Tools Replaced',
    annualSaasSavedLabel: 'Est. Annual SaaS Fees Eliminated',
    tailoredModelLabel: 'Pricing Structure',
    tailoredModelValue: 'Tailored Milestone Quote · $0 Per-Seat Tax',
    sendToChatBtn: 'Discuss This Blueprint with Live Architect',
    requestProposalBtn: 'Request Tailored Architecture & Quote',
    visionBannerTitle: 'Why We Don’t Sell Rigid Fixed-Price Boxes',
    visionBannerDesc:
      'Off-the-shelf software forces you to adapt your business to its limitations and charges you more every time you hire a new employee or open a branch. We design your system around your exact processes — once built, it belongs to your business.',
    blueprintsHeading: 'Reference Architecture Starting Points',
    blueprintsSub:
      'Use these reference architectures as a baseline — every module, workflow, and integration is customized to your operations.',
  },
  ru: {
    badge: 'Индивидуальная Архитектура · Не Шаблонные Коробочные Тарифы',
    builderTitle: 'Соберите Вашу Единую Кастомную Систему Бизнеса',
    builderSubtitle:
      'Каждый бизнес уникален. Вместо того чтобы загонять ваши процессы в жесткие шаблоны с абонплатой за каждого сотрудника, мы проектируем единую систему на 100% под ваши задачи.',
    step1Title: '1. Выберите Масштаб Вашего Бизнеса',
    step2Title: '2. Выберите Процессы для Объединения в Одну Систему',
    step3Title: '3. Выберите Формат Внедрения и Владения',
    scales: [
      {
        id: 'single',
        title: 'Единая Система для Одной Локации / Студии',
        subtitle: '1 филиал · До 20 сотрудников · Полная автоматизация процессов',
        timeline: 'Срок запуска: 3 – 4 недели',
        architectureTag: 'Кастомное Ядро Бизнеса',
      },
      {
        id: 'multi',
        title: 'Сетевая ОС для Нескольких Филиалов',
        subtitle: '2 – 10 локаций · Единая база клиентов, склад, боты и финансы',
        timeline: 'Срок запуска: 4 – 7 недель',
        architectureTag: 'Единое Облако Сети',
      },
      {
        id: 'enterprise',
        title: 'Корпоративная / Франчайзинговая Экосистема',
        subtitle: '10+ филиалов, нестандартные B2B/B2C процессы и глубокие интеграции',
        timeline: 'Срок запуска: 6 – 10 недель',
        architectureTag: 'Выделенный Кластер',
      },
    ],
    modules: [
      {
        id: 'crm',
        title: 'Кастомная CRM и База Клиентов',
        desc: 'Индивидуальные карточки клиентов, воронки продаж, история визитов, бонусы и удержание.',
        replacesTool: 'Заменяет AmoCRM / Bitrix / HubSpot',
        estMonthlySaasSaved: 240,
        defaultIncluded: true,
      },
      {
        id: 'booking',
        title: 'Умная Онлайн-Запись и Расписание Ресурсов',
        desc: 'Запись 24/7, календарь мастеров/врачей, распределение кабинетов и онлайн-предоплата.',
        replacesTool: 'Заменяет коробочные сервисы записи',
        estMonthlySaasSaved: 190,
        defaultIncluded: true,
      },
      {
        id: 'bots',
        title: 'Двусторонние Боты WhatsApp и Telegram',
        desc: 'Авто-подтверждение визитов, перенос записи, квалификация лидов и сбор отзывов.',
        replacesTool: 'Заменяет Wazzup / ManyChat / Salebot',
        estMonthlySaasSaved: 210,
        defaultIncluded: true,
      },
      {
        id: 'finance',
        title: 'Касса, Эквайринг, Счета и Управленческий P&L',
        desc: 'Прием оплат, фискализация, мультивалютность и прозрачная аналитика чистой прибыли.',
        replacesTool: 'Заменяет разрозненные сервисы учета',
        estMonthlySaasSaved: 160,
        defaultIncluded: true,
      },
      {
        id: 'portal',
        title: 'Кастомный Сайт и Личный Кабинет Клиента',
        desc: 'Премиальный веб-портал с личным кабинетом клиента, историей заказов, заметками и чатом.',
        replacesTool: 'Заменяет конструкторы сайтов и плагины',
        estMonthlySaasSaved: 150,
      },
      {
        id: 'inventory',
        title: 'Складской Учет и Авто-Списание Материалов',
        desc: 'Автоматическая калькуляция расходников по услугам, контроль остатков и заказы поставщикам.',
        replacesTool: 'Заменяет отдельные складские программы',
        estMonthlySaasSaved: 170,
      },
      {
        id: 'payroll',
        title: 'KPI Персонала, Графики Смен и Расчет Зарплат',
        desc: 'Гибкие проценты, бонусные сетки, учет рабочего времени и автоматический расчет ведомостей.',
        replacesTool: 'Заменяет ручные таблицы Excel',
        estMonthlySaasSaved: 140,
      },
      {
        id: 'erp',
        title: 'Миграция Базы Данных и Кастомные API-Шлюзы',
        desc: 'Бесшовный перенос вашей текущей базы + прямая интеграция с телефонией, ERP и бухгалтерией.',
        replacesTool: 'Заменяет платные коннекторы Zapier/Make',
        estMonthlySaasSaved: 180,
      },
    ],
    deliveryModels: [
      {
        id: 'turnkey',
        title: 'Разработка «Под Ключ» (100% Ваша Собственность)',
        desc: 'Поэтапная оплата за результат. Вы получаете полный исходный код и базу данных без абонплаты за сотрудников.',
        badge: 'Выбор 80% клиентов · Лучший ROI',
      },
      {
        id: 'phased',
        title: 'Модульный Поэтапный Запуск',
        desc: 'Запускаем базовое ядро за 3 недели, а затем пошагово подключаем новые отделы и филиалы по мере роста.',
        badge: 'Гибкий бюджет',
      },
      {
        id: 'partner',
        title: 'Выделенное Техническое Партнерство',
        desc: 'Непрерывное развитие системы, личный системный архитектор, SLA 24/7 и постоянное внедрение новых функций.',
        badge: 'Для растущих сетей',
      },
    ],
    summaryTitle: 'Архитектура Вашей Системы',
    summarySubtitle: 'Индивидуальная спецификация на основе вашего выбора',
    selectedScaleLabel: 'Масштаб системы',
    selectedModulesLabel: 'Объединено модулей в 1 систему',
    deliveryModelLabel: 'Модель внедрения',
    estTimelineLabel: 'Ориентировочный срок запуска',
    replacedSaasLabel: 'Заменяет сторонних сервисов',
    annualSaasSavedLabel: 'Экономия на подписках SaaS в год',
    tailoredModelLabel: 'Формат стоимости',
    tailoredModelValue: 'Индивидуальная смета · $0 за сотрудников',
    sendToChatBtn: 'Обсудить эту конфигурацию в Живом Чате',
    requestProposalBtn: 'Получить расчет стоимости и архитектуру',
    visionBannerTitle: 'Почему мы отказались от шаблонных фиксированных тарифов',
    visionBannerDesc:
      'Коробочные сервисы заставляют вас подстраивать бизнес под чужие ограничения и платить больше за каждого нового сотрудника или филиал. Мы создаем систему вокруг ваших реальных бизнес-процессов — один раз и навсегда.',
    blueprintsHeading: 'Базовые Архитектурные Концепции',
    blueprintsSub:
      'Используйте эти архитектуры как отправную точку — каждый модуль и бизнес-процесс проектируется индивидуально под вас.',
  },
  uk: {
    badge: 'Індивідуальна Архітектура · Не Шаблонні Коробкові Тарифи',
    builderTitle: 'Зберіть Вашу Єдину Кастомну Систему Бізнесу',
    builderSubtitle:
      'Кожен бізнес працює по-своєму. Замість того щоб заганяти вашу команду в шаблонні рамки з абонплатою за кожного співробітника, ми проєктуємо єдину систему на 100% під ваші процеси.',
    step1Title: '1. Оберіть Масштаб Вашого Бізнесу',
    step2Title: '2. Оберіть Процеси для Об’єднання в Одну Систему',
    step3Title: '3. Оберіть Формат Впровадження та Володіння',
    scales: [
      {
        id: 'single',
        title: 'Єдина Система для Однієї Локації / Студії',
        subtitle: '1 локація · До 20 співробітників · Повна автоматизація процесів',
        timeline: 'Термін запуску: 3 – 4 тижні',
        architectureTag: 'Кастомне Ядро Бізнесу',
      },
      {
        id: 'multi',
        title: 'Мережева ОС для Декількох Філій',
        subtitle: '2 – 10 локацій · Єдина база клієнтів, склад, боти та фінанси',
        timeline: 'Термін запуску: 4 – 7 тижнів',
        architectureTag: 'Єдина Хмара Мережі',
      },
      {
        id: 'enterprise',
        title: 'Корпоративна / Франчайзингова Екосистема',
        subtitle: '10+ філій, нестандартні B2B/B2C процеси та глибокі інтеграції',
        timeline: 'Термін запуску: 6 – 10 тижнів',
        architectureTag: 'Виділений Кластер',
      },
    ],
    modules: [
      {
        id: 'crm',
        title: 'Кастомна CRM та База Клієнтів',
        desc: 'Індивідуальні картки клієнтів, воронки продажів, історія візитів, лояльність та утримання.',
        replacesTool: 'Замінює коробкові CRM',
        estMonthlySaasSaved: 240,
        defaultIncluded: true,
      },
      {
        id: 'booking',
        title: 'Розумний Онлайн-Запис та Розклад Ресурсів',
        desc: 'Запис 24/7, календар фахівців, розподіл кабінетів та онлайн-передоплата.',
        replacesTool: 'Замінює сторонні сервіси запису',
        estMonthlySaasSaved: 190,
        defaultIncluded: true,
      },
      {
        id: 'bots',
        title: 'Двосторонні Боти WhatsApp та Telegram',
        desc: 'Авто-підтвердження візитів, перенесення запису, кваліфікація лідів та збір відгуків.',
        replacesTool: 'Замінює ManyChat / SendPulse',
        estMonthlySaasSaved: 210,
        defaultIncluded: true,
      },
      {
        id: 'finance',
        title: 'Каса, Еквайринг, Рахунки та Управлінський P&L',
        desc: 'Прийом оплат, ПРРО, мультивалютність та прозора аналітика чистого прибутку.',
        replacesTool: 'Замінює розрізнені фінансові сервіси',
        estMonthlySaasSaved: 160,
        defaultIncluded: true,
      },
      {
        id: 'portal',
        title: 'Кастомний Сайт та Особистий Кабінет Клієнта',
        desc: 'Преміальний веб-портал із кабінетом клієнта, документами, нотатками та живим чатом.',
        replacesTool: 'Замінює конструктори сайтів',
        estMonthlySaasSaved: 150,
      },
      {
        id: 'inventory',
        title: 'Складський Облік та Авто-Списання Матеріалів',
        desc: 'Автоматична калькуляція витратних матеріалів, контроль залишків та замовлення постачальникам.',
        replacesTool: 'Замінює окремі складські програми',
        estMonthlySaasSaved: 170,
      },
      {
        id: 'payroll',
        title: 'KPI Персоналу, Графіки Змін та Розрахунок Зарплат',
        desc: 'Гнучкі відсотки, бонусні сітки, облік робочого часу та автоматичний розрахунок відомостей.',
        replacesTool: 'Замінює ручні таблиці Excel',
        estMonthlySaasSaved: 140,
      },
      {
        id: 'erp',
        title: 'Міграція Бази Даних та Кастомні API-Шлюзи',
        desc: 'Безшовне перенесення вашої бази + пряма інтеграція з телефонією, Новою Поштою та ERP.',
        replacesTool: 'Замінює платні конектори Zapier/Make',
        estMonthlySaasSaved: 180,
      },
    ],
    deliveryModels: [
      {
        id: 'turnkey',
        title: 'Розробка «Під Ключ» (100% Ваша Власність)',
        desc: 'Поетапна оплата за результат. Ви отримуєте повний вихідний код та базу даних без абонплати за співробітників.',
        badge: 'Найкращий ROI',
      },
      {
        id: 'phased',
        title: 'Модульний Поетапний Запуск',
        desc: 'Запускаємо базове ядро за 3 тижні, а потім покроково підключаємо нові відділи та філії.',
        badge: 'Гнучкий бюджет',
      },
      {
        id: 'partner',
        title: 'Виділене Технічне Партнерство',
        desc: 'Безперервний розвиток системи, особистий системний архітектор, SLA 24/7 та постійне масштабування.',
        badge: 'Для мереж',
      },
    ],
    summaryTitle: 'Архітектура Вашої Системи',
    summarySubtitle: 'Індивідуальна специфікація на основі вашого вибору',
    selectedScaleLabel: 'Масштаб системи',
    selectedModulesLabel: 'Об’єднано модулів в 1 систему',
    deliveryModelLabel: 'Модель впровадження',
    estTimelineLabel: 'Орієнтовний термін запуску',
    replacedSaasLabel: 'Замінює сторонніх сервісів',
    annualSaasSavedLabel: 'Економія на підписках SaaS на рік',
    tailoredModelLabel: 'Формат вартості',
    tailoredModelValue: 'Індивідуальний кошторис · $0 за співробітників',
    sendToChatBtn: 'Обговорити цю конфігурацію в Живому Чаті',
    requestProposalBtn: 'Отримати розрахунок вартості та архітектуру',
    visionBannerTitle: 'Чому ми відмовилися від шаблонних фіксованих тарифів',
    visionBannerDesc:
      'Коробкові сервіси змушують вас підлаштовувати бізнес під чужі обмеження і платити більше за кожного нового працівника. Ми створюємо систему навколо ваших реальних процесів — один раз і назавжди.',
    blueprintsHeading: 'Базові Архітектурні Концепції',
    blueprintsSub:
      'Використовуйте ці архітектури як відправну точку — кожен модуль проєктується індивідуально під вас.',
  },
  he: {
    badge: 'ארכיטקטורה מותאמת אישית · לא חבילות מדף סגורות',
    builderTitle: 'אפיין את מערכת ההפעלה העסקית המאוחדת שלך',
    builderSubtitle:
      'כל עסק עובד אחרת. במקום לאלץ את הצוות שלך להתאים לתבניות קבועות או לשלם דמי מנוי לכל עובד, אנו מתכננים מערכת אחודה אחת סביב תהליכי העבודה המדויקים שלך.',
    step1Title: '1. בחר את היקף הפעילות של העסק',
    step2Title: '2. בחר את תהליכי העבודה לאיחוד למערכת אחת',
    step3Title: '3. בחר את מודל ההטמעה והבעלות',
    scales: [
      {
        id: 'single',
        title: 'מערכת ליבה לסניף יחיד / בוטיק',
        subtitle: 'מיקום אחד · עד 20 אנשי צוות · אוטומציה מלאה מקצה לקצה',
        timeline: 'זמן השקה: 3 – 4 שבועות',
        architectureTag: 'ליבה מותאמת אישית',
      },
      {
        id: 'multi',
        title: 'מערכת הפעלה לרשת מרובת סניפים',
        subtitle: '2 – 10 סניפים · מאגר לקוחות מרכזי, מלאי, בוטים ודוחות רווח והפסד',
        timeline: 'זמן השקה: 4 – 7 שבועות',
        architectureTag: 'ענן רשתי מאוחד',
      },
      {
        id: 'enterprise',
        title: 'אקוסיסטם ארגוני / זכיינות',
        subtitle: '10+ סניפים או תהליכי B2B/B2C מורכבים ואינטגרציות ERP',
        timeline: 'זמן השקה: 6 – 10 שבועות',
        architectureTag: 'אשכול ייעודי מותאם',
      },
    ],
    modules: [
      {
        id: 'crm',
        title: 'מערכת CRM מותאמת אישית וניהול לקוחות',
        desc: 'תיקי לקוח מותאמים, משפכי מכירות, היסטוריית טיפולים, מועדון לקוחות ושימור אוטומטי.',
        replacesTool: 'מחליף מערכות CRM גנריות',
        estMonthlySaasSaved: 240,
        defaultIncluded: true,
      },
      {
        id: 'booking',
        title: 'מנוע זימון תורים חכם וניהול משאבים',
        desc: 'הזמנת תורים 24/7, יומן צוות וחדרים, גביית מקדמות אונליין ומניעת כפילויות.',
        replacesTool: 'מחליף מערכות תורים חיצוניות',
        estMonthlySaasSaved: 190,
        defaultIncluded: true,
      },
      {
        id: 'bots',
        title: 'בוטים דו-כיווניים לוואטסאפ וטלגרם',
        desc: 'אישור תורים אוטומטי, שינוי תור בשיחה, סינון לידים ואיסוף ביקורות 5 כוכבים.',
        replacesTool: 'מחליף ManyChat / WATI',
        estMonthlySaasSaved: 210,
        defaultIncluded: true,
      },
      {
        id: 'finance',
        title: 'קופה, סליקה, חשבוניות ודוח רווח והפסד חי',
        desc: 'סליקת אשראי וביט, הפקת קבלות אוטומטית ובקרה פיננסית בזמן אמת.',
        replacesTool: 'מחליף כלי גבייה מפוצלים',
        estMonthlySaasSaved: 160,
        defaultIncluded: true,
      },
      {
        id: 'portal',
        title: 'אתר מותג ופורטל לקוחות אישי',
        desc: 'אתר יוקרתי עם אזור אישי ללקוח, צפייה במסמכים, הערות וצ׳אט ישיר.',
        replacesTool: 'מחליף בוני אתרים ותוספים',
        estMonthlySaasSaved: 150,
      },
      {
        id: 'inventory',
        title: 'ניהול מלאי והורדת חומרים אוטומטית',
        desc: 'ניכוי חומרים אוטומטי בכל טיפול, התראות מלאי נמוך והזמנות ספקים.',
        replacesTool: 'מחליף תוכנות מלאי נפרדות',
        estMonthlySaasSaved: 170,
      },
      {
        id: 'payroll',
        title: 'מדדי צוות, משמרות וחישוב עמלות אוטומטי',
        desc: 'חוקי עמלות מותאמים אישית, בונוסים מדורגים וחישוב שכר אוטומטי.',
        replacesTool: 'מחליף אקסלים ידניים',
        estMonthlySaasSaved: 140,
      },
      {
        id: 'erp',
        title: 'הסבת נתונים וגשרים למערכות ERP / API',
        desc: 'ייבוא מלא של מאגר הלקוחות הקיים וחיבור ישיר למערכות הנהלת חשבונות וטלפוניה.',
        replacesTool: 'מחליף מנויי Zapier / Make',
        estMonthlySaasSaved: 180,
      },
    ],
    deliveryModels: [
      {
        id: 'turnkey',
        title: 'פיתוח מערכת "עד המפתח" (100% בעלות שלך)',
        desc: 'תמחור לפי אבני דרך. אתה הבעלים המלא של הקוד ומסד הנתונים ללא תשלום חודשי לכל עובד.',
        badge: 'הפופולרי ביותר · החזר השקעה מרבי',
      },
      {
        id: 'phased',
        title: 'השקה מודולרית בשלבים',
        desc: 'משיקים את ליבת המערכת תוך 3 שבועות, ומוסיפים מודולים ומחלקות בהדרגה לפי קצב הצמיחה.',
        badge: 'תזרים גמיש',
      },
      {
        id: 'partner',
        title: 'שותפות הנדסית ייעודית',
        desc: 'פיתוח מתמשך, אדריכל מערכת אישי, ניטור SLA 24/7 והרחבת יכולות קבועה.',
        badge: 'לרשתות בצמיחה',
      },
    ],
    summaryTitle: 'מפרט המערכת המותאמת שלך',
    summarySubtitle: 'ארכיטקטורה חיה המותאמת לבחירות שלך',
    selectedScaleLabel: 'היקף המערכת',
    selectedModulesLabel: 'מודולים מאוחדים שנבחרו',
    deliveryModelLabel: 'מודל הטמעה',
    estTimelineLabel: 'חלון השקה משוער',
    replacedSaasLabel: 'מחליף מערכות חיצוניות',
    annualSaasSavedLabel: 'חיסכון שנתי משוער בדמי מנוי SaaS',
    tailoredModelLabel: 'מודל תמחור',
    tailoredModelValue: 'הצעה מותאמת אישית · $0 מס לכל עובד',
    sendToChatBtn: 'דון במפרט זה בצ׳אט חי עם אדריכל המערכת',
    requestProposalBtn: 'בקש הצעת מחיר ואפיון מערכת',
    visionBannerTitle: 'מדוע איננו מוכרים חבילות מדף סגורות במחיר קבוע',
    visionBannerDesc:
      'תוכנות מדף מאלצות אותך להתאים את העסק למגבלות שלהן וגובות ממך יותר בכל פעם שאתה מגייס עובד או פותח סניף. אנו מתכננים את המערכת סביב התהליכים שלך — והיא שייכת לעסק שלך.',
    blueprintsHeading: 'ארכיטקטורות ייחוס מומלצות',
    blueprintsSub:
      'השתמש בארכיטקטורות אלו כנקודת פתיחה — כל מודול ותהליך עבודה מותאם אישית לפעילות שלך.',
  },
};

export const AltegioPricingSection: React.FC<AltegioPricingSectionProps> = ({
  lang,
  onSelectPackage,
  onOpenVisitorChatWithBlueprint,
}) => {
  const t = TRANSLATIONS[lang];
  const p = ALTEGIO_PLATFORM_DATA[lang].pricingPage;
  const b = BUILDER_I18N[lang];

  const [selectedScaleId, setSelectedScaleId] = useState<'single' | 'multi' | 'enterprise'>('multi');
  const [selectedModuleIds, setSelectedModuleIds] = useState<string[]>([
    'crm',
    'booking',
    'bots',
    'finance',
    'portal',
  ]);
  const [selectedDeliveryId, setSelectedDeliveryId] = useState<'turnkey' | 'phased' | 'partner'>(
    'turnkey'
  );
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const toggleModule = (id: string) => {
    setSelectedModuleIds((prev) => {
      if (prev.includes(id)) {
        if (prev.length <= 1) return prev;
        return prev.filter((item) => item !== id);
      }
      return [...prev, id];
    });
  };

  const activeScale = b.scales.find((s) => s.id === selectedScaleId) || b.scales[1];
  const activeDelivery =
    b.deliveryModels.find((d) => d.id === selectedDeliveryId) || b.deliveryModels[0];
  const activeModules = b.modules.filter((m) => selectedModuleIds.includes(m.id));

  const scaleMultiplier =
    selectedScaleId === 'single' ? 1 : selectedScaleId === 'multi' ? 2.2 : 4.2;
  const monthlySaasSaved = Math.round(
    activeModules.reduce((sum, m) => sum + m.estMonthlySaasSaved, 0) * scaleMultiplier
  );
  const annualSaasSaved = monthlySaasSaved * 12;

  const buildBlueprintSummaryString = () => {
    const modNames = activeModules.map((m) => m.title).join(', ');
    return `Custom System Blueprint: [${activeScale.title}] | Modules (${activeModules.length}): ${modNames} | Model: ${activeDelivery.title}`;
  };

  return (
    <section
      id="pricing"
      dir={t.dir}
      className="relative w-full min-h-[100svh] flex flex-col justify-center bg-[#f5f5f7] text-[#1d1d1f] py-20 sm:py-28 px-4 sm:px-8 lg:px-12 xl:px-16 border-t border-black/[0.06] overflow-hidden"
    >
      <div className="w-full max-w-[1920px] mx-auto my-auto">
        {/* Executive Vision Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1d1d1f] text-[#d4af37] text-xs font-semibold tracking-tight mb-5 shadow-sm border border-[#d4af37]/30">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>{b.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-[56px] font-bold tracking-[-0.035em] text-[#1d1d1f] leading-[1.06] mb-5">
            {b.builderTitle}
          </h2>

          <p className="text-base sm:text-lg lg:text-xl text-[#6e6e73] leading-relaxed">
            {b.builderSubtitle}
          </p>
        </motion.div>

        {/* Interactive Custom System Architecture & Scope Configurator */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start mb-20">
          {/* Left 8 Columns: 3-Step Interactive System Configurator */}
          <div className="xl:col-span-8 space-y-8">
            {/* STEP 1: Business Scale */}
            <div className="rounded-[32px] bg-white p-6 sm:p-9 border border-black/[0.06] shadow-[0_12px_36px_rgba(0,0,0,0.03)]">
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-[#0071e3] mb-4">
                <Building2 className="w-4 h-4" />
                <span>{b.step1Title}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {b.scales.map((scale) => {
                  const active = scale.id === selectedScaleId;
                  return (
                    <button
                      key={scale.id}
                      type="button"
                      onClick={() => setSelectedScaleId(scale.id)}
                      className={`text-start p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                        active
                          ? 'bg-[#1d1d1f] text-white border-[#d4af37] shadow-lg'
                          : 'bg-[#f5f5f7] text-[#1d1d1f] border-transparent hover:bg-[#ebebf0]'
                      }`}
                    >
                      <div>
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold mb-2.5 ${
                            active
                              ? 'bg-[#d4af37]/20 text-[#d4af37]'
                              : 'bg-black/[0.06] text-[#6e6e73]'
                          }`}
                        >
                          {scale.architectureTag}
                        </span>
                        <h3 className="text-base font-bold tracking-tight mb-1.5">
                          {scale.title}
                        </h3>
                        <p
                          className={`text-xs leading-relaxed ${
                            active ? 'text-white/75' : 'text-[#6e6e73]'
                          }`}
                        >
                          {scale.subtitle}
                        </p>
                      </div>
                      <div
                        className={`mt-4 pt-3 border-t text-[11px] font-semibold ${
                          active
                            ? 'border-white/15 text-emerald-400'
                            : 'border-black/[0.06] text-[#0071e3]'
                        }`}
                      >
                        {scale.timeline}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* STEP 2: Custom Modules & Workflows to Unify */}
            <div className="rounded-[32px] bg-white p-6 sm:p-9 border border-black/[0.06] shadow-[0_12px_36px_rgba(0,0,0,0.03)]">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
                <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-[#0071e3]">
                  <Workflow className="w-4 h-4" />
                  <span>{b.step2Title}</span>
                </div>
                <span className="text-xs font-semibold text-[#6e6e73]">
                  {activeModules.length} / {b.modules.length} Active
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {b.modules.map((mod) => {
                  const isSelected = selectedModuleIds.includes(mod.id);
                  return (
                    <div
                      key={mod.id}
                      onClick={() => toggleModule(mod.id)}
                      className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                        isSelected
                          ? 'bg-[#0071e3]/[0.05] border-[#0071e3] shadow-xs'
                          : 'bg-[#f5f5f7]/70 border-black/[0.05] hover:bg-[#f5f5f7]'
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          isSelected
                            ? 'bg-[#0071e3] text-white'
                            : 'bg-white border border-black/15 text-transparent'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                          <h4 className="text-sm font-bold text-[#1d1d1f]">{mod.title}</h4>
                        </div>
                        <p className="text-xs text-[#6e6e73] leading-relaxed mb-2.5">
                          {mod.desc}
                        </p>
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-semibold">
                          ✓ {mod.replacesTool}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* STEP 3: Partnership & Ownership Model */}
            <div className="rounded-[32px] bg-white p-6 sm:p-9 border border-black/[0.06] shadow-[0_12px_36px_rgba(0,0,0,0.03)]">
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-[#0071e3] mb-4">
                <Code2 className="w-4 h-4" />
                <span>{b.step3Title}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {b.deliveryModels.map((dm) => {
                  const active = dm.id === selectedDeliveryId;
                  return (
                    <button
                      key={dm.id}
                      type="button"
                      onClick={() => setSelectedDeliveryId(dm.id)}
                      className={`text-start p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                        active
                          ? 'bg-[#1d1d1f] text-white border-[#d4af37] shadow-lg'
                          : 'bg-[#f5f5f7] text-[#1d1d1f] border-transparent hover:bg-[#ebebf0]'
                      }`}
                    >
                      <div>
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold mb-2.5 ${
                            active
                              ? 'bg-[#d4af37] text-[#141416]'
                              : 'bg-[#0071e3]/10 text-[#0071e3]'
                          }`}
                        >
                          {dm.badge}
                        </span>
                        <h4 className="text-sm sm:text-base font-bold mb-1.5">{dm.title}</h4>
                        <p
                          className={`text-xs leading-relaxed ${
                            active ? 'text-white/75' : 'text-[#6e6e73]'
                          }`}
                        >
                          {dm.desc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right 4 Columns: Live Custom System Blueprint & ROI Summary */}
          <div className="xl:col-span-4 xl:sticky xl:top-24">
            <div className="rounded-[32px] bg-[#141416] text-white p-7 sm:p-9 border border-[#d4af37]/40 shadow-[0_28px_70px_rgba(0,0,0,0.22)] space-y-6">
              <div className="pb-5 border-b border-white/10">
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#d4af37] mb-1.5">
                  <Cpu className="w-4 h-4" />
                  <span>100% Custom-Engineered System</span>
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-white">
                  {b.summaryTitle}
                </h3>
                <p className="text-xs text-white/65 mt-1">{b.summarySubtitle}</p>
              </div>

              {/* Selected Configuration Summary */}
              <div className="space-y-3.5 text-xs">
                <div className="p-4 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-between gap-2">
                  <span className="text-white/65">{b.selectedScaleLabel}</span>
                  <span className="font-bold text-white text-end">{activeScale.title}</span>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.05] border border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white/65">{b.selectedModulesLabel}</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#0071e3] text-white font-bold">
                      {activeModules.length} Modules
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {activeModules.map((m) => (
                      <span
                        key={m.id}
                        className="px-2.5 py-1 rounded-lg bg-white/10 text-[11px] text-white/90 font-medium"
                      >
                        {m.title.split('&')[0].trim()}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-between gap-2">
                  <span className="text-white/65">{b.deliveryModelLabel}</span>
                  <span className="font-bold text-[#d4af37] text-end">
                    {activeDelivery.title}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-between gap-2">
                  <span className="text-white/65">{b.estTimelineLabel}</span>
                  <span className="font-bold text-emerald-400">{activeScale.timeline}</span>
                </div>
              </div>

              {/* SaaS Consolidation Impact Box */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-[#1f2937] to-[#111827] border border-[#0071e3]/40 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/75">{b.replacedSaasLabel}:</span>
                  <span className="font-bold text-white">{activeModules.length} Separate Tools</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/75">{b.annualSaasSavedLabel}:</span>
                  <span className="text-lg font-bold text-emerald-400">
                    ~${annualSaasSaved.toLocaleString()}/yr
                  </span>
                </div>
                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-white/65">{b.tailoredModelLabel}:</span>
                  <span className="font-semibold text-[#d4af37]">{b.tailoredModelValue}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-1">
                {onOpenVisitorChatWithBlueprint && (
                  <button
                    type="button"
                    onClick={() => onOpenVisitorChatWithBlueprint(buildBlueprintSummaryString())}
                    className="w-full py-4 px-5 rounded-full bg-gradient-to-r from-[#d4af37] to-[#b38f24] text-[#141416] text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg hover:brightness-110 transition-all cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4 shrink-0" />
                    <span>{b.sendToChatBtn}</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => onSelectPackage(buildBlueprintSummaryString())}
                  className="w-full py-4 px-5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
                >
                  <span>{b.requestProposalBtn}</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Vision Callout Banner: Why Custom Unified Systems Beat Fixed-Price SaaS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-[32px] bg-[#1d1d1f] text-white p-8 sm:p-12 mb-20 border border-[#d4af37]/30 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8"
        >
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#d4af37] mb-2">
              <Layers className="w-4 h-4" />
              <span>One Custom Operating System · Zero Per-Employee Tax</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
              {b.visionBannerTitle}
            </h3>
            <p className="text-sm sm:text-base text-white/75 leading-relaxed">
              {b.visionBannerDesc}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onSelectPackage('Custom System Architecture Discovery')}
            className="px-7 py-4 rounded-full bg-white text-[#1d1d1f] hover:bg-[#f5f5f7] text-sm font-bold inline-flex items-center gap-2 shrink-0 transition-colors cursor-pointer"
          >
            <span>Book Architecture Discovery</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>

        {/* Reference Architecture Blueprints (Starting Points by Team Scale) */}
        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h3 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#1d1d1f] mb-3">
              {b.blueprintsHeading}
            </h3>
            <p className="text-sm sm:text-base text-[#6e6e73]">{b.blueprintsSub}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch">
            {p.teamTiers.map((tier, idx) => {
              const isHighlighted = Boolean(tier.popular);
              return (
                <motion.div
                  key={tier.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className={`relative rounded-[32px] p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                    isHighlighted
                      ? 'bg-[#1d1d1f] text-white shadow-[0_30px_70px_rgba(0,0,0,0.18)] ring-2 ring-[#d4af37]'
                      : 'bg-white text-[#1d1d1f] border border-black/[0.07] shadow-[0_12px_36px_rgba(0,0,0,0.04)]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                          isHighlighted
                            ? 'bg-[#d4af37] text-[#141416]'
                            : 'bg-[#f5f5f7] text-[#0071e3]'
                        }`}
                      >
                        {tier.staffCountText}
                      </span>
                      {isHighlighted && (
                        <span className="text-[11px] font-bold text-[#d4af37]">
                          Most Popular
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-2">
                      {tier.label}
                    </h3>
                    <p
                      className={`text-xs sm:text-sm leading-relaxed mb-6 ${
                        isHighlighted ? 'text-white/75' : 'text-[#6e6e73]'
                      }`}
                    >
                      {tier.sublabel}
                    </p>

                    <div
                      className={`py-4 mb-6 border-y ${
                        isHighlighted ? 'border-white/12' : 'border-black/[0.07]'
                      }`}
                    >
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#0071e3] mb-1">
                        {p.summaryCard.turnkeyOneTimeLabel}
                      </div>
                      <div className="text-2xl sm:text-3xl font-bold tracking-tight tabular-nums">
                        From ${tier.turnkeyOneTimeUsd.toLocaleString()}
                      </div>
                      <div
                        className={`text-xs font-medium mt-1 ${
                          isHighlighted ? 'text-emerald-400' : 'text-emerald-600'
                        }`}
                      >
                        {p.summaryCard.zeroCommissionBadge}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      onSelectPackage(`Custom System Reference: ${tier.label} (${tier.staffCountText})`)
                    }
                    className={`w-full py-3.5 px-5 rounded-full text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      isHighlighted
                        ? 'bg-[#0071e3] hover:bg-[#0077ed] text-white shadow-lg shadow-[#0071e3]/30'
                        : 'bg-[#1d1d1f] hover:bg-[#333336] text-white'
                    }`}
                  >
                    <span>{p.summaryCard.ctaStartTrial}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Clean Apple-Style Feature Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-[32px] bg-white border border-black/[0.07] shadow-[0_12px_36px_rgba(0,0,0,0.03)] overflow-hidden mb-16"
        >
          <div className="p-7 sm:p-9 border-b border-black/[0.06] flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1d1d1f]">
                {p.comparisonTitle}
              </h3>
              <p className="text-xs sm:text-sm text-[#6e6e73] mt-1">{p.comparisonSubtitle}</p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0071e3]">
              <ShieldCheck className="w-4 h-4" />
              {p.summaryCard.zeroCommissionBadge}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-black/[0.06] bg-[#f5f5f7]/60 text-xs font-semibold text-[#6e6e73]">
                  <th className="py-4 px-6">{p.colFeature}</th>
                  <th className="py-4 px-6 text-center text-[#0071e3]">{p.colBrytech}</th>
                  <th className="py-4 px-6 text-center">{p.colGenericSaas}</th>
                  <th className="py-4 px-6 text-center">{p.colAgency}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[0.05] text-sm">
                {p.comparisonCategories.map((cat) => (
                  <React.Fragment key={cat.id}>
                    <tr className="bg-[#f5f5f7]/30">
                      <td
                        colSpan={4}
                        className="py-3 px-6 text-xs font-bold uppercase tracking-wider text-[#86868b]"
                      >
                        {cat.title}
                      </td>
                    </tr>
                    {cat.rows.map((row) => (
                      <tr key={row.feature} className="hover:bg-[#f5f5f7]/40 transition-colors">
                        <td className="py-4 px-6 font-medium text-[#1d1d1f]">{row.feature}</td>
                        <td className="py-4 px-6 text-center font-bold text-[#0071e3]">
                          {typeof row.brytech === 'boolean'
                            ? row.brytech
                              ? '✓ Included'
                              : '—'
                            : row.brytech}
                        </td>
                        <td className="py-4 px-6 text-center text-[#6e6e73]">
                          {typeof row.altegioSaaS === 'boolean'
                            ? row.altegioSaaS
                              ? '✓'
                              : '—'
                            : row.altegioSaaS}
                        </td>
                        <td className="py-4 px-6 text-center text-[#6e6e73]">
                          {typeof row.agency === 'boolean'
                            ? row.agency
                              ? '✓'
                              : '—'
                            : row.agency}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Clean FAQ Accordion */}
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-6">
            <HelpCircle className="w-5 h-5 text-[#0071e3]" />
            <h3 className="text-2xl font-bold text-[#1d1d1f]">{p.faqTitle}</h3>
          </div>
          <div className="space-y-3">
            {p.faqs.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={faq.q}
                  className="rounded-2xl bg-white border border-black/[0.07] overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="text-sm sm:text-base font-semibold text-[#1d1d1f]">
                      {faq.q}
                    </span>
                    <span className="text-lg font-bold text-[#0071e3]">{isOpen ? '−' : '+'}</span>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 text-sm text-[#6e6e73] leading-relaxed border-t border-black/[0.04] pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
