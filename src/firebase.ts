import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Validate connection to Firestore on boot
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error('Please check your Firebase configuration.');
    }
  }
}
testConnection();

// Validation constants synchronized verbatim with firebase-blueprint.json
export const BLUEPRINT_CONSTRAINTS = {
  ID_PATTERN: /^[a-zA-Z0-9_\-]+$/,
  ID_MAX_LEN: 128,
  BUSINESS_NAME_MAX: 120,
  CONTACT_NAME_MAX: 100,
  CITY_MAX: 80,
  PLAN_NAME_MAX: 160,
  ASSIGNED_PM_MAX: 100,
  EMAIL_MAX: 120,
  PHONE_MAX: 60,
  ADDRESS_MAX: 200,
  LOGIN_USER_MAX: 80,
  LOGIN_PASS_MAX: 80,
  PRODUCT_NAME_MAX: 140,
  DOMAIN_MAX: 140,
  PHASE_MAX: 120,
  METRIC_LABEL_MAX: 80,
  LAST_DEPLOY_MAX: 80,
  TIMELINE_TITLE_MAX: 160,
  TIMELINE_DESC_MAX: 400,
  DUE_DATE_MAX: 60,
  URL_MAX: 240,
  DOC_TITLE_MAX: 160,
  FILE_NAME_MAX: 160,
  FILE_SIZE_MAX: 40,
  VERSION_MAX: 32,
  UPLOADED_BY_MAX: 100,
  DOC_SUMMARY_MAX: 500,
  DOC_URL_MAX: 300,
  TASK_TITLE_MAX: 200,
  ASSIGNEE_MAX: 100,
  AUTO_NAME_MAX: 140,
  AUTO_TRIGGER_MAX: 180,
  AUTO_TEMPLATE_MAX: 500,
  INVOICE_NUMBER_MAX: 40,
  INVOICE_TITLE_MAX: 160,
  CHAT_SENDER_MAX: 100,
  CHAT_TEXT_MAX: 1000,
  CHAT_ISO_MAX: 40,
} as const;

export function sanitizeId(raw: string): string {
  const cleaned = raw.replace(/[^a-zA-Z0-9_\-]/g, '_').slice(0, BLUEPRINT_CONSTRAINTS.ID_MAX_LEN);
  return cleaned.length > 0 ? cleaned : `id_${Date.now()}`;
}

export function clampString(val: string, maxLen: number, fallback = 'N/A'): string {
  const trimmed = (val || '').trim();
  if (!trimmed) return fallback.slice(0, maxLen);
  return trimmed.slice(0, maxLen);
}

export function clampInt(val: number, min: number, max: number): number {
  const num = Math.round(Number(val) || 0);
  return Math.max(min, Math.min(max, num));
}

export async function signInWithGoogle() {
  return signInWithPopup(auth, googleProvider);
}

export async function signOutUser() {
  return signOut(auth);
}
