import type { Language } from '../i18n/translations';

/* Labels inside the product mockups (illustrative UI) and the About page. */

export type Src = 'whatsapp' | 'instagram' | 'telegram' | 'stripe' | 'website' | 'sheets';

export interface MockCopy {
  live: string;
  company: string;
  nav: string[];
  apps: string;
  synced: string;
  kpis: { k: string; v: string; d: string }[];
  leadsBy: string;
  schedule: string;
  now: string;
  rooms: string[];
  feed: string;
  events: { src: Src; text: string; to: string }[];
  ask: string;
  answer: string;
  answerAction: string;
  search: string;
}

export interface AboutCopy {
  label: string;
  cities: [string, string];
  localTime: string;
  facts: { v: string; l: string }[];
  index: [string, string];
  focus: { boris: [string, string, string]; danil: [string, string, string] };
  own: { from: string; to: string };
  seats: { label: string; price: string };
}

const EVENTS_EN: MockCopy['events'] = [
  { src: 'whatsapp', text: 'Mark L. moved 11:00 → Thu 11:30', to: 'Booking' },
  { src: 'instagram', text: 'New lead: “Price for a first visit?”', to: 'CRM' },
  { src: 'stripe', text: 'Deposit paid · $40 · Olga S.', to: 'Invoice 1043' },
  { src: 'telegram', text: 'Reminders sent to 12 clients', to: 'Bots' },
  { src: 'website', text: 'Online booking · David R. · 15:00', to: 'Calendar' },
  { src: 'sheets', text: 'Stock synced · 3 items running low', to: 'Finance' },
];

