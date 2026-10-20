import { ChatMessageRecord, createChatMessageInDb } from './clientDatabase';

export interface ProductNoteRecord {
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

export interface ContactChannelsConfig {
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

export interface VisitorChatMessageRecord {
  id: string;
  visitorId: string;
  senderRole: 'visitor' | 'bot' | 'admin';
  senderName: string;
  text: string;
  sentAtIso: string;
}

export interface VisitorChatSessionRecord {
  visitorId: string;
  visitorName: string;
  visitorContact: string;
  businessType: string;
  lang: string;
  mode: 'bot' | 'human';
  unreadForAdmin: number;
  updatedAtIso: string;
  messages: VisitorChatMessageRecord[];
}

export const DEFAULT_CONTACT_CHANNELS: ContactChannelsConfig = {
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

const CONTACT_CHANNELS_STORAGE_KEY = 'brytech_contact_channels_v3';
const VISITOR_CHATS_STORAGE_KEY = 'brytech_visitor_chats_store_v2';

export function loadSavedContactChannels(): ContactChannelsConfig {
  try {
    const raw = localStorage.getItem(CONTACT_CHANNELS_STORAGE_KEY);
    if (raw) {
      return { ...DEFAULT_CONTACT_CHANNELS, ...JSON.parse(raw) };
    }
  } catch {
    // ignore
  }
  return DEFAULT_CONTACT_CHANNELS;
}

export function saveLocalContactChannels(config: ContactChannelsConfig): void {
  try {
    localStorage.setItem(CONTACT_CHANNELS_STORAGE_KEY, JSON.stringify(config));
  } catch {
    // ignore
  }
}

export function loadLocalVisitorChatsStore(): Record<string, VisitorChatSessionRecord> {
  try {
    const raw = localStorage.getItem(VISITOR_CHATS_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    // ignore
  }
  return {};
}

export function saveLocalVisitorChatsStore(store: Record<string, VisitorChatSessionRecord>): void {
  try {
    localStorage.setItem(VISITOR_CHATS_STORAGE_KEY, JSON.stringify(store));
  } catch {
    // ignore
  }
}

type MessageListener = (msg: ChatMessageRecord) => void;
type StoreInitListener = (allByClient: Record<string, ChatMessageRecord[]>) => void;
type NoteListener = (note: ProductNoteRecord) => void;
type NotesInitListener = (notes: ProductNoteRecord[]) => void;
type ContactChannelsListener = (channels: ContactChannelsConfig) => void;
type VisitorChatListener = (session: VisitorChatSessionRecord) => void;
type VisitorChatsInitListener = (sessions: Record<string, VisitorChatSessionRecord>) => void;

class RealtimeChatHub {
  private ws: WebSocket | null = null;
  private listeners: Set<MessageListener> = new Set();
  private initListeners: Set<StoreInitListener> = new Set();
  private noteListeners: Set<NoteListener> = new Set();
  private notesInitListeners: Set<NotesInitListener> = new Set();
  private contactChannelsListeners: Set<ContactChannelsListener> = new Set();
  private visitorChatListeners: Set<VisitorChatListener> = new Set();
  private visitorChatsInitListeners: Set<VisitorChatsInitListener> = new Set();
  private broadcastChannel: BroadcastChannel | null = null;
  private connected = false;

  constructor() {
    if (typeof window !== 'undefined') {
      if ('BroadcastChannel' in window) {
        this.broadcastChannel = new BroadcastChannel('brytech_live_chat_channel');
        this.broadcastChannel.onmessage = (ev) => {
          if (ev.data?.type === 'chat_message' && ev.data.message) {
            this.notifyMessage(ev.data.message);
          } else if (ev.data?.type === 'product_note' && ev.data.note) {
            this.notifyNote(ev.data.note);
          } else if (ev.data?.type === 'contact_channels_updated' && ev.data.contactChannels) {
            saveLocalContactChannels(ev.data.contactChannels);
            this.notifyContactChannels(ev.data.contactChannels);
          } else if (ev.data?.type === 'visitor_chat_updated' && ev.data.session) {
            const store = loadLocalVisitorChatsStore();
            store[ev.data.session.visitorId] = ev.data.session;
            saveLocalVisitorChatsStore(store);
            this.notifyVisitorChat(ev.data.session);
          }
        };
      }
      this.connectWebSocket();
      this.fetchInitialContactChannels();
      this.fetchInitialVisitorChats();
    }
  }

  private async fetchInitialContactChannels() {
    try {
      const resp = await fetch('/api/contact-channels');
      if (resp.ok) {
        const data = await resp.json();
        if (data?.contactChannels) {
          saveLocalContactChannels(data.contactChannels);
          this.notifyContactChannels(data.contactChannels);
        }
      }
    } catch {
      // fallback to localStorage
    }
  }

  private async fetchInitialVisitorChats() {
    try {
      const resp = await fetch('/api/visitor-chats');
      if (resp.ok) {
        const data = await resp.json();
        if (data?.visitorChats) {
          const merged = { ...loadLocalVisitorChatsStore(), ...data.visitorChats };
          saveLocalVisitorChatsStore(merged);
          this.visitorChatsInitListeners.forEach((cb) => cb(merged));
        }
      }
    } catch {
      const local = loadLocalVisitorChatsStore();
      if (Object.keys(local).length > 0) {
        this.visitorChatsInitListeners.forEach((cb) => cb(local));
      }
    }
  }

  private connectWebSocket() {
    try {
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${protocol}//${window.location.host}/ws-chat`;
      this.ws = new WebSocket(wsUrl);

      this.ws.onopen = () => {
        this.connected = true;
      };

      this.ws.onmessage = (event) => {
        try {
          const parsed = JSON.parse(event.data);
          if (parsed.type === 'init_store') {
            if (parsed.data) {
              this.initListeners.forEach((cb) => cb(parsed.data));
            }
            if (Array.isArray(parsed.notes)) {
              this.notesInitListeners.forEach((cb) => cb(parsed.notes));
            }
            if (parsed.contactChannels) {
              saveLocalContactChannels(parsed.contactChannels);
              this.notifyContactChannels(parsed.contactChannels);
            }
            if (parsed.visitorChats) {
              const merged = { ...loadLocalVisitorChatsStore(), ...parsed.visitorChats };
              saveLocalVisitorChatsStore(merged);
              this.visitorChatsInitListeners.forEach((cb) => cb(merged));
            }
          } else if (parsed.type === 'chat_message' && parsed.message) {
            this.notifyMessage(parsed.message);
          } else if (parsed.type === 'product_note' && parsed.note) {
            this.notifyNote(parsed.note);
          } else if (parsed.type === 'contact_channels_updated' && parsed.contactChannels) {
            saveLocalContactChannels(parsed.contactChannels);
            this.notifyContactChannels(parsed.contactChannels);
          } else if (parsed.type === 'visitor_chat_updated' && parsed.session) {
            const store = loadLocalVisitorChatsStore();
            store[parsed.session.visitorId] = parsed.session;
            saveLocalVisitorChatsStore(store);
            this.notifyVisitorChat(parsed.session);
          }
        } catch {
          // ignore
        }
      };

      this.ws.onclose = () => {
        this.connected = false;
        setTimeout(() => this.connectWebSocket(), 4000);
      };
    } catch {
      this.connected = false;
    }
  }

  private notifyMessage(msg: ChatMessageRecord) {
    this.listeners.forEach((cb) => cb(msg));
  }

  private notifyNote(note: ProductNoteRecord) {
    this.noteListeners.forEach((cb) => cb(note));
  }

  private notifyContactChannels(channels: ContactChannelsConfig) {
    this.contactChannelsListeners.forEach((cb) => cb(channels));
  }

  private notifyVisitorChat(session: VisitorChatSessionRecord) {
    this.visitorChatListeners.forEach((cb) => cb(session));
  }

  public onMessage(cb: MessageListener) {
    this.listeners.add(cb);
    return () => {
      this.listeners.delete(cb);
    };
  }

  public onInitStore(cb: StoreInitListener) {
    this.initListeners.add(cb);
    return () => {
      this.initListeners.delete(cb);
    };
  }

  public onProductNote(cb: NoteListener) {
    this.noteListeners.add(cb);
    return () => {
      this.noteListeners.delete(cb);
    };
  }

  public onNotesInit(cb: NotesInitListener) {
    this.notesInitListeners.add(cb);
    return () => {
      this.notesInitListeners.delete(cb);
    };
  }

  public onContactChannels(cb: ContactChannelsListener) {
    this.contactChannelsListeners.add(cb);
    return () => {
      this.contactChannelsListeners.delete(cb);
    };
  }

  public onVisitorChatUpdate(cb: VisitorChatListener) {
    this.visitorChatListeners.add(cb);
    return () => {
      this.visitorChatListeners.delete(cb);
    };
  }

  public onVisitorChatsInit(cb: VisitorChatsInitListener) {
    this.visitorChatsInitListeners.add(cb);
    return () => {
      this.visitorChatsInitListeners.delete(cb);
    };
  }

  public async sendMessage(msg: ChatMessageRecord, persistToFirebase: boolean) {
    this.notifyMessage(msg);
    this.broadcastChannel?.postMessage({ type: 'chat_message', message: msg });

    if (this.ws && this.connected && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type: 'chat_message', message: msg }));
    } else {
      try {
        await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(msg),
        });
      } catch {
        // fallback already handled locally
      }
    }

