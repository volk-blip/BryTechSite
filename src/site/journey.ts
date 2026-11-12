import type { Language } from '../i18n/translations';

export interface JourneyCopy {
  heroH1a: string;
  heroH1b: string;
  proof: string;
  loop: { title: string; steps: [string, string, string] };
  scene: { label: string; h2: string; p: string; action: string };
  build: { title: string; note: string };
  own: { title: string; items: [string, string, string]; fees: string };
  hubCenter: string;
  hubAlt: string;
  lanes: { h2: string; lead: string; input: string; core: string; outs: [string, string, string]; alt: string };
  trades: string[];
  ownStatement: { h2: string; sub: string };
  pause: string;
  play: string;
}

export const JOURNEY: Record<Language, JourneyCopy> = {
  en: {
    heroH1a: 'Business systems built around',
    heroH1b: 'how you work.',
    proof: 'Live in 2 to 5 weeks · You own the code · No per-seat fees',
    loop: { title: 'WhatsApp bot', steps: ['Message from Mark L.', 'Thursday 11:30 is free', 'Booking moved'] },
    scene: {
      label: 'The system',
      h2: 'One screen runs your whole day',
      p: "Bookings, clients, payments and every WhatsApp chat in one place, built for your team and nobody else's.",
      action: 'See the six parts',
    },
    build: { title: 'Your project', note: 'Live in your client area' },
    own: { title: 'Handed over to you', items: ['Source code', 'Client database', 'Admin accounts'], fees: 'Per-seat fees' },
    hubCenter: 'Your system',
    hubAlt: 'Your system connects your website, booking, CRM, client portal, payments, WhatsApp, Telegram and Instagram.',
    lanes: {
      h2: 'One message, three jobs done',
      lead: 'A client writes on WhatsApp. The bot moves the booking, updates the client card and sets a reminder before anyone on your team opens the chat.',
      input: 'Mark L. on WhatsApp',
      core: 'Bot',
      outs: ['Booking moved', 'Client card updated', 'Reminder set'],
      alt: 'A WhatsApp message goes to the bot, which moves the booking, updates the client card and sets a reminder.',
    },
    trades: ['Dental clinics', 'Medical centres', 'Beauty salons', 'Spas', 'Barbershops', 'Fitness studios', 'Yoga studios', 'Auto service', 'Law firms', 'Consultancies', 'Language schools', 'Tutors'],
    ownStatement: { h2: 'You own the code.', sub: 'No per-seat fees and no licence to rent. The system belongs to your business.' },
    pause: 'Pause animation',
    play: 'Play animation',
  },
  ru: {
    heroH1a: 'Системы для бизнеса',
    heroH1b: 'под ваши процессы.',
    proof: 'Запуск за 2–5 недель · Код принадлежит вам · Без оплаты за сотрудников',
    loop: { title: 'Бот WhatsApp', steps: ['Сообщение от Марка Л.', 'Четверг 11:30 свободно', 'Запись перенесена'] },
    scene: {
      label: 'Система',
      h2: 'Один экран ведёт весь ваш день',
      p: 'Записи, клиенты, оплаты и все чаты WhatsApp в одном месте, сделанном только для вашей команды.',
      action: 'Смотреть шесть частей',
    },
    build: { title: 'Ваш проект', note: 'Видно в кабинете клиента' },
    own: { title: 'Передано вам', items: ['Исходный код', 'База клиентов', 'Доступы администратора'], fees: 'Оплата за сотрудников' },
    hubCenter: 'Ваша система',
    hubAlt: 'Ваша система связывает сайт, запись, CRM, кабинет клиента, оплаты, WhatsApp, Telegram и Instagram.',
    lanes: {
      h2: 'Одно сообщение, три задачи',
      lead: 'Клиент пишет в WhatsApp. Бот переносит запись, обновляет карточку клиента и ставит напоминание раньше, чем кто-то из команды откроет чат.',
      input: 'Марк Л. в WhatsApp',
      core: 'Бот',
      outs: ['Запись перенесена', 'Карточка обновлена', 'Напоминание создано'],
      alt: 'Сообщение в WhatsApp получает бот: он переносит запись, обновляет карточку клиента и ставит напоминание.',
    },
    trades: ['Стоматологии', 'Медицинские центры', 'Салоны красоты', 'Спа', 'Барбершопы', 'Фитнес-студии', 'Йога-студии', 'Автосервисы', 'Юристы', 'Консалтинг', 'Языковые школы', 'Репетиторы'],
    ownStatement: { h2: 'Код принадлежит вам.', sub: 'Без оплаты за сотрудников и без аренды лицензий. Система принадлежит вашему бизнесу.' },
    pause: 'Пауза анимации',
    play: 'Запустить анимацию',
  },
  uk: {
    heroH1a: 'Системи для бізнесу',
    heroH1b: 'під ваші процеси.',
    proof: 'Запуск за 2–5 тижнів · Код належить вам · Без оплати за співробітників',
    loop: { title: 'Бот WhatsApp', steps: ['Повідомлення від Марка Л.', 'Четвер 11:30 вільно', 'Запис перенесено'] },
    scene: {
      label: 'Система',
      h2: 'Один екран веде весь ваш день',
      p: 'Записи, клієнти, оплати й усі чати WhatsApp в одному місці, зробленому лише для вашої команди.',
      action: 'Переглянути шість частин',
    },
    build: { title: 'Ваш проєкт', note: 'Видно в кабінеті клієнта' },
    own: { title: 'Передано вам', items: ['Вихідний код', 'База клієнтів', 'Доступи адміністратора'], fees: 'Оплата за співробітників' },
    hubCenter: 'Ваша система',
    hubAlt: "Ваша система пов'язує сайт, запис, CRM, кабінет клієнта, оплати, WhatsApp, Telegram та Instagram.",
    lanes: {
      h2: 'Одне повідомлення, три задачі',
      lead: 'Клієнт пише у WhatsApp. Бот переносить запис, оновлює картку клієнта й ставить нагадування раніше, ніж хтось із команди відкриє чат.',
      input: 'Марк Л. у WhatsApp',
      core: 'Бот',
      outs: ['Запис перенесено', 'Картку оновлено', 'Нагадування створено'],
      alt: 'Повідомлення у WhatsApp отримує бот: він переносить запис, оновлює картку клієнта й ставить нагадування.',
    },
    trades: ['Стоматології', 'Медичні центри', 'Салони краси', 'Спа', 'Барбершопи', 'Фітнес-студії', 'Йога-студії', 'Автосервіси', 'Юристи', 'Консалтинг', 'Мовні школи', 'Репетитори'],
    ownStatement: { h2: 'Код належить вам.', sub: 'Без оплати за співробітників і без оренди ліцензій. Система належить вашому бізнесу.' },
    pause: 'Призупинити анімацію',
    play: 'Запустити анімацію',
  },
  he: {
    heroH1a: 'מערכות לעסק',
    heroH1b: 'שנבנות סביב העבודה שלכם.',
    proof: 'עלייה לאוויר תוך 2–5 שבועות · הקוד בבעלותכם · בלי תשלום לפי משתמש',
    loop: { title: 'בוט וואטסאפ', steps: ['הודעה ממרק ל.', 'יום חמישי 11:30 פנוי', 'התור הוזז'] },
    scene: {
      label: 'המערכת',
      h2: 'מסך אחד מנהל את כל היום שלכם',
      p: "תורים, לקוחות, תשלומים וכל צ'אט וואטסאפ במקום אחד, שנבנה לצוות שלכם בלבד.",
      action: 'לראות את ששת החלקים',
    },
    build: { title: 'הפרויקט שלכם', note: 'גלוי באזור הלקוחות' },
    own: { title: 'נמסר לכם', items: ['קוד המקור', 'מאגר הלקוחות', 'חשבונות מנהל'], fees: 'תשלום לפי משתמש' },
    hubCenter: 'המערכת שלכם',
    hubAlt: 'המערכת שלכם מחברת את האתר, יומן התורים, ה-CRM, אזור הלקוחות, התשלומים, וואטסאפ, טלגרם ואינסטגרם.',
    lanes: {
      h2: 'הודעה אחת, שלוש משימות',
      lead: "לקוח כותב בוואטסאפ. הבוט מזיז את התור, מעדכן את כרטיס הלקוח וקובע תזכורת עוד לפני שמישהו בצוות פותח את הצ'אט.",
      input: 'מרק ל. בוואטסאפ',
      core: 'בוט',
      outs: ['התור הוזז', 'הכרטיס עודכן', 'נקבעה תזכורת'],
      alt: 'הודעת וואטסאפ מגיעה לבוט, שמזיז את התור, מעדכן את כרטיס הלקוח וקובע תזכורת.',
    },
    trades: ['מרפאות שיניים', 'מרכזים רפואיים', 'סלוני יופי', 'ספא', 'מספרות', 'סטודיו לכושר', 'סטודיו ליוגה', 'מוסכים', 'משרדי עורכי דין', 'ייעוץ', 'בתי ספר לשפות', 'מורים פרטיים'],
    ownStatement: { h2: 'הקוד שייך לכם.', sub: 'בלי תשלום לפי משתמש ובלי רישיון בשכירות. המערכת שייכת לעסק שלכם.' },
    pause: 'השהיית אנימציה',
    play: 'הפעלת אנימציה',
  },
};
