import type { Language } from '../i18n/translations';

/* ------------------------------------------------------------------
 * Business facts — edit here, every page reads from this block.
 * ------------------------------------------------------------------ */
export const CONTACTS = {
  whatsappNumber: '380637127001',
  whatsappDisplay: '+380 63 712 7001',
  telegramHandle: 'Brytech_systems',
  instagramHandle: 'BryTech_Systems',
};

export type PartId = 'website' | 'crm' | 'portal' | 'bots' | 'booking' | 'finance';

/** One-time price (USD) and build time (working days) per part. */
export const PARTS: { id: PartId; priceUsd: number; days: number }[] = [
  { id: 'website', priceUsd: 650, days: 5 },
  { id: 'booking', priceUsd: 400, days: 3 },
  { id: 'crm', priceUsd: 950, days: 6 },
  { id: 'bots', priceUsd: 450, days: 3 },
  { id: 'portal', priceUsd: 850, days: 5 },
  { id: 'finance', priceUsd: 450, days: 3 },
];

export type PresetId = 'start' | 'business' | 'complete';
export const PRESETS: { id: PresetId; parts: PartId[] }[] = [
  { id: 'start', parts: ['website', 'booking', 'bots'] },
  { id: 'business', parts: ['website', 'booking', 'crm', 'bots'] },
  { id: 'complete', parts: ['website', 'booking', 'crm', 'bots', 'portal', 'finance'] },
];

export type Route = 'home' | 'systems' | 'pricing' | 'studio' | 'contact' | 'credits';

/* ------------------------------------------------------------------ */

interface PartCopy {
  name: string;
  title: string;
  body: string;
  bullets: [string, string, string];
}

export interface SiteCopy {
  nav: {
    systems: string;
    pricing: string;
    studio: string;
    contact: string;
    clientArea: string;
    openMenu: string;
    closeMenu: string;
    language: string;
    home: string;
    skip: string;
  };
  actions: {
    primary: string;
    secondary: string;
    founders: string;
    whatsapp: string;
    telegram: string;
  };
  parts: Record<PartId, PartCopy>;
  frag: {
    pickTime: string;
    visits: string;
    vip: string;
    progress: string;
    contract: string;
    week: string;
    invoice: string;
    paid: string;
    commission: string;
    botHi: string;
    clientHi: string;
  };
  mock: {
    company: string;
    nav: [string, string, string, string, string];
    today: string;
    count: string;
    rows: { time: string; name: string; what: string; room: string; status: string; tone: 'ok' | 'bot' | 'paid' | 'new' }[];
    chatTitle: string;
    bot: string;
    chat: { from: 'client' | 'bot'; text: string }[];
    ask: string;
    stats: { k: string; v: string }[];
  };
  home: {
    h1a: string;
    h1b: string;
    lead: string;
    facts: [string, string, string, string];
    partsH2: string;
    partsLead: string;
    processH2: string;
    processLead: string;
    steps: { t: string; b: string }[];
    foundersH2: string;
    foundersLead: string;
  };
  people: {
    boris: { name: string; role: string; line: string; p1: string; p2: string; alt: string };
    danil: { name: string; role: string; line: string; p1: string; p2: string; alt: string };
  };
  close: { h2: string; lead: string };
  footer: { tagline: string; credits: string; trademarks: string; admin: string; pages: string; follow: string };
  systems: {
    h1: string;
    lead: string;
    from: string;
    days: string;
    builtForH2: string;
    builtForLead: string;
    builtForList: string[];
    clinicAlt: string;
    salonAlt: string;
    channelsH2: string;
    channelsLead: string;
  };
  pricing: {
    h1: string;
    lead: string;
    presetsLabel: string;
    presets: Record<PresetId, string>;
    partsLabel: string;
    summary: string;
    total: string;
    time: string;
    daysUnit: string;
    none: string;
    notes: [string, string, string];
    copied: string;
    message: string;
    faqH2: string;
    faq: { q: string; a: string }[];
  };
  studio: {
    h1: string;
    lead: string;
    principlesH2: string;
    principles: { t: string; b: string }[];
  };
  contact: {
    h1: string;
    lead: string;
    channelsLabel: string;
    formTitle: string;
    name: string;
    business: string;
    need: string;
    needOptions: string[];
    message: string;
    errorName: string;
    errorMessage: string;
    sentWhatsApp: string;
    sentTelegram: string;
    intro: string;
  };
  credits: { h1: string; lead: string; back: string };
}

