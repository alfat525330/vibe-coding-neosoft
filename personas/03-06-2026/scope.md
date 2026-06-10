# Scope Document
## Project: Enterprise Employee Travel & Expense (T&E) Management System
**Codename:** NexTravel Enterprise  
**Document Version:** 1.0.0  
**Status:** Draft for Review  
**Prepared Based On:** `prd.md` v1.0.0, `kpi.md` v1.0.0

---

## 1. Information Confirmed

### 1.1 Business Context & Problem Statement
- **Organization:** 10,000+ employees across multiple global locations
- **Current State:** Manual emails, disconnected spreadsheets, paper receipts, Excel sheets
- **Pain Points:** 22-day reimbursement latency, absence of pre-trip spend forecasting, high compliance leakage, massive processing gridlocks
- **Business Goals Supported:**
  - Operational Velocity: Multi-week to near-instantaneous request routing
  - Capital Preservation: Eliminate out-of-policy leakage, maximize early-booking discounts
  - Regulatory Compliance: Digital audit trails for international tax codes, local labor laws, per-diem allowances
  - Employee Experience: Minimize administrative friction, elevate morale

### 1.2 Functional Modules (In-Scope)
The following modules are explicitly defined in PRD Section 5:

| Module | Key Features |
|--------|-------------|
| **Travel Request Management** | Create/Edit/Cancel requests, historical filterable data grids, real-time status tracking. Business rule: Pre-trip authorization must be `APPROVED` before expense filing or booking integrations activate. International plans require explicit visa status tracking. Validation: Departure Date >= current date + 3 days (Domestic) or >= current date + 14 days (International), otherwise mandatory high-level business overrides required. |
| **Approval Workflow Management** | Multi-level dynamic hierarchy evaluation, configurable dollar-threshold routing rules, automated SLA escalation workers, active delegation proxies. SLA: 18-to-24 hour decision boundary. If items remain un-actioned over 24 hours, automated worker transfers to next supervisor level and logs escalation metric (`AW-04`). |
| **Expense Management** | Multi-itemized expense forms attached to valid Travel Request ID, asynchronous secure receipt drag-drop loaders, dynamic currency normalization handlers. Validation: Valid receipt images mandatory for entries >= $25.00 USD (`EM-03`). Daily meal entries bounded against city per-diem matrix. Background checks to isolate matching amounts, dates, and vendors to block duplicate entries (`EM-05`). |
| **Reimbursement Management** | Bulk verification workflows for accounting staff, automated extraction of NACHA/ACH/SEPA compliance bank transfer files, error tracking mechanisms. |

### 1.3 User Stories (Explicitly Defined)
- **US-101 (Pre-Trip Authorization):** Employee submits digital travel request with estimated costs, secures management approval, utilizes corporate booking rates. AC1: All required parameters fully entered. AC2: Real-time budget availability displayed during drafting. AC3: Submission transfers state to `PENDING_APPROVAL` under 1 second.
- **US-202 (Mobile Receipt Capture & Policy Guard):** Employee uploads receipt from mobile, assigns to expense category, system runs policy checks and flags compliance issues before submit. AC1: Block submit if lines >= $25 miss receipt attachments. AC2: Enforce per-diem caps and require 150-character explanations if overridden.

### 1.4 Technology Stack (Explicitly Defined)
- **Frontend:** React.js v19, Redux Toolkit, Axios, React Query
- **Backend:** Node.js LTS, Express.js, Sequelize ORM
- **Database:** MySQL (highly normalized tables with foreign keys, strict cascades, audit parameters)
- **Database Indexes (Explicit):**
  - `idx_approvals_approver_status` on `travel_approvals (approver_id, status)`
  - `idx_expenses_date_amount` on `expense_items (transaction_date, amount)`
  - `idx_expense_dup_check` on `expense_items (transaction_date, amount, category)`

### 1.5 Security Architecture (Explicitly Defined)
- **Authentication:** Access tokens expire at 15 minutes (passed in code variables). Refresh tokens secured in HttpOnly, SameSite=Strict, Secure cookie headers with 7-day expiration.
- **Data Protection:** Input validation via Joi handlers, Sequelize parameterized queries (SQL injection prevention), AES-256 encryption at rest.

