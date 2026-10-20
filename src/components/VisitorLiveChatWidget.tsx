import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageCircle,
  X,
  Send,
  UserCheck,
  ArrowRight,
  CheckCheck,
  Minimize2,
  PhoneCall,
  Instagram,
  Sparkles,
} from 'lucide-react';
import { Language } from '../i18n/translations';
import {
  realtimeChatHub,
  VisitorChatSessionRecord,
  VisitorChatMessageRecord,
  loadSavedContactChannels,
  ContactChannelsConfig,
} from '../services/realtimeChat';

interface VisitorLiveChatWidgetProps {
  lang: Language;
  prefilledTopic?: string | null;
  onClearPrefilledTopic?: () => void;
}

const VISITOR_SESSION_STORAGE_KEY = 'brytech_active_visitor_session_v2';
const FOUNDER_AVATAR_URL =
  '/assets/aistudio/Gemini_Generated_Image_vhds4cvhds4cvhds_3072b664.jpg';

const WIDGET_COPY: Record<
  Language,
  {
    launcherLabel: string;
    launcherSub: string;
    botTitle: string;
    botSubtitle: string;
    humanTitle: string;
    humanSubtitle: string;
    todayLabel: string;
    welcomeBotMsg: string;
    quickPrompts: string[];
    switchToHumanBtn: string;
    switchedToHumanNotice: string;
    humanGreetingMsg: string;
    namePlaceholder: string;
    contactPlaceholder: string;
    saveProfileBtn: string;
    inputPlaceholderBot: string;
    inputPlaceholderHuman: string;
    botThinking: string;
    onlineBadge: string;
    switchBackToBot: string;
    directChannelsLabel: string;
  }