export const MOCK: Record<Language, MockCopy> = {
  en: {
    live: 'Live',
    company: 'Your company',
    nav: ['Today', 'Bookings', 'Clients', 'Inbox', 'Payments', 'Staff', 'Stock', 'Reports', 'Bots'],
    apps: 'Connected apps',
    synced: 'Synced',
    kpis: [
      { k: 'Bookings today', v: '18', d: '+3' },
      { k: 'Paid today', v: '$2,340', d: '+12%' },
      { k: 'New leads', v: '7', d: 'IG 3 · WA 2 · Web 2' },
      { k: 'No-shows', v: '0', d: 'Reminders on' },
    ],
    leadsBy: 'by channel',
    schedule: 'Schedule',
    now: 'Now',
    rooms: ['Room 1', 'Room 2', 'Room 3', 'Online'],
    feed: 'Live activity',
    events: EVENTS_EN,
    ask: 'Who has not visited in 6 months?',
    answer: '23 clients found',
    answerAction: 'Send WhatsApp offer',
    search: 'Search clients, bookings, invoices',
  },
  ru: {
    live: 'Онлайн',
    company: 'Ваша компания',
    nav: ['Сегодня', 'Записи', 'Клиенты', 'Чаты', 'Оплаты', 'Персонал', 'Склад', 'Отчёты', 'Боты'],
    apps: 'Подключено',
    synced: 'Синхр.',
    kpis: [
      { k: 'Записей сегодня', v: '18', d: '+3' },
      { k: 'Оплачено сегодня', v: '$2,340', d: '+12%' },
      { k: 'Новые заявки', v: '7', d: 'IG 3 · WA 2 · Сайт 2' },
      { k: 'Неявки', v: '0', d: 'Напоминания вкл.' },
    ],
    leadsBy: 'по каналам',
    schedule: 'Расписание',
    now: 'Сейчас',
    rooms: ['Кабинет 1', 'Кабинет 2', 'Кабинет 3', 'Онлайн'],
    feed: 'Активность',
    events: [
      { src: 'whatsapp', text: 'Марк Л. перенёс 11:00 → чт 11:30', to: 'Запись' },
      { src: 'instagram', text: 'Новая заявка: «Сколько стоит первый визит?»', to: 'CRM' },
      { src: 'stripe', text: 'Предоплата · $40 · Ольга С.', to: 'Счёт 1043' },
      { src: 'telegram', text: 'Напоминания отправлены 12 клиентам', to: 'Боты' },
      { src: 'website', text: 'Запись онлайн · Давид Р. · 15:00', to: 'Календарь' },
      { src: 'sheets', text: 'Склад синхронизирован · 3 позиции заканчиваются', to: 'Финансы' },
    ],
    ask: 'Кто не был у нас 6 месяцев?',
    answer: 'Найдено 23 клиента',
    answerAction: 'Отправить предложение в WhatsApp',
    search: 'Поиск клиентов, записей, счетов',
  },
  uk: {
    live: 'Онлайн',
    company: 'Ваша компанія',
    nav: ['Сьогодні', 'Записи', 'Клієнти', 'Чати', 'Оплати', 'Персонал', 'Склад', 'Звіти', 'Боти'],
    apps: 'Підключено',
    synced: 'Синхр.',
    kpis: [
      { k: 'Записів сьогодні', v: '18', d: '+3' },
      { k: 'Сплачено сьогодні', v: '$2,340', d: '+12%' },
      { k: 'Нові заявки', v: '7', d: 'IG 3 · WA 2 · Сайт 2' },
      { k: 'Неявки', v: '0', d: 'Нагадування увімк.' },
    ],
    leadsBy: 'за каналами',
    schedule: 'Розклад',
    now: 'Зараз',
    rooms: ['Кабінет 1', 'Кабінет 2', 'Кабінет 3', 'Онлайн'],
    feed: 'Активність',
    events: [
      { src: 'whatsapp', text: 'Марк Л. переніс 11:00 → чт 11:30', to: 'Запис' },
      { src: 'instagram', text: 'Нова заявка: «Скільки коштує перший візит?»', to: 'CRM' },
      { src: 'stripe', text: 'Передоплата · $40 · Ольга С.', to: 'Рахунок 1043' },
      { src: 'telegram', text: 'Нагадування надіслано 12 клієнтам', to: 'Боти' },
      { src: 'website', text: 'Запис онлайн · Давид Р. · 15:00', to: 'Календар' },
      { src: 'sheets', text: 'Склад синхронізовано · 3 позиції закінчуються', to: 'Фінанси' },
    ],
    ask: 'Хто не був у нас 6 місяців?',
    answer: 'Знайдено 23 клієнти',
    answerAction: 'Надіслати пропозицію у WhatsApp',
    search: 'Пошук клієнтів, записів, рахунків',
  },
  he: {
    live: 'פעיל',
    company: 'החברה שלכם',
    nav: ['היום', 'תורים', 'לקוחות', "צ'אטים", 'תשלומים', 'צוות', 'מלאי', 'דוחות', 'בוטים'],
    apps: 'אפליקציות מחוברות',
    synced: 'מסונכרן',
    kpis: [
      { k: 'תורים היום', v: '18', d: '+3' },
      { k: 'שולם היום', v: '$2,340', d: '+12%' },
      { k: 'פניות חדשות', v: '7', d: 'IG 3 · WA 2 · אתר 2' },
      { k: 'אי-הגעות', v: '0', d: 'תזכורות פעילות' },
    ],
    leadsBy: 'לפי ערוץ',
    schedule: 'לוח זמנים',
    now: 'עכשיו',
    rooms: ['חדר 1', 'חדר 2', 'חדר 3', 'אונליין'],
    feed: 'פעילות חיה',
    events: [
      { src: 'whatsapp', text: 'מרק ל. הזיז 11:00 ← יום ה׳ 11:30', to: 'תורים' },
      { src: 'instagram', text: 'פנייה חדשה: "כמה עולה ביקור ראשון?"', to: 'CRM' },
      { src: 'stripe', text: 'מקדמה שולמה · $40 · אולגה ס.', to: 'חשבונית 1043' },
      { src: 'telegram', text: 'נשלחו תזכורות ל-12 לקוחות', to: 'בוטים' },
      { src: 'website', text: 'הזמנה אונליין · דוד ר. · 15:00', to: 'יומן' },
      { src: 'sheets', text: 'המלאי סונכרן · 3 פריטים עומדים להיגמר', to: 'כספים' },
    ],
    ask: 'מי לא ביקר אצלנו 6 חודשים?',
    answer: 'נמצאו 23 לקוחות',
    answerAction: 'שליחת הצעה בוואטסאפ',
    search: 'חיפוש לקוחות, תורים, חשבוניות',
  },
};