### 1.6 Non-Functional Requirements (Explicitly Defined)
- **Performance:** Web transactional endpoints return JSON under 2.0 seconds under maximum concurrent volumes. Complex dashboard queries render fully under 3.0 seconds.
- **Scalability:** 10,000+ employee definitions; stability over peak windows of 3,500+ active user instances.
- **Uptime:** 99.95% cloud accessibility profile.
- **Testing:** 100% backend module coverage via Jest. Frontend via React Testing Library. API validation via Supertest. System scale/memory profiling via k6 load tests.
- **Deployment:** GitHub Actions CI/CD with linting, security scanning, Docker container packaging, blue-green zero-downtime rolling canary releases onto container clusters.

### 1.7 MVP Roadmap (Explicitly Defined - 150 Days)
- **Phase 1 (Days 1-30):** Travel Request layouts, infrastructure schema generation, core identity RBAC initialization.
- **Phase 2 (Days 31-60):** Matrix multi-level approval engines routing, automated SLA escalations, notifications systems.
- **Phase 3 (Days 61-90):** Expense module launch, line item splitting mechanics, receipt secure upload integrations, duplicate matching logic.
- **Phase 4 (Days 91-120):** Reimbursement batch files engines, payroll system ACH export connectors, bank verification loops.
- **Phase 5 (Days 121-150):** Analytics dashboards deployment, BI integrations, extensive performance engineering, production release.

### 1.8 KPI Framework (Explicitly Defined)
**8 KPI Categories with 20+ Specific Metrics:**

| Category | KPI IDs | Target Examples |
|----------|---------|-----------------|
| Travel Request (TR) | TR-01, TR-02, TR-03, TR-04 | TR-02: < 18 Hours approval turnaround |
| Approval Workflow (AW) | AW-01, AW-02, AW-03, AW-04 | AW-03: > 92% SLA compliance; AW-04: < 3% escalation |
| Expense Management (EM) | EM-01, EM-02, EM-03, EM-04, EM-05 | EM-03: 100% receipt compliance for >= $25; EM-05: 100% duplicate capture |
| Reimbursement (RE) | RE-01, RE-02, RE-03, RE-04 | RE-01: < 5 Business Days cycle time |
| Compliance (CO) | CO-01, CO-02, CO-03, CO-04 | CO-01: < 4% policy violation rate |
| Financial (FI) | FI-01, FI-02, FI-03, FI-04, FI-05 | FI-05: > $450,000/year savings |
| Employee Experience (EX) | EX-01, EX-02, EX-03, EX-04 | EX-02: > 95% adoption within 90 days |
| System Performance (SP) | SP-01, SP-02, SP-03, SP-04 | SP-01: > 99.95% availability; SP-04: 3,500+ concurrent users |

### 1.9 Dashboard Requirements (Explicitly Defined)
4 role-based dashboards:

| Dashboard | Primary Audience | Core Metrics | Refresh Frequency |
|-----------|------------------|--------------|-------------------|
| Executive Leadership | CEO, CFO, COO, VP Finance | FI-01, FI-04, CO-02, FI-05, RE-01 | Weekly / on-demand |
| Department Managers | Business Unit Leaders, Engineering Managers | AW-03, AW-01, AW-02, Budget Utilization % | Near real-time (5-min) |
| Finance Operations & Audit | Accounts Payable, Internal Auditors | EM-02, EM-05, CO-01, RE-04 | Real-time |
| HR & Travel Administrative | Global Travel Admins, Change Management | TR-01, EX-02, EX-04, EX-01 | Daily |

### 1.10 Reporting Schedule (Explicitly Defined)
- **Daily:** System Status, Exception Reports, Active Pending Approval Count (>24hr breaches), flagged high-risk duplicate detection. Delivery: Slack/Teams notifications.
- **Weekly:** SLA Compliance Matrix, average claim processing durations, support ticket trends, top recurring policy violation themes. Delivery: Scheduled PDF via platform.
- **Monthly:** Total Travel Spend vs Budget, Department-wise Cost, CSAT, System Adoption Rate. Delivery: Interactive review meeting with auto-populated slide deck.
- **Quarterly:** Aggregated Corporate ROI Dashboard, Travel Cost Savings, Out-of-Policy Variance trends, infrastructure scaling analysis, vendor negotiation briefs. Delivery: Formal Executive Board presentation.

### 1.11 Data Sources (Explicitly Defined)
- Concur/Amadeus GDS → Travel Requests
- Mobile/Web Receipts → Expense Claims
- Workflow Engine → Approval Logs
- SAP/Oracle ERP → Finance Transactions
- IAM / Active Directory → User Activity
- Security Event Bus → Audit Logs