const en: SiteCopy = {
  nav: {
    systems: 'Systems',
    pricing: 'Pricing',
    studio: 'About',
    contact: 'Contact',
    clientArea: 'Client area',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    language: 'Language',
    home: 'BryTech home',
    skip: 'Skip to content',
  },
  actions: {
    primary: 'Get your price',
    secondary: 'Talk to us',
    founders: 'Meet the founders',
    whatsapp: 'Send on WhatsApp',
    telegram: 'Send on Telegram',
  },
  parts: {
    website: {
      name: 'Website',
      title: 'Takes bookings on your website',
      body: 'A fast site in your brand that books visits, takes deposits and sends every lead to your CRM.',
      bullets: ['Designed for your brand, in up to four languages', 'Booking, deposits and enquiry forms built in', 'Every lead lands in your CRM'],
    },
    booking: {
      name: 'Booking',
      title: 'Plans staff, rooms and equipment',
      body: 'One calendar for every specialist and room, with reminders that cut no-shows.',
      bullets: ['Online booking 24 hours a day', 'Staff, rooms and equipment in one calendar', 'Reminders by WhatsApp, Telegram or SMS'],
    },
    crm: {
      name: 'CRM',
      title: 'Keeps every client in one place',
      body: 'Client cards, visit history, sales pipelines and staff tasks, shaped around how your team works.',
      bullets: ['Client cards with full visit history', 'Pipelines and tasks built to your process', 'One inbox for site, Instagram and messengers'],
    },
    bots: {
      name: 'Bots',
      title: 'Answers WhatsApp and Telegram',
      body: 'Bots confirm visits, move bookings and qualify new leads, then hand the chat to a person.',
      bullets: ['Confirms and moves bookings by itself', 'Qualifies new leads before your team replies', 'Hands the chat to a person when needed'],
    },
    portal: {
      name: 'Client portal',
      title: 'Gives your clients their own login',
      body: 'Clients follow progress, read documents and message your team without calling.',
      bullets: ['Live progress for every order or project', 'Contracts and invoices in one place', 'Chat with your team inside the portal'],
    },
    finance: {
      name: 'Finance',
      title: 'Connects payments, payroll and stock',
      body: 'Invoices, staff commissions and stock write-offs are calculated as the work is done.',
      bullets: ['Invoices and payments to your own account', 'Staff commissions calculated for you', 'Stock written off per service'],
    },
  },
  frag: {
    pickTime: 'Pick a time',
    visits: '12 visits',
    vip: 'Regular',
    progress: 'Progress',
    contract: 'Contract.pdf',
    week: 'This week',
    invoice: 'Invoice 1042',
    paid: 'Paid',
    commission: 'Commission',
    botHi: 'Your visit is tomorrow at 10:00. Reply 1 to confirm.',
    clientHi: '1',
  },
  mock: {
    company: 'Your company',
    nav: ['Today', 'Bookings', 'Clients', 'Inbox', 'Payments'],
    today: 'Today',
    count: '18 bookings',
    rows: [
      { time: '09:30', name: 'Anna K.', what: 'Consultation', room: 'Room 2', status: 'Confirmed', tone: 'ok' },
      { time: '11:00', name: 'Mark L.', what: 'Follow-up', room: 'Room 1', status: 'Moved by bot', tone: 'bot' },
      { time: '12:30', name: 'Olga S.', what: 'Treatment', room: 'Room 3', status: 'Deposit paid', tone: 'paid' },
      { time: '15:00', name: 'David R.', what: 'First visit', room: 'Room 2', status: 'New client', tone: 'new' },
    ],
    chatTitle: 'Mark L. · WhatsApp',
    bot: 'Bot',
    chat: [
      { from: 'client', text: 'Can I move my 11:00 to Thursday?' },
      { from: 'bot', text: 'Thursday at 11:30 is free. Shall I move it?' },
      { from: 'client', text: 'Yes, please' },
      { from: 'bot', text: 'Done. See you Thursday at 11:30.' },
    ],
    ask: 'Who has not visited in 6 months?',
    stats: [
      { k: 'Paid today', v: '$2,340' },
      { k: 'No-shows', v: '0' },
    ],
  },
  home: {
    h1a: 'Custom business systems,',
    h1b: 'built around how you work.',
    lead: 'Website, CRM, online booking, client portal and WhatsApp and Telegram bots, designed for your company and built as one platform you own.',
    facts: ['Live in 2 to 5 weeks', 'You own the code', 'No per-seat fees', 'EN · UA · RU · HE'],
    partsH2: 'Six parts. One system.',
    partsLead: 'Choose the parts you need. They share one client list, one calendar and one set of payments, so nothing is typed twice.',
    processH2: 'How a project runs',
    processLead: 'The price is fixed before we start, and you can follow the build as it happens.',
    steps: [
      { t: 'We map your workflow', b: 'A call with Boris to list how your business runs today and what the system should change.' },
      { t: 'We build your system', b: 'Two to five weeks of design and build. You follow every step in your client area.' },
      { t: 'You own what we built', b: 'The code and the data belong to your business, with no per-seat fees as your team grows.' },
    ],
    foundersH2: 'The founders build your system',
    foundersLead: 'You work with the two people who design and write it, from the first call to launch.',
  },
  people: {
    boris: {
      name: 'Boris Brygin',
      role: 'Founder',
      line: '15 years in technology and sales management. Maps your workflow and runs your project.',
      p1: 'Boris has spent more than 15 years between technology and sales management in large companies and projects. He founded BryTech to give growing businesses the kind of systems large companies build for themselves.',
      p2: 'He leads every first call, maps how your business runs and stays your contact until launch.',
      alt: 'Boris Brygin, founder of BryTech',
    },
    danil: {
      name: 'Danil Brygin',
      role: 'Co-founder and CTO',
      line: 'Software engineer. Designs the architecture and builds the AI and automation.',
      p1: 'Danil leads architecture and engineering at BryTech. He builds the AI agents, bots and back-end systems behind every project.',
      p2: 'He keeps each system small and fast, so it stays easy to change as your business grows.',
      alt: 'Danil Brygin, co-founder and CTO of BryTech',
    },
  },
  close: {
    h2: 'Tell us how your business runs.',
    lead: 'We reply with a plan for your system and a fixed price.',
  },
  footer: {
    tagline: 'Custom business systems from Kyiv and Tel Aviv.',
    credits: 'Photographs via Wikimedia Commons',
    trademarks: 'Product names and logos are trademarks of their owners.',
    admin: 'Admin sign-in',
    pages: 'Pages',
    follow: 'Write to us',
  },
  systems: {
    h1: 'Systems we build for service businesses',
    lead: 'Each part works alone or as one platform. Start with what you need now and we connect the rest later.',
    from: 'From',
    days: 'working days',
    builtForH2: 'Built for clinics, salons and studios',
    builtForLead: 'We design for businesses that take bookings and serve their clients in person.',
    builtForList: [
      'Medical and dental clinics',
      'Beauty salons and spas',
      'Fitness and yoga studios',
      'Auto service centres',
      'Law firms and consultancies',
      'Schools and tutors',
    ],
    clinicAlt: 'Treatment chair and instruments in a bright dental room',
    salonAlt: 'Row of leather styling chairs in a hair salon',
    channelsH2: 'Connected to WhatsApp, Telegram and Instagram',
    channelsLead: 'Your clients write where they already are, and every message lands in the same inbox as your bookings.',
  },
  pricing: {
    h1: 'Pricing for your custom system',
    lead: 'Tick the parts you need. The price and build time update as you go.',
    presetsLabel: 'Start from a package',
    presets: { start: 'Start', business: 'Business', complete: 'Complete' },
    partsLabel: 'Parts of your system',
    summary: 'Your system',
    total: 'One-time price',
    time: 'Build time',
    daysUnit: 'working days',
    none: 'Tick at least one part to see a price.',
    notes: ['You own the code and the data', 'No per-seat fees', 'Final price fixed after a short call'],
    copied: 'Your summary is copied. Paste it into the Telegram chat that just opened.',
    message: 'Hello BryTech, I would like a price for this system:',
    faqH2: 'Questions about pricing',
    faq: [
      {
        q: 'Why is the final price fixed after a call?',
        a: 'The prices here are for each part as standard. On the call we check your workflow and fix the price before any work starts.',
      },
      {
        q: 'Who owns the system?',
        a: 'You do. The code and the data belong to your business, and there are no per-seat fees as your team grows.',
      },
      {
        q: 'Do you take a commission on bookings or payments?',
        a: 'No. Payments go straight to your own merchant account, such as Monobank, LiqPay, Bit, Tranzila or Stripe.',
      },
      {
        q: 'Can you move our existing client base?',
        a: 'Yes. We import clients, visit history and services from Excel, Google Sheets or your current CRM at no extra cost.',
      },
    ],
  },
  studio: {
    h1: 'A software studio in Kyiv and Tel Aviv',
    lead: 'BryTech designs and builds custom business systems in English, Ukrainian, Russian and Hebrew.',
    principlesH2: 'How we work with clients',
    principles: [
      { t: 'You own the system', b: 'The code and the data belong to your business.' },
      { t: 'No per-seat fees', b: 'Add staff and branches without paying more each month.' },
      { t: 'One platform', b: 'Website, CRM, bookings and bots share one database.' },
      { t: 'Four languages', b: 'English, Ukrainian, Russian and Hebrew, right to left included.' },
    ],
  },
  contact: {
    h1: 'Contact BryTech',
    lead: 'Write to us on WhatsApp or Telegram, or fill in the form and send it through either one.',
    channelsLabel: 'Direct contacts',
    formTitle: 'Your request',
    name: 'Name',
    business: 'Business',
    need: 'What you need',
    needOptions: ['A full system', 'Website and booking', 'CRM', 'WhatsApp and Telegram bots', 'Client portal', 'Not sure yet'],
    message: 'Message',
    errorName: 'Write your name so we know who to reply to.',
    errorMessage: 'Write a line about your business.',
    sentWhatsApp: 'WhatsApp is open with your request. Press send there and it reaches us.',
    sentTelegram: 'Your request is copied. Paste it into the Telegram chat that just opened.',
    intro: 'Hello BryTech, here is my request:',
  },
  credits: {
    h1: 'Photo credits',
    lead: 'Photographs on this site that BryTech did not take, with their authors and licences.',
    back: 'Back to the home page',
  },
};