    if (persistToFirebase) {
      try {
        await createChatMessageInDb(msg);
      } catch {
        // ignore if user isn't authenticated in Firebase
      }
    }
  }

  public async sendProductNote(note: ProductNoteRecord) {
    this.notifyNote(note);
    this.broadcastChannel?.postMessage({ type: 'product_note', note });

    if (this.ws && this.connected && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type: 'product_note', note }));
    } else {
      try {
        await fetch('/api/notes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(note),
        });
      } catch {
        // local state already updated
      }
    }
  }

  public async updateContactChannels(channels: ContactChannelsConfig) {
    saveLocalContactChannels(channels);
    this.notifyContactChannels(channels);
    this.broadcastChannel?.postMessage({
      type: 'contact_channels_updated',
      contactChannels: channels,
    });

    if (this.ws && this.connected && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(
        JSON.stringify({
          type: 'update_contact_channels',
          contactChannels: channels,
        })
      );
    } else {
      try {
        await fetch('/api/contact-channels', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(channels),
        });
      } catch {
        // local state already updated
      }
    }
  }

  public async sendVisitorChatSession(session: VisitorChatSessionRecord) {
    const store = loadLocalVisitorChatsStore();
    store[session.visitorId] = session;
    saveLocalVisitorChatsStore(store);

    this.notifyVisitorChat(session);
    this.broadcastChannel?.postMessage({
      type: 'visitor_chat_updated',
      session,
    });

    if (this.ws && this.connected && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(
        JSON.stringify({
          type: 'visitor_chat_update',
          session,
        })
      );
    } else {
      try {
        await fetch('/api/visitor-chats', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(session),
        });
      } catch {
        // local state already updated
      }
    }
  }
}

export const realtimeChatHub = new RealtimeChatHub();
