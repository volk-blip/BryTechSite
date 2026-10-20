export type Language = 'en' | 'uk' | 'ru' | 'he';

export interface TranslationContent {
  dir: 'ltr' | 'rtl';
  langLabel: string;
  nav: {
    home: string;
    about: string;
    capabilities: string;
    calculator: string;
    cases: string;
    clientArea: string;
    contact: string;
  };
  hero: {
    lines: [string, string, string, string, string, string];
    subtitle: string;
    ctaPrimary: string;
    ctaClientArea: string;
    stats: {
      val1: string;
      label1: string;
      val2: string;
      label2: string;
      val3: string;
      label3: string;
      val4: string;
      label4: string;
    };
  };
  about: {
    line1: string;
    line2: string;
    tabMission: string;
    tabMarkets: string;
    tabAffordability: string;
    textMission: string;
    textMarkets: string;
    textAffordability: string;
    ctaLearnMore: string;
  };
  capabilities: {
    line1: string;
    line2: string;
    intro: string;
    inspectLabel: string;
    inspectingLabel: string;
    specHeader: string;
    deliverablesTitle: string;
    techLabel: string;
    benchmarkLabel: string;
    ctaScope: string;
    items: Array<{
      id: string;
      number: string;
      title: string;
      subtitle: string;
      spanClass: string;
      description: string;
      metricValue: string;
      metricContext: string;
      deliverables: string[];
      stack: string;
    }>;
  };
  simulator: {
    line1: string;
    line2: string;
    intro: string;
    blueprintTag: string;
    blueprintTitle: string;
    activeLabel: string;
    emptyLayer: string;
    yourPriceLabel: string;
    agencyPriceLabel: string;
    launchTimeLabel: string;
    weeksUnit: string;
    savingsNote: string;
    ctaDeploy: string;
    modules: Array<{
      id: string;
      name: string;
      layer: string;
      summary: string;
      days: number;
      brytechCostUsd: number;
      agencyCostUsd: number;
    }>;
  };
  cases: {
    line1: string;
    line2: string;
    filterAll: string;
    filterUkraine: string;
    filterIsrael: string;
    primaryOutcomeLabel: string;
    operationalImpactLabel: string;
    inspectBtn: string;
    hideBtn: string;
    studies: Array<{
      id: string;
      market: 'ukraine' | 'israel';
      marketLabel: string;
      city: string;
      year: string;
      client: string;
      title: string;
      summary: string;
      primaryMetric: string;
      secondaryMetric: string;
      architectureNotes: string[];
      quote: {
        text: string;
        author: string;
        role: string;
      };
    }>;
  };
  contact: {
    processTag: string;
    processTitle: string;
    steps: Array<{
      number: string;
      title: string;
      duration: string;
      detail: string;
    }>;
    line1: string;
    line2: string;
    intro: string;
    hubs: Array<{
      city: string;
      address: string;
      tz: string;
    }>;
    formTitle: string;
    nameLabel: string;
    emailLabel: string;
    businessLabel: string;
    deliverableLabel: string;
    deliverableOptions: string[];
    marketLabel: string;
    marketOptions: string[];
    notesLabel: string;
    notesPlaceholder: string;
    submitBtn: string;
    successTitle: string;
    successText: string;
    resetBtn: string;
    footerTagline: string;
  };
}

