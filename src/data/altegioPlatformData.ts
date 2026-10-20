import { Language } from '../i18n/translations';

export type PageRoute =
  | 'home'
  | 'about'
  | 'business-types'
  | 'industries'
  | 'solutions'
  | 'pricing'
  | 'contact';

export interface BusinessTypeItem {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  staffRange: string;
  description: string;
  painPointsSolved: string[];
  includedModules: string[];
  metricHighlight: string;
  metricSub: string;
  recommendedTeamTierId: string;
}

export interface IndustryVertical {
  id: string;
  title: string;
  shortTitle: string;
  category: string;
  description: string;
  bookingPreviewTitle: string;
  bookingServices: Array<{
    name: string;
    duration: string;
    priceUsd: number;
    staff: string;
  }>;
  automations: string[];
  kpiMetric: string;
  kpiLabel: string;
  exampleLocations: string;
}

export interface SolutionModuleItem {
  id: string;
  number: string;
  category: 'booking' | 'crm' | 'portal' | 'automation' | 'finance' | 'analytics';
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  localIntegrations: string[];
  metric: string;
}

export interface TeamSizeTier {
  id: string;
  label: string;
  sublabel: string;
  staffCountText: string;
  baseMonthlyUsd: number;
  turnkeyOneTimeUsd: number;
  popular?: boolean;
}

export interface BillingPeriodOption {
  id: '1m' | '3m' | '6m' | '12m' | 'turnkey';
  monthsPaid: number;
  bonusFreeMonths: number;
  discountPercent: number;
  label: string;
  sublabel: string;
  badgeText?: string;
  isBestValue?: boolean;
}

export interface ComparisonCategory {
  id: string;
  title: string;
  rows: Array<{
    feature: string;
    brytech: string | boolean;
    altegioSaaS: string | boolean;
    agency: string | boolean;
  }>;
}

export interface PricingFaqItem {
  q: string;
  a: string;
}

export interface AltegioPlatformContent {
  navExtended: {
    overview: string;
    businessTypes: string;
    industries: string;
    solutions: string;
    pricing: string;
    builder: string;
    cases: string;
    freeTrialBadge: string;
    backToHome: string;
  };
  businessTypesSection: {
    kicker: string;
    title: string;
    subtitle: string;
    exploreBtn: string;
    items: BusinessTypeItem[];
  };
  industriesSection: {
    kicker: string;
    title: string;
    subtitle: string;
    liveWidgetTag: string;
    bookNowDemo: string;
    automationsLabel: string;
    items: IndustryVertical[];
  };
  solutionsSection: {
    kicker: string;
    title: string;
    subtitle: string;
    allIncludedBadge: string;
    categories: Record<'all' | 'booking' | 'crm' | 'portal' | 'automation' | 'finance' | 'analytics', string>;
    items: SolutionModuleItem[];
    integrationsTitle: string;
    integrationsSubtitle: string;
  };
  pricingPage: {
    kicker: string;
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    noTiersBadge: string;
    step1Title: string;
    step1Subtitle: string;
    step2Title: string;
    step2Subtitle: string;
    locationsLabel: string;
    locationsUnit: string;
    teamTiers: TeamSizeTier[];
    billingOptions: BillingPeriodOption[];
    summaryCard: {
      headerTag: string;
      effectiveMonthlyLabel: string;
      perMonthSuffix: string;
      turnkeyOneTimeLabel: string;
      totalAccessLabel: string;
      monthsPaidWord: string;
      bonusMonthsWord: string;
      totalMonthsWord: string;
      youSaveLabel: string;
      zeroCommissionBadge: string;
      unlimitedBookingsBadge: string;
      freeMigrationBadge: string;
      ctaStartTrial: string;
      ctaBookDemo: string;
      trialFootnote: string;
    };
    twentyModulesTitle: string;
    twentyModulesSubtitle: string;
    twentyModulesList: Array<{
      id: string;
      title: string;
      category: string;
      desc: string;
    }>;
    comparisonTitle: string;
    comparisonSubtitle: string;
    colFeature: string;
    colBrytech: string;
    colGenericSaas: string;
    colAgency: string;
    comparisonCategories: ComparisonCategory[];
    migrationBanner: {
      tag: string;
      title: string;
      desc: string;
      bullet1: string;
      bullet2: string;
      bullet3: string;
      cta: string;
    };
    faqTitle: string;
    faqSubtitle: string;
    faqs: PricingFaqItem[];
  };
}