> = {
  en: {
    launcherLabel: 'Message BryTech',
    launcherSub: 'Live Messenger · Online now',
    botTitle: 'Alex · BryTech Concierge',
    botSubtitle: 'Typically replies in seconds',
    humanTitle: 'Boris Brygin · Founder',
    humanSubtitle: 'Direct Founder Messenger · Online',
    todayLabel: 'Today',
    welcomeBotMsg:
      "Hey there! 👋 I'm Alex from BryTech. We build tailor-made unified systems that bring your CRM, bookings, WhatsApp/Telegram/Instagram bots, and finances into one clean platform. What kind of business are you running, or what can I help you with today?",
    quickPrompts: [
      'How much does a custom system cost?',
      'We want to unify our CRM, bookings & bots',
      'How fast can you build and launch?',
      'Connect me directly with Boris (Founder)',
    ],
    switchToHumanBtn: 'Chat Directly with Boris (Founder)',
    switchedToHumanNotice: 'Direct chat with Boris Brygin active · History shared',
    humanGreetingMsg:
      "Hi! Boris here 👋 I can see our conversation above. Tell me a bit about your current setup, or drop your WhatsApp / Telegram / phone number here and let's talk directly!",
    namePlaceholder: 'Your Name / Company',
    contactPlaceholder: 'WhatsApp / Telegram / Phone',
    saveProfileBtn: 'Save',
    inputPlaceholderBot: 'Write a message...',
    inputPlaceholderHuman: 'Message Boris directly...',
    botThinking: 'Alex is typing',
    onlineBadge: 'Online',
    switchBackToBot: 'Concierge',
    directChannelsLabel: 'Or open in your favorite app:',
  },
  ru: {
    launcherLabel: 'Написать нам',
    launcherSub: 'Живой Мессенджер · Онлайн',
    botTitle: 'Алекс · Консьерж BryTech',
    botSubtitle: 'Отвечает за несколько секунд',
    humanTitle: 'Борис Брыгин · Основатель',
    humanSubtitle: 'Прямой чат с основателем · Онлайн',
    todayLabel: 'Сегодня',
    welcomeBotMsg:
      'Привет! 👋 Я Алекс из команды BryTech. Мы создаем индивидуальные системы под ваш бизнес — объединяем CRM, онлайн-запись, ботов Telegram/WhatsApp/Instagram, финансы и клиентский кабинет в одну удобную платформу. Расскажите, чем занимается ваш бизнес или какой вопрос вас интересует?',
    quickPrompts: [
      'Сколько стоит разработка кастомной системы?',
      'Хотим объединить CRM, запись и ботов в 1 систему',
      'Какие сроки запуска проекта?',
      'Переключить чат напрямую на Бориса (Основатель)',
    ],
    switchToHumanBtn: 'Написать напрямую Борису (Основатель)',
    switchedToHumanNotice: 'Прямой чат с Борисом активирован · История передана',
    humanGreetingMsg:
      'Привет! Это Борис 👋 Я вижу вашу переписку выше. Напишите здесь детали вашей задачи или оставьте ваш Telegram / WhatsApp / телефон для прямой связи!',
    namePlaceholder: 'Ваше имя / Компания',
    contactPlaceholder: 'Telegram / WhatsApp / Телефон',
    saveProfileBtn: 'Ок',
    inputPlaceholderBot: 'Напишите сообщение...',
    inputPlaceholderHuman: 'Сообщение напрямую Борису...',
    botThinking: 'Алекс печатает',
    onlineBadge: 'В сети',
    switchBackToBot: 'Помощник',
    directChannelsLabel: 'Или перейдите в удобный мессенджер:',
  },
  uk: {
    launcherLabel: 'Написати нам',
    launcherSub: 'Живий Месенджер · Онлайн',
    botTitle: 'Алекс · Консьєрж BryTech',
    botSubtitle: 'Відповідає за лічені секунди',
    humanTitle: 'Борис Бригін · Засновник',
    humanSubtitle: 'Прямий чат із засновником · Онлайн',
    todayLabel: 'Сьогодні',
    welcomeBotMsg:
      'Привіт! 👋 Я Алекс із команди BryTech. Ми створюємо індивідуальні системи під ваш бізнес — об’єднуємо CRM, онлайн-запис, ботів Telegram/WhatsApp/Instagram та фінанси в одну зручну платформу. Розкажіть, чим займається ваша компанія або яке у вас запитання?',
    quickPrompts: [
      'Скільки коштує кастомна система?',
      'Хочемо об’єднати CRM, запис та ботів',
      'Які терміни розробки та запуску?',
      'З’єднати напряму з Борисом (Засновник)',
    ],
    switchToHumanBtn: 'Написати напряму Борису (Засновник)',
    switchedToHumanNotice: 'Прямий чат із Борисом активовано · Історію передано',
    humanGreetingMsg:
      'Вітаю! Це Борис 👋 Я бачу вашу розмову вище. Напишіть деталі вашого проєкту або залиште свій Telegram / WhatsApp / телефон!',
    namePlaceholder: 'Ваше ім’я / Компанія',
    contactPlaceholder: 'Telegram / WhatsApp / Телефон',
    saveProfileBtn: 'Ок',
    inputPlaceholderBot: 'Напишіть повідомлення...',
    inputPlaceholderHuman: 'Повідомлення напряму Борису...',
    botThinking: 'Алекс друкує',
    onlineBadge: 'Онлайн',
    switchBackToBot: 'Помічник',
    directChannelsLabel: 'Або відкрийте у зручному месенджері:',
  },
  he: {
    launcherLabel: 'שלחו לנו הודעה',
    launcherSub: 'מסנג׳ר חי · זמינים כעת',
    botTitle: 'אלכס · קונסיירז׳ BryTech',
    botSubtitle: 'עונה תוך שניות בודדות',
    humanTitle: 'בוריס בריגין · מייסד BryTech',
    humanSubtitle: 'צ׳אט ישיר עם המייסד · מחובר',
    todayLabel: 'היום',
    welcomeBotMsg:
      'היי! 👋 אני אלכס מצוות BryTech. אנחנו בונים מערכות מותאמות אישית שמאחדות CRM, יומן תורים, בוטים לוואטסאפ/טלגרם/אינסטגרם וכספים למערכת אחת חכמה. באיזה תחום העסק שלך, או במה אוכל לעזור לך היום?',
    quickPrompts: [
      'כמה עולה מערכת מותאמת אישית?',
      'אנחנו רוצים לאחד CRM, תורים ובוטים',
      'תוך כמה זמן המערכת מוכנה?',
      'חבר אותי ישירות לבוריס (המייסד)',
    ],
    switchToHumanBtn: 'שיחה ישירה עם בוריס (מייסד)',
    switchedToHumanNotice: 'מחובר ישירות לבוריס בריגין · היסטוריית הצ׳אט משותפת',
    humanGreetingMsg:
      'היי! כאן בוריס 👋 אני רואה את השיחה שלכם למעלה. ספר לי קצת על העסק שלך או השאר כאן וואטסאפ / טלגרם / טלפון ונדבר ישירות!',
    namePlaceholder: 'שם מלא / שם העסק',
    contactPlaceholder: 'וואטסאפ / טלגרם / טלפון',
    saveProfileBtn: 'שמור',
    inputPlaceholderBot: 'כתוב הודעה...',
    inputPlaceholderHuman: 'הודעה ישירה לבוריס...',
    botThinking: 'אלכס מקליד',
    onlineBadge: 'מחובר',
    switchBackToBot: 'עוזר חכם',
    directChannelsLabel: 'או דברו איתנו ישירות ב:',
  },
};