export const ABOUT: Record<Language, AboutCopy> = {
  en: {
    label: 'About BryTech',
    cities: ['Kyiv', 'Tel Aviv'],
    localTime: 'local time',
    facts: [
      { v: '15+', l: 'years in technology and sales' },
      { v: '2', l: 'founders on every project' },
      { v: '2', l: 'cities, Kyiv and Tel Aviv' },
      { v: '4', l: 'languages, Hebrew included' },
    ],
    index: ['01 · Founder', '02 · Co-founder and CTO'],
    focus: { boris: ['Workflow mapping', 'Sales systems', 'Project lead'], danil: ['Architecture', 'AI agents', 'Bots and back end'] },
    own: { from: 'BryTech', to: 'Your business' },
    seats: { label: 'Team members', price: '$0 per seat' },
  },
  ru: {
    label: 'О BryTech',
    cities: ['Киев', 'Тель-Авив'],
    localTime: 'местное время',
    facts: [
      { v: '15+', l: 'лет в технологиях и продажах' },
      { v: '2', l: 'основателя в каждом проекте' },
      { v: '2', l: 'города: Киев и Тель-Авив' },
      { v: '4', l: 'языка, включая иврит' },
    ],
    index: ['01 · Основатель', '02 · Сооснователь и CTO'],
    focus: { boris: ['Разбор процессов', 'Системы продаж', 'Ведение проекта'], danil: ['Архитектура', 'AI-агенты', 'Боты и серверная часть'] },
    own: { from: 'BryTech', to: 'Ваш бизнес' },
    seats: { label: 'Сотрудники', price: '$0 за сотрудника' },
  },
  uk: {
    label: 'Про BryTech',
    cities: ['Київ', 'Тель-Авів'],
    localTime: 'місцевий час',
    facts: [
      { v: '15+', l: 'років у технологіях і продажах' },
      { v: '2', l: 'засновники в кожному проєкті' },
      { v: '2', l: 'міста: Київ і Тель-Авів' },
      { v: '4', l: 'мови, зокрема іврит' },
    ],
    index: ['01 · Засновник', '02 · Співзасновник і CTO'],
    focus: { boris: ['Розбір процесів', 'Системи продажів', 'Ведення проєкту'], danil: ['Архітектура', 'AI-агенти', 'Боти й серверна частина'] },
    own: { from: 'BryTech', to: 'Ваш бізнес' },
    seats: { label: 'Співробітники', price: '$0 за співробітника' },
  },
  he: {
    label: 'אודות BryTech',
    cities: ['קייב', 'תל אביב'],
    localTime: 'שעון מקומי',
    facts: [
      { v: '15+', l: 'שנים בטכנולוגיה ובמכירות' },
      { v: '2', l: 'מייסדים בכל פרויקט' },
      { v: '2', l: 'ערים: קייב ותל אביב' },
      { v: '4', l: 'שפות, כולל עברית' },
    ],
    index: ['01 · מייסד', '02 · מייסד-שותף ו-CTO'],
    focus: { boris: ['מיפוי תהליכים', 'מערכות מכירה', 'ניהול הפרויקט'], danil: ['ארכיטקטורה', 'סוכני AI', 'בוטים ושרתים'] },
    own: { from: 'BryTech', to: 'העסק שלכם' },
    seats: { label: 'עובדים', price: '$0 לעובד' },
  },
};