const ru: SiteCopy = {
  nav: {
    systems: 'Системы',
    pricing: 'Цены',
    studio: 'О нас',
    contact: 'Контакты',
    clientArea: 'Кабинет клиента',
    openMenu: 'Открыть меню',
    closeMenu: 'Закрыть меню',
    language: 'Язык',
    home: 'Главная BryTech',
    skip: 'Перейти к содержанию',
  },
  actions: {
    primary: 'Узнать цену',
    secondary: 'Написать нам',
    founders: 'Познакомиться с основателями',
    whatsapp: 'Отправить в WhatsApp',
    telegram: 'Отправить в Telegram',
  },
  parts: {
    website: {
      name: 'Сайт',
      title: 'Принимает записи на сайте',
      body: 'Быстрый сайт в вашем стиле: записывает клиентов, берёт предоплату и передаёт каждую заявку в CRM.',
      bullets: ['Дизайн под ваш бренд, до четырёх языков', 'Запись, предоплата и формы заявок', 'Каждая заявка сразу в CRM'],
    },
    booking: {
      name: 'Запись',
      title: 'Планирует сотрудников, кабинеты и оборудование',
      body: 'Один календарь для всех специалистов и кабинетов и напоминания, которые сокращают неявки.',
      bullets: ['Онлайн-запись круглосуточно', 'Сотрудники, кабинеты и оборудование в одном календаре', 'Напоминания в WhatsApp, Telegram или SMS'],
    },
    crm: {
      name: 'CRM',
      title: 'Хранит всех клиентов в одном месте',
      body: 'Карточки клиентов, история визитов, воронки продаж и задачи команды — под то, как работаете вы.',
      bullets: ['Карточки с полной историей визитов', 'Воронки и задачи под ваш процесс', 'Один чат для сайта, Instagram и мессенджеров'],
    },
    bots: {
      name: 'Боты',
      title: 'Отвечает в WhatsApp и Telegram',
      body: 'Боты подтверждают визиты, переносят записи и квалифицируют заявки, а затем передают чат человеку.',
      bullets: ['Сам подтверждает и переносит записи', 'Квалифицирует заявки до ответа команды', 'Передаёт чат человеку, когда нужно'],
    },
    portal: {
      name: 'Кабинет клиента',
      title: 'Даёт клиентам личный кабинет',
      body: 'Клиенты видят ход работ, читают документы и пишут вашей команде без звонков.',
      bullets: ['Ход каждого заказа или проекта онлайн', 'Договоры и счета в одном месте', 'Чат с командой прямо в кабинете'],
    },
    finance: {
      name: 'Финансы',
      title: 'Связывает оплаты, зарплаты и склад',
      body: 'Счета, проценты сотрудников и списания со склада считаются по ходу работы.',
      bullets: ['Счета и оплаты на ваш счёт', 'Расчёт процентов сотрудников', 'Списание материалов за каждую услугу'],
    },
  },
  frag: {
    pickTime: 'Выберите время',
    visits: '12 визитов',
    vip: 'Постоянный',
    progress: 'Готовность',
    contract: 'Договор.pdf',
    week: 'Эта неделя',
    invoice: 'Счёт 1042',
    paid: 'Оплачен',
    commission: 'Процент',
    botHi: 'Ваш визит завтра в 10:00. Ответьте 1, чтобы подтвердить.',
    clientHi: '1',
  },
  mock: {
    company: 'Ваша компания',
    nav: ['Сегодня', 'Записи', 'Клиенты', 'Чаты', 'Оплаты'],
    today: 'Сегодня',
    count: '18 записей',
    rows: [
      { time: '09:30', name: 'Анна К.', what: 'Консультация', room: 'Кабинет 2', status: 'Подтверждено', tone: 'ok' },
      { time: '11:00', name: 'Марк Л.', what: 'Повторный приём', room: 'Кабинет 1', status: 'Перенёс бот', tone: 'bot' },
      { time: '12:30', name: 'Ольга С.', what: 'Процедура', room: 'Кабинет 3', status: 'Предоплата', tone: 'paid' },
      { time: '15:00', name: 'Давид Р.', what: 'Первый визит', room: 'Кабинет 2', status: 'Новый клиент', tone: 'new' },
    ],
    chatTitle: 'Марк Л. · WhatsApp',
    bot: 'Бот',
    chat: [
      { from: 'client', text: 'Можно перенести 11:00 на четверг?' },
      { from: 'bot', text: 'В четверг свободно 11:30. Переносим?' },
      { from: 'client', text: 'Да, спасибо' },
      { from: 'bot', text: 'Готово. Ждём вас в четверг в 11:30.' },
    ],
    ask: 'Кто не был у нас 6 месяцев?',
    stats: [
      { k: 'Оплачено сегодня', v: '$2,340' },
      { k: 'Неявки', v: '0' },
    ],
  },
  home: {
    h1a: 'Индивидуальные системы для бизнеса,',
    h1b: 'построенные под ваши процессы.',
    lead: 'Сайт, CRM, онлайн-запись, кабинет клиента и боты WhatsApp и Telegram — спроектированы для вашей компании и собраны в одну платформу, которая принадлежит вам.',
    facts: ['Запуск за 2–5 недель', 'Код принадлежит вам', 'Без оплаты за сотрудников', 'EN · UA · RU · HE'],
    partsH2: 'Шесть частей. Одна система.',
    partsLead: 'Выберите нужные части. У них общая база клиентов, один календарь и одни оплаты, поэтому ничего не вводится дважды.',
    processH2: 'Как идёт проект',
    processLead: 'Цена фиксируется до начала работ, а за разработкой вы следите в реальном времени.',
    steps: [
      { t: 'Разбираем ваши процессы', b: 'Созвон с Борисом: как бизнес работает сейчас и что должна изменить система.' },
      { t: 'Строим вашу систему', b: 'От двух до пяти недель дизайна и разработки. Каждый шаг виден в кабинете клиента.' },
      { t: 'Система ваша', b: 'Код и данные принадлежат вашему бизнесу, без оплаты за каждого нового сотрудника.' },
    ],
    foundersH2: 'Систему строят основатели',
    foundersLead: 'Вы работаете с теми, кто её проектирует и пишет, от первого звонка до запуска.',
  },
  people: {
    boris: {
      name: 'Борис Брыгин',
      role: 'Основатель',
      line: '15 лет в технологиях и управлении продажами. Разбирает ваши процессы и ведёт проект.',
      p1: 'Борис более 15 лет работает на стыке технологий и управления продажами в крупных компаниях и проектах. Он основал BryTech, чтобы растущий бизнес получил такие же системы, какие крупные компании строят для себя.',
      p2: 'Он проводит каждый первый созвон, разбирает, как работает ваш бизнес, и остаётся на связи до запуска.',
      alt: 'Борис Брыгин, основатель BryTech',
    },
    danil: {
      name: 'Данил Брыгин',
      role: 'Сооснователь и CTO',
      line: 'Инженер-программист. Проектирует архитектуру и создаёт AI и автоматизацию.',
      p1: 'Данил руководит архитектурой и разработкой в BryTech. Он создаёт AI-агентов, ботов и серверную часть каждого проекта.',
      p2: 'Он держит каждую систему компактной и быстрой, чтобы её было легко менять по мере роста бизнеса.',
      alt: 'Данил Брыгин, сооснователь и CTO BryTech',
    },
  },
  close: {
    h2: 'Расскажите, как работает ваш бизнес.',
    lead: 'Мы ответим планом вашей системы и фиксированной ценой.',
  },
  footer: {
    tagline: 'Индивидуальные системы для бизнеса из Киева и Тель-Авива.',
    credits: 'Фотографии с Wikimedia Commons',
    trademarks: 'Названия и логотипы продуктов принадлежат их владельцам.',
    admin: 'Вход для администратора',
    pages: 'Страницы',
    follow: 'Напишите нам',
  },
  systems: {
    h1: 'Системы, которые мы строим для сферы услуг',
    lead: 'Каждая часть работает отдельно или в одной платформе. Начните с нужного сейчас, остальное подключим позже.',
    from: 'От',
    days: 'рабочих дней',
    builtForH2: 'Для клиник, салонов и студий',
    builtForLead: 'Мы проектируем для бизнеса, который записывает клиентов и обслуживает их лично.',
    builtForList: [
      'Медицинские и стоматологические клиники',
      'Салоны красоты и спа',
      'Фитнес- и йога-студии',
      'Автосервисы',
      'Юридические и консалтинговые компании',
      'Школы и репетиторы',
    ],
    clinicAlt: 'Кресло и инструменты в светлом стоматологическом кабинете',
    salonAlt: 'Ряд кожаных кресел в парикмахерской',
    channelsH2: 'Подключено к WhatsApp, Telegram и Instagram',
    channelsLead: 'Клиенты пишут там, где им удобно, а каждое сообщение попадает в тот же чат, что и записи.',
  },
  pricing: {
    h1: 'Цены на вашу систему',
    lead: 'Отметьте нужные части. Цена и срок разработки обновляются сразу.',
    presetsLabel: 'Начните с пакета',
    presets: { start: 'Старт', business: 'Бизнес', complete: 'Полный' },
    partsLabel: 'Части вашей системы',
    summary: 'Ваша система',
    total: 'Разовая цена',
    time: 'Срок разработки',
    daysUnit: 'рабочих дней',
    none: 'Отметьте хотя бы одну часть, чтобы увидеть цену.',
    notes: ['Код и данные принадлежат вам', 'Без оплаты за сотрудников', 'Итоговая цена фиксируется после короткого созвона'],
    copied: 'Описание скопировано. Вставьте его в открывшийся чат Telegram.',
    message: 'Здравствуйте, BryTech. Хочу узнать цену на такую систему:',
    faqH2: 'Вопросы о ценах',
    faq: [
      {
        q: 'Почему итоговая цена фиксируется после созвона?',
        a: 'Здесь указаны стандартные цены каждой части. На созвоне мы разбираем ваши процессы и фиксируем цену до начала работ.',
      },
      {
        q: 'Кому принадлежит система?',
        a: 'Вам. Код и данные принадлежат вашему бизнесу, и нет оплаты за каждого нового сотрудника.',
      },
      {
        q: 'Вы берёте комиссию с записей или оплат?',
        a: 'Нет. Оплаты поступают напрямую на ваш счёт: Monobank, LiqPay, Bit, Tranzila или Stripe.',
      },
      {
        q: 'Можно перенести нашу текущую базу клиентов?',
        a: 'Да. Мы переносим клиентов, историю визитов и услуги из Excel, Google Sheets или вашей CRM без доплаты.',
      },
    ],
  },
  studio: {
    h1: 'Студия разработки в Киеве и Тель-Авиве',
    lead: 'BryTech проектирует и строит индивидуальные системы для бизнеса на английском, украинском, русском и иврите.',
    principlesH2: 'Как мы работаем с клиентами',
    principles: [
      { t: 'Система ваша', b: 'Код и данные принадлежат вашему бизнесу.' },
      { t: 'Без оплаты за сотрудников', b: 'Добавляйте сотрудников и филиалы без роста ежемесячных платежей.' },
      { t: 'Одна платформа', b: 'Сайт, CRM, записи и боты работают с одной базой данных.' },
      { t: 'Четыре языка', b: 'Английский, украинский, русский и иврит, включая письмо справа налево.' },
    ],
  },
  contact: {
    h1: 'Связаться с BryTech',
    lead: 'Напишите нам в WhatsApp или Telegram или заполните форму и отправьте через любой из них.',
    channelsLabel: 'Прямые контакты',
    formTitle: 'Ваш запрос',
    name: 'Имя',
    business: 'Бизнес',
    need: 'Что нужно',
    needOptions: ['Полная система', 'Сайт и запись', 'CRM', 'Боты WhatsApp и Telegram', 'Кабинет клиента', 'Пока не знаю'],
    message: 'Сообщение',
    errorName: 'Напишите имя, чтобы мы знали, кому ответить.',
    errorMessage: 'Напишите пару слов о вашем бизнесе.',
    sentWhatsApp: 'WhatsApp открыт с вашим запросом. Нажмите «Отправить», и он придёт нам.',
    sentTelegram: 'Запрос скопирован. Вставьте его в открывшийся чат Telegram.',
    intro: 'Здравствуйте, BryTech. Мой запрос:',
  },
  credits: {
    h1: 'Авторы фотографий',
    lead: 'Фотографии на сайте, снятые не BryTech, с авторами и лицензиями.',
    back: 'На главную',
  },
};

