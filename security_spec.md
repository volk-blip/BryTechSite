# BryTech Client Area & Admin Portal — Security Specification (Phase 0 TDD)

## 1. Data Invariants & Master Source of Truth

1. **Default-Deny Catch-All**: All paths default to `allow read, write: if false;` unless explicitly matched and validated.
2. **Verified Identity Invariant**: All read and write operations require `request.auth != null && request.auth.token.email_verified == true`.
3. **Master Gate (Relational Sync)**:
   - `/clients/{clientId}` is the Master Source of Truth for a client workspace (`ownerUid`).
   - Every subcollection (`/private/{infoId}`, `/products/{productId}`, `/timelines/{timelineId}`, `/documents/{documentId}`, `/tasks/{taskId}`, `/automations/{automationId}`, `/invoices/{invoiceId}`) derives access from the parent `/clients/{clientId}` document via `exists()` and `get()` on single-document operations (`get`, `create`, `update`, `delete`).
4. **PII Isolation (Split Collection Strategy)**:
   - `/clients/{clientId}` stores only non-PII workspace metadata (`businessName`, `contactName`, `city`, `market`, `planName`, `accountStatus`, `overallProgress`, costs, timestamps).
   - Sensitive contact PII (`email`, `phone`, `billingAddress`) is strictly isolated in `/clients/{clientId}/private/{infoId}` and only readable by the verified parent client owner or a verified administrator.
5. **Zero-Trust List Queries (Cost-Optimized Query Enforcer)**:
   - `allow list` never uses `get()` or `exists()` lookups (preventing O(N) read amplification) and never uses blanket `isSignedIn()`.
   - Every `allow list` rule enforces `isVerified() && (resource.data.ownerUid == request.auth.uid || isBootstrappedAdmin())`.
6. **Immutability & Temporal Integrity**:
   - `createdAt` must equal `request.time` on `create` and remain strictly unchanged on `update` (`incoming().createdAt == existing().createdAt`).
   - `updatedAt` must equal `request.time` on both `create` and `update`.
   - `ownerUid` and `clientId` are immutable after creation.
7. **Terminal State Locking**:
   - Entities that reach terminal states (`accountStatus == 'completed'`, `product.status == 'archived'`, `timeline.status == 'completed'`, `document.status == 'archived'`, `task.status == 'Completed'`, `invoice.status == 'Paid'`) cannot be modified by non-admin users.

---

## 2. The "Dirty Dozen" Adversarial Payloads

1. **Payload 1 — Unverified Email Spoof on Admin Account**:
   - Auth: `{ uid: 'attacker_1', token: { email: 'boris.brigin1@gmail.com', email_verified: false } }`
   - Target: `GET /clients/client_ua_1`
   - Expected: `PERMISSION_DENIED` (blocked by `request.auth.token.email_verified == true`).
2. **Payload 2 — Self-Escalation in `/admins/{adminUid}`**:
   - Auth: `{ uid: 'attacker_1', token: { email: 'attacker@evil.com', email_verified: true } }`
   - Target: `CREATE /admins/attacker_1` with `{ uid: 'attacker_1', role: 'super_admin', createdAt: SERVER_TIMESTAMP }`
   - Expected: `PERMISSION_DENIED` (`/admins` writes are strictly forbidden from clients).
3. **Payload 3 — Identity Spoofing on Client Creation**:
   - Auth: `{ uid: 'user_a', token: { email: 'a@test.com', email_verified: true } }`
   - Target: `CREATE /clients/client_spoof` with `ownerUid: 'user_b'`
   - Expected: `PERMISSION_DENIED` (non-admin creator must set `ownerUid == request.auth.uid`).
4. **Payload 4 — Shadow / Ghost Field Injection on Client Update**:
   - Auth: `{ uid: 'user_a', token: { email: 'a@test.com', email_verified: true } }`
   - Target: `UPDATE /clients/client_a` adding `{ isVerifiedAdmin: true }`
   - Expected: `PERMISSION_DENIED` (blocked by `data.keys().hasOnly(...)` in `isValidClientAccount` and `affectedKeys().hasOnly(...)`).
5. **Payload 5 — PII Cross-Tenant Read on `/clients/{clientId}/private/contact`**:
   - Auth: `{ uid: 'user_b', token: { email: 'b@test.com', email_verified: true } }`
   - Target: `GET /clients/client_a/private/contact`
   - Expected: `PERMISSION_DENIED` (Master Gate verifies parent `/clients/client_a.data.ownerUid == request.auth.uid`).
6. **Payload 6 — Orphaned Subcollection Write (Non-Existent Parent Client)**:
   - Auth: `{ uid: 'user_a', token: { email: 'a@test.com', email_verified: true } }`
   - Target: `CREATE /clients/ghost_client/products/prod_1`
   - Expected: `PERMISSION_DENIED` (`exists(/databases/$(database)/documents/clients/ghost_client)` is false).
7. **Payload 7 — ID Poisoning Attack (2KB Malformed Document ID)**:
   - Auth: `{ uid: 'user_a', token: { email: 'a@test.com', email_verified: true } }`
   - Target: `CREATE /clients/client_a/tasks/bad..id$$with!!symbols`
   - Expected: `PERMISSION_DENIED` (blocked by `isValidId(taskId)` regex `^[a-zA-Z0-9_\-]+$` and length `<= 128`).
8. **Payload 8 — Value Poisoning on Whitelisted Key (`overallProgress: 999`)**:
   - Auth: `{ uid: 'user_a', token: { email: 'a@test.com', email_verified: true } }`
   - Target: `UPDATE /clients/client_a` with `{ overallProgress: 999, updatedAt: SERVER_TIMESTAMP }`
   - Expected: `PERMISSION_DENIED` (blocked by `isValidClientAccount(incoming())` boundary check `overallProgress >= 0 && overallProgress <= 100`).
9. **Payload 9 — Terminal State Bypass on Paid Invoice**:
   - Auth: `{ uid: 'user_a', token: { email: 'a@test.com', email_verified: true } }`
   - Target: `UPDATE /clients/client_a/invoices/inv_paid` (where `existing().status == 'Paid'`) changing `status` back to `'Pending'`
   - Expected: `PERMISSION_DENIED` (blocked by terminal state lock `existing().status != 'Paid'`).
10. **Payload 10 — Immortal Field Mutation (`createdAt` / `ownerUid` Tampering)**:
    - Auth: `{ uid: 'user_a', token: { email: 'a@test.com', email_verified: true } }`
    - Target: `UPDATE /clients/client_a/documents/doc_1` mutating `ownerUid` to `'user_b'`
    - Expected: `PERMISSION_DENIED` (blocked by `incoming().ownerUid == existing().ownerUid` and `affectedKeys().hasOnly(...)`).
11. **Payload 11 — Forged Client-Side Timestamp (`createdAt` in the Past)**:
    - Auth: `{ uid: 'user_a', token: { email: 'a@test.com', email_verified: true } }`
    - Target: `CREATE /clients/client_a/tasks/task_1` with `createdAt: Timestamp.fromMillis(1000000)`
    - Expected: `PERMISSION_DENIED` (blocked by `incoming().createdAt == request.time`).
12. **Payload 12 — Unauthorized Blanket List Query on `/clients`**:
    - Auth: `{ uid: 'user_b', token: { email: 'b@test.com', email_verified: true } }`
    - Target: `LIST /clients` without `where('ownerUid', '==', 'user_b')`
    - Expected: `PERMISSION_DENIED` (blocked by `resource.data.ownerUid == request.auth.uid`).
