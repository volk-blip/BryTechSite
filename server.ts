import express from 'express';
import { createServer as createHttpServer } from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface ServerChatMessage {
  id: string;
  clientId: string;
  ownerUid: string;
  senderRole: 'client' | 'admin';
  senderName: string;
  text: string;
  sentAtIso: string;
}

export interface ServerProductNote {
  id: string;
  clientId: string;
  clientName: string;
  productId: string;
  productName: string;
  authorName: string;
  text: string;
  createdAtIso: string;
  readByAdmin: boolean;
}

export interface ServerContactChannels {
  telegramUrl: string;
  telegramHandle: string;
  telegramLabel: string;
  whatsappUrl: string;
  whatsappNumber: string;
  whatsappLabel: string;
  instagramUrl: string;
  instagramHandle: string;
  instagramLabel: string;
  phoneNumber: string;
  phoneDisplay: string;
  phoneLabel: string;
}

export interface VisitorChatMessage {
  id: string;
  visitorId: string;
  senderRole: 'visitor' | 'bot' | 'admin';
  senderName: string;
  text: string;
  sentAtIso: string;
}

export interface VisitorChatSession {
  visitorId: string;
  visitorName: string;
  visitorContact: string;
  businessType: string;
  lang: string;
  mode: 'bot' | 'human';
  unreadForAdmin: number;
  updatedAtIso: string;
  messages: VisitorChatMessage[];
}

const chatMemoryStore: Record<string, ServerChatMessage[]> = {
  client_kyiv_dental: [
    {
      id: 'msg_1',
      clientId: 'client_kyiv_dental',
      ownerUid: 'system',
      senderRole: 'admin',
      senderName: 'Boris Brygin (Founder)',
      text: 'Welcome to your custom system workspace! Your unified booking engine and CRM database sync is 82% complete.',
      sentAtIso: '10:15 AM',
    },
    {
      id: 'msg_2',
      clientId: 'client_kyiv_dental',
      ownerUid: 'system',
      senderRole: 'client',
      senderName: 'Dr. Olena Koval (Pechersk Dental)',
      text: 'Thank you! Can we also add an automated Telegram & WhatsApp recall reminder 6 months after each hygiene visit?',
      sentAtIso: '10:18 AM',
    },
  ],
  client_telaviv_med: [
    {
      id: 'msg_tlv_1',
      clientId: 'client_telaviv_med',
      ownerUid: 'system',
      senderRole: 'admin',
      senderName: 'Boris Brygin (Founder)',
      text: 'Shalom Noa! Your custom multi-branch CRM and automated WhatsApp concierge flow is now live on staging.',
      sentAtIso: '09:30 AM',
    },
  ],
};

const productNotesStore: ServerProductNote[] = [
  {
    id: 'note_init_1',
    clientId: 'client_kyiv_dental',
    clientName: 'Pechersk Dental Studio',
    productId: 'prod_web_1',
    productName: 'Custom Clinic OS & Booking Portal',
    authorName: 'Dr. Olena Koval',
    text: 'Please highlight our Sunday emergency dental hours on the mobile booking header.',
    createdAtIso: 'Yesterday, 16:40',
    readByAdmin: false,
  },
];

const visitorChatsStore: Record<string, VisitorChatSession> = {
  visitor_demo_1: {
    visitorId: 'visitor_demo_1',
    visitorName: 'Alexandr M. (Multi-Branch Clinic)',
    visitorContact: '@alex_clinic_ceo',
    businessType: 'Medical & Aesthetic Network (4 Branches)',
    lang: 'ru',
    mode: 'human',
    unreadForAdmin: 1,
    updatedAtIso: 'Just now',
    messages: [
      {
        id: 'vmsg_1',
        visitorId: 'visitor_demo_1',
        senderRole: 'bot',
        senderName: 'Alex · BryTech Concierge',
        text: 'Привет! 👋 Я Алекс из команды BryTech. Помогаю подобрать архитектуру единой системы под ваш бизнес (CRM, запись, боты, финансы и клиентский кабинет) и соединяю напрямую с нашим основателем Борисом. Расскажите, чем занимается ваша компания?',
        sentAtIso: '11:20',
      },
      {
        id: 'vmsg_2',
        visitorId: 'visitor_demo_1',
        senderRole: 'visitor',
        senderName: 'Alexandr M.',
        text: 'У нас сеть из 4 клиник. Сейчас используем 5 разных сервисов, хотим объединить всё в одну кастомную систему. Можно обсудить с Борисом?',
        sentAtIso: '11:22',
      },
      {
        id: 'vmsg_3',
        visitorId: 'visitor_demo_1',
        senderRole: 'bot',
        senderName: 'Alex · BryTech Concierge',
        text: 'Супер, для сети из 4 клиник это идеальная задача! Переключил диалог напрямую на Бориса — он уже видит нашу переписку и ответит вам прямо здесь.',
        sentAtIso: '11:22',
      },
    ],
  },
};