export const TRANSLATIONS: Record<Language, TranslationContent> = {
  en: {
    dir: 'ltr',
    langLabel: 'EN',
    nav: {
      home: 'OVERVIEW',
      about: 'ABOUT US',
      capabilities: 'SOLUTIONS',
      calculator: 'CUSTOM PRICING',
      cases: 'CLIENTS',
      clientArea: 'CLIENT AREA',
      contact: 'CONTACT US',
    },
    hero: {
      lines: ['ONE', 'CUSTOM', 'SYSTEM', 'FOR', 'YOUR', 'BUSINESS'],
      subtitle:
        'We engineer a tailor-made digital operating system around your exact workflow — unifying your Website, Custom CRM, Scheduling, ERP, Client Area, and Messenger Automation into one platform.',
      ctaPrimary: 'BUILD YOUR SYSTEM',
      ctaClientArea: 'OPEN CLIENT AREA',
      stats: {
        val1: '100% Custom',
        label1: 'Tailored to Your Exact Workflow',
        val2: 'All-In-One',
        label2: 'Replaces 6+ Disconnected Subscriptions',
        val3: '10–21 Days',
        label3: 'Rapid Modular Architecture Rollout',
        val4: 'Up to 70% Less',
        label4: 'In Software & Operational Overhead',
      },
    },
    about: {
      line1: 'ONE UNIFIED',
      line2: 'OPERATING SYSTEM',
      tabMission: 'Our Vision',
      tabMarkets: 'Tailored Architecture',
      tabAffordability: 'Operational ROI',
      textMission:
        'Our vision is simple: every business operates differently, so off-the-shelf software always leaves gaps. We provide each client with a custom-built system designed specifically for their processes — covering all business operations inside one unified platform.',
      textMarkets:
        'Instead of juggling separate apps for your website, CRM, bookings, inventory, payroll, and client communications, we connect every department into one seamless ecosystem with full multilingual support (EN, UA, RU, HE) and global/local integrations.',
      textAffordability:
        'By combining battle-tested architectural blocks with custom workflow engineering, we eliminate monthly per-user software taxes, reduce administrative overhead by up to 70%, and give you 100% ownership of your business platform.',
      ctaLearnMore: 'EXPLORE ARCHITECTURE',
    },
    capabilities: {
      line1: 'UNIFIED',
      line2: 'ECOSYSTEM',
      intro:
        'Every operational pillar of your company — engineered to work together inside one custom-built platform tailored to your business rules.',
      inspectLabel: 'View Details',
      inspectingLabel: 'Selected',
      specHeader: 'Core Pillars of Your Custom System',
      deliverablesTitle: 'Engineered Around Your Workflow',
      techLabel: 'System Architecture',
      benchmarkLabel: 'Operational Impact',
      ctaScope: 'Configure This Pillar in Your System',
      items: [
        {
          id: 'websites',
          number: '01.',
          title: 'Custom Web Platforms, Booking & Client Intake',
          subtitle: 'High-Converting Front-End Connected Directly to Your Core',
          spanClass: 'lg:col-span-2',
          description:
            'Your website is no longer a static brochure — it is the live front door of your operating system. Every booking, custom quote, catalog order, and inquiry flows straight into your unified CRM and staff schedule.',
          metricValue: '+135% Lead Conversion',
          metricContext: 'Direct-to-core intake with zero manual data entry',
          deliverables: [
            'Bespoke Apple-grade design adapted for mobile, tablet, and desktop',
            'Multilingual interfaces (English, Ukrainian, Russian, Hebrew RTL)',
            '24/7 online booking, interactive service configurators & deposit collection',
            'Real-time synchronization with your internal CRM and inventory',
          ],
          stack: 'React · Next.js · Real-Time Booking Engine · Global & Local Payment Gateways',
        },
        {
          id: 'crm',
          number: '02.',
          title: 'Tailor-Made CRM, ERP & Internal Operations',
          subtitle: 'Pipelines, Staff Schedules, Payroll & Inventory in One View',
          spanClass: 'lg:col-span-1',
          description:
            'Built strictly around how your team actually works. Manage sales pipelines, client history, staff commissions, warehouse inventory, and financial analytics without paying per-seat subscription fees.',
          metricValue: '$0 Per-User Fees',
          metricContext: 'Unlimited employees, managers & branches included',
          deliverables: [
            'Custom sales pipelines and automated stage workflows',
            'Unified inbox capturing Website, Instagram, Telegram & WhatsApp leads',
            'Automated staff scheduling, KPI tracking, and commission payroll calculation',
            'Real-time financial P&L, invoicing, and warehouse write-offs',
          ],
          stack: 'Custom CRM & ERP Core · Role-Based Access · Automated Billing & Analytics',
        },
        {
          id: 'client-area',
          number: '03.',
          title: 'Branded Client Area (Self-Service Customer Portal)',
          subtitle: 'Live Project/Order Tracking, Notes & Direct Chat',
          spanClass: 'lg:col-span-1',
          description:
            'Give your clients their own branded login portal where they track real-time progress of their orders or services, add notes directly to products, inspect documents, and chat live with your team.',
          metricValue: '-65% Status Calls',
          metricContext: 'Clients view live progress, documents & updates 24/7',
          deliverables: [
            'Dedicated client login with live completion progress bars',
            'Interactive product notes that immediately notify your admin team',
            'Centralized contract, blueprint, and invoice vault',
            'Built-in real-time chat between client and project manager',
          ],
          stack: 'Client Portal Workspace · Real-Time WebSockets · Document Vault · Live Notifications',
        },
        {
          id: 'automation',
          number: '04.',
          title: 'AI, WhatsApp & Telegram Workflow Automation',
          subtitle: '24/7 Lead Qualification, Smart Reminders & External API Sync',
          spanClass: 'lg:col-span-2',
          description:
            'Eliminate 80% of repetitive administrative routine. Intelligent bots and webhook pipelines qualify incoming visitors, confirm appointments, dispatch delivery waybills, and issue fiscal receipts automatically.',
          metricValue: '15+ Hours Saved / Week',
          metricContext: 'Per manager through end-to-end process automation',
          deliverables: [
            'AI-assisted visitor qualification with seamless handoff to live specialists',
            'Automated WhatsApp, Telegram & SMS appointment reminders and win-back flows',
            'Two-way integration with banking, accounting, fiscal, and logistics APIs',
            'Instant executive alerts for VIP orders, client notes, and daily revenue summaries',
          ],
          stack: 'Gemini AI Assistant · WhatsApp Cloud API · Telegram Bot API · REST & Webhook Hub',
        },
      ],
    },
    simulator: {
      line1: 'CUSTOM SYSTEM',
      line2: 'ARCHITECT',
      intro:
        'Select the operational areas you want to unify into your custom-built platform. See how combining everything into one tailored system eliminates fragmented software costs.',
      blueprintTag: 'Interactive System Scope Builder',
      blueprintTitle: 'Your Unified System Blueprint',
      activeLabel: 'Included in Core',
      emptyLayer: 'No operational modules selected in this layer',
      yourPriceLabel: 'Estimated Custom Build',
      agencyPriceLabel: 'Traditional Multi-Vendor Cost',
      launchTimeLabel: 'Estimated Rollout',
      weeksUnit: 'Days',
      savingsNote: 'Tailored to your exact business logic with full architecture ownership.',
      ctaDeploy: 'Request Custom Blueprint For This Scope',
      modules: [
        {
          id: 'mod-web',
          name: 'Custom Web Platform & Client Intake',
          layer: 'Front & Web',
          summary: 'High-converting web platform & interactive client intake synced to core.',
          days: 5,
          brytechCostUsd: 650,
          agencyCostUsd: 2800,
        },
        {
          id: 'mod-crm',
          name: 'Bespoke CRM & Operations Pipeline',
          layer: 'CRM & Portal',
          summary: 'Custom lead pipelines, client cards, staff tasks & executive analytics.',
          days: 6,
          brytechCostUsd: 950,
          agencyCostUsd: 4500,
        },
        {
          id: 'mod-portal',
          name: 'Branded Client Area Portal',
          layer: 'CRM & Portal',
          summary: 'Dedicated portal for your clients with progress tracking, notes & live chat.',
          days: 5,
          brytechCostUsd: 850,
          agencyCostUsd: 4200,
        },
        {
          id: 'mod-bot',
          name: 'AI, Telegram & WhatsApp Automation',
          layer: 'Automation & Payments',
          summary: '24/7 AI bot qualification, automated reminders & instant notifications.',
          days: 3,
          brytechCostUsd: 450,
          agencyCostUsd: 1900,
        },
        {
          id: 'mod-booking',
          name: 'Multi-Resource Scheduling & Booking Engine',
          layer: 'Front & Web',
          summary: 'Real-time staff, room, or crew scheduling with prepayment protection.',
          days: 3,
          brytechCostUsd: 400,
          agencyCostUsd: 1800,
        },
        {
          id: 'mod-pay',
          name: 'Finance, Payroll, ERP & External API Sync',
          layer: 'Automation & Payments',
          summary: 'Automated invoicing, staff commission payroll, inventory & payment gateways.',
          days: 3,
          brytechCostUsd: 450,
          agencyCostUsd: 2200,
        },
      ],
    },
    cases: {
      line1: 'UNIFIED SYSTEM',
      line2: 'CASE STUDIES',
      filterAll: 'All Custom Systems',
      filterUkraine: 'Healthcare & Logistics',
      filterIsrael: 'Service & Advisory',
      primaryOutcomeLabel: 'Proven Custom Architecture Results',
      operationalImpactLabel: 'Operational Impact',
      inspectBtn: 'Inspect System Architecture',
      hideBtn: 'Hide System Details',
      studies: [
        {
          id: 'kyiv-clinic',
          market: 'ukraine',
          marketLabel: 'Medical & Clinics',
          city: 'Multi-Chair Medical Center',
          year: '2026',
          client: 'Aesthetica Med Clinic',
          title: 'Unified Patient Portal + Doctor Schedule CRM + Automated Messenger Recall',
          summary:
            'Replaced 4 disconnected clinic tools with one custom-built operating system covering online booking, doctor chair scheduling, electronic treatment plans, and patient Telegram/WhatsApp reminders.',
          primaryMetric: '+88% Online Bookings',
          secondaryMetric: '65% Fewer Missed Appointments',
          architectureNotes: [
            'Patient Client Area with treatment progress & medical file vault',
            'Automated 24h and 2h appointment confirmation in Telegram & WhatsApp',
            'Automated doctor commission & chair utilization analytics',
          ],
          quote: {
            text: 'Instead of forcing our doctors into generic software, BryTech built one clean system around our exact clinic workflow in 3 weeks.',
            author: 'Dr. Olena Kovalenko',
            role: 'Medical Director, Aesthetica Med Clinic',
          },
        },
        {
          id: 'tlv-renovation',
          market: 'israel',
          marketLabel: 'Construction & Design',
          city: 'Architecture & Contracting Group',
          year: '2026',
          client: 'Shaked Interiors & Renovation',
          title: 'End-to-End Project Estimation CRM + Homeowner Progress Portal',
          summary:
            'Engineered a single custom platform connecting interactive project estimation, subcontractor task scheduling, stage invoicing, and a homeowner Client Area with live milestone tracking.',
          primaryMetric: '+120% Signed Contracts',
          secondaryMetric: '14 Hours Saved Weekly on Status Calls',
          architectureNotes: [
            'Client Area with real-time renovation milestone % and stage notes',
            'WhatsApp Business automation that captures leads and schedules site audits',
            'Automated milestone billing & financial profitability tracking per project',
          ],
          quote: {
            text: 'Our entire company now runs inside one system—from the first website quote to the final handover in the Client Area.',
            author: 'Avi Shaked',
            role: 'Founder, Shaked Interiors',
          },
        },
        {
          id: 'lviv-roasters',
          market: 'ukraine',
          marketLabel: 'B2B Supply & Distribution',
          city: 'Regional Roastery & Distribution',
          year: '2026',
          client: 'Karpaty Craft Coffee & Supply',
          title: 'B2B Wholesale Ordering Portal + Warehouse ERP + Automated Logistics',
          summary:
            'Unified wholesale ordering from 180+ partner locations with live warehouse inventory write-offs, automatic courier waybill generation, and instant fiscal invoicing in one system.',
          primaryMetric: '3.1x Faster Order Fulfillment',
          secondaryMetric: '+74% Repeat B2B Partner Orders',
          architectureNotes: [
            'B2B Client Area with custom partner price lists and 1-click reorder',
            'Direct synchronization between warehouse stock, waybills, and invoicing',
            'Automated low-stock alerts and route dispatch boards',
          ],
          quote: {
            text: 'Our managers used to type orders into three different programs. Now everything happens automatically inside one custom platform.',
            author: 'Taras Melnyk',
            role: 'Co-Founder, Karpaty Craft Supply',
          },
        },
        {
          id: 'haifa-legal',
          market: 'israel',
          marketLabel: 'Advisory & Financial Firms',
          city: 'Multi-Partner Advisory Practice',
          year: '2025',
          client: 'Carmel Accounting & Advisory',
          title: 'Multilingual Client Document Vault + Automated Compliance Workflow CRM',
          summary:
            'Built a custom advisory operating system where 220+ business clients upload monthly documents, track filing milestones, add notes, and communicate with their dedicated partner.',
          primaryMetric: '220+ Business Clients Unified',
          secondaryMetric: '70% Faster Document Collection',
          architectureNotes: [
            'Automated WhatsApp & SMS deadline sequences for missing client documents',
            'Partner workload distribution & SLA compliance dashboard',
            'Multilingual Client Area in English, Hebrew, Russian, and Ukrainian',
          ],
          quote: {
            text: 'Having our CRM, document vault, and client communication inside one custom system transformed our firm’s capacity.',
            author: 'Marina Katz',
            role: 'Managing Partner, Carmel Advisory',
          },
        },
      ],
    },
    contact: {
      processTag: 'Custom System Architecture & Direct Consultation',
      processTitle: 'How We Engineer Your Unified System in Weeks, Not Months',
      steps: [
        {
          number: '01.',
          title: 'Operational Workflow Audit',
          duration: 'Days 1–2',
          detail:
            'We map out all your current business processes, software bottlenecks, and team workflows to design one unified system blueprint.',
        },
        {
          number: '02.',
          title: 'Custom Core & UI Engineering',
          duration: 'Days 3–10',
          detail:
            'We configure and custom-build your CRM, scheduling engine, ERP modules, web platform, and branded Client Area around your business rules.',
        },
        {
          number: '03.',
          title: 'Integrations & AI/Messenger Automation',
          duration: 'Days 11–15',
          detail:
            'We connect your WhatsApp/Telegram bots, AI assistant, payment gateways, accounting tools, and external APIs into one data flow.',
        },
        {
          number: '04.',
          title: 'Launch, Data Migration & Training',
          duration: 'Days 16–20',
          detail:
            'We migrate your existing data, train your team, and hand over full control inside your live BryTech system.',
        },
      ],
      line1: 'ARCHITECT YOUR',
      line2: 'CUSTOM SYSTEM',
      intro:
        'Tell us how your business operates today. Our senior systems architects will design a unified custom platform that covers all your operations in one place.',
      hubs: [
        {
          city: 'Global Engineering & Architecture Studio',
          address: 'Custom End-to-End Business Systems · Distributed R&D (Europe, Ukraine & Israel)',
          tz: 'Live Support Across European, Middle Eastern & US Timezones',
        },
        {
          city: 'Direct Client Architecture Desk',
          address: 'Consultations & System Demos in EN / RU / UA / HE',
          tz: 'Response Within 15 Minutes During Business Hours',
        },
      ],
      formTitle: 'Request Your Custom System Architecture & Proposal',
      nameLabel: 'Your Name *',
      emailLabel: 'Phone / WhatsApp / Telegram or Email *',
      businessLabel: 'Company Name & Industry',
      deliverableLabel: 'What Scope Would You Like to Unify?',
      deliverableOptions: [
        'Full Custom Operating System (CRM + Web + Operations + Client Area + Automation)',
        'Custom CRM, ERP & Internal Workflow Unification',
        'Branded Client Area Portal + Live Project/Order Tracker',
        'Custom Booking Engine, Web Platform & Messenger Automation',
        'Legacy Software Replacement & Bespoke R&D Architecture',
      ],
      marketLabel: 'Preferred Interface Languages & Currency',
      marketOptions: [
        'International / Multi-Currency (USD $ / EUR € / EN)',
        'Ukrainian / European Operations (UAH ₴ / EUR € / UA / EN)',
        'Israeli / Middle East Operations (ILS ₪ / USD $ / HE / EN / RU)',
      ],
      notesLabel: 'Describe Your Current Operations & Goals',
      notesPlaceholder:
        'Which tools or spreadsheets are you currently using, and what operations do you want unified into one custom system?',
      submitBtn: 'Request Custom System Blueprint',
      successTitle: 'Architecture Request Received!',
      successText:
        'A senior BryTech systems architect is reviewing your operational scope and will reach out via WhatsApp, Telegram, or Email shortly.',
      resetBtn: 'Submit Another Inquiry',
      footerTagline: 'BryTech · Custom-Built Unified Operating Systems for Modern Businesses Worldwide',
    },
  },

  uk: {
    dir: 'ltr',
    langLabel: 'UA',
    nav: {
      home: 'ОГЛЯД',
      about: 'ПРО НАС',
      capabilities: 'РІШЕННЯ',
      calculator: 'ІНДИВІДУАЛЬНИЙ ПРОРАХУНОК',
      cases: 'КЕЙСИ',
      clientArea: 'КАБІНЕТ КЛІЄНТА',
      contact: 'КОНТАКТИ',
    },
    hero: {
      lines: ['ЄДИНА', 'КАСТОМНА', 'СИСТЕМА', 'ДЛЯ', 'ВАШОГО', 'БІЗНЕСУ'],
      subtitle:
        'Ми проєктуємо та створюємо індивідуальну цифрову систему саме під ваші бізнес-процеси — об’єднуючи Сайт, CRM, Онлайн-запис, ERP, Кабінет Клієнта та Автоматизацію в одну платформу.',
      ctaPrimary: 'ЗІБРАТИ СВОЮ СИСТЕМУ',
      ctaClientArea: 'КАБІНЕТ КЛІЄНТА',
      stats: {
        val1: '100% Під Вас',
        label1: 'Архітектура під процеси вашої компанії',
        val2: 'Все в Одному',
        label2: 'Замінює 6+ розрізнених програм та таблиць',
        val3: '10–21 день',
        label3: 'Швидке впровадження модульного ядра',
        val4: 'До 70% Економії',
        label4: 'На підписках та операційних витратах',
      },
    },
    about: {
      line1: 'ЄДИНА ЦИФРОВА',
      line2: 'ЕКОСИСТЕМА',
      tabMission: 'Наша Візія',
      tabMarkets: 'Індивідуальна Архітектура',
      tabAffordability: 'Економічний Ефект',
      textMission:
        'Наша головна візія: кожен бізнес унікальний, тому шаблонні програми завжди змушують вас підлаштовуватися під чужі обмеження. Ми створюємо для кожного клієнта індивідуальну систему, яка закриває абсолютно всі операційні процеси компанії в одному вікні.',
      textMarkets:
        'Замість хаосу з окремих сервісів для сайту, CRM, складу, фінансів, розкладу та месенджерів ми об’єднуємо всі відділи вашого бізнесу в єдиний організм із підтримкою потрібних мов (EN, UA, RU, HE) та платіжних інтеграцій.',
      textAffordability:
        'Поєднуючи готові інженерні блоки з кастомною розробкою під ваші бізнес-правила, ми прибираємо щомісячну абонплату за кожного співробітника, скорочуємо витрати до 70% і передаємо вам повний контроль над системою.',
      ctaLearnMore: 'ДЕТАЛЬНІШЕ ПРО ПІДХІД',
    },
    capabilities: {
      line1: 'МОДУЛІ ЄДИНОЇ',
      line2: 'СИСТЕМИ',
      intro:
        'Усі операційні напрямки вашої компанії — спроєктовані для роботи в єдиній кастомній системі, створеній під ваші завдання.',
      inspectLabel: 'Детальніше',
      inspectingLabel: 'Обрано',
      specHeader: 'Компоненти Вашої Єдиної Системи',
      deliverablesTitle: 'Що об’єднує платформа',
      techLabel: 'Архітектура та Інтеграції',
      benchmarkLabel: 'Результат для бізнесу',
      ctaScope: 'Додати у конфігурацію системи',
      items: [
        {
          id: 'websites',
          number: '01.',
          title: 'Кастомні Веб-Платформи, Онлайн-Запис та Прийом Заявок',
          subtitle: 'Фронт-система, напряму з’єднана з вашим операційним ядром',
          spanClass: 'lg:col-span-2',
          description:
            'Ваш сайт перестає бути просто візиткою — він стає живою частиною вашої операційної системи. Кожне бронювання, розрахунок вартості чи замовлення миттєво потрапляє у вашу CRM, розклад та склад.',
          metricValue: '+135% Конверсія Заявок',
          metricContext: 'Миттєва синхронізація без ручного перенесення даних',
          deliverables: [
            'Преміальний дизайн у стилі Apple для смартфонів, планшетів та ПК',
            'Багатомовний інтерфейс (українська, англійська, російська, іврит)',
            'Онлайн-запис 24/7, інтерактивні калькулятори послуг та прийом передоплати',
            'Пряма синхронізація з внутрішньою CRM, графіком команди та складом',
          ],
          stack: 'React · Next.js · Ядро Онлайн-Бронювання · Платіжні та Логістичні API',
        },
        {
          id: 'crm',
          number: '02.',
          title: 'Індивідуальна CRM, ERP та Управління Компанією',
          subtitle: 'Воронки продажів, графік персоналу, зарплати та склад в одному вікні',
          spanClass: 'lg:col-span-1',
          description:
            'Система, побудована точно під логіку вашої компанії. Керуйте угодами, базою клієнтів, комісійними персоналу, складом та фінансами без щомісячної плати за кожного користувача.',
          metricValue: '$0 За Користувача',
          metricContext: 'Необмежена кількість співробітників та філій',
          deliverables: [
            'Кастомні воронки продажів та автоматичні завдання для менеджерів',
            'Єдине вікно звернень із сайту, Instagram, Telegram та WhatsApp',
            'Автоматичний розрахунок зарплат, % комісійних та KPI команди',
            'Фінансовий облік P&L, виставлення рахунків та списання матеріалів',
          ],
          stack: 'Custom CRM & ERP Core · Рольовий Доступ · Фінансова Аналітика',
        },
        {
          id: 'client-area',
          number: '03.',
          title: 'Брендований Кабінет Клієнта (Client Area)',
          subtitle: 'Живий трекінг прогресу, нотатки до продуктів та прямий чат',
          spanClass: 'lg:col-span-1',
          description:
            'Надайте вашим клієнтам власний особистий кабінет, де вони бачать статус виконання своїх замовлень або послуг у реальному часі, залишають нотатки, завантажують документи та спілкуються в чаті.',
          metricValue: '-65% Дзвінків Менеджерам',
          metricContext: 'Клієнти бачать живий прогрес та документи 24/7',
          deliverables: [
            'Персональний вхід за логіном і паролем із живою шкалою готовності',
            'Можливість клієнта додавати нотатки з миттєвим сповіщенням Адміну',
            'Єдиний архів договорів, специфікацій, актів та рахунків',
            'Вбудований живий чат між клієнтом та командою проєкту',
          ],
          stack: 'Client Area Portal · WebSockets Реального Часу · Сховище Документів',
        },
        {
          id: 'automation',
          number: '04.',
          title: 'ШІ-Асистент, Автоматизація Telegram і WhatsApp',
          subtitle: 'Кваліфікація лідів 24/7, розумні нагадування та інтеграції',
          spanClass: 'lg:col-span-2',
          description:
            'Автоматизуйте до 80% рутинної роботи. Розумні боти консультують відвідувачів, передають діалог живому спеціалісту, надсилають нагадування про візити та формують накладні й чеки автоматично.',
          metricValue: '15+ Годин Економії / Тиж',
          metricContext: 'Для власника бізнесу та адміністраторів',
          deliverables: [
            'Розумний ШІ-бот на сайті з миттєвим переключенням на живого фахівця',
            'Автоматичні нагадування у WhatsApp, Telegram та SMS для зниження неявок',
            'Двостороння синхронізація з банками, ПРРО, складськими та поштовими сервісами',
            'Миттєві звіти керівнику про нові замовлення, нотатки клієнтів та виручку',
          ],
          stack: 'Gemini AI · WhatsApp Cloud API · Telegram Bot API · Webhook Hub',
        },
      ],
    },
    simulator: {
      line1: 'КОНСТРУКТОР',
      line2: 'ВАШОЇ СИСТЕМИ',
      intro:
        'Оберіть операційні контури, які потрібно об’єднати у вашу індивідуальну платформу. Побачте, як єдина система замінює десятки розрізнених сервісів.',
      blueprintTag: 'Інтерактивний Прорахунок Архітектури',
      blueprintTitle: 'Специфікація Вашої Єдиної Системи',
      activeLabel: 'Включено в ядро',
      emptyLayer: 'У цьому контурі модулі не обрані',
      yourPriceLabel: 'Орієнтовний Бюджет Розробки',
      agencyPriceLabel: 'Вартість у класичних студіях',
      launchTimeLabel: 'Термін Впровадження',
      weeksUnit: 'Днів',
      savingsNote: 'Індивідуальна архітектура під ваші процеси з передачею прав власності.',
      ctaDeploy: 'Замовити Архітектуру Цієї Системи',
      modules: [
        {
          id: 'mod-web',
          name: 'Кастомна Веб-Платформа та Прийом Заявок',
          layer: 'Front & Web',
          summary: 'Висококонверсійний сайт та інтерактивні форми, з’єднані з CRM.',
          days: 5,
          brytechCostUsd: 650,
          agencyCostUsd: 2800,
        },
        {
          id: 'mod-crm',
          name: 'Індивідуальна CRM та Операційне Ядро',
          layer: 'CRM & Portal',
          summary: 'Воронки продажів, картки клієнтів, завдання персоналу та аналітика.',
          days: 6,
          brytechCostUsd: 950,
          agencyCostUsd: 4500,
        },
        {
          id: 'mod-portal',
          name: 'Брендований Кабінет Клієнта (Client Area)',
          layer: 'CRM & Portal',
          summary: 'Особистий портал для ваших клієнтів із прогресом, нотатками та чатом.',
          days: 5,
          brytechCostUsd: 850,
          agencyCostUsd: 4200,
        },
        {
          id: 'mod-bot',
          name: 'ШІ-Чат, Боти Telegram та WhatsApp',
          layer: 'Automation & Payments',
          summary: 'Кваліфікація клієнтів 24/7, авто-нагадування та сповіщення.',
          days: 3,
          brytechCostUsd: 450,
          agencyCostUsd: 1900,
        },
        {
          id: 'mod-booking',
          name: 'Система Онлайн-Бронювання та Розкладу',
          layer: 'Front & Web',
          summary: 'Графік спеціалістів, кабінетів або бригад із захистом від неявок.',
          days: 3,
          brytechCostUsd: 400,
          agencyCostUsd: 1800,
        },
        {
          id: 'mod-pay',
          name: 'Фінанси, Зарплати, Склад та Зовнішні API',
          layer: 'Automation & Payments',
          summary: 'Рахунки, розрахунок комісійних, складський облік та платіжні шлюзи.',
          days: 3,
          brytechCostUsd: 450,
          agencyCostUsd: 2200,
        },
      ],
    },
    cases: {
      line1: ' ПРИКЛАДИ ЄДИНИХ',
      line2: 'СИСТЕМ',
      filterAll: 'Усі Проєкти',
      filterUkraine: 'Медицина та Логістика',
      filterIsrael: 'Сервіс та Консалтинг',
      primaryOutcomeLabel: 'Результати Впровадження Кастомних Систем',
      operationalImpactLabel: 'Операційний Ефект',
      inspectBtn: 'Подивитися Архітектуру',
      hideBtn: 'Сховати Деталі',
      studies: [
        {
          id: 'kyiv-clinic',
          market: 'ukraine',
          marketLabel: 'Медицина та Клініки',
          city: 'Багатопрофільний Медичний Центр',
          year: '2026',
          client: 'Aesthetica Med Clinic',
          title: 'Єдина система: Сайт + Розклад лікарів CRM + Кабінет пацієнта + Боти',
          summary:
            'Замінили 4 розрізнені програми однією кастомною системою, що охоплює онлайн-запис, графік кабінетів, електронні плани лікування та автоматичні нагадування у месенджерах.',
          primaryMetric: '+88% Онлайн-Записів',
          secondaryMetric: 'На 65% менше неявок пацієнтів',
          architectureNotes: [
            'Особистий кабінет пацієнта з історією візитів та документами',
            'Автоматичні нагадування за 24 та 2 години у Telegram і WhatsApp',
            'Автоматичний розрахунок завантаження крісел та зарплат лікарів',
          ],
          quote: {
            text: 'Замість того щоб ламати наші процеси під шаблонні програми, BryTech створили єдину зручну систему саме під нашу клініку за 3 тижні.',
            author: 'Д-р Олена Коваленко',
            role: 'Засновниця, Aesthetica Med Clinic',
          },
        },
        {
          id: 'tlv-renovation',
          market: 'israel',
          marketLabel: 'Будівництво та Дизайн',
          city: 'Архітектурно-Будівельна Група',
          year: '2026',
          client: 'Shaked Interiors & Renovation',
          title: 'Єдина система кошторисів, управління бригадами та Кабінет Замовника',
          summary:
            'Створили комплексну платформу, що поєднала калькулятор проєктів, CRM управління підрядниками, поетапні рахунки та Кабінет Клієнта з живим прогресом ремонту.',
          primaryMetric: '+120% Підписаних Договорів',
          secondaryMetric: '14 годин/тиждень економії на дзвінках',
          architectureNotes: [
            'Кабінет Клієнта з % готовності кожного етапу та фото-звітами',
            'WhatsApp-автоматизація для миттєвої фіксації лідів та виїздів на замір',
            'Контроль рентабельності кожного об’єкта в реальному часі',
          ],
          quote: {
            text: 'Тепер уся наша компанія працює в одній системі — від першого розрахунку на сайті до фінального акту в Кабінеті Клієнта.',
            author: 'Аві Шакед',
            role: 'Власник, Shaked Interiors',
          },
        },
        {
          id: 'lviv-roasters',
          market: 'ukraine',
          marketLabel: 'B2B Дистрибуція та Виробництво',
          city: 'Виробничо-Логістична Компанія',
          year: '2026',
          client: 'Karpaty Craft Coffee & Supply',
          title: 'B2B-Портал гуртових замовлень + Складська ERP + Автоматизація логістики',
          summary:
            'Об’єднали прийом замовлень від 180+ B2B-партнерів зі складським обліком, автоматичним створенням накладних доставки та фіскалізацією в одній системі.',
          primaryMetric: 'У 3.1x Швидша Обробка Замовлень',
          secondaryMetric: '+74% Повторних B2B-Замовлень',
          architectureNotes: [
            'B2B Кабінет Клієнта з індивідуальними прайсами та повтором замовлення в 1 клік',
            'Пряма синхронізація залишків складу, ТТН та виставлення рахунків',
            'Автоматичні сповіщення про критичні залишки сировини',
          ],
          quote: {
            text: 'Раніше менеджери переносили замовлення між трьома програмами. Тепер усе працює автоматично в нашій єдиній платформі.',
            author: 'Тарас Мельник',
            role: 'Співзасновник, Karpaty Craft Supply',
          },
        },
        {
          id: 'haifa-legal',
          market: 'israel',
          marketLabel: 'Консалтинг та Фінанси',
          city: 'Консалтингова та Бухгалтерська Компанія',
          year: '2025',
          client: 'Carmel Accounting & Advisory',
          title: 'Багатомовний Портал Документів Клієнта + CRM Дедлайнів та Звітності',
          summary:
            'Впровадили кастомну операційну систему, де 220+ бізнес-клієнтів завантажують первинні документи, бачать статус звітності та спілкуються зі своїм аудитором.',
          primaryMetric: '220+ Бізнес-Клієнтів у Системі',
          secondaryMetric: 'На 70% Швидший Збір Документів',
          architectureNotes: [
            'Автоматичні нагадування у WhatsApp та SMS про податкові дедлайни',
            'Дашборд завантаженості аудиторів та контролю SLA',
            'Чотиримовний інтерфейс (EN, HE, RU, UA)',
          ],
          quote: {
            text: 'Об’єднання CRM, документообігу та комунікації з клієнтами в одну систему вдвічі збільшило пропускну здатність нашої фірми.',
            author: 'Марина Кац',
            role: 'Керуючий партнер, Carmel Advisory',
          },
        },
      ],
    },
    contact: {
      processTag: 'Індивідуальне Проєктування та Прямий Зв’язок',
      processTitle: 'Як Ми Створюємо Вашу Єдину Систему За Тижні, А Не Місяці',
      steps: [
        {
          number: '01.',
          title: 'Аудит Ваших Бізнес-Процесів',
          duration: 'Дні 1–2',
          detail:
            'Ми детально розбираємо, як працює ваш бізнес зараз, які програми чи таблиці ви використовуєте, та проєктуємо архітектуру єдиної системи.',
        },
        {
          number: '02.',
          title: 'Кастомне Ядро та Інтерфейси',
          duration: 'Дні 3–10',
          detail:
            'Налаштовуємо та розробляємо під вас CRM, онлайн-запис, складські й фінансові модулі, сайт та брендований Кабінет Клієнта.',
        },
        {
          number: '03.',
          title: 'Інтеграції, Платежі та ШІ/Месенджери',
          duration: 'Дні 11–15',
          detail:
            'Підключаємо Telegram/WhatsApp-ботів, ШІ-асистента, еквайринг, телефонію та зовнішні сервіси в єдиний потік даних.',
        },
        {
          number: '04.',
          title: 'Запуск, Міграція Даних та Навчання',
          duration: 'Дні 16–20',
          detail:
            'Переносимо вашу базу клієнтів, навчаємо команду за 1 годину та передаємо вам повний доступ до єдиної платформи.',
        },
      ],
      line1: 'СТВОРІТЬ СВОЮ',
      line2: 'ЄДИНУ СИСТЕМУ',
      intro:
        'Розкажіть нам про процеси вашої компанії. Наші системні архітектори спроєктують індивідуальну платформу, яка об’єднає всі операції вашого бізнесу в одному місці.',
      hubs: [
        {
          city: 'Міжнародний Центр Інженерії та Архітектури',
          address: 'Проєктування комплексних бізнес-систем · R&D команди в Європі, Україні та Ізраїлі',
          tz: 'Підтримка у часових поясах Європи, Близького Сходу та США',
        },
        {
          city: 'Відділ Роботи з Клієнтами та Демонстрацій',
          address: 'Онлайн-консультації та персональне демо (UA / EN / RU / HE)',
          tz: 'Відповідь провідного архітектора протягом 15 хвилин',
        },
      ],
      formTitle: 'Замовити Індивідуальну Архітектуру та Прорахунок Системи',
      nameLabel: 'Ваше Ім’я *',
      emailLabel: 'Телефон / WhatsApp / Telegram або Email *',
      businessLabel: 'Назва Компанії та Сфера Діяльності',
      deliverableLabel: 'Які Процеси Потрібно Об’єднати?',
      deliverableOptions: [
        'Повна Єдина Система Бізнесу (CRM + Сайт + Розклад + Фінанси + Кабінет Клієнта + Боти)',
        'Індивідуальна CRM, ERP та Автоматизація Внутрішніх Процесів',
        'Брендований Кабінет Клієнта (Client Area) + Живий Трекінг Замовлень',
        'Кастомна Платформа Онлайн-Запису, Сайт та Месенджер-Автоматизація',
        'Заміна Розрізнених Програм на Єдину Кастомну Платформу',
      ],
      marketLabel: 'Мови Інтерфейсу та Валюта Обліку',
      marketOptions: [
        'Україна та Європа (UAH ₴ / EUR € / UA / EN)',
        'Міжнародний Бізнес / Мультивалютність (USD $ / EUR € / EN)',
        'Ізраїль та Близький Схід (ILS ₪ / USD $ / HE / EN / RU)',
      ],
      notesLabel: 'Опишіть Ваші Поточні Процеси та Завдання',
      notesPlaceholder:
        'Якими програмами або таблицями ви користуєтеся зараз і які процеси хочете закрити однією системою?',
      submitBtn: 'Отримати Архітектуру та Прорахунок',
      successTitle: 'Запит Прийнято в Роботу!',
      successText:
        'Провідний архітектор BryTech вже вивчає ваш запит і зв’яжеться з вами у Telegram, WhatsApp або телефоном найближчим часом.',
      resetBtn: 'Надіслати Ще Один Запит',
      footerTagline: 'BryTech · Індивідуальні Єдині Операційні Системи для Сучасного Бізнесу',
    },
  },

  ru: {
    dir: 'ltr',
    langLabel: 'RU',
    nav: {
      home: 'ОБЗОР',
      about: 'О НАС',
      capabilities: 'РЕШЕНИЯ',
      calculator: 'ИНДИВИДУАЛЬНЫЙ РАСЧЕТ',
      cases: 'КЕЙСЫ',
      clientArea: 'КАБИНЕТ КЛИЕНТА',
      contact: 'КОНТАКТЫ',
    },
    hero: {
      lines: ['ЕДИНАЯ', 'КАСТОМНАЯ', 'СИСТЕМА', 'ДЛЯ', 'ВАШЕГО', 'БИЗНЕСА'],
      subtitle:
        'Мы проектируем и создаем индивидуальную цифровую систему точно под ваши бизнес-процессы — объединяя Сайт, CRM, Онлайн-запись, ERP, Кабинет Клиента и Автоматизацию в одну платформу.',
      ctaPrimary: 'СОБРАТЬ СВОЮ СИСТЕМУ',
      ctaClientArea: 'КАБИНЕТ КЛИЕНТА',
      stats: {
        val1: '100% Под Вас',
        label1: 'Архитектура под процессы вашей компании',
        val2: 'Все в Одном',
        label2: 'Заменяет 6+ разрозненных программ и таблиц',
        val3: '10–21 день',
        label3: 'Быстрое внедрение модульного ядра',
        val4: 'До 70% Экономии',
        label4: 'На подписках и операционных расходах',
      },
    },
    about: {
      line1: 'ЕДИНАЯ ЦИФРОВАЯ',
      line2: 'ЭКОСИСТЕМА',
      tabMission: ' Наше Видение',
      tabMarkets: 'Индивидуальная Архитектура',
      tabAffordability: 'Экономический Эффект',
      textMission:
        'Наше главное видение: каждый бизнес уникален, поэтому шаблонные коробочные программы всегда заставляют вас подстраиваться под чужие ограничения. Мы создаем для каждого клиента индивидуальную систему, которая закрывает абсолютно все операционные процессы компании в одном окне.',
      textMarkets:
        'Вместо хаоса из отдельных сервисов для сайта, CRM, склада, финансов, расписания и мессенджеров мы объединяем все отделы вашего бизнеса в единый организм с поддержкой нужных языков (EN, RU, UA, HE) и платежных интеграций.',
      textAffordability:
        'Сочетая проверенные инженерные блоки с кастомной разработкой под ваши бизнес-правила, мы убираем ежемесячную абонплату за каждого сотрудника, сокращаем расходы до 70% и передаем вам полный контроль над системой.',
      ctaLearnMore: 'ПОДРОБНЕЕ О ПОДХОДЕ',
    },
    capabilities: {
      line1: 'МОДУЛИ ЕДИНОЙ',
      line2: 'СИСТЕМЫ',
      intro:
        'Все операционные направления вашей компании — спроектированные для работы в единой кастомной системе, созданной под ваши задачи.',
      inspectLabel: 'Подробнее',
      inspectingLabel: 'Выбрано',
      specHeader: 'Компоненты Вашей Единой Системы',
      deliverablesTitle: 'Что объединяет платформа',
      techLabel: 'Архитектура и Интеграции',
      benchmarkLabel: 'Результат для бизнеса',
      ctaScope: 'Добавить в конфигурацию системы',
      items: [
        {
          id: 'websites',
          number: '01.',
          title: 'Кастомные Веб-Платформы, Онлайн-Запись и Прием Заявок',
          subtitle: 'Фронт-система, напрямую соединенная с вашим операционным ядром',
          spanClass: 'lg:col-span-2',
          description:
            'Ваш сайт перестает быть просто визиткой — он становится живой частью вашей операционной системы. Каждое бронирование, расчет стоимости или заказ мгновенно попадает в вашу CRM, расписание и склад.',
          metricValue: '+135% Конверсия Заявок',
          metricContext: 'Мгновенная синхронизация без ручного переноса данных',
          deliverables: [
            'Премиальный дизайн в стиле Apple для смартфонов, планшетов и ПК',
            'Многоязычный интерфейс (русский, английский, украинский, иврит)',
            'Онлайн-запись 24/7, интерактивные калькуляторы услуг и прием предоплаты',
            'Прямая синхронизация с внутренней CRM, графиком команды и складом',
          ],
          stack: 'React · Next.js · Ядро Онлайн-Бронирования · Платежные и Логистические API',
        },
        {
          id: 'crm',
          number: '02.',
          title: 'Индивидуальная CRM, ERP и Управление Компанией',
          subtitle: 'Воронки продаж, график персонала, зарплаты и склад в одном окне',
          spanClass: 'lg:col-span-1',
          description:
            'Система, построенная точно под логику вашей компании. Управляйте сделками, базой клиентов, комиссионными персонала, складом и финансами без ежемесячной платы за каждого пользователя.',
          metricValue: '$0 За Пользователя',
          metricContext: 'Неограниченное количество сотрудников и филиалов',
          deliverables: [
            'Кастомные воронки продаж и автоматические задачи для менеджеров',
            'Единое окно обращений с сайта, Instagram, Telegram и WhatsApp',
            'Автоматический расчет зарплат, % комиссионных и KPI команды',
            'Финансовый учет P&L, выставление счетов и списание материалов',
          ],
          stack: 'Custom CRM & ERP Core · Ролевой Доступ · Финансовая Аналитика',
        },
        {
          id: 'client-area',
          number: '03.',
          title: 'Брендированный Кабинет Клиента (Client Area)',
          subtitle: 'Живой трекинг прогресса, заметки к продуктам и прямой чат',
          spanClass: 'lg:col-span-1',
          description:
            'Предоставьте вашим клиентам собственный личный кабинет, где они видят статус выполнения своих заказов или услуг в реальном времени, оставляют заметки, скачивают документы и общаются в чате.',
          metricValue: '-65% Звонков Менеджерам',
          metricContext: 'Клиенты видят живой прогресс и документы 24/7',
          deliverables: [
            'Персональный вход по логину и паролю с живой шкалой готовности',
            'Возможность клиента добавлять заметки с мгновенным уведомлением Админу',
            'Единый архив договоров, спецификаций, актов и счетов',
            'Встроенный живой чат между клиентом и командой проекта',
          ],
          stack: 'Client Area Portal · WebSockets Реального Времени · Хранилище Документов',
        },
        {
          id: 'automation',
          number: '04.',
          title: 'ИИ-Ассистент, Автоматизация Telegram и WhatsApp',
          subtitle: 'Квалификация лидов 24/7, умные напоминания и интеграции',
          spanClass: 'lg:col-span-2',
          description:
            'Автоматизируйте до 80% рутинной работы. Умные боты консультируют посетителей, передают диалог живому специалисту, отправляют напоминания о визитах и формируют накладные и чеки автоматически.',
          metricValue: '15+ Часов Экономии / Нед',
          metricContext: 'Для владельца бизнеса и администраторов',
          deliverables: [
            'Умный ИИ-бот на сайте с мгновенным переключением на живого специалиста',
            'Автоматические напоминания в WhatsApp, Telegram и SMS для снижения неявок',
            'Двусторонняя синхронизация с банками, кассами, складскими и почтовыми сервисами',
            'Мгновенные отчеты руководителю о новых заказах, заметках клиентов и выручке',
          ],
          stack: 'Gemini AI · WhatsApp Cloud API · Telegram Bot API · Webhook Hub',
        },
      ],
    },
    simulator: {
      line1: 'КОНСТРУКТОР',
      line2: 'ВАШЕЙ СИСТЕМЫ',
      intro:
        'Выберите операционные контуры, которые нужно объединить в вашу индивидуальную платформу. Посмотрите, как единая система заменяет десятки разрозненных сервисов.',
      blueprintTag: 'Интерактивный Расчет Архитектуры',
      blueprintTitle: 'Спецификация Вашей Единой Системы',
      activeLabel: 'Включено в ядро',
      emptyLayer: 'В этом контуре модули не выбраны',
      yourPriceLabel: 'Ориентировочный Бюджет Разработки',
      agencyPriceLabel: 'Стоимость в классических студиях',
      launchTimeLabel: 'Срок Внедрения',
      weeksUnit: 'Дней',
      savingsNote: 'Индивидуальная архитектура под ваши процессы с передачей прав собственности.',
      ctaDeploy: 'Заказать Архитектуру Этой Системы',
      modules: [
        {
          id: 'mod-web',
          name: 'Кастомная Веб-Платформа и Прием Заявок',
          layer: 'Front & Web',
          summary: 'Высококонверсионный сайт и интерактивные формы, соединенные с CRM.',
          days: 5,
          brytechCostUsd: 650,
          agencyCostUsd: 2800,
        },
        {
          id: 'mod-crm',
          name: 'Индивидуальная CRM и Операционное Ядро',
          layer: 'CRM & Portal',
          summary: 'Воронки продаж, карточки клиентов, задачи персонала и аналитика.',
          days: 6,
          brytechCostUsd: 950,
          agencyCostUsd: 4500,
        },
        {
          id: 'mod-portal',
          name: 'Брендированный Кабинет Клиента (Client Area)',
          layer: 'CRM & Portal',
          summary: 'Личный портал для ваших клиентов с прогрессом, заметками и чатом.',
          days: 5,
          brytechCostUsd: 850,
          agencyCostUsd: 4200,
        },
        {
          id: 'mod-bot',
          name: 'ИИ-Чат, Боты Telegram и WhatsApp',
          layer: 'Automation & Payments',
          summary: 'Квалификация клиентов 24/7, авто-напоминания и уведомления.',
          days: 3,
          brytechCostUsd: 450,
          agencyCostUsd: 1900,
        },
        {
          id: 'mod-booking',
          name: 'Система Онлайн-Бронирования и Расписания',
          layer: 'Front & Web',
          summary: 'График специалистов, кабинетов или бригад с защитой от неявок.',
          days: 3,
          brytechCostUsd: 400,
          agencyCostUsd: 1800,
        },
        {
          id: 'mod-pay',
          name: 'Финансы, Зарплаты, Склад и Внешние API',
          layer: 'Automation & Payments',
          summary: 'Счета, расчет комиссионных, складской учет и платежные шлюзы.',
          days: 3,
          brytechCostUsd: 450,
          agencyCostUsd: 2200,
        },
      ],
    },
    cases: {
      line1: 'ПРИМЕРЫ ЕДИНЫХ',
      line2: 'СИСТЕМ',
      filterAll: 'Все Проекты',
      filterUkraine: 'Медицина и Логистика',
      filterIsrael: 'Сервис и Консалтинг',
      primaryOutcomeLabel: 'Результаты Внедрения Кастомных Систем',
      operationalImpactLabel: 'Операционный Эффект',
      inspectBtn: 'Посмотреть Архитектуру',
      hideBtn: 'Скрыть Детали',
      studies: [
        {
          id: 'kyiv-clinic',
          market: 'ukraine',
          marketLabel: 'Медицина и Клиники',
          city: 'Многопрофильный Медицинский Центр',
          year: '2026',
          client: 'Aesthetica Med Clinic',
          title: 'Единая система: Сайт + Расписание врачей CRM + Кабинет пациента + Боты',
          summary:
            'Заменили 4 разрозненные программы одной кастомной системой, охватывающей онлайн-запись, график кабинетов, электронные планы лечения и автоматические напоминания в мессенджерах.',
          primaryMetric: '+88% Онлайн-Записей',
          secondaryMetric: 'На 65% меньше неявок пациентов',
          architectureNotes: [
            'Личный кабинет пациента с историей визитов и документами',
            'Автоматические напоминания за 24 и 2 часа в Telegram и WhatsApp',
            'Автоматический расчет загрузки кресел и зарплат врачей',
          ],
          quote: {
            text: 'Вместо того чтобы ломать наши процессы под шаблонные программы, BryTech создали единую удобную систему именно под нашу клинику за 3 недели.',
            author: 'Д-р Елена Коваленко',
            role: 'Основатель, Aesthetica Med Clinic',
          },
        },
        {
          id: 'tlv-renovation',
          market: 'israel',
          marketLabel: 'Строительство и Дизайн',
          city: 'Архитектурно-Строительная Группа',
          year: '2026',
          client: 'Shaked Interiors & Renovation',
          title: 'Единая система смет, управления бригадами и Кабинет Заказчика',
          summary:
            'Создали комплексную платформу, объединившую калькулятор проектов, CRM управления подрядчиками, поэтапные счета и Кабинет Клиента с живым прогрессом ремонта.',
          primaryMetric: '+120% Подписанных Договоров',
          secondaryMetric: '14 часов/неделю экономии на звонках',
          architectureNotes: [
            'Кабинет Клиента с % готовности каждого этапа и фото-отчетами',
            'WhatsApp-автоматизация для мгновенной фиксации лидов и выездов на замер',
            'Контроль рентабельности каждого объекта в реальном времени',
          ],
          quote: {
            text: 'Теперь вся наша компания работает в одной системе — от первого расчета на сайте до финального акта в Кабинете Клиента.',
            author: 'Ави Шакед',
            role: 'Владелец, Shaked Interiors',
          },
        },
        {
          id: 'lviv-roasters',
          market: 'ukraine',
          marketLabel: 'B2B Дистрибуция и Производство',
          city: 'Производственно-Логистическая Компания',
          year: '2026',
          client: 'Karpaty Craft Coffee & Supply',
          title: 'B2B-Портал оптовых заказов + Складская ERP + Автоматизация логистики',
          summary:
            'Объединили прием заказов от 180+ B2B-партнеров со складским учетом, автоматическим созданием накладных доставки и фискализацией в одной системе.',
          primaryMetric: 'В 3.1x Быстрее Обработка Заказов',
          secondaryMetric: '+74% Повторных B2B-Заказов',
          architectureNotes: [
            'B2B Кабинет Клиента с индивидуальными прайсами и повтором заказа в 1 клик',
            'Прямая синхронизация остатков склада, накладных и выставления счетов',
            'Автоматические уведомления о критических остатках сырья',
          ],
          quote: {
            text: 'Раньше менеджеры переносили заказы между тремя программами. Теперь все работает автоматически в нашей единой платформе.',
            author: 'Тарас Мельник',
            role: 'Сооснователь, Karpaty Craft Supply',
          },
        },
        {
          id: 'haifa-legal',
          market: 'israel',
          marketLabel: 'Консалтинг и Финансы',
          city: 'Консалтинговая и Бухгалтерская Компания',
          year: '2025',
          client: 'Carmel Accounting & Advisory',
          title: 'Многоязычный Портал Документов Клиента + CRM Дедлайнов и Отчетности',
          summary:
            'Внедрили кастомную операционную систему, где 220+ бизнес-клиентов загружают первичные документы, видят статус отчетности и общаются со своим аудитором.',
          primaryMetric: '220+ Бизнес-Клиентов в Системе',
          secondaryMetric: 'На 70% Быстрее Сбор Документов',
          architectureNotes: [
            'Автоматические напоминания в WhatsApp и SMS о налоговых дедлайнах',
            'Дашборд загруженности аудиторов и контроля SLA',
            'Четырехъязычный интерфейс (EN, HE, RU, UA)',
          ],
          quote: {
            text: 'Объединение CRM, документооборота и коммуникации с клиентами в одну систему вдвое увеличило пропускную способность нашей фирмы.',
            author: 'Марина Кац',
            role: 'Управляющий партнер, Carmel Advisory',
          },
        },
      ],
    },
    contact: {
      processTag: 'Индивидуальное Проектирование и Прямая Связь',
      processTitle: 'Как Мы Создаем Вашу Единую Систему За Недели, А Не Месяцы',
      steps: [
        {
          number: '01.',
          title: 'Аудит Ваших Бизнес-Процессов',
          duration: 'Дни 1–2',
          detail:
            'Мы детально разбираем, как работает ваш бизнес сейчас, какие программы или таблицы вы используете, и проектируем архитектуру единой системы.',
        },
        {
          number: '02.',
          title: 'Кастомное Ядро и Интерфейсы',
          duration: 'Дни 3–10',
          detail:
            'Настраиваем и разрабатываем под вас CRM, онлайн-запись, складские и финансовые модули, сайт и брендированный Кабинет Клиента.',
        },
        {
          number: '03.',
          title: 'Интеграции, Платежи и ИИ/Мессенджеры',
          duration: 'Дни 11–15',
          detail:
            'Подключаем Telegram/WhatsApp-ботов, ИИ-ассистента, эквайринг, телефонию и внешние сервисы в единый поток данных.',
        },
        {
          number: '04.',
          title: 'Запуск, Миграция Данных и Обучение',
          duration: 'Дни 16–20',
          detail:
            'Переносим вашу базу клиентов, обучаем команду за 1 час и передаем вам полный доступ к единой платформе.',
        },
      ],
      line1: 'СОЗДАЙТЕ СВОЮ',
      line2: 'ЕДИНУЮ СИСТЕМУ',
      intro:
        'Расскажите нам о процессах вашей компании. Наши системные архитекторы спроектируют индивидуальную платформу, которая объединит все операции вашего бизнеса в одном месте.',
      hubs: [
        {
          city: 'Международный Центр Инженерии и Архитектуры',
          address: 'Проектирование комплексных бизнес-систем · R&D команды в Европе, Украине и Израиле',
          tz: 'Поддержка в часовых поясах Европы, Ближнего Востока и США',
        },
        {
          city: 'Отдел Работы с Клиентами и Демонстраций',
          address: 'Онлайн-консультации и персональное демо (RU / EN / UA / HE)',
          tz: 'Ответ ведущего архитектора в течение 15 минут',
        },
      ],
      formTitle: 'Заказать Индивидуальную Архитектуру и Расчет Системы',
      nameLabel: 'Ваше Имя *',
      emailLabel: 'Телефон / WhatsApp / Telegram или Email *',
      businessLabel: 'Название Компании и Сфера Деятельности',
      deliverableLabel: 'Какие Процессы Нужно Объединить?',
      deliverableOptions: [
        'Полная Единая Система Бизнеса (CRM + Сайт + Расписание + Финансы + Кабинет Клиента + Боты)',
        'Индивидуальная CRM, ERP и Автоматизация Внутренних Процессов',
        'Брендированный Кабинет Клиента (Client Area) + Живой Трекинг Заказов',
        'Кастомная Платформа Онлайн-Записи, Сайт и Мессенджер-Автоматизация',
        'Замена Разрозненных Программ на Единую Кастомную Платформу',
      ],
      marketLabel: 'Языки Интерфейса и Валюта Учета',
      marketOptions: [
        'Международный Бизнес / Мультивалютность (USD $ / EUR € / RU / EN)',
        'Европа и Украина (EUR € / UAH ₴ / UA / RU / EN)',
        'Израиль и Ближний Восток (ILS ₪ / USD $ / HE / RU / EN)',
      ],
      notesLabel: 'Опишите Ваши Текущие Процессы и Задачи',
      notesPlaceholder:
        'Какими программами или таблицами вы пользуетесь сейчас и какие процессы хотите закрыть одной системой?',
      submitBtn: 'Получить Архитектуру и Расчет',
      successTitle: 'Запрос Принят в Работу!',
      successText:
        'Ведущий архитектор BryTech уже изучает ваш запрос и свяжется с вами в Telegram, WhatsApp или по телефону в ближайшее время.',
      resetBtn: 'Отправить Еще Один Запрос',
      footerTagline: 'BryTech · Индивидуальные Единые Операционные Системы для Современного Бизнеса',
    },
  },

  he: {
    dir: 'rtl',
    langLabel: 'HE',
    nav: {
      home: 'ראשי',
      about: 'אודותינו',
      capabilities: 'פתרונות',
      calculator: 'תמחור מותאם',
      cases: 'לקוחות',
      clientArea: 'אזור לקוחות',
      contact: 'צור קשר',
    },
    hero: {
      lines: ['מערכת', 'אחת', 'מותאמת', 'אישית', 'לכל', 'העסק'],
      subtitle:
        'אנו מתכננים ובונים מערכת הפעלה דיגיטלית התפורה בדיוק לתהליכי העבודה שלכם — ומאחדים אתר, CRM מותאם אישית, יומן תורים, ERP, אזור לקוחות ואוטומציות למערכת אחת שלמה.',
      ctaPrimary: 'בנו את המערכת שלכם',
      ctaClientArea: 'כניסת לקוחות',
      stats: {
        val1: '100% מותאם',
        label1: 'תפור בדיוק לתהליכי העסק שלך',
        val2: 'הכל במערכת 1',
        label2: 'מחליף 6+ תוכנות ומנויים נפרדים',
        val3: '10–21 ימים',
        label3: 'הטמעה מהירה של ליבת המערכת',
        val4: 'עד 70% חיסכון',
        label4: 'בעלויות תוכנה ותפעול שוטף',
      },
    },
    about: {
      line1: 'מערכת הפעלה',
      line2: 'אחת לעסק',
      tabMission: 'החזון שלנו',
      tabMarkets: 'ארכיטקטורה מותאמת',
      tabAffordability: 'חיסכון ו-ROI',
      textMission:
        'החזון שלנו ברור: כל עסק עובד אחרת, ולכן תוכנות מדף גנריות תמיד מאלצות אתכם להתפשר. אנו בונים לכל לקוח מערכת מותאמת אישית המכסה את כל פעילות העסק מקצה לקצה בתוך פלטפורמה אחת מאוחדת.',
      textMarkets:
        'במקום לעבוד עם תוכנות נפרדות לאתר, ל-CRM, ליומן, למלאי, לשכר ולוואטסאפ — אנו מחברים את כל מחלקות העסק למערכת אחת חכמה עם תמיכה מלאה בריבוי שפות (HE, EN, RU, UA) ואינטגרציות מלאות.',
      textAffordability:
        'באמצעות שילוב של מודולים הנדסיים מוכחים עם התאמה אישית מלאה לחוקי העסק שלכם, אנו מבטלים תשלומים חודשיים לפי משתמש, חוסכים עד 70% בעלויות ומעניקים לכם בעלות מלאה.',
      ctaLearnMore: 'גלו את הארכיטקטורה',
    },
    capabilities: {
      line1: 'המערכת המאוחדת',
      line2: 'של העסק שלך',
      intro:
        'כל זרועות התפעול של החברה שלך — מתוכננות לעבוד יחד בתוך מערכת אחת התפורה בדיוק לצרכים שלך.',
      inspectLabel: 'לפרטים',
      inspectingLabel: 'נבחר',
      specHeader: 'רכיבי ליבת המערכת המותאמת שלך',
      deliverablesTitle: 'מה המערכת מאחדת עבורכם',
      techLabel: 'ארכיטקטורה ואינטגרציות',
      benchmarkLabel: 'אימפקט תפעולי',
      ctaScope: 'הוסף למפרט המערכת שלך',
      items: [
        {
          id: 'websites',
          number: '01.',
          title: 'פלטפורמות ווב מותאמות, זימון תורים וקליטת לקוחות',
          subtitle: 'חזית דיגיטלית המחוברת ישירות לליבת התפעול',
          spanClass: 'lg:col-span-2',
          description:
            'האתר שלכם הוא כבר לא כרטיס ביקור מנותק — אלא שער הכניסה של מערכת ההפעלה העסקית. כל תור, הצעת מחיר או הזמנה זורמים אוטומטית לתוך ה-CRM, היומן והמלאי.',
          metricValue: '+135% המרת לידים',
          metricContext: 'סנכרון ישיר לליבת המערכת ללא הקלדה ידנית',
          deliverables: [
            'עיצוב מוקפד בסגנון Apple המותאם לנייד, טאבלט ומחשב',
            'ממשק רב-לשוני מלא (עברית RTL, אנגלית, רוסית, אוקראינית)',
            'זימון תורים 24/7, מחשבוני שירות אינטראקטיביים וגביית מקדמות',
            'סנכרון חי עם מערכת ה-CRM הפנימית, צוות העובדים והמלאי',
          ],
          stack: 'React · Next.js · מנוע תורים בזמן אמת · סליקה ואינטגרציות תשלום',
        },
        {
          id: 'crm',
          number: '02.',
          title: 'מערכת CRM, ERP וניהול פנים-ארגוני בהתאמה אישית',
          subtitle: 'צנרת מכירות, יומני צוות, עמלות שכר ומלאי במסך אחד',
          spanClass: 'lg:col-span-1',
          description:
            'מערכת הבנויה בדיוק לפי תהליך העבודה שלכם. נהלו לידים, תיקי לקוח, חישוב עמלות עובדים, מלאי ודוחות רווח והפסד ללא תשלום חודשי על כל עובד.',
          metricValue: '$0 דמי מנוי לעובד',
          metricContext: 'ללא הגבלת עובדים, מנהלים או סניפים',
          deliverables: [
            'תהליכי מכירה מותאמים אישית ומשימות אוטומטיות לצוות',
            'תיבת פניות מאוחדת מהאתר, אינסטגרם, וואטסאפ וטלגרם',
            'חישוב שכר, אחוזי עמלות ויעדי KPI אוטומטיים',
            'ניהול פיננסי, הפקת חשבוניות וניכוי מלאי אוטומטי',
          ],
          stack: 'Custom CRM & ERP Core · הרשאות מתקדמות · אנליטיקה פיננסית',
        },
        {
          id: 'client-area',
          number: '03.',
          title: 'אזור לקוחות ממותג (Client Area Portal)',
          subtitle: 'מעקב התקדמות חי, הערות למוצרים וצ׳אט ישיר',
          spanClass: 'lg:col-span-1',
          description:
            'העניקו ללקוחות שלכם אזור אישי יוקרתי שבו הם צופים באחוזי ההתקדמות של ההזמנה או הפרויקט בזמן אמת, מוסיפים הערות למוצרים, צופים במסמכים ומשוחחים בצ׳אט חי.',
          metricValue: '-65% שיחות בירור סטטוס',
          metricContext: 'הלקוחות צופים בהתקדמות ובמסמכים 24/7',
          deliverables: [
            'כניסה אישית מאובטחת עם מד התקדמות חי לכל מוצר ושירות',
            'הוספת הערות על ידי הלקוח עם התראה מיידית למנהל המערכת',
            'ארכיון חוזים, תוכניות, קבלות וחשבוניות מרוכז',
            'צ׳אט חי מובנה בין הלקוח לצוות הפרויקט',
          ],
          stack: 'Client Area Portal · Real-Time WebSockets · כספת מסמכים',
        },
        {
          id: 'automation',
          number: '04.',
          title: 'סוכן AI ואוטומציית WhatsApp ו-Telegram',
          subtitle: 'סינון פניות 24/7, תזכורות חכמות וחיבור למערכות חיצוניות',
          spanClass: 'lg:col-span-2',
          description:
            'חסכו 80% מהעבודה הידנית השוחקת. בוטים חכמים מסייעים למבקרים באתר, מעבירים שיחה לנציג אנושי, שולחים תזכורות לתורים ומפיקים חשבוניות ותעודות משלוח אוטומטית.',
          metricValue: '15+ שעות חיסכון / שבוע',
          metricContext: 'לבעל העסק ולצוות האדמיניסטרציה',
          deliverables: [
            'עוזר AI חכם באתר עם העברה חלקה לשיחה חיה מולכם',
            'תזכורות אוטומטיות בוואטסאפ, טלגרם ו-SMS למניעת אי-הגעות',
            'סנכרון דו-כיווני עם מערכות סליקה, חשבוניות ירוקות, משלוחים ובנקים',
            'התראות מנהלים בזמן אמת על עסקאות חדשות, הערות לקוח וסיכומי הכנסות',
          ],
          stack: 'Gemini AI · WhatsApp Cloud API · Telegram Bot API · Webhook Hub',
        },
      ],
    },
    simulator: {
      line1: 'אדריכל המערכת',
      line2: 'המותאמת שלך',
      intro:
        'בחרו את תחומי התפעול שתרצו לאחד לתוך המערכת המותאמת שלכם. ראו כיצד איחוד כל הפעילות למערכת אחת חוסך עשרות אלפי שקלים.',
      blueprintTag: 'סימולטור אפיון מערכת מאוחדת',
      blueprintTitle: 'מפרט המערכת המאוחדת שלך',
      activeLabel: 'כלול בליבה',
      emptyLayer: 'לא נבחרו מודולים בשכבה זו',
      yourPriceLabel: 'הערכת השקעה במערכת',
      agencyPriceLabel: 'עלות ממוצעת בבתי תוכנה',
      launchTimeLabel: 'זמן הקמה משוער',
      weeksUnit: 'ימים',
      savingsNote: 'מערכת התפורה בדיוק לחוקי העסק שלך עם בעלות מלאה.',
      ctaDeploy: 'בקשו מפרט והצעת מחיר לתצורה זו',
      modules: [
        {
          id: 'mod-web',
          name: 'פלטפורמת ווב וקליטת לקוחות',
          layer: 'Front & Web',
          summary: 'אתר ממיר וטפסים אינטראקטיביים המחוברים ישירות ל-CRM.',
          days: 5,
          brytechCostUsd: 650,
          agencyCostUsd: 2800,
        },
        {
          id: 'mod-crm',
          name: 'ליבת CRM וניהול תפעול מותאם',
          layer: 'CRM & Portal',
          summary: 'תהליכי מכירה, כרטיסי לקוח, משימות צוות ודוחות מנהלים.',
          days: 6,
          brytechCostUsd: 950,
          agencyCostUsd: 4500,
        },
        {
          id: 'mod-portal',
          name: 'אזור לקוחות ממותג (Client Area)',
          layer: 'CRM & Portal',
          summary: 'פורטל אישי ללקוחות עם מעקב התקדמות, הערות וצ׳אט חי.',
          days: 5,
          brytechCostUsd: 850,
          agencyCostUsd: 4200,
        },
        {
          id: 'mod-bot',
          name: 'צ׳אט AI ואוטומציות WhatsApp/Telegram',
          layer: 'Automation & Payments',
          summary: 'סיוע חכם למבקרים 24/7, תזכורות אוטומטיות והתראות.',
          days: 3,
          brytechCostUsd: 450,
          agencyCostUsd: 1900,
        },
        {
          id: 'mod-booking',
          name: 'מנוע זימון תורים וניהול משאבים',
          layer: 'Front & Web',
          summary: 'ניהול יומני צוות, חדרים או צוותי שטח עם גביית מקדמה.',
          days: 3,
          brytechCostUsd: 400,
          agencyCostUsd: 1800,
        },
        {
          id: 'mod-pay',
          name: 'פיננסים, שכר, מלאי וחיבורי API',
          layer: 'Automation & Payments',
          summary: 'חשבוניות אוטומטיות, חישוב עמלות, ניהול מלאי וסליקה.',
          days: 3,
          brytechCostUsd: 450,
          agencyCostUsd: 2200,
        },
      ],
    },
    cases: {
      line1: 'מערכות מאוחדות',
      line2: 'בפעולה',
      filterAll: 'כל המערכות',
      filterUkraine: 'מרפאות ולוגיסטיקה',
      filterIsrael: 'שירותים ופיננסים',
      primaryOutcomeLabel: 'תוצאות מוכחות של מערכות מותאמות אישית',
      operationalImpactLabel: 'חיסכון ויעילות',
      inspectBtn: 'צפו בארכיטקטורת המערכת',
      hideBtn: 'הסתר פרטים',
      studies: [
        {
          id: 'kyiv-clinic',
          market: 'ukraine',
          marketLabel: 'רפואה ומרפאות',
          city: 'מרכז רפואי רב-תחומי',
          year: '2026',
          client: 'Aesthetica Med Clinic',
          title: 'מערכת מאוחדת: אתר + יומן רופאים CRM + אזור מטופל + תזכורות',
          summary:
            'החלפנו 4 תוכנות נפרדות במערכת הפעלה אחת המנהלת זימון תורים, ניהול חדרי טיפול, תוכניות טיפול דיגיטליות ותזכורות אוטומטיות בוואטסאפ ובטלגרם.',
          primaryMetric: '+88% תורים אונליין',
          secondaryMetric: '65% פחות אי-הגעות',
          architectureNotes: [
            'אזור אישי למטופל עם היסטוריית טיפולים ומסמכים רפואיים',
            'תזכורות אוטומטיות 24 ו-2 שעות לפני התור',
            'חישוב אוטומטי של עמלות רופאים וניצולת חדרי טיפול',
          ],
          quote: {
            text: 'במקום לאלץ את הרופאים שלנו לעבוד עם תוכנה גנרית מסורבלת, BryTech בנו מערכת אחת נקייה בדיוק לפי תהליך העבודה שלנו תוך 3 שבועות.',
            author: 'ד"ר אולנה קובלנקו',
            role: 'מייסדת, Aesthetica Med Clinic',
          },
        },
        {
          id: 'tlv-renovation',
          market: 'israel',
          marketLabel: 'בנייה, שיפוצים ועיצוב',
          city: 'קבוצת הנדסה ועיצוב פנים',
          year: '2026',
          client: 'Shaked Interiors & Renovation',
          title: 'מערכת תמחור פרויקטים CRM + ניהול קבלנים + פורטל התקדמות ללקוח',
          summary:
            'פיתחנו פלטפורמה אחת המחברת מחשבון הצעות מחיר, ניהול משימות בשטח, חיוב לפי אבני דרך ואזור לקוח שבו בעלי הנכס עוקבים אחר אחוזי ההתקדמות והתמונות.',
          primaryMetric: '+120% חוזים חתומים',
          secondaryMetric: '14 שעות נחסכות בשבוע על שיחות סטטוס',
          architectureNotes: [
            'אזור לקוח בעברית ואנגלית עם מד התקדמות לכל שלב והערות',
            'בוט וואטסאפ הקולט לידים ומתאם פגישות מדידה אוטומטית',
            'בקרת רווחיות בזמן אמת לכל פרויקט וחשבוניות אוטומטיות',
          ],
          quote: {
            text: 'כל החברה שלנו עובדת היום בתוך מערכת אחת — מהצעת המחיר הראשונה באתר ועד למסירה הסופית באזור הלקוח.',
            author: 'אבי שקד',
            role: 'בעלים, Shaked Interiors',
          },
        },
        {
          id: 'lviv-roasters',
          market: 'ukraine',
          marketLabel: 'הפצה וסיטונאות B2B',
          city: 'חברת ייצור והפצה אזורית',
          year: '2026',
          client: 'Karpaty Craft Coffee & Supply',
          title: 'פורטל הזמנות B2B + ניהול מלאי ERP + אוטומציית משלוחים',
          summary:
            'איחדנו הזמנות מ-180+ עסקים שותפים עם ניהול מלאי בזמן אמת, הפקת תעודות משלוח אוטומטית וחשבוניות מס בתוך מערכת אחת.',
          primaryMetric: 'פי 3.1 עיבוד הזמנות מהיר יותר',
          secondaryMetric: '+74% הזמנות חוזרות מלקוחות עסקיים',
          architectureNotes: [
            'אזור לקוח B2B עם מחירונים מותאמים אישית והזמנה חוזרת בלחיצה',
            'סנכרון ישיר בין מלאי המחסן, תעודות המשלוח והחשבוניות',
            'התראות מלאי נמוך וניהול קווי חלוקה אוטומטי',
          ],
          quote: {
            text: 'בעבר מנהלים הקלידו הזמנות בשלוש תוכנות שונות. היום הכל קורה אוטומטית בתוך הפלטפורמה המאוחדת שלנו.',
            author: 'טראס מלניק',
            role: 'מייסד שותף, Karpaty Craft Supply',
          },
        },
        {
          id: 'haifa-legal',
          market: 'israel',
          marketLabel: 'פיננסים, ראיית חשבון וייעוץ',
          city: 'פירמת ייעוץ וראיית חשבון',
          year: '2025',
          client: 'Carmel Accounting & Advisory',
          title: 'כספת מסמכים רב-לשונית ללקוחות + CRM ניהול מועדי דיווח',
          summary:
            'הקמנו מערכת הפעלה מותאמת שבה 220+ לקוחות עסקיים מעלים מסמכים חודשיים, עוקבים אחר סטטוס דיווחים לרשויות ומתקשרים ישירות עם רואה החשבון.',
          primaryMetric: '220+ לקוחות עסקיים במערכת',
          secondaryMetric: 'איסוף מסמכים מהיר ב-70%',
          architectureNotes: [
            'תזכורות וואטסאפ ו-SMS אוטומטיות להשלמת מסמכים חסרים',
            'לוח בקרה לניהול עומסי עבודה ועמידה ביעדי SLA',
            'ממשק ב-4 שפות (עברית, אנגלית, רוסית, אוקראינית)',
          ],
          quote: {
            text: 'איחוד ה-CRM, איסוף המסמכים והתקשורת עם הלקוחות למערכת אחת הכפיל את יכולת הקליטה של המשרד שלנו.',
            author: 'מרינה כץ',
            role: 'שותפה מנהלת, Carmel Advisory',
          },
        },
      ],
    },
    contact: {
      processTag: 'אפיון מערכת מותאמת אישית ושיחה ישירה',
      processTitle: 'כיצד אנו בונים את המערכת המאוחדת שלך בשבועות, לא בחודשים',
      steps: [
        {
          number: '01.',
          title: 'מיפוי תהליכי העבודה של העסק',
          duration: 'ימים 1–2',
          detail:
            'אנו מנתחים כיצד העסק שלכם פועל היום, אילו תוכנות או אקסלים קיימים, ומתכננים מפרט למערכת אחת המאחדת הכל.',
        },
        {
          number: '02.',
          title: 'פיתוח ליבת המערכת והממשקים',
          duration: 'ימים 3–10',
          detail:
            'אנו מתאימים ובונים עבורכם את ה-CRM, מנוע התורים, מודולי ה-ERP והמלאי, האתר ואזור הלקוחות הממותג.',
        },
        {
          number: '03.',
          title: 'אינטגרציות, סליקה ואוטומציית AI/וואטסאפ',
          duration: 'ימים 11–15',
          detail:
            'מחברים בוטים ב-WhatsApp/Telegram, עוזר AI, סליקה, חשבוניות ומערכות חיצוניות לזרימת מידע אחת.',
        },
        {
          number: '04.',
          title: 'השקה, העברת נתונים והדרכת צוות',
          duration: 'ימים 16–20',
          detail:
            'מעבירים את בסיס הנתונים הקיים שלכם, מדריכים את הצוות תוך שעה ומוסרים לכם שליטה מלאה במערכת החיה.',
        },
      ],
      line1: 'תכננו את',
      line2: 'המערכת שלכם',
      intro:
        'ספרו לנו כיצד העסק שלכם עובד היום. ארכיטקט מערכות בכיר יתכנן עבורכם פלטפורמה מותאמת אישית המאחדת את כל פעילות העסק למקום אחד.',
      hubs: [
        {
          city: 'מרכז הנדסה וארכיטקטורת מערכות בינלאומי',
          address: 'פיתוח מערכות עסקיות מאוחדות בהתאמה אישית · צוותי מו"פ באירופה, ישראל ואוקראינה',
          tz: 'תמיכה חיה בשעון ישראל, אירופה וארה"ב',
        },
        {
          city: 'מוקד אפיון והדגמות ללקוחות',
          address: 'ייעוץ ואפיון מערכת ב-HE / EN / RU / UA',
          tz: 'מענה של ארכיטקט מערכות תוך 15 דקות בשעות הפעילות',
        },
      ],
      formTitle: 'בקשו אפיון מערכת מותאמת אישית והצעת מחיר',
      nameLabel: 'שם מלא *',
      emailLabel: 'טלפון / WhatsApp / Telegram או אימייל *',
      businessLabel: 'שם החברה ותחום פעילות',
      deliverableLabel: 'אילו תהליכים תרצו לאחד למערכת אחת?',
      deliverableOptions: [
        'מערכת הפעלה עסקית מלאה (CRM + אתר + יומן + פיננסים + אזור לקוחות + אוטומציה)',
        'מערכת CRM, ERP ואוטומציה של תהליכים פנימיים',
        'אזור לקוחות ממותג (Client Area) + מעקב פרויקטים והזמנות חי',
        'פלטפורמת זימון תורים, אתר ואוטומציית WhatsApp/Telegram',
        'החלפת תוכנות קיימות במערכת אחת מותאמת אישית (Bespoke R&D)',
      ],
      marketLabel: 'שפות ממשק ומטבע מועדף',
      marketOptions: [
        'ישראל (ILS ₪ / USD $ / HE / EN / RU)',
        'בינלאומי / רב-מטבעי (USD $ / EUR € / EN)',
        'אירופה ואוקראינה (EUR € / UAH ₴ / UA / EN)',
      ],
      notesLabel: 'תארו את תהליכי העבודה והמטרות שלכם',
      notesPlaceholder:
        'באילו תוכנות או טבלאות אתם משתמשים היום, ואילו תהליכים בעסק הייתם רוצים לאחד למערכת אחת?',
      submitBtn: 'שלחו בקשה לאפיון מערכת',
      successTitle: 'פנייתכם התקבלה בהצלחה!',
      successText:
        'ארכיטקט מערכות של BryTech בוחן כעת את הפרטים ויצור אתכם קשר בוואטסאפ, בטלגרם או בטלפון בהקדם.',
      resetBtn: 'שליחת פנייה נוספת',
      footerTagline: 'BryTech · מערכות הפעלה עסקיות מותאמות אישית המאחדות את כל פעילות העסק',
    },
  },
};