export const ALTEGIO_PLATFORM_DATA: Record<Language, AltegioPlatformContent> = {
  en: {
    navExtended: {
      overview: 'HOME',
      businessTypes: 'BUSINESS TYPES',
      industries: 'INDUSTRIES',
      solutions: 'SOLUTIONS',
      pricing: 'PRICING',
      builder: 'COST BUILDER',
      cases: 'CASE STUDIES',
      freeTrialBadge: 'CUSTOM SYSTEM',
      backToHome: 'Back to Overview',
    },
    businessTypesSection: {
      kicker: 'CUSTOM-ENGINEERED BY BUSINESS SCALE',
      title: 'ONE UNIFIED SYSTEM FOR EVERY STAGE OF BUSINESS GROWTH',
      subtitle:
        'Whether you are a specialized studio, a multi-department company, or a multi-branch network — we custom-build one unified operating system tailored to your exact team structure and daily operations.',
      exploreBtn: 'CONFIGURE CUSTOM ARCHITECTURE',
      items: [
        {
          id: 'solo',
          badge: 'UP TO 2 SPECIALISTS',
          title: 'Solo Entrepreneurs & Private Specialists',
          subtitle: 'Doctors, cosmetologists, lawyers, tutors, detailers & independent studios',
          staffRange: '1–2 Team Members',
          description:
            'Eliminate missed calls and manual DM scheduling while you work with clients. Get a branded mini-website, 24/7 online booking calendar, automated WhatsApp/Telegram reminders, and prepayment protection.',
          painPointsSolved: [
            '24/7 self-booking via Instagram, Telegram, WhatsApp & Google Maps',
            'Automatic deposit collection (Monobank / LiqPay / Bit / Meshulam) to stop no-shows',
            'Personal client card history with photo attachments and visit notes',
          ],
          includedModules: ['Online Booking Widget', 'Personal Landing Page', 'Telegram & WhatsApp Reminders', 'Client History Card'],
          metricHighlight: '-78% No-Shows',
          metricSub: 'Within the first 30 days of automated reminders',
          recommendedTeamTierId: 'tier-2',
        },
        {
          id: 'smb',
          badge: '3 TO 10 SPECIALISTS',
          title: 'Small & Medium Local Businesses',
          subtitle: 'Medical centers, beauty salons, auto detailing hubs, fitness & service studios',
          staffRange: '3–10 Team Members',
          description:
            'Replace chaotic spreadsheets and disconnected apps with one unified operating system: a high-converting multilingual website, multi-staff scheduling calendar, sales CRM pipeline, automated payroll calculation, and a dedicated Client Area portal.',
          painPointsSolved: [
            'Color-coded multi-staff calendar with room & equipment resource allocation',
            'Automated staff salary, commission % and bonus calculation without errors',
            'Branded Client Area where customers view progress, documents, and loyalty points',
          ],
          includedModules: ['Full Multi-Page Website', 'Multi-Staff CRM & Schedule', 'Client Area Portal', 'Payroll & Inventory', 'WhatsApp/Telegram Bot'],
          metricHighlight: '+42% Repeat Visits',
          metricSub: 'Driven by automated win-back campaigns & loyalty cashback',
          recommendedTeamTierId: 'tier-5',
        },
        {
          id: 'chains',
          badge: 'MULTI-LOCATION NETWORKS',
          title: 'Multi-Branch Chains & Franchises',
          subtitle: 'Clinic networks, salon chains, retail showrooms & regional franchises',
          staffRange: '11–50+ Team Members · Multiple Cities',
          description:
            'Centralize control across all branches in Kyiv, Lviv, Odesa, Tel Aviv, or Haifa. Manage a single unified client database, standardized service catalogs, cross-branch gift cards, role-based access permissions, and real-time P&L analytics.',
          painPointsSolved: [
            'Unified client profile across all branches with centralized loyalty & memberships',
            'Executive P&L dashboard comparing revenue, retention, and staff utilization by location',
            'Strict role-based access control (RBAC) so receptionists only see their own branch',
          ],
          includedModules: ['Multi-Branch Chain HQ', 'Unified CRM & ERP', 'Cross-Branch Analytics', 'Custom API & ERP Sync', 'Dedicated Account Engineer'],
          metricHighlight: '3.4x Faster Scaling',
          metricSub: 'Launch a new branch digital infrastructure in 48 hours',
          recommendedTeamTierId: 'tier-20',
        },
        {
          id: 'custom-enterprise',
          badge: 'TURNKEY CUSTOM SYSTEMS',
          title: 'B2B Service Companies & Custom Operations',
          subtitle: 'Construction, logistics, real estate agencies, clinics & manufacturing',
          staffRange: 'Custom Architecture · Full Code Ownership',
          description:
            'Need more than standard booking? BryTech engineers bespoke Client Portals, document vaults, project milestone trackers, and custom ERP integrations at 70% less cost than traditional agencies.',
          painPointsSolved: [
            'Interactive Client Area with real-time project timelines, document vaults & live chat',
            'Two-way synchronization with 1C/BAS, Checkbox PPO, Nova Poshta, GreenInvoice & Priority',
            'Option for 100% turnkey source-code buyout with zero recurring license fees',
          ],
          includedModules: ['Custom Client Area Portal', 'Milestone & Document Vault', 'Bespoke CRM Pipeline', 'Direct Admin Live Chat', 'Custom Webhook Integrations'],
          metricHighlight: 'Up to 70% Saved',
          metricSub: 'Compared to traditional software development agencies',
          recommendedTeamTierId: 'tier-unlimited',
        },
      ],
    },
    industriesSection: {
      kicker: '12 SPECIALIZED VERTICALS · CUSTOM WORKFLOW BLUEPRINTS',
      title: 'UNIFIED SYSTEMS ENGINEERED FOR YOUR INDUSTRY',
      subtitle:
        'Select your industry below to inspect how we custom-configure your online booking, CRM pipelines, ERP inventory, Client Area portal, and WhatsApp/Telegram automation into one system.',
      liveWidgetTag: 'LIVE INTERACTIVE INDUSTRY BLUEPRINT',
      bookNowDemo: 'TEST THIS INDUSTRY SETUP',
      automationsLabel: 'INCLUDED AUTOMATION WORKFLOWS',
      items: [
        {
          id: 'medical',
          title: 'Medical, Dental & Aesthetic Clinics',
          shortTitle: 'Medical & Dental',
          category: 'Healthcare',
          description:
            'HIPAA/GDPR-compliant patient CRM, digital treatment plans, doctor + cabinet scheduling, automated pre-visit preparation instructions via WhatsApp/Telegram, and lab result uploads in the Client Area.',
          bookingPreviewTitle: 'Kyiv / Tel Aviv Medical Center — Online Appointment',
          bookingServices: [
            { name: 'Comprehensive Dental Consultation + 3D CT Scan', duration: '45 min', priceUsd: 65, staff: 'Dr. Olena Kovalenko' },
            { name: 'Laser Aesthetic Rejuvenation Protocol', duration: '60 min', priceUsd: 180, staff: 'Dr. Yael Levi' },
            { name: 'Follow-Up Treatment Plan Review', duration: '30 min', priceUsd: 45, staff: 'Chief Specialist' },
          ],
          automations: [
            '24h & 2h WhatsApp/Telegram appointment confirmation with 1-tap reschedule',
            'Automated post-procedure care instructions & prescription PDF in Client Area',
            '6-month preventive checkup recall message sent automatically',
          ],
          kpiMetric: '+38% Chair Utilization',
          kpiLabel: 'Across 28 partner clinics in Ukraine & Israel',
          exampleLocations: 'Kyiv · Lviv · Tel Aviv · Herzliya',
        },
        {
          id: 'beauty',
          title: 'Beauty Salons, Barbershops & Spas',
          shortTitle: 'Beauty & Salons',
          category: 'Beauty & Wellness',
          description:
            '24/7 booking from Instagram & Google Maps, multi-service combo appointments (4-hands manicure, color + cut), consumable gram-by-gram inventory write-off, and automated tip & review collection.',
          bookingPreviewTitle: 'Signature Beauty & Barber Studio — 24/7 Booking',
          bookingServices: [
            { name: 'Complex Hair Coloring + Olaplex Ritual', duration: '150 min', priceUsd: 140, staff: 'Top Stylist Anna' },
            { name: 'Executive Haircut & Royal Beard Sculpting', duration: '60 min', priceUsd: 55, staff: 'Master Barber David' },
            { name: '4-Hands Manicure & Pedicure Express', duration: '90 min', priceUsd: 85, staff: '2 Specialists Synced' },
          ],
          automations: [
            'Instant Instagram Direct & Telegram Bot booking without administrator involvement',
            'Automatic dye & cosmetic inventory deduction per completed visit',
            'Google Maps 5-star review booster sent 1 hour after checkout',
          ],
          kpiMetric: '64% Bookings After Hours',
          kpiLabel: 'Clients book 24/7 via social links & messengers',
          exampleLocations: 'Kyiv · Odesa · Tel Aviv · Rishon LeZion',
        },
        {
          id: 'fitness',
          title: 'Fitness Clubs, Yoga & Boutique Studios',
          shortTitle: 'Fitness & Studios',
          category: 'Sports & Wellness',
          description:
            'Group class capacity limits, waitlist auto-promotion, recurring membership billing, QR check-in pass inside the Client Area, and trainer commission tracking.',
          bookingPreviewTitle: 'Pulse Reformer & Functional Studio — Class Schedule',
          bookingServices: [
            { name: 'Reformer Pilates Group Session (8 Spots Max)', duration: '55 min', priceUsd: 32, staff: 'Coach Iryna (3 spots left)' },
            { name: '1-on-1 Personal EMS & Mobility Training', duration: '45 min', priceUsd: 60, staff: 'Senior Coach Amir' },
            { name: 'Unlimited Monthly Studio Membership Pass', duration: '30 days', priceUsd: 220, staff: 'All Studio Access' },
          ],
          automations: [
            'Automatic waitlist notification when a class spot opens up',
            'Membership expiration & auto-renewal alerts 3 days before cycle end',
            'Milestone celebration messages at 10, 25, and 50 workouts',
          ],
          kpiMetric: '+51% Membership Renewal',
          kpiLabel: 'With automated subscription & package tracking',
          exampleLocations: 'Kyiv · Dnipro · Tel Aviv · Netanya',
        },
        {
          id: 'auto',
          title: 'Auto Service, Detailing & Car Care Centers',
          shortTitle: 'Auto & Detailing',
          category: 'Automotive',
          description:
            'Bay & lift scheduling, vehicle VIN & mileage service history, live stage-by-stage photo progress in the Client Area, and automated seasonal tire/maintenance reminders.',
          bookingPreviewTitle: 'Apex Detailing & Service Bay — Bay Reservation',
          bookingServices: [
            { name: 'Full Ceramic Coating 9H + 3-Stage Paint Correction', duration: '2 Days', priceUsd: 650, staff: 'Bay 01 · Detailing Pro' },
            { name: 'Scheduled Maintenance & Computer Diagnostics', duration: '90 min', priceUsd: 95, staff: 'Bay 03 · Master Mechanic' },
            { name: 'Interior Dry Cleaning & Ozone Sanitization', duration: '240 min', priceUsd: 160, staff: 'Bay 02 · Care Team' },
          ],
          automations: [
            'Live SMS/Telegram link when car enters each stage + "Vehicle Ready for Pickup" alert',
            'Seasonal tire swap & oil change reminders based on last recorded mileage',
            'Digital inspection sheet with photos stored in the client’s portal',
          ],
          kpiMetric: '+44% Average Ticket',
          kpiLabel: 'Via visual upsell approvals inside Client Area',
          exampleLocations: 'Kyiv · Kharkiv · Haifa · Ashdod',
        },
        {
          id: 'legal',
          title: 'Real Estate, Law Firms & B2B Consultancies',
          shortTitle: 'Legal & Real Estate',
          category: 'Professional Services',
          description:
            'High-trust corporate website, paid consultation booking, secure Client Area with document vault, contract milestone tracker, and direct encrypted chat with your team.',
          bookingPreviewTitle: 'Advisory & Legal Partners — Client Portal & Booking',
          bookingServices: [
            { name: 'Real Estate Transaction & Due Diligence Audit', duration: '60 min', priceUsd: 150, staff: 'Managing Partner' },
            { name: 'Corporate Structuring & Tax Strategy Session', duration: '60 min', priceUsd: 200, staff: 'Senior Legal Counsel' },
            { name: 'Turnkey Property Acquisition Escort', duration: 'Milestone', priceUsd: 1200, staff: 'Dedicated Case Team' },
          ],
          automations: [
            'Instant notification when a client adds a note or uploads a document in Client Area',
            'Automated stage completion alerts across multi-week legal or property deals',
            'Pre-paid consultation scheduling synced with Google Calendar & Zoom',
          ],
          kpiMetric: '3.2x Faster Deal Cycle',
          kpiLabel: 'With centralized document vault & client notes',
          exampleLocations: 'Kyiv · Lviv · Tel Aviv · Jerusalem',
        },
        {
          id: 'education',
          title: 'Education Centers, Language Schools & Tutors',
          shortTitle: 'Education & Schools',
          category: 'Education',
          description:
            'Student & group cohort scheduling, lesson package balance tracking, homework & learning materials in the Client Area, and automated tuition invoicing.',
          bookingPreviewTitle: 'NextGen Academy — Trial Lesson & Cohort Portal',
          bookingServices: [
            { name: '1-on-1 Diagnostic Level Assessment + Trial Lesson', duration: '45 min', priceUsd: 25, staff: 'Academic Director' },
            { name: 'Intensive Spoken Hebrew / English Mini-Group (8 Lessons)', duration: 'Monthly', priceUsd: 190, staff: 'Native Speaker Mentor' },
            { name: 'IT & Automation Bootcamp Cohort Access', duration: '12 Weeks', priceUsd: 480, staff: 'Senior Engineering Lead' },
          ],
          automations: [
            'Automatic balance alert when student has 2 lessons remaining in package',
            'Lesson recording links & PDF materials published straight to Client Area',
            'Attendance tracking with instant parent/student Telegram notifications',
          ],
          kpiMetric: '92% Student Retention',
          kpiLabel: 'From transparent progress tracking & easy renewals',
          exampleLocations: 'Kyiv · Vinnytsia · Tel Aviv · Ramat Gan',
        },
      ],
    },
    solutionsSection: {
      kicker: 'ALL-IN-ONE CUSTOM ECOSYSTEM · UNIFIED MODULES',
      title: 'EVERY OPERATION OF YOUR BUSINESS IN ONE CUSTOM SYSTEM',
      subtitle:
        'Instead of stitching together 6 separate subscriptions, we engineer your Website, CRM, Online Booking, ERP, Client Area, and AI/Messenger Automation to work as a single custom-built organism.',
      allIncludedBadge: 'UNIFIED ARCHITECTURE · TAILORED TO YOUR WORKFLOW',
      categories: {
        all: 'ALL MODULES',
        booking: 'WEBSITE & BOOKING',
        crm: 'CRM & CLIENT BASE',
        portal: 'CLIENT AREA PORTAL',
        automation: 'TELEGRAM & WHATSAPP',
        finance: 'FINANCE & PAYROLL',
        analytics: 'ANALYTICS & INTEGRATIONS',
      },
      items: [
        {
          id: 'sol-booking',
          number: '01',
          category: 'booking',
          title: '24/7 Online Booking Widget & Smart Calendar',
          subtitle: 'Convert traffic from Instagram, Google Maps, Telegram & your website into confirmed visits',
          description:
            'Customizable booking widget in English, Ukrainian, and Hebrew. Supports multi-service appointments, resource/room allocation, buffer times, and mandatory online deposits.',
          highlights: [
            'Color-coded drag-and-drop calendar for 1 to 100+ specialists',
            'Direct booking links for Instagram bio, Google Business Profile & Messenger bots',
            'No-show protection via partial or full online prepayment',
          ],
          localIntegrations: ['Google Maps Reserve', 'Instagram Bio Link', 'Google Calendar 2-Way Sync'],
          metric: '+47% Online Bookings',
        },
        {
          id: 'sol-website',
          number: '02',
          category: 'booking',
          title: 'High-Converting Multilingual Business Website',
          subtitle: 'Ultra-fast SEO-optimized websites built in EN / UA / HE with native RTL support',
          description:
            'Unlike generic SaaS widgets that leave you without a real site, BryTech builds a tailored, lightning-fast brand website directly wired to your CRM and booking engine.',
          highlights: [
            'Full responsive desktop & mobile app-like experience',
            'Local SEO schema for Kyiv, Lviv, Odesa, Tel Aviv, Haifa & Jerusalem',
            'Instant lead capture straight into your CRM pipeline & Admin Telegram',
          ],
          localIntegrations: ['Google Analytics 4', 'Meta Pixel', 'Google Search Console'],
          metric: '99/100 Speed Score',
        },
        {
          id: 'sol-crm',
          number: '03',
          category: 'crm',
          title: 'Client Relationship Management (CRM) & Deal Pipeline',
          subtitle: 'Complete customer dossier, visit history, tags, files, and Kanban lead board',
          description:
            'Every call, booking, chat message, and payment is stored in a single structured client card. Segment clients automatically into VIP, New, At-Risk, or Lost cohorts.',
          highlights: [
            'Full visit & purchase history with before/after photo & PDF storage',
            'Visual Kanban pipeline for high-ticket services and B2B deals',
            'RFM client segmentation to reactivate sleeping customers in 1 click',
          ],
          localIntegrations: ['Binotel / Phonet VoIP', 'Excel / CSV 1-Click Import', 'Webhook API'],
          metric: '100% Lead Visibility',
        },
        {
          id: 'sol-portal',
          number: '04',
          category: 'portal',
          title: 'Branded Client Area Portal & Loyalty Cabinet',
          subtitle: 'Personal login area where your clients track progress, add notes, chat & view documents',
          description:
            'Give your customers a VIP digital cabinet. Clients log in with their username & password to view active products, live completion % bars, milestone timelines, documents, and direct chat with your admin.',
          highlights: [
            'Interactive product progress dashboard with real-time completion percentages',
            'Client product notes with instant unread notification badges in Admin Panel',
            'Built-in real-time support chat between Client Area and Admin Panel',
          ],
          localIntegrations: ['Firebase Real-Time Sync', 'WebSocket Live Chat', 'Document Vault'],
          metric: '-65% Status Calls',
        },
        {
          id: 'sol-automation',
          number: '05',
          category: 'automation',
          title: 'Telegram, WhatsApp & SMS Notification Center',
          subtitle: 'Automated reminders, review collection, birthday offers & win-back sequences',
          description:
            'Cut no-shows by up to 78% with intelligent multi-channel messaging. Send automated WhatsApp Business, Telegram Bot, Viber, or SMS triggers at every stage of the client journey.',
          highlights: [
            '24h and 2h appointment reminders with 1-click Confirm / Reschedule',
            'Automated Google Maps & Instagram review request after visit completion',
            'Smart reactivation messages sent 45/60/90 days after last visit',
          ],
          localIntegrations: ['WhatsApp Business API', 'Telegram Bot API', 'Viber / TurboSMS / InforU'],
          metric: '-78% Missed Visits',
        },
        {
          id: 'sol-finance',
          number: '06',
          category: 'finance',
          title: 'Finances, Invoicing, Payroll & Inventory Control',
          subtitle: 'Automated staff commissions, P&L cashflow reports, and warehouse stock tracking',
          description:
            'Track every hryvnia (₴), shekel (₪), and dollar ($). Automate flexible staff salary rules (% of service, % of product sales, sliding KPI scales) and real-time consumable stock levels.',
          highlights: [
            'Automated daily/monthly payroll & commission sheets for every specialist',
            'Real-time P&L, cash vs card register tracking, and expense categorization',
            'Consumables & retail inventory control with low-stock alerts',
          ],
          localIntegrations: ['Monobank / LiqPay / Privat24', 'Checkbox PPO', 'Meshulam / Bit / Tranzila / GreenInvoice'],
          metric: '8 hrs/wk Saved on Admin',
        },
        {
          id: 'sol-analytics',
          number: '07',
          category: 'analytics',
          title: 'Executive Analytics, Loyalty & Multi-Branch HQ',
          subtitle: 'Retention cohorts, employee utilization, gift cards, memberships & chain control',
          description:
            'Make decisions backed by real numbers. Monitor repeat visit rates, revenue per hour, marketing ROI by channel, and manage loyalty cashback, gift certificates, and memberships.',
          highlights: [
            'Digital loyalty cards, tiered cashback, and prepaid service subscriptions',
            'Specialist utilization, average check, and client retention cohort reports',
            'Centralized multi-location dashboard for chains across Ukraine & Israel',
          ],
          localIntegrations: ['Nova Poshta API', '1C / BAS Sync', 'Stripe & PayPal', 'Looker / CSV Export'],
          metric: '+34% LTV Per Client',
        },
      ],
      integrationsTitle: '60+ NATIVE INTEGRATIONS FOR UKRAINE & ISRAEL',
      integrationsSubtitle:
        'Pre-wired to the exact payment gateways, fiscal registers, messengers, and logistics providers used daily in Kyiv, Lviv, Tel Aviv, and Haifa.',
    },
    pricingPage: {
      kicker: 'TRANSPARENT ALTEG.IO-STYLE PRICING · ALL 20 MODULES INCLUDED',
      titleLine1: 'ONE COMPLETE SYSTEM.',
      titleLine2: 'NO TIERS. NO FEATURE GATES.',
      subtitle:
        'Just like Altegio, every BryTech plan includes all 20 platform modules with zero booking commissions and unlimited appointments. Choose your team size and billing period to unlock up to 9 bonus months free — or opt for a one-time turnkey buyout.',
      noTiersBadge: 'ALL 20 MODULES INCLUDED IN EVERY PLAN · 0% COMMISSION',
      step1Title: '1. Select Your Team Size (Specialists / Active Staff)',
      step1Subtitle: 'All administrative & owner accounts are included free of charge',
      step2Title: '2. Choose Billing Period & Bonus Free Months',
      step2Subtitle: 'Longer prepayments include up to +9 bonus months completely free',
      locationsLabel: 'Number of Locations / Branches:',
      locationsUnit: 'Location(s)',
      teamTiers: [
        {
          id: 'tier-2',
          label: 'Up to 2',
          sublabel: 'Solo & Starter Studio',
          staffCountText: '1–2 Specialists',
          baseMonthlyUsd: 29,
          turnkeyOneTimeUsd: 490,
        },
        {
          id: 'tier-5',
          label: '3 – 5',
          sublabel: 'Growing Local Business',
          staffCountText: '3–5 Specialists',
          baseMonthlyUsd: 49,
          turnkeyOneTimeUsd: 790,
          popular: true,
        },
        {
          id: 'tier-10',
          label: '6 – 10',
          sublabel: 'Established Clinic / Salon',
          staffCountText: '6–10 Specialists',
          baseMonthlyUsd: 79,
          turnkeyOneTimeUsd: 1190,
        },
        {
          id: 'tier-20',
          label: '11 – 20',
          sublabel: 'Large Center / Flagship',
          staffCountText: '11–20 Specialists',
          baseMonthlyUsd: 119,
          turnkeyOneTimeUsd: 1690,
        },
        {
          id: 'tier-50',
          label: '21 – 50',
          sublabel: 'Department / High-Volume',
          staffCountText: '21–50 Specialists',
          baseMonthlyUsd: 169,
          turnkeyOneTimeUsd: 2390,
        },
        {
          id: 'tier-unlimited',
          label: 'Unlimited',
          sublabel: 'Enterprise & Chain Scale',
          staffCountText: '50+ Unlimited Staff',
          baseMonthlyUsd: 229,
          turnkeyOneTimeUsd: 3200,
        },
      ],
      billingOptions: [
        {
          id: '1m',
          monthsPaid: 1,
          bonusFreeMonths: 0,
          discountPercent: 0,
          label: '1 Month',
          sublabel: 'Flexible monthly license',
        },
        {
          id: '3m',
          monthsPaid: 3,
          bonusFreeMonths: 1,
          discountPercent: 25,
          label: '3 Months',
          sublabel: 'Pay 3 mos → Get 4 mos total',
          badgeText: '+1 MONTH FREE',
        },
        {
          id: '6m',
          monthsPaid: 6,
          bonusFreeMonths: 3,
          discountPercent: 33,
          label: '6 Months',
          sublabel: 'Pay 6 mos → Get 9 mos total',
          badgeText: '+3 MONTHS FREE',
        },
        {
          id: '12m',
          monthsPaid: 12,
          bonusFreeMonths: 9,
          discountPercent: 43,
          label: '12 Months',
          sublabel: 'Pay 12 mos → Get 21 mos total',
          badgeText: '+9 MONTHS FREE · BEST VALUE',
          isBestValue: true,
        },
        {
          id: 'turnkey',
          monthsPaid: 1,
          bonusFreeMonths: 0,
          discountPercent: 70,
          label: 'Turnkey Buyout',
          sublabel: 'Pay once · Own code forever',
          badgeText: 'NO MONTHLY FEES',
        },
      ],
      summaryCard: {
        headerTag: 'LIVE PLAN CONFIGURATION',
        effectiveMonthlyLabel: 'Effective Monthly Cost',
        perMonthSuffix: '/ month',
        turnkeyOneTimeLabel: 'One-Time Turnkey Ownership',
        totalAccessLabel: 'Total License Duration',
        monthsPaidWord: 'months paid',
        bonusMonthsWord: 'bonus months FREE',
        totalMonthsWord: 'months total access',
        youSaveLabel: 'Your Total Savings',
        zeroCommissionBadge: '0% Booking Fees & Commissions',
        unlimitedBookingsBadge: 'Unlimited Appointments & Clients',
        freeMigrationBadge: 'Free 48h Data Migration & Setup',
        ctaStartTrial: 'START 7-DAY FREE TRIAL',
        ctaBookDemo: 'REQUEST CUSTOM TURNKEY QUOTE',
        trialFootnote: 'No credit card required · Full access to all 20 modules · Setup in Kyiv & Tel Aviv',
      },
      twentyModulesTitle: 'ALL 20 MODULES INCLUDED — ZERO FEATURE GATES',
      twentyModulesSubtitle:
        'Every subscription and turnkey deployment unlocks the entire BryTech & Altegio-grade operating suite:',
      twentyModulesList: [
        { id: 'm1', title: '01. 24/7 Online Booking Widget', category: 'Booking', desc: 'Embed on website, Instagram, Telegram, WhatsApp & Google Maps.' },
        { id: 'm2', title: '02. Multi-Staff Smart Calendar', category: 'Booking', desc: 'Drag-and-drop scheduling for staff, rooms, and equipment.' },
        { id: 'm3', title: '03. Custom Multilingual Website', category: 'Booking', desc: 'High-converting website in English, Ukrainian & Hebrew (RTL).' },
        { id: 'm4', title: '04. Visual CRM & Client Cards', category: 'CRM', desc: 'Full visit history, preferences, photo attachments & tags.' },
        { id: 'm5', title: '05. Branded Client Area Portal', category: 'Portal', desc: 'Client login cabinet with project progress, notes & live chat.' },
        { id: 'm6', title: '06. Document Vault & Timelines', category: 'Portal', desc: 'Share contracts, invoices, and milestone roadmaps securely.' },
        { id: 'm7', title: '07. WhatsApp Business Automation', category: 'Automation', desc: 'Automated confirmations, reminders, and review requests.' },
        { id: 'm8', title: '08. Telegram Bot & Booking App', category: 'Automation', desc: 'Clients book, reschedule, and chat directly inside Telegram.' },
        { id: 'm9', title: '09. No-Show & Deposit Protection', category: 'Finance', desc: 'Collect partial or full prepayments via Monobank, LiqPay, Bit, Stripe.' },
        { id: 'm10', title: '10. Automated Payroll & Commissions', category: 'Finance', desc: 'Flexible % rules, sliding scales, bonuses, and daily payouts.' },
        { id: 'm11', title: '11. Financial P&L & Cashflow Accounting', category: 'Finance', desc: 'Track cash/card registers, expenses, and net profit margins.' },
        { id: 'm12', title: '12. Inventory & Consumables Control', category: 'Finance', desc: 'Automatic material deduction per service and low-stock alerts.' },
        { id: 'm13', title: '13. Loyalty Cashback & Tier Cards', category: 'CRM', desc: 'Reward repeat clients with automatic bonus points and VIP tiers.' },
        { id: 'm14', title: '14. Memberships & Subscriptions', category: 'CRM', desc: 'Sell multi-visit packages and recurring monthly memberships.' },
        { id: 'm15', title: '15. Digital Gift Cards & Vouchers', category: 'Booking', desc: 'Sell branded online gift certificates with instant balance tracking.' },
        { id: 'm16', title: '16. Client Reactivation & Win-Back', category: 'Automation', desc: 'Automatically message sleeping clients after 45/60/90 days.' },
        { id: 'm17', title: '17. Google Maps & Review Booster', category: 'Automation', desc: 'Collect 5-star public reviews and intercept negative feedback privately.' },
        { id: 'm18', title: '18. Multi-Location Chain HQ', category: 'Analytics', desc: 'Unified client base and consolidated reporting across all branches.' },
        { id: 'm19', title: '19. Executive Retention & ROI Analytics', category: 'Analytics', desc: 'Cohort retention, specialist load, and marketing channel attribution.' },
        { id: 'm20', title: '20. Full Admin Control & Live Chat', category: 'Portal', desc: 'Manage clients, products, notes, and direct website contact buttons.' },
      ],
      comparisonTitle: 'DETAILED PLATFORM COMPARISON',
      comparisonSubtitle:
        'See how BryTech combines the best of Altegio’s all-in-one SaaS power with custom website & Client Area ownership.',
      colFeature: 'CAPABILITY / MODULE',
      colBrytech: 'BRYTECH ALL-IN-ONE (UA & IL)',
      colGenericSaas: 'STANDARD SAAS WIDGETS',
      colAgency: 'TRADITIONAL DEV AGENCY',
      comparisonCategories: [
        {
          id: 'cat-booking',
          title: 'Website, Online Booking & Scheduling',
          rows: [
            { feature: 'Custom Branded Multilingual Website (EN / UA / HE)', brytech: 'Included Free / Custom Built', altegioSaaS: 'Widget Only (No Full Site)', agency: '$3,500 – $8,000 Extra' },
            { feature: '24/7 Online Booking Calendar & Resource Scheduling', brytech: true, altegioSaaS: true, agency: 'Costs $4,000+ to build' },
            { feature: 'Commission on Online Bookings & Payments', brytech: '0% Commission', altegioSaaS: '0% – 2.5% Fee', agency: '0% Commission' },
            { feature: 'Unlimited Appointments & Client Profiles', brytech: true, altegioSaaS: true, agency: true },
          ],
        },
        {
          id: 'cat-portal',
          title: 'CRM, Client Area Portal & Live Chat',
          rows: [
            { feature: 'Dedicated Client Area Login Portal with Progress Tracker', brytech: true, altegioSaaS: false, agency: '$5,000+ Custom Build' },
            { feature: 'Client Product Notes with Instant Admin Notifications', brytech: true, altegioSaaS: false, agency: 'Rarely Included' },
            { feature: 'Built-In Real-Time Client-to-Admin Support Chat', brytech: true, altegioSaaS: 'Paid Add-On', agency: 'Paid 3rd-Party Widget' },
            { feature: 'Full CRM Pipeline, Visit History & RFM Segmentation', brytech: true, altegioSaaS: true, agency: 'Custom Development' },
          ],
        },
        {
          id: 'cat-local',
          title: 'Ukraine & Israel Native Integrations & Ownership',
          rows: [
            { feature: 'Ukraine Native Stack (Monobank, LiqPay, Checkbox, Nova Poshta)', brytech: true, altegioSaaS: 'Partial', agency: 'Paid Hourly Integration' },
            { feature: 'Israel Native Stack (Bit, Meshulam, Tranzila, GreenInvoice, RTL)', brytech: true, altegioSaaS: 'Partial', agency: 'Paid Hourly Integration' },
            { feature: 'Telegram Bot + WhatsApp Business Automated Reminders', brytech: true, altegioSaaS: 'Requires Paid Aggregator', agency: '$1,500+ Bot Setup' },
            { feature: 'Option for One-Time Turnkey Buyout (Zero Monthly Fees)', brytech: true, altegioSaaS: false, agency: true },
          ],
        },
      ],
      migrationBanner: {
        tag: 'WHITE-GLOVE ONBOARDING · KYIV & TEL AVIV',
        title: 'SWITCHING FROM EXCEL OR ANOTHER CRM? WE MIGRATE EVERYTHING FREE IN 48 HOURS.',
        desc: 'Our Kyiv engineering team transfers your entire client base, visit history, service catalog, and staff schedules with zero downtime.',
        bullet1: '100% Free Data Import from Excel, Altegio, Yclients, Booksy, Calendly or Bitrix',
        bullet2: 'Complete Staff Training in English, Ukrainian, or Hebrew',
        bullet3: '7-Day Free Trial with All 20 Modules Unlocked',
        cta: 'CLAIM FREE MIGRATION & 7-DAY TRIAL',
      },
      faqTitle: 'FREQUENTLY ASKED QUESTIONS ABOUT PRICING',
      faqSubtitle: 'Clear answers about licenses, bonus months, custom turnkey ownership, and local integrations.',
      faqs: [
        {
          q: 'How do the Bonus Free Months (+1, +3, +9 months) work?',
          a: 'Just like Altegio’s prepayment bonuses, when you purchase a 3-month license you receive +1 bonus month free (4 months total). With a 6-month license you get +3 bonus months free (9 months total), and with a 12-month license you receive +9 bonus months free (21 months of full access), reducing your effective monthly cost by 43%.',
        },
        {
          q: 'What is the difference between Monthly/Annual Subscription and Turnkey Buyout?',
          a: 'With the Subscription model, you pay a small predictable rate based on team size and we handle all cloud hosting, updates, and continuous support. With the Turnkey Buyout option, you pay once to own your custom Website, CRM, Client Area, and Automation system outright with zero recurring license fees.',
        },
        {
          q: 'Are any features locked behind higher tiers?',
          a: 'No. We follow a strict "No Tiers, No Feature Gates" policy. Whether you have 1 specialist or 50+, you get access to all 20 modules including Online Booking, CRM, Client Area Portal, Telegram/WhatsApp bots, Payroll, Inventory, and Analytics.',
        },
        {
          q: 'Do you charge any commission per booking or transaction?',
          a: 'Zero. BryTech charges 0% commission on your bookings, prepayments, or invoices. Payments go directly into your Monobank, Privat24, LiqPay, Bit, Meshulam, Tranzila, or Stripe merchant account.',
        },
        {
          q: 'Can you migrate our existing client database and appointment history?',
          a: 'Yes! Our engineers migrate your clients, visit history, balances, and service lists from Excel, Google Sheets, Altegio, Yclients, or any other CRM within 48 hours completely free of charge.',
        },
        {
          q: 'How does the Client Area Portal work for our customers?',
          a: 'Your Admin creates client accounts in the Admin Panel. Each client logs in via the Client Area popup using their username and password to view their products, live completion progress, milestone timelines, documents, add notes (which trigger instant Admin notifications), and chat live with your team.',
        },
      ],
    },
  },
  uk: {
    navExtended: {
      overview: 'ГОЛОВНА',
      businessTypes: 'ТИПИ БІЗНЕСУ',
      industries: 'ІНДУСТРІЇ',
      solutions: 'РІШЕННЯ',
      pricing: 'ТАРИФИ',
      builder: 'КАЛЬКУЛЯТОР',
      cases: 'КЕЙСИ',
      freeTrialBadge: 'КАСТОМНА СИСТЕМА',
      backToHome: 'Назад до огляду',
    },
    businessTypesSection: {
      kicker: 'АРХІТЕКТУРА ПІД МАСШТАБ ВАШОЇ КОМПАНІЇ',
      title: 'ЄДИНА СИСТЕМА ДЛЯ КОЖНОГО ЕТАПУ РОЗВИТКУ БІЗНЕСУ',
      subtitle:
        'Незалежно від того, чи ви локальна студія, багатопрофільна компанія чи мережа філій — ми проєктуємо єдину систему під вашу структуру команди та всі операційні процеси.',
      exploreBtn: 'СКОНФІГУРУВАТИ СИСТЕМУ ПІД СЕБЕ',
      items: [
        {
          id: 'solo',
          badge: 'ДО 2 СПЕЦІАЛІСТІВ',
          title: 'Приватні спеціалісти та соло-підприємці',
          subtitle: 'Лікарі, косметологи, юристи, репетитори, майстри та локальні студії',
          staffRange: '1–2 співробітники',
          description:
            'Забудьте про пропущені дзвінки та ручний запис у Direct під час роботи з клієнтом. Отримайте власний сайт, онлайн-запис 24/7, авто-нагадування у Telegram/WhatsApp та захист від неявок через передоплату.',
          painPointsSolved: [
            'Самостійний онлайн-запис 24/7 через Instagram, Telegram, WhatsApp та Google Maps',
            'Автоматичний прийом передоплати (Monobank / LiqPay / Bit) проти неявок клієнтів',
            'Електронна картка клієнта з історією візитів, фото та нотатками',
          ],
          includedModules: ['Віджет онлайн-запису', 'Персональний лендінг', 'Telegram та WhatsApp бот', 'Картка клієнта CRM'],
          metricHighlight: '-78% неявок',
          metricSub: 'Вже у перші 30 днів роботи автоматичних нагадувань',
          recommendedTeamTierId: 'tier-2',
        },
        {
          id: 'smb',
          badge: '3 – 10 СПЕЦІАЛІСТІВ',
          title: 'Малий та середній локальний бізнес',
          subtitle: 'Медичні центри, салони краси, автосервіси, детейлінг та фітнес-студії',
          staffRange: '3–10 співробітників',
          description:
            'Замініть таблиці Excel та розрізнені чати єдиною системою: багатомовний сайт, розклад спеціалістів і кабінетів, CRM-воронка продажів, автоматичний розрахунок зарплат та особистий Кабінет Клієнта.',
          painPointsSolved: [
            'Кольоровий календар розкладу майстрів, кабінетів та обладнання без накладок',
            'Автоматичний розрахунок зарплати, % комісії та бонусів персоналу',
            'Особистий Кабінет Клієнта з прогресом замовлень, документами та чатом',
          ],
          includedModules: ['Багатосторінковий сайт', 'CRM та розклад команди', 'Кабінет Клієнта', 'Зарплата та Склад', 'Telegram/WhatsApp автоматизація'],
          metricHighlight: '+42% повторних візитів',
          metricSub: 'Завдяки системі лояльності та тригерним поверненням',
          recommendedTeamTierId: 'tier-5',
        },
        {
          id: 'chains',
          badge: 'МЕРЕЖІ ТА ФРАНШИЗИ',
          title: 'Багатофіліальні мережі та франшизи',
          subtitle: 'Мережі клінік, салонів, шоурумів та сервісних центрів у кількох містах',
          staffRange: '11–50+ співробітників · Кілька локацій',
          description:
            'Централізоване управління всіма філіями в Києві, Львові, Одесі, Тель-Авіві чи Хайфі. Єдина база клієнтів, наскрізні абонементи та сертифікати, гнучкі права доступу та P&L аналітика.',
          painPointsSolved: [
            'Єдина картка клієнта, бонусний рахунок та абонементи для всіх філій мережі',
            'Зведений P&L дашборд власника: виручка, утримання та завантаженість по точках',
            'Розмежування прав доступу (адміністратор бачить лише свою філію)',
          ],
          includedModules: ['Управління мережею філій', 'Єдина CRM та ERP', 'Крос-філіальна аналітика', 'API та синхронізація', 'Виділений інженер'],
          metricHighlight: 'У 3.4x швидший запуск',
          metricSub: 'Підключення нової точки мережі за 48 годин',
          recommendedTeamTierId: 'tier-20',
        },
        {
          id: 'custom-enterprise',
          badge: 'КАСТОМНІ СИСТЕМИ ПІД КЛЮЧ',
          title: 'B2B компанії та індивідуальні бізнес-системи',
          subtitle: 'Будівництво, логістика, нерухомість, клініки та сервісні компанії',
          staffRange: 'Індивідуальна архітектура · Повне володіння кодом',
          description:
            'Потрібно більше ніж стандартний запис? BryTech у Києві розробляє індивідуальні Кабінети Клієнтів, сховища документів, трекери етапів проекту та інтеграції на 70% дешевше за класичні студії.',
          painPointsSolved: [
            'Кабінет Клієнта з трекером прогресу, нотатками до продуктів та живим чатом з Адміном',
            'Двостороння інтеграція з Monobank, LiqPay, Checkbox ПРРО, Нова Пошта, 1С/BAS',
            'Можливість одноразового викупу системи під ключ без щомісячної абонплати',
          ],
          includedModules: ['Кастомний Кабінет Клієнта', 'Сховище документів і таймлайни', 'Індивідуальна CRM', 'Живий чат з Адміном', 'Webhook та API інтеграції'],
          metricHighlight: 'До 70% економії',
          metricSub: 'Порівняно з традиційними IT-агентствами розробки',
          recommendedTeamTierId: 'tier-unlimited',
        },
      ],
    },
    industriesSection: {
      kicker: '8 СПЕЦІАЛІЗОВАНИХ ГАЛУЗЕЙ · ГОТОВІ КОНФІГУРАЦІЇ',
      title: 'РІШЕННЯ, СПРОЕКТОВАНІ ПІД ВАШУ ІНДУСТРІЮ',
      subtitle:
        'Оберіть вашу сферу бізнесу нижче, щоб побачити як BryTech налаштовує онлайн-запис, CRM-картку клієнта, Кабінет Клієнта та автоматизацію Telegram/WhatsApp.',
      liveWidgetTag: 'ІНТЕРАКТИВНИЙ ПРОТОТИП ГАЛУЗІ',
      bookNowDemo: 'СПРОБУВАТИ ЦЕЙ СЦЕНАРІЙ',
      automationsLabel: 'ВКЛЮЧЕНІ СЦЕНАРІЇ АВТОМАТИЗАЦІЇ',
      items: [
        {
          id: 'medical',
          title: 'Медичні, стоматологічні та естетичні клініки',
          shortTitle: 'Медицина та Клініки',
          category: 'Охорона здоров’я',
          description:
            'Медична CRM з історією лікування, розклад лікарів та кабінетів/апаратів, автоматичні інструкції підготовки до прийому в Telegram/WhatsApp та результати аналізів у Кабінеті Клієнта.',
          bookingPreviewTitle: 'Медичний Центр (Київ / Тель-Авів) — Онлайн-запис',
          bookingServices: [
            { name: 'Комплексна консультація стоматолога + 3D КТ', duration: '45 хв', priceUsd: 65, staff: 'Д-р Олена Коваленко' },
            { name: 'Лазерне естетичне омолодження (протокол)', duration: '60 хв', priceUsd: 180, staff: 'Д-р Яель Леві' },
            { name: 'Повторний огляд та план лікування', duration: '30 хв', priceUsd: 45, staff: 'Головний лікар' },
          ],
          automations: [
            'Нагадування за 24 год та 2 год у Telegram/WhatsApp з кнопкою підтвердження',
            'Автоматична відправка рекомендацій після процедури у Кабінет Клієнта',
            'Запрошення на профілактичний огляд через 6 місяців на автопілоті',
          ],
          kpiMetric: '+38% завантаження крісел',
          kpiLabel: 'Серед 28 клінік-партнерів в Україні та Ізраїлі',
          exampleLocations: 'Київ · Львів · Тель-Авів · Герцлія',
        },
        {
          id: 'beauty',
          title: 'Салони краси, барбершопи та SPA-студії',
          shortTitle: 'Салони та Beauty',
          category: 'Краса та Догляд',
          description:
            'Цілодобовий запис з Instagram та Google Maps, паралельні послуги (манікюр у 4 руки), списання фарби та розхідників до грама, авто-збір відгуків та чайових.',
          bookingPreviewTitle: 'Beauty & Barber Studio — Онлайн-запис 24/7',
          bookingServices: [
            { name: 'Складне фарбування волосся + догляд Olaplex', duration: '150 хв', priceUsd: 140, staff: 'Топ-стиліст Анна' },
            { name: 'Чоловіча стрижка та моделювання бороди', duration: '60 хв', priceUsd: 55, staff: 'Шеф-барбер Давид' },
            { name: 'Комплекс манікюр + педикюр у 4 руки', duration: '90 хв', priceUsd: 85, staff: '2 майстри синхронно' },
          ],
          automations: [
            'Миттєвий запис через Instagram Direct та Telegram-бот без участі адміністратора',
            'Автоматичне списання матеріалів зі складу при закритті візиту',
            'Запит оцінки 5 зірок у Google Maps через 1 годину після візиту',
          ],
          kpiMetric: '64% записів у неробочий час',
          kpiLabel: 'Клієнти записуються 24/7 через соцмережі та месенджери',
          exampleLocations: 'Київ · Одеса · Тель-Авів · Рішон-ле-Ціон',
        },
        {
          id: 'fitness',
          title: 'Фітнес-клуби, студії йоги, пілатесу та EMS',
          shortTitle: 'Фітнес та Студії',
          category: 'Спорт і Велнес',
          description:
            'Ліміти місць на групові тренування, авто-лист очікування, облік абонементів і заморозок, QR-пропуск у Кабінеті Клієнта та розрахунок ставки тренерів.',
          bookingPreviewTitle: 'Pulse Reformer & Fitness Studio — Розклад груп',
          bookingServices: [
            { name: 'Групове тренування Reformer Pilates (до 8 осіб)', duration: '55 хв', priceUsd: 32, staff: 'Тренер Ірина (залишилось 3 місця)' },
            { name: 'Персональне EMS та функціональне тренування', duration: '45 хв', priceUsd: 60, staff: 'Старший тренер Амір' },
            { name: 'Безлімітний місячний абонемент у студію', duration: '30 днів', priceUsd: 220, staff: 'Доступ до всіх залів' },
          ],
          automations: [
            'Автоматичне сповіщення з листа очікування, коли звільняється місце в групі',
            'Нагадування про закінчення абонемента за 3 дні з посиланням на оплату',
            'Привітання клієнта з 10, 25 та 50-м тренуванням',
          ],
          kpiMetric: '+51% продовження абонементів',
          kpiLabel: 'Завдяки прозорому обліку пакетів тренувань',
          exampleLocations: 'Київ · Дніпро · Тель-Авів · Нетанія',
        },
        {
          id: 'auto',
          title: 'Автосервіси (СТО), детейлінг-центри та шиномонтаж',
          shortTitle: 'Автосервіс і Детейлінг',
          category: 'Автобізнес',
          description:
            'Планування завантаження постів та підйомників, історія авто за VIN-кодом і пробігом, фото-звіти етапів робіт у Кабінеті Клієнта та сезонні нагадування.',
          bookingPreviewTitle: 'Apex Detailing & Service — Бронювання поста',
          bookingServices: [
            { name: 'Нанесення кераміки 9H + 3-фазне полірування кузова', duration: '2 дні', priceUsd: 650, staff: 'Пост 01 · Майстер детейлінгу' },
            { name: 'Планове ТО та комп’ютерна діагностика авто', duration: '90 хв', priceUsd: 95, staff: 'Пост 03 · Провідний механік' },
            { name: 'Повна хімчистка салону та озонація', duration: '240 хв', priceUsd: 160, staff: 'Пост 02 · Команда догляду' },
          ],
          automations: [
            'Сповіщення у Telegram при переході авто на новий етап + "Авто готове до видачі"',
            'Сезонні нагадування про заміну шин та мастила за пробігом',
            'Цифровий акт огляду з фотографіями у Кабінеті Клієнта',
          ],
          kpiMetric: '+44% середній чек',
          kpiLabel: 'Через погодження додаткових робіт у Кабінеті Клієнта',
          exampleLocations: 'Київ · Харків · Хайфа · Ашдод',
        },
        {
          id: 'legal',
          title: 'Нерухомість, юридичні компанії та B2B консалтинг',
          shortTitle: 'Юристи та Нерухомість',
          category: 'Професійні послуги',
          description:
            'Статусний корпоративний сайт, запис на платні консультації, захищений Кабінет Клієнта зі сховищем договорів, трекером етапів угоди та прямим чатом.',
          bookingPreviewTitle: 'Advisory & Legal Partners — Кабінет та Консультації',
          bookingServices: [
            { name: 'Юридичний аудит об’єкта нерухомості та супровід угоди', duration: '60 хв', priceUsd: 150, staff: 'Керуючий партнер' },
            { name: 'Корпоративне структурування та податкова стратегія', duration: '60 хв', priceUsd: 200, staff: 'Старший юрист' },
            { name: 'Підбір та супровід купівлі нерухомості під ключ', duration: 'Етапи', priceUsd: 1200, staff: 'Виділена команда' },
          ],
          automations: [
            'Миттєве сповіщення Адміна, коли клієнт додає нотатку до продукту в Кабінеті',
            'Автоматичні сповіщення про завершення етапів угоди та готовність документів',
            'Бронювання консультацій із передоплатою та синхронізацією з Google Calendar',
          ],
          kpiMetric: 'У 3.2x швидші угоди',
          kpiLabel: 'Завдяки єдиному сховищу документів та нотаткам клієнта',
          exampleLocations: 'Київ · Львів · Тель-Авів · Єрусалим',
        },
        {
          id: 'education',
          title: 'Освітні центри, мовні школи та курси',
          shortTitle: 'Освіта та Курси',
          category: 'Освіта',
          description:
            'Розклад індивідуальних та групових занять, контроль балансу уроків в абонементі, навчальні матеріали у Кабінеті Клієнта та авто-виставлення рахунків.',
          bookingPreviewTitle: 'NextGen Academy — Пробний урок та Кабінет учня',
          bookingServices: [
            { name: 'Діагностика рівня + персональний пробний урок', duration: '45 хв', priceUsd: 25, staff: 'Академічний директор' },
            { name: 'Інтенсив англійської / івриту в міні-групі (8 занять)', duration: 'Місяць', priceUsd: 190, staff: 'Викладач-носій мови' },
            { name: 'Практичний курс IT та автоматизації бізнесу', duration: '12 тижнів', priceUsd: 480, staff: 'Senior інженер' },
          ],
          automations: [
            'Авто-нагадування про поповнення балансу, коли залишається 2 уроки',
            'Записи занять та PDF-конспекти доступні прямо в Кабінеті Клієнта',
            'Облік відвідуваності з миттєвими сповіщеннями у Telegram',
          ],
          kpiMetric: '92% утримання учнів',
          kpiLabel: 'Завдяки прозорому трекінгу прогресу та зручній оплаті',
          exampleLocations: 'Київ · Вінниця · Тель-Авів · Рамат-Ган',
        },
      ],
    },
    solutionsSection: {
      kicker: 'ВСЕ В ОДНІЙ КАСТОМНІЙ СИСТЕМІ · ЄДИНЕ ЯДРО',
      title: 'УСІ ОПЕРАЦІЇ ВАШОГО БІЗНЕСУ В ОДНІЙ ПЛАТФОРМІ',
      subtitle:
        'Замість десятка різних підписок ми створюємо для вас індивідуальну систему, де Сайт, CRM, Онлайн-запис, Склад, Фінанси, Кабінет Клієнта та Месенджер-автоматизація працюють як єдиний організм.',
      allIncludedBadge: 'ІНДИВІДУАЛЬНА АРХІТЕКТУРА ПІД ВАШІ ПРОЦЕСИ',
      categories: {
        all: 'УСІ МОДУЛІ',
        booking: 'САЙТ ТА ОНЛАЙН-ЗАПИС',
        crm: 'CRM ТА БАЗА КЛІЄНТІВ',
        portal: 'КАБІНЕТ КЛІЄНТА',
        automation: 'TELEGRAM ТА WHATSAPP',
        finance: 'ФІНАНСИ ТА СКЛАД',
        analytics: 'АНАЛІТИКА ТА ІНТЕГРАЦІЇ',
      },
      items: [
        {
          id: 'sol-booking',
          number: '01',
          category: 'booking',
          title: 'Віджет онлайн-запису 24/7 та Розумний Календар',
          subtitle: 'Конвертуйте трафік з Instagram, Google Maps, Telegram та сайту у підтверджені візити',
          description:
            'Брендований віджет запису українською, англійською та івритом. Підтримує комбо-послуги, розподіл кабінетів і обладнання та обов’язкову передоплату.',
          highlights: [
            'Інтерактивний календар розкладу для 1–100+ спеціалістів',
            'Прямі посилання для шапки Instagram, Google Карт та чат-ботів',
            'Захист від неявок через часткову або повну онлайн-передоплату',
          ],
          localIntegrations: ['Google Maps Запис', 'Instagram Bio Link', 'Google Calendar 2-Way Sync'],
          metric: '+47% онлайн-записів',
        },
        {
          id: 'sol-website',
          number: '02',
          category: 'booking',
          title: 'Висококонверсійний багатомовний сайт бізнесу',
          subtitle: 'Надшвидкі SEO-оптимізовані сайти (UA / EN / HE) з нативною підтримкою RTL',
          description:
            'На відміну від звичайних SaaS-віджетів, BryTech створює повноцінний преміальний сайт вашої компанії, напряму з’єднаний із вашою CRM та календарем.',
          highlights: [
            'Ідеальна адаптація під ПК та мобільний додаток для клієнта',
            'Локальне SEO для Києва, Львова, Одеси, Тель-Авіва та Хайфи',
            'Миттєва передача заявок у CRM-воронку та Telegram адміністратора',
          ],
          localIntegrations: ['Google Analytics 4', 'Meta Pixel', 'Google Search Console'],
          metric: '99/100 швидкість сайту',
        },
        {
          id: 'sol-crm',
          number: '03',
          category: 'crm',
          title: 'CRM-система, база клієнтів та воронка продажів',
          subtitle: 'Повне досьє клієнта, історія візитів, теги, файли та Kanban-дошка угод',
          description:
            'Кожен дзвінок, запис, повідомлення в чаті та оплата зберігаються в єдиній картці клієнта. Автоматичний поділ клієнтів на сегменти VIP, Нові, Сплячі.',
          highlights: [
            'Повна історія візитів і покупок із прикріпленням фото "до/після" та PDF',
            'Візуальна Kanban-воронка для довгих угод та B2B замовлень',
            'RFM-сегментація для повернення клієнтів в 1 клік',
          ],
          localIntegrations: ['Binotel / Phonet IP-телефонія', 'Імпорт з Excel за 1 клік', 'Webhook API'],
          metric: '100% контроль заявок',
        },
        {
          id: 'sol-portal',
          number: '04',
          category: 'portal',
          title: 'Брендований Кабінет Клієнта (Client Area Portal)',
          subtitle: 'Особистий кабінет, де клієнт бачить прогрес, додає нотатки, чатиться та скачує документи',
          description:
            'Надайте клієнтам VIP-сервіс. Клієнт входить за логіном і паролем, бачить свої активні продукти, шкалу готовності у %, етапи проекту, документи та живий чат з Адміном.',
          highlights: [
            'Дашборд прогресу продуктів з анімованими індикаторами виконання',
            'Нотатки клієнта до продуктів із миттєвим сповіщенням в Адмін-панелі',
            'Вбудований онлайн-чат у реальному часі між Клієнтом та Адміністратором',
          ],
          localIntegrations: ['Firebase Real-Time БД', 'WebSocket Живий Чат', 'Сховище документів'],
          metric: '-65% дзвінків про статус',
        },
        {
          id: 'sol-automation',
          number: '05',
          category: 'automation',
          title: 'Центр автоматизації Telegram, WhatsApp та SMS',
          subtitle: 'Авто-нагадування про візит, збір відгуків, привітання та повернення клієнтів',
          description:
            'Зменшуйте кількість неявок на 78% завдяки розумним сценаріям у месенджерах. Відправляйте WhatsApp Business, Telegram-бот, Viber або SMS автоматично.',
          highlights: [
            'Нагадування за 24 год і 2 год із кнопками Підтвердити / Перенести',
            'Автоматичний запит відгуку в Google Maps після завершення послуги',
            'Тригерні повідомлення клієнтам, які не були 45/60/90 днів',
          ],
          localIntegrations: ['WhatsApp Business API', 'Telegram Bot API', 'Viber / TurboSMS / InforU'],
          metric: '-78% запізнень і неявок',
        },
        {
          id: 'sol-finance',
          number: '06',
          category: 'finance',
          title: 'Фінанси, рахунки, зарплата персоналу та Склад',
          subtitle: 'Авто-розрахунок комісій майстрів, P&L звіти та списання розхідних матеріалів',
          description:
            'Контролюйте кожну гривню (₴), шекель (₪) та долар ($). Гнучкі правила нарахування зарплат (% від послуг, % від товарів, бонусні KPI) та складський облік.',
          highlights: [
            'Автоматичні відомості зарплати та премій для кожного спеціаліста',
            'Звіт P&L (прибутки та збитки), каси готівка/безготівка та статті витрат',
            'Технологічні карти та авто-списання матеріалів зі складу при візиті',
          ],
          localIntegrations: ['Monobank / LiqPay / Приват24', 'Checkbox ПРРО', 'Meshulam / Bit / Tranzila / GreenInvoice'],
          metric: '8 год/тиж економії часу',
        },
        {
          id: 'sol-analytics',
          number: '07',
          category: 'analytics',
          title: 'Аналітика керівника, Лояльність та Мережевий HQ',
          subtitle: 'Когорти утримання, завантаженість спеціалістів, сертифікати, абонементи та мережі',
          description:
            'Приймайте рішення на основі точних цифр. Відстежуйте повернення клієнтів, виручку за годину, ROI реклами та керуйте кешбеком і подарунковими сертифікатами.',
          highlights: [
            'Електронні картки лояльності, багаторівневий кешбек та абонементи',
            'Звіти по завантаженості персоналу, середньому чеку та LTV клієнтів',
            'Єдиний центр управління мережею філій в Україні та Ізраїлі',
          ],
          localIntegrations: ['Нова Пошта API', '1С / BAS Синхронізація', 'Stripe & PayPal', 'Експорт Excel / CSV'],
          metric: '+34% LTV клієнта',
        },
      ],
      integrationsTitle: '60+ НАТИВНИХ ІНТЕГРАЦІЙ ДЛЯ УКРАЇНИ ТА ІЗРАЇЛЮ',
      integrationsSubtitle:
        'Пряме підключення до платіжних систем, ПРРО, месенджерів та сервісів доставки, якими щодня користується бізнес у Києві, Львові, Тель-Авіві та Хайфі.',
    },
    pricingPage: {
      kicker: 'ПРОЗОРІ ТАРИФИ У СТИЛІ ALTEG.IO · УСІ 20 МОДУЛІВ ВКЛЮЧЕНО',
      titleLine1: 'ЄДИНА ПОВНА СИСТЕМА.',
      titleLine2: 'БЕЗ УРІЗАНИХ ТАРИФІВ І ДОПЛАТ.',
      subtitle:
        'Як і в Altegio, кожен план BryTech включає всі 20 модулів платформи з 0% комісії за записи та безлімітною кількістю клієнтів. Оберіть розмір команди та період оплати, щоб отримати до +9 місяців у подарунок — або замовте одноразовий викуп системи під ключ.',
      noTiersBadge: 'УСІ 20 МОДУЛІВ ДОСТУПНІ НА БУДЬ-ЯКОМУ ТАРИФІ · 0% КОМІСІЇ',
      step1Title: '1. Оберіть розмір вашої команди (активні спеціалісти)',
      step1Subtitle: 'Доступи для власника та адміністраторів надаються безкоштовно',
      step2Title: '2. Оберіть період ліцензії та Бонусні Місяці',
      step2Subtitle: 'При оплаті на 3, 6 або 12 місяців ви отримуєте до +9 місяців безкоштовно',
      locationsLabel: 'Кількість локацій / філій:',
      locationsUnit: 'Філія(ї)',
      teamTiers: [
        {
          id: 'tier-2',
          label: 'До 2',
          sublabel: 'Соло-майстер / Міні-студія',
          staffCountText: '1–2 спеціалісти',
          baseMonthlyUsd: 29,
          turnkeyOneTimeUsd: 490,
        },
        {
          id: 'tier-5',
          label: '3 – 5',
          sublabel: 'Зростаючий локальний бізнес',
          staffCountText: '3–5 спеціалістів',
          baseMonthlyUsd: 49,
          turnkeyOneTimeUsd: 790,
          popular: true,
        },
        {
          id: 'tier-10',
          label: '6 – 10',
          sublabel: 'Клініка / Салон / Сервіс',
          staffCountText: '6–10 спеціалістів',
          baseMonthlyUsd: 79,
          turnkeyOneTimeUsd: 1190,
        },
        {
          id: 'tier-20',
          label: '11 – 20',
          sublabel: 'Великий центр / Флагман',
          staffCountText: '11–20 спеціалістів',
          baseMonthlyUsd: 119,
          turnkeyOneTimeUsd: 1690,
        },
        {
          id: 'tier-50',
          label: '21 – 50',
          sublabel: 'Корпоративний відділ',
          staffCountText: '21–50 спеціалістів',
          baseMonthlyUsd: 169,
          turnkeyOneTimeUsd: 2390,
        },
        {
          id: 'tier-unlimited',
          label: 'Безліміт',
          sublabel: 'Мережа та Enterprise',
          staffCountText: '50+ без обмежень',
          baseMonthlyUsd: 229,
          turnkeyOneTimeUsd: 3200,
        },
      ],
      billingOptions: [
        {
          id: '1m',
          monthsPaid: 1,
          bonusFreeMonths: 0,
          discountPercent: 0,
          label: '1 Місяць',
          sublabel: 'Гнучкий старт помісячно',
        },
        {
          id: '3m',
          monthsPaid: 3,
          bonusFreeMonths: 1,
          discountPercent: 25,
          label: '3 Місяці',
          sublabel: 'Оплата 3 міс → 4 міс доступу',
          badgeText: '+1 МІСЯЦЬ У ПОДАРУНОК',
        },
        {
          id: '6m',
          monthsPaid: 6,
          bonusFreeMonths: 3,
          discountPercent: 33,
          label: '6 Місяців',
          sublabel: 'Оплата 6 міс → 9 міс доступу',
          badgeText: '+3 МІСЯЦІ У ПОДАРУНОК',
        },
        {
          id: '12m',
          monthsPaid: 12,
          bonusFreeMonths: 9,
          discountPercent: 43,
          label: '12 Місяців',
          sublabel: 'Оплата 12 міс → 21 міс доступу',
          badgeText: '+9 МІСЯЦІВ БОНУС · ХІТ',
          isBestValue: true,
        },
        {
          id: 'turnkey',
          monthsPaid: 1,
          bonusFreeMonths: 0,
          discountPercent: 70,
          label: 'Викуп під ключ',
          sublabel: 'Разова оплата · Код назавжди',
          badgeText: 'БЕЗ АБОНПЛАТИ',
        },
      ],
      summaryCard: {
        headerTag: 'ВАША КОНФІГУРАЦІЯ ТАРИФУ',
        effectiveMonthlyLabel: 'Фактична вартість на місяць',
        perMonthSuffix: '/ міс.',
        turnkeyOneTimeLabel: 'Одноразовий викуп системи під ключ',
        totalAccessLabel: 'Загальний термін дії ліцензії',
        monthsPaidWord: 'міс. оплачено',
        bonusMonthsWord: 'міс. БОНУС БЕЗКОШТОВНО',
        totalMonthsWord: 'міс. повного доступу',
        youSaveLabel: 'Ваша пряма економія',
        zeroCommissionBadge: '0% комісії за онлайн-записи та оплати',
        unlimitedBookingsBadge: 'Безлімітна база клієнтів та візитів',
        freeMigrationBadge: 'Безкоштовне перенесення бази за 48 год',
        ctaStartTrial: 'СПРОБУВАТИ 7 ДНІВ БЕЗКОШТОВНО',
        ctaBookDemo: 'ЗАМОВИТИ СИСТЕМУ / КОНСУЛЬТАЦІЮ',
        trialFootnote: 'Без прив’язки картки · Повний доступ до всіх 20 модулів · Підтримка Київ та Тель-Авів',
      },
      twentyModulesTitle: 'УСІ 20 МОДУЛІВ ВКЛЮЧЕНО — БЕЗ ДОПЛАТ ЗА ФУНКЦІЇ',
      twentyModulesSubtitle:
        'Кожна підписка або система під ключ відкриває повний арсенал інструментів BryTech та Altegio-рівня:',
      twentyModulesList: [
        { id: 'm1', title: '01. Віджет онлайн-запису 24/7', category: 'Запис', desc: 'Встановлення на сайт, Instagram, Telegram, WhatsApp та Google Maps.' },
        { id: 'm2', title: '02. Розумний календар розкладу', category: 'Запис', desc: 'Зручна сітка розкладу для спеціалістів, кабінетів та обладнання.' },
        { id: 'm3', title: '03. Багатомовний вебсайт бізнесу', category: 'Запис', desc: 'Сучасний швидкий сайт українською, англійською та івритом.' },
        { id: 'm4', title: '04. Візуальна CRM та картки клієнтів', category: 'CRM', desc: 'Повна історія візитів, уподобання, фото "до/після" та теги.' },
        { id: 'm5', title: '05. Особистий Кабінет Клієнта', category: 'Портал', desc: 'Вхід за логіном/паролем, шкала прогресу продуктів, нотатки та чат.' },
        { id: 'm6', title: '06. Сховище документів і таймлайни', category: 'Портал', desc: 'Договори, рахунки, акти та дорожня карта етапів проекту.' },
        { id: 'm7', title: '07. Автоматизація WhatsApp Business', category: 'Автоматизація', desc: 'Авто-підтвердження запису, нагадування та збір відгуків.' },
        { id: 'm8', title: '08. Telegram-бот для клієнтів та Адміна', category: 'Автоматизація', desc: 'Запис, перенесення візитів та миттєві сповіщення у Telegram.' },
        { id: 'm9', title: '09. Захист від неявок і передоплата', category: 'Фінанси', desc: 'Прийом депозитів через Monobank, LiqPay, Приват24, Bit, Stripe.' },
        { id: 'm10', title: '10. Розрахунок зарплат і комісій', category: 'Фінанси', desc: 'Гнучкі % від послуг і товарів, ставки, бонуси та відомості.' },
        { id: 'm11', title: '11. Фінансовий облік та P&L звіти', category: 'Фінанси', desc: 'Контроль кас, доходів, витрат та чистого прибутку бізнесу.' },
        { id: 'm12', title: '12. Складський облік і розхідники', category: 'Фінанси', desc: 'Автоматичне списання матеріалів за техкартами та залишки.' },
        { id: 'm13', title: '13. Програма лояльності та кешбек', category: 'CRM', desc: 'Бонусні бали, рівні карт клієнтів та автоматичні знижки.' },
        { id: 'm14', title: '14. Абонементи та пакети послуг', category: 'CRM', desc: 'Продаж курсів процедур та місячних абонементів з обліком візитів.' },
        { id: 'm15', title: '15. Подарункові сертифікати', category: 'Запис', desc: 'Електронні та фізичні сертифікати з контролем залишку номіналу.' },
        { id: 'm16', title: '16. Авто-повернення сплячих клієнтів', category: 'Автоматизація', desc: 'Тригерні повідомлення клієнтам через 45/60/90 днів без візитів.' },
        { id: 'm17', title: '17. Генератор 5-зіркових відгуків', category: 'Автоматизація', desc: 'Зростання рейтингу в Google Maps та перехоплення негативу.' },
        { id: 'm18', title: '18. Управління мережею філій', category: 'Аналітика', desc: 'Єдина база клієнтів та зведена аналітика по всіх точках.' },
        { id: 'm19', title: '19. Когортна аналітика та ROI', category: 'Аналітика', desc: 'Аналіз повернення клієнтів, завантаження майстрів та реклами.' },
        { id: 'm20', title: '20. Повна Адмін-панель та Живий Чат', category: 'Портал', desc: 'Керування клієнтами, продуктами, нотатками та кнопками зв’язку.' },
      ],
      comparisonTitle: 'ДЕТАЛЬНЕ ПОРІВНЯННЯ МОЖЛИВОСТЕЙ',
      comparisonSubtitle:
        'Подивіться, як BryTech поєднує потужність хмарної платформи рівня Altegio із власним сайтом та Кабінетом Клієнта.',
      colFeature: 'ФУНКЦІЯ / МОДУЛЬ',
      colBrytech: 'BRYTECH ALL-IN-ONE (UA & IL)',
      colGenericSaas: 'ЗВИЧАЙНІ SAAS ВІДЖЕТИ',
      colAgency: 'ТРАДИЦІЙНА IT-СТУДІЯ',
      comparisonCategories: [
        {
          id: 'cat-booking',
          title: 'Вебсайт, Онлайн-запис та Календар розкладу',
          rows: [
            { feature: 'Власний багатомовний сайт (UA / EN / HE)', brytech: 'Включено / Розробка під ключ', altegioSaaS: 'Лише віджет (без сайту)', agency: '$3,500 – $8,000 окремо' },
            { feature: 'Онлайн-запис 24/7 та календар спеціалістів/кабінетів', brytech: true, altegioSaaS: true, agency: 'Від $4,000 за розробку' },
            { feature: 'Комісія платформи за онлайн-записи та платежі', brytech: '0% комісії', altegioSaaS: '0% – 2.5% комісії', agency: '0% комісії' },
            { feature: 'Безлімітна кількість записів та клієнтів у базі', brytech: true, altegioSaaS: true, agency: true },
          ],
        },
        {
          id: 'cat-portal',
          title: 'CRM, Кабінет Клієнта та Живий Чат',
          rows: [
            { feature: 'Особистий Кабінет Клієнта з трекером прогресу замовлень', brytech: true, altegioSaaS: false, agency: 'Від $5,000 окремо' },
            { feature: 'Нотатки клієнта до продуктів зі сповіщенням Адміна', brytech: true, altegioSaaS: false, agency: 'Рідко реалізується' },
            { feature: 'Вбудований онлайн-чат Клієнт ↔ Адмін-панель', brytech: true, altegioSaaS: 'Платний модуль', agency: 'Сторонній платний сервіс' },
            { feature: 'CRM-воронка, історія візитів та RFM-сегментація', brytech: true, altegioSaaS: true, agency: 'Кастомна розробка' },
          ],
        },
        {
          id: 'cat-local',
          title: 'Інтеграції для України та Ізраїлю + Володіння кодом',
          rows: [
            { feature: 'Інтеграції Україна (Monobank, LiqPay, Checkbox ПРРО, Нова Пошта)', brytech: true, altegioSaaS: 'Частково', agency: 'Погодинна оплата' },
            { feature: 'Інтеграції Ізраїль (Bit, Meshulam, Tranzila, GreenInvoice, RTL)', brytech: true, altegioSaaS: 'Частково', agency: 'Погодинна оплата' },
            { feature: 'Telegram-бот + WhatsApp Business авто-нагадування', brytech: true, altegioSaaS: 'Потрібен платний агрегатор', agency: 'Від $1,500 за бота' },
            { feature: 'Можливість одноразового викупу системи без абонплати', brytech: true, altegioSaaS: false, agency: true },
          ],
        },
      ],
      migrationBanner: {
        tag: 'БЕЗКОШТОВНИЙ ПЕРЕЇЗД · КИЇВ ТА ТЕЛЬ-АВІВ',
        title: 'ПЕРЕХОДИТЕ З EXCEL АБО ІНШОЇ CRM? ПЕРЕНЕСЕМО ВСЮ БАЗУ БЕЗКОШТОВНО ЗА 48 ГОДИН.',
        desc: 'Наша київська команда інженерів дбайливо перенесе вашу базу клієнтів, історію візитів, прайс-лист та розклад майстрів без зупинки роботи бізнесу.',
        bullet1: '100% безкоштовний імпорт з Excel, Altegio, Yclients, Booksy, Beauty Pro або Бітрікс',
        bullet2: 'Навчання вашої команди українською, англійською або івритом',
        bullet3: '7 днів безкоштовного тестування з усіма 20 модулями',
        cta: 'ЗАМОВИТИ БЕЗКОШТОВНУ МІГРАЦІЮ ТА ТЕСТ',
      },
      faqTitle: 'ЧАСТІ ЗАПИТАННЯ ПРО ТАРИФИ ТА ВПРОВАДЖЕННЯ',
      faqSubtitle: 'Відповіді про бонусні місяці, викуп системи під ключ та підключення платіжних систем.',
      faqs: [
        {
          q: 'Як працюють Бонусні Безкоштовні Місяці (+1, +3, +9 місяців)?',
          a: 'За аналогією з Altegio, при оплаті ліцензії на 3 місяці ви отримуєте +1 місяць у подарунок (разом 4 місяці). При оплаті на 6 місяців — +3 місяці безкоштовно (разом 9 місяців), а при оплаті на 12 місяців — +9 місяців у подарунок (21 місяць повного доступу), що заощаджує 43% бюджету.',
        },
        {
          q: 'У чому різниця між Підпискою та Викупом системи під ключ?',
          a: 'У форматі Підписки ви сплачуєте невеликий платіж залежно від кількості спеціалістів, а ми забезпечуємо хмарний хостинг, оновлення та підтримку. У форматі Викупу під ключ ви платите один раз і отримуєте Сайт, CRM, Кабінет Клієнта та Бота у повну власність без щомісячних платежів.',
        },
        {
          q: 'Чи є якісь функції, закриті в базових тарифах?',
          a: 'Ні! Усі 20 модулів відкриті для кожного клієнта незалежно від розміру команди: онлайн-запис, сайт, CRM, Кабінет Клієнта, Telegram/WhatsApp автоматизація, розрахунок зарплат, склад та аналітика.',
        },
        {
          q: 'Чи берете ви комісію за онлайн-записи або платежі клієнтів?',
          a: 'Жодної комісії (0%). Усі оплати від ваших клієнтів надходять напряму на ваш рахунок Monobank, Приват24, LiqPay, Bit, Meshulam, Tranzila або Stripe.',
        },
        {
          q: 'Чи допоможете перенести нашу поточну базу клієнтів та записи?',
          a: 'Так, наші інженери безкоштовно імпортують клієнтів, історію візитів, залишки абонементів та прайс-лист із Excel, Altegio, Yclients або іншої програми за 48 годин.',
        },
        {
          q: 'Як працює Кабінет Клієнта та Адмін-панель?',
          a: 'Адміністратор створює облікові записи клієнтів в Адмін-панелі (іконка замка у футері). Клієнт входить через вікно Client Area за логіном і паролем, бачить свої продукти, прогрес виконання, додає нотатки (про які Адмін миттєво отримує сповіщення) та спілкується в онлайн-чаті.',
        },
      ],
    },
  },
  ru: {
    navExtended: {
      overview: 'ОБЗОР',
      businessTypes: 'МАСШТАБ БИЗНЕСА',
      industries: 'ИНДУСТРИИ',
      solutions: 'РЕШЕНИЯ',
      pricing: 'АРХИТЕКТУРА И ЦЕНЫ',
      builder: 'КОНСТРУКТОР СИСТЕМЫ',
      cases: 'КЕЙСЫ',
      freeTrialBadge: 'КАСТОМНАЯ СИСТЕМА',
      backToHome: 'Назад к обзору',
    },
    businessTypesSection: {
      kicker: 'АРХИТЕКТУРА ПОД МАСШТАБ ВАШЕЙ КОМПАНИИ',
      title: 'ЕДИНАЯ СИСТЕМА ДЛЯ КАЖДОГО ЭТАПА РАЗВИТИЯ БИЗНЕСА',
      subtitle:
        'Независимо от того, управляете ли вы частной студией, многопрофильной компанией или сетью филиалов — мы создаем индивидуальную операционную систему, объединяющую все ваши бизнес-процессы в одном месте.',
      exploreBtn: 'СКОНФИГУРИРОВАТЬ СИСТЕМУ ПОД СЕБЯ',
      items: [
        {
          id: 'solo',
          badge: 'ЧАСТНАЯ ПРАКТИКА И МИНИ-СТУДИИ',
          title: 'Частные специалисты и бутик-студии',
          subtitle: 'Врачи, косметологи, юристы, консультанты, детейлинг и профильные студии',
          staffRange: '1–3 специалиста · Единый контур записи и учета',
          description:
            'Избавьтесь от пропущенных звонков и ручной записи в мессенджерах. Получите брендированный сайт, онлайн-запись 24/7, авто-напоминания в Telegram/WhatsApp, прием предоплаты и единую базу клиентов.',
          painPointsSolved: [
            'Самостоятельная онлайн-запись 24/7 через сайт, Instagram, Telegram и WhatsApp',
            'Автоматический прием предоплаты для защиты от неявок клиентов',
            'Электронная карточка клиента с историей визитов, файлами и заметками',
          ],
          includedModules: ['Виджет онлайн-записи', 'Персональный сайт', 'Telegram и WhatsApp бот', 'Карточка клиента CRM'],
          metricHighlight: '-78% неявок',
          metricSub: 'Уже в первые 30 дней работы автоматических напоминаний',
          recommendedTeamTierId: 'tier-2',
        },
        {
          id: 'smb',
          badge: 'МАЛЫЙ И СРЕДНИЙ БИЗНЕС',
          title: 'Сервисные компании, клиники и студии',
          subtitle: 'Медицинские центры, салоны красоты, автосервисы, фитнес и сервисные компании',
          staffRange: '4–15 сотрудников · Полная автоматизация операций',
          description:
            'Замените таблицы Excel и разрозненные программы единой кастомной системой: многоязычный сайт, расписание специалистов и кабинетов, CRM-воронка продаж, расчет зарплат, склад и личный Кабинет Клиента.',
          painPointsSolved: [
            'Интерактивный календарь расписания мастеров, кабинетов и оборудования без накладок',
            'Автоматический расчет зарплаты, % комиссии и бонусов персонала',
            'Личный Кабинет Клиента с прогрессом заказов, документами и живым чатом',
          ],
          includedModules: ['Многостраничный сайт', 'CRM и расписание команды', 'Кабинет Клиента', 'Зарплата и Склад', 'Telegram/WhatsApp автоматизация'],
          metricHighlight: '+42% повторных визитов',
          metricSub: 'Благодаря системе лояльности и триггерным возвратам',
          recommendedTeamTierId: 'tier-5',
        },
        {
          id: 'chains',
          badge: 'СЕТИ И МНОГОФИЛИАЛЬНЫЙ БИЗНЕС',
          title: 'Сети филиалов и франшизы',
          subtitle: 'Сети клиник, салонов, шоурумов и сервисных центров в разных городах и странах',
          staffRange: '15–100+ сотрудников · Централизованное управление',
          description:
            'Единый центр управления всеми филиалами вашей компании. Общая база клиентов, сквозные абонементы и сертификаты, гибкие роли доступа и сводная финансовая аналитика P&L в реальном времени.',
          painPointsSolved: [
            'Единая карточка клиента, бонусный счет и абонементы для всех филиалов сети',
            'Сводный P&L дашборд владельца: выручка, удержание и загрузка по точкам',
            'Разграничение прав доступа (администратор видит только свой филиал)',
          ],
          includedModules: ['Управление сетью филиалов', 'Единая CRM и ERP', 'Кросс-филиальная аналитика', 'API и синхронизация', 'Выделенный архитектор'],
          metricHighlight: 'В 3.4x быстрее масштабирование',
          metricSub: 'Подключение новой точки сети за 48 часов',
          recommendedTeamTierId: 'tier-20',
        },
        {
          id: 'custom-enterprise',
          badge: 'ИНДИВИДУАЛЬНАЯ ERP / B2B СИСТЕМА',
          title: 'B2B компании и нестандартные бизнес-процессы',
          subtitle: 'Строительство, логистика, производство, недвижимость и консалтинг',
          staffRange: 'Индивидуальная архитектура · 100% владение системой',
          description:
            'Нужна система под уникальную логику бизнеса? Мы проектируем кастомные Кабинеты Клиентов, хранилища документов, трекеры этапов производства/проектов и ERP-ядро, объединяющее все отделы компании.',
          painPointsSolved: [
            'Кабинет Клиента с трекером прогресса, заметками к продуктам и живым чатом с Админом',
            'Двусторонняя интеграция с банками, кассами, складским учетом и службами доставки',
            'Полное владение исходным кодом и архитектурой без ежемесячной платы за каждого сотрудника',
          ],
          includedModules: ['Кастомный Кабинет Клиента', 'Хранилище документов и таймлайны', 'Индивидуальная CRM/ERP', 'Живой чат с Админом', 'Webhook и API интеграции'],
          metricHighlight: 'До 70% экономии',
          metricSub: 'По сравнению с традиционной заказной разработкой',
          recommendedTeamTierId: 'tier-unlimited',
        },
      ],
    },
    industriesSection: {
      kicker: '12 СПЕЦИАЛИЗИРОВАННЫХ ОТРАСЛЕЙ · АРХИТЕКТУРА ПОД ВАШУ НИШУ',
      title: 'ЕДИНЫЕ СИСТЕМЫ, СПРОЕКТИРОВАННЫЕ ПОД ВАШУ ИНДУСТРИЮ',
      subtitle:
        'Выберите вашу сферу бизнеса ниже, чтобы увидеть, как мы объединяем онлайн-запись, CRM-карточку клиента, Кабинет Клиента, склад и автоматизацию Telegram/WhatsApp в одну систему.',
      liveWidgetTag: 'ИНТЕРАКТИВНЫЙ ПРОТОТИП ОТРАСЛИ',
      bookNowDemo: 'ПРОТЕСТИРОВАТЬ ЭТОТ СЦЕНАРИЙ',
      automationsLabel: 'ВКЛЮЧЕННЫЕ СЦЕНАРИИ АВТОМАТИЗАЦИИ',
      items: [
        {
          id: 'medical',
          title: 'Медицинские, стоматологические и эстетические клиники',
          shortTitle: 'Медицина и Клиники',
          category: 'Здравоохранение',
          description:
            'Медицинская CRM с историей лечения, расписание врачей и кабинетов/аппаратов, автоматические инструкции подготовки к приему в Telegram/WhatsApp и результаты анализов в Кабинете Клиента.',
          bookingPreviewTitle: 'Медицинский Центр — Единая Система Записи',
          bookingServices: [
            { name: 'Комплексная консультация стоматолога + 3D КТ', duration: '45 мин', priceUsd: 65, staff: 'Д-р Елена Коваленко' },
            { name: 'Лазерное эстетическое омоложение (протокол)', duration: '60 мин', priceUsd: 180, staff: 'Д-р Яэль Леви' },
            { name: 'Повторный осмотр и план лечения', duration: '30 мин', priceUsd: 45, staff: 'Главный врач' },
          ],
          automations: [
            'Напоминание за 24 ч и 2 ч в Telegram/WhatsApp с кнопкой подтверждения',
            'Автоматическая отправка рекомендаций после процедуры в Кабинет Клиента',
            'Приглашение на профилактический осмотр через 6 месяцев на автопилоте',
          ],
          kpiMetric: '+38% загрузка кресел',
          kpiLabel: 'За счет единого расписания и авто-подтверждений',
          exampleLocations: 'Полная автоматизация клиник и медцентров',
        },
        {
          id: 'beauty',
          title: 'Салоны красоты, барбершопы и SPA-студии',
          shortTitle: 'Салоны и Beauty',
          category: 'Красота и Уход',
          description:
            'Круглосуточная запись из Instagram и Google Maps, параллельные услуги (маникюр в 4 руки), списание краски и расходников до грамма, авто-сбор отзывов и чаевых.',
          bookingPreviewTitle: 'Beauty & Barber Studio — Онлайн-запись 24/7',
          bookingServices: [
            { name: 'Сложное окрашивание волос + уход Olaplex', duration: '150 мин', priceUsd: 140, staff: 'Топ-стилист Анна' },
            { name: 'Мужская стрижка и моделирование бороды', duration: '60 мин', priceUsd: 55, staff: 'Шеф-барбер Давид' },
            { name: 'Комплекс маникюр + педикюр в 4 руки', duration: '90 мин', priceUsd: 85, staff: '2 мастера синхронно' },
          ],
          automations: [
            'Мгновенная запись через Instagram Direct и Telegram-бот без участия администратора',
            'Автоматическое списание материалов со склада при закрытии визита',
            'Запрос оценки 5 звезд в Google Maps через 1 час после визита',
          ],
          kpiMetric: '64% записей в нерабочее время',
          kpiLabel: 'Клиенты записываются 24/7 через соцсети и мессенджеры',
          exampleLocations: 'Единая система для салонов и SPA-сетей',
        },
        {
          id: 'fitness',
          title: 'Фитнес-клубы, студии йоги, пилатеса и EMS',
          shortTitle: 'Фитнес и Студии',
          category: 'Спорт и Велнес',
          description:
            'Лимиты мест на групповые тренировки, авто-лист ожидания, учет абонементов и заморозок, QR-пропуск в Кабинете Клиента и расчет ставки тренеров.',
          bookingPreviewTitle: 'Pulse Reformer & Fitness Studio — Расписание групп',
          bookingServices: [
            { name: 'Групповая тренировка Reformer Pilates (до 8 чел)', duration: '55 мин', priceUsd: 32, staff: 'Тренер Ирина (осталось 3 места)' },
            { name: 'Персональная EMS и функциональная тренировка', duration: '45 мин', priceUsd: 60, staff: 'Старший тренер Амир' },
            { name: 'Безлимитный месячный абонемент в студию', duration: '30 дней', priceUsd: 220, staff: 'Доступ во все залы' },
          ],
          automations: [
            'Автоматическое уведомление из листа ожидания, когда освобождается место в группе',
            'Напоминание об окончании абонемента за 3 дня со ссылкой на оплату',
            'Поздравление клиента с 10, 25 и 50-й тренировкой',
          ],
          kpiMetric: '+51% продление абонементов',
          kpiLabel: 'Благодаря прозрачному учету пакетов тренировок',
          exampleLocations: 'Единая система для фитнес-клубов и студий',
        },
        {
          id: 'auto',
          title: 'Автосервисы (СТО), детейлинг-центры и шиномонтаж',
          shortTitle: 'Автосервис и Детейлинг',
          category: 'Автобизнес',
          description:
            'Планирование загрузки постов и подъемников, история авто по VIN-коду и пробегу, фото-отчеты этапов работ в Кабинете Клиента и сезонные напоминания.',
          bookingPreviewTitle: 'Apex Detailing & Service — Бронирование поста',
          bookingServices: [
            { name: 'Нанесение керамики 9H + 3-фазная полировка кузова', duration: '2 дня', priceUsd: 650, staff: 'Пост 01 · Мастер детейлинга' },
            { name: 'Плановое ТО и компьютерная диагностика авто', duration: '90 мин', priceUsd: 95, staff: 'Пост 03 · Ведущий механик' },
            { name: 'Полная химчистка салона и озонация', duration: '240 мин', priceUsd: 160, staff: 'Пост 02 · Команда ухода' },
          ],
          automations: [
            'Уведомление в Telegram при переходе авто на новый этап + "Авто готово к выдаче"',
            'Сезонные напоминания о замене шин и масла по пробегу',
            'Цифровой акт осмотра с фотографиями в Кабинете Клиента',
          ],
          kpiMetric: '+44% средний чек',
          kpiLabel: 'Через согласование дополнительных работ в Кабинете Клиента',
          exampleLocations: 'Единая платформа управления автосервисом и СТО',
        },
        {
          id: 'legal',
          title: 'Недвижимость, юридические компании и B2B консалтинг',
          shortTitle: 'Юристы и Недвижимость',
          category: 'Профессиональные услуги',
          description:
            'Статусный корпоративный сайт, запись на платные консультации, защищенный Кабинет Клиента с хранилищем договоров, трекером этапов сделки и прямым чатом.',
          bookingPreviewTitle: 'Advisory & Legal Partners — Кабинет и Консультации',
          bookingServices: [
            { name: 'Юридический аудит объекта недвижимости и сопровождение сделки', duration: '60 мин', priceUsd: 150, staff: 'Управляющий партнер' },
            { name: 'Корпоративное структурирование и налоговая стратегия', duration: '60 мин', priceUsd: 200, staff: 'Старший юрист' },
            { name: 'Подбор и сопровождение покупки недвижимости под ключ', duration: 'Этапы', priceUsd: 1200, staff: 'Выделенная команда' },
          ],
          automations: [
            'Мгновенное уведомление Админа, когда клиент добавляет заметку к продукту в Кабинете',
            'Автоматические уведомления о завершении этапов сделки и готовности документов',
            'Бронирование консультаций с предоплатой и синхронизацией с Google Calendar',
          ],
          kpiMetric: 'В 3.2x быстрее сделки',
          kpiLabel: 'Благодаря единому хранилищу документов и заметкам клиента',
          exampleLocations: 'Корпоративный портал и CRM для консалтинга',
        },
        {
          id: 'education',
          title: 'Образовательные центры, языковые школы и курсы',
          shortTitle: 'Образование и Курсы',
          category: 'Образование',
          description:
            'Расписание индивидуальных и групповых занятий, контроль баланса уроков в абонементе, учебные материалы в Кабинете Клиента и авто-выставление счетов.',
          bookingPreviewTitle: 'NextGen Academy — Пробный урок и Кабинет ученика',
          bookingServices: [
            { name: 'Диагностика уровня + персональный пробный урок', duration: '45 мин', priceUsd: 25, staff: 'Академический директор' },
            { name: 'Интенсив иностранного языка в мини-группе (8 занятий)', duration: 'Месяц', priceUsd: 190, staff: 'Преподаватель-носитель' },
            { name: 'Практический курс IT и автоматизации бизнеса', duration: '12 недель', priceUsd: 480, staff: 'Senior инженер' },
          ],
          automations: [
            'Авто-напоминание о пополнении баланса, когда остается 2 урока',
            'Записи занятий и PDF-конспекты доступны прямо в Кабинете Клиента',
            'Учет посещаемости с мгновенными уведомлениями в Telegram/WhatsApp',
          ],
          kpiMetric: '92% удержание учеников',
          kpiLabel: 'Благодаря прозрачному трекингу прогресса и удобной оплате',
          exampleLocations: 'Единая LMS + CRM платформа для школ и академий',
        },
      ],
    },
    solutionsSection: {
      kicker: 'ВСЕ В ОДНОЙ КАСТОМНОЙ СИСТЕМЕ · ЕДИНОЕ ЯДРО',
      title: 'ВСЕ ОПЕРАЦИИ ВАШЕГО БИЗНЕСА В ОДНОЙ ПЛАТФОРМЕ',
      subtitle:
        'Вместо десятка разных подписок мы создаем для вас индивидуальную систему, где Сайт, CRM, Онлайн-запись, Склад, Финансы, Кабинет Клиента и Мессенджер-автоматизация работают как единый организм.',
      allIncludedBadge: 'ИНДИВИДУАЛЬНАЯ АРХИТЕКТУРА ПОД ВАШИ ПРОЦЕССЫ',
      categories: {
        all: 'ВСЕ МОДУЛИ',
        booking: 'САЙТ И ОНЛАЙН-ЗАПИСЬ',
        crm: 'CRM И БАЗА КЛИЕНТОВ',
        portal: 'КАБИНЕТ КЛИЕНТА',
        automation: 'TELEGRAM И WHATSAPP',
        finance: 'ФИНАНСЫ И СКЛАД',
        analytics: 'АНАЛИТИКА И ИНТЕГРАЦИИ',
      },
      items: [
        {
          id: 'sol-booking',
          number: '01',
          category: 'booking',
          title: 'Виджет онлайн-записи 24/7 и Умный Календарь',
          subtitle: 'Конвертируйте трафик из Instagram, Google Maps, Telegram и сайта в подтвержденные визиты',
          description:
            'Брендированный виджет записи на русском, английском, украинском и иврите. Поддерживает комбо-услуги, распределение кабинетов и оборудования и обязательную предоплату.',
          highlights: [
            'Интерактивный календарь расписания для 1–100+ специалистов',
            'Прямые ссылки для шапки Instagram, Google Карт и чат-ботов',
            'Защита от неявок через частичную или полную онлайн-предоплату',
          ],
          localIntegrations: ['Google Maps Запись', 'Instagram Bio Link', 'Google Calendar 2-Way Sync'],
          metric: '+47% онлайн-записей',
        },
        {
          id: 'sol-website',
          number: '02',
          category: 'booking',
          title: 'Высококонверсионный многоязычный сайт бизнеса',
          subtitle: 'Сверхбыстрые SEO-оптимизированные сайты (RU / EN / UA / HE) с поддержкой RTL',
          description:
            'В отличие от обычных SaaS-виджетов, мы создаем полноценный премиальный сайт вашей компании, напрямую соединенный с вашей CRM и календарем.',
          highlights: [
            'Идеальная адаптация под ПК и мобильное приложение для клиента',
            'Локальное и международное SEO-продвижение',
            'Мгновенная передача заявок в CRM-воронку и мессенджер администратора',
          ],
          localIntegrations: ['Google Analytics 4', 'Meta Pixel', 'Google Search Console'],
          metric: '99/100 скорость сайта',
        },
        {
          id: 'sol-crm',
          number: '03',
          category: 'crm',
          title: 'CRM-система, база клиентов и воронка продаж',
          subtitle: 'Полное досье клиента, история визитов, теги, файлы и Kanban-доска сделок',
          description:
            'Каждый звонок, запись, сообщение в чате и оплата сохраняются в единой карточке клиента. Автоматическое разделение клиентов на сегменты VIP, Новые, Спящие.',
          highlights: [
            'Полная история визитов и покупок с прикреплением фото "до/после" и PDF',
            'Визуальная Kanban-воронка для длинных сделок и B2B заказов',
            'RFM-сегментация для возврата клиентов в 1 клик',
          ],
          localIntegrations: ['IP-телефония', 'Импорт из Excel в 1 клик', 'Webhook API'],
          metric: '100% контроль заявок',
        },
        {
          id: 'sol-portal',
          number: '04',
          category: 'portal',
          title: 'Брендированный Кабинет Клиента (Client Area Portal)',
          subtitle: 'Личный кабинет, где клиент видит прогресс, добавляет заметки, чатится и скачивает документы',
          description:
            'Предоставьте клиентам VIP-сервис. Клиент входит по логину и паролю, видит свои активные продукты, шкалу готовности в %, этапы проекта, документы и живой чат с Админом.',
          highlights: [
            'Дашборд прогресса продуктов с анимированными индикаторами выполнения',
            'Заметки клиента к продуктам с мгновенным уведомлением в Админ-панели',
            'Встроенный онлайн-чат в реальном времени между Клиентом и Администратором',
          ],
          localIntegrations: ['Firebase Real-Time БД', 'WebSocket Живой Чат', 'Хранилище документов'],
          metric: '-65% звонков о статусе',
        },
        {
          id: 'sol-automation',
          number: '05',
          category: 'automation',
          title: 'Центр автоматизации Telegram, WhatsApp и SMS',
          subtitle: 'Авто-напоминания о визите, сбор отзывов, поздравления и возврат клиентов',
          description:
            'Сокращайте количество неявок на 78% благодаря умным сценариям в мессенджерах. Отправляйте WhatsApp Business, Telegram-бот, Viber или SMS автоматически.',
          highlights: [
            'Напоминания за 24 ч и 2 ч с кнопками Подтвердить / Перенести',
            'Автоматический запрос отзыва в Google Maps после завершения услуги',
            'Триггерные сообщения клиентам, которые не были 45/60/90 дней',
          ],
          localIntegrations: ['WhatsApp Business API', 'Telegram Bot API', 'SMS / Viber Шлюзы'],
          metric: '-78% опозданий и неявок',
        },
        {
          id: 'sol-finance',
          number: '06',
          category: 'finance',
          title: 'Финансы, счета, зарплата персонала и Склад',
          subtitle: 'Авто-расчет комиссий мастеров, P&L отчеты и списание расходных материалов',
          description:
            'Полный мультивалютный финансовый учет. Гибкие правила начисления зарплат (% от услуг, % от товаров, бонусные KPI) и автоматический складской учет.',
          highlights: [
            'Автоматические ведомости зарплаты и премий для каждого специалиста',
            'Отчет P&L (прибыли и убытки), кассы наличные/безнал и статьи расходов',
            'Технологические карты и авто-списание материалов со склада при визите',
          ],
          localIntegrations: ['Банковский эквайринг', 'Онлайн-кассы', 'Мультивалютный биллинг'],
          metric: '8 ч/нед экономии времени',
        },
        {
          id: 'sol-analytics',
          number: '07',
          category: 'analytics',
          title: 'Аналитика руководителя, Лояльность и Сетевой HQ',
          subtitle: 'Когорты удержания, загруженность специалистов, сертификаты, абонементы и сети',
          description:
            'Принимайте решения на основе точных цифр. Отслеживайте возврат клиентов, выручку в час, ROI рекламы и управляйте кэшбэком и подарочными сертификатами.',
          highlights: [
            'Электронные карты лояльности, многоуровневый кэшбэк и абонементы',
            'Отчеты по загруженности персонала, среднему чеку и LTV клиентов',
            'Единый центр управления сетью филиалов',
          ],
          localIntegrations: ['Логистические API', 'ERP Синхронизация', 'Stripe & PayPal', 'Экспорт Excel / CSV'],
          metric: '+34% LTV клиента',
        },
      ],
      integrationsTitle: '60+ ИНТЕГРАЦИЙ В ЕДИНОМ КОНТУРЕ',
      integrationsSubtitle:
        'Прямое подключение к платежным системам, онлайн-кассам, мессенджерам, телефонии и службам доставки.',
    },
    pricingPage: {
      kicker: 'ИНДИВИДУАЛЬНАЯ АРХИТЕКТУРА · ВСЕ ОПЕРАЦИИ В ОДНОЙ СИСТЕМЕ',
      titleLine1: 'ЕДИНАЯ СИСТЕМА ПОД ВАШ БИЗНЕС.',
      titleLine2: 'ГИБКАЯ АРХИТЕКТУРА ВМЕСТО КОРОБОЧНЫХ ОГРАНИЧЕНИЙ.',
      subtitle:
        'Мы не продаем жесткие шаблонные продукты с абонплатой за каждый шаг. Мы проектируем единую кастомную систему под масштаб и процессы вашей компании — объединяя все отделы в одну платформу.',
      noTiersBadge: 'КАСТОМНАЯ РАЗРАБОТКА ЕДИНОЙ СИСТЕМЫ · 0% КОМИССИИ',
      step1Title: '1. Выберите масштаб вашей операционной системы',
      step1Subtitle: 'Без ограничений на количество сотрудников и администраторов',
      step2Title: '2. Выберите формат внедрения и владения системой',
      step2Subtitle: 'Полный выкуп системы под ключ или поэтапное модульное развертывание',
      locationsLabel: 'Количество филиалов / подразделений:',
      locationsUnit: 'Филиал(ов)',
      teamTiers: [
        {
          id: 'tier-2',
          label: 'До 2',
          sublabel: 'Частная практика / Студия',
          staffCountText: '1–2 специалиста',
          baseMonthlyUsd: 29,
          turnkeyOneTimeUsd: 490,
        },
        {
          id: 'tier-5',
          label: '3 – 5',
          sublabel: 'Растущий бизнес',
          staffCountText: '3–5 специалистов',
          baseMonthlyUsd: 49,
          turnkeyOneTimeUsd: 790,
          popular: true,
        },
        {
          id: 'tier-10',
          label: '6 – 10',
          sublabel: 'Клиника / Салон / Сервис',
          staffCountText: '6–10 специалистов',
          baseMonthlyUsd: 79,
          turnkeyOneTimeUsd: 1190,
        },
        {
          id: 'tier-20',
          label: '11 – 20',
          sublabel: 'Многопрофильный центр',
          staffCountText: '11–20 специалистов',
          baseMonthlyUsd: 119,
          turnkeyOneTimeUsd: 1690,
        },
        {
          id: 'tier-50',
          label: '21 – 50',
          sublabel: 'Корпоративный департамент',
          staffCountText: '21–50 специалистов',
          baseMonthlyUsd: 169,
          turnkeyOneTimeUsd: 2390,
        },
        {
          id: 'tier-unlimited',
          label: 'Безлимит',
          sublabel: 'Сеть филиалов и Enterprise',
          staffCountText: '50+ без ограничений',
          baseMonthlyUsd: 229,
          turnkeyOneTimeUsd: 3200,
        },
      ],
      billingOptions: [
        {
          id: '1m',
          monthsPaid: 1,
          bonusFreeMonths: 0,
          discountPercent: 0,
          label: '1 Месяц',
          sublabel: 'Гибкий старт помесячно',
        },
        {
          id: '3m',
          monthsPaid: 3,
          bonusFreeMonths: 1,
          discountPercent: 25,
          label: '3 Месяца',
          sublabel: 'Оплата 3 мес → 4 мес доступа',
          badgeText: '+1 МЕСЯЦ БОНУС',
        },
        {
          id: '6m',
          monthsPaid: 6,
          bonusFreeMonths: 3,
          discountPercent: 33,
          label: '6 Месяцев',
          sublabel: 'Оплата 6 мес → 9 мес доступа',
          badgeText: '+3 МЕСЯЦА БОНУС',
        },
        {
          id: '12m',
          monthsPaid: 12,
          bonusFreeMonths: 9,
          discountPercent: 43,
          label: '12 Месяцев',
          sublabel: 'Оплата 12 мес → 21 мес доступа',
          badgeText: '+9 МЕСЯЦЕВ БОНУС · ХИТ',
          isBestValue: true,
        },
        {
          id: 'turnkey',
          monthsPaid: 1,
          bonusFreeMonths: 0,
          discountPercent: 70,
          label: 'Выкуп под ключ',
          sublabel: 'Разовая оплата · Код навсегда',
          badgeText: '100% ВЛАДЕНИЕ',
        },
      ],
      summaryCard: {
        headerTag: 'СПЕЦИФИКАЦИЯ ВАШЕЙ СИСТЕМЫ',
        effectiveMonthlyLabel: 'Оценка инвестиций',
        perMonthSuffix: '/ мес.',
        turnkeyOneTimeLabel: 'Индивидуальная разработка под ключ',
        totalAccessLabel: 'Формат сопровождения',
        monthsPaidWord: 'мес. оплачено',
        bonusMonthsWord: 'мес. БОНУС',
        totalMonthsWord: 'мес. полного доступа',
        youSaveLabel: 'Экономия на подписках и IT',
        zeroCommissionBadge: '0% комиссии за онлайн-записи и оплаты',
        unlimitedBookingsBadge: 'Безлимитная база клиентов и сотрудников',
        freeMigrationBadge: 'Бесплатный перенос текущей базы за 48 ч',
        ctaStartTrial: 'ЗАПРОСИТЬ АРХИТЕКТУРУ СИСТЕМЫ',
        ctaBookDemo: 'ОБСУДИТЬ ПРОЕКТ С АРХИТЕКТОРОМ',
        trialFootnote: 'Индивидуальное проектирование под ваши бизнес-процессы · Полная прозрачность в Client Area',
      },
      twentyModulesTitle: 'ВСЕ 20 КОНТУРОВ БИЗНЕСА В ОДНОЙ СИСТЕМЕ',
      twentyModulesSubtitle:
        'Ваша кастомная платформа объединяет все операционные модули без необходимости покупать отдельные сервисы:',
      twentyModulesList: [
        { id: 'm1', title: '01. Виджет онлайн-записи 24/7', category: 'Запись', desc: 'Установка на сайт, Instagram, Telegram, WhatsApp и Google Maps.' },
        { id: 'm2', title: '02. Умный календарь расписания', category: 'Запись', desc: 'Удобная сетка расписания для специалистов, кабинетов и оборудования.' },
        { id: 'm3', title: '03. Многоязычный вебсайт бизнеса', category: 'Запись', desc: 'Современный быстрый сайт на русском, английском, украинском и иврите.' },
        { id: 'm4', title: '04. Визуальная CRM и карточки клиентов', category: 'CRM', desc: 'Полная история визитов, предпочтения, фото "до/после" и теги.' },
        { id: 'm5', title: '05. Личный Кабинет Клиента', category: 'Портал', desc: 'Вход по логину/паролю, шкала прогресса продуктов, заметки и чат.' },
        { id: 'm6', title: '06. Хранилище документов и таймлайны', category: 'Портал', desc: 'Договоры, счета, акты и дорожная карта этапов проекта.' },
        { id: 'm7', title: '07. Автоматизация WhatsApp Business', category: 'Автоматизация', desc: 'Авто-подтверждение записи, напоминания и сбор отзывов.' },
        { id: 'm8', title: '08. Telegram-бот для клиентов и Админа', category: 'Автоматизация', desc: 'Запись, перенос визитов и мгновенные уведомления в Telegram.' },
        { id: 'm9', title: '09. Защита от неявок и предоплата', category: 'Финансы', desc: 'Прием депозитов через Apple Pay, Google Pay, карты и локальные шлюзы.' },
        { id: 'm10', title: '10. Расчет зарплат и комиссий', category: 'Финансы', desc: 'Гибкие % от услуг и товаров, ставки, бонусы и ведомости.' },
        { id: 'm11', title: '11. Финансовый учет и P&L отчеты', category: 'Финансы', desc: 'Контроль касс, доходов, расходов и чистой прибыли бизнеса.' },
        { id: 'm12', title: '12. Складской учет и расходники', category: 'Финансы', desc: 'Автоматическое списание материалов по техкартам и остатки.' },
        { id: 'm13', title: '13. Программа лояльности и кэшбэк', category: 'CRM', desc: 'Бонусные баллы, уровни карт клиентов и автоматические скидки.' },
        { id: 'm14', title: '14. Абонементы и пакеты услуг', category: 'CRM', desc: 'Продажа курсов процедур и месячных абонементов с учетом визитов.' },
        { id: 'm15', title: '15. Подарочные сертификаты', category: 'Запись', desc: 'Электронные и физические сертификаты с контролем остатка номинала.' },
        { id: 'm16', title: '16. Авто-возврат спящих клиентов', category: 'Автоматизация', desc: 'Триггерные сообщения клиентам через 45/60/90 дней без визитов.' },
        { id: 'm17', title: '17. Генератор 5-звездочных отзывов', category: 'Автоматизация', desc: 'Рост рейтинга в Google Maps и перехват негатива.' },
        { id: 'm18', title: '18. Управление сетью филиалов', category: 'Аналитика', desc: 'Единая база клиентов и сводная аналитика по всем точкам.' },
        { id: 'm19', title: '19. Когортная аналитика и ROI', category: 'Аналитика', desc: 'Анализ возврата клиентов, загрузки мастеров и рекламы.' },
        { id: 'm20', title: '20. Полная Админ-панель и Живой Чат', category: 'Портал', desc: 'Управление клиентами, продуктами, заметками и чатом посетителей.' },
      ],
      comparisonTitle: 'СРАВНЕНИЕ ПОДХОДОВ К АВТОМАТИЗАЦИИ БИЗНЕСА',
      comparisonSubtitle:
        'Посмотрите, почему индивидуальная единая система BryTech выгоднее набора коробочных подписок или долгой студийной разработки.',
      colFeature: 'ВОЗМОЖНОСТЬ / КОНТУР',
      colBrytech: 'ЕДИНАЯ СИСТЕМА BRYTECH',
      colGenericSaas: 'ШАБЛОННЫЕ КОРОБОЧНЫЕ SAAS',
      colAgency: 'КЛАССИЧЕСКАЯ ВЕБ-СТУДИЯ',
      comparisonCategories: [
        {
          id: 'cat-booking',
          title: 'Веб-платформа, Онлайн-запись и Расписание',
          rows: [
            { feature: 'Кастомный многоязычный сайт (RU / EN / UA / HE)', brytech: 'Входит в единую систему', altegioSaaS: 'Только виджет (без сайта)', agency: '$3,500 – $8,000 отдельно' },
            { feature: 'Онлайн-запись 24/7 и расписание ресурсов', brytech: true, altegioSaaS: true, agency: 'От $4,000 за разработку' },
            { feature: 'Комиссия платформы за записи и оплаты', brytech: '0% комиссии', altegioSaaS: '0% – 2.5% комиссии', agency: '0% комиссии' },
            { feature: 'Адаптация под уникальные бизнес-правила компании', brytech: true, altegioSaaS: false, agency: true },
          ],
        },
        {
          id: 'cat-portal',
          title: 'CRM, Кабинет Клиента и Живой Чат',
          rows: [
            { feature: 'Личный Кабинет Клиента с трекером прогресса заказов', brytech: true, altegioSaaS: false, agency: 'От $5,000 отдельно' },
            { feature: 'Заметки клиента к продуктам с уведомлением Админа', brytech: true, altegioSaaS: false, agency: 'Редко реализуется' },
            { feature: 'Встроенный ИИ-ассистент + прямой чат с основателем', brytech: true, altegioSaaS: 'Платный модуль', agency: 'Сторонний платный сервис' },
            { feature: 'CRM-воронка, складской ERP и финансовый учет', brytech: true, altegioSaaS: 'Частично', agency: 'Долгая разработка' },
          ],
        },
        {
          id: 'cat-local',
          title: 'Интеграции и Владение Системой',
          rows: [
            { feature: 'Прямая интеграция платежей, касс и логистики', brytech: true, altegioSaaS: 'Частично', agency: 'Почасовая оплата' },
            { feature: 'Telegram-бот + WhatsApp Business авто-напоминания', brytech: true, altegioSaaS: 'Требуется платный агрегатор', agency: 'От $1,500 за бота' },
            { feature: 'Отсутствие абонплаты за каждого нового сотрудника', brytech: true, altegioSaaS: false, agency: true },
            { feature: 'Возможность 100% выкупа системы в собственность', brytech: true, altegioSaaS: false, agency: true },
          ],
        },
      ],
      migrationBanner: {
        tag: 'БЕСШОВНЫЙ ПЕРЕХОД НА ЕДИНУЮ СИСТЕМУ',
        title: 'ИСПОЛЬЗУЕТЕ РАЗНЫЕ ПРОГРАММЫ ИЛИ EXCEL? ОБЪЕДИНИМ И ПЕРЕНЕСЕМ ВСЕ ДАННЫЕ БЕСПЛАТНО.',
        desc: 'Наши инженеры бережно перенесут вашу базу клиентов, историю заказов, прайс-лист и расписание в новую единую систему без остановки работы бизнеса.',
        bullet1: '100% бесплатный импорт из Excel, CRM, систем записи и учетных таблиц',
        bullet2: 'Обучение вашей команды на русском, английском, украинском или иврите',
        bullet3: 'Прозрачный контроль каждого этапа внедрения через Кабинет Клиента',
        cta: 'ЗАКАЗАТЬ АУДИТ И БЕСПЛАТНУЮ МИГРАЦИЮ',
      },
      faqTitle: 'ЧАСТЫЕ ВОПРОСЫ ОБ ИНДИВИДУАЛЬНОЙ СИСТЕМЕ',
      faqSubtitle: 'Ответы о том, как мы проектируем, оцениваем и внедряем единую систему под ваш бизнес.',
      faqs: [
        {
          q: 'Почему стоимость рассчитывается под архитектуру, а не как фиксированный коробочный тариф?',
          a: 'Каждая компания работает по своим правилам: кому-то нужна связка CRM + онлайн-запись + боты, а кому-то — полноценная производственная ERP с Кабинетом Клиента и многофилиальной аналитикой. Вы платите только за те контуры и интеграции, которые действительно нужны вашему бизнесу.',
        },
        {
          q: 'Чем единая система BryTech отличается от обычных облачных сервисов?',
          a: 'Обычные сервисы решают только одну узкую задачу (только запись или только сделки), заставляя вас покупать 5–7 разных подписок. Мы создаем для вас единую платформу, где сайт, CRM, расписание, склад, финансы и Кабинет Клиента работают вместе.',
        },
        {
          q: 'Нужно ли доплачивать за каждого нового сотрудника?',
          a: 'Нет. В вашей индивидуальной системе нет налога на рост команды — вы можете подключать неограниченное количество менеджеров, специалистов и администраторов.',
        },
        {
          q: 'Можно ли со временем добавлять новые модули и функции?',
          a: 'Да! Модульная архитектура позволяет начать с ключевого ядра за 10–21 день и постепенно подключать новые подразделения, филиалы или нестандартные интеграции по мере роста компании.',
        },
      ],
    },
  },
  he: {
    navExtended: {
      overview: 'ראשי',
      businessTypes: 'סוגי עסקים',
      industries: 'תעשיות וענפים',
      solutions: 'פתרונות',
      pricing: 'תמחור מותאם',
      builder: 'אדריכל מערכת',
      cases: 'סיפורי לקוחות',
      freeTrialBadge: 'מערכת מותאמת',
      backToHome: 'חזרה לראשי',
    },
    businessTypesSection: {
      kicker: 'מותאם אישית להיקף הפעילות שלך',
      title: 'מערכת מאוחדת אחת לכל שלב בצמיחת העסק',
      subtitle:
        'בין אם אתם סטודיו מתמחה, חברה מרובת מחלקות או רשת סניפים — אנו בונים עבורכם מערכת הפעלה אחת התפורה בדיוק למבנה הצוות ולתהליכי העבודה שלכם.',
      exploreBtn: 'התאימו מערכת זו לעסק שלכם',
      items: [
        {
          id: 'solo',
          badge: 'עד 2 אנשי צוות',
          title: 'עצמאים, מטפלים ומומחים פרטיים',
          subtitle: 'רופאים, קוסמטיקאיות, עורכי דין, מאמנים, דיטיילינג וסטודיו בוטיק',
          staffRange: '1–2 אנשי צוות',
          description:
            'תפסיקו לפספס שיחות ולתאם תורים ידנית בוואטסאפ בזמן טיפול. קבלו אתר תדמית, יומן זימון תורים 24/7, תזכורות אוטומטיות בוואטסאפ/טלגרם וגביית מקדמה למניעת הברזות.',
          painPointsSolved: [
            'זימון תורים עצמאי 24/7 מאינסטגרם, וואטסאפ, טלגרם ו-Google Maps',
            'גביית מקדמות אוטומטית (Bit / Meshulam / Tranzila / Monobank) למניעת אי-הגעה',
            'כרטיס לקוח דיגיטלי עם היסטוריית ביקורים, תמונות והערות',
          ],
          includedModules: ['ווידג׳ט זימון תורים', 'דף נחיתה יוקרתי', 'תזכורות וואטסאפ וטלגרם', 'כרטיס לקוח CRM'],
          metricHighlight: '-78% אי-הגעות',
          metricSub: 'כבר ב-30 הימים הראשונים של תזכורות אוטומטיות',
          recommendedTeamTierId: 'tier-2',
        },
        {
          id: 'smb',
          badge: '3 עד 10 אנשי צוות',
          title: 'עסקים מקומיים קטנים ובינוניים',
          subtitle: 'מרפאות, מכוני יופי, מרכזי דיטיילינג ומוסכים, סטודיו לפילאטיס וכושר',
          staffRange: '3–10 אנשי צוות',
          description:
            'החליפו את טבלאות האקסל והאפליקציות המפוזרות במערכת הפעלה אחת: אתר רב-לשוני ממיר, יומן צוות וחדרים, מערכת CRM למכירות, חישוב שכר ועמלות אוטומטי ואזור אישי ללקוחות.',
          painPointsSolved: [
            'יומן חכם לניהול צוות, חדרי טיפול וציוד ללא כפילויות',
            'חישוב אוטומטי של שכר, אחוזי עמלות ובונוסים לכל עובד',
            'אזור לקוחות אישי (Client Area) לצפייה בהתקדמות, מסמכים וצ׳אט ישיר',
          ],
          includedModules: ['אתר תדמית מלא', 'CRM ויומן צוות', 'פורטל אזור לקוחות', 'שכר ומלאי', 'בוט וואטסאפ וטלגרם'],
          metricHighlight: '+42% לקוחות חוזרים',
          metricSub: 'בזכות מועדון לקוחות והודעות החזרת לקוחות אוטומטיות',
          recommendedTeamTierId: 'tier-5',
        },
        {
          id: 'chains',
          badge: 'רשתות וזכיינויות',
          title: 'רשתות מרובות סניפים וזכיינים',
          subtitle: 'רשתות מרפאות, סלונים, אולמות תצוגה ומרכזי שירות בפריסה ארצית',
          staffRange: '11–50+ אנשי צוות · מספר סניפים',
          description:
            'שליטה מרכזית בכל הסניפים בתל אביב, חיפה, ירושלים, קייב או לבוב. מאגר לקוחות מאוחד, מנויים וכרטיסי מתנה משותפים לכל הרשת, הרשאות גישה ודוחות רווח והפסד בזמן אמת.',
          painPointsSolved: [
            'כרטיס לקוח, צבירת נקודות ומנויים התקפים בכל סניפי הרשת',
            'דשבורד הנהלה המשווה הכנסות, שימור לקוחות ותפוסת צוות בין סניפים',
            'בקרת הרשאות קפדנית כך שכל סניף רואה רק את הנתונים המורשים לו',
          ],
          includedModules: ['ניהול רשת סניפים HQ', 'CRM ו-ERP מאוחד', 'אנליטיקה חוצת סניפים', 'סנכרון API', 'מהנדס מערכת אישי'],
          metricHighlight: 'צמיחה מהירה פי 3.4',
          metricSub: 'הקמת תשתית דיגיטלית לסניף חדש תוך 48 שעות',
          recommendedTeamTierId: 'tier-20',
        },
        {
          id: 'custom-enterprise',
          badge: 'מערכות בהתאמה אישית מלאה',
          title: 'חברות שירותי B2B ומערכות Turnkey',
          subtitle: 'נדל״ן, משרדי עורכי דין, קבלנים, לוגיסטיקה ומרפאות מומחים',
          staffRange: 'ארכיטקטורה מותאמת · בעלות מלאה על הקוד',
          description:
            'צריכים מעבר לזימון תורים רגיל? צוות ההנדסה של BryTech בונה פורטל לקוחות מותאם אישית, כספת מסמכים, מעקב אבני דרך ואינטגרציות ב-70% פחות מעלות בית תוכנה רגיל.',
          painPointsSolved: [
            'אזור לקוחות עם ציר זמן לפרויקט, הערות על מוצרים וצ׳אט חי עם המנהל',
            'סנכרון מלא עם חשבונית ירוקה (Morning), משולם, ביט, טרנזילה ו-Monobank',
            'אפשרות לרכישה חד-פעמית (Turnkey) עם בעלות מלאה ללא דמי מנוי חודשיים',
          ],
          includedModules: ['פורטל לקוחות מותאם', 'כספת מסמכים ואבני דרך', 'CRM מותאם אישית', 'צ׳אט חי לאדמין', 'אינטגרציות Webhook'],
          metricHighlight: 'עד 70% חיסכון',
          metricSub: 'בהשוואה לבתי תוכנה וסוכנויות פיתוח מסורתיות',
          recommendedTeamTierId: 'tier-unlimited',
        },
      ],
    },
    industriesSection: {
      kicker: '8 ענפים מובילים · תבניות מוכנות להפעלה',
      title: 'פתרונות מותאמים במיוחד לענף העסקי שלך',
      subtitle:
        'בחרו את תחום הפעילות שלכם כדי לראות כיצד BryTech מגדירה עבורכם זימון תורים אונליין, כרטיס לקוח CRM, אזור אישי ואוטומציות וואטסאפ/טלגרם.',
      liveWidgetTag: 'תצוגה אינטראקטיבית חיה לענף',
      bookNowDemo: 'בדוק התאמה לעסק שלי',
      automationsLabel: 'תרחישי אוטומציה כלולים',
      items: [
        {
          id: 'medical',
          title: 'מרפאות, רפואת שיניים וקליניקות אסתטיקה',
          shortTitle: 'מרפאות ואסתטיקה',
          category: 'בריאות ורפואה',
          description:
            'תיק מטופל ממוחשב, תוכניות טיפול, ניהול יומן רופאים וחדרי טיפול/מכשור, הנחיות לפני טיפול בוואטסאפ/טלגרם והעלאת מסמכים לאזור האישי של המטופל.',
          bookingPreviewTitle: 'מרכז רפואי ואסתטיקה — זימון תור אונליין',
          bookingServices: [
            { name: 'ייעוץ דנטלי מקיף + צילום CT תלת-ממד', duration: '45 דק׳', priceUsd: 65, staff: 'ד״ר אולנה קובלנקו' },
            { name: 'טיפול הצערת עור בלייזר (פרוטוקול מלא)', duration: '60 דק׳', priceUsd: 180, staff: 'ד״ר יעל לוי' },
            { name: 'פגישת מעקב ובניית תוכנית טיפול', duration: '30 דק׳', priceUsd: 45, staff: 'רופא מומחה' },
          ],
          automations: [
            'תזכורת וואטסאפ/טלגרם 24 שעות ושעתיים לפני התור עם אישור בלחיצה',
            'שליחת הנחיות החלמה ומסמכים ישירות לאזור האישי של המטופל',
            'תזכורת אוטומטית לבדיקה תקופתית כל 6 חודשים',
          ],
          kpiMetric: '+38% תפוסת חדרים',
          kpiLabel: 'בקרב 28 קליניקות שותפות בישראל ובאוקראינה',
          exampleLocations: 'תל אביב · הרצליה · קייב · לבוב',
        },
        {
          id: 'beauty',
          title: 'מכוני יופי, מספרות, ברברשופ וספא',
          shortTitle: 'יופי ומספרות',
          category: 'ביוטי וטיפוח',
          description:
            'זימון תורים 24/7 מאינסטגרם ו-Google Maps, תורים משולבים (מניקור-פדיקור ב-4 ידיים), ניכוי חומרים מהמלאי לפי גרמים, ואיסוף ביקורות אוטומטי.',
          bookingPreviewTitle: 'סטודיו ביוטי וברבר — הזמנת תור 24/7',
          bookingServices: [
            { name: 'צביעת שיער מורכבת + שיקום אולפלקס', duration: '150 דק׳', priceUsd: 140, staff: 'מעצבת שיער אנה' },
            { name: 'תספורת גברים ועיצוב זקן מלכותי', duration: '60 דק׳', priceUsd: 55, staff: 'מאסטר ברבר דוד' },
            { name: 'מניקור ופדיקור אקספרס ב-4 ידיים', duration: '90 דק׳', priceUsd: 85, staff: '2 מומחיות במקביל' },
          ],
          automations: [
            'תיאום תור אוטומטי מאינסטגרם ובוט טלגרם ללא מעורבות פקידת קבלה',
            'הורדה אוטומטית של צבע וחומרים מהמלאי בסיום הטיפול',
            'בקשת דירוג 5 כוכבים בגוגל שעה לאחר היציאה מהמכון',
          ],
          kpiMetric: '64% הזמנות מחוץ לשעות הפעילות',
          kpiLabel: 'לקוחות מזמינים 24/7 דרך רשתות חברתיות',
          exampleLocations: 'תל אביב · ראשון לציון · קייב · אודסה',
        },
        {
          id: 'fitness',
          title: 'מועדוני כושר, פילאטיס מכשירים וסטודיו יוגה',
          shortTitle: 'כושר ופילאטיס',
          category: 'ספורט ווולנס',
          description:
            'הגבלת משתתפים בשיעורי קבוצות, קידום אוטומטי מרשימת המתנה, ניהול מנויים וכרטיסיות, כניסה ב-QR באזור האישי וחישוב שכר מאמנים.',
          bookingPreviewTitle: 'סטודיו פילאטיס מכשירים וכושר — מערכת שעות',
          bookingServices: [
            { name: 'אימון פילאטיס מכשירים קבוצתי (עד 8 מתאמנים)', duration: '55 דק׳', priceUsd: 32, staff: 'מאמנת אירינה (3 מקומות פנויים)' },
            { name: 'אימון אישי 1-על-1 EMS ופונקציונלי', duration: '45 דק׳', priceUsd: 60, staff: 'מאמן בכיר אמיר' },
            { name: 'מנוי חודשי ללא הגבלה לכל השיעורים', duration: '30 יום', priceUsd: 220, staff: 'גישה מלאה לסטודיו' },
          ],
          automations: [
            'הודעה אוטומטית לממתינים ברשימת ההמתנה ברגע שמתפנה מקום',
            'תזכורת לחידוש מנוי או כרטיסייה 3 ימים לפני הסיום',
            'הודעת עידוד אוטומטית באימון ה-10, 25 ו-50',
          ],
          kpiMetric: '+51% חידוש מנויים',
          kpiLabel: 'בזכות מעקב כרטיסיות שקוף וחידוש בקליק',
          exampleLocations: 'תל אביב · נתניה · קייב · דניפרו',
        },
        {
          id: 'auto',
          title: 'מרכזי דיטיילינג, מוסכים ושירותי רכב',
          shortTitle: 'רכב ודיטיילינג',
          category: 'רכב ושירות',
          description:
            'ניהול עמדות עבודה וליפטים, היסטוריית טיפולים לפי מספר רכב וקילומטראז׳, תמונות התקדמות חיות באזור הלקוח ותזכורות לטיפול תקופתי.',
          bookingPreviewTitle: 'מרכז דיטיילינג ושירותי רכב — שריון עמדה',
          bookingServices: [
            { name: 'ציפוי ננו-קרמי 9H + פוליש תלת-שלבי', duration: 'יומיים', priceUsd: 650, staff: 'עמדה 01 · מומחה דיטיילינג' },
            { name: 'טיפול תקופתי ודיאגנוסטיקה ממוחשבת', duration: '90 דק׳', priceUsd: 95, staff: 'עמדה 03 · מכונאי ראשי' },
            { name: 'ניקוי פנימי עמוק וחיטוי באוזון', duration: '240 דק׳', priceUsd: 160, staff: 'עמדה 02 · צוות דיטיילינג' },
          ],
          automations: [
            'עדכון חי בוואטסאפ/טלגרם בכל שלב עבודה + הודעת "הרכב מוכן לאיסוף"',
            'תזכורות להחלפת צמיגים וטיפול שנתי לפי קילומטראז׳',
            'דו״ח בדיקה דיגיטלי עם תמונות שמור באזור האישי של הלקוח',
          ],
          kpiMetric: '+44% סל עסקה ממוצע',
          kpiLabel: 'באמצעות אישור תוספות מצולם באזור האישי',
          exampleLocations: 'חיפה · אשדוד · קייב · חרקוב',
        },
        {
          id: 'legal',
          title: 'נדל״ן, משרדי עורכי דין וייעוץ עסקי',
          shortTitle: 'משפטים ונדל״ן',
          category: 'שירותים מקצועיים',
          description:
            'אתר תדמית יוקרתי, תיאום פגישות ייעוץ בתשלום, אזור לקוחות מאובטח עם כספת מסמכים, מעקב שלבי עסקה וצ׳אט ישיר מול הצוות.',
          bookingPreviewTitle: 'משרד עורכי דין וייעוץ — פורטל לקוחות ותיאום פגישה',
          bookingServices: [
            { name: 'בדיקת נאותות וליווי עסקת מקרקעין', duration: '60 דק׳', priceUsd: 150, staff: 'שותף מנהל' },
            { name: 'פגישת אסטרטגיה, מיסוי ומבנה חברות', duration: '60 דק׳', priceUsd: 200, staff: 'יועץ משפטי בכיר' },
            { name: 'ליווי מלא לרכישת נכס להשקעה', duration: 'אבני דרך', priceUsd: 1200, staff: 'צוות תיק ייעודי' },
          ],
          automations: [
            'התראה מיידית לאדמין כאשר לקוח מוסיף הערה למוצר או מעלה מסמך',
            'עדכון אוטומטי ללקוח עם השלמת כל שלב בתיק או בעסקה',
            'תיאום פגישות מסונכרן עם יומן גוגל וזום',
          ],
          kpiMetric: 'קיצור זמן עסקה פי 3.2',
          kpiLabel: 'בזכות ריכוז מסמכים והערות לקוח במקום אחד',
          exampleLocations: 'תל אביב · ירושלים · קייב · לבוב',
        },
        {
          id: 'education',
          title: 'מרכזי לימוד, בתי ספר לשפות והכשרות',
          shortTitle: 'חינוך וקורסים',
          category: 'לימודים והדרכה',
          description:
            'ניהול מערכת שעות לקבוצות ושיעורים פרטיים, מעקב יתרת שיעורים בחבילה, חומרי לימוד באזור האישי וגבייה אוטומטית.',
          bookingPreviewTitle: 'אקדמיית NextGen — שיעור ניסיון ופורטל תלמיד',
          bookingServices: [
            { name: 'אבחון רמה אישי + שיעור ניסיון 1-על-1', duration: '45 דק׳', priceUsd: 25, staff: 'מנהל אקדמי' },
            { name: 'קורס אנגלית / עברית בקבוצה קטנה (8 מפגשים)', duration: 'חודשי', priceUsd: 190, staff: 'מרצה דובר שפת אם' },
            { name: 'מסלול הכשרת הייטק ואוטומציה עסקית', duration: '12 שבועות', priceUsd: 480, staff: 'מהנדס בכיר' },
          ],
          automations: [
            'התראה אוטומטית לתלמיד כאשר נותרו 2 שיעורים בחבילה',
            'הקלטות שיעורים וקבצי PDF זמינים ישירות באזור האישי',
            'רישום נוכחות עם עדכון מיידי בטלגרם/וואטסאפ',
          ],
          kpiMetric: '92% התמדת תלמידים',
          kpiLabel: 'בזכות מעקב התקדמות שקוף וחידוש נוח',
          exampleLocations: 'תל אביב · רמת גן · קייב · ויניצה',
        },
      ],
    },
    solutionsSection: {
      kicker: 'מערכת ALL-IN-ONE מלאה · 20 מודולים כלולים',
      title: 'כל הכלים שהעסק המקומי שלך צריך במערכת אחת',
      subtitle:
        'בהשראת הפלטפורמות המובילות בעולם כמו Altegio ובהנדסה מותאמת של BryTech בקייב עבור ישראל ואוקראינה — אתם מקבלים אתר, CRM, זימון תורים, אזור לקוחות ואוטומציית וואטסאפ/טלגרם כמערכת אחת מסונכרנת.',
      allIncludedBadge: 'ללא חסימת פיצ׳רים · כל 20 המודולים זמינים מיד',
      categories: {
        all: 'כל המודולים',
        booking: 'אתר וזימון תורים',
        crm: 'CRM ומאגר לקוחות',
        portal: 'פורטל אזור לקוחות',
        automation: 'וואטסאפ וטלגרם',
        finance: 'פיננסים, שכר ומלאי',
        analytics: 'אנליטיקה ואינטגרציות',
      },
      items: [
        {
          id: 'sol-booking',
          number: '01',
          category: 'booking',
          title: 'ווידג׳ט זימון תורים 24/7 ויומן חכם',
          subtitle: 'הפכו גולשים מאינסטגרם, Google Maps, וואטסאפ והאתר לתורים מאושרים ביומן',
          description:
            'ווידג׳ט הזמנות בעברית (RTL), אנגלית ואוקראינית. תומך בטיפולים משולבים, הקצאת חדרים ומכשור וגביית מקדמה אונליין.',
          highlights: [
            'יומן ויזואלי חכם ל-1 עד 100+ אנשי צוות',
            'קישורים ישירים לביו באינסטגרם, פרופיל גוגל ובוטים',
            'הגנה מפני אי-הגעות באמצעות מקדמה בביט / אשראי',
          ],
          localIntegrations: ['Google Maps Booking', 'Instagram Bio Link', 'סנכרון דו-כיווני Google Calendar'],
          metric: '+47% הזמנות אונליין',
        },
        {
          id: 'sol-website',
          number: '02',
          category: 'booking',
          title: 'אתר עסקי רב-לשוני ממיר ומהיר במיוחד',
          subtitle: 'אתרי תדמית ומכירה מותאמים ל-SEO בעברית, אנגלית ואוקראינית',
          description:
            'בניגוד למערכות SaaS שנותנות רק קישור גנרי, BryTech בונה עבורכם אתר יוקרתי ומלא המחובר ישירות ל-CRM וליומן התורים שלכם.',
          highlights: [
            'חוויית שימוש מושלמת במחשב וכאפליקציה מלאה בנייד',
            'קידום אורגני מקומי לתל אביב, חיפה, ירושלים, קייב ולבוב',
            'קליטת לידים מיידית לתוך ה-CRM והטלגרם של המנהל',
          ],
          localIntegrations: ['Google Analytics 4', 'Meta Pixel', 'Google Search Console'],
          metric: 'ציון מהירות 99/100',
        },
        {
          id: 'sol-crm',
          number: '03',
          category: 'crm',
          title: 'ניהול קשרי לקוחות (CRM) וצינור מכירות',
          subtitle: 'תיק לקוח מלא, היסטוריית ביקורים, תגיות, קבצים ולוח קנבן ללידים',
          description:
            'כל שיחה, תור, הודעת צ׳אט ותשלום נשמרים בכרטיס לקוח אחד. פילוח אוטומטי של לקוחות ל-VIP, חדשים או רדומים.',
          highlights: [
            'היסטוריית טיפולים ורכישות מלאה כולל תמונות לפני/אחרי וקבצי PDF',
            'לוח Kanban ויזואלי לניהול עסקאות ולידים חמים',
            'פילוח RFM חכם להחזרת לקוחות שלא ביקרו זמן רב בלחיצת כפתור',
          ],
          localIntegrations: ['מרכזיות IP', 'ייבוא מאקסל בקליק', 'Webhook API'],
          metric: '100% שליטה בלידים',
        },
        {
          id: 'sol-portal',
          number: '04',
          category: 'portal',
          title: 'פורטל אזור לקוחות אישי (Client Area Portal)',
          subtitle: 'אזור כניסה אישי שבו הלקוח עוקב אחר התקדמות, מוסיף הערות, מתכתב וצופה במסמכים',
          description:
            'העניקו ללקוחות שלכם חוויית VIP דיגיטלית. הלקוח מתחבר עם שם משתמש וסיסמה, רואה את המוצרים שלו, אחוזי התקדמות, ציר זמן, מסמכים וצ׳אט חי מול האדמין.',
          highlights: [
            'דשבורד התקדמות מוצרים ופרויקטים בזמן אמת',
            'אפשרות ללקוח להוסיף הערות למוצרים עם התראה מיידית בפאנל הניהול',
            'צ׳אט תמיכה חי בזמן אמת בין הלקוח לבין מנהל המערכת',
          ],
          localIntegrations: ['Firebase Real-Time DB', 'WebSocket Live Chat', 'כספת מסמכים'],
          metric: '-65% שיחות בירור סטטוס',
        },
        {
          id: 'sol-automation',
          number: '05',
          category: 'automation',
          title: 'מרכז אוטומציות וואטסאפ, טלגרם ו-SMS',
          subtitle: 'תזכורות אוטומטיות לתורים, בקשת ביקורות, הטבות יום הולדת והחזרת לקוחות',
          description:
            'צמצמו הברזות ב-78% באמצעות הודעות חכמות. שלחו הודעות WhatsApp Business, בוט טלגרם או SMS אוטומטית בכל שלב.',
          highlights: [
            'תזכורות 24 שעות ושעתיים לפני התור עם אישור / שינוי מועד בקליק',
            'בקשת דירוג 5 כוכבים ב-Google Maps אוטומטית בסיום הביקור',
            'הודעות החזרה אוטומטיות ללקוחות שלא ביקרו 45/60/90 יום',
          ],
          localIntegrations: ['WhatsApp Business API', 'Telegram Bot API', 'InforU / SMS / Viber'],
          metric: '-78% אי-הגעות',
        },
        {
          id: 'sol-finance',
          number: '06',
          category: 'finance',
          title: 'פיננסים, חשבוניות, חישוב שכר וניהול מלאי',
          subtitle: 'חישוב עמלות עובדים אוטומטי, דוחות רווח והפסד וניהול מלאי חומרים',
          description:
            'שליטה מלאה בכל שקל (₪), הריבניה (₴) ודולר ($). חישוב אוטומטי של שכר עובדים (% משירות, % ממכירת מוצרים, יעדים) וניהול מלאי בזמן אמת.',
          highlights: [
            'דו״ח שכר ועמלות אוטומטי לכל עובד בלחיצת כפתור',
            'מעקב תזרים מזומנים, קופות, הוצאות ורווח נקי',
            'ניכוי אוטומטי של חומרים מתכלים מהמלאי בכל טיפול והתראות חוסר',
          ],
          localIntegrations: ['Bit / Meshulam / Tranzila', 'חשבונית ירוקה (Morning)', 'Monobank / LiqPay'],
          metric: 'חיסכון של 8 שעות בשבוע',
        },
        {
          id: 'sol-analytics',
          number: '07',
          category: 'analytics',
          title: 'אנליטיקה מתקדמת, מועדון לקוחות וניהול רשתות',
          subtitle: 'שימור לקוחות, נצילות עובדים, כרטיסי מתנה, מנויים ושליטה רב-סניפית',
          description:
            'קבלו החלטות מבוססות נתונים. עקבו אחר אחוז לקוחות חוזרים, הכנסה לשעת עבודה, החזר השקעה שיווקי ונהלו קאשבק ומנויים.',
          highlights: [
            'מועדון לקוחות דיגיטלי, צבירת נקודות קאשבק וכרטיסיות מנויים',
            'דוחות נצילות צוות, סל ממוצע ושימור לקוחות לאורך זמן',
            'מערכת ניהול מרכזית לרשתות מרובות סניפים בישראל ובאוקראינה',
          ],
          localIntegrations: ['סנכרון ERP / הנהלת חשבונות', 'Stripe & PayPal', 'ייצוא לאקסל / CSV'],
          metric: '+34% ערך חיי לקוח (LTV)',
        },
      ],
      integrationsTitle: '60+ אינטגרציות מובנות לישראל ולאוקראינה',
      integrationsSubtitle:
        'חיבור מובנה למערכות הסליקה, החשבוניות, המסרים והלוגיסטיקה המובילות בתל אביב, חיפה, ירושלים, קייב ולבוב.',
    },
    pricingPage: {
      kicker: 'תמחור שקוף בסגנון ALTEG.IO · כל 20 המודולים כלולים',
      titleLine1: 'מערכת אחת שלמה.',
      titleLine2: 'ללא מדרגות חסימה. הכל כלול.',
      subtitle:
        'בדיוק כמו ב-Altegio, כל מסלול ב-BryTech כולל את כל 20 המודולים עם 0% עמלה על הזמנות וללא הגבלת תורים או לקוחות. בחרו את גודל הצוות ותקופת המנוי כדי לקבל עד 9 חודשים במתנה — או בחרו ברכישה חד-פעמית (Turnkey).',
      noTiersBadge: 'כל 20 המודולים כלולים בכל מסלול · 0% עמלת הזמנות',
      step1Title: '1. בחרו את גודל הצוות שלכם (אנשי צוות פעילים ביומן)',
      step1Subtitle: 'משתמשי הנהלה ומנהלי קבלה כלולים בחינם ללא הגבלה',
      step2Title: '2. בחרו תקופת רישיון וחודשי בונוס במתנה',
      step2Subtitle: 'בתשלום מראש ל-3, 6 או 12 חודשים תקבלו עד +9 חודשים נוספים בחינם לגמרי',
      locationsLabel: 'מספר סניפים / מיקומים:',
      locationsUnit: 'סניפים',
      teamTiers: [
        {
          id: 'tier-2',
          label: 'עד 2',
          sublabel: 'עצמאים וסטודיו מתחיל',
          staffCountText: '1–2 אנשי צוות',
          baseMonthlyUsd: 29,
          turnkeyOneTimeUsd: 490,
        },
        {
          id: 'tier-5',
          label: '3 – 5',
          sublabel: 'עסק מקומי בצמיחה',
          staffCountText: '3–5 אנשי צוות',
          baseMonthlyUsd: 49,
          turnkeyOneTimeUsd: 790,
          popular: true,
        },
        {
          id: 'tier-10',
          label: '6 – 10',
          sublabel: 'קליניקה / מכון מבוסס',
          staffCountText: '6–10 אנשי צוות',
          baseMonthlyUsd: 79,
          turnkeyOneTimeUsd: 1190,
        },
        {
          id: 'tier-20',
          label: '11 – 20',
          sublabel: 'מרכז גדול / סניף דגל',
          staffCountText: '11–20 אנשי צוות',
          baseMonthlyUsd: 119,
          turnkeyOneTimeUsd: 1690,
        },
        {
          id: 'tier-50',
          label: '21 – 50',
          sublabel: 'ארגון / נפח פעילות גבוה',
          staffCountText: '21–50 אנשי צוות',
          baseMonthlyUsd: 169,
          turnkeyOneTimeUsd: 2390,
        },
        {
          id: 'tier-unlimited',
          label: 'ללא הגבלה',
          sublabel: 'רשתות ו-Enterprise',
          staffCountText: '50+ אנשי צוות ללא הגבלה',
          baseMonthlyUsd: 229,
          turnkeyOneTimeUsd: 3200,
        },
      ],
      billingOptions: [
        {
          id: '1m',
          monthsPaid: 1,
          bonusFreeMonths: 0,
          discountPercent: 0,
          label: 'חודש אחד',
          sublabel: 'מסלול חודשי גמיש',
        },
        {
          id: '3m',
          monthsPaid: 3,
          bonusFreeMonths: 1,
          discountPercent: 25,
          label: '3 חודשים',
          sublabel: 'שלמו על 3 ← קבלו 4 חודשים',
          badgeText: '+1 חודש מתנה',
        },
        {
          id: '6m',
          monthsPaid: 6,
          bonusFreeMonths: 3,
          discountPercent: 33,
          label: '6 חודשים',
          sublabel: 'שלמו על 6 ← קבלו 9 חודשים',
          badgeText: '+3 חודשים מתנה',
        },
        {
          id: '12m',
          monthsPaid: 12,
          bonusFreeMonths: 9,
          discountPercent: 43,
          label: '12 חודשים',
          sublabel: 'שלמו על 12 ← קבלו 21 חודשים',
          badgeText: '+9 חודשים מתנה · המשתלם ביותר',
          isBestValue: true,
        },
        {
          id: 'turnkey',
          monthsPaid: 1,
          bonusFreeMonths: 0,
          discountPercent: 70,
          label: 'רכישה חד-פעמית',
          sublabel: 'תשלום אחד · בעלות מלאה',
          badgeText: 'ללא דמי מנוי',
        },
      ],
      summaryCard: {
        headerTag: 'סיכום המסלול שנבחר',
        effectiveMonthlyLabel: 'עלות חודשית אפקטיבית',
        perMonthSuffix: '/ לחודש',
        turnkeyOneTimeLabel: 'רכישת מערכת Turnkey חד-פעמית',
        totalAccessLabel: 'תקופת שימוש כוללת ברישיון',
        monthsPaidWord: 'חודשים בתשלום',
        bonusMonthsWord: 'חודשי בונוס חינם',
        totalMonthsWord: 'חודשי גישה סה״כ',
        youSaveLabel: 'החיסכון הישיר שלך',
        zeroCommissionBadge: '0% עמלה על הזמנות ותשלומים',
        unlimitedBookingsBadge: 'ללא הגבלת תורים ולקוחות',
        freeMigrationBadge: 'העברת נתונים והקמה חינם תוך 48 שעות',
        ctaStartTrial: 'התחל 7 ימי ניסיון חינם',
        ctaBookDemo: 'בקש הצעת מחיר מותאמת',
        trialFootnote: 'ללא צורך בכרטיס אשראי · גישה לכל 20 המודולים · תמיכה בישראל ובאוקראינה',
      },
      twentyModulesTitle: 'כל 20 המודולים כלולים — ללא תוספת תשלום',
      twentyModulesSubtitle:
        'כל מנוי או מערכת Turnkey פותחים עבורכם את כל חבילת הניהול של BryTech ברמת Altegio:',
      twentyModulesList: [
        { id: 'm1', title: '01. ווידג׳ט זימון תורים 24/7', category: 'הזמנות', desc: 'הטמעה באתר, אינסטגרם, וואטסאפ, טלגרם ו-Google Maps.' },
        { id: 'm2', title: '02. יומן צוות וחדרים חכם', category: 'הזמנות', desc: 'ניהול לו״ז בגרירה עבור אנשי צוות, חדרים ומכשור.' },
        { id: 'm3', title: '03. אתר עסקי רב-לשוני מלא', category: 'הזמנות', desc: 'אתר יוקרתי ומהיר בעברית (RTL), אנגלית ואוקראינית.' },
        { id: 'm4', title: '04. מערכת CRM וכרטיסי לקוח', category: 'CRM', desc: 'היסטוריית ביקורים מלאה, העדפות, תמונות ותגיות.' },
        { id: 'm5', title: '05. פורטל אזור לקוחות אישי', category: 'פורטל', desc: 'כניסת לקוח עם מעקב התקדמות, הערות על מוצרים וצ׳אט חי.' },
        { id: 'm6', title: '06. כספת מסמכים וציר זמן', category: 'פורטל', desc: 'שיתוף חוזים, חשבוניות ואבני דרך בפרויקט באופן מאובטח.' },
        { id: 'm7', title: '07. אוטומציית WhatsApp Business', category: 'אוטומציה', desc: 'אישורי הגעה אוטומטיים, תזכורות ובקשת ביקורות.' },
        { id: 'm8', title: '08. בוט טלגרם ללקוחות ולאדמין', category: 'אוטומציה', desc: 'קביעת תורים, שינוי מועד והתראות בזמן אמת בטלגרם.' },
        { id: 'm9', title: '09. הגנה מאי-הגעות וגביית מקדמות', category: 'פיננסים', desc: 'גביית מקדמות בביט, משולם, טרנזילה, Monobank ו-Stripe.' },
        { id: 'm10', title: '10. חישוב שכר ועמלות אוטומטי', category: 'פיננסים', desc: 'אחוזים גמישים משירותים ומוצרים, בונוסים ודוחות שכר.' },
        { id: 'm11', title: '11. ניהול פיננסי ודוחות רווח והפסד', category: 'פיננסים', desc: 'מעקב קופות, הכנסות, הוצאות ושולי רווח בזמן אמת.' },
        { id: 'm12', title: '12. ניהול מלאי וחומרים מתכלים', category: 'פיננסים', desc: 'ניכוי חומרים אוטומטי בכל טיפול והתראות מלאי נמוך.' },
        { id: 'm13', title: '13. מועדון לקוחות וקאשבק', category: 'CRM', desc: 'צבירת נקודות אוטומטית, דרגות VIP והטבות ללקוחות חוזרים.' },
        { id: 'm14', title: '14. מנויים וכרטיסיות טיפולים', category: 'CRM', desc: 'מכירת סדרות טיפולים ומנויים חודשיים עם מעקב יתרה.' },
        { id: 'm15', title: '15. כרטיסי מתנה דיגיטליים (Gift Cards)', category: 'הזמנות', desc: 'מכירת שוברי מתנה ממותגים אונליין עם מעקב מימוש.' },
        { id: 'm16', title: '16. החזרת לקוחות רדומים אוטומטית', category: 'אוטומציה', desc: 'שליחת הטבה אוטומטית ללקוחות שלא ביקרו 45/60/90 יום.' },
        { id: 'm17', title: '17. מנוע ביקורות 5 כוכבים בגוגל', category: 'אוטומציה', desc: 'הגדלת דירוג העסק ב-Google Maps וסינון משוב שלילי.' },
        { id: 'm18', title: '18. ניהול רשת סניפים מרכזי', category: 'אנליטיקה', desc: 'מאגר לקוחות משותף ודוחות מאוחדים לכל סניפי הרשת.' },
        { id: 'm19', title: '19. אנליטיקת שימור לקוחות ו-ROI', category: 'אנליטיקה', desc: 'ניתוח קוהורטות שימור, נצילות עובדים ואפקטיביות פרסום.' },
        { id: 'm20', title: '20. פאנל ניהול מלא וצ׳אט חי', category: 'פורטל', desc: 'ניהול לקוחות, מוצרים, הערות וכפתורי הקשר באתר.' },
      ],
      comparisonTitle: 'השוואת יכולות מפורטת',
      comparisonSubtitle:
        'ראו כיצד BryTech משלבת את עוצמת ה-All-in-One של Altegio יחד עם אתר מותאם ופורטל לקוחות בבעלותכם.',
      colFeature: 'יכולת / מודול',
      colBrytech: 'BRYTECH ALL-IN-ONE (IL & UA)',
      colGenericSaas: 'מערכות תורים רגילות',
      colAgency: 'בית תוכנה מסורתי',
      comparisonCategories: [
        {
          id: 'cat-booking',
          title: 'אתר עסקי, זימון תורים ויומן חכם',
          rows: [
            { feature: 'אתר תדמית רב-לשוני מותאם אישית (HE / EN / UA)', brytech: 'כלול / בנייה מלאה', altegioSaaS: 'ווידג׳ט בלבד (ללא אתר)', agency: '$3,500 – $8,000 בנפרד' },
            { feature: 'יומן זימון תורים 24/7 וניהול חדרים/צוות', brytech: true, altegioSaaS: true, agency: '$4,000+ פיתוח מאפס' },
            { feature: 'עמלת פלטפורמה על תורים או סליקה', brytech: '0% עמלה', altegioSaaS: '0% – 2.5% עמלה', agency: '0% עמלה' },
            { feature: 'ללא הגבלת תורים וכרטיסי לקוחות', brytech: true, altegioSaaS: true, agency: true },
          ],
        },
        {
          id: 'cat-portal',
          title: 'CRM, פורטל אזור לקוחות וצ׳אט חי',
          rows: [
            { feature: 'אזור לקוחות אישי עם מד התקדמות לפרויקטים ומוצרים', brytech: true, altegioSaaS: false, agency: '$5,000+ פיתוח מותאם' },
            { feature: 'הערות לקוח על מוצרים עם התראה מיידית לאדמין', brytech: true, altegioSaaS: false, agency: 'נדיר מאוד' },
            { feature: 'צ׳אט חי מובנה בין הלקוח לפאנל הניהול', brytech: true, altegioSaaS: 'תוסף בתשלום', agency: 'שירות צד-שלישי בתשלום' },
            { feature: 'מערכת CRM, היסטוריית לקוח ופילוח RFM', brytech: true, altegioSaaS: true, agency: 'פיתוח מותאם יקר' },
          ],
        },
        {
          id: 'cat-local',
          title: 'אינטגרציות לישראל ולאוקראינה + בעלות על המערכת',
          rows: [
            { feature: 'אינטגרציות ישראל (Bit, Meshulam, Tranzila, חשבונית ירוקה, RTL)', brytech: true, altegioSaaS: 'חלקי', agency: 'חיוב שעתי יקר' },
            { feature: 'אינטגרציות אוקראינה (Monobank, LiqPay, Checkbox, Nova Poshta)', brytech: true, altegioSaaS: 'חלקי', agency: 'חיוב שעתי יקר' },
            { feature: 'בוט טלגרם + תזכורות WhatsApp Business אוטומטיות', brytech: true, altegioSaaS: 'דורש ספק חיצוני בתשלום', agency: '$1,500+ הקמת בוט' },
            { feature: 'אפשרות לרכישה חד-פעמית (Turnkey) ללא דמי מנוי', brytech: true, altegioSaaS: false, agency: true },
          ],
        },
      ],
      migrationBanner: {
        tag: 'מעבר חלק ללא השבתה · תל אביב וקייב',
        title: 'עוברים מאקסל או ממערכת CRM אחרת? נעביר את כל הנתונים שלכם בחינם תוך 48 שעות.',
        desc: 'צוות ההנדסה שלנו מייבא עבורכם את כל מאגר הלקוחות, היסטוריית הביקורים, מחירון השירותים ויומני הצוות ללא שום הפסקת עבודה.',
        bullet1: 'ייבוא נתונים 100% חינם מאקסל, Altegio, Yclients, קליניקס או כל מערכת אחרת',
        bullet2: 'הדרכת צוות מלאה בעברית, אנגלית או אוקראינית',
        bullet3: '7 ימי ניסיון חינם עם כל 20 המודולים פתוחים',
        cta: 'קבלו העברת נתונים חינם ו-7 ימי ניסיון',
      },
      faqTitle: 'שאלות נפוצות על מחירים ומסלולים',
      faqSubtitle: 'תשובות ברורות על חודשי בונוס במתנה, רכישה חד-פעמית ואינטגרציות מקומיות.',
      faqs: [
        {
          q: 'איך עובדים חודשי הבונוס במתנה (+1, +3, +9 חודשים)?',
          a: 'בדיוק כמו במודל של Altegio: ברכישת רישיון ל-3 חודשים מקבלים חודש נוסף במתנה (4 חודשים סה״כ). ברכישה ל-6 חודשים מקבלים +3 חודשים חינם (9 חודשים סה״כ), וברכישה ל-12 חודשים מקבלים +9 חודשים חינם (21 חודשים של גישה מלאה), מה שחוסך 43% מהעלות החודשית.',
        },
        {
          q: 'מה ההבדל בין מנוי חודשי/שנתי לבין רכישה חד-פעמית (Turnkey)?',
          a: 'במסלול המנוי אתם משלמים תשלום קבוע ונמוך לפי גודל הצוות ואנחנו דואגים לאחסון ענן, עדכונים ותמיכה שוטפת. במסלול Turnkey אתם משלמים פעם אחת והאתר, ה-CRM, אזור הלקוחות והאוטומציות בבעלותכם המלאה ללא דמי מנוי חודשיים.',
        },
        {
          q: 'האם יש פיצ׳רים או מודולים שחסומים במסלולים הקטנים?',
          a: 'לא! אנחנו פועלים לפי מדיניות "ללא מדרגות חסימה". גם עסק של עובד אחד מקבל גישה מלאה לכל 20 המודולים: זימון תורים, אתר, CRM, אזור לקוחות, בוט וואטסאפ/טלגרם, שכר, מלאי ואנליטיקה.',
        },
        {
          q: 'האם אתם גובים עמלה על תורים או סליקת אשראי?',
          a: '0% עמלה. כל התשלומים מהלקוחות שלכם עוברים ישירות לחשבון הסליקה שלכם ב-Meshulam, Bit, Tranzila, Monobank, LiqPay או Stripe.',
        },
        {
          q: 'האם תוכלו להעביר את מאגר הלקוחות הקיים שלנו?',
          a: 'בהחלט. הצוות שלנו מעביר את כל הלקוחות, היסטוריית הביקורים, יתרות הכרטיסיות והמחירון שלכם מאקסל או מכל מערכת קודמת תוך 48 שעות וללא עלות.',
        },
        {
          q: 'איך עובד אזור הלקוחות האישי (Client Area)?',
          a: 'המנהל יוצר משתמש לכל לקוח בפאנל הניהול. הלקוח מתחבר דרך כפתור ה-Client Area באתר עם שם משתמש וסיסמה, צופה במוצרים ובהתקדמות שלהם, מוסיף הערות (שקופצות מיד כהתראה לאדמין) ומתכתב בצ׳אט חי.',
        },
      ],
    },
  },
};
