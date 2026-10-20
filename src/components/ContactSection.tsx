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
  CheckCircle2,
  MapPin,
  Shield,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';

interface ContactSectionProps {
  lang: Language;
  prefilledSubject?: string | null;
  onOpenAdminGate?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  lang,
  prefilledSubject,
  onOpenAdminGate,
}) => {
  const t = TRANSLATIONS[lang];

  const [fullName, setFullName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [phoneOrHandle, setPhoneOrHandle] = useState('');
  const [selectedSystem, setSelectedSystem] = useState(
    prefilledSubject || t.contact.deliverableOptions[0]
  );
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const [contactChannels, setContactChannels] = useState<ContactChannelsConfig>(() =>
    loadSavedContactChannels()
  );

  useEffect(() => {
    if (prefilledSubject) {
      setSelectedSystem(prefilledSubject);
    }
  }, [prefilledSubject]);

  useEffect(() => {
    setContactChannels(loadSavedContactChannels());
    const unsub = realtimeChatHub.onContactChannels((updated) => {
      setContactChannels(updated);
    });
    return () => unsub();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phoneOrHandle.trim()) return;

    await realtimeChatHub.sendMessage(
      {
        id: `lead_msg_${Date.now()}`,
        clientId: 'client_kyiv_clinic',
        ownerUid: 'demo_user',
        senderRole: 'client',
        senderName: `${fullName.trim()} (${businessName.trim() || 'Website Lead'})`,
        text: `[New Contact Page Inquiry — ${selectedSystem}] Contact: ${phoneOrHandle.trim()}. ${notes.trim()}`,
        sentAtIso: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      },
      false
    );

    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      dir={t.dir}
      className="relative w-full min-h-[100svh] flex flex-col justify-between bg-[#f5f5f7] text-[#1d1d1f] pt-28 pb-16 px-4 sm:px-8 overflow-hidden"
    >
      <div className="max-w-[1920px] w-full mx-auto my-auto px-0 sm:px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#0071e3]/10 text-[#0071e3] text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            {t.contact.processTag}
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-bold tracking-[-0.035em] text-[#1d1d1f] leading-[1.08] mb-4">
            {t.contact.line1}{' '}
            <span className="text-[#0071e3]">{t.contact.line2}</span>
          </h1>
          <p className="text-base sm:text-lg text-[#6e6e73] leading-relaxed">
            {t.contact.intro}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Direct Messenger & Call Cards (Telegram, WhatsApp, Instagram, Phone) */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="lg:col-span-5 space-y-3.5"
          >
            <a
              href={contactChannels.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-5 rounded-3xl bg-white border border-black/[0.06] hover:border-[#0088cc] shadow-xs hover:shadow-md transition-all flex items-center justify-between gap-4 no-underline"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#0088cc] text-white flex items-center justify-center shrink-0">
                  <Send className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#0088cc]">Telegram</div>
                  <div className="text-base font-bold text-[#1d1d1f]">
                    {contactChannels.telegramLabel || '@Brytech_systems'}
                  </div>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-[#6e6e73] group-hover:text-[#0088cc] transition-colors" />
            </a>

            <a
              href={contactChannels.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-5 rounded-3xl bg-white border border-black/[0.06] hover:border-emerald-500 shadow-xs hover:shadow-md transition-all flex items-center justify-between gap-4 no-underline"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#25D366] text-white flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-emerald-600">WhatsApp</div>
                  <div className="text-base font-bold text-[#1d1d1f]">
                    {contactChannels.whatsappLabel || '+380 63 712 7001'}
                  </div>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-[#6e6e73] group-hover:text-emerald-600 transition-colors" />
            </a>

            <a
              href={contactChannels.instagramUrl || 'https://instagram.com/BryTech_Systems'}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-5 rounded-3xl bg-white border border-black/[0.06] hover:border-pink-500 shadow-xs hover:shadow-md transition-all flex items-center justify-between gap-4 no-underline"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white flex items-center justify-center shrink-0">
                  <Instagram className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-pink-600">Instagram</div>
                  <div className="text-base font-bold text-[#1d1d1f]">
                    {contactChannels.instagramLabel || '@BryTech_Systems'}
                  </div>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-[#6e6e73] group-hover:text-pink-600 transition-colors" />
            </a>

            <a
              href={`tel:${contactChannels.phoneNumber.replace(/\s+/g, '')}`}
              className="group p-5 rounded-3xl bg-[#1d1d1f] text-white shadow-md hover:bg-[#0071e3] transition-all flex items-center justify-between gap-4 no-underline"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/15 text-white flex items-center justify-center shrink-0">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white/75">Direct Phone Line</div>
                  <div className="text-base font-bold text-white">
                    {contactChannels.phoneLabel || '+380 63 712 7001'}
                  </div>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-white/75" />
            </a>

            <div className="p-5 rounded-3xl bg-white border border-black/[0.06] space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#0071e3]">
                <MapPin className="w-4 h-4" />
                <span>Direct Founder &amp; Architecture Desk</span>
              </div>
              <p className="text-xs sm:text-sm text-[#6e6e73] m-0 leading-relaxed">
                Every inquiry is reviewed directly by Boris Brygin and our senior systems architects within 15 minutes during business hours.
              </p>
            </div>
          </motion.div>

          {/* Right: Clean Apple Project Inquiry Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.14 }}
            className="lg:col-span-7 rounded-[32px] bg-white p-7 sm:p-10 border border-black/[0.06] shadow-[0_18px_50px_rgba(0,0,0,0.05)]"
          >
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-[#1d1d1f]">
                  {t.contact.successTitle}
                </h3>
                <p className="text-sm sm:text-base text-[#6e6e73] max-w-md mx-auto">
                  {t.contact.successText}
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-3 rounded-full bg-[#0071e3] text-white text-xs font-semibold cursor-pointer"
                >
                  {t.contact.resetBtn}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-xl sm:text-2xl font-bold text-[#1d1d1f] tracking-tight mb-2">
                  {t.contact.formTitle}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#6e6e73] mb-1.5">
                      {t.contact.nameLabel} *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Your Name"
                      className="w-full px-4 py-3.5 rounded-2xl bg-[#f5f5f7] border border-transparent focus:border-[#0071e3] focus:bg-white text-sm text-[#1d1d1f] focus:outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#6e6e73] mb-1.5">
                      {t.contact.businessLabel}
                    </label>
                    <input
                      type="text"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder="Company / Studio Name"
                      className="w-full px-4 py-3.5 rounded-2xl bg-[#f5f5f7] border border-transparent focus:border-[#0071e3] focus:bg-white text-sm text-[#1d1d1f] focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#6e6e73] mb-1.5">
                      {t.contact.emailLabel} *
                    </label>
                    <input
                      type="text"
                      required
                      value={phoneOrHandle}
                      onChange={(e) => setPhoneOrHandle(e.target.value)}
                      placeholder="Phone, @Telegram, or Email"
                      className="w-full px-4 py-3.5 rounded-2xl bg-[#f5f5f7] border border-transparent focus:border-[#0071e3] focus:bg-white text-sm text-[#1d1d1f] focus:outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#6e6e73] mb-1.5">
                      {t.contact.deliverableLabel}
                    </label>
                    <select
                      value={selectedSystem}
                      onChange={(e) => setSelectedSystem(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-2xl bg-[#f5f5f7] border border-transparent focus:border-[#0071e3] focus:bg-white text-sm text-[#1d1d1f] focus:outline-none transition-all"
                    >
                      {t.contact.deliverableOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#6e6e73] mb-1.5">
                    {t.contact.notesLabel}
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder={t.contact.notesPlaceholder}
                    className="w-full px-4 py-3.5 rounded-2xl bg-[#f5f5f7] border border-transparent focus:border-[#0071e3] focus:bg-white text-sm text-[#1d1d1f] focus:outline-none transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#0071e3]/25 transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{t.contact.submitBtn}</span>
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      <footer className="max-w-[1280px] w-full mx-auto pt-12 mt-12 border-t border-black/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6e6e73]">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-[#0071e3]" />
          <span className="font-bold text-[#1d1d1f]">BryTech</span>
          <span>{t.contact.footerTagline}</span>
        </div>

        {onOpenAdminGate && (
          <button
            type="button"
            onClick={onOpenAdminGate}
            aria-label="Admin Portal"
            title="Admin Portal"
            className="w-8 h-8 rounded-full bg-black/[0.04] hover:bg-black/[0.09] text-[#6e6e73] hover:text-[#1d1d1f] flex items-center justify-center transition-colors cursor-pointer"
          >
            <Shield className="w-3.5 h-3.5" />
          </button>
        )}
      </footer>
    </section>
  );
};
