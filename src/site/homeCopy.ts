import type { Language } from '../i18n/translations';

export interface HomeCopy {
  chips: [string, string, string];
  leads: {
    h2: string;
    lead: string;
    sources: { label: string; sub: string }[];
    target: string;
    then: string;
    alt: string;
  };
  figures: { h2: string; items: { v: string; l: string }[] };
  map: { title: string; steps: [string, string, string, string] };
  asm: { system: string; connected: string; live: string; synced: string };
}

export const HOME: Record<Language, HomeCopy> = {
  en: {
    chips: ['Booking confirmed', 'New lead from Instagram', 'Invoice paid · $120'],
    leads: {
      h2: 'Every lead lands in one place',
      lead: 'Website forms, Instagram messages and WhatsApp and Telegram chats arrive in one inbox, next to the client’s full history.',
      sources: [
        { label: 'Website', sub: 'Booking form' },
        { label: 'Instagram', sub: 'Direct messages' },
        { label: 'WhatsApp', sub: 'Chats' },
        { label: 'Telegram', sub: 'Chats' },
        { label: 'Phone', sub: 'Calls' },
      ],
      target: 'Your CRM',
      then: 'Your team',
      alt: 'Website forms, Instagram, WhatsApp, Telegram and phone calls flow into your CRM and on to your team.',
    },
    figures: {
      h2: 'Your system in four numbers',
      items: [
        { v: '6', l: 'parts that share one database' },
        { v: '4', l: 'languages, Hebrew right to left included' },
        { v: '25', l: 'working days to build all six parts' },
        { v: '$0', l: 'in per-seat fees as your team grows' },
      ],
    },
    map: { title: 'Your workflow', steps: ['Client books online', 'Reminder the day before', 'Visit and payment', 'Review request'] },
    asm: { system: 'Your system', connected: 'parts connected', live: 'Live', synced: 'One database · synced' },
  },
  ru: {
    chips: ['Запись подтверждена', 'Новая заявка из Instagram', 'Счёт оплачен · $120'],
    leads: {
      h2: 'Все заявки попадают в одно место',
      lead: 'Формы с сайта, сообщения в Instagram и чаты WhatsApp и Telegram приходят в один ящик рядом с полной историей клиента.',
      sources: [
        { label: 'Сайт', sub: 'Форма записи' },
        { label: 'Instagram', sub: 'Сообщения' },
        { label: 'WhatsApp', sub: 'Чаты' },
        { label: 'Telegram', sub: 'Чаты' },
        { label: 'Телефон', sub: 'Звонки' },
      ],
      target: 'Ваша CRM',
      then: 'Ваша команда',
      alt: 'Формы с сайта, Instagram, WhatsApp, Telegram и звонки попадают в вашу CRM и дальше к команде.',
    },
    figures: {
      h2: 'Ваша система в четырёх цифрах',
      items: [
        { v: '6', l: 'частей с одной общей базой' },
        { v: '4', l: 'языка, включая иврит справа налево' },
        { v: '25', l: 'рабочих дней на все шесть частей' },
        { v: '$0', l: 'оплаты за сотрудников при росте команды' },
      ],
    },
    map: { title: 'Ваш процесс', steps: ['Клиент записывается онлайн', 'Напоминание накануне', 'Визит и оплата', 'Запрос отзыва'] },
    asm: { system: 'Ваша система', connected: 'частей подключено', live: 'Онлайн', synced: 'Одна база · синхронизировано' },
  },
  uk: {
    chips: ['Запис підтверджено', 'Нова заявка з Instagram', 'Рахунок сплачено · $120'],
    leads: {
      h2: 'Усі заявки потрапляють в одне місце',
      lead: 'Форми із сайту, повідомлення в Instagram і чати WhatsApp та Telegram приходять в одну скриньку поруч із повною історією клієнта.',
      sources: [
        { label: 'Сайт', sub: 'Форма запису' },
        { label: 'Instagram', sub: 'Повідомлення' },
        { label: 'WhatsApp', sub: 'Чати' },
        { label: 'Telegram', sub: 'Чати' },
        { label: 'Телефон', sub: 'Дзвінки' },
      ],
      target: 'Ваша CRM',
      then: 'Ваша команда',
      alt: 'Форми із сайту, Instagram, WhatsApp, Telegram і дзвінки потрапляють у вашу CRM і далі до команди.',
    },
    figures: {
      h2: 'Ваша система в чотирьох цифрах',
      items: [
        { v: '6', l: 'частин зі спільною базою' },
        { v: '4', l: 'мови, зокрема іврит справа наліво' },
        { v: '25', l: 'робочих днів на всі шість частин' },
        { v: '$0', l: 'оплати за співробітників, коли команда росте' },
      ],
    },
    map: { title: 'Ваш процес', steps: ['Клієнт записується онлайн', 'Нагадування напередодні', 'Візит і оплата', 'Запит відгуку'] },
    asm: { system: 'Ваша система', connected: 'частин підключено', live: 'Онлайн', synced: 'Одна база · синхронізовано' },
  },
  he: {
    chips: ['התור אושר', 'פנייה חדשה מאינסטגרם', 'חשבונית שולמה · $120'],
    leads: {
      h2: 'כל פנייה נוחתת במקום אחד',
      lead: "טפסים מהאתר, הודעות באינסטגרם וצ'אטים בוואטסאפ ובטלגרם מגיעים לתיבה אחת, לצד ההיסטוריה המלאה של הלקוח.",
      sources: [
        { label: 'אתר', sub: 'טופס הזמנה' },
        { label: 'אינסטגרם', sub: 'הודעות' },
        { label: 'וואטסאפ', sub: "צ'אטים" },
        { label: 'טלגרם', sub: "צ'אטים" },
        { label: 'טלפון', sub: 'שיחות' },
      ],
      target: 'ה-CRM שלכם',
      then: 'הצוות שלכם',
      alt: 'טפסים מהאתר, אינסטגרם, וואטסאפ, טלגרם ושיחות טלפון זורמים ל-CRM שלכם ומשם לצוות.',
    },
    figures: {
      h2: 'המערכת שלכם בארבעה מספרים',
      items: [
        { v: '6', l: 'חלקים עם מסד נתונים אחד' },
        { v: '4', l: 'שפות, כולל עברית מימין לשמאל' },
        { v: '25', l: 'ימי עבודה לבניית כל ששת החלקים' },
        { v: '$0', l: 'תשלום לפי משתמש כשהצוות גדל' },
      ],
    },
    map: { title: 'התהליך שלכם', steps: ['הלקוח קובע תור אונליין', 'תזכורת יום לפני', 'ביקור ותשלום', 'בקשת חוות דעת'] },
    asm: { system: 'המערכת שלכם', connected: 'חלקים מחוברים', live: 'פעיל', synced: 'מסד נתונים אחד · מסונכרן' },
  },
};