function createInitialVisitorSession(lang: Language): VisitorChatSessionRecord {
  const copy = WIDGET_COPY[lang];
  const visitorId = `visitor_${Math.random().toString(36).substring(2, 9)}_${Date.now().toString(36)}`;
  return {
    visitorId,
    visitorName: 'Website Visitor',
    visitorContact: '',
    businessType: 'Custom Unified System Inquiry',
    lang,
    mode: 'bot',
    unreadForAdmin: 0,
    updatedAtIso: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    messages: [
      {
        id: `vmsg_init_${Date.now()}`,
        visitorId,
        senderRole: 'bot',
        senderName: copy.botTitle,
        text: copy.welcomeBotMsg,
        sentAtIso: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ],
  };
}

export const VisitorLiveChatWidget: React.FC<VisitorLiveChatWidgetProps> = ({
  lang,
  prefilledTopic,
  onClearPrefilledTopic,
}) => {
  const copy = WIDGET_COPY[lang];
  const isRtl = lang === 'he';

  const [isOpen, setIsOpen] = useState(false);
  const [channels, setChannels] = useState<ContactChannelsConfig>(() =>
    loadSavedContactChannels()
  );
  const [session, setSession] = useState<VisitorChatSessionRecord>(() => {
    try {
      const saved = localStorage.getItem(VISITOR_SESSION_STORAGE_KEY);
      if (saved) {
        const parsed: VisitorChatSessionRecord = JSON.parse(saved);
        if (parsed && parsed.visitorId && Array.isArray(parsed.messages)) {
          return parsed;
        }
      }
    } catch {
      // ignore
    }
    return createInitialVisitorSession(lang);
  });

  const [inputText, setInputText] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [unreadAdminReplies, setUnreadAdminReplies] = useState(0);
  const [visitorNameInput, setVisitorNameInput] = useState(
    session.visitorName !== 'Website Visitor' ? session.visitorName : ''
  );
  const [visitorContactInput, setVisitorContactInput] = useState(session.visitorContact || '');
  const [profileSavedToast, setProfileSavedToast] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setChannels(loadSavedContactChannels());
    const unsub = realtimeChatHub.onContactChannels((updated) => {
      setChannels(updated);
    });
    return () => unsub();
  }, []);

  // Update initial bot welcome message if user hasn't sent any messages yet and switches language
  useEffect(() => {
    setSession((prev) => {
      if (prev.messages.length === 1 && prev.messages[0].senderRole === 'bot') {
        const updated: VisitorChatSessionRecord = {
          ...prev,
          lang,
          messages: [
            {
              ...prev.messages[0],
              senderName: WIDGET_COPY[lang].botTitle,
              text: WIDGET_COPY[lang].welcomeBotMsg,
            },
          ],
        };
        try {
          localStorage.setItem(VISITOR_SESSION_STORAGE_KEY, JSON.stringify(updated));
        } catch {
          // ignore
        }
        return updated;
      }
      return { ...prev, lang };
    });
  }, [lang]);

  // Handle prefilled topic (e.g. from Custom Pricing Builder)
  useEffect(() => {
    if (prefilledTopic) {
      setIsOpen(true);
      setInputText(prefilledTopic);
      onClearPrefilledTopic?.();
    }
  }, [prefilledTopic, onClearPrefilledTopic]);

  // Subscribe to real-time updates from Admin Panel
  useEffect(() => {
    const unsub = realtimeChatHub.onVisitorChatUpdate((incomingSession) => {
      if (incomingSession.visitorId !== session.visitorId) return;
      setSession((prev) => {
        const prevAdminCount = prev.messages.filter((m) => m.senderRole === 'admin').length;
        const nextAdminCount = incomingSession.messages.filter((m) => m.senderRole === 'admin').length;
        if (nextAdminCount > prevAdminCount && !isOpen) {
          setUnreadAdminReplies((u) => u + (nextAdminCount - prevAdminCount));
        }
        try {
          localStorage.setItem(VISITOR_SESSION_STORAGE_KEY, JSON.stringify(incomingSession));
        } catch {
          // ignore
        }
        return incomingSession;
      });
    });
    return () => unsub();
  }, [session.visitorId, isOpen]);

  useEffect(() => {
    if (isOpen) {
      setUnreadAdminReplies(0);
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 80);
    }
  }, [isOpen, session.messages.length, isBotTyping]);

  const persistAndBroadcastSession = async (nextSession: VisitorChatSessionRecord) => {
    setSession(nextSession);
    try {
      localStorage.setItem(VISITOR_SESSION_STORAGE_KEY, JSON.stringify(nextSession));
    } catch {
      // ignore
    }
    await realtimeChatHub.sendVisitorChatSession(nextSession);
  };

  const visitorHasInteractedWithBot = session.messages.some((m) => m.senderRole === 'visitor');

  const handleSwitchToHuman = async () => {
    if (session.mode === 'human') return;
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const handoffMessage: VisitorChatMessageRecord = {
      id: `vmsg_handoff_${Date.now()}`,
      visitorId: session.visitorId,
      senderRole: 'bot',
      senderName: copy.humanTitle,
      text: copy.humanGreetingMsg,
      sentAtIso: nowTime,
    };
    const nextSession: VisitorChatSessionRecord = {
      ...session,
      mode: 'human',
      unreadForAdmin: session.unreadForAdmin + 1,
      updatedAtIso: nowTime,
      messages: [...session.messages, handoffMessage],
    };
    await persistAndBroadcastSession(nextSession);
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = visitorNameInput.trim() || session.visitorName;
    const cleanContact = visitorContactInput.trim();
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const nextSession: VisitorChatSessionRecord = {
      ...session,
      visitorName: cleanName,
      visitorContact: cleanContact,
      updatedAtIso: nowTime,
    };
    await persistAndBroadcastSession(nextSession);
    setProfileSavedToast(true);
    setTimeout(() => setProfileSavedToast(false), 2500);
  };

  const sendVisitorText = async (rawText: string) => {
    const trimmed = rawText.trim();
    if (!trimmed) return;

    // Check if the user tapped the quick prompt asking to connect directly to Boris
    const lowerText = trimmed.toLowerCase();
    const wantsImmediateHumanSwitch =
      lowerText === 'connect me directly with boris (founder)' ||
      lowerText === 'переключить чат напрямую на бориса (основатель)' ||
      lowerText === 'з’єднати напряму з борисом (засновник)' ||
      lowerText === 'חבר אותי ישירות לבוריס (המייסד)';

    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const visitorMsg: VisitorChatMessageRecord = {
      id: `vmsg_${Date.now()}`,
      visitorId: session.visitorId,
      senderRole: 'visitor',
      senderName:
        visitorNameInput.trim() ||
        (session.visitorName !== 'Website Visitor' ? session.visitorName : 'Visitor'),
      text: trimmed,
      sentAtIso: nowTime,
    };

    const updatedWithUserMsg: VisitorChatSessionRecord = {
      ...session,
      visitorName:
        visitorNameInput.trim() ||
        (session.visitorName !== 'Website Visitor' ? session.visitorName : 'Website Visitor'),
      visitorContact: visitorContactInput.trim() || session.visitorContact,
      unreadForAdmin: session.unreadForAdmin + 1,
      updatedAtIso: nowTime,
      messages: [...session.messages, visitorMsg],
    };

    setInputText('');

    if (wantsImmediateHumanSwitch && session.mode === 'bot') {
      const handoffMessage: VisitorChatMessageRecord = {
        id: `vmsg_handoff_${Date.now() + 1}`,
        visitorId: session.visitorId,
        senderRole: 'bot',
        senderName: copy.humanTitle,
        text: copy.humanGreetingMsg,
        sentAtIso: nowTime,
      };
      await persistAndBroadcastSession({
        ...updatedWithUserMsg,
        mode: 'human',
        messages: [...updatedWithUserMsg.messages, handoffMessage],
      });
      return;
    }

    await persistAndBroadcastSession(updatedWithUserMsg);

    // If currently in Smart Concierge mode, fetch natural human-like response
    if (updatedWithUserMsg.mode === 'bot') {
      setIsBotTyping(true);
      try {
        const resp = await fetch('/api/visitor-bot', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: trimmed,
            history: updatedWithUserMsg.messages,
            lang,
            visitorName: updatedWithUserMsg.visitorName,
          }),
        });
        const data = await resp.json();
        const botReplyText = data?.reply || copy.humanGreetingMsg;

        const botMsg: VisitorChatMessageRecord = {
          id: `vmsg_bot_${Date.now()}`,
          visitorId: session.visitorId,
          senderRole: 'bot',
          senderName: copy.botTitle,
          text: botReplyText,
          sentAtIso: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        const afterBotSession: VisitorChatSessionRecord = {
          ...updatedWithUserMsg,
          updatedAtIso: botMsg.sentAtIso,
          messages: [...updatedWithUserMsg.messages, botMsg],
        };
        await persistAndBroadcastSession(afterBotSession);
      } catch {
        const botMsg: VisitorChatMessageRecord = {
          id: `vmsg_bot_${Date.now()}`,
          visitorId: session.visitorId,
          senderRole: 'bot',
          senderName: copy.botTitle,
          text: copy.humanGreetingMsg,
          sentAtIso: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        const afterBotSession: VisitorChatSessionRecord = {
          ...updatedWithUserMsg,
          messages: [...updatedWithUserMsg.messages, botMsg],
        };
        await persistAndBroadcastSession(afterBotSession);
      } finally {
        setIsBotTyping(false);
      }
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendVisitorText(inputText);
  };

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-50 flex flex-col items-end select-none"
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.94 }}
            transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
            className="mb-3.5 w-[calc(100vw-2rem)] sm:w-[400px] max-h-[84svh] rounded-[28px] bg-[#16171b] border border-white/15 shadow-[0_28px_80px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col text-white"
          >
            {/* Messenger Top Profile Bar (iMessage / Telegram Pro style) */}
            <div className="px-4 py-3.5 bg-[#1f2128] border-b border-white/10 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                {/* Avatar with live green status dot */}
                <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-[#0071e3] shrink-0 bg-[#1d1d1f] shadow-md">
                  <img
                    src={FOUNDER_AVATAR_URL}
                    alt="Boris Brygin"
                    className="w-full h-full object-cover object-[center_18%] contrast-[1.06] saturate-[0.90]"
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 ring-2 ring-[#1f2128]" />
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-[13.5px] font-bold text-white truncate">
                      {session.mode === 'bot' ? copy.botTitle : copy.humanTitle}
                    </h4>
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <p className="text-[11px] text-emerald-300/90 font-medium truncate">
                      {session.mode === 'bot' ? copy.botSubtitle : copy.humanSubtitle}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                {session.mode === 'human' ? (
                  <button
                    type="button"
                    onClick={() =>
                      persistAndBroadcastSession({
                        ...session,
                        mode: 'bot',
                      })
                    }
                    className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/15 text-[10.5px] font-semibold text-white/85 transition-colors cursor-pointer"
                  >
                    {copy.switchBackToBot}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSwitchToHuman}
                    className="px-2.5 py-1 rounded-full bg-[#0071e3]/25 hover:bg-[#0071e3]/40 border border-[#0071e3]/50 text-[10.5px] font-semibold text-[#7cc0ff] transition-colors cursor-pointer"
                    title={copy.switchToHumanBtn}
                  >
                    Boris · Live
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/8 hover:bg-white/15 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
                  aria-label="Minimize messenger"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Direct External Messengers Strip (Telegram, WhatsApp, Instagram, Call) */}
            <div className="px-3.5 py-2 bg-[#191b20] border-b border-white/8 flex items-center justify-between gap-2">
              <span className="text-[10.5px] text-white/55 font-medium truncate">
                {copy.directChannelsLabel}
              </span>
              <div className="flex items-center gap-1.5 shrink-0">
                <a
                  href={channels.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`Telegram: ${channels.telegramLabel}`}
                  className="px-2.5 py-1 rounded-full bg-[#0088cc]/20 hover:bg-[#0088cc] text-[#5bc0f8] hover:text-white border border-[#0088cc]/35 text-[10.5px] font-semibold inline-flex items-center gap-1 transition-all no-underline"
                >
                  <Send className="w-3 h-3" />
                  <span>TG</span>
                </a>
                <a
                  href={channels.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`WhatsApp: ${channels.whatsappLabel}`}
                  className="px-2.5 py-1 rounded-full bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-white border border-emerald-500/35 text-[10.5px] font-semibold inline-flex items-center gap-1 transition-all no-underline"
                >
                  <MessageCircle className="w-3 h-3" />
                  <span>WA</span>
                </a>
                <a
                  href={channels.instagramUrl || 'https://instagram.com/BryTech_Systems'}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`Instagram: ${channels.instagramLabel || '@BryTech_Systems'}`}
                  className="px-2.5 py-1 rounded-full bg-pink-500/20 hover:bg-pink-500 text-pink-300 hover:text-white border border-pink-500/35 text-[10.5px] font-semibold inline-flex items-center gap-1 transition-all no-underline"
                >
                  <Instagram className="w-3 h-3" />
                  <span>IG</span>
                </a>
                <a
                  href={`tel:${channels.phoneNumber.replace(/\s+/g, '')}`}
                  title={`Call: ${channels.phoneLabel}`}
                  className="w-6 h-6 rounded-full bg-white/10 hover:bg-[#0071e3] text-white/80 hover:text-white flex items-center justify-center transition-all no-underline"
                >
                  <PhoneCall className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Contact Info Bar when speaking directly with Boris */}
            {session.mode === 'human' && (
              <div className="px-3.5 py-2.5 bg-[#1b2434] border-b border-[#0071e3]/30">
                <form onSubmit={handleSaveProfile} className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  <input
                    type="text"
                    value={visitorNameInput}
                    onChange={(e) => setVisitorNameInput(e.target.value)}
                    placeholder={copy.namePlaceholder}
                    className="px-3 py-1.5 rounded-xl bg-black/30 border border-white/15 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-[#0071e3]"
                  />
                  <div className="flex items-center gap-1.5">
                    <input
                      type="text"
                      value={visitorContactInput}
                      onChange={(e) => setVisitorContactInput(e.target.value)}
                      placeholder={copy.contactPlaceholder}
                      className="w-full px-3 py-1.5 rounded-xl bg-black/30 border border-white/15 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-[#0071e3]"
                    />
                    <button
                      type="submit"
                      className="px-2.5 py-1.5 rounded-xl bg-[#0071e3] hover:bg-[#0077ed] text-white text-[11px] font-semibold shrink-0 cursor-pointer"
                    >
                      {profileSavedToast ? '✓' : copy.saveProfileBtn}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Authentic Messenger Conversation Area */}
            <div
              className="flex-1 overflow-y-auto px-3.5 py-4 space-y-3 max-h-[380px] min-h-[270px]"
              style={{
                backgroundColor: '#111216',
                backgroundImage:
                  'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)',
                backgroundSize: '18px 18px',
              }}
            >
              {/* Messenger Date Pill */}
              <div className="flex justify-center mb-2">
                <span className="px-3 py-0.5 rounded-full bg-white/[0.06] text-[10.5px] font-medium text-white/50">
                  {copy.todayLabel}
                </span>
              </div>

              {session.messages.map((msg) => {
                const isVisitor = msg.senderRole === 'visitor';
                const isAdmin = msg.senderRole === 'admin';
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.18 }}
                    className={`flex items-end gap-2 ${
                      isVisitor ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {/* Incoming Avatar */}
                    {!isVisitor && (
                      <div className="w-7 h-7 rounded-full overflow-hidden border border-white/15 shrink-0 mb-0.5 bg-[#1d1d1f]">
                        <img
                          src={FOUNDER_AVATAR_URL}
                          alt={msg.senderName}
                          className="w-full h-full object-cover object-[center_18%] contrast-[1.06] saturate-[0.90]"
                        />
                      </div>
                    )}

                    {/* Message Bubble */}
                    <div
                      className={`max-w-[82%] px-3.5 py-2.5 text-[13px] leading-[1.45] relative ${
                        isVisitor
                          ? 'bg-[#0071e3] text-white rounded-2xl rounded-br-xs shadow-sm'
                          : isAdmin
                          ? 'bg-[#222834] text-white border border-[#0071e3]/45 rounded-2xl rounded-bl-xs shadow-md'
                          : 'bg-[#21232b] text-white/95 border border-white/8 rounded-2xl rounded-bl-xs shadow-xs'
                      }`}
                    >
                      {!isVisitor && (
                        <div className="text-[10.5px] font-semibold text-[#68b5ff] mb-0.5">
                          {isAdmin ? copy.humanTitle : msg.senderName}
                        </div>
                      )}
                      <div className="whitespace-pre-line break-words">{msg.text}</div>
                      <div
                        className={`flex items-center justify-end gap-1 mt-1 text-[10px] ${
                          isVisitor ? 'text-white/75' : 'text-white/40'
                        }`}
                      >
                        <span>{msg.sentAtIso}</span>
                        {isVisitor && <CheckCheck className="w-3.5 h-3.5 text-sky-200" />}
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {/* Human-Like 3-Dot Messenger Typing Bubble */}
              {isBotTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-end gap-2 justify-start"
                >
                  <div className="w-7 h-7 rounded-full overflow-hidden border border-white/15 shrink-0 bg-[#1d1d1f]">
                    <img
                      src={FOUNDER_AVATAR_URL}
                      alt="Typing"
                      className="w-full h-full object-cover object-[center_18%]"
                    />
                  </div>
                  <div className="bg-[#21232b] border border-white/10 rounded-2xl rounded-bl-xs px-4 py-3 flex items-center gap-2">
                    <span className="text-[11px] text-white/60">{copy.botThinking}</span>
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#68b5ff] animate-bounce [animation-delay:-0.25s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#68b5ff] animate-bounce [animation-delay:-0.12s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#68b5ff] animate-bounce" />
                    </span>
                  </div>
                </motion.div>
              )}

              {/* Quick Conversation Starters */}
              {session.mode === 'bot' && !visitorHasInteractedWithBot && (
                <div className="pt-2 flex flex-wrap gap-1.5">
                  {copy.quickPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => sendVisitorText(prompt)}
                      className="text-left px-3 py-1.5 rounded-full bg-white/[0.06] hover:bg-[#0071e3]/25 border border-white/12 hover:border-[#0071e3]/60 text-[11.5px] text-white/90 transition-all cursor-pointer"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              )}

              {/* Natural Handoff Pill after interacting */}
              {session.mode === 'bot' && visitorHasInteractedWithBot && !isBotTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="pt-1 flex justify-center"
                >
                  <button
                    type="button"
                    onClick={handleSwitchToHuman}
                    className="py-2 px-4 rounded-full bg-gradient-to-r from-[#0071e3] to-[#005bb8] hover:brightness-110 text-white text-xs font-semibold inline-flex items-center gap-2 shadow-md transition-all cursor-pointer"
                  >
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>{copy.switchToHumanBtn}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Messenger Input Bar */}
            <form
              onSubmit={handleFormSubmit}
              className="p-3 bg-[#1f2128] border-t border-white/10 flex items-center gap-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={
                  session.mode === 'bot' ? copy.inputPlaceholderBot : copy.inputPlaceholderHuman
                }
                className="flex-1 px-4 py-2.5 rounded-full bg-[#121318] border border-white/12 text-[13px] text-white placeholder:text-white/45 focus:outline-none focus:border-[#0071e3]"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isBotTyping}
                className="w-10 h-10 rounded-full bg-[#0071e3] hover:bg-[#0077ed] disabled:opacity-40 text-white flex items-center justify-center shrink-0 transition-all cursor-pointer shadow-md"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Messenger Floating Launcher Button (Follows Scroll in Bottom-Right) */}
      <motion.button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.96 }}
        className="group relative flex items-center gap-3 p-2 sm:pr-5 sm:pl-2.5 sm:py-2 rounded-full bg-[#16171b]/95 backdrop-blur-xl text-white border border-white/15 hover:border-[#0071e3] shadow-[0_16px_40px_rgba(0,0,0,0.4)] transition-all cursor-pointer"
        aria-label={copy.launcherLabel}
      >
        {/* Human Avatar + Messenger Badge */}
        <div className="relative w-12 h-12 rounded-full p-0.5 bg-gradient-to-tr from-[#0071e3] to-[#38bdf8] shrink-0">
          <div className="w-full h-full rounded-full overflow-hidden bg-[#1d1d1f] flex items-center justify-center">
            {isOpen ? (
              <X className="w-5 h-5 text-white" />
            ) : (
              <img
                src={FOUNDER_AVATAR_URL}
                alt="BryTech Messenger"
                className="w-full h-full object-cover object-[center_18%] contrast-[1.06] saturate-[0.90]"
              />
            )}
          </div>
          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-400 ring-2 ring-[#16171b]" />
        </div>

        {/* Desktop Text Label */}
        <div className="hidden sm:flex flex-col items-start text-left">
          <div className="flex items-center gap-1.5">
            <span className="text-[13px] font-bold tracking-tight text-white">
              {copy.launcherLabel}
            </span>
            <Sparkles className="w-3.5 h-3.5 text-[#38bdf8]" />
          </div>
          <span className="text-[11px] font-medium text-emerald-400">
            {copy.launcherSub}
          </span>
        </div>

        {/* Unread Reply Badge */}
        {unreadAdminReplies > 0 && (
          <span className="absolute -top-1.5 -right-1.5 min-w-5 h-5 px-1.5 rounded-full bg-rose-500 text-white text-[11px] font-bold flex items-center justify-center shadow-md animate-bounce">
            {unreadAdminReplies}
          </span>
        )}
      </motion.button>
    </div>
  );
};
