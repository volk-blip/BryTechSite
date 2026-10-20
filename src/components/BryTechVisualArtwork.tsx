import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { LazyImage } from './LazyMedia';
import { PRODUCT_ARTWORK_IMAGES, ProductVisualId } from '../utils/productArtworkDataUris';
import { CheckCircle2, Sparkles, Calendar } from 'lucide-react';

export type ArtworkVariant = ProductVisualId;

interface BryTechVisualArtworkProps {
  variant: ArtworkVariant;
  className?: string;
  compact?: boolean;
}

export const BryTechVisualArtwork: React.FC<BryTechVisualArtworkProps> = ({
  variant,
  className = '',
  compact = false,
}) => {
  const [activeSlot, setActiveSlot] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveSlot((prev) => (prev + 1) % 3);
    }, 2400);
    return () => window.clearInterval(id);
  }, []);

  if (variant === 'corridor') {
    return (
      <div
        className={`relative w-full overflow-hidden rounded-3xl bg-white text-[#1d1d1f] border border-black/[0.07] p-6 sm:p-7 select-none shadow-[0_20px_50px_rgba(0,0,0,0.06)] ${className}`}
      >
        <div className="flex items-center justify-between gap-2 mb-5 pb-4 border-b border-black/[0.06]">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0071e3] animate-pulse" />
            <span className="text-xs font-semibold tracking-tight text-[#0071e3]">
              BryTech Custom Unified Business Operating System
            </span>
          </div>
          <span className="px-3 py-1 rounded-full bg-[#f5f5f7] text-[11px] font-semibold text-[#6e6e73]">
            EN · UA · RU · HE
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
          <motion.div
            whileHover={{ y: -3 }}
            className="rounded-2xl bg-[#f5f5f7] p-5 border border-black/[0.04]"
          >
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#0071e3] block mb-1">
              Front-Office &amp; Intake
            </span>
            <h4 className="text-base font-bold text-[#1d1d1f]">Booking &amp; Web Portal</h4>
            <p className="text-xs text-[#6e6e73] mt-1">
              Custom client intake, self-scheduling &amp; multi-channel lead capture
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              <span className="px-2.5 py-1 rounded-lg bg-white text-[10px] font-semibold text-[#1d1d1f] shadow-xs">
                24/7 Web &amp; Mobile
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white text-[10px] font-semibold text-[#1d1d1f] shadow-xs">
                Instant Sync
              </span>
            </div>
          </motion.div>

          <div className="flex flex-col items-center justify-center py-3">
            <div className="relative w-full flex items-center justify-center">
              <div className="h-[2px] w-full bg-gradient-to-r from-[#0071e3] via-[#d4af37] to-[#10b981]" />
              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 2.8, repeat: Infinity }}
                className="absolute px-4 py-2 rounded-full bg-[#1d1d1f] text-white text-[11px] font-bold shadow-lg flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>1 Unified Core DB</span>
              </motion.div>
            </div>
            <span className="mt-5 text-[11px] font-medium text-[#6e6e73]">
              100% Custom-Built Around Your Workflows
            </span>
          </div>

          <motion.div
            whileHover={{ y: -3 }}
            className="rounded-2xl bg-[#f5f5f7] p-5 border border-black/[0.04]"
          >
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#b38f24] block mb-1">
              Back-Office &amp; Growth
            </span>
            <h4 className="text-base font-bold text-[#1d1d1f]">CRM, Bots &amp; Finance</h4>
            <p className="text-xs text-[#6e6e73] mt-1">
              Automated WhatsApp/Telegram bots, payroll, inventory &amp; live P&amp;L
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              <span className="px-2.5 py-1 rounded-lg bg-white text-[10px] font-semibold text-[#1d1d1f] shadow-xs">
                WhatsApp / Telegram
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white text-[10px] font-semibold text-[#1d1d1f] shadow-xs">
                ERP &amp; Payments
              </span>
            </div>
          </motion.div>
        </div>

        <div className="mt-5 pt-4 border-t border-black/[0.06] grid grid-cols-3 gap-3 text-center">
          <div className="rounded-xl bg-[#f5f5f7] py-2.5 px-3">
            <div className="text-sm sm:text-base font-bold text-[#1d1d1f]">-70%</div>
            <div className="text-[11px] text-[#6e6e73]">SaaS &amp; Admin Costs</div>
          </div>
          <div className="rounded-xl bg-[#f5f5f7] py-2.5 px-3">
            <div className="text-sm sm:text-base font-bold text-[#0071e3]">100%</div>
            <div className="text-[11px] text-[#6e6e73]">Custom Workflow Fit</div>
          </div>
          <div className="rounded-xl bg-[#f5f5f7] py-2.5 px-3">
            <div className="text-sm sm:text-base font-bold text-[#10b981]">24/7</div>
            <div className="text-[11px] text-[#6e6e73]">Automated Operations</div>
          </div>
        </div>
      </div>
    );
  }

  const imageUri = PRODUCT_ARTWORK_IMAGES[variant] || PRODUCT_ARTWORK_IMAGES.websites;

  const overlayMeta: Record<
    ArtworkVariant,
    {
      badge: string;
      metric: string;
      sub: string;
      livePills: string[];
      accentColor: string;
    }
  > = {
    websites: {
      badge: 'Custom Web & Booking System',
      metric: '+68% Direct Conversions',
      sub: 'Tailored intake & self-booking built around your rules',
      livePills: ['10:30 AM · Confirmed', '12:00 PM · Online Deposit Paid', '03:15 PM · Synced to CRM'],
      accentColor: '#0071e3',
    },
    crm: {
      badge: 'Custom CRM & Operations Core',
      metric: '94% Client Retention',
      sub: 'Unified client history, custom pipelines & staff KPIs',
      livePills: ['VIP Loyalty Triggered', 'Auto-Followup Sent', 'Staff Commission Calculated'],
      accentColor: '#10b981',
    },
    portal: {
      badge: 'Dedicated Client & Partner Portal',
      metric: '100% Live Transparency',
      sub: 'Self-service cabinet, live status, notes & direct chat',
      livePills: ['Milestone #3 Approved', 'Client Note Synced', 'Direct Support Online'],
      accentColor: '#d4af37',
    },
    automation: {
      badge: 'WhatsApp & Telegram Automation',
      metric: '-78% Manual Admin Work',
      sub: '2-way conversational bots synced with your database',
      livePills: ['WhatsApp Reminder Read', 'Telegram Bot Confirmed', '5★ Review Collected'],
      accentColor: '#0071e3',
    },
    corridor: {
      badge: 'Unified System Architecture',
      metric: '99.98% Uptime',
      sub: 'All Business Operations in One Custom System',
      livePills: ['Multi-Branch Synced', 'EN / UA / RU / HE Ready', 'Zero Per-Seat Tax'],
      accentColor: '#0071e3',
    },
    'clinic-case': {
      badge: 'Custom Medical & Clinic OS',
      metric: '-68% No-Show Rate',
      sub: 'Doctor schedules, EMR cards & automated reminders',
      livePills: ['Dr. Koval · 14:00 Confirmed', 'Digital Intake Signed', 'Reminder Delivered'],
      accentColor: '#0071e3',
    },
    'telaviv-case': {
      badge: 'Aesthetic & Multi-Branch OS',
      metric: '3.1x Lead Velocity',
      sub: 'Custom treatment packages & WhatsApp concierge',
      livePills: ['Package Session 3/6 Logged', 'Instant Deposit Received', 'VIP Recall Scheduled'],
      accentColor: '#d4af37',
    },
    'lviv-case': {
      badge: 'Multi-Location Service OS',
      metric: '-82% Manual Routine',
      sub: 'Automated resource load, inventory & payroll control',
      livePills: ['4 Locations Synced', 'Inventory Auto-Deducted', 'Payroll Export Ready'],
      accentColor: '#10b981',
    },
    'haifa-case': {
      badge: 'Field & Bay Dispatch OS',
      metric: '+54% Repeat Orders',
      sub: 'Custom work-order tracking & automated client alerts',
      livePills: ['Order #204 Scheduled', 'Status Alert Sent', 'Invoice Paid Online'],
      accentColor: '#0071e3',
    },
  };

  const currentMeta = overlayMeta[variant] || overlayMeta.websites;

  return (
    <div
      className={`relative w-full h-full overflow-hidden rounded-2xl bg-gradient-to-br from-[#f5f5f7] via-white to-[#eef2f6] select-none group border border-black/[0.06] ${className}`}
    >
      {/* Crisp Apple/Altegio Vector Artwork */}
      <LazyImage
        src={imageUri}
        alt={currentMeta.badge}
        className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        wrapperClassName="w-full h-full"
      />

      {/* Subtle Apple Glass Floating Status Pill (Top Left) */}
      <div className="pointer-events-none absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2">
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-black/[0.08] shadow-sm"
        >
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: currentMeta.accentColor }}
          />
          <span className="text-[11px] font-semibold text-[#1d1d1f] tracking-tight">
            {currentMeta.badge}
          </span>
        </motion.div>

        {!compact && (
          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1d1d1f]/90 backdrop-blur-md text-white text-[11px] font-semibold shadow-sm">
            <Calendar className="w-3 h-3 text-[#d4af37]" />
            <span>Custom OS</span>
          </div>
        )}
      </div>

      {/* Animated Live Event Ticker + Metric Card (Bottom) */}
      <div className="pointer-events-none absolute inset-x-3.5 bottom-3.5 flex flex-col sm:flex-row sm:items-end justify-between gap-2.5">
        <motion.div
          key={activeSlot}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/95 backdrop-blur-md border border-black/[0.08] shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
        >
          <CheckCircle2 className="w-4 h-4 text-[#10b981] shrink-0" />
          <span className="text-xs font-semibold text-[#1d1d1f]">
            {currentMeta.livePills[activeSlot]}
          </span>
        </motion.div>

        {!compact && (
          <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#1d1d1f]/92 backdrop-blur-md text-white shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
            <span className="text-xs font-bold tracking-tight">{currentMeta.metric}</span>
          </div>
        )}
      </div>
    </div>
  );
};
