import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, sanitizeId } from '../firebase';
import { BryTechLogo } from './BryTechLogo';
import {
  HydratedClientWorkspace,
  ClientProductRecord,
  TimelineMilestoneRecord,
  ClientDocumentRecord,
  ClientTaskRecord,
  ClientAutomationRecord,
  ClientInvoiceRecord,
  ChatMessageRecord,
  getInitialSeedWorkspaces,
  loadAndEnsureWorkspaces,
  saveWorkspaceToFirestore,
  updateClientProgressInDb,
  updateClientCredentialsInDb,
  createProductInDb,
  updateProductProgressInDb,
  toggleProductMaintenanceInDb,
  createTimelineMilestoneInDb,
  updateTimelineStatusInDb,
  createDocumentInDb,
  updateDocumentStatusInDb,
  deleteDocumentInDb,
  createTaskInDb,
  updateTaskStatusInDb,
  updateAutomationStateInDb,
  payInvoiceInDb,
  createInvoiceInDb,
} from '../services/clientDatabase';
import {
  realtimeChatHub,
  ProductNoteRecord,
  ContactChannelsConfig,
  loadSavedContactChannels,
  VisitorChatSessionRecord,
  VisitorChatMessageRecord,
  loadLocalVisitorChatsStore,
} from '../services/realtimeChat';
import { Language, TRANSLATIONS } from '../i18n/translations';
import { useIsMobile } from '../hooks/useIsMobile';
import { BryTechVisualArtwork } from './BryTechVisualArtwork';
import {
  X,
  LayoutDashboard,
  Milestone,
  FileText,
  CheckSquare,
  CreditCard,
  Shield,
  Send,
  Search,
  Lock,
  KeyRound,
  MessageSquare,
  UserPlus,
  Sliders,
  Bell,
  StickyNote,
  Trash2,
  Eye,
  PhoneCall,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

interface ClientAreaPortalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onChangeLang: (lang: Language) => void;
  initialMode?: 'client' | 'admin';
}

type ClientTab =
  | 'dashboard'
  | 'timelines'
  | 'documents'
  | 'tasks'
  | 'chat'
  | 'billing';

type AdminSubTab =
  | 'clients_users'
  | 'visitor_chats'
  | 'product_notes'
  | 'live_chat'
  | 'products_progress'
  | 'timelines_docs'
  | 'tasks_billing'
  | 'contact_channels';

const LOCAL_CREDENTIALS_STORAGE_KEY = 'brytech_client_workspaces_v3';
const LOCAL_NOTES_STORAGE_KEY = 'brytech_product_notes_v3';

