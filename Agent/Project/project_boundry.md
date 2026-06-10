# Project Boundary

## 1. Working Rules
* No commits without approval.
* No command execution without approval.
* Ask before coding if requirements are unclear.
* No assumptions or speculative implementation.
* Build modular, maintainable code only.
* Follow existing architecture and conventions.
* No new dependencies or architectural changes without approval.

---

## 2. Project Intent
**Problem:** Enterprise travel and expense management is currently managed via a fragmented system of emails, Excel sheets, manual phone calls, and physical paper documents. This manual approach is error-prone, slow, and lacks visibility, leading to high administrative overhead, compliance leaks, and employee frustration. (Trace: scope.md Section 1)  
**Goal:** To establish a unified, automated, and mobile-friendly enterprise travel and expense platform that simplifies pre-trip planning, guarantees 100% compliance with travel policies, and accelerates reimbursement cycles to under 5 business days. (Trace: scope.md Section 1)  

---

## 3. Scope Fence
| Area         | In Scope | Out of Scope |
| ------------ | -------- | ------------ |
| **Users** | Traveler, Approver (Line Manager/Department Head), Travel Desk, Finance Auditor, Admin. (Trace: scope.md Section 3) | General employees not registered in system, external travel agents (other than corporate Travel Desk). |
| **Platforms** | Web application (responsive web client) and optimized mobile web views. (Trace: scope.md Section 5) | Native mobile applications (iOS/Android). |
| **Features** | SSO & RBAC (F1), Travel Request Workflow (F2), Policy Configuration & Engine (F3), Expense Claim Creator & OCR (F4), Travel Booking Board (F5), Finance Audit Portal (F6), ERP Payout Exporter (F7), Analytics & Reporting Dashboard (F8). (Trace: scope.md Section 3) | Live GDS APIs integration (O1), Flight tracking and delay alerts (O2), Reconciling personal credit card statements (O3), Processing direct bank payouts (O4), Direct mileage tracking via GPS (O5). (Trace: scope.md Section 3) |
| **Data** | Traveler profile metadata, travel requests, bookings, expense reports, expense items, policy rules, and audit logs. (Trace: scope.md Section 2 / Section 4) | Personal credit card statements, direct bank payout transactions. (Trace: scope.md Section 3) |
| **Integrations** | SSO OIDC (Okta/Azure AD), OCR (AWS Textract/Google Document AI), Exchange Rates (Open Exchange Rates), Slack/MS Teams notifications, SAP/Oracle Financials ERP. (Trace: scope.md Section 2) | Live GDS APIs (Amadeus/Sabre) for automated booking fulfillment. (Trace: scope.md Section 3) |

---

## 4. Constraints
| Type              | Constraint |
| ----------------- | ---------- |
| **Infrastructure** | Deployed on AWS (ECS, Fargate), containerized using Docker, using Redis (for BullMQ queues) and ELK/Sentry. (Trace: scope.md Section 2) |
| **Security** | TLS 1.3 encryption in transit, AES-256 for database storage. SSO-only auth, SQL Injection prevention (Sequelize parameterized queries), Input Sanitization middleware, secure JWT Refresh Strategy, Rate Limiting (100 req/15 mins), and Audit Logging. (Trace: scope.md Section 5) |
| **Compliance** | Audit logging of all transactional changes, approvals, and data exports. (Trace: scope.md Section 5) |
| **Compatibility** | Latest versions of Chrome, Safari, Edge, Firefox. (Trace: scope.md Section 5) |
| **Budget / Timeline** | SSO OIDC Authentication target 2026-07-01, ERP Integration Endpoint target 2026-07-15. (Trace: scope.md Section 7) |

---

## 5. Assumptions & Dependencies
| Type       | Item |
| ---------- | ---- |
| **Assumption** | All employees have access to smartphones or web cameras for receipt scanning. (Trace: kpi.md Section 4 #1) |
| **Assumption** | Active Directory contains accurate and updated manager attributes for hierarchical routing. (Trace: kpi.md Section 4 #2) |
| **Dependency** | SSO OIDC Authentication integration by Internal IT Security Team by 2026-07-01. (Trace: kpi.md Section 4 #4 / scope.md Section 7) |
| **Dependency** | ERP Integration Endpoint configuration by Finance ERP Systems Team by 2026-07-15. (Trace: kpi.md Section 4 #3 / scope.md Section 7) |

---

## 6. Quality Standards
| Area            | Requirement           |
| --------------- | --------------------- |
| **Architecture** | Modular, SRP          |
| **Maintainability** | Clear naming & docs   |
| **Testing** | Core logic covered    |
| **Review** | Approval before merge |
| **Compatibility** | No breaking changes   |

---

## 7. Explicit Exclusions
* Live GDS APIs (Amadeus/Sabre) integration for automated booking fulfillment. (Trace: scope.md Section 3 O1)
* Live tracking of flights, delay alerts, or automated compensation claims. (Trace: scope.md Section 3 O2)
* Reconciling personal credit card statements (corporate cards only). (Trace: scope.md Section 3 O3)
* Processing direct bank payouts (system will export payout batches to ERP for processing). (Trace: scope.md Section 3 O4)
* Direct mileage tracking via GPS integration (manual mileage log is supported). (Trace: scope.md Section 3 O5)

---

## 8. Change Control
Changes to scope, architecture, integrations, security, infrastructure, or timelines require approval before implementation.
