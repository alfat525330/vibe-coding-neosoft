# Scope Document
**Project:** Voyager: Enterprise Employee Travel & Expense Management System  
**Version:** 1.0.0  
**Date:** 2026-06-09  
**Status:** Review  
--
## 1. Overview
**Problem:** Enterprise travel and expense management is currently managed via a fragmented system of emails, Excel sheets, manual phone calls, and physical paper documents. This manual approach is error-prone, slow, and lacks visibility, leading to high administrative overhead, compliance leaks, and employee frustration. (Trace: PRD Section 1)  
**Solution:** Voyager is an enterprise web and mobile application designed to digitize and automate the entire travel and expense lifecycle. Voyager allows employees to submit pre-trip travel requests, receive automated policy checks and hierarchical approvals, submit post-trip expense claims via OCR-powered receipt uploads, and track reimbursement status in real-time. It provides Travel Desk operators with a central booking fulfillment board and gives Finance teams tools for automated policy auditing, ERP export generation, and budget analytics. (Trace: PRD Section 2)  
**Goal:** To establish a unified, automated, and mobile-friendly enterprise travel and expense platform that simplifies pre-trip planning, guarantees 100% compliance with travel policies, and accelerates reimbursement cycles to under 5 business days. (Trace: PRD Section 1)  

---

## 2. Tech Stack
| Layer | Stack |
|---------|---------|
| Frontend | React.js v19 (Functional Components, Redux Toolkit, Axios, React Query, Vite) (Trace: PRD Section 3) |
| Backend | Node.js v20 (LTS), Express.js (Microservice Architecture, ES Modules, REST, BullMQ) (Trace: PRD Section 3) |
| Database | MySQL v8.0 (Sequelize ORM) (Trace: PRD Section 3 / KPI Section 1.1) |
| Auth | JWT Authentication (Access/Refresh Tokens with rotation strategy) (Trace: PRD Section 3 / KPI Section 1.1) |
| Infra | AWS (ECS, Fargate), Docker, GitHub Actions, AWS CloudWatch, Datadog, ELK Stack, Sentry (Trace: PRD Section 3) |
| Integrations | Azure AD / Okta (SSO), AWS Textract / Google Document AI (OCR), Open Exchange Rates API, Slack / MS Teams, SAP / Oracle Financials ERP (Trace: PRD Section 3) |
---
## 3. Scope
### In Scope
| ID | Feature | Notes |
|-----|---------|---------|
| F1 | SSO & Role-Based Access Control | Integrated with Okta / Azure AD. Roles: Traveler, Approver, Travel Desk, Finance Auditor, Admin. (Trace: PRD Feature 1, KPI-SSO-001/002) |
| F2 | Travel Request Workflow (Pre-Trip) | Submission form for trips including estimates, dates, destination, and purpose. Hierarchical approval router. (Trace: PRD Feature 2, KPI-TR-001/002) |
| F3 | Policy Configuration & Engine | Rule settings for flight caps, lodging caps, daily meal limits. Flags or blocks violations. (Trace: PRD Feature 3, KPI-POL-001/002) |
| F4 | Expense Claim Creator & OCR | Receipt image upload. OCR extracts date, merchant, amount, tax. Matches to approved pre-trip request. (Trace: PRD Feature 4, KPI-EXP-001/002) |
| F5 | Travel Booking Board | Dashboard for corporate Travel Desk to view approved requests and mark bookings complete. (Trace: PRD Feature 5, KPI-TBB-001/002) |
| F6 | Finance Audit Portal | Audit UI to filter, audit, approve/reject line items, and check receipts. (Trace: PRD Feature 6, KPI-AUD-001/002) |
| F7 | ERP Payout Exporter | Exports approved claims in formatted JSON/CSV compatible with SAP and Oracle. (Trace: PRD Feature 7, KPI-ERP-001/002) |
| F8 | Analytics & Reporting Dashboard | Spend tracking by department, policy overrides, and leakage. (Trace: PRD Feature 8, KPI-ANA-001/002) |

### Out of Scope
| ID | Exclusion | Reason |
|-----|-----------|---------|
| O1 | Live integration with GDS APIs (Amadeus/Sabre) for automated booking fulfillment | Phase 1 will use Travel Desk manual bookings. (Trace: PRD Scope) |
| O2 | Live tracking of flights, delay alerts, or automated compensation claims | Decided as out of scope for initial release. (Trace: PRD Scope) |
| O3 | Reconciling personal credit card statements | System supports corporate credit cards only. (Trace: PRD Scope) |
| O4 | Processing direct bank payouts | System exports payout batches to ERP for processing. (Trace: PRD Scope) |
| O5 | Direct mileage tracking via GPS integration | Manual mileage log is supported instead. (Trace: PRD Scope) |

---