let contactChannelsStore: ServerContactChannels = {
  telegramUrl: 'https://t.me/Brytech_systems',
  telegramHandle: '@Brytech_systems',
  telegramLabel: '@Brytech_systems',
  whatsappUrl: 'https://wa.me/380637127001',
  whatsappNumber: '+380637127001',
  whatsappLabel: '+380 63 712 7001',
  instagramUrl: 'https://instagram.com/BryTech_Systems',
  instagramHandle: '@BryTech_Systems',
  instagramLabel: '@BryTech_Systems',
  phoneNumber: '+380637127001',
  phoneDisplay: '+380 63 712 7001',
  phoneLabel: '+380 63 712 7001',
};

function buildSmartFallbackReply(
  userText: string,
  lang: string,
  history: Array<{ senderRole?: string; text?: string }> = []
): { reply: string; suggestHuman: boolean } {
  const lower = userText.toLowerCase().trim();
  const turnCount = history.filter((m) => m.senderRole === 'visitor').length;

  const isGreeting =
    /^(hi|hello|hey|good morning|good evening|yo|sup|привет|здравствуйте|добрый день|добрый вечер|алло|вітаю|привіт|добрий день|שלום|היי)\b/i.test(
      lower
    ) && lower.length < 32;

  const asksHowAreYou =
    lower.includes('how are you') ||
    lower.includes('как дела') ||
    lower.includes('як справи') ||
    lower.includes('מה נשמע') ||
    lower.includes('מה שלומך');

  const asksPricing =
    lower.includes('price') ||
    lower.includes('pricing') ||
    lower.includes('cost') ||
    lower.includes('budget') ||
    lower.includes('how much') ||
    lower.includes('quote') ||
    lower.includes('цен') ||
    lower.includes('стоимост') ||
    lower.includes('сколько стоит') ||
    lower.includes('бюджет') ||
    lower.includes('прайс') ||
    lower.includes('цін') ||
    lower.includes('вартіст') ||
    lower.includes('скільки коштує') ||
    lower.includes('מחיר') ||
    lower.includes('עלות') ||
    lower.includes('כמה עולה');

  const asksTimeline =
    lower.includes('how long') ||
    lower.includes('time') ||
    lower.includes('weeks') ||
    lower.includes('days') ||
    lower.includes('fast') ||
    lower.includes('deadline') ||
    lower.includes('срок') ||
    lower.includes('сколько времени') ||
    lower.includes('как быстро') ||
    lower.includes('долго') ||
    lower.includes('термін') ||
    lower.includes('як швидко') ||
    lower.includes('כמה זמן') ||
    lower.includes('מתי');

  const asksHumanOrFounder =
    lower.includes('human') ||
    lower.includes('person') ||
    lower.includes('boris') ||
    lower.includes('founder') ||
    lower.includes('architect') ||
    lower.includes('manager') ||
    lower.includes('call') ||
    lower.includes('phone') ||
    lower.includes('whatsapp') ||
    lower.includes('telegram') ||
    lower.includes('instagram') ||
    lower.includes('борис') ||
    lower.includes('основател') ||
    lower.includes('человек') ||
    lower.includes('оператор') ||
    lower.includes('менеджер') ||
    lower.includes('позвон') ||
    lower.includes('телеграм') ||
    lower.includes('людин') ||
    lower.includes('засновник') ||
    lower.includes('נציג') ||
    lower.includes('בוריס') ||
    lower.includes('טלפון');

  const asksCrmOrSaas =
    lower.includes('crm') ||
    lower.includes('erp') ||
    lower.includes('saas') ||
    lower.includes('hubspot') ||
    lower.includes('monday') ||
    lower.includes('altegio') ||
    lower.includes('yclients') ||
    lower.includes('bitrix') ||
    lower.includes('amocrm') ||
    lower.includes('spreadsheet') ||
    lower.includes('excel') ||
    lower.includes('unify') ||
    lower.includes('replace') ||
    lower.includes('црм') ||
    lower.includes('таблиц') ||
    lower.includes('объедин') ||
    lower.includes('замен') ||
    lower.includes('об’єдна') ||
    lower.includes('מערכת') ||
    lower.includes('לאחד');

  const asksBookingOrBots =
    lower.includes('book') ||
    lower.includes('calendar') ||
    lower.includes('schedule') ||
    lower.includes('appointment') ||
    lower.includes('bot') ||
    lower.includes('automation') ||
    lower.includes('ai') ||
    lower.includes('запис') ||
    lower.includes('календар') ||
    lower.includes('бот') ||
    lower.includes('автоматизац') ||
    lower.includes('ии') ||
    lower.includes(' תורים') ||
    lower.includes('בוט') ||
    lower.includes('יומן');

  const asksIndustry =
    lower.includes('clinic') ||
    lower.includes('dental') ||
    lower.includes('medical') ||
    lower.includes('salon') ||
    lower.includes('beauty') ||
    lower.includes('spa') ||
    lower.includes('real estate') ||
    lower.includes('agency') ||
    lower.includes('shop') ||
    lower.includes('store') ||
    lower.includes('ecommerce') ||
    lower.includes('logistics') ||
    lower.includes('fitness') ||
    lower.includes('gym') ||
    lower.includes('auto') ||
    lower.includes('restaurant') ||
    lower.includes('клиник') ||
    lower.includes('салон') ||
    lower.includes('стоматолог') ||
    lower.includes('недвижимост') ||
    lower.includes('магазин') ||
    lower.includes('логистик') ||
    lower.includes('фитнес') ||
    lower.includes('клінік') ||
    lower.includes('מרפאה') ||
    lower.includes('סלון') ||
    lower.includes('נדלן');

  if (lang === 'ru') {
    if (isGreeting || asksHowAreYou) {
      return {
        reply:
          'Привет! 👋 Отлично, спасибо! Я на связи и готов помочь. Расскажите в двух словах, чем занимается ваш бизнес и какие процессы сейчас отнимают больше всего времени?',
        suggestHuman: false,
      };
    }
    if (asksPricing) {
      return {
        reply:
          'Хороший вопрос! В отличие от обычных сервисов, у нас нет ежемесячной платы за каждого сотрудника. Мы оцениваем систему индивидуально под ваши нужды: базовое ядро для одной локации обычно начинается от $1,400–$2,500, а полная экосистема (CRM + запись + боты + клиентский кабинет) рассчитывается под ваши модули и окупается за пару месяцев. Какие модули вам нужны в первую очередь?',
        suggestHuman: true,
      };
    }
    if (asksTimeline) {
      return {
        reply:
          'Мы запускаем рабочее ядро очень быстро — обычно за 10–21 день! Так как у нас уже готовы проверенные инженерные блоки, мы не пишем базовые вещи с нуля полгода, а сразу собираем и кастомизируем систему под ваши процессы. Когда вы планируете запуск?',
        suggestHuman: true,
      };
    }
    if (asksHumanOrFounder) {
      return {
        reply:
          'Конечно! Вы можете прямо сейчас нажать кнопку «Переключить на Бориса (Основатель)» чуть выше, и Борис Брыгин ответит вам лично в этом чате. Или, если удобнее, напишите нам в Telegram (@Brytech_systems), WhatsApp (+380637127001) или Instagram (@BryTech_Systems)!',
        suggestHuman: true,
      };
    }
    if (asksCrmOrSaas) {
      return {
        reply:
          'Понимаю вас на 100% — когда заявки в одном месте, таблицы в другом, а переписки в мессенджерах, команда теряет кучу времени и клиентов. Мы как раз объединяем CRM, склад, финансы, онлайн-запись и личный кабинет клиента в одно окно, настроенное строго под вашу логику. Сколько человек сейчас работает в вашей команде?',
        suggestHuman: true,
      };
    }
    if (asksBookingOrBots) {
      return {
        reply:
          'Да, мы делаем умную онлайн-запись и двусторонних ботов для Telegram, WhatsApp и Instagram! Бот сам отвечает клиентам, записывает их в календарь, принимает предоплату и напоминает о визите, чтобы не было неявок. Для какой сферы бизнеса вы хотите это внедрить?',
        suggestHuman: true,
      };
    }
    if (asksIndustry) {
      return {
        reply:
          'Отличная ниша — у нас большой опыт именно в этой сфере! Мы можем собрать для вас единую систему: от сайта и онлайн-записи до внутренней CRM, автоматического расчета зарплат/процентов мастеров или менеджеров и ботов для возврата клиентов. Хотите, подключу к диалогу Бориса, чтобы он показал, как это будет выглядеть для вашей компании?',
        suggestHuman: true,
      };
    }
    return {
      reply:
        turnCount <= 1
          ? `Понял вас! Мы в BryTech как раз специализируемся на том, чтобы подстроить технологию под ваш бизнес, а не наоборот — собираем всё (CRM, заявки, расписание, финансы и автоматизацию) в одну удобную систему. Подскажите, какие программы или таблицы вы используете сейчас, и что в них больше всего неудобно?`
          : `Звучит как отличная задача для кастомной системы! Мы можем полностью автоматизировать этот процесс и убрать ручную рутину. Нажмите кнопку «Связаться с Борисом» ниже или оставьте ваш Telegram / WhatsApp (+380637127001), чтобы обсудить детали напрямую с основателем!`,
      suggestHuman: true,
    };
  }

  if (lang === 'uk') {
    if (isGreeting || asksHowAreYou) {
      return {
        reply:
          'Привіт! 👋 Все чудово, дякую! Я на зв’язку. Розкажіть коротко, чим займається ваш бізнес і які процеси зараз забирають найбільше часу?',
        suggestHuman: false,
      };
    }
    if (asksPricing) {
      return {
        reply:
          'Гарне запитання! На відміну від шаблонних SaaS, у нас немає абонплати за кожного співробітника. Вартість залежить від потрібних вам модулів: базове кастомне ядро стартує від $1,400–$2,500, і ви отримуєте систему у повну власність. Які процеси ви хочете автоматизувати першими?',
        suggestHuman: true,
      };
    }
    if (asksTimeline) {
      return {
        reply:
          'Зазвичай ми запускаємо першу робочу версію системи всього за 10–21 день! Ми використовуємо власні перевірені архітектурні модулі та адаптуємо їх під ваші бізнес-правила. Коли вам потрібно запуститися?',
        suggestHuman: true,
      };
    }
    if (asksHumanOrFounder) {
      return {
        reply:
          'Звісно! Натисніть кнопку прямого чату із засновником Борисом Бригіним нижче — він бачить нашу переписку і підключиться до розмови. Або пишіть напряму в Telegram (@Brytech_systems), WhatsApp (+380637127001) чи Instagram (@BryTech_Systems)!',
        suggestHuman: true,
      };
    }
    return {
      reply:
        'Зрозумів вас! Ми в BryTech створюємо єдину кастомну систему саме під ваші процеси — об’єднуємо сайт, CRM, онлайн-запис, фінанси та Telegram/WhatsApp/Instagram ботів в одному вікні. Підкажіть, які сервіси ви використовуєте зараз, або натисніть кнопку нижче, щоб обговорити це напряму з Борисом!',
      suggestHuman: true,
    };
  }

  if (lang === 'he') {
    if (isGreeting || asksHowAreYou) {
      return {
        reply:
          'היי! 👋 הכל מצוין, תודה! שמח שאתה כאן. ספר לי במשפט על העסק שלך — אילו תהליכים הכי היית רוצה לייעל או לאחד היום?',
        suggestHuman: false,
      };
    }
    if (asksPricing) {
      return {
        reply:
          'שאלה מצוינת! בניגוד למערכות מדף שגובות תשלום חודשי על כל עובד, אנחנו בונים מערכת מותאמת אישית בבעלות מלאה שלך. העלות נקבעת לפי המודולים שאתה צריך (CRM, יומן תורים, בוטים לוואטסאפ/טלגרם/אינסטגרם, כספים ופורטל לקוחות). אילו חלקים הכי חשובים לעסק שלך כרגע?',
        suggestHuman: true,
      };
    }
    if (asksTimeline) {
      return {
        reply:
          'אנחנו מעלים מערכת עובדת לאוויר תוך 10–21 ימים! בזכות אבני הבניין ההנדסיות שלנו, אנחנו מתאימים את המערכת בדיוק לתהליכי העבודה שלך במהירות שיא. מתי תרצו לעלות לאוויר?',
        suggestHuman: true,
      };
    }
    return {
      reply:
        'הבנתי אותך לגמרי! המטרה שלנו ב-BryTech היא לחבר את כל פעילות העסק שלך למערכת אחת חכמה ונוחה במקום לעבוד עם 5 תוכנות שונות. רוצה שאחבר אותך ישירות לבוריס (המייסד) כאן בצ׳אט, או שתעדיף לדבר בוואטסאפ (+380637127001) / טלגרם (@Brytech_systems)?',
      suggestHuman: true,
    };
  }

  // Default English - natural, warm, human-like messenger responses
  if (isGreeting || asksHowAreYou) {
    return {
      reply:
        "Hey there! 👋 Doing great, thanks for asking! I'm here to help you explore how we can streamline your business. What kind of business are you running, and what's the main workflow you're looking to improve?",
      suggestHuman: false,
    };
  }
  if (asksPricing) {
    return {
      reply:
        "Great question! Unlike off-the-shelf SaaS tools that charge you per user every month forever, we price based on the exact custom scope you need — and you own the system 100%. Focused single-location systems typically start around $1,400–$2,500, while full multi-department ecosystems are scoped around your exact modules. What parts of your business are you looking to unify first?",
      suggestHuman: true,
    };
  }
  if (asksTimeline) {
    return {
      reply:
        "We move fast — most custom systems go live in 10 to 21 days! Because we combine our battle-tested core modules with custom workflow engineering for your business, you don't have to wait 6 months for custom software. Do you have a target launch date in mind?",
      suggestHuman: true,
    };
  }
  if (asksHumanOrFounder) {
    return {
      reply:
        "Absolutely! Just tap the 'Chat Directly with Boris (Founder)' button right here in the messenger and Boris Brygin will jump straight into this chat. You can also message us anytime on WhatsApp (+380637127001), Telegram (@Brytech_systems), or Instagram (@BryTech_Systems)!",
      suggestHuman: true,
    };
  }
  if (asksCrmOrSaas) {
    return {
      reply:
        "I hear that every day — juggling separate apps for CRM, spreadsheets, bookings, and messaging creates so many bottlenecks. We replace all of that with one clean system tailored strictly to how your team works, with zero per-seat fees. How many people are on your team right now?",
      suggestHuman: true,
    };
  }
  if (asksBookingOrBots) {
    return {
      reply:
        "Yes! We build smart 24/7 booking engines connected directly to 2-way WhatsApp, Telegram, and Instagram bots. They can answer client questions naturally, book appointments, collect deposits, and send automated reminders to cut no-shows. What industry is your business in?",
      suggestHuman: true,
    };
  }
  if (asksIndustry) {
    return {
      reply:
        "We love working with businesses in that space! We can build your entire operation into one system — from your client-facing website and booking flow to your internal CRM, automated staff commissions, and WhatsApp/Telegram/Instagram follow-ups. Want me to loop in Boris (our Founder) right here so we can map out a quick blueprint for you?",
      suggestHuman: true,
    };
  }

  return {
    reply:
      turnCount <= 1
        ? "Got it! At BryTech, we specialize in designing custom workflows and unified systems that eliminate day-to-day bottlenecks — bringing your CRM, bookings, messaging bots, finance, and client portal under one roof. What tools or spreadsheets are you currently using, and what feels the most frustrating about them?"
        : "That makes total sense — we can definitely engineer that directly into your custom system so everything runs automatically. Tap 'Chat with Boris (Founder)' below to talk directly with Boris here, or reach us on WhatsApp (+380637127001) or Telegram (@Brytech_systems)!",
    suggestHuman: true,
  };
}

