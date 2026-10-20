import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  deleteDoc,
  where,
  serverTimestamp,
} from 'firebase/firestore';
import {
  db,
  OperationType,
  handleFirestoreError,
  BLUEPRINT_CONSTRAINTS,
  sanitizeId,
  clampString,
  clampInt,
} from '../firebase';

export interface ClientAccountRecord {
  id: string;
  ownerUid: string;
  businessName: string;
  contactName: string;
  city: string;
  market: 'Ukraine' | 'Israel';
  planName: string;
  accountStatus: 'onboarding' | 'active' | 'maintenance' | 'completed';
  overallProgress: number;
  estimatedAgencyCostUsd: number;
  brytechTotalPaidUsd: number;
  assignedPm: string;
}

export interface ClientPrivateContact {
  clientId: string;
  ownerUid: string;
  email: string;
  phone: string;
  billingAddress: string;
  loginUsername: string;
  loginPassword: string;
}

export interface ClientProductRecord {
  id: string;
  clientId: string;
  ownerUid: string;
  name: string;
  type: 'Website' | 'CRM' | 'Client Area' | 'Automation Bot';
  domainOrHandle: string;
  progress: number;
  status: 'onboarding' | 'in_progress' | 'review' | 'live' | 'archived';
  currentPhase: string;
  leadsOrEventsMonth: number;
  metricLabel: string;
  maintenanceMode: boolean;
  lastDeploy: string;
}

export interface TimelineMilestoneRecord {
  id: string;
  clientId: string;
  productId: string;
  productName: string;
  ownerUid: string;
  title: string;
  description: string;
  phaseOrder: number;
  dueDate: string;
  status: 'upcoming' | 'in_progress' | 'review' | 'completed';
  deliverableUrl: string;
}

export interface ClientDocumentRecord {
  id: string;
  clientId: string;
  productId: string;
  productName: string;
  ownerUid: string;
  title: string;
  category:
    | 'Contract & SLA'
    | 'Architecture Blueprint'
    | 'Invoice & Receipt'
    | 'Brand & Assets'
    | 'User Manual & Training';
  fileName: string;
  fileSize: string;
  version: string;
  status: 'draft' | 'pending_signature' | 'approved' | 'archived';
  uploadedBy: string;
  summary: string;
  externalUrl: string;
}

export interface ClientTaskRecord {
  id: string;
  clientId: string;
  productId: string;
  productName: string;
  ownerUid: string;
  title: string;
  priority: 'Normal' | 'High' | 'Urgent';
  status: 'In Progress' | 'Ready for Review' | 'Completed';
  assignee: string;
}

export interface ClientAutomationRecord {
  id: string;
  clientId: string;
  ownerUid: string;
  name: string;
  channel: 'Telegram' | 'WhatsApp' | 'SMS' | 'Payment Sync';
  trigger: string;
  active: boolean;
  runsThisMonth: number;
  template: string;
}

export interface ClientInvoiceRecord {
  id: string;
  clientId: string;
  ownerUid: string;
  invoiceNumber: string;
  title: string;
  amountUsd: number;
  dueDate: string;
  status: 'Pending' | 'Paid';
}

export interface ChatMessageRecord {
  id: string;
  clientId: string;
  ownerUid: string;
  senderRole: 'client' | 'admin';
  senderName: string;
  text: string;
  sentAtIso: string;
}

export interface HydratedClientWorkspace {
  account: ClientAccountRecord;
  privateInfo: ClientPrivateContact;
  products: ClientProductRecord[];
  timelines: TimelineMilestoneRecord[];
  documents: ClientDocumentRecord[];
  tasks: ClientTaskRecord[];
  automations: ClientAutomationRecord[];
  invoices: ClientInvoiceRecord[];
  messages: ChatMessageRecord[];
}