### 1.12 RACI Matrix (Explicitly Defined)
| KPI ID / Category | Employee | Line Manager | Finance Team | HR/Admin | System Admin | Exec Leadership |
|-------------------|:--------:|:------------:|:------------:|:--------:|:------------:|:---------------:|
| TR-02 (Approval Turnaround) | I | **R** | I | C | I | **A** |
| AW-03 (SLA Compliance) | I | **R** | I | C | I | **A** |
| EM-02 (Processing Time) | I | I | **R** | I | C | **A** |
| EM-05 (Duplicate Detection) | I | I | **R** | I | **R** / C | **A** |
| RE-01 (Reimbursement Speed) | I | I | **R** | I | I | **A** |
| CO-01 (Policy Violation Rate) | **R** | C | **R** | C | I | **A** |
| FI-01 (Total Travel Spend) | I | C | **R** / C | I | I | **A** |
| EX-02 (System Adoption) | **R** | C | I | **R** / C | I | **A** |
| SP-01 (System Availability) | I | I | I | I | **R** | **A** |

### 1.13 Project Success Metrics (Explicitly Defined - 180-day post-go-live)
- **Manual Effort Reduction:** 75% reduction in hours spent compiling receipts, typing descriptions, resolving GL code discrepancies.
- **Processing Time Reduction:** End-to-end cycle from 22 calendar days to < 5 business days.
- **Employee Satisfaction:** Minimum 4.4 out of 5.0 rating.
- **Policy Compliance:** Out-of-policy corporate card spend from ~12% down to < 4%.
- **Operational Cost Reduction:** Cost per claim from ~$28 down to < $6 via automation.

### 1.14 Future Enhancements (Explicitly Deferred)
- Cross-platform React Native mobile application with native offline capture
- Cloud Vision AI receipt reading for hands-free form population
- Advanced machine learning models for corporate fraud profiling
- Direct Webhook sync with ERP suites (SAP S/4HANA, Workday Core Financials)

---

## 2. Missing Information

The following critical information is **not explicitly defined** in the source documents and must be addressed before finalizing scope:

| # | Missing Item | Impact on Scope |
|---|-------------|-----------------|
| 1 | **Specific Jurisdictions / Regulatory Frameworks** | KPI references "international tax codes, local labor laws, per-diem allowances" but does not name specific countries or regulatory bodies. Scope cannot define specific compliance rules without this. |
| 2 | **Integration Specification Detail** | KPI Section 7 lists enterprise data sources (Concur/Amadeus GDS, SAP/Oracle ERP, IAM/Active Directory, Security Event Bus) as ingestion requirements, but the PRD backend architecture does not detail specific integration patterns, API contracts, or data transformation rules for these systems. |
| 3 | **Notification & Communication Architecture** | PRD mentions "notifications systems" and "automated reminders" but does not define channels (email, SMS, in-app, push), templates, or escalation protocols. |
| 4 | **Receipt OCR / Extraction Engine** | PRD references "receipt secure upload integrations" and "OCR parsed lines" in KPI Section 7, but does not specify whether OCR is built in-house, third-party vendor, or which vendors/APIs are approved. |
| 5 | **Currency Normalization Rules** | PRD mentions "dynamic currency normalization handlers" but does not define which currencies, exchange rate sources, rounding rules, or historical rate storage requirements apply. |
| 6 | **Per-Diem Matrix Source** | PRD references "city per-diem matrix" but does not define the source (GSA rates, corporate negotiated rates, third-party service) or update frequency. |
| 7 | **Banking / NACHA / ACH / SEPA Details** | PRD mentions "NACHA/ACH/SEPA compliance bank transfer files" but does not specify supported countries, banking partners, file formats, or validation rules. |
| 8 | **Identity Provider (IdP) Integration** | PRD mentions "corporate directory alignments" and "IAM / Active Dir." in data sources, but does not specify SSO protocol (SAML 2.0, OIDC, LDAP), identity provider vendor, or user provisioning/deprovisioning workflows. |
| 9 | **Data Retention & Archive Policies** | KPI requires "100% digital receipt archiving and audit readiness" but does not specify retention periods, archive storage tier (hot/warm/cold), or legal hold procedures. |
| 10 | **Disaster Recovery & Backup Strategy** | 99.95% availability is targeted, but no RPO (Recovery Point Objective), RTO (Recovery Time Objective), or backup cadence are defined. |

---

## 3. Clarification Questions

The following questions require explicit answers before scope can be finalized:

### 3.1 Regulatory & Compliance Scope
**Q1:** Which specific jurisdictions, tax codes, and regulatory frameworks must the system comply with? (e.g., IRS Publication 463, EU VAT directives, specific country labor laws, local data residency requirements)

