/**
 * Phase 0 TDD Verification Suite for BryTech Firestore Security Rules
 * Verifies that all 12 "Dirty Dozen" adversarial payloads return PERMISSION_DENIED.
 */

export interface DirtyDozenTestCase {
  id: number;
  name: string;
  collectionPath: string;
  operation: 'get' | 'list' | 'create' | 'update' | 'delete';
  auth: {
    uid: string;
    email: string;
    email_verified: boolean;
  } | null;
  payload?: Record<string, unknown>;
  expectedResult: 'PERMISSION_DENIED';
}

export const DIRTY_DOZEN_TEST_CASES: DirtyDozenTestCase[] = [
  {
    id: 1,
    name: 'Unverified Email Spoof on Bootstrapped Admin Account',
    collectionPath: '/clients/client_ua_1',
    operation: 'get',
    auth: {
      uid: 'attacker_1',
      email: 'boris.brigin1@gmail.com',
      email_verified: false,
    },
    expectedResult: 'PERMISSION_DENIED',
  },
  {
    id: 2,
    name: 'Privilege Self-Escalation via /admins Write',
    collectionPath: '/admins/attacker_1',
    operation: 'create',
    auth: {
      uid: 'attacker_1',
      email: 'attacker@evil.com',
      email_verified: true,
    },
    payload: {
      uid: 'attacker_1',
      role: 'super_admin',
      createdAt: 'REQUEST_TIME',
    },
    expectedResult: 'PERMISSION_DENIED',
  },
  {
    id: 3,
    name: 'Identity Spoofing on Client Account Creation',
    collectionPath: '/clients/client_spoof',
    operation: 'create',
    auth: {
      uid: 'user_a',
      email: 'a@test.com',
      email_verified: true,
    },
    payload: {
      ownerUid: 'user_b',
      businessName: 'Spoofed Corp',
      contactName: 'Attacker',
      city: 'Kyiv',
      market: 'Ukraine',
      planName: 'Full System',
      accountStatus: 'active',
      overallProgress: 50,
      estimatedAgencyCostUsd: 15000,
      brytechTotalPaidUsd: 2500,
      assignedPm: 'Bohdan K.',
      createdAt: 'REQUEST_TIME',
      updatedAt: 'REQUEST_TIME',
    },
    expectedResult: 'PERMISSION_DENIED',
  },
  {
    id: 4,
    name: 'Shadow Ghost Field Injection on Client Update',
    collectionPath: '/clients/client_a',
    operation: 'update',
    auth: {
      uid: 'user_a',
      email: 'a@test.com',
      email_verified: true,
    },
    payload: {
      overallProgress: 80,
      isSuperAdmin: true,
      updatedAt: 'REQUEST_TIME',
    },
    expectedResult: 'PERMISSION_DENIED',
  },
  {
    id: 5,
    name: 'Cross-Tenant PII Leak Attempt on /clients/{clientId}/private/contact',
    collectionPath: '/clients/client_a/private/contact',
    operation: 'get',
    auth: {
      uid: 'user_b',
      email: 'b@test.com',
      email_verified: true,
    },
    expectedResult: 'PERMISSION_DENIED',
  },
  {
    id: 6,
    name: 'Orphaned Subcollection Write Without Existing Parent Client',
    collectionPath: '/clients/non_existent_client/products/prod_1',
    operation: 'create',
    auth: {
      uid: 'user_a',
      email: 'a@test.com',
      email_verified: true,
    },
    payload: {
      clientId: 'non_existent_client',
      ownerUid: 'user_a',
      name: 'Orphan Website',
      type: 'Website',
      domainOrHandle: 'orphan.ua',
      progress: 10,
      status: 'in_progress',
      currentPhase: 'Phase 1',
      leadsOrEventsMonth: 0,
      metricLabel: 'Leads',
      maintenanceMode: false,
      lastDeploy: 'Never',
      createdAt: 'REQUEST_TIME',
      updatedAt: 'REQUEST_TIME',
    },
    expectedResult: 'PERMISSION_DENIED',
  },
  {
    id: 7,
    name: 'ID Poisoning Attack With Invalid Characters in Document ID',
    collectionPath: '/clients/client_a/tasks/invalid$id!with*symbols',
    operation: 'create',
    auth: {
      uid: 'user_a',
      email: 'a@test.com',
      email_verified: true,
    },
    payload: {
      clientId: 'client_a',
      productId: 'prod_1',
      productName: 'Website',
      ownerUid: 'user_a',
      title: 'Fix header',
      priority: 'Normal',
      status: 'In Progress',
      assignee: 'Kyiv Squad',
      createdAt: 'REQUEST_TIME',
      updatedAt: 'REQUEST_TIME',
    },
    expectedResult: 'PERMISSION_DENIED',
  },
  {
    id: 8,
    name: 'Value Poisoning on Whitelisted Progress Field (Out of Range > 100)',
    collectionPath: '/clients/client_a',
    operation: 'update',
    auth: {
      uid: 'user_a',
      email: 'a@test.com',
      email_verified: true,
    },
    payload: {
      overallProgress: 999,
      updatedAt: 'REQUEST_TIME',
    },
    expectedResult: 'PERMISSION_DENIED',
  },
  {
    id: 9,
    name: 'Terminal State Bypass on Paid Invoice',
    collectionPath: '/clients/client_a/invoices/inv_paid',
    operation: 'update',
    auth: {
      uid: 'user_a',
      email: 'a@test.com',
      email_verified: true,
    },
    payload: {
      status: 'Pending',
      updatedAt: 'REQUEST_TIME',
    },
    expectedResult: 'PERMISSION_DENIED',
  },
  {
    id: 10,
    name: 'Immortal Field Mutation (ownerUid Tampering on Document Update)',
    collectionPath: '/clients/client_a/documents/doc_1',
    operation: 'update',
    auth: {
      uid: 'user_a',
      email: 'a@test.com',
      email_verified: true,
    },
    payload: {
      ownerUid: 'user_b',
      status: 'approved',
      updatedAt: 'REQUEST_TIME',
    },
    expectedResult: 'PERMISSION_DENIED',
  },
  {
    id: 11,
    name: 'Forged Past Timestamp on Task Creation',
    collectionPath: '/clients/client_a/tasks/task_1',
    operation: 'create',
    auth: {
      uid: 'user_a',
      email: 'a@test.com',
      email_verified: true,
    },
    payload: {
      clientId: 'client_a',
      productId: 'prod_1',
      productName: 'Website',
      ownerUid: 'user_a',
      title: 'Backdated task',
      priority: 'High',
      status: 'In Progress',
      assignee: 'Kyiv Squad',
      createdAt: '1999-01-01T00:00:00Z',
      updatedAt: 'REQUEST_TIME',
    },
    expectedResult: 'PERMISSION_DENIED',
  },
  {
    id: 12,
    name: 'Unfiltered Cross-Tenant List Scraping on /clients',
    collectionPath: '/clients',
    operation: 'list',
    auth: {
      uid: 'user_b',
      email: 'b@test.com',
      email_verified: true,
    },
    expectedResult: 'PERMISSION_DENIED',
  },
];