## 4. Requirements
| ID | Feature | Priority (P0/P1/P2) | User Story | Acceptance Criteria |
|----|----------|----------------------|------------|---------------------|
| F1 | SSO & Role-Based Access Control | P0 | As an authenticated user, I want to log in using corporate SSO so that I can access my account securely. | SSO Authentication Success Rate >= 99.9%. Zero token expiry security violations. (Trace: KPI-SSO-001, KPI-SSO-002) |
| F2 | Travel Request Workflow (Pre-Trip) | P0 | As a traveler, I want to submit a pre-trip travel request detailing my itinerary and estimated costs so that my manager can approve it. | Evaluates policy rules and routes request to manager. Manager action updates status to `APPROVED_BY_MANAGER`. Approval turnaround < 48 Hours. (Trace: PRD AC-001, AC-003, KPI-TR-001, KPI-TR-002) |
| F3 | Policy Configuration & Engine | P0 | As an administrator, I want to configure travel spending limits so that compliance is automatically enforced. | Daily lodging cap check displays policy warning and requires justification. Exceeding absolute budget cap ($5,000) blocks submission. Spend leakage < 1%. (Trace: PRD AC-002, KPI-POL-001, KPI-POL-002) |
| F4 | Expense Claim Creator & OCR | P0 | As a traveler, I want to scan my receipt and have the details pre-filled so that I can submit my expenses quickly. | Extract Date, Merchant, Amount, and Tax. OCR accuracy > 85% correct extraction. Submission time < 10 minutes. Handles multi-currency EUR conversion. Checks for duplicate receipts. (Trace: PRD AC-004, AC-005, KPI-EXP-001, KPI-EXP-002) |
| F5 | Travel Booking Board | P1 | As a Travel Desk operator, I want a central dashboard of approved requests so that I can coordinate and book travel. | Central dashboard updates in real-time. Booking fulfillment time < 24 Hours. (Trace: PRD AC-003, KPI-TBB-001, KPI-TBB-002) |
| F6 | Finance Audit Portal | P1 | As a Finance auditor, I want a portal to verify submitted claims so that I can approve them for payout. | Dedicated portal to filter, audit, approve/reject line items. Audit turnaround time < 72 hours. (Trace: PRD Feature 6, KPI-AUD-001, KPI-AUD-002) |
| F7 | ERP Payout Exporter | P1 | As a Finance administrator, I want to export approved claims so that they can be loaded into SAP/Oracle ERP. | Export files formatted in JSON/CSV. ERP Integration Sync Success Rate 100%. End-to-end Reimbursement Cycle Time < 5 Days. (Trace: PRD Feature 7, KPI-ERP-001, KPI-ERP-002) |
| F8 | Analytics & Reporting Dashboard | P2 | As an executive, I want to view travel spend analytics so that I can track budgets and policy violation trends. | Visual reports tracking departmental spend and overrides. Dashboard response time < 3 seconds. Data sync latency < 24 Hours. (Trace: PRD Feature 8, KPI-ANA-001, KPI-ANA-002) |

---

## 5. Non-Functional Requirements
| Area | Requirement |
|--------|------------|
| Performance | Page load time < 2 seconds. OCR extraction complete in < 5 seconds. Front-end utilizes optimized rendering (React.memo, useMemo) and virtual scrolling for large datasets. Dashboard query response time < 3 seconds. (Trace: PRD NFR, PRD Tech Stack, KPI-ANA-001) |
| Scalability | Support 10,000+ total users and up to 1,000 concurrent active sessions. (Trace: PRD NFR) |
| Security | TLS 1.3 encryption in transit, AES-256 for database storage. SSO-only authentication. SQL Injection prevention via Sequelize parameterized queries, Input Sanitization middleware, secure JWT Refresh Strategy, Rate Limiting (100 req/15 mins), and Audit Logging. (Trace: PRD NFR, PRD Tech Stack) |
| Availability | 99.9% availability during business hours (6 AM to 10 PM EST). (Trace: PRD NFR) |
| Accessibility | WCAG 2.1 AA compliant. (Trace: PRD NFR) |
| Compatibility | Latest versions of Chrome, Safari, Edge, Firefox. Fully responsive web client and optimized mobile web views. (Trace: PRD NFR) |

---

## 6. Design Guidelines
**Design System:** Custom (CSS Variables for branding, responsive layout variables) (Trace: PRD Tech Stack)  
**Theme:** Enterprise (premium aesthetic, sleek dark modes, vibrant colors, clean layouts, and micro-animations) (Trace: PRD NFR / Design Aesthetics)  
**Standards**
- Typography: Modern typography (Google Fonts - Inter / Roboto / Outfit) (Trace: PRD NFR / Design Aesthetics)
- Spacing: Responsive spacing layout (CSS variables-based layout grid) (Trace: PRD Tech Stack)
- Accessibility: WCAG 2.1 AA compliant (Trace: PRD NFR)
- Responsive Breakpoints: Desktop, Tablet, Mobile (Fully responsive web client) (Trace: PRD NFR)

---

## 7. Timeline
| Phase | Deliverable | Target Date |
|---------|-------------|------------|
| Discovery | Functional definitions & SSO scoping (Okta/Azure AD integration scopes mapped). | 2026-06-15 (Estimated) |
| Design | Wireframes and high-fidelity mockups of audit and traveler portals. | 2026-06-30 (Estimated) |
| Development | Core application development (SSO OIDC authentication integration). | 2026-07-01 (Trace: PRD SSO dependency deadline) |
| QA | Integration testing, security testing, and OCR accuracy validation. | 2026-07-10 (Estimated) |
| Launch | Go-Live with ERP integrations (SAP/Oracle Batch CSV/JSON export setup). | 2026-07-15 (Trace: PRD ERP dependency deadline) |

---

## 8. Success Metrics
| KPI | Target |
|------|--------|
| Adoption | Low Employee Adoption risk mitigated by training webinars & pilot programs starting with high-travel Sales team. (Trace: PRD Risks) |
| Performance | Reimbursement Cycle Time (North Star Metric) < 5 Days. (Trace: KPI-ERP-001) |
| Conversion | OCR Accuracy Rate > 85% correct extraction. (Trace: KPI-EXP-001) |
| User Satisfaction | Expense Submission Time < 10 Minutes per report. (Trace: KPI-EXP-002) |
---