const uk: SiteCopy = {
  nav: {
    systems: 'Системи',
    pricing: 'Ціни',
    studio: 'Про нас',
    contact: 'Контакти',
    clientArea: 'Кабінет клієнта',
    openMenu: 'Відкрити меню',
    closeMenu: 'Закрити меню',
    language: 'Мова',
    home: 'Головна BryTech',
    skip: 'Перейти до змісту',
  },
  actions: {
    primary: 'Дізнатися ціну',
    secondary: 'Написати нам',
    founders: 'Познайомитися із засновниками',
    whatsapp: 'Надіслати у WhatsApp',
    telegram: 'Надіслати в Telegram',
  },
  parts: {
    website: {
      name: 'Сайт',
      title: 'Приймає записи на сайті',
      body: 'Швидкий сайт у вашому стилі: записує клієнтів, бере передоплату й передає кожну заявку в CRM.',
      bullets: ['Дизайн під ваш бренд, до чотирьох мов', 'Запис, передоплата та форми заявок', 'Кожна заявка одразу в CRM'],
    },
    booking: {
      name: 'Запис',
      title: 'Планує співробітників, кабінети та обладнання',
      body: 'Один календар для всіх фахівців і кабінетів та нагадування, що зменшують неявки.',
      bullets: ['Онлайн-запис цілодобово', 'Співробітники, кабінети й обладнання в одному календарі', 'Нагадування у WhatsApp, Telegram або SMS'],
    },
    crm: {
      name: 'CRM',
      title: 'Тримає всіх клієнтів в одному місці',
      body: 'Картки клієнтів, історія візитів, воронки продажів і задачі команди — під те, як працюєте ви.',
      bullets: ['Картки з повною історією візитів', 'Воронки й задачі під ваш процес', 'Один чат для сайту, Instagram і месенджерів'],
    },
    bots: {
      name: 'Боти',
      title: 'Відповідає у WhatsApp і Telegram',
      body: 'Боти підтверджують візити, переносять записи й кваліфікують заявки, а потім передають чат людині.',
      bullets: ['Сам підтверджує й переносить записи', 'Кваліфікує заявки до відповіді команди', 'Передає чат людині, коли потрібно'],
    },
    portal: {
      name: 'Кабінет клієнта',
      title: 'Дає клієнтам особистий кабінет',
      body: 'Клієнти бачать хід робіт, читають документи й пишуть вашій команді без дзвінків.',
      bullets: ['Хід кожного замовлення чи проєкту онлайн', 'Договори й рахунки в одному місці', 'Чат із командою просто в кабінеті'],
    },
    finance: {
      name: 'Фінанси',
      title: "Пов'язує оплати, зарплати й склад",
      body: 'Рахунки, відсотки співробітників і списання зі складу рахуються під час роботи.',
      bullets: ['Рахунки й оплати на ваш рахунок', 'Розрахунок відсотків співробітників', 'Списання матеріалів за кожну послугу'],
    },
  },
  frag: {
    pickTime: 'Оберіть час',
    visits: '12 візитів',
    vip: 'Постійний',
    progress: 'Готовність',
    contract: 'Договір.pdf',
    week: 'Цей тиждень',
    invoice: 'Рахунок 1042',
    paid: 'Сплачено',
    commission: 'Відсоток',
    botHi: 'Ваш візит завтра о 10:00. Відповідайте 1, щоб підтвердити.',
    clientHi: '1',
  },
  mock: {
    company: 'Ваша компанія',
    nav: ['Сьогодні', 'Записи', 'Клієнти', 'Чати', 'Оплати'],
    today: 'Сьогодні',
    count: '18 записів',
    rows: [
      { time: '09:30', name: 'Анна К.', what: 'Консультація', room: 'Кабінет 2', status: 'Підтверджено', tone: 'ok' },
      { time: '11:00', name: 'Марк Л.', what: 'Повторний прийом', room: 'Кабінет 1', status: 'Переніс бот', tone: 'bot' },
      { time: '12:30', name: 'Ольга С.', what: 'Процедура', room: 'Кабінет 3', status: 'Передоплата', tone: 'paid' },
      { time: '15:00', name: 'Давид Р.', what: 'Перший візит', room: 'Кабінет 2', status: 'Новий клієнт', tone: 'new' },
    ],
    chatTitle: 'Марк Л. · WhatsApp',
    bot: 'Бот',
    chat: [
      { from: 'client', text: 'Можна перенести 11:00 на четвер?' },
      { from: 'bot', text: 'У четвер вільно об 11:30. Переносимо?' },
      { from: 'client', text: 'Так, дякую' },
      { from: 'bot', text: 'Готово. Чекаємо вас у четвер об 11:30.' },
    ],
    ask: 'Хто не був у нас 6 місяців?',
    stats: [
      { k: 'Сплачено сьогодні', v: '$2,340' },
      { k: 'Неявки', v: '0' },
    ],
  },
  home: {
    h1a: 'Індивідуальні системи для бізнесу,',
    h1b: 'побудовані під ваші процеси.',
    lead: 'Сайт, CRM, онлайн-запис, кабінет клієнта та боти WhatsApp і Telegram — спроєктовані для вашої компанії та зібрані в одну платформу, яка належить вам.',
    facts: ['Запуск за 2–5 тижнів', 'Код належить вам', 'Без оплати за співробітників', 'EN · UA · RU · HE'],
    partsH2: 'Шість частин. Одна система.',
    partsLead: 'Оберіть потрібні частини. У них спільна база клієнтів, один календар і одні оплати, тож нічого не вводиться двічі.',
    processH2: 'Як іде проєкт',
    processLead: 'Ціна фіксується до початку робіт, а за розробкою ви стежите в реальному часі.',
    steps: [
      { t: 'Розбираємо ваші процеси', b: 'Дзвінок із Борисом: як бізнес працює зараз і що має змінити система.' },
      { t: 'Будуємо вашу систему', b: 'Від двох до п’яти тижнів дизайну й розробки. Кожен крок видно в кабінеті клієнта.' },
      { t: 'Система ваша', b: 'Код і дані належать вашому бізнесу, без оплати за кожного нового співробітника.' },
    ],
    foundersH2: 'Систему будують засновники',
    foundersLead: 'Ви працюєте з тими, хто її проєктує та пише, від першого дзвінка до запуску.',
  },
  people: {
    boris: {
      name: 'Борис Бригін',
      role: 'Засновник',
      line: '15 років у технологіях і управлінні продажами. Розбирає ваші процеси та веде проєкт.',
      p1: 'Борис понад 15 років працює на перетині технологій і управління продажами у великих компаніях і проєктах. Він заснував BryTech, щоб бізнес, що росте, отримав такі ж системи, які великі компанії будують для себе.',
      p2: 'Він проводить кожен перший дзвінок, розбирає, як працює ваш бізнес, і залишається на зв’язку до запуску.',
      alt: 'Борис Бригін, засновник BryTech',
    },
    danil: {
      name: 'Даніл Бригін',
      role: 'Співзасновник і CTO',
      line: 'Інженер-програміст. Проєктує архітектуру та створює AI й автоматизацію.',
      p1: 'Даніл керує архітектурою та розробкою в BryTech. Він створює AI-агентів, ботів і серверну частину кожного проєкту.',
      p2: 'Він тримає кожну систему компактною та швидкою, щоб її було легко змінювати, коли бізнес росте.',
      alt: 'Даніл Бригін, співзасновник і CTO BryTech',
    },
  },
  close: {
    h2: 'Розкажіть, як працює ваш бізнес.',
    lead: 'Ми відповімо планом вашої системи та фіксованою ціною.',
  },
  footer: {
    tagline: 'Індивідуальні системи для бізнесу з Києва та Тель-Авіва.',
    credits: 'Фотографії з Wikimedia Commons',
    trademarks: 'Назви та логотипи продуктів належать їхнім власникам.',
    admin: 'Вхід для адміністратора',
    pages: 'Сторінки',
    follow: 'Напишіть нам',
  },
  systems: {
    h1: 'Системи, які ми будуємо для сфери послуг',
    lead: 'Кожна частина працює окремо або в одній платформі. Почніть із потрібного зараз, решту підключимо пізніше.',
    from: 'Від',
    days: 'робочих днів',
    builtForH2: 'Для клінік, салонів і студій',
    builtForLead: 'Ми проєктуємо для бізнесу, який записує клієнтів і обслуговує їх особисто.',
    builtForList: [
      'Медичні та стоматологічні клініки',
      'Салони краси та спа',
      'Фітнес- і йога-студії',
      'Автосервіси',
      'Юридичні та консалтингові компанії',
      'Школи та репетитори',
    ],
    clinicAlt: 'Крісло та інструменти у світлому стоматологічному кабінеті',
    salonAlt: 'Ряд шкіряних крісел у перукарні',
    channelsH2: 'Підключено до WhatsApp, Telegram та Instagram',
    channelsLead: 'Клієнти пишуть там, де їм зручно, а кожне повідомлення потрапляє в той самий чат, що й записи.',
  },
  pricing: {
    h1: 'Ціни на вашу систему',
    lead: 'Позначте потрібні частини. Ціна й термін розробки оновлюються одразу.',
    presetsLabel: 'Почніть із пакета',
    presets: { start: 'Старт', business: 'Бізнес', complete: 'Повний' },
    partsLabel: 'Частини вашої системи',
    summary: 'Ваша система',
    total: 'Разова ціна',
    time: 'Термін розробки',
    daysUnit: 'робочих днів',
    none: 'Позначте хоча б одну частину, щоб побачити ціну.',
    notes: ['Код і дані належать вам', 'Без оплати за співробітників', 'Остаточна ціна фіксується після короткого дзвінка'],
    copied: 'Опис скопійовано. Вставте його у відкритий чат Telegram.',
    message: 'Вітаю, BryTech. Хочу дізнатися ціну на таку систему:',
    faqH2: 'Питання про ціни',
    faq: [
      {
        q: 'Чому остаточна ціна фіксується після дзвінка?',
        a: 'Тут указані стандартні ціни кожної частини. На дзвінку ми розбираємо ваші процеси й фіксуємо ціну до початку робіт.',
      },
      {
        q: 'Кому належить система?',
        a: 'Вам. Код і дані належать вашому бізнесу, і немає оплати за кожного нового співробітника.',
      },
      {
        q: 'Ви берете комісію із записів чи оплат?',
        a: 'Ні. Оплати надходять напряму на ваш рахунок: Monobank, LiqPay, Bit, Tranzila або Stripe.',
      },
      {
        q: 'Чи можна перенести нашу поточну базу клієнтів?',
        a: 'Так. Ми переносимо клієнтів, історію візитів і послуги з Excel, Google Sheets або вашої CRM без доплати.',
      },
    ],
  },
  studio: {
    h1: 'Студія розробки в Києві та Тель-Авіві',
    lead: 'BryTech проєктує та будує індивідуальні системи для бізнесу англійською, українською, російською та івритом.',
    principlesH2: 'Як ми працюємо з клієнтами',
    principles: [
      { t: 'Система ваша', b: 'Код і дані належать вашому бізнесу.' },
      { t: 'Без оплати за співробітників', b: 'Додавайте співробітників і філії без зростання щомісячних платежів.' },
      { t: 'Одна платформа', b: 'Сайт, CRM, записи й боти працюють з однією базою даних.' },
      { t: 'Чотири мови', b: 'Англійська, українська, російська та іврит, зокрема письмо справа наліво.' },
    ],
  },
  contact: {
    h1: 'Зв’язатися з BryTech',
    lead: 'Напишіть нам у WhatsApp чи Telegram або заповніть форму й надішліть через будь-який із них.',
    channelsLabel: 'Прямі контакти',
    formTitle: 'Ваш запит',
    name: 'Ім’я',
    business: 'Бізнес',
    need: 'Що потрібно',
    needOptions: ['Повна система', 'Сайт і запис', 'CRM', 'Боти WhatsApp і Telegram', 'Кабінет клієнта', 'Поки не знаю'],
    message: 'Повідомлення',
    errorName: 'Напишіть ім’я, щоб ми знали, кому відповісти.',
    errorMessage: 'Напишіть кілька слів про ваш бізнес.',
    sentWhatsApp: 'WhatsApp відкрито з вашим запитом. Натисніть «Надіслати», і він надійде нам.',
    sentTelegram: 'Запит скопійовано. Вставте його у відкритий чат Telegram.',
    intro: 'Вітаю, BryTech. Мій запит:',
  },
  credits: {
    h1: 'Автори фотографій',
    lead: 'Фотографії на сайті, зняті не BryTech, з авторами та ліцензіями.',
    back: 'На головну',
  },
};