**Q2:** What is the source of truth for the "city per-diem matrix"? Is it GSA rates, a third-party service (e.g., Concur, SAP Travel), or an internally maintained spreadsheet? Who owns updates to this matrix?

### 3.2 Integration & Technical Boundaries
**Q3:** Which specific enterprise systems are in scope for integration?
- Travel Booking: Concur, Amadeus, Sabre, or other GDS?
- ERP: SAP, Oracle, Workday, or multiple?
- Identity: Active Directory, Azure AD, Okta, other IdP?
- Banking: Which countries require ACH vs. SEPA vs. other local payment rails?

**Q4:** Will the system include native OCR/receipt parsing, or will it rely on a third-party vendor (e.g., Google Cloud Vision, AWS Textract, Abbyy)? If third-party, which vendor is approved?

**Q5:** What is the identity and access management (IAM) architecture? SSO via SAML 2.0 or OIDC? Which corporate IdP? How are user lifecycle events (hires, terminations, role changes) provisioned?

### 3.3 Deployment & Infrastructure
**Q6:** Where will the system be hosted? (AWS, Azure, GCP, on-premises, hybrid?) Are there specific cloud region requirements for data residency?

**Q7:** What are the RPO and RTO targets for disaster recovery? What backup cadence and retention periods apply to financial transaction data vs. receipt images?

### 3.4 Scope Boundaries
**Q8:** The PRD Section 17 lists "Future Enhancements" (React Native app, Cloud Vision AI, ML fraud profiling, ERP webhooks). Should these be formally documented as out-of-scope for the MVP with planned follow-on phases, or is there flexibility to include any in the initial 150-day timeline?

**Q9:** The KPI document defines 4 detailed role-based dashboards (Executive, Department Managers, Finance Operations, HR/Travel Admin). The PRD MVP roadmap (Phase 5) only references "Analytics dashboards deployment" generally. Should all 4 dashboards be in-scope for MVP delivery, or are some deferred to post-MVP?

**Q10:** Are there specific browser or mobile web browser support requirements? (e.g., Chrome, Edge, Safari, mobile Safari, Chrome Android, minimum versions)

### 3.5 Data & Analytics
**Q11:** The KPI framework references "Predictive AI" and "Hyper-Automation" in Section 10.4 as continuous improvement recommendations. Should these be explicitly called out as post-MVP roadmap items, or is there an expectation to include basic rule-based automation (e.g., auto-approval for low-risk items) in the initial scope?

---

## 4. Proposed Solution (Based on Confirmed Information)

### 4.1 In-Scope Deliverables
Based on explicit statements in `prd.md` and `kpi.md`, the following are confirmed in-scope:

**Core Functional Modules:**
1. Travel Request Management (CRUD, approval prerequisite, visa tracking, date validation)
2. Approval Workflow Management (multi-level hierarchy, dollar-threshold routing, SLA escalation at 24h, delegation proxies)
3. Expense Management (itemized forms, receipt upload >= $25, duplicate detection, per-diem enforcement, currency normalization)
4. Reimbursement Management (bulk verification, ACH/NACHA/SEPA file generation, error tracking)

**Dashboards (All 4 Role-Based):**
- Executive Leadership Dashboard (FI-01, FI-04, CO-02, FI-05, RE-01)
- Department Managers Dashboard (AW-03, AW-01, AW-02, Budget Utilization)
- Finance Operations & Audit Dashboard (EM-02, EM-05, CO-01, RE-04)
- HR & Travel Administrative Dashboard (TR-01, EX-02, EX-04, EX-01)

**Reporting:**
- Daily automated reports (Slack/Teams)
- Weekly PDF reports
- Monthly interactive briefings
- Quarterly executive presentations

**Technical Deliverables:**
- React 19 frontend with Redux Toolkit, Axios, React Query
- Node.js LTS / Express.js microservices backend
- Sequelize ORM with MySQL database (including specified indexes)
- Joi validation, parameterized queries, AES-256 encryption
- JWT authentication (15-min access, 7-day refresh in HttpOnly cookies)
- Jest backend tests, React Testing Library frontend tests, Supertest API tests, k6 load tests
- GitHub Actions CI/CD with Docker, blue-green canary deployments

**KPI Measurement Framework:**
- All 20+ KPIs across 8 categories instrumented for data collection
- Dashboard visualization aligned to KPI definitions
- Alerting system (Green/Yellow/Red thresholds)
- RACI-defined ownership model