export function getInitialSeedWorkspaces(ownerUid: string): HydratedClientWorkspace[] {
  const safeUid = sanitizeId(ownerUid || 'demo_user');
  const uaClientId = sanitizeId(`ua_aesthetica_${safeUid.slice(0, 12)}`);
  const ilClientId = sanitizeId(`il_shaked_${safeUid.slice(0, 12)}`);
  const lvivClientId = sanitizeId(`ua_novalogix_${safeUid.slice(0, 12)}`);

  return [
    {
      account: {
        id: uaClientId,
        ownerUid: safeUid,
        businessName: 'Aesthetica Med Clinic',
        contactName: 'Dr. Olena Kovalenko',
        city: 'Kyiv, Ukraine',
        market: 'Ukraine',
        planName: 'Full Clinic System (Website + CRM + Patient Cabinet + Telegram Bot)',
        accountStatus: 'active',
        overallProgress: 87,
        estimatedAgencyCostUsd: 16500,
        brytechTotalPaidUsd: 2650,
        assignedPm: 'Bohdan Kovalchuk (Kyiv Hub)',
      },
      privateInfo: {
        clientId: uaClientId,
        ownerUid: safeUid,
        email: 'olena@aesthetica.kyiv.ua',
        phone: '+380 67 441 9022',
        billingAddress: 'Velyka Vasylkivska St, 72, Kyiv, Ukraine, 03150',
        loginUsername: 'aesthetica',
        loginPassword: 'kyiv2026!',
      },
      products: [
        {
          id: 'prod_ua_web',
          clientId: uaClientId,
          ownerUid: safeUid,
          name: 'Bilingual Clinic Website & Online Booking',
          type: 'Website',
          domainOrHandle: 'aesthetica.kyiv.ua',
          progress: 100,
          status: 'live',
          currentPhase: 'Phase 4: Live Production & SEO',
          leadsOrEventsMonth: 342,
          metricLabel: 'Bookings This Month',
          maintenanceMode: false,
          lastDeploy: '2 days ago',
        },
        {
          id: 'prod_ua_crm',
          clientId: uaClientId,
          ownerUid: safeUid,
          name: 'Custom Clinic CRM & Doctor Schedule',
          type: 'CRM',
          domainOrHandle: 'crm.aesthetica.kyiv.ua',
          progress: 82,
          status: 'review',
          currentPhase: 'Phase 3: Monobank & Checkbox Fiscal Sync',
          leadsOrEventsMonth: 1290,
          metricLabel: 'Active Patient Cards',
          maintenanceMode: false,
          lastDeploy: 'Today, 11:20',
        },
        {
          id: 'prod_ua_cabinet',
          clientId: uaClientId,
          ownerUid: safeUid,
          name: 'Patient Personal Cabinet (Client Area)',
          type: 'Client Area',
          domainOrHandle: 'my.aesthetica.kyiv.ua',
          progress: 65,
          status: 'in_progress',
          currentPhase: 'Phase 2: Lab PDF Downloads & Deposit Module',
          leadsOrEventsMonth: 418,
          metricLabel: 'Registered Patients',
          maintenanceMode: false,
          lastDeploy: 'Yesterday',
        },
        {
          id: 'prod_ua_bot',
          clientId: uaClientId,
          ownerUid: safeUid,
          name: 'Telegram Appointment & Reminder Bot',
          type: 'Automation Bot',
          domainOrHandle: '@AestheticaKyiv_bot',
          progress: 100,
          status: 'live',
          currentPhase: 'Phase 2: 1-Click Confirm & Reschedule',
          leadsOrEventsMonth: 1840,
          metricLabel: 'Automated Reminders Sent',
          maintenanceMode: false,
          lastDeploy: '5 days ago',
        },
      ],
      timelines: [
        {
          id: 'tl_ua_1',
          clientId: uaClientId,
          productId: 'prod_ua_web',
          productName: 'Bilingual Clinic Website & Online Booking',
          ownerUid: safeUid,
          title: 'UX Blueprint & Medical Service Catalog',
          description: 'Interactive service tree, doctor profiles, and mobile-first wireframes in Ukrainian & English.',
          phaseOrder: 1,
          dueDate: '2026-03-04',
          status: 'completed',
          deliverableUrl: 'https://aesthetica.kyiv.ua/catalog',
        },
        {
          id: 'tl_ua_2',
          clientId: uaClientId,
          productId: 'prod_ua_web',
          productName: 'Bilingual Clinic Website & Online Booking',
          ownerUid: safeUid,
          title: 'Online Slot Calculator & Production Launch',
          description: 'Real-time doctor slot availability picker and Google Business SEO schema.',
          phaseOrder: 2,
          dueDate: '2026-03-18',
          status: 'completed',
          deliverableUrl: 'https://aesthetica.kyiv.ua/booking',
        },
        {
          id: 'tl_ua_3',
          clientId: uaClientId,
          productId: 'prod_ua_crm',
          productName: 'Custom Clinic CRM & Doctor Schedule',
          ownerUid: safeUid,
          title: 'Patient Database & Doctor Shift Calendar',
          description: 'Role-based access for head doctors, receptionists, and laser cabinet scheduling.',
          phaseOrder: 3,
          dueDate: '2026-03-25',
          status: 'completed',
          deliverableUrl: 'https://crm.aesthetica.kyiv.ua/calendar',
        },
        {
          id: 'tl_ua_4',
          clientId: uaClientId,
          productId: 'prod_ua_crm',
          productName: 'Custom Clinic CRM & Doctor Schedule',
          ownerUid: safeUid,
          title: 'Monobank Acquiring & Checkbox PRRO Fiscal Sync',
          description: 'Automatic fiscal receipt generation and prepayment status sync inside patient cards.',
          phaseOrder: 4,
          dueDate: 'Ready for Review',
          status: 'review',
          deliverableUrl: 'https://crm.aesthetica.kyiv.ua/billing-sync',
        },
        {
          id: 'tl_ua_5',
          clientId: uaClientId,
          productId: 'prod_ua_cabinet',
          productName: 'Patient Personal Cabinet (Client Area)',
          ownerUid: safeUid,
          title: 'SMS OTP Login & Treatment History Dashboard',
          description: 'Passwordless SMS verification and chronological doctor recommendation cards.',
          phaseOrder: 5,
          dueDate: '2026-03-28',
          status: 'completed',
          deliverableUrl: 'https://my.aesthetica.kyiv.ua/history',
        },
        {
          id: 'tl_ua_6',
          clientId: uaClientId,
          productId: 'prod_ua_cabinet',
          productName: 'Patient Personal Cabinet (Client Area)',
          ownerUid: safeUid,
          title: 'PDF Lab Results & 1-Click Appointment Reschedule',
          description: 'Encrypted diagnostic PDF downloads and self-service visit rescheduling.',
          phaseOrder: 6,
          dueDate: 'Ready for Review',
          status: 'review',
          deliverableUrl: 'https://my.aesthetica.kyiv.ua/documents',
        },
      ],
      documents: [
        {
          id: 'doc_ua_1',
          clientId: uaClientId,
          productId: 'prod_ua_web',
          productName: 'Bilingual Clinic Website & Online Booking',
          ownerUid: safeUid,
          title: 'Master Development Contract & 99.9% SLA',
          category: 'Contract & SLA',
          fileName: 'BryTech_Aesthetica_Master_SLA_2026.pdf',
          fileSize: '1.4 MB',
          version: 'v1.0',
          status: 'approved',
          uploadedBy: 'Bohdan Kovalchuk (Kyiv Legal)',
          summary: 'Fixed-price Turnkey System agreement covering Website, CRM, Patient Cabinet, and Telegram Bot with 12-month warranty.',
          externalUrl: 'https://docs.brytech.kyiv.ua/contracts/aesthetica-sla.pdf',
        },
        {
          id: 'doc_ua_2',
          clientId: uaClientId,
          productId: 'prod_ua_crm',
          productName: 'Custom Clinic CRM & Doctor Schedule',
          ownerUid: safeUid,
          title: 'Clinic CRM Data Schema & Monobank/Checkbox Flow',
          category: 'Architecture Blueprint',
          fileName: 'Aesthetica_CRM_Architecture_v2.1.pdf',
          fileSize: '3.8 MB',
          version: 'v2.1',
          status: 'pending_signature',
          uploadedBy: 'Artem K. (Lead Architect)',
          summary: 'Complete entity diagram for patient cards, doctor shift locks, Monobank webhook payloads, and Checkbox fiscalization.',
          externalUrl: 'https://docs.brytech.kyiv.ua/blueprints/aesthetica-crm-v2.pdf',
        },
        {
          id: 'doc_ua_3',
          clientId: uaClientId,
          productId: 'prod_ua_cabinet',
          productName: 'Patient Personal Cabinet (Client Area)',
          ownerUid: safeUid,
          title: 'Receptionist & Doctor CRM Quick-Start Manual (UA)',
          category: 'User Manual & Training',
          fileName: 'Aesthetica_Staff_Playbook_UA.pdf',
          fileSize: '5.2 MB',
          version: 'v1.3',
          status: 'pending_signature',
          uploadedBy: 'Daria M. (Kyiv Product Team)',
          summary: 'Step-by-step illustrated handbook for clinic receptionists to manage bookings, issue refunds, and upload patient PDFs.',
          externalUrl: 'https://docs.brytech.kyiv.ua/manuals/aesthetica-staff-ua.pdf',
        },
      ],
      tasks: [
        {
          id: 'tsk_ua_401',
          clientId: uaClientId,
          productId: 'prod_ua_crm',
          productName: 'Custom Clinic CRM & Doctor Schedule',
          ownerUid: safeUid,
          title: 'Add automatic Checkbox fiscal receipt after Monobank deposit',
          priority: 'High',
          status: 'Ready for Review',
          assignee: 'Artem K. (Kyiv Engineering)',
        },
        {
          id: 'tsk_ua_402',
          clientId: uaClientId,
          productId: 'prod_ua_cabinet',
          productName: 'Patient Personal Cabinet (Client Area)',
          ownerUid: safeUid,
          title: 'Allow patients to download PDF lab results from their profile',
          priority: 'Normal',
          status: 'In Progress',
          assignee: 'Daria M. (Kyiv Frontend)',
        },
      ],
      automations: [
        {
          id: 'auto_ua_1',
          clientId: uaClientId,
          ownerUid: safeUid,
          name: '24-Hour Telegram Visit Reminder',
          channel: 'Telegram',
          trigger: '24 hours before scheduled CRM appointment',
          active: true,
          runsThisMonth: 940,
          template:
            'Вітаємо, {client_name}! Нагадуємо про ваш візит у клініку Aesthetica завтра о {time}. Підтвердити візит: [Так / Перенести]',
        },
        {
          id: 'auto_ua_2',
          clientId: uaClientId,
          ownerUid: safeUid,
          name: 'Website Lead Instant CRM + Admin Alert',
          channel: 'Telegram',
          trigger: 'New booking submitted on aesthetica.kyiv.ua',
          active: true,
          runsThisMonth: 342,
          template:
            'Нова заявка з сайту! Клієнт: {client_name}, Послуга: {service}, Телефон: {phone}. Картку створено в CRM.',
        },
      ],
      invoices: [
        {
          id: 'inv_ua_1',
          clientId: uaClientId,
          ownerUid: safeUid,
          invoiceNumber: 'INV-2026-01',
          title: 'Stage 1: Bilingual Website & Telegram Bot Launch',
          amountUsd: 1100,
          dueDate: '2026-03-05',
          status: 'Paid',
        },
        {
          id: 'inv_ua_2',
          clientId: uaClientId,
          ownerUid: safeUid,
          invoiceNumber: 'INV-2026-02',
          title: 'Stage 2: Custom Clinic CRM Core Setup',
          amountUsd: 950,
          dueDate: '2026-03-18',
          status: 'Paid',
        },
        {
          id: 'inv_ua_3',
          clientId: uaClientId,
          ownerUid: safeUid,
          invoiceNumber: 'INV-2026-03',
          title: 'Stage 3: Patient Personal Cabinet Final Handover',
          amountUsd: 600,
          dueDate: '2026-04-06',
          status: 'Pending',
        },
      ],
      messages: [
        {
          id: 'msg_ua_1',
          clientId: uaClientId,
          ownerUid: safeUid,
          senderRole: 'admin',
          senderName: 'Bohdan Kovalchuk (BryTech Admin)',
          text: 'Hello Dr. Olena! Phase 3 of your Clinic CRM (Monobank + Checkbox fiscal sync) is live on staging and ready for your review.',
          sentAtIso: '2026-03-28T09:15:00.000Z',
        },
        {
          id: 'msg_ua_2',
          clientId: uaClientId,
          ownerUid: safeUid,
          senderRole: 'client',
          senderName: 'Dr. Olena Kovalenko',
          text: 'Thank you Bohdan! Our head receptionist tested the doctor shift calendar this morning and loves how fast it is. Checking the Monobank receipts now!',
          sentAtIso: '2026-03-28T09:22:00.000Z',
        },
      ],
    },
    {
      account: {
        id: ilClientId,
        ownerUid: safeUid,
        businessName: 'Shaked Interiors & Renovation',
        contactName: 'Avi Shaked',
        city: 'Tel Aviv, Israel',
        market: 'Israel',
        planName: 'Full Contractor Suite (HE/EN Website + Quote CRM + Client Portal + WhatsApp)',
        accountStatus: 'active',
        overallProgress: 95,
        estimatedAgencyCostUsd: 19200,
        brytechTotalPaidUsd: 2850,
        assignedPm: 'Bohdan Kovalchuk (Kyiv Hub)',
      },
      privateInfo: {
        clientId: ilClientId,
        ownerUid: safeUid,
        email: 'avi@shaked-tlv.co.il',
        phone: '+972 54 555 0192',
        billingAddress: 'Rothschild Blvd 45, Tel Aviv-Yafo, Israel',
        loginUsername: 'shaked',
        loginPassword: 'tlv2026!',
      },
      products: [
        {
          id: 'prod_il_web',
          clientId: ilClientId,
          ownerUid: safeUid,
          name: 'Hebrew/English Website & Renovation Estimator',
          type: 'Website',
          domainOrHandle: 'shaked-tlv.co.il',
          progress: 100,
          status: 'live',
          currentPhase: 'Phase 3: Live Production & Israel SEO',
          leadsOrEventsMonth: 214,
          metricLabel: 'Qualified Leads / Month',
          maintenanceMode: false,
          lastDeploy: '4 days ago',
        },
        {
          id: 'prod_il_crm',
          clientId: ilClientId,
          ownerUid: safeUid,
          name: 'Custom Quote & Project Pipeline CRM',
          type: 'CRM',
          domainOrHandle: 'crm.shaked-tlv.co.il',
          progress: 100,
          status: 'live',
          currentPhase: 'Phase 2: GreenInvoice & Bit Payment Sync',
          leadsOrEventsMonth: 48,
          metricLabel: 'Active Renovation Sites',
          maintenanceMode: false,
          lastDeploy: '3 days ago',
        },
        {
          id: 'prod_il_portal',
          clientId: ilClientId,
          ownerUid: safeUid,
          name: 'Homeowner Renovation Progress Portal (Client Area)',
          type: 'Client Area',
          domainOrHandle: 'portal.shaked-tlv.co.il',
          progress: 80,
          status: 'review',
          currentPhase: 'Phase 3: Digital Stage Sign-Off & Bit Checkout',
          leadsOrEventsMonth: 64,
          metricLabel: 'Active Homeowners',
          maintenanceMode: false,
          lastDeploy: 'Today, 09:45',
        },
        {
          id: 'prod_il_bot',
          clientId: ilClientId,
          ownerUid: safeUid,
          name: 'WhatsApp Business Lead & Inspection Bot',
          type: 'Automation Bot',
          domainOrHandle: '+972-54-555-0192 (WhatsApp API)',
          progress: 100,
          status: 'live',
          currentPhase: 'Phase 2: Automated Hebrew Quote Follow-Up',
          leadsOrEventsMonth: 860,
          metricLabel: 'Automated WhatsApp Replies',
          maintenanceMode: false,
          lastDeploy: '1 week ago',
        },
      ],
      timelines: [
        {
          id: 'tl_il_1',
          clientId: ilClientId,
          productId: 'prod_il_web',
          productName: 'Hebrew/English Website & Renovation Estimator',
          ownerUid: safeUid,
          title: 'RTL Hebrew & English Architecture + Apartment Calculator',
          description: 'Interactive room-by-room renovation budget estimator with instant WhatsApp lead capture.',
          phaseOrder: 1,
          dueDate: '2026-03-02',
          status: 'completed',
          deliverableUrl: 'https://shaked-tlv.co.il/estimator',
        },
        {
          id: 'tl_il_2',
          clientId: ilClientId,
          productId: 'prod_il_crm',
          productName: 'Custom Quote & Project Pipeline CRM',
          ownerUid: safeUid,
          title: 'Contractor Pipeline & GreenInvoice (Morning) Integration',
          description: 'Automated Hebrew tax invoice generation and Bit payment confirmation webhooks.',
          phaseOrder: 2,
          dueDate: '2026-03-14',
          status: 'completed',
          deliverableUrl: 'https://crm.shaked-tlv.co.il/pipeline',
        },
        {
          id: 'tl_il_3',
          clientId: ilClientId,
          productId: 'prod_il_portal',
          productName: 'Homeowner Renovation Progress Portal (Client Area)',
          ownerUid: safeUid,
          title: 'Room-by-Room Photo Timeline & Stage Approval Module',
          description: 'Homeowners inspect site photos on mobile and approve completed construction milestones.',
          phaseOrder: 3,
          dueDate: 'Ready for Review',
          status: 'review',
          deliverableUrl: 'https://portal.shaked-tlv.co.il/timeline',
        },
      ],
      documents: [
        {
          id: 'doc_il_1',
          clientId: ilClientId,
          productId: 'prod_il_web',
          productName: 'Hebrew/English Website & Renovation Estimator',
          ownerUid: safeUid,
          title: 'Turnkey System Delivery Agreement (Israel Market)',
          category: 'Contract & SLA',
          fileName: 'BryTech_Shaked_TLV_Agreement_2026.pdf',
          fileSize: '1.6 MB',
          version: 'v1.0',
          status: 'approved',
          uploadedBy: 'Bohdan Kovalchuk (Kyiv Legal)',
          summary: 'Full scope delivery contract for RTL Hebrew/English Website, Quote CRM, Homeowner Portal, and WhatsApp Business API.',
          externalUrl: 'https://docs.brytech.kyiv.ua/contracts/shaked-tlv-sla.pdf',
        },
        {
          id: 'doc_il_2',
          clientId: ilClientId,
          productId: 'prod_il_portal',
          productName: 'Homeowner Renovation Progress Portal (Client Area)',
          ownerUid: safeUid,
          title: 'Homeowner Portal RTL UX & Bit Payment Specification',
          category: 'Architecture Blueprint',
          fileName: 'Shaked_Homeowner_Portal_Spec_v1.4.pdf',
          fileSize: '4.1 MB',
          version: 'v1.4',
          status: 'pending_signature',
          uploadedBy: 'Maksym V. (Kyiv Engineering)',
          summary: 'Technical specification for milestone photo verification, digital homeowner sign-off, and Morning/GreenInvoice receipt emission.',
          externalUrl: 'https://docs.brytech.kyiv.ua/blueprints/shaked-portal-v1.4.pdf',
        },
      ],
      tasks: [
        {
          id: 'tsk_il_510',
          clientId: ilClientId,
          productId: 'prod_il_portal',
          productName: 'Homeowner Renovation Progress Portal (Client Area)',
          ownerUid: safeUid,
          title: 'Add 1-click Bit payment button next to each approved renovation stage',
          priority: 'High',
          status: 'Ready for Review',
          assignee: 'Maksym V. (Kyiv Engineering)',
        },
      ],
      automations: [
        {
          id: 'auto_il_1',
          clientId: ilClientId,
          ownerUid: safeUid,
          name: 'WhatsApp Instant Lead Welcome (Hebrew)',
          channel: 'WhatsApp',
          trigger: 'When a homeowner completes the website renovation calculator',
          active: true,
          runsThisMonth: 214,
          template:
            'שלום {client_name}! תודה שפנית לשקד שיפוצים. חישוב העלות הראשוני שלך מוכן. מתי נוח לך שנחזור אליך לתיאום פגישה?',
        },
      ],
      invoices: [
        {
          id: 'inv_il_1',
          clientId: ilClientId,
          ownerUid: safeUid,
          invoiceNumber: 'INV-IL-101',
          title: 'Milestone 1: RTL Website & Estimator Launch',
          amountUsd: 1050,
          dueDate: '2026-02-28',
          status: 'Paid',
        },
        {
          id: 'inv_il_2',
          clientId: ilClientId,
          ownerUid: safeUid,
          invoiceNumber: 'INV-IL-102',
          title: 'Milestone 2: Quote CRM & WhatsApp Bot Setup',
          amountUsd: 1100,
          dueDate: '2026-03-15',
          status: 'Paid',
        },
        {
          id: 'inv_il_3',
          clientId: ilClientId,
          ownerUid: safeUid,
          invoiceNumber: 'INV-IL-103',
          title: 'Milestone 3: Homeowner Client Area Final Release',
          amountUsd: 700,
          dueDate: '2026-04-04',
          status: 'Pending',
        },
      ],
      messages: [
        {
          id: 'msg_il_1',
          clientId: ilClientId,
          ownerUid: safeUid,
          senderRole: 'admin',
          senderName: 'Bohdan Kovalchuk (BryTech Admin)',
          text: 'Shalom Avi! The Hebrew RTL Homeowner Portal with Bit checkout is ready for your sign-off.',
          sentAtIso: '2026-03-28T10:05:00.000Z',
        },
      ],
    },
    {
      account: {
        id: lvivClientId,
        ownerUid: safeUid,
        businessName: 'NovaLogix B2B Fulfillment',
        contactName: 'Taras Melnyk',
        city: 'Lviv, Ukraine',
        market: 'Ukraine',
        planName: 'Warehouse CRM + B2B Client Portal + Telegram Waybill Bot',
        accountStatus: 'onboarding',
        overallProgress: 55,
        estimatedAgencyCostUsd: 14800,
        brytechTotalPaidUsd: 2200,
        assignedPm: 'Artem K. (Kyiv Hub)',
      },
      privateInfo: {
        clientId: lvivClientId,
        ownerUid: safeUid,
        email: 'taras@novalogix.lviv.ua',
        phone: '+380 50 912 3340',
        billingAddress: 'Horodotska St, 174, Lviv, Ukraine, 79000',
        loginUsername: 'novalogix',
        loginPassword: 'lviv2026!',
      },
      products: [
        {
          id: 'prod_lv_crm',
          clientId: lvivClientId,
          ownerUid: safeUid,
          name: 'Warehouse & Fleet Dispatch CRM',
          type: 'CRM',
          domainOrHandle: 'dispatch.novalogix.lviv.ua',
          progress: 70,
          status: 'in_progress',
          currentPhase: 'Phase 2: Nova Poshta API Waybill Sync',
          leadsOrEventsMonth: 4120,
          metricLabel: 'Parcels Processed / Month',
          maintenanceMode: false,
          lastDeploy: 'Yesterday',
        },
        {
          id: 'prod_lv_portal',
          clientId: lvivClientId,
          ownerUid: safeUid,
          name: 'B2B Merchant Inventory & Waybill Portal',
          type: 'Client Area',
          domainOrHandle: 'b2b.novalogix.lviv.ua',
          progress: 40,
          status: 'review',
          currentPhase: 'Phase 1: Merchant Stock Table & Invoice Export',
          leadsOrEventsMonth: 85,
          metricLabel: 'Active B2B Merchants',
          maintenanceMode: false,
          lastDeploy: 'Today, 14:10',
        },
      ],
      timelines: [
        {
          id: 'tl_lv_1',
          clientId: lvivClientId,
          productId: 'prod_lv_crm',
          productName: 'Warehouse & Fleet Dispatch CRM',
          ownerUid: safeUid,
          title: 'Barcode Scanner & Warehouse Zone Architecture',
          description: 'Inventory bin tracking and courier route grouping for Lviv & Kyiv hubs.',
          phaseOrder: 1,
          dueDate: '2026-03-20',
          status: 'completed',
          deliverableUrl: 'https://dispatch.novalogix.lviv.ua/zones',
        },
        {
          id: 'tl_lv_2',
          clientId: lvivClientId,
          productId: 'prod_lv_portal',
          productName: 'B2B Merchant Inventory & Waybill Portal',
          ownerUid: safeUid,
          title: 'Merchant Dashboard & Bulk TTN Waybill Generator',
          description: 'Self-service B2B client cabinet for generating waybills and tracking COD payouts.',
          phaseOrder: 2,
          dueDate: 'Ready for Review',
          status: 'review',
          deliverableUrl: 'https://b2b.novalogix.lviv.ua/shipments',
        },
      ],
      documents: [
        {
          id: 'doc_lv_1',
          clientId: lvivClientId,
          productId: 'prod_lv_crm',
          productName: 'Warehouse & Fleet Dispatch CRM',
          ownerUid: safeUid,
          title: 'Logistics CRM & Nova Poshta API Specification',
          category: 'Architecture Blueprint',
          fileName: 'NovaLogix_API_Blueprint_v1.2.pdf',
          fileSize: '2.9 MB',
          version: 'v1.2',
          status: 'pending_signature',
          uploadedBy: 'Artem K. (Kyiv Engineering)',
          summary: 'Webhook architecture for automated TTN status updates and B2B COD settlement sheets.',
          externalUrl: 'https://docs.brytech.kyiv.ua/blueprints/novalogix-api.pdf',
        },
      ],
      tasks: [
        {
          id: 'tsk_lv_1',
          clientId: lvivClientId,
          productId: 'prod_lv_portal',
          productName: 'B2B Merchant Inventory & Waybill Portal',
          ownerUid: safeUid,
          title: 'Add Excel (.xlsx) bulk shipment import for B2B merchants',
          priority: 'High',
          status: 'In Progress',
          assignee: 'Artem K. (Kyiv Engineering)',
        },
      ],
      automations: [
        {
          id: 'auto_lv_1',
          clientId: lvivClientId,
          ownerUid: safeUid,
          name: 'Telegram Courier Route Dispatch Alert',
          channel: 'Telegram',
          trigger: 'When warehouse manager finalizes morning pallet manifest',
          active: true,
          runsThisMonth: 620,
          template:
            'Маршрут #{route_id} сформовано! Кількість точок доставки: {stops_count}. Натисніть для завантаження накладних.',
        },
      ],
      invoices: [
        {
          id: 'inv_lv_1',
          clientId: lvivClientId,
          ownerUid: safeUid,
          invoiceNumber: 'INV-2026-09',
          title: 'Stage 1: Warehouse Dispatch CRM Core',
          amountUsd: 1100,
          dueDate: '2026-03-15',
          status: 'Paid',
        },
        {
          id: 'inv_lv_2',
          clientId: lvivClientId,
          ownerUid: safeUid,
          invoiceNumber: 'INV-2026-10',
          title: 'Stage 2: B2B Merchant Portal & Bot Handover',
          amountUsd: 1100,
          dueDate: '2026-04-10',
          status: 'Pending',
        },
      ],
      messages: [
        {
          id: 'msg_lv_1',
          clientId: lvivClientId,
          ownerUid: safeUid,
          senderRole: 'admin',
          senderName: 'Artem K. (BryTech Admin)',
          text: 'Вітаємо, Тарасе! Інтеграцію з API Нової Пошти підключено до тестового середовища.',
          sentAtIso: '2026-03-28T11:30:00.000Z',
        },
      ],
    },
  ];
}