const he: SiteCopy = {
  nav: {
    systems: 'מערכות',
    pricing: 'מחירים',
    studio: 'אודות',
    contact: 'צור קשר',
    clientArea: 'אזור לקוחות',
    openMenu: 'פתיחת תפריט',
    closeMenu: 'סגירת תפריט',
    language: 'שפה',
    home: 'דף הבית של BryTech',
    skip: 'דלג לתוכן',
  },
  actions: {
    primary: 'קבלו הצעת מחיר',
    secondary: 'דברו איתנו',
    founders: 'הכירו את המייסדים',
    whatsapp: 'שליחה בוואטסאפ',
    telegram: 'שליחה בטלגרם',
  },
  parts: {
    website: {
      name: 'אתר',
      title: 'מקבל הזמנות באתר שלכם',
      body: 'אתר מהיר בעיצוב המותג שלכם שקובע תורים, גובה מקדמות ומעביר כל פנייה ל-CRM.',
      bullets: ['עיצוב למותג שלכם, עד ארבע שפות', 'הזמנת תורים, מקדמות וטופסי פנייה', 'כל פנייה נכנסת ישר ל-CRM'],
    },
    booking: {
      name: 'יומן תורים',
      title: 'מתכנן צוות, חדרים וציוד',
      body: 'יומן אחד לכל המטפלים והחדרים, עם תזכורות שמצמצמות אי-הגעות.',
      bullets: ['הזמנת תורים אונליין מסביב לשעון', 'צוות, חדרים וציוד ביומן אחד', 'תזכורות בוואטסאפ, בטלגרם או ב-SMS'],
    },
    crm: {
      name: 'CRM',
      title: 'שומר את כל הלקוחות במקום אחד',
      body: 'כרטיסי לקוח, היסטוריית ביקורים, משפכי מכירה ומשימות צוות, לפי הדרך שבה אתם עובדים.',
      bullets: ['כרטיסי לקוח עם היסטוריה מלאה', 'משפכים ומשימות לפי התהליך שלכם', "תיבה אחת לאתר, לאינסטגרם ולצ'אטים"],
    },
    bots: {
      name: 'בוטים',
      title: 'עונה בוואטסאפ ובטלגרם',
      body: "בוטים מאשרים ביקורים, מזיזים תורים ומסננים פניות חדשות, ואז מעבירים את הצ'אט לאדם.",
      bullets: ['מאשר ומזיז תורים בעצמו', 'מסנן פניות לפני שהצוות עונה', "מעביר את הצ'אט לאדם כשצריך"],
    },
    portal: {
      name: 'אזור לקוחות',
      title: 'נותן ללקוחות כניסה אישית',
      body: 'הלקוחות עוקבים אחרי ההתקדמות, קוראים מסמכים וכותבים לצוות בלי להתקשר.',
      bullets: ['התקדמות חיה לכל הזמנה או פרויקט', 'חוזים וחשבוניות במקום אחד', "צ'אט עם הצוות בתוך האזור האישי"],
    },
    finance: {
      name: 'כספים',
      title: 'מחבר תשלומים, שכר ומלאי',
      body: 'חשבוניות, עמלות צוות והורדות מלאי מחושבות תוך כדי העבודה.',
      bullets: ['חשבוניות ותשלומים לחשבון שלכם', 'חישוב עמלות לצוות', 'הורדת חומרים מהמלאי לכל טיפול'],
    },
  },
  frag: {
    pickTime: 'בחרו שעה',
    visits: '12 ביקורים',
    vip: 'לקוח קבוע',
    progress: 'התקדמות',
    contract: 'חוזה.pdf',
    week: 'השבוע',
    invoice: 'חשבונית 1042',
    paid: 'שולם',
    commission: 'עמלה',
    botHi: 'הביקור שלך מחר ב-10:00. השב 1 לאישור.',
    clientHi: '1',
  },
  mock: {
    company: 'החברה שלכם',
    nav: ['היום', 'תורים', 'לקוחות', "צ'אטים", 'תשלומים'],
    today: 'היום',
    count: '18 תורים',
    rows: [
      { time: '09:30', name: 'אנה ק.', what: 'ייעוץ', room: 'חדר 2', status: 'מאושר', tone: 'ok' },
      { time: '11:00', name: 'מרק ל.', what: 'ביקור חוזר', room: 'חדר 1', status: 'הוזז ע״י בוט', tone: 'bot' },
      { time: '12:30', name: 'אולגה ס.', what: 'טיפול', room: 'חדר 3', status: 'מקדמה שולמה', tone: 'paid' },
      { time: '15:00', name: 'דוד ר.', what: 'ביקור ראשון', room: 'חדר 2', status: 'לקוח חדש', tone: 'new' },
    ],
    chatTitle: 'מרק ל. · וואטסאפ',
    bot: 'בוט',
    chat: [
      { from: 'client', text: 'אפשר להזיז את 11:00 ליום חמישי?' },
      { from: 'bot', text: 'ביום חמישי פנוי ב-11:30. להזיז?' },
      { from: 'client', text: 'כן, תודה' },
      { from: 'bot', text: 'בוצע. נתראה ביום חמישי ב-11:30.' },
    ],
    ask: 'מי לא ביקר אצלנו 6 חודשים?',
    stats: [
      { k: 'שולם היום', v: '$2,340' },
      { k: 'אי-הגעות', v: '0' },
    ],
  },
  home: {
    h1a: 'מערכות עסקיות בהתאמה אישית,',
    h1b: 'שנבנות סביב הדרך שבה אתם עובדים.',
    lead: 'אתר, CRM, הזמנת תורים אונליין, אזור לקוחות ובוטים לוואטסאפ ולטלגרם, שמתוכננים לחברה שלכם ונבנים כפלטפורמה אחת בבעלותכם.',
    facts: ['עלייה לאוויר תוך 2–5 שבועות', 'הקוד בבעלותכם', 'בלי תשלום לפי משתמש', 'EN · UA · RU · HE'],
    partsH2: 'שישה חלקים. מערכת אחת.',
    partsLead: 'בחרו את החלקים שאתם צריכים. יש להם רשימת לקוחות אחת, יומן אחד ותשלומים אחדים, כך ששום דבר לא מוקלד פעמיים.',
    processH2: 'איך מתנהל פרויקט',
    processLead: 'המחיר נקבע לפני שמתחילים, ואתם רואים את הבנייה בזמן אמת.',
    steps: [
      { t: 'ממפים את התהליכים שלכם', b: 'שיחה עם בוריס: איך העסק עובד היום ומה המערכת צריכה לשנות.' },
      { t: 'בונים את המערכת שלכם', b: 'שבועיים עד חמישה שבועות של עיצוב ופיתוח. כל שלב גלוי באזור הלקוחות.' },
      { t: 'המערכת שלכם', b: 'הקוד והנתונים שייכים לעסק שלכם, בלי תשלום על כל עובד חדש.' },
    ],
    foundersH2: 'המייסדים בונים את המערכת שלכם',
    foundersLead: 'אתם עובדים עם שני האנשים שמתכננים וכותבים אותה, מהשיחה הראשונה ועד העלייה לאוויר.',
  },
  people: {
    boris: {
      name: 'בוריס בריגין',
      role: 'מייסד',
      line: '15 שנה בטכנולוגיה ובניהול מכירות. ממפה את התהליכים שלכם ומנהל את הפרויקט.',
      p1: 'בוריס עובד יותר מ-15 שנה בין טכנולוגיה לניהול מכירות בחברות ובפרויקטים גדולים. הוא ייסד את BryTech כדי לתת לעסקים צומחים את סוג המערכות שחברות גדולות בונות לעצמן.',
      p2: 'הוא מוביל כל שיחה ראשונה, ממפה איך העסק שלכם עובד ונשאר איש הקשר שלכם עד העלייה לאוויר.',
      alt: 'בוריס בריגין, מייסד BryTech',
    },
    danil: {
      name: 'דניל בריגין',
      role: 'מייסד-שותף ו-CTO',
      line: 'מהנדס תוכנה. מתכנן את הארכיטקטורה ובונה את ה-AI והאוטומציה.',
      p1: 'דניל מוביל את הארכיטקטורה והפיתוח ב-BryTech. הוא בונה את סוכני ה-AI, הבוטים ומערכות השרת של כל פרויקט.',
      p2: 'הוא שומר כל מערכת קטנה ומהירה, כך שקל לשנות אותה כשהעסק גדל.',
      alt: 'דניל בריגין, מייסד-שותף ו-CTO של BryTech',
    },
  },
  close: {
    h2: 'ספרו לנו איך העסק שלכם עובד.',
    lead: 'נחזור אליכם עם תוכנית למערכת ומחיר קבוע.',
  },
  footer: {
    tagline: 'מערכות עסקיות בהתאמה אישית מקייב ומתל אביב.',
    credits: 'צילומים מוויקישיתוף',
    trademarks: 'שמות המוצרים והלוגואים שייכים לבעליהם.',
    admin: 'כניסת מנהל',
    pages: 'עמודים',
    follow: 'כתבו לנו',
  },
  systems: {
    h1: 'מערכות שאנחנו בונים לעסקי שירות',
    lead: 'כל חלק עובד לבד או כפלטפורמה אחת. התחילו במה שצריך עכשיו, ואת השאר נחבר בהמשך.',
    from: 'החל מ-',
    days: 'ימי עבודה',
    builtForH2: 'נבנה למרפאות, סלונים וסטודיו',
    builtForLead: 'אנחנו מתכננים לעסקים שקובעים תורים ומשרתים את הלקוחות פנים אל פנים.',
    builtForList: [
      'מרפאות רפואיות ומרפאות שיניים',
      'סלוני יופי וספא',
      'סטודיו לכושר וליוגה',
      'מוסכים ומרכזי שירות לרכב',
      'משרדי עורכי דין וייעוץ',
      'בתי ספר ומורים פרטיים',
    ],
    clinicAlt: 'כיסא טיפולים וכלים בחדר שיניים מואר',
    salonAlt: 'שורת כיסאות עור בסלון שיער',
    channelsH2: 'מחובר לוואטסאפ, לטלגרם ולאינסטגרם',
    channelsLead: 'הלקוחות כותבים איפה שנוח להם, וכל הודעה נוחתת באותה תיבה שבה נמצאים התורים.',
  },
  pricing: {
    h1: 'מחירים למערכת שלכם',
    lead: 'סמנו את החלקים שאתם צריכים. המחיר וזמן הבנייה מתעדכנים מיד.',
    presetsLabel: 'התחילו מחבילה',
    presets: { start: 'התחלה', business: 'עסקי', complete: 'מלא' },
    partsLabel: 'חלקי המערכת שלכם',
    summary: 'המערכת שלכם',
    total: 'מחיר חד-פעמי',
    time: 'זמן בנייה',
    daysUnit: 'ימי עבודה',
    none: 'סמנו לפחות חלק אחד כדי לראות מחיר.',
    notes: ['הקוד והנתונים בבעלותכם', 'בלי תשלום לפי משתמש', 'המחיר הסופי נקבע אחרי שיחה קצרה'],
    copied: "הסיכום הועתק. הדביקו אותו בצ'אט הטלגרם שנפתח.",
    message: 'שלום BryTech, אשמח להצעת מחיר למערכת הזו:',
    faqH2: 'שאלות על המחירים',
    faq: [
      {
        q: 'למה המחיר הסופי נקבע אחרי שיחה?',
        a: 'המחירים כאן הם המחיר הרגיל של כל חלק. בשיחה אנחנו בודקים את התהליכים שלכם וקובעים את המחיר לפני שמתחילים לעבוד.',
      },
      {
        q: 'למי שייכת המערכת?',
        a: 'לכם. הקוד והנתונים שייכים לעסק שלכם, ואין תשלום על כל עובד חדש.',
      },
      {
        q: 'אתם לוקחים עמלה על תורים או תשלומים?',
        a: 'לא. התשלומים נכנסים ישירות לחשבון הסליקה שלכם, כמו Bit, Tranzila, Meshulam או Stripe.',
      },
      {
        q: 'אפשר להעביר את מאגר הלקוחות הקיים שלנו?',
        a: 'כן. אנחנו מייבאים לקוחות, היסטוריית ביקורים ושירותים מאקסל, מ-Google Sheets או מה-CRM הנוכחי שלכם ללא עלות נוספת.',
      },
    ],
  },
  studio: {
    h1: 'סטודיו לתוכנה בקייב ובתל אביב',
    lead: 'BryTech מתכננת ובונה מערכות עסקיות בהתאמה אישית באנגלית, באוקראינית, ברוסית ובעברית.',
    principlesH2: 'איך אנחנו עובדים עם לקוחות',
    principles: [
      { t: 'המערכת שלכם', b: 'הקוד והנתונים שייכים לעסק שלכם.' },
      { t: 'בלי תשלום לפי משתמש', b: 'הוסיפו עובדים וסניפים בלי לשלם יותר כל חודש.' },
      { t: 'פלטפורמה אחת', b: 'האתר, ה-CRM, התורים והבוטים עובדים על מסד נתונים אחד.' },
      { t: 'ארבע שפות', b: 'אנגלית, אוקראינית, רוסית ועברית, כולל כתיבה מימין לשמאל.' },
    ],
  },
  contact: {
    h1: 'צרו קשר עם BryTech',
    lead: 'כתבו לנו בוואטסאפ או בטלגרם, או מלאו את הטופס ושלחו דרך אחד מהם.',
    channelsLabel: 'פרטי קשר ישירים',
    formTitle: 'הפנייה שלכם',
    name: 'שם',
    business: 'עסק',
    need: 'מה אתם צריכים',
    needOptions: ['מערכת מלאה', 'אתר ויומן תורים', 'CRM', 'בוטים לוואטסאפ ולטלגרם', 'אזור לקוחות', 'עוד לא בטוחים'],
    message: 'הודעה',
    errorName: 'כתבו את שמכם כדי שנדע למי לענות.',
    errorMessage: 'כתבו שורה על העסק שלכם.',
    sentWhatsApp: 'וואטסאפ נפתח עם הפנייה שלכם. לחצו שם על שליחה והיא תגיע אלינו.',
    sentTelegram: "הפנייה הועתקה. הדביקו אותה בצ'אט הטלגרם שנפתח.",
    intro: 'שלום BryTech, הנה הפנייה שלי:',
  },
  credits: {
    h1: 'קרדיטים לצילומים',
    lead: 'צילומים באתר שלא צולמו על ידי BryTech, עם הצלמים והרישיונות.',
    back: 'חזרה לדף הבית',
  },
};

export const COPY: Record<Language, SiteCopy> = { en, ru, uk, he };

export const LANGS: { id: Language; label: string; short: string }[] = [
  { id: 'en', label: 'English', short: 'EN' },
  { id: 'uk', label: 'Українська', short: 'UA' },
  { id: 'ru', label: 'Русский', short: 'RU' },
  { id: 'he', label: 'עברית', short: 'HE' },
];

export const PHOTO_CREDITS = [
  {
    file: '/img/clinic.jpg',
    title: 'Dental treatment room featuring equipment and a chair in a modern clinic',
    by: 'Shixart1985',
    licence: 'CC BY 2.0',
    licenceUrl: 'https://creativecommons.org/licenses/by/2.0',
    page: 'https://commons.wikimedia.org/wiki/File:Dental_treatment_room_featuring_equipment_and_a_chair_in_a_modern_clinic.jpg',
  },
  {
    file: '/img/salon.jpg',
    title: 'Hair salon, Arlington, MA',
    by: 'Daderot',
    licence: 'CC0',
    licenceUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
    page: 'https://commons.wikimedia.org/wiki/File:Hair_salon_-_Arlington,_MA.jpg',
  },
];