export const ClientAreaPortal: React.FC<ClientAreaPortalProps> = ({
  isOpen,
  onClose,
  lang,
  initialMode = 'client',
}) => {
  const t = TRANSLATIONS[lang];
  const isMobile = useIsMobile(768);

  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [dbSyncBadge, setDbSyncBadge] = useState<string>('Connected');

  const [portalMode, setPortalMode] = useState<'client' | 'admin'>(initialMode);

  // Client Authentication State (Strictly Username & Password only)
  const [isClientAuthenticated, setIsClientAuthenticated] = useState<boolean>(false);
  const [loginUsernameInput, setLoginUsernameInput] = useState<string>('');
  const [loginPasswordInput, setLoginPasswordInput] = useState<string>('');
  const [clientLoginError, setClientLoginError] = useState<string | null>(null);

  // Admin Authentication State (Credentials never shared in UI)
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [adminUsernameInput, setAdminUsernameInput] = useState<string>('');
  const [adminPasswordInput, setAdminPasswordInput] = useState<string>('');
  const [adminLoginError, setAdminLoginError] = useState<string | null>(null);

  // Workspaces State
  const [workspaces, setWorkspaces] = useState<HydratedClientWorkspace[]>(() => {
    try {
      const cached = localStorage.getItem(LOCAL_CREDENTIALS_STORAGE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
    return getInitialSeedWorkspaces('demo_user');
  });

  // Product Notes State
  const [productNotes, setProductNotes] = useState<ProductNoteRecord[]>(() => {
    try {
      const cached = localStorage.getItem(LOCAL_NOTES_STORAGE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // ignore
    }
    const seed = getInitialSeedWorkspaces('demo_user');
    const firstClient = seed[0];
    if (!firstClient || !firstClient.products[0]) return [];
    return [
      {
        id: 'note_seed_1',
        clientId: firstClient.account.id,
        clientName: firstClient.account.businessName,
        productId: firstClient.products[0].id,
        productName: firstClient.products[0].name,
        authorName: firstClient.account.contactName,
        text: 'Please add our updated Saturday clinic hours (09:00 - 16:00) to the online booking calendar.',
        createdAtIso: 'Today, 10:15',
        readByAdmin: false,
      },
    ];
  });

  const [selectedClientId, setSelectedClientId] = useState<string>(() => {
    const initial = getInitialSeedWorkspaces('demo_user');
    return initial[0]?.account.id || '';
  });

  // Navigation Tabs
  const [activeTab, setActiveTab] = useState<ClientTab>('dashboard');
  const [adminSubTab, setAdminSubTab] = useState<AdminSubTab>('clients_users');
  const [currency, setCurrency] = useState<'USD' | 'UAH' | 'ILS'>(
    lang === 'uk' ? 'UAH' : lang === 'he' ? 'ILS' : 'USD'
  );

  // Filters & Document Preview
  const [timelineProductFilter, setTimelineProductFilter] = useState<string>('all');
  const [docSearchQuery, setDocSearchQuery] = useState<string>('');
  const [previewDoc, setPreviewDoc] = useState<ClientDocumentRecord | null>(null);
  const [showFloatingChat, setShowFloatingChat] = useState<boolean>(false);

  // Client Product Note Inputs
  const [productNoteDrafts, setProductNoteDrafts] = useState<Record<string, string>>({});
  const [noteSubmittedToast, setNoteSubmittedToast] = useState<string | null>(null);

  // Chat Inputs
  const [clientChatInput, setClientChatInput] = useState('');
  const [adminChatInput, setAdminChatInput] = useState('');
  const [unreadAdminChatCount, setUnreadAdminChatCount] = useState<number>(0);
  const [unreadClientChatCount, setUnreadClientChatCount] = useState<number>(0);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Admin Panel Forms
  const [adminMarketFilter, setAdminMarketFilter] = useState<'All' | 'Ukraine' | 'Israel'>('All');
  const [newClientBiz, setNewClientBiz] = useState('');
  const [newClientContact, setNewClientContact] = useState('');
  const [newClientCity, setNewClientCity] = useState('Kyiv, Ukraine');
  const [newClientMarket, setNewClientMarket] = useState<'Ukraine' | 'Israel'>('Ukraine');
  const [newClientPlan, setNewClientPlan] = useState('Website + Custom CRM + Client Area');
  const [newClientPaid, setNewClientPaid] = useState('2200');
  const [newClientAgency, setNewClientAgency] = useState('14000');
  const [newClientEmail, setNewClientEmail] = useState('');
  const [newClientPhone, setNewClientPhone] = useState('');
  const [newClientUsername, setNewClientUsername] = useState('');
  const [newClientPassword, setNewClientPassword] = useState('');
  const [adminCreatedSuccess, setAdminCreatedSuccess] = useState<string | null>(null);

  // Admin Edit Selected Client Account & Credentials
  const [editClientBiz, setEditClientBiz] = useState('');
  const [editClientContact, setEditClientContact] = useState('');
  const [editClientCity, setEditClientCity] = useState('');
  const [editClientPlan, setEditClientPlan] = useState('');
  const [editClientUsername, setEditClientUsername] = useState('');
  const [editClientPassword, setEditClientPassword] = useState('');

  // Admin Add Product / Milestone / Document / Task / Invoice
  const [adminNewProdName, setAdminNewProdName] = useState('');
  const [adminNewProdType, setAdminNewProdType] =
    useState<ClientProductRecord['type']>('Website');
  const [adminNewProdDomain, setAdminNewProdDomain] = useState('');
  const [adminNewProdPhase, setAdminNewProdPhase] = useState(
    'Phase 1: Architecture & UI Blueprint'
  );
  const [adminNewMilestoneTitle, setAdminNewMilestoneTitle] = useState('');
  const [adminNewMilestoneDesc, setAdminNewMilestoneDesc] = useState('');
  const [adminNewMilestoneDue, setAdminNewMilestoneDue] = useState('May 30, 2026');
  const [adminNewMilestoneProdId, setAdminNewMilestoneProdId] = useState('');
  const [newDocTitle, setNewDocTitle] = useState('');
  const [newDocCategory, setNewDocCategory] =
    useState<ClientDocumentRecord['category']>('Contract & SLA');
  const [newDocFileName, setNewDocFileName] = useState('');
  const [newDocSummary, setNewDocSummary] = useState('');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskPriority, setNewTaskPriority] =
    useState<ClientTaskRecord['priority']>('High');
  const [adminNewInvoiceTitle, setAdminNewInvoiceTitle] = useState('');
  const [adminNewInvoiceAmount, setAdminNewInvoiceAmount] = useState('850');
  const [adminNewInvoiceDue, setAdminNewInvoiceDue] = useState('Jun 05, 2026');

  // Admin Editable Website Contact Buttons (Telegram / WhatsApp / Call)
  const [contactChannelsForm, setContactChannelsForm] =
    useState<ContactChannelsConfig>(() => loadSavedContactChannels());

  // Website Visitor Live Chats (Bot + Human Handoff)
  const [visitorChats, setVisitorChats] = useState<Record<string, VisitorChatSessionRecord>>(
    () => loadLocalVisitorChatsStore()
  );
  const [selectedVisitorId, setSelectedVisitorId] = useState<string>('visitor_demo_1');
  const [adminVisitorReplyInput, setAdminVisitorReplyInput] = useState<string>('');

  useEffect(() => {
    setPortalMode(initialMode);
  }, [initialMode, isOpen]);

  useEffect(() => {
    if (lang === 'uk') setCurrency('UAH');
    else if (lang === 'he') setCurrency('ILS');
    else setCurrency('USD');
  }, [lang]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_CREDENTIALS_STORAGE_KEY, JSON.stringify(workspaces));
    } catch {
      // ignore
    }
  }, [workspaces]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_NOTES_STORAGE_KEY, JSON.stringify(productNotes));
    } catch {
      // ignore
    }
  }, [productNotes]);

  useEffect(() => {
    const unsubMsg = realtimeChatHub.onMessage((incomingMsg) => {
      setWorkspaces((prev) =>
        prev.map((w) => {
          if (w.account.id !== incomingMsg.clientId) return w;
          if (w.messages.some((m) => m.id === incomingMsg.id)) return w;
          return {
            ...w,
            messages: [...w.messages, incomingMsg],
          };
        })
      );

      if (incomingMsg.senderRole === 'client') {
        setUnreadAdminChatCount((c) => c + 1);
      } else {
        setUnreadClientChatCount((c) => c + 1);
      }
    });

    const unsubNote = realtimeChatHub.onProductNote((incomingNote) => {
      setProductNotes((prev) => {
        if (prev.some((n) => n.id === incomingNote.id)) return prev;
        return [incomingNote, ...prev];
      });
    });

    const unsubInit = realtimeChatHub.onInitStore((allByClient) => {
      setWorkspaces((prev) =>
        prev.map((w) => {
          const serverMsgs = allByClient[w.account.id] || [];
          if (serverMsgs.length === 0) return w;
          const merged = [...w.messages];
          for (const sm of serverMsgs) {
            if (!merged.some((m) => m.id === sm.id)) {
              merged.push(sm);
            }
          }
          return { ...w, messages: merged };
        })
      );
    });

    const unsubNotesInit = realtimeChatHub.onNotesInit((serverNotes) => {
      if (serverNotes && serverNotes.length > 0) {
        setProductNotes((prev) => {
          const merged = [...prev];
          for (const sn of serverNotes) {
            if (!merged.some((n) => n.id === sn.id)) {
              merged.unshift(sn);
            }
          }
          return merged;
        });
      }
    });

    return () => {
      unsubMsg();
      unsubNote();
      unsubInit();
      unsubNotesInit();
    };
  }, []);

  useEffect(() => {
    setContactChannelsForm(loadSavedContactChannels());
    const unsubChannels = realtimeChatHub.onContactChannels((updated) => {
      setContactChannelsForm(updated);
    });
    const unsubVisitorInit = realtimeChatHub.onVisitorChatsInit((allSessions) => {
      setVisitorChats(allSessions);
      const keys = Object.keys(allSessions);
      if (keys.length > 0) {
        setSelectedVisitorId((prev) => (allSessions[prev] ? prev : keys[0]));
      }
    });
    const unsubVisitorUpdate = realtimeChatHub.onVisitorChatUpdate((session) => {
      setVisitorChats((prev) => ({
        ...prev,
        [session.visitorId]: session,
      }));
      setSelectedVisitorId((prev) => (prev ? prev : session.visitorId));
    });
    return () => {
      unsubChannels();
      unsubVisitorInit();
      unsubVisitorUpdate();
    };
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeTab, adminSubTab, showFloatingChat, selectedClientId, workspaces]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        try {
          const loaded = await loadAndEnsureWorkspaces(
            firebaseUser.uid,
            firebaseUser.email
          );
          if (loaded.length > 0) {
            setWorkspaces(loaded);
            setSelectedClientId(loaded[0].account.id);
          }
          setDbSyncBadge('Cloud Synced');
        } catch {
          setDbSyncBadge('Live Ready');
        }
      }
    });
    return () => unsub();
  }, []);

  const currentWorkspace = useMemo(() => {
    return (
      workspaces.find((w) => w.account.id === selectedClientId) || workspaces[0]
    );
  }, [workspaces, selectedClientId]);

  useEffect(() => {
    if (currentWorkspace) {
      setEditClientBiz(currentWorkspace.account.businessName);
      setEditClientContact(currentWorkspace.account.contactName);
      setEditClientCity(currentWorkspace.account.city);
      setEditClientPlan(currentWorkspace.account.planName);
      setEditClientUsername(currentWorkspace.privateInfo.loginUsername);
      setEditClientPassword(currentWorkspace.privateInfo.loginPassword);
      if (currentWorkspace.products.length > 0) {
        setAdminNewMilestoneProdId(currentWorkspace.products[0].id);
      }
    }
  }, [currentWorkspace]);

  if (!isOpen || !currentWorkspace) return null;

  const formatMoney = (usd: number) => {
    if (currency === 'UAH') return `${Math.round(usd * 41).toLocaleString()} ₴`;
    if (currency === 'ILS') return `₪${Math.round(usd * 3.7).toLocaleString()}`;
    return `$${usd.toLocaleString()}`;
  };

  const notifySynced = (label = 'Saved & Synced') => {
    setDbSyncBadge(label);
    setTimeout(() => {
      setDbSyncBadge(user ? 'Cloud Synced' : 'Live Ready');
    }, 2200);
  };

  const updateCurrentWorkspaceState = (
    updater: (ws: HydratedClientWorkspace) => HydratedClientWorkspace
  ) => {
    setWorkspaces((prev) =>
      prev.map((w) => (w.account.id === currentWorkspace.account.id ? updater(w) : w))
    );
  };

  const handleClientCredentialsLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setClientLoginError(null);
    const trimmedUser = loginUsernameInput.trim().toLowerCase();
    const trimmedPass = loginPasswordInput.trim();

    const matchedWorkspace = workspaces.find(
      (w) =>
        w.privateInfo.loginUsername.trim().toLowerCase() === trimmedUser &&
        w.privateInfo.loginPassword === trimmedPass
    );

    if (!matchedWorkspace) {
      setClientLoginError('Invalid username or password. Please contact your account administrator.');
      return;
    }

    setSelectedClientId(matchedWorkspace.account.id);
    setIsClientAuthenticated(true);
    setActiveTab('dashboard');
    setLoginPasswordInput('');
  };

  const handleAdminCredentialsLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminLoginError(null);
    if (
      adminUsernameInput.trim() === 'Admin' &&
      adminPasswordInput === 'bobiN10312!'
    ) {
      setIsAdminAuthenticated(true);
      setPortalMode('admin');
      setAdminPasswordInput('');
    } else {
      setAdminLoginError('Invalid administrator credentials.');
    }
  };

  const handleClientAddProductNote = async (prod: ClientProductRecord) => {
    const draft = (productNoteDrafts[prod.id] || '').trim();
    if (!draft) return;

    const newNote: ProductNoteRecord = {
      id: sanitizeId(`note_${Date.now()}`),
      clientId: currentWorkspace.account.id,
      clientName: currentWorkspace.account.businessName,
      productId: prod.id,
      productName: prod.name,
      authorName: currentWorkspace.account.contactName,
      text: draft,
      createdAtIso: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      readByAdmin: false,
    };

    setProductNoteDrafts((prev) => ({ ...prev, [prod.id]: '' }));
    await realtimeChatHub.sendProductNote(newNote);

    setNoteSubmittedToast(`Note added to "${prod.name}" and sent to Admin.`);
    setTimeout(() => setNoteSubmittedToast(null), 3500);
  };

  const handleSendClientChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientChatInput.trim()) return;
    const msg: ChatMessageRecord = {
      id: sanitizeId(`msg_${Date.now()}`),
      clientId: currentWorkspace.account.id,
      ownerUid: currentWorkspace.account.ownerUid,
      senderRole: 'client',
      senderName: `${currentWorkspace.account.contactName} (${currentWorkspace.account.businessName})`,
      text: clientChatInput.trim(),
      sentAtIso: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
    setClientChatInput('');
    await realtimeChatHub.sendMessage(msg, Boolean(user));
  };

  const handleSendAdminChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminChatInput.trim()) return;
    const msg: ChatMessageRecord = {
      id: sanitizeId(`msg_${Date.now()}`),
      clientId: currentWorkspace.account.id,
      ownerUid: currentWorkspace.account.ownerUid,
      senderRole: 'admin',
      senderName: 'Bohdan Kovalchuk (BryTech Admin)',
      text: adminChatInput.trim(),
      sentAtIso: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
    setAdminChatInput('');
    await realtimeChatHub.sendMessage(msg, Boolean(user));
    notifySynced('Reply Sent');
  };

  const handleAdminMarkNoteRead = (noteId: string) => {
    setProductNotes((prev) =>
      prev.map((n) => (n.id === noteId ? { ...n, readByAdmin: true } : n))
    );
  };

  const handleAdminDeleteNote = (noteId: string) => {
    setProductNotes((prev) => prev.filter((n) => n.id !== noteId));
  };

  const handleAdminCreateClientUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientBiz.trim() || !newClientContact.trim() || !newClientUsername.trim()) {
      return;
    }

    const ownerUid = user ? user.uid : 'demo_user';
    const newId = sanitizeId(`client_${Date.now()}`);
    const prodId = sanitizeId(`prod_${Date.now()}`);
    const cleanUsername = newClientUsername.trim();
    const cleanPassword = newClientPassword.trim() || 'brytech2026!';

    const newWs: HydratedClientWorkspace = {
      account: {
        id: newId,
        ownerUid: sanitizeId(ownerUid),
        businessName: newClientBiz.trim(),
        contactName: newClientContact.trim(),
        city: newClientCity.trim() || 'Kyiv, Ukraine',
        market: newClientMarket,
        planName: newClientPlan.trim(),
        accountStatus: 'onboarding',
        overallProgress: 20,
        estimatedAgencyCostUsd: Number(newClientAgency) || 14000,
        brytechTotalPaidUsd: Number(newClientPaid) || 2200,
        assignedPm: 'Bohdan Kovalchuk (Kyiv Hub)',
      },
      privateInfo: {
        clientId: newId,
        ownerUid: sanitizeId(ownerUid),
        email: newClientEmail.trim() || 'founder@client.ua',
        phone: newClientPhone.trim() || '+380 67 000 0000',
        billingAddress: newClientCity.trim() || 'Kyiv, Ukraine',
        loginUsername: cleanUsername,
        loginPassword: cleanPassword,
      },
      products: [
        {
          id: prodId,
          clientId: newId,
          ownerUid: sanitizeId(ownerUid),
          name: `${newClientBiz.trim()} Core Platform`,
          type: 'Website',
          domainOrHandle: `${cleanUsername.toLowerCase()}.com`,
          progress: 20,
          status: 'onboarding',
          currentPhase: 'Phase 1: Discovery & System Blueprint',
          leadsOrEventsMonth: 0,
          metricLabel: 'Active Users',
          maintenanceMode: false,
          lastDeploy: 'Initialized Today',
        },
      ],
      timelines: [
        {
          id: sanitizeId(`tl_${Date.now()}`),
          clientId: newId,
          productId: prodId,
          productName: `${newClientBiz.trim()} Core Platform`,
          ownerUid: sanitizeId(ownerUid),
          title: 'Phase 1: Architecture & Data Modeling',
          description: 'Initial schema, UI wireframes, and regional gateway setup.',
          phaseOrder: 1,
          dueDate: 'Next Week',
          status: 'in_progress',
          deliverableUrl: 'https://brytech.ua/specs/phase-1',
        },
      ],
      documents: [
        {
          id: sanitizeId(`doc_${Date.now()}`),
          clientId: newId,
          productId: prodId,
          productName: `${newClientBiz.trim()} Core Platform`,
          ownerUid: sanitizeId(ownerUid),
          title: 'Master Service Agreement & Architecture Scope',
          category: 'Contract & SLA',
          fileName: 'BryTech-MSA-2026.pdf',
          fileSize: '1.1 MB',
          version: 'v1.0',
          status: 'pending_signature',
          uploadedBy: 'Bohdan Kovalchuk (PM)',
          summary: 'Fixed-price agreement and full source-code ownership terms.',
          externalUrl: 'https://brytech.ua/docs/msa.pdf',
        },
      ],
      tasks: [
        {
          id: sanitizeId(`task_${Date.now()}`),
          clientId: newId,
          productId: prodId,
          productName: `${newClientBiz.trim()} Core Platform`,
          ownerUid: sanitizeId(ownerUid),
          title: 'Configure domain DNS & brand assets upload',
          priority: 'High',
          status: 'In Progress',
          assignee: 'Kyiv DevOps',
        },
      ],
      automations: [
        {
          id: sanitizeId(`auto_${Date.now()}`),
          clientId: newId,
          ownerUid: sanitizeId(ownerUid),
          name: 'Instant Lead Alert Bot',
          channel: newClientMarket === 'Ukraine' ? 'Telegram' : 'WhatsApp',
          trigger: 'When a new lead submits booking form',
          active: true,
          runsThisMonth: 1,
          template: 'New lead received for {business_name}: {client_phone}',
        },
      ],
      invoices: [
        {
          id: sanitizeId(`inv_${Date.now()}`),
          clientId: newId,
          ownerUid: sanitizeId(ownerUid),
          invoiceNumber: `INV-2026-${Math.floor(100 + Math.random() * 899)}`,
          title: 'Phase 1 Onboarding Deposit (50%)',
          amountUsd: Math.round((Number(newClientPaid) || 2200) / 2),
          dueDate: 'Upon Onboarding',
          status: 'Pending',
        },
      ],
      messages: [
        {
          id: sanitizeId(`msg_${Date.now()}`),
          clientId: newId,
          ownerUid: sanitizeId(ownerUid),
          senderRole: 'admin',
          senderName: 'Bohdan Kovalchuk (BryTech Admin)',
          text: `Welcome to BryTech, ${newClientContact.trim()}! Your Client Area account is active. You can add notes to any product or chat with us here.`,
          sentAtIso: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        },
      ],
    };

    setWorkspaces((prev) => [newWs, ...prev]);
    setSelectedClientId(newId);
    setAdminCreatedSuccess(
      `Client user "${cleanUsername}" created! They can now sign in via the Client Area login popup.`
    );
    setTimeout(() => setAdminCreatedSuccess(null), 6000);

    setNewClientBiz('');
    setNewClientContact('');
    setNewClientEmail('');
    setNewClientPhone('');
    setNewClientUsername('');
    setNewClientPassword('');

    if (user) {
      await saveWorkspaceToFirestore(newWs);
    }
    notifySynced('Client User Created');
  };

  const handleAdminSaveClientProfileAndCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editClientUsername.trim() || !editClientPassword.trim()) return;
    const updatedInfo = {
      ...currentWorkspace.privateInfo,
      loginUsername: editClientUsername.trim(),
      loginPassword: editClientPassword.trim(),
    };
    updateCurrentWorkspaceState((ws) => ({
      ...ws,
      account: {
        ...ws.account,
        businessName: editClientBiz.trim() || ws.account.businessName,
        contactName: editClientContact.trim() || ws.account.contactName,
        city: editClientCity.trim() || ws.account.city,
        planName: editClientPlan.trim() || ws.account.planName,
      },
      privateInfo: updatedInfo,
    }));
    if (user) {
      await updateClientCredentialsInDb(currentWorkspace.account.id, updatedInfo);
    }
    notifySynced('Client Profile & Login Updated');
  };

  const handleAdminDeleteClient = (clientIdToDelete: string) => {
    if (workspaces.length <= 1) return;
    const remaining = workspaces.filter((w) => w.account.id !== clientIdToDelete);
    setWorkspaces(remaining);
    if (selectedClientId === clientIdToDelete && remaining[0]) {
      setSelectedClientId(remaining[0].account.id);
    }
    notifySynced('Client Removed');
  };

  const handleAdminUpdateOverallProgress = async (nextVal: number) => {
    updateCurrentWorkspaceState((ws) => ({
      ...ws,
      account: { ...ws.account, overallProgress: nextVal },
    }));
    if (user) {
      await updateClientProgressInDb(currentWorkspace.account.id, nextVal);
    }
    notifySynced();
  };

  const handleAdminUpdateProductProgress = async (
    prod: ClientProductRecord,
    nextProgress: number,
    nextStatus?: ClientProductRecord['status'],
    nextPhase?: string
  ) => {
    const statusToUse =
      nextStatus || (nextProgress === 100 ? 'live' : prod.status);
    const phaseToUse = nextPhase !== undefined ? nextPhase : prod.currentPhase;

    updateCurrentWorkspaceState((ws) => {
      const updatedProducts = ws.products.map((p) =>
        p.id === prod.id
          ? {
              ...p,
              progress: nextProgress,
              status: statusToUse,
              currentPhase: phaseToUse,
              lastDeploy: 'Updated by Admin',
            }
          : p
      );
      const avg =
        updatedProducts.length > 0
          ? Math.round(
              updatedProducts.reduce((acc, item) => acc + item.progress, 0) /
                updatedProducts.length
            )
          : ws.account.overallProgress;

      return {
        ...ws,
        account: { ...ws.account, overallProgress: avg },
        products: updatedProducts,
      };
    });

    if (user) {
      await updateProductProgressInDb(currentWorkspace.account.id, prod.id, {
        progress: nextProgress,
        status: statusToUse,
        currentPhase: phaseToUse,
        lastDeploy: 'Updated by Admin',
      });
    }
    notifySynced();
  };

  const handleAdminToggleMaintenance = async (prod: ClientProductRecord) => {
    const nextMode = !prod.maintenanceMode;
    updateCurrentWorkspaceState((ws) => ({
      ...ws,
      products: ws.products.map((p) =>
        p.id === prod.id
          ? { ...p, maintenanceMode: nextMode, lastDeploy: 'Admin Toggled' }
          : p
      ),
    }));
    if (user) {
      await toggleProductMaintenanceInDb(
        currentWorkspace.account.id,
        prod.id,
        nextMode,
        'Admin Toggled'
      );
    }
    notifySynced();
  };

  const handleAdminDeleteProduct = (productId: string) => {
    updateCurrentWorkspaceState((ws) => ({
      ...ws,
      products: ws.products.filter((p) => p.id !== productId),
    }));
    notifySynced('Product Deleted');
  };

  const handleAdminAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminNewProdName.trim()) return;
    const newProd: ClientProductRecord = {
      id: sanitizeId(`prod_${Date.now()}`),
      clientId: currentWorkspace.account.id,
      ownerUid: currentWorkspace.account.ownerUid,
      name: adminNewProdName.trim(),
      type: adminNewProdType,
      domainOrHandle: adminNewProdDomain.trim() || 'system.brytech.ua',
      progress: 20,
      status: 'in_progress',
      currentPhase: adminNewProdPhase.trim() || 'Phase 1: Setup',
      leadsOrEventsMonth: 0,
      metricLabel: 'Monthly Events',
      maintenanceMode: false,
      lastDeploy: 'Just added',
    };

    updateCurrentWorkspaceState((ws) => ({
      ...ws,
      products: [...ws.products, newProd],
    }));
    setAdminNewProdName('');
    setAdminNewProdDomain('');

    if (user) {
      await createProductInDb(newProd);
    }
    notifySynced('Product Added');
  };

  const handleAdminAddMilestone = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminNewMilestoneTitle.trim()) return;
    const prod =
      currentWorkspace.products.find((p) => p.id === adminNewMilestoneProdId) ||
      currentWorkspace.products[0];
    if (!prod) return;

    const newMs: TimelineMilestoneRecord = {
      id: sanitizeId(`tl_${Date.now()}`),
      clientId: currentWorkspace.account.id,
      productId: prod.id,
      productName: prod.name,
      ownerUid: currentWorkspace.account.ownerUid,
      title: adminNewMilestoneTitle.trim(),
      description:
        adminNewMilestoneDesc.trim() ||
        'Milestone deliverable scheduled by BryTech PM.',
      phaseOrder: currentWorkspace.timelines.length + 1,
      dueDate: adminNewMilestoneDue.trim() || 'Upcoming',
      status: 'in_progress',
      deliverableUrl: 'https://brytech.ua/deliverables/preview',
    };

    updateCurrentWorkspaceState((ws) => ({
      ...ws,
      timelines: [...ws.timelines, newMs],
    }));
    setAdminNewMilestoneTitle('');
    setAdminNewMilestoneDesc('');

    if (user) {
      await createTimelineMilestoneInDb(newMs);
    }
    notifySynced('Milestone Added');
  };

  const handleAdminUpdateMilestoneStatus = async (
    ms: TimelineMilestoneRecord,
    nextStatus: TimelineMilestoneRecord['status']
  ) => {
    updateCurrentWorkspaceState((ws) => ({
      ...ws,
      timelines: ws.timelines.map((tl) =>
        tl.id === ms.id ? { ...tl, status: nextStatus } : tl
      ),
    }));
    if (user) {
      await updateTimelineStatusInDb(
        currentWorkspace.account.id,
        ms.id,
        nextStatus,
        ms.dueDate
      );
    }
    notifySynced();
  };

  const handleAdminDeleteMilestone = (milestoneId: string) => {
    updateCurrentWorkspaceState((ws) => ({
      ...ws,
      timelines: ws.timelines.filter((tl) => tl.id !== milestoneId),
    }));
    notifySynced('Milestone Removed');
  };

  const handleAdminUploadDocument = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocTitle.trim()) return;
    const targetProduct =
      currentWorkspace.products[0] || {
        id: 'prod_general',
        name: 'Core Business System',
      };
    const safeFileName =
      newDocFileName.trim() ||
      `${newDocTitle.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-')}.pdf`;

    const newDoc: ClientDocumentRecord = {
      id: sanitizeId(`doc_${Date.now()}`),
      clientId: currentWorkspace.account.id,
      productId: targetProduct.id,
      productName: targetProduct.name,
      ownerUid: currentWorkspace.account.ownerUid,
      title: newDocTitle.trim(),
      category: newDocCategory,
      fileName: safeFileName,
      fileSize: '1.2 MB',
      version: 'v1.0',
      status: 'approved',
      uploadedBy: 'BryTech Engineering Hub',
      summary:
        newDocSummary.trim() ||
        'Published specification & operational document via BryTech Admin.',
      externalUrl: `https://brytech.ua/docs/${safeFileName}`,
    };

    updateCurrentWorkspaceState((ws) => ({
      ...ws,
      documents: [newDoc, ...ws.documents],
    }));
    setNewDocTitle('');
    setNewDocFileName('');
    setNewDocSummary('');

    if (user) {
      await createDocumentInDb(newDoc);
    }
    notifySynced('Document Published');
  };

  const handleAdminUpdateDocumentStatus = async (
    docItem: ClientDocumentRecord,
    nextStatus: ClientDocumentRecord['status']
  ) => {
    updateCurrentWorkspaceState((ws) => ({
      ...ws,
      documents: ws.documents.map((d) =>
        d.id === docItem.id ? { ...d, status: nextStatus } : d
      ),
    }));
    if (user) {
      await updateDocumentStatusInDb(
        currentWorkspace.account.id,
        docItem.id,
        nextStatus
      );
    }
    notifySynced();
  };

  const handleAdminDeleteDocument = async (docItem: ClientDocumentRecord) => {
    updateCurrentWorkspaceState((ws) => ({
      ...ws,
      documents: ws.documents.filter((d) => d.id !== docItem.id),
    }));
    if (user) {
      await deleteDocumentInDb(currentWorkspace.account.id, docItem.id);
    }
    notifySynced('Document Deleted');
  };

  const handleAdminCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    const prod = currentWorkspace.products[0];
    const newTask: ClientTaskRecord = {
      id: sanitizeId(`task_${Date.now()}`),
      clientId: currentWorkspace.account.id,
      productId: prod ? prod.id : 'prod_general',
      productName: prod ? prod.name : 'System Core',
      ownerUid: currentWorkspace.account.ownerUid,
      title: newTaskTitle.trim(),
      priority: newTaskPriority,
      status: 'In Progress',
      assignee: 'BryTech Kyiv Engineering Team',
    };

    updateCurrentWorkspaceState((ws) => ({
      ...ws,
      tasks: [newTask, ...ws.tasks],
    }));
    setNewTaskTitle('');
    if (user) {
      await createTaskInDb(newTask);
    }
    notifySynced('Task Created');
  };

  const handleAdminCycleTaskStatus = async (task: ClientTaskRecord) => {
    const nextStatus: ClientTaskRecord['status'] =
      task.status === 'In Progress'
        ? 'Ready for Review'
        : task.status === 'Ready for Review'
        ? 'Completed'
        : 'In Progress';

    updateCurrentWorkspaceState((ws) => ({
      ...ws,
      tasks: ws.tasks.map((tItem) =>
        tItem.id === task.id ? { ...tItem, status: nextStatus } : tItem
      ),
    }));
    if (user) {
      await updateTaskStatusInDb(
        currentWorkspace.account.id,
        task.id,
        nextStatus,
        task.priority
      );
    }
    notifySynced();
  };

  const handleAdminDeleteTask = (taskId: string) => {
    updateCurrentWorkspaceState((ws) => ({
      ...ws,
      tasks: ws.tasks.filter((tk) => tk.id !== taskId),
    }));
    notifySynced('Task Deleted');
  };

  const handleAdminCreateInvoice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminNewInvoiceTitle.trim()) return;
    const newInv: ClientInvoiceRecord = {
      id: sanitizeId(`inv_${Date.now()}`),
      clientId: currentWorkspace.account.id,
      ownerUid: currentWorkspace.account.ownerUid,
      invoiceNumber: `INV-2026-${Math.floor(100 + Math.random() * 899)}`,
      title: adminNewInvoiceTitle.trim(),
      amountUsd: Number(adminNewInvoiceAmount) || 500,
      dueDate: adminNewInvoiceDue.trim() || 'In 14 Days',
      status: 'Pending',
    };

    updateCurrentWorkspaceState((ws) => ({
      ...ws,
      invoices: [newInv, ...ws.invoices],
    }));
    setAdminNewInvoiceTitle('');
    if (user) {
      await createInvoiceInDb(newInv);
    }
    notifySynced('Invoice Issued');
  };

  const handleAdminToggleInvoicePaid = async (inv: ClientInvoiceRecord) => {
    const nextStatus: ClientInvoiceRecord['status'] =
      inv.status === 'Paid' ? 'Pending' : 'Paid';
    updateCurrentWorkspaceState((ws) => ({
      ...ws,
      invoices: ws.invoices.map((i) =>
        i.id === inv.id ? { ...i, status: nextStatus } : i
      ),
    }));
    if (user && nextStatus === 'Paid') {
      await payInvoiceInDb(currentWorkspace.account.id, inv.id);
    }
    notifySynced();
  };

  // Filtered lists
  const filteredTimelines = currentWorkspace.timelines.filter((tl) =>
    timelineProductFilter === 'all' ? true : tl.productId === timelineProductFilter
  );

  const filteredDocuments = currentWorkspace.documents.filter((d) => {
    return (
      !docSearchQuery.trim() ||
      d.title.toLowerCase().includes(docSearchQuery.toLowerCase()) ||
      d.fileName.toLowerCase().includes(docSearchQuery.toLowerCase()) ||
      d.productName.toLowerCase().includes(docSearchQuery.toLowerCase())
    );
  });

  const filteredAdminWorkspaces = workspaces.filter((w) =>
    adminMarketFilter === 'All' ? true : w.account.market === adminMarketFilter
  );

  const unreadProductNotesCount = productNotes.filter((n) => !n.readByAdmin).length;
  const visitorChatList: VisitorChatSessionRecord[] = Object.values(visitorChats);
  const unreadVisitorChatsCount = visitorChatList.reduce(
    (acc, s) => acc + (s.unreadForAdmin || 0),
    0
  );
  const activeVisitorSession: VisitorChatSessionRecord | undefined =
    visitorChats[selectedVisitorId] || visitorChatList[0];

  const handleAdminSendVisitorReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminVisitorReplyInput.trim() || !activeVisitorSession) return;
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const replyMsg: VisitorChatMessageRecord = {
      id: `vmsg_admin_${Date.now()}`,
      visitorId: activeVisitorSession.visitorId,
      senderRole: 'admin',
      senderName: 'Lead System Architect (BryTech)',
      text: adminVisitorReplyInput.trim(),
      sentAtIso: nowTime,
    };
    const updatedSession: VisitorChatSessionRecord = {
      ...activeVisitorSession,
      mode: 'human',
      unreadForAdmin: 0,
      updatedAtIso: nowTime,
      messages: [...activeVisitorSession.messages, replyMsg],
    };
    setAdminVisitorReplyInput('');
    await realtimeChatHub.sendVisitorChatSession(updatedSession);
    notifySynced('Visitor Reply Sent');
  };

  const savingsUsd =
    currentWorkspace.account.estimatedAgencyCostUsd -
    currentWorkspace.account.brytechTotalPaidUsd;

  // ============================================================================
  // VIEW 1: APPLE-STYLE CLIENT LOGIN POPUP (Strictly Username & Password only)
  // ============================================================================
  if (portalMode === 'client' && !isClientAuthenticated) {
    return (
      <div
        dir={t.dir}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-xl p-4 overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-label="Client Area Login Popup"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 18 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-md rounded-[32px] bg-white border border-black/[0.08] shadow-[0_32px_80px_rgba(0,0,0,0.18)] overflow-hidden my-auto"
        >
          {/* Popup Header */}
          <div className="px-7 pt-7 pb-5 flex items-center justify-between border-b border-black/[0.06]">
            <div className="flex items-center gap-3.5">
              <BryTechLogo theme="light-surface" size="md" showWordmark={false} />
              <div>
                <span className="text-xs font-semibold text-[#0071e3] block">
                  BryTech Client Portal
                </span>
                <h2 className="text-xl font-bold tracking-tight text-[#1d1d1f] m-0">
                  Client Area Sign In
                </h2>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[#6e6e73] hover:text-[#1d1d1f] flex items-center justify-center cursor-pointer transition-colors"
              aria-label="Close Login Popup"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Strictly Username & Password Form */}
          <form onSubmit={handleClientCredentialsLogin} className="p-7 space-y-5">
            <div>
              <label className="block text-xs font-semibold text-[#6e6e73] mb-2">
                Username
              </label>
              <input
                type="text"
                required
                autoComplete="username"
                value={loginUsernameInput}
                onChange={(e) => setLoginUsernameInput(e.target.value)}
                placeholder="Enter your username"
                className="w-full px-4 py-3.5 rounded-2xl bg-[#f5f5f7] border border-transparent focus:border-[#0071e3] focus:bg-white text-sm text-[#1d1d1f] focus:outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#6e6e73] mb-2">
                Password
              </label>
              <input
                type="password"
                required
                autoComplete="current-password"
                value={loginPasswordInput}
                onChange={(e) => setLoginPasswordInput(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3.5 rounded-2xl bg-[#f5f5f7] border border-transparent focus:border-[#0071e3] focus:bg-white text-sm text-[#1d1d1f] focus:outline-none transition-all"
              />
            </div>

            {clientLoginError && (
              <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-xs font-semibold text-red-600">
                {clientLoginError}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-4 px-6 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#0071e3]/25 cursor-pointer transition-all"
            >
              <KeyRound className="w-4 h-4" />
              <span>Sign In to Client Area</span>
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // ============================================================================
  // VIEW 2: APPLE-STYLE ADMIN LOGIN GATE (Never exposes credentials)
  // ============================================================================
  if (portalMode === 'admin' && !isAdminAuthenticated) {
    return (
      <div
        dir={t.dir}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xl p-4 overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-label="Admin Authorization"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.28 }}
          className="relative w-full max-w-md rounded-[32px] bg-[#1d1d1f] text-white border border-white/15 shadow-2xl overflow-hidden"
        >
          <div className="px-7 pt-7 pb-5 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-[#0071e3] text-white flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-semibold text-[#15BCDF] block">
                  Restricted Executive Access
                </span>
                <h2 className="text-xl font-bold tracking-tight m-0">
                  Admin Authentication
                </h2>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleAdminCredentialsLogin} className="p-7 space-y-5">
            <div>
              <label className="block text-xs font-semibold text-white/70 mb-2">
                Username
              </label>
              <input
                type="text"
                required
                autoComplete="off"
                value={adminUsernameInput}
                onChange={(e) => setAdminUsernameInput(e.target.value)}
                placeholder="Enter username"
                className="w-full px-4 py-3.5 rounded-2xl bg-white/10 border border-white/15 text-white text-sm focus:outline-none focus:border-[#0071e3]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/70 mb-2">
                Password
              </label>
              <input
                type="password"
                required
                autoComplete="off"
                value={adminPasswordInput}
                onChange={(e) => setAdminPasswordInput(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3.5 rounded-2xl bg-white/10 border border-white/15 text-white text-sm focus:outline-none focus:border-[#0071e3]"
              />
            </div>

            {adminLoginError && (
              <div className="p-3.5 rounded-2xl bg-red-500/20 border border-red-400/50 text-xs font-semibold text-red-200">
                {adminLoginError}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-4 px-6 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer transition-all shadow-lg shadow-[#0071e3]/25"
            >
              <Shield className="w-4 h-4" />
              <span>Sign In to Admin Panel</span>
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // ============================================================================
  // VIEW 3: FULL-PAGE APPLE/ALTEG.IO ADMIN COMMAND CENTER
  // ============================================================================
  if (portalMode === 'admin' && isAdminAuthenticated) {
    return (
      <div
        dir={t.dir}
        className="fixed inset-0 z-50 w-screen h-screen bg-[#f5f5f7] text-[#1d1d1f] flex flex-col overflow-hidden"
      >
        {/* Full-Page Frosted Apple Admin Header */}
        <header className="bg-white/90 backdrop-blur-xl px-6 py-4 border-b border-black/[0.07] flex flex-wrap items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3.5">
            <BryTechLogo theme="light-surface" size="md" showWordmark={false} />
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-lg sm:text-xl font-bold tracking-tight text-[#1d1d1f] m-0">
                  BryTech Executive Admin Center
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
                  {dbSyncBadge}
                </span>
              </div>
              <span className="text-xs text-[#6e6e73] block">
                Manage Client Logins, Product Notes, Progress Sliders, Roadmaps, Documents, Billing &amp; Contact Channels
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Unread Client Product Notes Notification Button */}
            <button
              type="button"
              onClick={() => setAdminSubTab('product_notes')}
              className={`px-4 py-2.5 rounded-full text-xs font-semibold flex items-center gap-2 border cursor-pointer transition-all ${
                unreadProductNotesCount > 0
                  ? 'bg-amber-50 border-amber-300 text-amber-800 shadow-xs'
                  : 'bg-[#f5f5f7] border-black/[0.06] text-[#1d1d1f] hover:bg-[#e8e8ed]'
              }`}
            >
              <Bell className="w-4 h-4 text-[#0071e3]" />
              <span>Product Notes ({unreadProductNotesCount} Unread)</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setIsAdminAuthenticated(false);
                onClose();
              }}
              className="px-4 py-2.5 rounded-full bg-[#1d1d1f] hover:bg-red-600 text-white text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
              <span>Exit Admin</span>
            </button>
          </div>
        </header>

        {/* Full-Page Body: Left Sidebar + Main Management Viewport */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Admin Sidebar */}
          <aside className="w-full lg:w-72 bg-white border-b lg:border-b-0 lg:border-e border-black/[0.07] p-4 sm:p-5 flex flex-col justify-between shrink-0 overflow-y-auto">
            <div className="space-y-5">
              {/* Active Client Selector */}
              <div className="p-4 rounded-2xl bg-[#f5f5f7] border border-black/[0.05] space-y-2">
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#0071e3]">
                  Active Client Workspace
                </label>
                <select
                  value={currentWorkspace.account.id}
                  onChange={(e) => setSelectedClientId(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-white border border-black/[0.1] text-xs sm:text-sm font-bold text-[#1d1d1f] focus:outline-none focus:border-[#0071e3]"
                >
                  {workspaces.map((w) => (
                    <option key={w.account.id} value={w.account.id}>
                      {w.account.businessName} ({w.privateInfo.loginUsername})
                    </option>
                  ))}
                </select>
                <div className="text-xs text-[#6e6e73] pt-1">
                  Contact: <strong className="text-[#1d1d1f]">{currentWorkspace.account.contactName}</strong>
                </div>
              </div>

              {/* Admin Modules Navigation */}
              <nav className="flex lg:flex-col gap-1.5 overflow-x-auto">
                {[
                  {
                    id: 'clients_users',
                    label: '1. Clients & Logins',
                    icon: UserPlus,
                  },
                  {
                    id: 'visitor_chats',
                    label: '2. Visitor Live Chats',
                    icon: Sparkles,
                    badge: unreadVisitorChatsCount,
                  },
                  {
                    id: 'product_notes',
                    label: '3. Product Notes',
                    icon: StickyNote,
                    badge: unreadProductNotesCount,
                  },
                  {
                    id: 'live_chat',
                    label: '4. Client Area Chat',
                    icon: MessageSquare,
                    badge: unreadAdminChatCount,
                  },
                  {
                    id: 'products_progress',
                    label: '5. Products & Progress',
                    icon: Sliders,
                  },
                  {
                    id: 'timelines_docs',
                    label: '6. Timelines & Docs',
                    icon: Milestone,
                  },
                  {
                    id: 'tasks_billing',
                    label: '7. Tasks & Billing',
                    icon: CreditCard,
                  },
                  {
                    id: 'contact_channels',
                    label: '8. Contact Buttons',
                    icon: PhoneCall,
                  },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const active = adminSubTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => {
                        setAdminSubTab(tab.id as AdminSubTab);
                        if (tab.id === 'live_chat') setUnreadAdminChatCount(0);
                      }}
                      className={`px-4 py-3 rounded-2xl text-xs sm:text-sm font-semibold flex items-center justify-between gap-2 cursor-pointer whitespace-nowrap transition-all ${
                        active
                          ? 'bg-[#0071e3] text-white shadow-sm'
                          : 'text-[#424245] hover:bg-[#f5f5f7]'
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4 shrink-0" />
                        <span>{tab.label}</span>
                      </span>
                      {tab.badge ? (
                        <span
                          className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                            active
                              ? 'bg-white text-[#0071e3]'
                              : 'bg-amber-500 text-white'
                          }`}
                        >
                          {tab.badge}
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="hidden lg:block pt-4 border-t border-black/[0.06] text-xs text-[#6e6e73]">
              Managed Clients: <strong className="text-[#1d1d1f]">{workspaces.length}</strong>
            </div>
          </aside>

          {/* Admin Full-Page Main Content */}
          <main className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6">
            {unreadProductNotesCount > 0 && adminSubTab !== 'product_notes' && (
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-amber-600 shrink-0" />
                  <span className="text-sm font-semibold text-amber-900">
                    You have {unreadProductNotesCount} unread Product Note(s) from clients waiting for review.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setAdminSubTab('product_notes')}
                  className="px-4 py-2 rounded-full bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold cursor-pointer"
                >
                  View Product Notes →
                </button>
              </div>
            )}

            {adminCreatedSuccess && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold flex items-center justify-between">
                <span>{adminCreatedSuccess}</span>
                <button
                  type="button"
                  onClick={() => setAdminCreatedSuccess(null)}
                  className="text-emerald-900 underline ms-4 cursor-pointer"
                >
                  Dismiss
                </button>
              </div>
            )}

            {/* ADMIN MODULE 1: CLIENTS & LOGINS */}
            {adminSubTab === 'clients_users' && (
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                <div className="xl:col-span-7 space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h2 className="text-xl font-bold tracking-tight text-[#1d1d1f] m-0">
                      Client Directory ({filteredAdminWorkspaces.length})
                    </h2>
                    <div className="inline-flex items-center gap-1 bg-white p-1 rounded-full border border-black/[0.07]">
                      {(['All', 'Ukraine', 'Israel'] as const).map((m) => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => setAdminMarketFilter(m)}
                          className={`px-3.5 py-1 rounded-full text-xs font-semibold cursor-pointer ${
                            adminMarketFilter === m
                              ? 'bg-[#1d1d1f] text-white'
                              : 'text-[#6e6e73]'
                          }`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    {filteredAdminWorkspaces.map((ws) => {
                      const isSel = ws.account.id === currentWorkspace.account.id;
                      const clientNotesCount = productNotes.filter(
                        (n) => n.clientId === ws.account.id
                      ).length;
                      return (
                        <div
                          key={ws.account.id}
                          onClick={() => setSelectedClientId(ws.account.id)}
                          className={`p-5 rounded-3xl border transition-all cursor-pointer ${
                            isSel
                              ? 'bg-white border-[#0071e3] shadow-md'
                              : 'bg-white/75 border-black/[0.06] hover:bg-white'
                          }`}
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                            <div>
                              <span className="text-base font-bold text-[#1d1d1f]">
                                {ws.account.businessName}
                              </span>
                              <span className="text-sm text-[#6e6e73] ms-2">
                                · {ws.account.contactName} ({ws.account.city})
                              </span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="px-3 py-1 rounded-full bg-[#0071e3]/10 text-[#0071e3] text-xs font-bold tabular-nums">
                                {ws.account.overallProgress}% Complete
                              </span>
                              {workspaces.length > 1 && (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleAdminDeleteClient(ws.account.id);
                                  }}
                                  className="p-1.5 text-[#86868b] hover:text-red-500 cursor-pointer"
                                  title="Delete Client"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-3 border-t border-black/[0.05] text-xs">
                            <div className="rounded-xl bg-[#f5f5f7] px-3 py-2">
                              <span className="text-[#6e6e73]">Username: </span>
                              <strong className="text-[#0071e3] font-mono">
                                {ws.privateInfo.loginUsername}
                              </strong>
                            </div>
                            <div className="rounded-xl bg-[#f5f5f7] px-3 py-2">
                              <span className="text-[#6e6e73]">Password: </span>
                              <strong className="text-[#1d1d1f] font-mono">
                                {ws.privateInfo.loginPassword}
                              </strong>
                            </div>
                            <div className="rounded-xl bg-[#f5f5f7] px-3 py-2 flex items-center justify-between">
                              <span className="text-[#6e6e73]">Activity:</span>
                              <strong className="text-[#1d1d1f]">
                                {clientNotesCount} notes · {ws.messages.length} msgs
                              </strong>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Edit Selected Client Details & Login Credentials */}
                  <form
                    onSubmit={handleAdminSaveClientProfileAndCredentials}
                    className="p-6 rounded-3xl bg-white border border-black/[0.06] space-y-4 shadow-xs"
                  >
                    <div className="text-sm font-bold text-[#0071e3]">
                      Edit Selected Client Profile &amp; Login — {currentWorkspace.account.businessName}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#6e6e73] mb-1">
                          Business Name
                        </label>
                        <input
                          type="text"
                          value={editClientBiz}
                          onChange={(e) => setEditClientBiz(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#f5f5f7] border border-transparent focus:border-[#0071e3] text-sm text-[#1d1d1f]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#6e6e73] mb-1">
                          Contact Name
                        </label>
                        <input
                          type="text"
                          value={editClientContact}
                          onChange={(e) => setEditClientContact(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#f5f5f7] border border-transparent focus:border-[#0071e3] text-sm text-[#1d1d1f]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#0071e3] mb-1">
                          Client Login Username
                        </label>
                        <input
                          type="text"
                          required
                          value={editClientUsername}
                          onChange={(e) => setEditClientUsername(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#f5f5f7] border border-[#0071e3]/40 text-sm text-[#1d1d1f] font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#0071e3] mb-1">
                          Client Login Password
                        </label>
                        <input
                          type="text"
                          required
                          value={editClientPassword}
                          onChange={(e) => setEditClientPassword(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#f5f5f7] border border-[#0071e3]/40 text-sm text-[#1d1d1f] font-mono"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs sm:text-sm font-semibold cursor-pointer"
                    >
                      Save Client Profile &amp; Credentials
                    </button>
                  </form>
                </div>

                {/* Create New Client User & Workspace */}
                <form
                  onSubmit={handleAdminCreateClientUser}
                  className="xl:col-span-5 p-6 sm:p-7 rounded-3xl bg-white border border-black/[0.06] shadow-xs space-y-4 h-fit"
                >
                  <div className="flex items-center gap-2 text-base font-bold text-[#1d1d1f]">
                    <UserPlus className="w-5 h-5 text-[#0071e3]" />
                    <span>Create New Client User &amp; Workspace</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-[#6e6e73] mb-1">
                        Business Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={newClientBiz}
                        onChange={(e) => setNewClientBiz(e.target.value)}
                        placeholder="e.g. Kyiv Dental Studio"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#f5f5f7] text-sm text-[#1d1d1f]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#6e6e73] mb-1">
                        Contact Person *
                      </label>
                      <input
                        type="text"
                        required
                        value={newClientContact}
                        onChange={(e) => setNewClientContact(e.target.value)}
                        placeholder="e.g. Iryna Bondar"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#f5f5f7] text-sm text-[#1d1d1f]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 rounded-2xl bg-[#0071e3]/[0.06] p-4 border border-[#0071e3]/20">
                    <div>
                      <label className="block text-xs font-bold text-[#0071e3] mb-1">
                        Assign Client Username *
                      </label>
                      <input
                        type="text"
                        required
                        value={newClientUsername}
                        onChange={(e) => setNewClientUsername(e.target.value)}
                        placeholder="e.g. kyivdental"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#0071e3]/30 text-sm text-[#1d1d1f] font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#0071e3] mb-1">
                        Assign Client Password *
                      </label>
                      <input
                        type="text"
                        required
                        value={newClientPassword}
                        onChange={(e) => setNewClientPassword(e.target.value)}
                        placeholder="e.g. dental2026!"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#0071e3]/30 text-sm text-[#1d1d1f] font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-[#6e6e73] mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        value={newClientCity}
                        onChange={(e) => setNewClientCity(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#f5f5f7] text-sm text-[#1d1d1f]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#6e6e73] mb-1">
                        Market
                      </label>
                      <select
                        value={newClientMarket}
                        onChange={(e) =>
                          setNewClientMarket(e.target.value as 'Ukraine' | 'Israel')
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#f5f5f7] text-sm text-[#1d1d1f]"
                      >
                        <option value="Ukraine">Ukraine</option>
                        <option value="Israel">Israel</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#6e6e73] mb-1">
                      System Package Plan
                    </label>
                    <input
                      type="text"
                      value={newClientPlan}
                      onChange={(e) => setNewClientPlan(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#f5f5f7] text-sm text-[#1d1d1f]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-[#6e6e73] mb-1">
                        BryTech Price ($ USD)
                      </label>
                      <input
                        type="number"
                        value={newClientPaid}
                        onChange={(e) => setNewClientPaid(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#f5f5f7] text-sm text-[#1d1d1f]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#6e6e73] mb-1">
                        Est. Agency Cost ($ USD)
                      </label>
                      <input
                        type="number"
                        value={newClientAgency}
                        onChange={(e) => setNewClientAgency(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#f5f5f7] text-sm text-[#1d1d1f]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-semibold text-sm cursor-pointer transition-colors shadow-sm"
                  >
                    + Create Client User &amp; Provision Portal
                  </button>
                </form>
              </div>
            )}

            {/* ADMIN MODULE 2: CLIENT PRODUCT NOTES & NOTIFICATIONS */}
            {adminSubTab === 'product_notes' && (
              <div className="space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-white p-6 border border-black/[0.06]">
                  <div>
                    <h2 className="text-xl font-bold text-[#1d1d1f] m-0">
                      Client Product Notes &amp; Notifications ({productNotes.length})
                    </h2>
                    <p className="text-sm text-[#6e6e73] m-0 mt-1">
                      Every note added by a client to any of their products appears here with real-time notifications.
                    </p>
                  </div>
                  {unreadProductNotesCount > 0 && (
                    <button
                      type="button"
                      onClick={() =>
                        setProductNotes((prev) =>
                          prev.map((n) => ({ ...n, readByAdmin: true }))
                        )
                      }
                      className="px-4 py-2.5 rounded-full bg-[#0071e3] text-white text-xs font-semibold cursor-pointer"
                    >
                      Mark All as Read
                    </button>
                  )}
                </div>

                {productNotes.length === 0 ? (
                  <div className="p-10 rounded-3xl bg-white border border-black/[0.06] text-center text-sm text-[#6e6e73]">
                    No product notes submitted by clients yet.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {productNotes.map((note) => (
                      <div
                        key={note.id}
                        className={`p-6 rounded-3xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                          !note.readByAdmin
                            ? 'bg-white border-[#0071e3] shadow-sm'
                            : 'bg-white/80 border-black/[0.06]'
                        }`}
                      >
                        <div className="space-y-1.5">
                          <div className="flex flex-wrap items-center gap-2 text-xs">
                            {!note.readByAdmin && (
                              <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold">
                                NEW NOTE
                              </span>
                            )}
                            <span className="font-bold text-[#0071e3]">
                              {note.clientName}
                            </span>
                            <span className="text-[#86868b]">·</span>
                            <span className="font-semibold text-[#1d1d1f]">
                              Product: {note.productName}
                            </span>
                            <span className="text-[#86868b]">·</span>
                            <span className="text-[#6e6e73]">
                              By {note.authorName} at {note.createdAtIso}
                            </span>
                          </div>
                          <p className="text-base text-[#1d1d1f] font-medium m-0 leading-relaxed">
                            "{note.text}"
                          </p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {!note.readByAdmin && (
                            <button
                              type="button"
                              onClick={() => handleAdminMarkNoteRead(note.id)}
                              className="px-4 py-2 rounded-full bg-[#0071e3] text-white text-xs font-semibold cursor-pointer"
                            >
                              ✓ Mark Read
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedClientId(note.clientId);
                              setAdminSubTab('live_chat');
                              handleAdminMarkNoteRead(note.id);
                            }}
                            className="px-4 py-2 rounded-full bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[#1d1d1f] text-xs font-semibold cursor-pointer"
                          >
                            Reply in Chat
                          </button>
                          <button
                            type="button"
                            onClick={() => handleAdminDeleteNote(note.id)}
                            className="p-2 text-[#86868b] hover:text-red-500 cursor-pointer"
                            title="Delete Note"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ADMIN MODULE 3: DIRECT LIVE CHAT */}
            {adminSubTab === 'live_chat' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[74vh]">
                <div className="lg:col-span-4 rounded-3xl bg-white border border-black/[0.06] p-5 overflow-y-auto space-y-2.5">
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#0071e3] mb-3">
                    Active Client Conversations
                  </div>
                  {workspaces.map((ws) => {
                    const lastMsg = ws.messages[ws.messages.length - 1];
                    const isSel = ws.account.id === currentWorkspace.account.id;
                    return (
                      <button
                        key={ws.account.id}
                        type="button"
                        onClick={() => setSelectedClientId(ws.account.id)}
                        className={`w-full text-start p-4 rounded-2xl border transition-all cursor-pointer ${
                          isSel
                            ? 'bg-[#0071e3]/[0.08] border-[#0071e3]'
                            : 'bg-[#f5f5f7] border-transparent hover:bg-[#ebebf0]'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm font-bold text-[#1d1d1f]">
                            {ws.account.businessName}
                          </span>
                          <span className="text-xs text-[#0071e3] font-semibold">
                            {ws.messages.length} msgs
                          </span>
                        </div>
                        <div className="text-xs text-[#6e6e73] truncate mt-1">
                          {lastMsg
                            ? `${lastMsg.senderRole === 'client' ? 'Client: ' : 'You: '}${lastMsg.text}`
                            : 'No messages yet'}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="lg:col-span-8 rounded-3xl bg-white border border-black/[0.06] flex flex-col h-full overflow-hidden shadow-xs">
                  <div className="p-5 border-b border-black/[0.06] flex items-center justify-between">
                    <div>
                      <div className="text-base font-bold text-[#1d1d1f]">
                        Live Chat with {currentWorkspace.account.businessName}
                      </div>
                      <div className="text-xs text-[#6e6e73]">
                        Contact: {currentWorkspace.account.contactName} · Login: {currentWorkspace.privateInfo.loginUsername}
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700">
                      Real-Time Connected
                    </span>
                  </div>

                  <div className="flex-1 p-5 overflow-y-auto space-y-3.5 bg-[#f5f5f7]">
                    {currentWorkspace.messages.map((m) => {
                      const isFromAdmin = m.senderRole === 'admin';
                      return (
                        <div
                          key={m.id}
                          className={`flex flex-col ${
                            isFromAdmin ? 'items-end' : 'items-start'
                          }`}
                        >
                          <div className="text-[11px] text-[#6e6e73] mb-1">
                            {m.senderName} · {m.sentAtIso}
                          </div>
                          <div
                            className={`max-w-lg px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                              isFromAdmin
                                ? 'bg-[#0071e3] text-white font-medium'
                                : 'bg-white text-[#1d1d1f] border border-black/[0.06]'
                            }`}
                          >
                            {m.text}
                          </div>
                        </div>
                      );
                    })}
                    <div ref={chatEndRef} />
                  </div>

                  <form
                    onSubmit={handleSendAdminChat}
                    className="p-4 bg-white border-t border-black/[0.06] flex items-center gap-3"
                  >
                    <input
                      type="text"
                      value={adminChatInput}
                      onChange={(e) => setAdminChatInput(e.target.value)}
                      placeholder={`Reply directly to ${currentWorkspace.account.contactName}...`}
                      className="flex-1 px-4 py-3 rounded-full bg-[#f5f5f7] text-sm text-[#1d1d1f] focus:outline-none focus:ring-2 focus:ring-[#0071e3]"
                    />
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs sm:text-sm font-semibold flex items-center gap-2 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send Reply</span>
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* ADMIN MODULE 4: PRODUCTS & COMPLETION SLIDERS */}
            {adminSubTab === 'products_progress' && (
              <div className="space-y-6">
                <div className="p-6 rounded-3xl bg-white border border-black/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-semibold text-[#0071e3]">
                      Master Account Completion — {currentWorkspace.account.businessName}
                    </div>
                    <div className="text-2xl sm:text-3xl font-bold text-[#1d1d1f] tabular-nums mt-1">
                      {currentWorkspace.account.overallProgress}% Overall Progress
                    </div>
                  </div>
                  <div className="w-full sm:w-80">
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={currentWorkspace.account.overallProgress}
                      onChange={(e) =>
                        handleAdminUpdateOverallProgress(Number(e.target.value))
                      }
                      className="w-full accent-[#0071e3] cursor-pointer"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {currentWorkspace.products.map((prod) => {
                    const prodNotes = productNotes.filter(
                      (n) =>
                        n.clientId === currentWorkspace.account.id &&
                        n.productId === prod.id
                    );
                    return (
                      <div
                        key={prod.id}
                        className="p-6 rounded-3xl bg-white border border-black/[0.06] space-y-4"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="text-xs font-semibold text-[#0071e3] block">
                              {prod.type} · {prod.domainOrHandle}
                            </span>
                            <h4 className="text-lg font-bold text-[#1d1d1f] m-0 mt-0.5">
                              {prod.name}
                            </h4>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xl font-bold text-[#0071e3] tabular-nums">
                              {prod.progress}%
                            </span>
                            <button
                              type="button"
                              onClick={() => handleAdminDeleteProduct(prod.id)}
                              className="p-1.5 text-[#86868b] hover:text-red-500 cursor-pointer"
                              title="Delete Product"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <input
                          type="range"
                          min={0}
                          max={100}
                          value={prod.progress}
                          onChange={(e) =>
                            handleAdminUpdateProductProgress(
                              prod,
                              Number(e.target.value)
                            )
                          }
                          className="w-full accent-[#0071e3] cursor-pointer"
                        />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <select
                            value={prod.status}
                            onChange={(e) =>
                              handleAdminUpdateProductProgress(
                                prod,
                                prod.progress,
                                e.target.value as ClientProductRecord['status']
                              )
                            }
                            className="px-3.5 py-2.5 rounded-xl bg-[#f5f5f7] text-sm text-[#1d1d1f]"
                          >
                            <option value="onboarding">onboarding</option>
                            <option value="in_progress">in_progress</option>
                            <option value="review">review</option>
                            <option value="live">live</option>
                          </select>
                          <input
                            type="text"
                            value={prod.currentPhase}
                            onChange={(e) =>
                              handleAdminUpdateProductProgress(
                                prod,
                                prod.progress,
                                prod.status,
                                e.target.value
                              )
                            }
                            className="px-3.5 py-2.5 rounded-xl bg-[#f5f5f7] text-sm text-[#1d1d1f]"
                          />
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-black/[0.06]">
                          <span className="text-xs text-[#6e6e73]">
                            Client Notes on product: <strong className="text-[#0071e3]">{prodNotes.length}</strong>
                          </span>
                          <button
                            type="button"
                            onClick={() => handleAdminToggleMaintenance(prod)}
                            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-pointer ${
                              prod.maintenanceMode
                                ? 'bg-amber-500 text-white'
                                : 'bg-[#f5f5f7] text-[#1d1d1f]'
                            }`}
                          >
                            {prod.maintenanceMode ? 'Maintenance ON' : 'Live Mode'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <form
                  onSubmit={handleAdminAddProduct}
                  className="p-6 rounded-3xl bg-white border border-black/[0.06] grid grid-cols-1 sm:grid-cols-5 gap-4 items-end"
                >
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-[#6e6e73] mb-1">
                      New Product Name
                    </label>
                    <input
                      type="text"
                      required
                      value={adminNewProdName}
                      onChange={(e) => setAdminNewProdName(e.target.value)}
                      placeholder="e.g. WhatsApp Booking Bot"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#f5f5f7] text-sm text-[#1d1d1f]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#6e6e73] mb-1">
                      Type
                    </label>
                    <select
                      value={adminNewProdType}
                      onChange={(e) =>
                        setAdminNewProdType(
                          e.target.value as ClientProductRecord['type']
                        )
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#f5f5f7] text-sm text-[#1d1d1f]"
                    >
                      <option value="Website">Website</option>
                      <option value="CRM">CRM</option>
                      <option value="Client Area">Client Area</option>
                      <option value="Automation Bot">Automation Bot</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#6e6e73] mb-1">
                      Domain / Handle
                    </label>
                    <input
                      type="text"
                      value={adminNewProdDomain}
                      onChange={(e) => setAdminNewProdDomain(e.target.value)}
                      placeholder="crm.domain.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#f5f5f7] text-sm text-[#1d1d1f]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="py-2.5 px-4 rounded-full bg-[#0071e3] text-white font-semibold text-sm cursor-pointer"
                  >
                    + Add Product
                  </button>
                </form>
              </div>
            )}

            {/* ADMIN MODULE 5: TIMELINES & DOCUMENTS */}
            {adminSubTab === 'timelines_docs' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <form
                    onSubmit={handleAdminAddMilestone}
                    className="p-6 rounded-3xl bg-white border border-black/[0.06] space-y-3.5"
                  >
                    <div className="text-sm font-bold text-[#0071e3]">
                      Add Project Milestone — {currentWorkspace.account.businessName}
                    </div>
                    <input
                      type="text"
                      required
                      value={adminNewMilestoneTitle}
                      onChange={(e) => setAdminNewMilestoneTitle(e.target.value)}
                      placeholder="Milestone Title *"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#f5f5f7] text-sm text-[#1d1d1f]"
                    />
                    <input
                      type="text"
                      value={adminNewMilestoneDesc}
                      onChange={(e) => setAdminNewMilestoneDesc(e.target.value)}
                      placeholder="Deliverable details"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#f5f5f7] text-sm text-[#1d1d1f]"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={adminNewMilestoneDue}
                        onChange={(e) => setAdminNewMilestoneDue(e.target.value)}
                        placeholder="Due Date"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#f5f5f7] text-sm text-[#1d1d1f]"
                      />
                      <button
                        type="submit"
                        className="py-2.5 px-4 rounded-full bg-[#0071e3] text-white font-semibold text-sm cursor-pointer"
                      >
                        + Add Milestone
                      </button>
                    </div>
                  </form>

                  <div className="space-y-2.5">
                    {currentWorkspace.timelines.map((ms) => (
                      <div
                        key={ms.id}
                        className="p-4 rounded-2xl bg-white border border-black/[0.06] flex flex-wrap items-center justify-between gap-3"
                      >
                        <div>
                          <div className="text-xs text-[#0071e3] font-semibold">
                            {ms.productName} · Due: {ms.dueDate}
                          </div>
                          <div className="text-sm font-bold text-[#1d1d1f]">{ms.title}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <select
                            value={ms.status}
                            onChange={(e) =>
                              handleAdminUpdateMilestoneStatus(
                                ms,
                                e.target.value as TimelineMilestoneRecord['status']
                              )
                            }
                            className="px-3 py-1.5 rounded-xl bg-[#f5f5f7] text-xs font-semibold text-[#1d1d1f]"
                          >
                            <option value="upcoming">upcoming</option>
                            <option value="in_progress">in_progress</option>
                            <option value="review">review</option>
                            <option value="completed">completed</option>
                          </select>
                          <button
                            type="button"
                            onClick={() => handleAdminDeleteMilestone(ms.id)}
                            className="p-1.5 text-[#86868b] hover:text-red-500 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <form
                    onSubmit={handleAdminUploadDocument}
                    className="p-6 rounded-3xl bg-white border border-black/[0.06] space-y-3.5"
                  >
                    <div className="text-sm font-bold text-[#0071e3]">
                      Publish Document to Client Vault
                    </div>
                    <input
                      type="text"
                      required
                      value={newDocTitle}
                      onChange={(e) => setNewDocTitle(e.target.value)}
                      placeholder="Document Title *"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#f5f5f7] text-sm text-[#1d1d1f]"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <select
                        value={newDocCategory}
                        onChange={(e) =>
                          setNewDocCategory(
                            e.target.value as ClientDocumentRecord['category']
                          )
                        }
                        className="px-3.5 py-2.5 rounded-xl bg-[#f5f5f7] text-sm text-[#1d1d1f]"
                      >
                        <option value="Contract & SLA">Contract &amp; SLA</option>
                        <option value="Architecture Blueprint">Architecture Blueprint</option>
                        <option value="Invoice & Receipt">Invoice &amp; Receipt</option>
                        <option value="Brand & Assets">Brand &amp; Assets</option>
                        <option value="User Manual & Training">User Manual &amp; Training</option>
                      </select>
                      <input
                        type="text"
                        value={newDocFileName}
                        onChange={(e) => setNewDocFileName(e.target.value)}
                        placeholder="Spec-2026.pdf"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#f5f5f7] text-sm text-[#1d1d1f]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-2.5 px-4 rounded-full bg-[#0071e3] text-white font-semibold text-sm cursor-pointer"
                    >
                      + Publish Document
                    </button>
                  </form>

                  <div className="space-y-2.5">
                    {currentWorkspace.documents.map((docItem) => (
                      <div
                        key={docItem.id}
                        className="p-4 rounded-2xl bg-white border border-black/[0.06] flex flex-wrap items-center justify-between gap-3"
                      >
                        <div>
                          <div className="text-xs text-[#0071e3] font-semibold">
                            {docItem.category} · {docItem.fileName}
                          </div>
                          <div className="text-sm font-bold text-[#1d1d1f]">{docItem.title}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <select
                            value={docItem.status}
                            onChange={(e) =>
                              handleAdminUpdateDocumentStatus(
                                docItem,
                                e.target.value as ClientDocumentRecord['status']
                              )
                            }
                            className="px-3 py-1.5 rounded-xl bg-[#f5f5f7] text-xs font-semibold text-[#1d1d1f]"
                          >
                            <option value="draft">draft</option>
                            <option value="pending_signature">pending_signature</option>
                            <option value="approved">approved</option>
                            <option value="archived">archived</option>
                          </select>
                          <button
                            type="button"
                            onClick={() => handleAdminDeleteDocument(docItem)}
                            className="p-1.5 text-[#86868b] hover:text-red-500 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ADMIN MODULE 6: TASKS & BILLING */}
            {adminSubTab === 'tasks_billing' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <form
                    onSubmit={handleAdminCreateTask}
                    className="p-6 rounded-3xl bg-white border border-black/[0.06] space-y-3.5"
                  >
                    <div className="text-sm font-bold text-[#0071e3]">
                      Assign Engineering Task
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        required
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        placeholder="Task description..."
                        className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#f5f5f7] text-sm text-[#1d1d1f]"
                      />
                      <select
                        value={newTaskPriority}
                        onChange={(e) =>
                          setNewTaskPriority(
                            e.target.value as ClientTaskRecord['priority']
                          )
                        }
                        className="px-3 py-2.5 rounded-xl bg-[#f5f5f7] text-sm text-[#1d1d1f]"
                      >
                        <option value="Normal">Normal</option>
                        <option value="High">High</option>
                        <option value="Urgent">Urgent</option>
                      </select>
                      <button
                        type="submit"
                        className="px-4 py-2.5 rounded-full bg-[#0071e3] text-white font-semibold text-xs cursor-pointer"
                      >
                        + Add
                      </button>
                    </div>
                  </form>

                  <div className="space-y-2.5">
                    {currentWorkspace.tasks.map((tk) => (
                      <div
                        key={tk.id}
                        className="p-4 rounded-2xl bg-white border border-black/[0.06] flex items-center justify-between gap-3"
                      >
                        <div>
                          <span className="text-xs font-semibold text-[#0071e3]">
                            {tk.priority} · {tk.productName}
                          </span>
                          <div className="text-sm font-bold text-[#1d1d1f]">{tk.title}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleAdminCycleTaskStatus(tk)}
                            className="px-3.5 py-1.5 rounded-full bg-[#0071e3]/10 text-[#0071e3] text-xs font-semibold cursor-pointer"
                          >
                            {tk.status}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleAdminDeleteTask(tk.id)}
                            className="p-1.5 text-[#86868b] hover:text-red-500 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <form
                    onSubmit={handleAdminCreateInvoice}
                    className="p-6 rounded-3xl bg-white border border-black/[0.06] space-y-3.5"
                  >
                    <div className="text-sm font-bold text-[#0071e3]">
                      Issue Client Invoice
                    </div>
                    <input
                      type="text"
                      required
                      value={adminNewInvoiceTitle}
                      onChange={(e) => setAdminNewInvoiceTitle(e.target.value)}
                      placeholder="Invoice Milestone Description"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#f5f5f7] text-sm text-[#1d1d1f]"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="number"
                        value={adminNewInvoiceAmount}
                        onChange={(e) => setAdminNewInvoiceAmount(e.target.value)}
                        placeholder="Amount USD"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#f5f5f7] text-sm text-[#1d1d1f]"
                      />
                      <button
                        type="submit"
                        className="py-2.5 px-4 rounded-full bg-[#0071e3] text-white font-semibold text-sm cursor-pointer"
                      >
                        + Issue Invoice
                      </button>
                    </div>
                  </form>

                  <div className="space-y-2.5">
                    {currentWorkspace.invoices.map((inv) => (
                      <div
                        key={inv.id}
                        className="p-4 rounded-2xl bg-white border border-black/[0.06] flex items-center justify-between text-sm"
                      >
                        <div>
                          <div className="font-bold text-[#1d1d1f]">{inv.title}</div>
                          <div className="text-xs text-[#6e6e73]">
                            {inv.invoiceNumber} · ${inv.amountUsd} · Due: {inv.dueDate}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleAdminToggleInvoicePaid(inv)}
                          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-pointer ${
                            inv.status === 'Paid'
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-amber-50 text-amber-800'
                          }`}
                        >
                          {inv.status} (Toggle)
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ADMIN MODULE 7: WEBSITE CONTACT BUTTONS (TELEGRAM / WHATSAPP / CALL) */}
            {adminSubTab === 'contact_channels' && (
              <div className="max-w-3xl space-y-6">
                <div className="p-6 rounded-3xl bg-white border border-black/[0.06]">
                  <div className="text-xs font-semibold text-[#0071e3] mb-1">
                    Live Website Messenger &amp; Call Controls
                  </div>
                  <h2 className="text-2xl font-bold text-[#1d1d1f] m-0">
                    Edit Telegram, WhatsApp &amp; Call Buttons
                  </h2>
                  <p className="text-sm text-[#6e6e73] mt-1 mb-0">
                    Changes saved here immediately update the inviting Telegram, WhatsApp, and Call cards on the main page and the dedicated Contact page.
                  </p>
                </div>

                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    await realtimeChatHub.updateContactChannels(contactChannelsForm);
                    setAdminCreatedSuccess(
                      'Telegram, WhatsApp, and Call buttons updated across the website!'
                    );
                    setTimeout(() => setAdminCreatedSuccess(null), 5000);
                    notifySynced('Contact Buttons Updated');
                  }}
                  className="p-6 sm:p-8 rounded-3xl bg-white border border-black/[0.06] space-y-6"
                >
                  {/* Telegram Button Config */}
                  <div className="p-5 rounded-2xl bg-[#f5f5f7] space-y-3.5">
                    <div className="text-xs font-bold text-[#0088cc]">
                      1. Telegram Button Settings
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#6e6e73] mb-1">
                          Telegram URL
                        </label>
                        <input
                          type="text"
                          required
                          value={contactChannelsForm.telegramUrl}
                          onChange={(e) =>
                            setContactChannelsForm((prev) => ({
                              ...prev,
                              telegramUrl: e.target.value,
                            }))
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-black/[0.08] text-sm text-[#1d1d1f] font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#6e6e73] mb-1">
                          Telegram Display Handle
                        </label>
                        <input
                          type="text"
                          required
                          value={contactChannelsForm.telegramLabel}
                          onChange={(e) =>
                            setContactChannelsForm((prev) => ({
                              ...prev,
                              telegramLabel: e.target.value,
                            }))
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-black/[0.08] text-sm text-[#1d1d1f]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* WhatsApp Button Config */}
                  <div className="p-5 rounded-2xl bg-[#f5f5f7] space-y-3.5">
                    <div className="text-xs font-bold text-emerald-600">
                      2. WhatsApp Button Settings
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#6e6e73] mb-1">
                          WhatsApp Link (wa.me/...)
                        </label>
                        <input
                          type="text"
                          required
                          value={contactChannelsForm.whatsappUrl}
                          onChange={(e) =>
                            setContactChannelsForm((prev) => ({
                              ...prev,
                              whatsappUrl: e.target.value,
                            }))
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-black/[0.08] text-sm text-[#1d1d1f] font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#6e6e73] mb-1">
                          WhatsApp Display Text
                        </label>
                        <input
                          type="text"
                          required
                          value={contactChannelsForm.whatsappLabel}
                          onChange={(e) =>
                            setContactChannelsForm((prev) => ({
                              ...prev,
                              whatsappLabel: e.target.value,
                            }))
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-black/[0.08] text-sm text-[#1d1d1f]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Instagram Button Config */}
                  <div className="p-5 rounded-2xl bg-[#f5f5f7] space-y-3.5">
                    <div className="text-xs font-bold text-pink-600">
                      3. Instagram Button Settings
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#6e6e73] mb-1">
                          Instagram Link (instagram.com/...)
                        </label>
                        <input
                          type="text"
                          required
                          value={contactChannelsForm.instagramUrl || 'https://instagram.com/BryTech_Systems'}
                          onChange={(e) =>
                            setContactChannelsForm((prev) => ({
                              ...prev,
                              instagramUrl: e.target.value,
                            }))
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-black/[0.08] text-sm text-[#1d1d1f] font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#6e6e73] mb-1">
                          Instagram Display Handle
                        </label>
                        <input
                          type="text"
                          required
                          value={contactChannelsForm.instagramLabel || '@BryTech_Systems'}
                          onChange={(e) =>
                            setContactChannelsForm((prev) => ({
                              ...prev,
                              instagramLabel: e.target.value,
                              instagramHandle: e.target.value,
                            }))
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-black/[0.08] text-sm text-[#1d1d1f]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Call Button Config */}
                  <div className="p-5 rounded-2xl bg-[#f5f5f7] space-y-3.5">
                    <div className="text-xs font-bold text-[#0071e3]">
                      4. Direct Phone Call Button Settings
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#6e6e73] mb-1">
                          Phone Number (for tel: dialer)
                        </label>
                        <input
                          type="text"
                          required
                          value={contactChannelsForm.phoneNumber}
                          onChange={(e) =>
                            setContactChannelsForm((prev) => ({
                              ...prev,
                              phoneNumber: e.target.value,
                            }))
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-black/[0.08] text-sm text-[#1d1d1f] font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#6e6e73] mb-1">
                          Call Button Display Text
                        </label>
                        <input
                          type="text"
                          required
                          value={contactChannelsForm.phoneLabel}
                          onChange={(e) =>
                            setContactChannelsForm((prev) => ({
                              ...prev,
                              phoneLabel: e.target.value,
                            }))
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-black/[0.08] text-sm text-[#1d1d1f]"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 px-6 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-semibold text-sm cursor-pointer transition-all shadow-md"
                  >
                    Save &amp; Publish Contact Buttons to Website
                  </button>
                </form>
              </div>
            )}

            {/* ADMIN MODULE: WEBSITE VISITOR LIVE CHATS (BOT + HUMAN HANDOFF) */}
            {adminSubTab === 'visitor_chats' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[76vh]">
                <div className="lg:col-span-4 rounded-3xl bg-white border border-black/[0.06] p-5 overflow-y-auto space-y-2.5">
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#0071e3] mb-3">
                    Website Visitor Sessions ({visitorChatList.length})
                  </div>
                  {visitorChatList.map((vSession) => {
                    const lastMsg = vSession.messages[vSession.messages.length - 1];
                    const isSel =
                      activeVisitorSession &&
                      vSession.visitorId === activeVisitorSession.visitorId;
                    return (
                      <button
                        key={vSession.visitorId}
                        type="button"
                        onClick={() => {
                          setSelectedVisitorId(vSession.visitorId);
                          if (vSession.unreadForAdmin > 0) {
                            realtimeChatHub.sendVisitorChatSession({
                              ...vSession,
                              unreadForAdmin: 0,
                            });
                          }
                        }}
                        className={`w-full text-start p-4 rounded-2xl border transition-all cursor-pointer ${
                          isSel
                            ? 'bg-[#0071e3]/[0.08] border-[#0071e3]'
                            : 'bg-[#f5f5f7] border-transparent hover:bg-[#ebebf0]'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm font-bold text-[#1d1d1f] truncate">
                            {vSession.visitorName}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              vSession.mode === 'human'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-blue-100 text-[#0071e3]'
                            }`}
                          >
                            {vSession.mode === 'human' ? 'LIVE HUMAN' : 'AI BOT'}
                          </span>
                        </div>
                        {vSession.visitorContact && (
                          <div className="text-[11px] font-semibold text-[#0071e3] mt-0.5">
                            Contact: {vSession.visitorContact}
                          </div>
                        )}
                        <div className="text-xs text-[#6e6e73] truncate mt-1">
                          {lastMsg ? lastMsg.text : 'No messages yet'}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="lg:col-span-8 rounded-3xl bg-white border border-black/[0.06] flex flex-col h-full overflow-hidden shadow-xs">
                  {activeVisitorSession ? (
                    <>
                      <div className="p-5 border-b border-black/[0.06] flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <div className="text-base font-bold text-[#1d1d1f]">
                            Visitor: {activeVisitorSession.visitorName} ({activeVisitorSession.lang.toUpperCase()})
                          </div>
                          <div className="text-xs text-[#6e6e73]">
                            Contact: {activeVisitorSession.visitorContact || 'Not provided yet'} · Mode:{' '}
                            <strong className="text-[#0071e3]">
                              {activeVisitorSession.mode === 'human'
                                ? 'Direct Live Architect Chat'
                                : 'Assisted by AI Bot'}
                            </strong>
                          </div>
                        </div>
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700">
                          Real-Time Sync Active
                        </span>
                      </div>

                      <div className="flex-1 p-5 overflow-y-auto space-y-3.5 bg-[#f5f5f7]">
                        {activeVisitorSession.messages.map((m) => {
                          const isAdmin = m.senderRole === 'admin';
                          const isBot = m.senderRole === 'bot';
                          return (
                            <div
                              key={m.id}
                              className={`flex flex-col ${
                                isAdmin ? 'items-end' : 'items-start'
                              }`}
                            >
                              <div className="text-[11px] text-[#6e6e73] mb-1">
                                {m.senderName} · {m.sentAtIso}
                              </div>
                              <div
                                className={`max-w-lg px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                                  isAdmin
                                    ? 'bg-[#0071e3] text-white font-medium'
                                    : isBot
                                    ? 'bg-[#1d1d1f] text-white/90 border border-black/10'
                                    : 'bg-white text-[#1d1d1f] border border-black/[0.08] shadow-xs'
                                }`}
                              >
                                {m.text}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <form
                        onSubmit={handleAdminSendVisitorReply}
                        className="p-4 bg-white border-t border-black/[0.06] flex items-center gap-3"
                      >
                        <input
                          type="text"
                          value={adminVisitorReplyInput}
                          onChange={(e) => setAdminVisitorReplyInput(e.target.value)}
                          placeholder={`Reply live to ${activeVisitorSession.visitorName} (switches widget to Live Human Mode)...`}
                          className="flex-1 px-4 py-3 rounded-full bg-[#f5f5f7] text-sm text-[#1d1d1f] focus:outline-none focus:ring-2 focus:ring-[#0071e3]"
                        />
                        <button
                          type="submit"
                          className="px-6 py-3 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs sm:text-sm font-semibold flex items-center gap-2 cursor-pointer"
                        >
                          <Send className="w-4 h-4" />
                          <span>Send Live Reply</span>
                        </button>
                      </form>
                    </>
                  ) : (
                    <div className="flex-1 flex items-center justify-center text-sm text-[#6e6e73]">
                      Select a visitor conversation on the left to view and reply.
                    </div>
                  )}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    );
  }

  // ============================================================================
  // VIEW 4: APPLE & ALTEG.IO CLIENT AREA APPLICATION
  // ============================================================================
  const clientNavItems: {
    id: ClientTab;
    label: string;
    shortLabel: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: number;
  }[] = [
    {
      id: 'dashboard',
      label: 'Products & Notes',
      shortLabel: 'Products',
      icon: LayoutDashboard,
    },
    {
      id: 'timelines',
      label: 'Project Timelines',
      shortLabel: 'Roadmap',
      icon: Milestone,
    },
    {
      id: 'documents',
      label: 'Document Vault',
      shortLabel: 'Docs',
      icon: FileText,
    },
    {
      id: 'tasks',
      label: 'Tasks & Bots',
      shortLabel: 'Tasks',
      icon: CheckSquare,
    },
    {
      id: 'chat',
      label: 'Live Chat with Admin',
      shortLabel: 'Live Chat',
      icon: MessageSquare,
      badge: unreadClientChatCount,
    },
    {
      id: 'billing',
      label: 'Billing & Invoices',
      shortLabel: 'Billing',
      icon: CreditCard,
    },
  ];

  return (
    <div
      dir={t.dir}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-xl p-0 md:p-5 overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-label="BryTech Client Area Application"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-[1840px] h-[100svh] md:h-[94vh] md:rounded-[32px] bg-[#f5f5f7] text-[#1d1d1f] border-0 md:border md:border-black/[0.08] shadow-[0_32px_90px_rgba(0,0,0,0.22)] flex flex-col overflow-hidden"
      >
        {/* Top Frosted Apple App Bar */}
        <div className="bg-white/90 backdrop-blur-xl px-4 sm:px-7 py-4 flex items-center justify-between gap-3 border-b border-black/[0.06] shrink-0">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-[#0071e3] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
              {currentWorkspace.account.businessName.slice(0, 2).toUpperCase()}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2.5">
                <span className="text-sm sm:text-base font-bold text-[#1d1d1f] tracking-tight truncate">
                  {currentWorkspace.account.businessName}
                </span>
                <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-[#0071e3]/10 text-xs font-bold text-[#0071e3]">
                  {currentWorkspace.account.overallProgress}% Complete
                </span>
              </div>
              <div className="text-xs text-[#6e6e73] truncate">
                {currentWorkspace.account.contactName} · {currentWorkspace.account.city}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <div className="hidden sm:flex items-center bg-[#f5f5f7] p-1 rounded-full border border-black/[0.06]">
              {(['USD', 'UAH', 'ILS'] as const).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCurrency(c)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold cursor-pointer transition-all ${
                    currency === c
                      ? 'bg-white text-[#1d1d1f] shadow-2xs'
                      : 'text-[#6e6e73] hover:text-[#1d1d1f]'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setIsClientAuthenticated(false)}
              className="px-3.5 py-1.5 rounded-full bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[#1d1d1f] text-xs font-semibold cursor-pointer transition-colors"
            >
              Sign Out
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[#6e6e73] hover:text-[#1d1d1f] flex items-center justify-center cursor-pointer transition-colors"
              aria-label="Close Client Area"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Body Layout */}
        <div className="flex-1 flex overflow-hidden relative">
          {!isMobile && (
            <aside className="w-68 bg-white flex flex-col justify-between p-5 border-e border-black/[0.06] shrink-0 overflow-y-auto">
              <div className="space-y-6">
                <div className="p-4 rounded-2xl bg-[#f5f5f7] border border-black/[0.04]">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-[#6e6e73] font-semibold">
                      Overall Completion
                    </span>
                    <span className="text-[#0071e3] font-bold tabular-nums text-sm">
                      {currentWorkspace.account.overallProgress}%
                    </span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-black/[0.07] overflow-hidden mb-2.5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${currentWorkspace.account.overallProgress}%` }}
                      transition={{ duration: 0.7 }}
                      className="h-full rounded-full bg-[#0071e3]"
                    />
                  </div>
                  <div className="text-xs text-[#6e6e73]">
                    PM: <strong className="text-[#1d1d1f]">{currentWorkspace.account.assignedPm}</strong>
                  </div>
                </div>

                <nav className="space-y-1.5">
                  {clientNavItems.map((item) => {
                    const Icon = item.icon;
                    const active = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setActiveTab(item.id);
                          if (item.id === 'chat') setUnreadClientChatCount(0);
                        }}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                          active
                            ? 'bg-[#0071e3] text-white shadow-xs'
                            : 'text-[#424245] hover:bg-[#f5f5f7]'
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <Icon className="w-4 h-4 shrink-0" />
                          <span>{item.label}</span>
                        </span>
                        {item.badge ? (
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                              active
                                ? 'bg-white text-[#0071e3]'
                                : 'bg-[#0071e3]/15 text-[#0071e3]'
                            }`}
                          >
                            {item.badge}
                          </span>
                        ) : null}
                      </button>
                    );
                  })}
                </nav>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-500/20">
                <div className="text-xs font-semibold text-emerald-700">
                  Your Business Savings
                </div>
                <div className="text-xl font-bold text-emerald-900 tabular-nums mt-0.5">
                  {formatMoney(savingsUsd)}
                </div>
                <div className="text-xs text-emerald-700/80 mt-0.5">
                  vs. {formatMoney(currentWorkspace.account.estimatedAgencyCostUsd)} agency quote
                </div>
              </div>
            </aside>
          )}

          {/* Main Client Viewport */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-7 md:p-9 pb-24 md:pb-9 bg-[#f5f5f7]">
            {noteSubmittedToast && (
              <div className="mb-5 p-4 rounded-2xl bg-emerald-50 text-emerald-900 border border-emerald-200 text-sm font-semibold flex items-center justify-between">
                <span>✓ {noteSubmittedToast}</span>
                <button
                  type="button"
                  onClick={() => setNoteSubmittedToast(null)}
                  className="text-emerald-700 text-xs underline cursor-pointer"
                >
                  Close
                </button>
              </div>
            )}

            <AnimatePresence mode="wait">
              {/* TAB 1: PRODUCTS OVERVIEW & ADD NOTES TO PRODUCTS */}
              {activeTab === 'dashboard' && (
                <motion.div
                  key="dashboard"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.22 }}
                  className="space-y-7"
                >
                  {/* Welcome Banner */}
                  <div className="rounded-[32px] bg-[#1d1d1f] text-white p-6 sm:p-9 shadow-lg">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                      <div className="lg:col-span-7 space-y-3">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#15BCDF]">
                          <Sparkles className="w-3.5 h-3.5" />
                          {currentWorkspace.account.planName}
                        </div>
                        <h3 className="text-2xl sm:text-4xl font-bold tracking-tight m-0">
                          Welcome, {currentWorkspace.account.contactName}
                        </h3>
                        <p className="text-sm sm:text-base text-white/75 m-0 max-w-xl leading-relaxed">
                          Track real-time completion across your products below. Attach notes directly to any product to notify the Admin or open Live Chat anytime.
                        </p>
                        <div className="pt-2">
                          <button
                            type="button"
                            onClick={() => setActiveTab('chat')}
                            className="px-6 py-3 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs sm:text-sm font-semibold inline-flex items-center gap-2 cursor-pointer transition-colors"
                          >
                            <MessageSquare className="w-4 h-4" />
                            <span>Open Live Chat with Admin</span>
                          </button>
                        </div>
                      </div>
                      <div className="lg:col-span-5">
                        <BryTechVisualArtwork variant="portal" compact />
                      </div>
                    </div>
                  </div>

                  {/* Products Grid with "Add Note to Product" */}
                  <div className="space-y-4">
                    <h4 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1d1d1f] m-0">
                      Your Products &amp; Product Notes
                    </h4>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {currentWorkspace.products.map((prod, idx) => {
                        const notesForProduct = productNotes.filter(
                          (n) =>
                            n.clientId === currentWorkspace.account.id &&
                            n.productId === prod.id
                        );
                        return (
                          <motion.div
                            key={prod.id}
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: idx * 0.06 }}
                            className="rounded-3xl bg-white border border-black/[0.06] p-6 sm:p-7 flex flex-col justify-between shadow-xs"
                          >
                            <div>
                              <div className="flex items-center justify-between gap-2 mb-3">
                                <span className="text-xs font-semibold text-[#6e6e73]">
                                  {prod.type} · {prod.domainOrHandle}
                                </span>
                                <span className="px-3 py-1 rounded-full bg-[#0071e3]/10 text-xs font-bold text-[#0071e3] capitalize">
                                  {prod.status.replace('_', ' ')}
                                </span>
                              </div>

                              <h5 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1d1d1f] m-0 mb-3">
                                {prod.name}
                              </h5>

                              <div className="p-4 rounded-2xl bg-[#f5f5f7] mb-5">
                                <div className="flex items-center justify-between text-sm mb-2">
                                  <span className="font-semibold text-[#1d1d1f]">
                                    {prod.currentPhase}
                                  </span>
                                  <span className="font-bold text-[#0071e3] tabular-nums">
                                    {prod.progress}%
                                  </span>
                                </div>
                                <div className="w-full h-2.5 rounded-full bg-black/[0.08] overflow-hidden">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${prod.progress}%` }}
                                    transition={{ duration: 0.6 }}
                                    className="h-full rounded-full bg-[#0071e3]"
                                  />
                                </div>
                              </div>

                              {/* Existing Notes for this Product */}
                              {notesForProduct.length > 0 && (
                                <div className="mb-5 space-y-2">
                                  <div className="text-xs font-semibold text-[#6e6e73]">
                                    Notes Sent to Admin ({notesForProduct.length})
                                  </div>
                                  {notesForProduct.map((n) => (
                                    <div
                                      key={n.id}
                                      className="p-3.5 rounded-2xl bg-[#f5f5f7] text-xs sm:text-sm text-[#1d1d1f]"
                                    >
                                      <div className="flex items-center justify-between text-[11px] text-[#6e6e73] mb-1">
                                        <span>{n.createdAtIso}</span>
                                        <span className="font-semibold text-[#0071e3]">
                                          {n.readByAdmin ? 'Read by Admin ✓' : 'Sent to Admin'}
                                        </span>
                                      </div>
                                      <div className="font-medium">{n.text}</div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>

                            {/* Add Note to Product Form */}
                            <div className="pt-4 border-t border-black/[0.06]">
                              <label className="block text-xs font-semibold text-[#6e6e73] mb-2">
                                Add a Note for Admin on this Product
                              </label>
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  value={productNoteDrafts[prod.id] || ''}
                                  onChange={(e) =>
                                    setProductNoteDrafts((prev) => ({
                                      ...prev,
                                      [prod.id]: e.target.value,
                                    }))
                                  }
                                  placeholder="Write a note or request for this product..."
                                  className="flex-1 px-4 py-2.5 rounded-full bg-[#f5f5f7] border border-transparent focus:border-[#0071e3] focus:bg-white text-sm text-[#1d1d1f] focus:outline-none"
                                />
                                <button
                                  type="button"
                                  onClick={() => handleClientAddProductNote(prod)}
                                  className="px-5 py-2.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer shrink-0 transition-colors"
                                >
                                  <StickyNote className="w-3.5 h-3.5" />
                                  <span>Add Note</span>
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 2: READ-ONLY PROJECT TIMELINES */}
              {activeTab === 'timelines' && (
                <motion.div
                  key="timelines"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.22 }}
                  className="space-y-5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-3xl bg-white p-6 border border-black/[0.06]">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1d1d1f] m-0">
                        Project Status Timelines
                      </h3>
                      <p className="text-sm text-[#6e6e73] m-0 mt-1">
                        Live delivery roadmap managed by your BryTech engineering team.
                      </p>
                    </div>
                    <select
                      value={timelineProductFilter}
                      onChange={(e) => setTimelineProductFilter(e.target.value)}
                      className="px-4 py-2.5 rounded-full bg-[#f5f5f7] text-sm font-semibold text-[#1d1d1f]"
                    >
                      <option value="all">
                        All Products ({currentWorkspace.timelines.length})
                      </option>
                      {currentWorkspace.products.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-3.5">
                    {filteredTimelines.map((ms) => (
                      <div
                        key={ms.id}
                        className="rounded-3xl bg-white border border-black/[0.06] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div className="space-y-1.5">
                          <div className="flex flex-wrap items-center gap-2 text-xs text-[#6e6e73]">
                            <span className="font-bold text-[#0071e3]">{ms.productName}</span>
                            <span>·</span>
                            <span>Due: {ms.dueDate}</span>
                          </div>
                          <h4 className="text-lg sm:text-xl font-bold text-[#1d1d1f] m-0">
                            {ms.title}
                          </h4>
                          <p className="text-sm text-[#6e6e73] m-0 leading-relaxed">
                            {ms.description}
                          </p>
                        </div>
                        <span className="px-3.5 py-1.5 rounded-full bg-[#0071e3]/10 text-xs font-bold text-[#0071e3] capitalize shrink-0">
                          {ms.status.replace('_', ' ')}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* TAB 3: READ-ONLY DOCUMENT VAULT */}
              {activeTab === 'documents' && (
                <motion.div
                  key="documents"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.22 }}
                  className="space-y-5"
                >
                  <div className="rounded-3xl bg-white p-6 border border-black/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1d1d1f] m-0">
                        Document &amp; Architecture Vault
                      </h3>
                      <p className="text-sm text-[#6e6e73] m-0 mt-1">
                        Contracts, architecture blueprints, and user guides for your systems.
                      </p>
                    </div>
                    <div className="relative w-full sm:w-72">
                      <Search className="w-4 h-4 text-[#86868b] absolute left-4 top-3" />
                      <input
                        type="text"
                        value={docSearchQuery}
                        onChange={(e) => setDocSearchQuery(e.target.value)}
                        placeholder="Search documents..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-full bg-[#f5f5f7] text-sm text-[#1d1d1f] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-3.5">
                    {filteredDocuments.map((docItem) => (
                      <div
                        key={docItem.id}
                        className="rounded-3xl bg-white border border-black/[0.06] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <div className="text-xs text-[#6e6e73]">
                            <strong className="text-[#0071e3]">{docItem.category}</strong> · {docItem.fileName} ({docItem.fileSize})
                          </div>
                          <h4 className="text-lg font-bold text-[#1d1d1f] m-0">
                            {docItem.title}
                          </h4>
                          <p className="text-sm text-[#6e6e73] m-0">
                            {docItem.summary}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setPreviewDoc(docItem)}
                          className="px-5 py-2.5 rounded-full bg-[#f5f5f7] hover:bg-[#1d1d1f] text-[#1d1d1f] hover:text-white text-xs font-semibold flex items-center gap-2 cursor-pointer shrink-0 transition-colors"
                        >
                          <Eye className="w-4 h-4 text-[#0071e3]" />
                          <span>View Details</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* TAB 4: READ-ONLY TASKS & AUTOMATION BOTS */}
              {activeTab === 'tasks' && (
                <motion.div
                  key="tasks"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.22 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-6"
                >
                  <div className="lg:col-span-7 space-y-4">
                    <h3 className="text-xl font-bold text-[#1d1d1f] m-0">
                      Active Engineering Sprint Tasks
                    </h3>
                    {currentWorkspace.tasks.map((tk) => (
                      <div
                        key={tk.id}
                        className="rounded-3xl bg-white border border-black/[0.06] p-5 flex items-center justify-between gap-4"
                      >
                        <div>
                          <div className="text-xs text-[#6e6e73] mb-1">
                            <strong className="text-[#0071e3]">{tk.priority} Priority</strong> · {tk.productName}
                          </div>
                          <div className="text-base font-bold text-[#1d1d1f]">
                            {tk.title}
                          </div>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-[#f5f5f7] text-xs font-semibold text-[#1d1d1f] shrink-0">
                          {tk.status}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="lg:col-span-5 space-y-4">
                    <h3 className="text-xl font-bold text-[#1d1d1f] m-0">
                      Connected Automation Bots
                    </h3>
                    {currentWorkspace.automations.map((auto) => (
                      <div
                        key={auto.id}
                        className="rounded-3xl bg-white border border-black/[0.06] p-5 space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-xs font-semibold text-[#0071e3] block">
                              {auto.channel}
                            </span>
                            <div className="text-base font-bold text-[#1d1d1f]">
                              {auto.name}
                            </div>
                          </div>
                          <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-xs font-bold text-emerald-700">
                            {auto.active ? 'Active' : 'Paused'}
                          </span>
                        </div>
                        <div className="p-3 rounded-2xl bg-[#f5f5f7] text-xs font-mono text-[#1d1d1f]">
                          {auto.template}
                        </div>
                        <div className="text-xs font-semibold text-[#6e6e73]">
                          {auto.runsThisMonth.toLocaleString()} automated runs this month
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* TAB 5: DIRECT ONLINE CHAT WITH ADMIN */}
              {activeTab === 'chat' && (
                <motion.div
                  key="chat"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.22 }}
                  className="rounded-3xl bg-white border border-black/[0.06] flex flex-col h-[70vh] overflow-hidden shadow-xs"
                >
                  <div className="bg-[#1d1d1f] text-white p-5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-[#0071e3] text-white flex items-center justify-center">
                        <MessageSquare className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-base font-bold">
                          Direct Online Chat with BryTech Admin
                        </div>
                        <div className="text-xs text-white/70">
                          Messages are delivered directly to {currentWorkspace.account.assignedPm}
                        </div>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-xs font-semibold text-emerald-300">
                      Live Connected
                    </span>
                  </div>

                  <div className="flex-1 p-5 overflow-y-auto space-y-3.5 bg-[#f5f5f7]">
                    {currentWorkspace.messages.map((m) => {
                      const isClient = m.senderRole === 'client';
                      return (
                        <div
                          key={m.id}
                          className={`flex flex-col ${
                            isClient ? 'items-end' : 'items-start'
                          }`}
                        >
                          <span className="text-[11px] text-[#6e6e73] mb-1">
                            {m.senderName} · {m.sentAtIso}
                          </span>
                          <div
                            className={`max-w-lg px-4 py-3 rounded-2xl text-sm sm:text-base leading-relaxed ${
                              isClient
                                ? 'bg-[#0071e3] text-white font-medium'
                                : 'bg-white text-[#1d1d1f] border border-black/[0.06]'
                            }`}
                          >
                            {m.text}
                          </div>
                        </div>
                      );
                    })}
                    <div ref={chatEndRef} />
                  </div>

                  <form
                    onSubmit={handleSendClientChat}
                    className="p-4 bg-white border-t border-black/[0.06] flex items-center gap-3"
                  >
                    <input
                      type="text"
                      value={clientChatInput}
                      onChange={(e) => setClientChatInput(e.target.value)}
                      placeholder="Write a message directly to the Admin..."
                      className="flex-1 px-4 py-3 rounded-full bg-[#f5f5f7] text-sm text-[#1d1d1f] focus:outline-none focus:ring-2 focus:ring-[#0071e3]"
                    />
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs sm:text-sm font-semibold flex items-center gap-2 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send</span>
                    </button>
                  </form>
                </motion.div>
              )}

              {/* TAB 6: READ-ONLY BILLING & INVOICES */}
              {activeTab === 'billing' && (
                <motion.div
                  key="billing"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.22 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="rounded-3xl bg-white p-6 border border-black/[0.06]">
                      <div className="text-xs font-semibold text-[#6e6e73]">
                        BryTech Investment
                      </div>
                      <div className="text-2xl sm:text-3xl font-bold text-[#1d1d1f] tabular-nums mt-1">
                        {formatMoney(currentWorkspace.account.brytechTotalPaidUsd)}
                      </div>
                    </div>
                    <div className="rounded-3xl bg-white p-6 border border-black/[0.06]">
                      <div className="text-xs font-semibold text-[#6e6e73]">
                        Traditional Agency Quote
                      </div>
                      <div className="text-2xl sm:text-3xl font-bold text-[#86868b] line-through tabular-nums mt-1">
                        {formatMoney(currentWorkspace.account.estimatedAgencyCostUsd)}
                      </div>
                    </div>
                    <div className="rounded-3xl bg-[#1d1d1f] text-white p-6">
                      <div className="text-xs font-semibold text-emerald-400">
                        Net Business Savings
                      </div>
                      <div className="text-2xl sm:text-3xl font-bold text-emerald-400 tabular-nums mt-1">
                        {formatMoney(savingsUsd)}
                      </div>
                    </div>
                  </div>

                  <div className="rounded-3xl bg-white border border-black/[0.06] p-6 space-y-3.5">
                    <h4 className="text-lg font-bold text-[#1d1d1f] m-0">
                      Invoices &amp; Payment Status
                    </h4>
                    {currentWorkspace.invoices.map((inv) => (
                      <div
                        key={inv.id}
                        className="p-4 rounded-2xl bg-[#f5f5f7] flex flex-wrap items-center justify-between gap-3"
                      >
                        <div>
                          <div className="text-xs font-semibold text-[#6e6e73]">
                            {inv.invoiceNumber} · Due: {inv.dueDate}
                          </div>
                          <div className="text-base font-bold text-[#1d1d1f]">
                            {inv.title}
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-lg font-bold text-[#1d1d1f] tabular-nums">
                            {formatMoney(inv.amountUsd)}
                          </span>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold ${
                              inv.status === 'Paid'
                                ? 'bg-emerald-50 text-emerald-700'
                                : 'bg-amber-50 text-amber-800'
                            }`}
                          >
                            {inv.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </main>

          {/* Floating Chat Widget on Desktop */}
          {!isMobile && activeTab !== 'chat' && (
            <div className="fixed bottom-8 right-8 z-40">
              {showFloatingChat ? (
                <div className="w-80 rounded-3xl bg-white border border-black/[0.08] shadow-2xl flex flex-col h-96 overflow-hidden">
                  <div className="bg-[#1d1d1f] text-white px-4 py-3.5 flex items-center justify-between">
                    <span className="text-xs font-semibold text-white">
                      Live Chat with Admin
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowFloatingChat(false)}
                      className="text-white/70 hover:text-white cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex-1 p-3 overflow-y-auto space-y-2 bg-[#f5f5f7]">
                    {currentWorkspace.messages.map((m) => (
                      <div
                        key={m.id}
                        className={`p-2.5 rounded-2xl text-xs ${
                          m.senderRole === 'client'
                            ? 'bg-[#0071e3] text-white ms-6'
                            : 'bg-white text-[#1d1d1f] border border-black/[0.06] me-6'
                        }`}
                      >
                        <div className="text-[10px] opacity-70">{m.senderName}</div>
                        <div>{m.text}</div>
                      </div>
                    ))}
                    <div ref={chatEndRef} />
                  </div>
                  <form
                    onSubmit={handleSendClientChat}
                    className="p-2.5 bg-white border-t border-black/[0.06] flex gap-1.5"
                  >
                    <input
                      type="text"
                      value={clientChatInput}
                      onChange={(e) => setClientChatInput(e.target.value)}
                      placeholder="Message Admin..."
                      className="flex-1 px-3 py-2 rounded-full bg-[#f5f5f7] text-xs"
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-2 rounded-full bg-[#0071e3] text-white text-xs font-semibold cursor-pointer"
                    >
                      Send
                    </button>
                  </form>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowFloatingChat(true)}
                  className="px-5 py-3.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-xl cursor-pointer transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Live Chat with Admin</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Mobile Bottom App Navigation Bar inside Client Area */}
        {isMobile && (
          <nav
            aria-label="Mobile Client App Navigation"
            className="fixed bottom-0 inset-x-0 z-50 h-16 bg-white/95 backdrop-blur-xl text-[#1d1d1f] border-t border-black/[0.08] grid grid-cols-6 items-center px-1"
          >
            {clientNavItems.map((item) => {
              const Icon = item.icon;
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(item.id);
                    if (item.id === 'chat') setUnreadClientChatCount(0);
                  }}
                  className={`relative flex flex-col items-center justify-center py-1.5 cursor-pointer transition-colors ${
                    active ? 'text-[#0071e3]' : 'text-[#86868b] hover:text-[#1d1d1f]'
                  }`}
                >
                  <Icon className="w-4 h-4 mb-1" />
                  <span className="text-[10px] font-semibold truncate max-w-full">
                    {item.shortLabel}
                  </span>
                </button>
              );
            })}
          </nav>
        )}

        {/* Document Preview Modal */}
        {previewDoc && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md p-4">
            <div className="rounded-3xl bg-white border border-black/[0.08] max-w-lg w-full p-7 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between border-b border-black/[0.06] pb-3">
                <div>
                  <span className="text-xs font-semibold text-[#0071e3] block">
                    {previewDoc.category} · {previewDoc.version}
                  </span>
                  <h4 className="text-xl font-bold text-[#1d1d1f] m-0">
                    {previewDoc.title}
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => setPreviewDoc(null)}
                  className="p-1.5 rounded-full bg-[#f5f5f7] text-[#6e6e73] hover:text-[#1d1d1f] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm text-[#424245] leading-relaxed">
                {previewDoc.summary}
              </p>
              <div className="p-3.5 rounded-2xl bg-[#f5f5f7] text-xs font-mono text-[#1d1d1f]">
                File: {previewDoc.fileName} ({previewDoc.fileSize}) · Uploaded by {previewDoc.uploadedBy}
              </div>
              <div className="flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => setPreviewDoc(null)}
                  className="px-5 py-2.5 rounded-full bg-[#0071e3] text-white text-xs font-semibold cursor-pointer"
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