### 4.2 Out-of-Scope (Explicitly Deferred)
- React Native mobile application (PRD Section 17.1)
- Cloud Vision AI receipt reading (PRD Section 17.2)
- Advanced ML fraud profiling (PRD Section 17.3)
- Direct Webhook sync with SAP S/4HANA / Workday (PRD Section 17.4)

### 4.3 Architecture Constraints
- Microservices architecture (User, Travel, Approval, Expense, Reimbursement services)
- MySQL database with normalized schema
- Enterprise Service Bus (ESB) for ERP integration
- 99.95% availability target
- 3,500+ concurrent user support

### 4.4 Key Dependencies Requiring Clarification
The following items are identified as critical path dependencies that cannot be fully scoped without additional information:

1. **Integration Specifications:** Exact API contracts, data mapping, and transformation rules for Concur/Amadeus, SAP/Oracle ERP, IAM/Active Directory, and Security Event Bus.
2. **OCR/Receipt Parsing:** Decision on built-in vs. third-party vendor and specific vendor selection.
3. **Regulatory Scope:** Jurisdiction-specific compliance rules and per-diem matrix source.
4. **Infrastructure:** Cloud provider, regions, DR/backup strategy.
5. **Identity Architecture:** SSO protocol and IdP vendor.

---

## 5. Assumptions

The following assumptions are made based on the explicit information provided. These should be validated:

1. **Assumption A1:** The "enterprise service bus (ESB)" mentioned in KPI Section 7 is the primary integration mechanism between backend microservices and external systems (ERP, GDS, IAM).
2. **Assumption A2:** The "Workflow Engine" referenced in KPI data sources is a component built as part of the Approval Service microservice, not a third-party BPM suite.
3. **Assumption A3:** "Mobile/Web Receipts" implies responsive web application upload capability; a native mobile app is explicitly deferred to future enhancements.
4. **Assumption A4:** The 150-day MVP roadmap is a hard constraint; all Phase 1-5 deliverables must fit within this timeline.
5. **Assumption A5:** The organization already has existing corporate relationships with travel vendors (airlines, hotels) and the system will integrate with those existing negotiated rates rather than establishing new vendor relationships.
6. **Assumption A6:** "Real-time" data sync for Finance Operations Dashboard implies sub-minute refresh, while "Near real-time (5-minute refresh)" for Department Managers Dashboard is an acceptable compromise for operational visibility.
7. **Assumption A7:** The duplicate detection logic (EM-05) uses rule-based matching on transaction_date, amount, and category as the primary mechanism; ML-based enhancement is deferred to future enhancements.

---

## 6. Recommendations

1. **Recommendation R1:** Conduct a regulatory scoping workshop immediately to identify specific jurisdictions, tax codes, and labor laws applicable to the 10,000+ global employee base. This should produce a jurisdictional compliance matrix before detailed design begins.

2. **Recommendation R2:** Produce separate Technical Design Documents (TDDs) for each external integration point (GDS, ERP, IAM, Banking) before Phase 1 infrastructure work begins. The current documents define *what* data flows but not *how*.

3. **Recommendation R3:** Establish a KPI instrumentation working group during Phase 1 to define telemetry schema, data pipeline architecture, and dashboard query patterns. KPI measurement should be built-in, not bolted on.

4. **Recommendation R4:** Clarify OCR strategy in Phase 1. If third-party vendor is selected, procurement and legal review must complete before Phase 3 (Expense module) begins.

5. **Recommendation R5:** Define a formal Change Management Plan for the 95% adoption target (EX-02). The technical system alone will not drive adoption; training, communications, and support workflows must be scoped.

6. **Recommendation R6:** Review the 150-day timeline against the 4-phase dashboard delivery (Phase 5). If all 4 role-based dashboards are in-scope, ensure BI/visualization resources are allocated in Phase 5, not assumed as automatic.

7. **Recommendation R7:** Document the "Future Enhancements" (PRD Section 17) as a formal Phase 2 roadmap with estimated timelines to set stakeholder expectations and prevent scope creep during MVP delivery.

---

## 7. Document Control

| Attribute | Value |
|-----------|-------|
| **Source Documents** | `personas/03-06-2026/prd.md` v1.0.0, `personas/03-06-2026/kpi.md` v1.0.0 |
| **Scope Document Version** | 1.0.0 |
| **Status** | Draft for Review |
| **Prepared By** | Scope Analysis |
| **Next Review** | Upon resolution of Clarification Questions |

---

*End of Scope Document*
