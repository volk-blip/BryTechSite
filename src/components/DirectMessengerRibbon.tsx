import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Language, TRANSLATIONS } from '../i18n/translations';
import {
  realtimeChatHub,
  ContactChannelsConfig,
  loadSavedContactChannels,
} from '../services/realtimeChat';
import {
  Send,
  MessageCircle,
  PhoneCall,
  Instagram,
  Sparkles,
  ArrowUpRight,
  Clock,
} from 'lucide-react';
import { ActivePageView } from './Navbar';

interface DirectMessengerRibbonProps {
  lang: Language;
  onSelectPage: (page: ActivePageView) => void;
}

const RIBBON_COPY: Record<
  Language,
  {
    badge: string;
    title: string;
    subtitle: string;
    replySpeed: string;
    tgTitle: string;
    tgDesc: string;
    tgCta: string;
    waTitle: string;
    waDesc: string;
    waCta: string;
    igTitle: string;
    igDesc: string;
    igCta: string;
    callTitle: string;
    callDesc: string;
    callCta: string;
    fullContactLink: string;
  }
> = {
  en: {
    badge: 'Instant Direct Connection · Online Now',
    title: 'Prefer to Chat Directly? Click & Send Us a Message in 1 Tap.',
    subtitle:
      'Skip long forms. Reach us directly on Telegram, WhatsApp, Instagram, or by phone — we reply within minutes.',
    replySpeed: 'Average reply time: under 4 minutes',
    tgTitle: 'Chat on Telegram',
    tgDesc: 'Instant voice notes, system screenshots & live scope Q&A with our team.',
    tgCta: 'Message on Telegram',
    waTitle: 'Chat on WhatsApp',
    waDesc: 'Direct WhatsApp Business line for fast quotes & live system demos.',
    waCta: 'Open WhatsApp Chat',
    igTitle: 'Follow & DM on Instagram',
    igDesc: 'Explore our latest custom builds, reels & send us a direct message anytime.',
    igCta: 'Open Instagram',
    callTitle: 'Direct Executive Call',
    callDesc: 'Speak directly with Boris Brygin for an immediate consultation.',
    callCta: 'Call Now',
    fullContactLink: 'Or open full Contact & Custom Brief Page →',
  },
  ru: {
    badge: 'Прямая Связь с Основателем · Сейчас Онлайн',
    title: 'Удобнее Написать в Мессенджер? Отправьте Сообщение в 1 Клик.',
    subtitle:
      'Без длинных анкет. Напишите нам напрямую в Telegram, WhatsApp, Instagram или позвоните — отвечаем за несколько минут.',
    replySpeed: 'Среднее время ответа: до 4 минут',
    tgTitle: 'Написать в Telegram',
    tgDesc: 'Быстрый обмен голосовыми, скриншотами и обсуждение архитектуры вашей системы.',
    tgCta: 'Открыть Telegram',
    waTitle: 'Написать в WhatsApp',
    waDesc: 'Прямой бизнес-чат WhatsApp для быстрой оценки проекта и живого демо.',
    waCta: 'Открыть WhatsApp',
    igTitle: 'Написать в Instagram',
    igDesc: 'Смотрите обзоры наших систем и пишите нам напрямую в Direct в любое время.',
    igCta: 'Открыть Instagram',
    callTitle: 'Прямой Звонок',
    callDesc: 'Позвоните напрямую для мгновенной консультации по вашей будущей системе.',
    callCta: 'Позвонить Сейчас',
    fullContactLink: 'Или перейти на полную страницу Контактов и Брифа →',
  },
  uk: {
    badge: 'Миттєвий Прямий Зв’язок · Зараз Онлайн',
    title: 'Зручніше Написати в Месенджер? Надішліть Повідомлення в 1 Клік.',
    subtitle:
      'Без довгих анкет. Напишіть нам напряму в Telegram, WhatsApp, Instagram або зателефонуйте — відповідаємо за лічені хвилини.',
    replySpeed: 'Середній час відповіді: до 4 хвилин',
    tgTitle: 'Написати в Telegram',
    tgDesc: 'Швидкі голосові повідомлення, скріншоти та обговорення вашої системи.',
    tgCta: 'Відкрити Telegram',
    waTitle: 'Написати у WhatsApp',
    waDesc: 'Прямий бізнес-чат WhatsApp для швидкого прорахунку та живого демо.',
    waCta: 'Відкрити WhatsApp',
    igTitle: 'Написати в Instagram',
    igDesc: 'Дивіться наші проєкти та пишіть у Direct для швидкої консультації.',
    igCta: 'Відкрити Instagram',
    callTitle: 'Прямий Дзвінок',
    callDesc: 'Зателефонуйте напряму для миттєвої консультації щодо вашого бізнесу.',
    callCta: 'Зателефонувати',
    fullContactLink: 'Або перейти на повну сторінку Контактів →',
  },
  he: {
    badge: 'קשר ישיר ומהיר · זמינים כעת אונליין',
    title: 'מעדיפים לשלוח הודעה מהירה? לחצו ושלחו לנו הודעה בקליק אחד.',
    subtitle:
      'בלי טפסים ארוכים. דברו איתנו ישירות בטלגרם, בוואטסאפ, באינסטגרם או בטלפון — אנו עונים תוך דקות.',
    replySpeed: 'זמן תגובה ממוצע: פחות מ-4 דקות',
    tgTitle: 'שיחה בטלגרם',
    tgDesc: 'הודעות קוליות, צילומי מסך והתייעצות מהירה עם הצוות שלנו.',
    tgCta: 'שלח הודעת טלגרם',
    waTitle: 'שיחה בוואטסאפ',
    waDesc: 'קו וואטסאפ ישיר להצעות מחיר מהירות והדגמה חיה.',
    waCta: 'פתח צ׳אט וואטסאפ',
    igTitle: 'הודעה באינסטגרם',
    igDesc: 'צפו במערכות שבנינו ושלחו לנו הודעה ישירה ב-DM בכל עת.',
    igCta: 'פתח אינסטגרם',
    callTitle: 'שיחת טלפון ישירה',
    callDesc: 'שוחחו ישירות לייעוץ מיידי ואפיון המערכת שלכם.',
    callCta: 'התקשרו עכשיו',
    fullContactLink: 'או עבור לעמוד יצירת קשר המלא ←',
  },
};