async function startServer() {
  const app = express();
  const httpServer = createHttpServer(app);
  app.use(express.json());

  const wss = new WebSocketServer({ server: httpServer, path: '/ws-chat' });

  const broadcastJson = (payload: unknown) => {
    const raw = JSON.stringify(payload);
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(raw);
      }
    });
  };

  wss.on('connection', (ws) => {
    ws.send(
      JSON.stringify({
        type: 'init_store',
        data: chatMemoryStore,
        notes: productNotesStore,
        contactChannels: contactChannelsStore,
        visitorChats: visitorChatsStore,
      })
    );

    ws.on('message', (rawBuffer) => {
      try {
        const parsed = JSON.parse(rawBuffer.toString());
        if (parsed.type === 'chat_message' && parsed.message) {
          const msg: ServerChatMessage = parsed.message;
          if (!chatMemoryStore[msg.clientId]) {
            chatMemoryStore[msg.clientId] = [];
          }
          const exists = chatMemoryStore[msg.clientId].some((m) => m.id === msg.id);
          if (!exists) {
            chatMemoryStore[msg.clientId].push(msg);
          }
          broadcastJson({ type: 'chat_message', message: msg });
        } else if (parsed.type === 'product_note' && parsed.note) {
          const note: ServerProductNote = parsed.note;
          if (!productNotesStore.some((n) => n.id === note.id)) {
            productNotesStore.unshift(note);
          }
          broadcastJson({ type: 'product_note', note });
        } else if (parsed.type === 'update_contact_channels' && parsed.contactChannels) {
          contactChannelsStore = {
            ...contactChannelsStore,
            ...parsed.contactChannels,
          };
          broadcastJson({
            type: 'contact_channels_updated',
            contactChannels: contactChannelsStore,
          });
        } else if (parsed.type === 'visitor_chat_update' && parsed.session) {
          const session: VisitorChatSession = parsed.session;
          visitorChatsStore[session.visitorId] = session;
          broadcastJson({
            type: 'visitor_chat_updated',
            session,
          });
        }
      } catch {
        // ignore malformed packets
      }
    });
  });

  app.get('/api/chat/:clientId', (req, res) => {
    const { clientId } = req.params;
    res.json({ messages: chatMemoryStore[clientId] || [] });
  });

  app.post('/api/chat', (req, res) => {
    const msg: ServerChatMessage = req.body;
    if (!msg || !msg.clientId || !msg.text) {
      res.status(400).json({ error: 'Invalid chat message payload' });
      return;
    }
    if (!chatMemoryStore[msg.clientId]) {
      chatMemoryStore[msg.clientId] = [];
    }
    if (!chatMemoryStore[msg.clientId].some((m) => m.id === msg.id)) {
      chatMemoryStore[msg.clientId].push(msg);
    }
    broadcastJson({ type: 'chat_message', message: msg });
    res.json({ ok: true, message: msg });
  });

  app.get('/api/notes', (_req, res) => {
    res.json({ notes: productNotesStore });
  });

  app.post('/api/notes', (req, res) => {
    const note: ServerProductNote = req.body;
    if (!note || !note.clientId || !note.productId || !note.text) {
      res.status(400).json({ error: 'Invalid note payload' });
      return;
    }
    if (!productNotesStore.some((n) => n.id === note.id)) {
      productNotesStore.unshift(note);
    }
    broadcastJson({ type: 'product_note', note });
    res.json({ ok: true, note });
  });

  app.get('/api/contact-channels', (_req, res) => {
    res.json({ contactChannels: contactChannelsStore });
  });

  app.post('/api/contact-channels', (req, res) => {
    const incoming: Partial<ServerContactChannels> = req.body;
    contactChannelsStore = {
      ...contactChannelsStore,
      ...incoming,
    };
    broadcastJson({
      type: 'contact_channels_updated',
      contactChannels: contactChannelsStore,
    });
    res.json({ ok: true, contactChannels: contactChannelsStore });
  });

  // Visitor Live Chats API
  app.get('/api/visitor-chats', (_req, res) => {
    res.json({ visitorChats: visitorChatsStore });
  });

  app.post('/api/visitor-chats', (req, res) => {
    const session: VisitorChatSession = req.body;
    if (!session || !session.visitorId) {
      res.status(400).json({ error: 'Invalid visitor chat session' });
      return;
    }
    visitorChatsStore[session.visitorId] = session;
    broadcastJson({
      type: 'visitor_chat_updated',
      session,
    });
    res.json({ ok: true, session });
  });

  // AI Bot Assistant Endpoint for Visitor Chat
  app.post('/api/visitor-bot', async (req, res) => {
    const { message, history = [], lang = 'en', visitorName = '' } = req.body || {};
    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Message is required' });
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      const fallback = buildSmartFallbackReply(message, lang, history);
      res.json(fallback);
      return;
    }

    try {
      const ai = new GoogleGenAI({ apiKey });
      const transcript = Array.isArray(history)
        ? history
            .slice(-10)
            .map((m: { senderRole?: string; text?: string }) => `${m.senderRole || 'user'}: ${m.text || ''}`)
            .join('\n')
        : '';

      const systemInstruction = `You are Alex, a warm, sharp, human-sounding Solutions Concierge at BryTech, chatting with a website visitor inside a live Messenger-style chat.
Who we are:
- BryTech was founded by Boris Brygin (15+ years of enterprise tech & sales leadership).
- We design and build custom workflows, AI-driven automation, and 100% tailor-made unified business operating systems around each client's exact operations.
- Instead of juggling 5-8 disconnected SaaS subscriptions with per-user fees, our clients get ONE unified platform they own: Custom CRM & Sales Pipelines, Online Booking & Scheduling, 2-Way WhatsApp/Telegram/Instagram Bots, Inventory/ERP/Finance, and a Branded Client Portal.
- Typical rollout: 10–21 days using our modular core + custom workflow engineering.
- Pricing: Custom-scoped to the modules needed (focused single-location systems start around $1,400–$2,500; full multi-branch ecosystems are tailored to scope) with $0 per-seat monthly fees.
- Direct contacts if asked: Telegram @Brytech_systems, WhatsApp +380637127001, Instagram @BryTech_Systems, Direct Phone +380637127001.

How you must communicate:
- Write like a real, friendly, attentive human in a modern messenger app (WhatsApp / Telegram / iMessage style) — natural, conversational, warm, and direct (2-3 short sentences max).
- NEVER sound robotic or repeat generic marketing slogans. Directly understand and answer the exact question the visitor just asked!
- Ask one natural, helpful follow-up question to understand their business or workflow better, OR if they are ready, invite them to tap the button in the chat to speak directly with Boris Brygin (Founder).
- Always reply in the visitor's active language (lang code: "${lang}" — 'en' for English, 'ru' for Russian, 'uk' for Ukrainian, 'he' for Hebrew).`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Visitor Name: ${visitorName || 'Guest'}\nRecent Messenger History:\n${transcript}\n\nVisitor's latest message: ${message}`,
        config: {
          systemInstruction,
          temperature: 0.75,
        },
      });

      const replyText =
        response.text?.trim() || buildSmartFallbackReply(message, lang, history).reply;
      res.json({
        reply: replyText,
        suggestHuman: true,
      });
    } catch {
      const fallback = buildSmartFallbackReply(message, lang, history);
      res.json(fallback);
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  const PORT = 3000;
  httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`BryTech Realtime Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