export async function saveWorkspaceToFirestore(workspace: HydratedClientWorkspace): Promise<void> {
  const clientId = sanitizeId(workspace.account.id);
  const ownerUid = sanitizeId(workspace.account.ownerUid);

  // Step 1: Create parent /clients/{clientId} document first so exists() passes on subcollections
  const clientPath = `clients/${clientId}`;
  try {
    await setDoc(doc(db, 'clients', clientId), {
      ownerUid,
      businessName: clampString(workspace.account.businessName, BLUEPRINT_CONSTRAINTS.BUSINESS_NAME_MAX),
      contactName: clampString(workspace.account.contactName, BLUEPRINT_CONSTRAINTS.CONTACT_NAME_MAX),
      city: clampString(workspace.account.city, BLUEPRINT_CONSTRAINTS.CITY_MAX),
      market: workspace.account.market,
      planName: clampString(workspace.account.planName, BLUEPRINT_CONSTRAINTS.PLAN_NAME_MAX),
      accountStatus: workspace.account.accountStatus,
      overallProgress: clampInt(workspace.account.overallProgress, 0, 100),
      estimatedAgencyCostUsd: clampInt(workspace.account.estimatedAgencyCostUsd, 0, 10000000),
      brytechTotalPaidUsd: clampInt(workspace.account.brytechTotalPaidUsd, 0, 10000000),
      assignedPm: clampString(workspace.account.assignedPm, BLUEPRINT_CONSTRAINTS.ASSIGNED_PM_MAX),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, clientPath);
  }

  // Step 2: Create isolated PII & credentials document and all Product documents
  const privPath = `clients/${clientId}/private/contact`;
  try {
    await setDoc(doc(db, 'clients', clientId, 'private', 'contact'), {
      clientId,
      ownerUid,
      email: clampString(workspace.privateInfo.email, BLUEPRINT_CONSTRAINTS.EMAIL_MAX, 'client@business.com'),
      phone: clampString(workspace.privateInfo.phone, BLUEPRINT_CONSTRAINTS.PHONE_MAX, '+380 00 000 0000'),
      billingAddress: clampString(workspace.privateInfo.billingAddress, BLUEPRINT_CONSTRAINTS.ADDRESS_MAX, 'Kyiv, Ukraine'),
      loginUsername: clampString(workspace.privateInfo.loginUsername, BLUEPRINT_CONSTRAINTS.LOGIN_USER_MAX, 'client'),
      loginPassword: clampString(workspace.privateInfo.loginPassword, BLUEPRINT_CONSTRAINTS.LOGIN_PASS_MAX, 'pass123!'),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, privPath);
  }

  for (const prod of workspace.products) {
    const prodId = sanitizeId(prod.id);
    const prodPath = `clients/${clientId}/products/${prodId}`;
    try {
      await setDoc(doc(db, 'clients', clientId, 'products', prodId), {
        clientId,
        ownerUid,
        name: clampString(prod.name, BLUEPRINT_CONSTRAINTS.PRODUCT_NAME_MAX),
        type: prod.type,
        domainOrHandle: clampString(prod.domainOrHandle, BLUEPRINT_CONSTRAINTS.DOMAIN_MAX),
        progress: clampInt(prod.progress, 0, 100),
        status: prod.status,
        currentPhase: clampString(prod.currentPhase, BLUEPRINT_CONSTRAINTS.PHASE_MAX),
        leadsOrEventsMonth: clampInt(prod.leadsOrEventsMonth, 0, 100000000),
        metricLabel: clampString(prod.metricLabel, BLUEPRINT_CONSTRAINTS.METRIC_LABEL_MAX),
        maintenanceMode: Boolean(prod.maintenanceMode),
        lastDeploy: clampString(prod.lastDeploy, BLUEPRINT_CONSTRAINTS.LAST_DEPLOY_MAX),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, prodPath);
    }
  }

  // Step 3: Create timelines, documents, tasks, automations, invoices, and chat messages
  for (const tl of workspace.timelines) {
    const tlId = sanitizeId(tl.id);
    const tlPath = `clients/${clientId}/timelines/${tlId}`;
    try {
      await setDoc(doc(db, 'clients', clientId, 'timelines', tlId), {
        clientId,
        productId: sanitizeId(tl.productId),
        productName: clampString(tl.productName, BLUEPRINT_CONSTRAINTS.PRODUCT_NAME_MAX),
        ownerUid,
        title: clampString(tl.title, BLUEPRINT_CONSTRAINTS.TIMELINE_TITLE_MAX),
        description: clampString(tl.description, BLUEPRINT_CONSTRAINTS.TIMELINE_DESC_MAX),
        phaseOrder: clampInt(tl.phaseOrder, 1, 100),
        dueDate: clampString(tl.dueDate, BLUEPRINT_CONSTRAINTS.DUE_DATE_MAX),
        status: tl.status,
        deliverableUrl: clampString(tl.deliverableUrl, BLUEPRINT_CONSTRAINTS.URL_MAX),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, tlPath);
    }
  }

  for (const docItem of workspace.documents) {
    const docId = sanitizeId(docItem.id);
    const docPath = `clients/${clientId}/documents/${docId}`;
    try {
      await setDoc(doc(db, 'clients', clientId, 'documents', docId), {
        clientId,
        productId: sanitizeId(docItem.productId),
        productName: clampString(docItem.productName, BLUEPRINT_CONSTRAINTS.PRODUCT_NAME_MAX),
        ownerUid,
        title: clampString(docItem.title, BLUEPRINT_CONSTRAINTS.DOC_TITLE_MAX),
        category: docItem.category,
        fileName: clampString(docItem.fileName, BLUEPRINT_CONSTRAINTS.FILE_NAME_MAX),
        fileSize: clampString(docItem.fileSize, BLUEPRINT_CONSTRAINTS.FILE_SIZE_MAX),
        version: clampString(docItem.version, BLUEPRINT_CONSTRAINTS.VERSION_MAX),
        status: docItem.status,
        uploadedBy: clampString(docItem.uploadedBy, BLUEPRINT_CONSTRAINTS.UPLOADED_BY_MAX),
        summary: clampString(docItem.summary, BLUEPRINT_CONSTRAINTS.DOC_SUMMARY_MAX),
        externalUrl: clampString(docItem.externalUrl, BLUEPRINT_CONSTRAINTS.DOC_URL_MAX),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, docPath);
    }
  }

  for (const tsk of workspace.tasks) {
    const tskId = sanitizeId(tsk.id);
    const tskPath = `clients/${clientId}/tasks/${tskId}`;
    try {
      await setDoc(doc(db, 'clients', clientId, 'tasks', tskId), {
        clientId,
        productId: sanitizeId(tsk.productId),
        productName: clampString(tsk.productName, BLUEPRINT_CONSTRAINTS.PRODUCT_NAME_MAX),
        ownerUid,
        title: clampString(tsk.title, BLUEPRINT_CONSTRAINTS.TASK_TITLE_MAX),
        priority: tsk.priority,
        status: tsk.status,
        assignee: clampString(tsk.assignee, BLUEPRINT_CONSTRAINTS.ASSIGNEE_MAX),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, tskPath);
    }
  }

  for (const auto of workspace.automations) {
    const autoId = sanitizeId(auto.id);
    const autoPath = `clients/${clientId}/automations/${autoId}`;
    try {
      await setDoc(doc(db, 'clients', clientId, 'automations', autoId), {
        clientId,
        ownerUid,
        name: clampString(auto.name, BLUEPRINT_CONSTRAINTS.AUTO_NAME_MAX),
        channel: auto.channel,
        trigger: clampString(auto.trigger, BLUEPRINT_CONSTRAINTS.AUTO_TRIGGER_MAX),
        active: Boolean(auto.active),
        runsThisMonth: clampInt(auto.runsThisMonth, 0, 100000000),
        template: clampString(auto.template, BLUEPRINT_CONSTRAINTS.AUTO_TEMPLATE_MAX),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, autoPath);
    }
  }

  for (const inv of workspace.invoices) {
    const invId = sanitizeId(inv.id);
    const invPath = `clients/${clientId}/invoices/${invId}`;
    try {
      await setDoc(doc(db, 'clients', clientId, 'invoices', invId), {
        clientId,
        ownerUid,
        invoiceNumber: clampString(inv.invoiceNumber, BLUEPRINT_CONSTRAINTS.INVOICE_NUMBER_MAX),
        title: clampString(inv.title, BLUEPRINT_CONSTRAINTS.INVOICE_TITLE_MAX),
        amountUsd: clampInt(inv.amountUsd, 0, 10000000),
        dueDate: clampString(inv.dueDate, BLUEPRINT_CONSTRAINTS.INVOICE_NUMBER_MAX),
        status: inv.status,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, invPath);
    }
  }

  for (const msg of workspace.messages) {
    const msgId = sanitizeId(msg.id);
    const msgPath = `clients/${clientId}/messages/${msgId}`;
    try {
      await setDoc(doc(db, 'clients', clientId, 'messages', msgId), {
        clientId,
        ownerUid,
        senderRole: msg.senderRole,
        senderName: clampString(msg.senderName, BLUEPRINT_CONSTRAINTS.CHAT_SENDER_MAX),
        text: clampString(msg.text, BLUEPRINT_CONSTRAINTS.CHAT_TEXT_MAX),
        sentAtIso: clampString(msg.sentAtIso, BLUEPRINT_CONSTRAINTS.CHAT_ISO_MAX),
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, msgPath);
    }
  }
}

export async function loadAndEnsureWorkspaces(
  uid: string,
  email?: string | null
): Promise<HydratedClientWorkspace[]> {
  const isBootstrapAdmin = email === 'boris.brigin1@gmail.com';
  const clientsRef = collection(db, 'clients');
  const q = isBootstrapAdmin
    ? query(clientsRef)
    : query(clientsRef, where('ownerUid', '==', uid));

  let clientSnap;
  try {
    clientSnap = await getDocs(q);
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, 'clients');
  }

  if (clientSnap.empty) {
    const initialSeeds = getInitialSeedWorkspaces(uid);
    for (const ws of initialSeeds) {
      await saveWorkspaceToFirestore(ws);
    }
    return initialSeeds;
  }

  const workspaces: HydratedClientWorkspace[] = [];

  for (const clientDoc of clientSnap.docs) {
    const cData = clientDoc.data();
    const clientId = clientDoc.id;
    const ownerUid = String(cData.ownerUid || uid);

    let privateInfo: ClientPrivateContact = {
      clientId,
      ownerUid,
      email: 'client@brytech.ua',
      phone: '+380 67 000 0000',
      billingAddress: String(cData.city || 'Kyiv, Ukraine'),
      loginUsername: clientId.slice(0, 12),
      loginPassword: 'kyiv2026!',
    };
    try {
      const privDoc = await getDoc(doc(db, 'clients', clientId, 'private', 'contact'));
      if (privDoc.exists()) {
        const p = privDoc.data();
        privateInfo = {
          clientId,
          ownerUid,
          email: String(p.email || ''),
          phone: String(p.phone || ''),
          billingAddress: String(p.billingAddress || ''),
          loginUsername: String(p.loginUsername || p.email || clientId),
          loginPassword: String(p.loginPassword || 'kyiv2026!'),
        };
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, `clients/${clientId}/private/contact`);
    }

    const buildSubQuery = (subName: string) => {
      const ref = collection(db, 'clients', clientId, subName);
      return isBootstrapAdmin ? query(ref) : query(ref, where('ownerUid', '==', uid));
    };

    let prodSnap, tlSnap, docSnap, taskSnap, autoSnap, invSnap, msgSnap;
    try {
      [prodSnap, tlSnap, docSnap, taskSnap, autoSnap, invSnap, msgSnap] = await Promise.all([
        getDocs(buildSubQuery('products')),
        getDocs(buildSubQuery('timelines')),
        getDocs(buildSubQuery('documents')),
        getDocs(buildSubQuery('tasks')),
        getDocs(buildSubQuery('automations')),
        getDocs(buildSubQuery('invoices')),
        getDocs(buildSubQuery('messages')),
      ]);
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, `clients/${clientId}/subcollections`);
    }

    const products: ClientProductRecord[] = prodSnap.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        clientId,
        ownerUid,
        name: String(data.name || ''),
        type: data.type as ClientProductRecord['type'],
        domainOrHandle: String(data.domainOrHandle || ''),
        progress: Number(data.progress || 0),
        status: data.status as ClientProductRecord['status'],
        currentPhase: String(data.currentPhase || ''),
        leadsOrEventsMonth: Number(data.leadsOrEventsMonth || 0),
        metricLabel: String(data.metricLabel || ''),
        maintenanceMode: Boolean(data.maintenanceMode),
        lastDeploy: String(data.lastDeploy || ''),
      };
    });

    const timelines: TimelineMilestoneRecord[] = tlSnap.docs
      .map((d) => {
        const data = d.data();
        return {
          id: d.id,
          clientId,
          productId: String(data.productId || ''),
          productName: String(data.productName || ''),
          ownerUid,
          title: String(data.title || ''),
          description: String(data.description || ''),
          phaseOrder: Number(data.phaseOrder || 1),
          dueDate: String(data.dueDate || ''),
          status: data.status as TimelineMilestoneRecord['status'],
          deliverableUrl: String(data.deliverableUrl || ''),
        };
      })
      .sort((a, b) => a.phaseOrder - b.phaseOrder);

    const documents: ClientDocumentRecord[] = docSnap.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        clientId,
        productId: String(data.productId || ''),
        productName: String(data.productName || ''),
        ownerUid,
        title: String(data.title || ''),
        category: data.category as ClientDocumentRecord['category'],
        fileName: String(data.fileName || ''),
        fileSize: String(data.fileSize || ''),
        version: String(data.version || 'v1.0'),
        status: data.status as ClientDocumentRecord['status'],
        uploadedBy: String(data.uploadedBy || ''),
        summary: String(data.summary || ''),
        externalUrl: String(data.externalUrl || ''),
      };
    });

    const tasks: ClientTaskRecord[] = taskSnap.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        clientId,
        productId: String(data.productId || ''),
        productName: String(data.productName || ''),
        ownerUid,
        title: String(data.title || ''),
        priority: data.priority as ClientTaskRecord['priority'],
        status: data.status as ClientTaskRecord['status'],
        assignee: String(data.assignee || ''),
      };
    });

    const automations: ClientAutomationRecord[] = autoSnap.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        clientId,
        ownerUid,
        name: String(data.name || ''),
        channel: data.channel as ClientAutomationRecord['channel'],
        trigger: String(data.trigger || ''),
        active: Boolean(data.active),
        runsThisMonth: Number(data.runsThisMonth || 0),
        template: String(data.template || ''),
      };
    });

    const invoices: ClientInvoiceRecord[] = invSnap.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        clientId,
        ownerUid,
        invoiceNumber: String(data.invoiceNumber || ''),
        title: String(data.title || ''),
        amountUsd: Number(data.amountUsd || 0),
        dueDate: String(data.dueDate || ''),
        status: data.status as ClientInvoiceRecord['status'],
      };
    });

    const messages: ChatMessageRecord[] = msgSnap.docs
      .map((d) => {
        const data = d.data();
        return {
          id: d.id,
          clientId,
          ownerUid,
          senderRole: (data.senderRole === 'admin' ? 'admin' : 'client') as 'client' | 'admin',
          senderName: String(data.senderName || ''),
          text: String(data.text || ''),
          sentAtIso: String(data.sentAtIso || ''),
        };
      })
      .sort((a, b) => a.sentAtIso.localeCompare(b.sentAtIso));

    workspaces.push({
      account: {
        id: clientId,
        ownerUid,
        businessName: String(cData.businessName || ''),
        contactName: String(cData.contactName || ''),
        city: String(cData.city || ''),
        market: (cData.market === 'Israel' ? 'Israel' : 'Ukraine') as 'Ukraine' | 'Israel',
        planName: String(cData.planName || ''),
        accountStatus: (cData.accountStatus || 'active') as ClientAccountRecord['accountStatus'],
        overallProgress: Number(cData.overallProgress || 0),
        estimatedAgencyCostUsd: Number(cData.estimatedAgencyCostUsd || 15000),
        brytechTotalPaidUsd: Number(cData.brytechTotalPaidUsd || 2500),
        assignedPm: String(cData.assignedPm || 'Bohdan Kovalchuk'),
      },
      privateInfo,
      products,
      timelines,
      documents,
      tasks,
      automations,
      invoices,
      messages,
    });
  }

  return workspaces;
}