export const DirectMessengerRibbon: React.FC<DirectMessengerRibbonProps> = ({
  lang,
  onSelectPage,
}) => {
  const t = TRANSLATIONS[lang];
  const copy = RIBBON_COPY[lang];
  const [channels, setChannels] = useState<ContactChannelsConfig>(() =>
    loadSavedContactChannels()
  );

  useEffect(() => {
    setChannels(loadSavedContactChannels());
    const unsub = realtimeChatHub.onContactChannels((updated) => {
      setChannels(updated);
    });
    return () => {
      unsub();
    };
  }, []);

  const tgLabel = channels.telegramLabel || channels.telegramHandle || '@Brytech_systems';
  const waLabel = channels.whatsappLabel || channels.whatsappNumber || '+380 63 712 7001';
  const igLabel = channels.instagramLabel || channels.instagramHandle || '@BryTech_Systems';
  const phLabel = channels.phoneLabel || channels.phoneDisplay || '+380 63 712 7001';

  return (
    <section
      id="direct-messengers"
      dir={t.dir}
      className="relative w-full min-h-[100svh] flex flex-col justify-center bg-[#1d1d1f] text-white py-24 px-4 sm:px-8 lg:px-12 xl:px-16 overflow-hidden"
    >
      {/* Ambient Inviting Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[540px] rounded-full opacity-35 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(0,113,227,0.45) 0%, rgba(16,185,129,0.3) 45%, transparent 75%)',
        }}
      />

      <div className="relative z-10 w-full max-w-[1920px] mx-auto my-auto">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-4xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-emerald-400 text-xs font-semibold tracking-tight mb-5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>{copy.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-[54px] font-bold tracking-[-0.035em] text-white leading-[1.08] mb-5">
            {copy.title}
          </h2>

          <p className="text-base sm:text-lg text-white/70 leading-relaxed mb-4">
            {copy.subtitle}
          </p>

          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#15BCDF]">
            <Clock className="w-3.5 h-3.5" />
            <span>{copy.replySpeed}</span>
          </div>
        </motion.div>

        {/* 4 Inviting Interactive Messenger & Call Cards (Telegram, WhatsApp, Instagram, Call) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {/* 1. Telegram Interactive Card */}
          <motion.a
            href={channels.telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.04 }}
            whileHover={{ y: -8, scale: 1.015 }}
            whileTap={{ scale: 0.99 }}
            className="group relative rounded-[32px] bg-gradient-to-b from-white/[0.1] to-white/[0.04] hover:from-[#0088cc]/30 hover:to-[#0088cc]/10 border border-white/15 hover:border-[#0088cc] p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 shadow-[0_24px_60px_rgba(0,0,0,0.3)] cursor-pointer no-underline text-white"
          >
            <div>
              <div className="flex items-center justify-between gap-3 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-[#0088cc] text-white flex items-center justify-center shadow-[0_12px_30px_rgba(0,136,204,0.45)] group-hover:scale-110 transition-transform duration-300">
                  <Send className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full bg-[#0088cc]/20 border border-[#0088cc]/40 text-[#5bc0f8] text-xs font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#5bc0f8] animate-pulse" />
                  Telegram
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-1.5">
                {copy.tgTitle}
              </h3>
              <div className="text-sm font-mono font-semibold text-[#5bc0f8] mb-3.5">
                {tgLabel}
              </div>
              <p className="text-sm text-white/70 leading-relaxed mb-7">{copy.tgDesc}</p>
            </div>

            <div className="w-full py-3.5 px-5 rounded-full bg-[#0088cc] group-hover:bg-[#0099e6] text-white font-bold text-xs sm:text-sm flex items-center justify-between shadow-lg transition-colors">
              <span>{copy.tgCta}</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </motion.a>

          {/* 2. WhatsApp Interactive Card */}
          <motion.a
            href={channels.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -8, scale: 1.015 }}
            whileTap={{ scale: 0.99 }}
            className="group relative rounded-[32px] bg-gradient-to-b from-white/[0.1] to-white/[0.04] hover:from-emerald-500/30 hover:to-emerald-500/10 border border-white/15 hover:border-emerald-400 p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 shadow-[0_24px_60px_rgba(0,0,0,0.3)] cursor-pointer no-underline text-white"
          >
            <div>
              <div className="flex items-center justify-between gap-3 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-[0_12px_30px_rgba(16,185,129,0.45)] group-hover:scale-110 transition-transform duration-300">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  WhatsApp
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-1.5">
                {copy.waTitle}
              </h3>
              <div className="text-sm font-mono font-semibold text-emerald-300 mb-3.5">
                {waLabel}
              </div>
              <p className="text-sm text-white/70 leading-relaxed mb-7">{copy.waDesc}</p>
            </div>

            <div className="w-full py-3.5 px-5 rounded-full bg-emerald-500 group-hover:bg-emerald-400 text-[#111] font-bold text-xs sm:text-sm flex items-center justify-between shadow-lg transition-colors">
              <span>{copy.waCta}</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </motion.a>

          {/* 3. Instagram Interactive Card */}
          <motion.a
            href={channels.instagramUrl || 'https://instagram.com/BryTech_Systems'}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.16 }}
            whileHover={{ y: -8, scale: 1.015 }}
            whileTap={{ scale: 0.99 }}
            className="group relative rounded-[32px] bg-gradient-to-b from-white/[0.1] to-white/[0.04] hover:from-pink-500/30 hover:to-purple-500/10 border border-white/15 hover:border-pink-400 p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 shadow-[0_24px_60px_rgba(0,0,0,0.3)] cursor-pointer no-underline text-white"
          >
            <div>
              <div className="flex items-center justify-between gap-3 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white flex items-center justify-center shadow-[0_12px_30px_rgba(220,39,67,0.45)] group-hover:scale-110 transition-transform duration-300">
                  <Instagram className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full bg-pink-500/20 border border-pink-400/40 text-pink-300 text-xs font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" />
                  Instagram
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-1.5">
                {copy.igTitle}
              </h3>
              <div className="text-sm font-mono font-semibold text-pink-300 mb-3.5">
                {igLabel}
              </div>
              <p className="text-sm text-white/70 leading-relaxed mb-7">{copy.igDesc}</p>
            </div>

            <div className="w-full py-3.5 px-5 rounded-full bg-gradient-to-r from-[#e1306c] to-[#bc1888] group-hover:brightness-110 text-white font-bold text-xs sm:text-sm flex items-center justify-between shadow-lg transition-all">
              <span>{copy.igCta}</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </motion.a>

          {/* 4. Direct Phone Call Interactive Card */}
          <motion.a
            href={`tel:${channels.phoneNumber.replace(/\s+/g, '')}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.22 }}
            whileHover={{ y: -8, scale: 1.015 }}
            whileTap={{ scale: 0.99 }}
            className="group relative rounded-[32px] bg-gradient-to-b from-white/[0.1] to-white/[0.04] hover:from-[#0071e3]/30 hover:to-[#0071e3]/10 border border-white/15 hover:border-[#0071e3] p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 shadow-[0_24px_60px_rgba(0,0,0,0.3)] cursor-pointer no-underline text-white"
          >
            <div>
              <div className="flex items-center justify-between gap-3 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-[#0071e3] text-white flex items-center justify-center shadow-[0_12px_30px_rgba(0,113,227,0.45)] group-hover:scale-110 transition-transform duration-300">
                  <PhoneCall className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full bg-[#0071e3]/25 border border-[#0071e3]/50 text-[#68b5ff] text-xs font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Direct Line
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-1.5">
                {copy.callTitle}
              </h3>
              <div className="text-sm font-mono font-semibold text-[#68b5ff] mb-3.5">
                {phLabel}
              </div>
              <p className="text-sm text-white/70 leading-relaxed mb-7">{copy.callDesc}</p>
            </div>

            <div className="w-full py-3.5 px-5 rounded-full bg-[#0071e3] group-hover:bg-[#0077ed] text-white font-bold text-xs sm:text-sm flex items-center justify-between shadow-lg transition-colors">
              <span>{copy.callCta}</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </motion.a>
        </div>

        {/* Link to Dedicated Contact Page */}
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={() => onSelectPage('contact')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-xs sm:text-sm font-semibold text-white/85 hover:text-white transition-all cursor-pointer"
          >
            <span>{copy.fullContactLink}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