export async function updateClientProgressInDb(
  clientId: string,
  overallProgress: number
): Promise<void> {
  const path = `clients/${clientId}`;
  try {
    await updateDoc(doc(db, 'clients', sanitizeId(clientId)), {
      overallProgress: clampInt(overallProgress, 0, 100),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

export async function updateClientCredentialsInDb(
  clientId: string,
  info: ClientPrivateContact
): Promise<void> {
  const safeId = sanitizeId(clientId);
  const path = `clients/${safeId}/private/contact`;
  try {
    await updateDoc(doc(db, 'clients', safeId, 'private', 'contact'), {
      email: clampString(info.email, BLUEPRINT_CONSTRAINTS.EMAIL_MAX, 'client@brytech.ua'),
      phone: clampString(info.phone, BLUEPRINT_CONSTRAINTS.PHONE_MAX, '+380 00 000 0000'),
      billingAddress: clampString(info.billingAddress, BLUEPRINT_CONSTRAINTS.ADDRESS_MAX, 'Kyiv'),
      loginUsername: clampString(info.loginUsername, BLUEPRINT_CONSTRAINTS.LOGIN_USER_MAX, 'client'),
      loginPassword: clampString(info.loginPassword, BLUEPRINT_CONSTRAINTS.LOGIN_PASS_MAX, 'pass123!'),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

export async function createProductInDb(product: ClientProductRecord): Promise<void> {
  const clientId = sanitizeId(product.clientId);
  const prodId = sanitizeId(product.id);
  const path = `clients/${clientId}/products/${prodId}`;
  try {
    await setDoc(doc(db, 'clients', clientId, 'products', prodId), {
      clientId,
      ownerUid: sanitizeId(product.ownerUid),
      name: clampString(product.name, BLUEPRINT_CONSTRAINTS.PRODUCT_NAME_MAX),
      type: product.type,
      domainOrHandle: clampString(product.domainOrHandle, BLUEPRINT_CONSTRAINTS.DOMAIN_MAX),
      progress: clampInt(product.progress, 0, 100),
      status: product.status,
      currentPhase: clampString(product.currentPhase, BLUEPRINT_CONSTRAINTS.PHASE_MAX),
      leadsOrEventsMonth: clampInt(product.leadsOrEventsMonth, 0, 100000000),
      metricLabel: clampString(product.metricLabel, BLUEPRINT_CONSTRAINTS.METRIC_LABEL_MAX),
      maintenanceMode: Boolean(product.maintenanceMode),
      lastDeploy: clampString(product.lastDeploy, BLUEPRINT_CONSTRAINTS.LAST_DEPLOY_MAX),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export async function updateProductProgressInDb(
  clientId: string,
  productId: string,
  updates: {
    progress: number;
    status: ClientProductRecord['status'];
    currentPhase: string;
    lastDeploy: string;
  }
): Promise<void> {
  const path = `clients/${clientId}/products/${productId}`;
  try {
    await updateDoc(doc(db, 'clients', sanitizeId(clientId), 'products', sanitizeId(productId)), {
      progress: clampInt(updates.progress, 0, 100),
      status: updates.status,
      currentPhase: clampString(updates.currentPhase, BLUEPRINT_CONSTRAINTS.PHASE_MAX),
      lastDeploy: clampString(updates.lastDeploy, BLUEPRINT_CONSTRAINTS.LAST_DEPLOY_MAX),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

export async function toggleProductMaintenanceInDb(
  clientId: string,
  productId: string,
  maintenanceMode: boolean,
  lastDeploy: string
): Promise<void> {
  const path = `clients/${clientId}/products/${productId}`;
  try {
    await updateDoc(doc(db, 'clients', sanitizeId(clientId), 'products', sanitizeId(productId)), {
      maintenanceMode: Boolean(maintenanceMode),
      lastDeploy: clampString(lastDeploy, BLUEPRINT_CONSTRAINTS.LAST_DEPLOY_MAX),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

export async function createTimelineMilestoneInDb(
  milestone: TimelineMilestoneRecord
): Promise<void> {
  const clientId = sanitizeId(milestone.clientId);
  const tlId = sanitizeId(milestone.id);
  const path = `clients/${clientId}/timelines/${tlId}`;
  try {
    await setDoc(doc(db, 'clients', clientId, 'timelines', tlId), {
      clientId,
      productId: sanitizeId(milestone.productId),
      productName: clampString(milestone.productName, BLUEPRINT_CONSTRAINTS.PRODUCT_NAME_MAX),
      ownerUid: sanitizeId(milestone.ownerUid),
      title: clampString(milestone.title, BLUEPRINT_CONSTRAINTS.TIMELINE_TITLE_MAX),
      description: clampString(milestone.description, BLUEPRINT_CONSTRAINTS.TIMELINE_DESC_MAX),
      phaseOrder: clampInt(milestone.phaseOrder, 1, 100),
      dueDate: clampString(milestone.dueDate, BLUEPRINT_CONSTRAINTS.DUE_DATE_MAX),
      status: milestone.status,
      deliverableUrl: clampString(milestone.deliverableUrl, BLUEPRINT_CONSTRAINTS.URL_MAX),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export async function updateTimelineStatusInDb(
  clientId: string,
  timelineId: string,
  status: TimelineMilestoneRecord['status'],
  dueDate: string
): Promise<void> {
  const path = `clients/${clientId}/timelines/${timelineId}`;
  try {
    await updateDoc(doc(db, 'clients', sanitizeId(clientId), 'timelines', sanitizeId(timelineId)), {
      status,
      dueDate: clampString(dueDate, BLUEPRINT_CONSTRAINTS.DUE_DATE_MAX),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

export async function createDocumentInDb(docRecord: ClientDocumentRecord): Promise<void> {
  const clientId = sanitizeId(docRecord.clientId);
  const docId = sanitizeId(docRecord.id);
  const path = `clients/${clientId}/documents/${docId}`;
  try {
    await setDoc(doc(db, 'clients', clientId, 'documents', docId), {
      clientId,
      productId: sanitizeId(docRecord.productId),
      productName: clampString(docRecord.productName, BLUEPRINT_CONSTRAINTS.PRODUCT_NAME_MAX),
      ownerUid: sanitizeId(docRecord.ownerUid),
      title: clampString(docRecord.title, BLUEPRINT_CONSTRAINTS.DOC_TITLE_MAX),
      category: docRecord.category,
      fileName: clampString(docRecord.fileName, BLUEPRINT_CONSTRAINTS.FILE_NAME_MAX),
      fileSize: clampString(docRecord.fileSize, BLUEPRINT_CONSTRAINTS.FILE_SIZE_MAX),
      version: clampString(docRecord.version, BLUEPRINT_CONSTRAINTS.VERSION_MAX),
      status: docRecord.status,
      uploadedBy: clampString(docRecord.uploadedBy, BLUEPRINT_CONSTRAINTS.UPLOADED_BY_MAX),
      summary: clampString(docRecord.summary, BLUEPRINT_CONSTRAINTS.DOC_SUMMARY_MAX),
      externalUrl: clampString(docRecord.externalUrl, BLUEPRINT_CONSTRAINTS.DOC_URL_MAX),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export async function updateDocumentStatusInDb(
  clientId: string,
  documentId: string,
  status: ClientDocumentRecord['status']
): Promise<void> {
  const path = `clients/${clientId}/documents/${documentId}`;
  try {
    await updateDoc(doc(db, 'clients', sanitizeId(clientId), 'documents', sanitizeId(documentId)), {
      status,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

export async function deleteDocumentInDb(
  clientId: string,
  documentId: string
): Promise<void> {
  const path = `clients/${clientId}/documents/${documentId}`;
  try {
    await deleteDoc(doc(db, 'clients', sanitizeId(clientId), 'documents', sanitizeId(documentId)));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

export async function createTaskInDb(task: ClientTaskRecord): Promise<void> {
  const clientId = sanitizeId(task.clientId);
  const taskId = sanitizeId(task.id);
  const path = `clients/${clientId}/tasks/${taskId}`;
  try {
    await setDoc(doc(db, 'clients', clientId, 'tasks', taskId), {
      clientId,
      productId: sanitizeId(task.productId),
      productName: clampString(task.productName, BLUEPRINT_CONSTRAINTS.PRODUCT_NAME_MAX),
      ownerUid: sanitizeId(task.ownerUid),
      title: clampString(task.title, BLUEPRINT_CONSTRAINTS.TASK_TITLE_MAX),
      priority: task.priority,
      status: task.status,
      assignee: clampString(task.assignee, BLUEPRINT_CONSTRAINTS.ASSIGNEE_MAX),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export async function updateTaskStatusInDb(
  clientId: string,
  taskId: string,
  status: ClientTaskRecord['status'],
  priority: ClientTaskRecord['priority']
): Promise<void> {
  const path = `clients/${clientId}/tasks/${taskId}`;
  try {
    await updateDoc(doc(db, 'clients', sanitizeId(clientId), 'tasks', sanitizeId(taskId)), {
      status,
      priority,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

export async function updateAutomationStateInDb(
  clientId: string,
  automationId: string,
  active: boolean,
  runsThisMonth: number
): Promise<void> {
  const path = `clients/${clientId}/automations/${automationId}`;
  try {
    await updateDoc(
      doc(db, 'clients', sanitizeId(clientId), 'automations', sanitizeId(automationId)),
      {
        active: Boolean(active),
        runsThisMonth: clampInt(runsThisMonth, 0, 100000000),
        updatedAt: serverTimestamp(),
      }
    );
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

export async function updateAutomationTemplateInDb(
  clientId: string,
  automationId: string,
  auto: ClientAutomationRecord
): Promise<void> {
  const path = `clients/${clientId}/automations/${automationId}`;
  try {
    await updateDoc(
      doc(db, 'clients', sanitizeId(clientId), 'automations', sanitizeId(automationId)),
      {
        name: clampString(auto.name, BLUEPRINT_CONSTRAINTS.AUTO_NAME_MAX),
        channel: auto.channel,
        trigger: clampString(auto.trigger, BLUEPRINT_CONSTRAINTS.AUTO_TRIGGER_MAX),
        active: Boolean(auto.active),
        runsThisMonth: clampInt(auto.runsThisMonth, 0, 100000000),
        template: clampString(auto.template, BLUEPRINT_CONSTRAINTS.AUTO_TEMPLATE_MAX),
        updatedAt: serverTimestamp(),
      }
    );
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

export async function payInvoiceInDb(clientId: string, invoiceId: string): Promise<void> {
  const path = `clients/${clientId}/invoices/${invoiceId}`;
  try {
    await updateDoc(doc(db, 'clients', sanitizeId(clientId), 'invoices', sanitizeId(invoiceId)), {
      status: 'Paid',
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

export async function createInvoiceInDb(invoice: ClientInvoiceRecord): Promise<void> {
  const clientId = sanitizeId(invoice.clientId);
  const invId = sanitizeId(invoice.id);
  const path = `clients/${clientId}/invoices/${invId}`;
  try {
    await setDoc(doc(db, 'clients', clientId, 'invoices', invId), {
      clientId,
      ownerUid: sanitizeId(invoice.ownerUid),
      invoiceNumber: clampString(invoice.invoiceNumber, BLUEPRINT_CONSTRAINTS.INVOICE_NUMBER_MAX),
      title: clampString(invoice.title, BLUEPRINT_CONSTRAINTS.INVOICE_TITLE_MAX),
      amountUsd: clampInt(invoice.amountUsd, 0, 10000000),
      dueDate: clampString(invoice.dueDate, BLUEPRINT_CONSTRAINTS.INVOICE_NUMBER_MAX),
      status: invoice.status,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export async function createChatMessageInDb(msg: ChatMessageRecord): Promise<void> {
  const clientId = sanitizeId(msg.clientId);
  const msgId = sanitizeId(msg.id);
  const path = `clients/${clientId}/messages/${msgId}`;
  try {
    await setDoc(doc(db, 'clients', clientId, 'messages', msgId), {
      clientId,
      ownerUid: sanitizeId(msg.ownerUid),
      senderRole: msg.senderRole,
      senderName: clampString(msg.senderName, BLUEPRINT_CONSTRAINTS.CHAT_SENDER_MAX),
      text: clampString(msg.text, BLUEPRINT_CONSTRAINTS.CHAT_TEXT_MAX),
      sentAtIso: clampString(msg.sentAtIso, BLUEPRINT_CONSTRAINTS.CHAT_ISO_MAX),
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}
