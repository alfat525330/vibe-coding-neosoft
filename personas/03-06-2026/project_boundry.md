# Project Boundary Document
## Project: Enterprise Employee Travel & Expense (T&E) Management System
**Codename:** NexTravel Enterprise  
**Document Version:** 1.0.0  
**Status:** Draft for Review  
**Prepared Based On:** `prd.md` v1.0.0, `kpi.md` v1.0.0, `scope.md` v1.0.0

---

## 1. Information Confirmed

### 1.1 Project Identity
- **Project Name:** Enterprise Employee Travel & Expense (T&E) Management System
- **Codename:** NexTravel Enterprise
- **Organization:** 10,000+ employees across multiple global locations
- **Document Authors:** Principal Product Manager, Enterprise Solution Architect, Technical Architect, Senior Business Analyst
- **Status:** Approved for Implementation (PRD Section 1.6)

### 1.2 Business Context & Problem Statement
- **Current State:** Manual emails, disconnected spreadsheets, paper receipts, Excel sheets
- **Pain Points:** 22-day reimbursement latency, absence of pre-trip spend forecasting, high compliance leakage, massive processing gridlocks
- **Business Goals:**
  - Operational Velocity: Multi-week to near-instantaneous request routing
  - Capital Preservation: Eliminate out-of-policy leakage, maximize early-booking discounts
  - Regulatory Compliance: Digital audit trails for international tax codes, local labor laws, per-diem allowances
  - Employee Experience: Minimize administrative friction, elevate morale

### 1.3 Functional Module Boundaries
The system is composed of 4 core functional modules explicitly defined in PRD Section 5:

| Module | Boundaries | Interfaces |
|--------|-----------|------------|
| **Travel Request Management** | Create/Edit/Cancel requests, historical filterable data grids, real-time status tracking, visa status tracking for international plans, date validation (Domestic: +3 days, International: +14 days). Pre-trip authorization must achieve `APPROVED` state before expense filing or booking integrations activate. | Approval Workflow, Booking Integrations |
| **Approval Workflow Management** | Multi-level dynamic hierarchy evaluation, configurable dollar-threshold routing rules, automated SLA escalation workers (24-hour boundary), active delegation proxies. Logs escalation metrics (`AW-04`). | Travel Request, Expense, Notification System |
| **Expense Management** | Multi-itemized expense forms attached to valid Travel Request ID, receipt drag-drop loaders, currency normalization, per-diem enforcement, duplicate detection (matching amounts, dates, vendors). Valid receipt images mandatory for entries >= $25.00 USD (`EM-03`). | Approval Workflow, Reimbursement, OCR Engine |
| **Reimbursement Management** | Bulk verification workflows, automated extraction of NACHA/ACH/SEPA compliance bank transfer files, error tracking. | Expense, ERP/Finance |

### 1.4 User Story Boundaries
- **US-101 (Pre-Trip Authorization):** Employee submits digital travel request with estimated costs. AC1: All required parameters fully entered. AC2: Real-time budget availability displayed. AC3: State transfer to `PENDING_APPROVAL` under 1 second.
- **US-202 (Mobile Receipt Capture & Policy Guard):** Employee uploads receipt from mobile, assigns to expense category. AC1: Block submit if lines >= $25 miss receipt attachments. AC2: Enforce per-diem caps, require 150-character explanations if overridden.

### 1.5 Technology Stack Boundaries
- **Frontend:** React.js v19, Redux Toolkit, Axios, React Query
- **Backend:** Node.js LTS, Express.js microservices, Sequelize ORM
- **Database:** MySQL (highly normalized tables, foreign keys, strict cascades, audit parameters)
- **Database Indexes (Explicit):**
  - `idx_approvals_approver_status` on `travel_approvals (approver_id, status)`
  - `idx_expenses_date_amount` on `expense_items (transaction_date, amount)`
  - `idx_expense_dup_check` on `expense_items (transaction_date, amount, category)`
- **Validation:** Joi handlers
- **Authentication:** JWT (15-minute access tokens, 7-day refresh tokens in HttpOnly SameSite=Strict Secure cookies)
- **Encryption:** AES-256 at rest
- **Architecture Pattern:** Microservices with 5 decoupled layers (User, Travel, Approval, Expense, Reimbursement)

### 1.6 Non-Functional Requirements Boundaries
- **Performance:** Web transactional endpoints < 2.0 seconds; dashboard queries < 3.0 seconds
- **Scalability:** 10,000+ employee definitions; 3,500+ concurrent active users
- **Availability:** 99.95% cloud accessibility
- **Testing:** 100% backend Jest coverage, React Testing Library (frontend), Supertest (API), k6 (load testing)
- **Deployment:** GitHub Actions CI/CD, Docker containers, blue-green zero-downtime rolling canary releases onto container clusters

### 1.7 KPI Measurement Boundaries
**8 Categories, 20+ KPIs instrumented across the system:**
- Travel Request (TR): TR-01 through TR-04
- Approval Workflow (AW): AW-01 through AW-04
- Expense Management (EM): EM-01 through EM-05
- Reimbursement (RE): RE-01 through RE-04
- Compliance (CO): CO-01 through CO-04
- Financial (FI): FI-01 through FI-05
- Employee Experience (EX): EX-01 through EX-04
- System Performance (SP): SP-01 through SP-04

**Dashboard Boundaries:**
- Executive Leadership Dashboard: FI-01, FI-04, CO-02, FI-05, RE-01 (Weekly/on-demand)
- Department Managers Dashboard: AW-03, AW-01, AW-02, Budget Utilization % (5-minute refresh)
- Finance Operations & Audit Dashboard: EM-02, EM-05, CO-01, RE-04 (Real-time)
- HR & Travel Administrative Dashboard: TR-01, EX-02, EX-04, EX-01 (Daily)

**Alert Threshold Boundaries:**
- Green: Target achieved
- Yellow: Metric drifts ±10% from target for two consecutive weeks
- Red: Metric slips past 20% from target or core financial compliance breaks

### 1.8 Data Source Boundaries
- **Concur/Amadeus GDS** → Travel Requests
- **Mobile/Web Receipts** → Expense Claims
- **Workflow Engine** → Approval Logs
- **SAP/Oracle ERP** → Finance Transactions (via ESB)
- **IAM / Active Directory** → User Activity
- **Security Event Bus** → Audit Logs

### 1.9 Integration Boundaries
- **GDS:** Concur/Amadeus/Sabre for travel bookings
- **ERP:** SAP/Oracle/Workday for finance transactions
- **Banking:** NACHA/ACH/SEPA compliance file formats for reimbursements
- **Identity:** Corporate directory alignments (IAM/Active Directory)
- **Analytics:** PowerBI / Tableau consumption from Central T&E Analytics Store

### 1.10 Reporting Boundaries
- **Daily:** System Status, Exception Reports, Active Pending Approval Count (>24hr breaches), flagged high-risk duplicate detection. Delivery: Slack/Teams notifications.
- **Weekly:** SLA Compliance Matrix, average claim processing durations, support ticket trends, top recurring policy violation themes. Delivery: Scheduled PDF.
- **Monthly:** Total Travel Spend vs Budget, Department-wise Cost, CSAT, System Adoption Rate. Delivery: Interactive review meeting with auto-populated slide deck.
- **Quarterly:** Aggregated Corporate ROI Dashboard, Travel Cost Savings, Out-of-Policy Variance trends, infrastructure scaling analysis, vendor negotiation briefs. Delivery: Formal Executive Board presentation.

### 1.11 RACI Ownership Boundaries
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

### 1.12 Timeline Boundaries
- **Total Duration:** 150 days (MVP)
- **Phase 1 (Days 1-30):** Travel Request layouts, infrastructure schema generation, core identity RBAC initialization
- **Phase 2 (Days 31-60):** Matrix multi-level approval engines routing, automated SLA escalations, notifications systems
- **Phase 3 (Days 61-90):** Expense module launch, line item splitting mechanics, receipt secure upload integrations, duplicate matching logic
- **Phase 4 (Days 91-120):** Reimbursement batch files engines, payroll system ACH export connectors, bank verification loops
- **Phase 5 (Days 121-150):** Analytics dashboards deployment, BI integrations, extensive performance engineering, production release

### 1.13 Out-of-Scope Boundaries (Explicitly Deferred)
- Cross-platform React Native mobile application with native offline capture (PRD Section 17.1)
- Cloud Vision AI receipt reading capabilities (PRD Section 17.2)
- Advanced machine learning models for corporate fraud profiling (PRD Section 17.3)
- Direct Webhook sync integrations with ERP suites like SAP S/4HANA or Workday Core Financials (PRD Section 17.4)

### 1.14 Project Success Metrics Boundaries (180-day post-go-live)
- Manual Effort Reduction: 75% reduction in hours spent compiling receipts, typing descriptions, resolving GL code discrepancies
- Processing Time Reduction: End-to-end cycle from 22 calendar days to < 5 business days
- Employee Satisfaction: Minimum 4.4 out of 5.0 rating
- Policy Compliance: Out-of-policy corporate card spend from ~12% down to < 4%
- Operational Cost Reduction: Cost per claim from ~$28 down to < $6 via automation

---

## 2. Missing Information

The following critical information is **not explicitly defined** in the source documents and must be addressed before finalizing project boundaries:

| # | Missing Item | Impact on Boundary Definition |
|---|-------------|------------------------------|
| 1 | **Specific Jurisdictions / Regulatory Frameworks** | Cannot define compliance boundaries without knowing which tax codes, labor laws, and data residency requirements apply. |
| 2 | **Integration Specification Detail** | Cannot define exact API contracts, data mapping, or transformation rules for Concur/Amadeus, SAP/Oracle ERP, IAM/Active Directory, Security Event Bus. |
| 3 | **Notification & Communication Architecture** | Cannot define boundary between notification system and external channels (email, SMS, in-app, push) without specification. |
| 4 | **Receipt OCR / Extraction Engine** | Cannot define whether OCR is built-in or third-party, and which vendor/API is approved. |
| 5 | **Currency Normalization Rules** | Cannot define which currencies, exchange rate sources, rounding rules, or historical rate storage requirements apply. |
| 6 | **Per-Diem Matrix Source** | Cannot define boundary of per-diem service without knowing source (GSA, third-party, internal) and update frequency. |
| 7 | **Banking / NACHA / ACH / SEPA Details** | Cannot define banking integration boundaries without supported countries, partners, file formats, and validation rules. |
| 8 | **Identity Provider (IdP) Integration** | Cannot define IAM boundaries without SSO protocol (SAML 2.0, OIDC, LDAP), IdP vendor, or provisioning workflows. |
| 9 | **Data Retention & Archive Policies** | Cannot define storage tier boundaries without retention periods, archive requirements, or legal hold procedures. |
| 10 | **Disaster Recovery & Backup Strategy** | Cannot define infrastructure boundaries without RPO, RTO, or backup cadence. |
| 11 | **Repository Organization** | Cannot define whether code is in monorepo, multi-repo, or modular single-repo structure. |
| 12 | **Infrastructure Hosting** | Cannot define cloud boundaries without knowing cloud provider (AWS, Azure, GCP), regions, or data residency requirements. |

---

## 3. Clarification Questions

The following questions require explicit answers before project boundaries can be finalized:

### 3.1 Repository & Code Organization
**Q1:** Should the project use a monorepo (all services and frontend in one repository) or separate repositories per microservice + frontend?

**Q2:** What naming convention should be used for directories and services? (kebab-case, snake_case, or camelCase)

### 3.2 Infrastructure & Hosting
**Q3:** Where will the system be hosted? (AWS, Azure, GCP, on-premises, hybrid?) Are there specific cloud region requirements for data residency?

**Q4:** What are the RPO and RTO targets for disaster recovery? What backup cadence applies to financial transaction data vs. receipt images?

### 3.3 Integration Specifications
**Q5:** Which specific enterprise systems are in scope for integration?
- Travel Booking: Concur, Amadeus, Sabre, or other GDS?
- ERP: SAP, Oracle, Workday, or multiple?
- Identity: Active Directory, Azure AD, Okta, other IdP?
- Banking: Which countries require ACH vs. SEPA vs. other local payment rails?

**Q6:** Will the system include native OCR/receipt parsing, or rely on a third-party vendor? If third-party, which vendor is approved?

**Q7:** What is the IAM architecture? SSO via SAML 2.0 or OIDC? Which corporate IdP? How are user lifecycle events provisioned?

### 3.4 Scope Boundaries
**Q8:** The PRD Section 17 lists "Future Enhancements" (React Native app, Cloud Vision AI, ML fraud profiling, ERP webhooks). Should these be formally documented as out-of-scope for the MVP with planned follow-on phases?

**Q9:** The KPI document defines 4 detailed role-based dashboards. The PRD MVP roadmap (Phase 5) only references "Analytics dashboards deployment" generally. Should all 4 dashboards be in-scope for MVP delivery, or are some deferred to post-MVP?

**Q10:** Are there specific browser or mobile web browser support requirements? (e.g., Chrome, Edge, Safari, mobile Safari, Chrome Android, minimum versions)

### 3.5 Data & Analytics
**Q11:** The KPI framework references "Predictive AI" and "Hyper-Automation" in Section 10.4 as continuous improvement recommendations. Should these be explicitly called out as post-MVP roadmap items?

**Q12:** What is the source of truth for the "city per-diem matrix"? Is it GSA rates, a third-party service, or an internally maintained spreadsheet? Who owns updates?

---

## 4. Proposed Solution (Based on Confirmed Information)

### 4.1 Project Directory Structure
The following directory structure is proposed based on the microservices architecture defined in PRD Section 8 and the modular requirements. **No actual directories are created; this is a boundary document.**

```
nex-travel-enterprise/
├── .github/
│   └── workflows/
│       ├── ci.yml                    # GitHub Actions CI/CD pipeline
│       ├── security-scan.yml         # Security scanning
│       └── deploy-canary.yml         # Blue-green canary deployment
├── docs/
│   ├── adr/                          # Architecture Decision Records
│   ├── api/                          # API specifications (to be defined)
│   ├── integration/                  # Integration specifications (to be defined)
│   └── runbooks/                     # Operational runbooks
├── infrastructure/
│   ├── docker/                       # Dockerfiles and compose files
│   ├── terraform/                    # IaC templates (if applicable)
│   └── k8s/                          # Kubernetes manifests (if applicable)
├── packages/
│   ├── shared-types/                 # Shared TypeScript types/interfaces
│   ├── shared-utils/                 # Shared validation, encryption utilities
│   └── database-schema/              # Shared Sequelize models and migrations
├── services/
│   ├── user-service/                 # User Service: Identity, JWT, corporate directory
│   │   ├── src/
│   │   │   ├── controllers/
│   │   │   ├── middleware/
│   │   │   ├── models/
│   │   │   ├── routes/
│   │   │   └── utils/
│   │   ├── tests/
│   │   └── package.json
│   ├── travel-service/               # Travel Service: Pre-trip planning, itineraries
│   │   ├── src/
│   │   │   ├── controllers/
│   │   │   ├── middleware/
│   │   │   ├── models/
│   │   │   ├── routes/
│   │   │   └── utils/
│   │   ├── tests/
│   │   └── package.json
│   ├── approval-service/             # Approval Service: Multi-level routing, SLA timers
│   │   ├── src/
│   │   │   ├── controllers/
│   │   │   ├── middleware/
│   │   │   ├── models/
│   │   │   ├── routes/
│   │   │   └── utils/
│   │   ├── tests/
│   │   └── package.json
│   ├── expense-service/              # Expense Service: Receipts, duplicates, compliance
│   │   ├── src/
│   │   │   ├── controllers/
│   │   │   ├── middleware/
│   │   │   ├── models/
│   │   │   ├── routes/
│   │   │   └── utils/
│   │   ├── tests/
│   │   └── package.json
│   └── reimbursement-service/        # Reimbursement Service: ACH, bank verification
│       ├── src/
│       │   ├── controllers/
│       │   ├── middleware/
│       │   ├── models/
│       │   ├── routes/
│       │   └── utils/
│       ├── tests/
│       └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/               # Reusable UI components
│   │   ├── features/                 # Feature-based modules
│   │   │   ├── travel-requests/
│   │   │   ├── approvals/
│   │   │   ├── expenses/
│   │   │   ├── reimbursements/
│   │   │   └── dashboards/
│   │   ├── hooks/                    # Custom React hooks
│   │   ├── services/                 # API clients (Axios, React Query)
│   │   ├── store/                    # Redux Toolkit slices
│   │   ├── utils/                    # Frontend utilities
│   │   └── App.jsx
│   ├── tests/
│   │   ├── unit/                     # React Testing Library unit tests
│   │   └── integration/              # Component integration tests
│   ├── package.json
│   └── Dockerfile
├── database/
│   ├── migrations/                   # Sequelize migrations
│   ├── seeders/                      # Seed data for development
│   └── config/                       # Database configuration
├── tests/
│   ├── api/                          # Supertest API integration tests
│   ├── load/                         # k6 load test scripts
│   └── e2e/                          # End-to-end test scenarios
├── scripts/
│   ├── setup.sh                      # Environment setup
│   └── deploy.sh                     # Deployment helper scripts
├── .env.example                      # Environment variable template
├── .gitignore
├── docker-compose.yml                # Local development orchestration
├── package.json                      # Root package.json (workspace config)
├── README.md
└── LICENSE
```

### 4.2 Module Boundaries & Ownership
| Module | Owns | Does Not Own |
|--------|------|--------------|
| **user-service** | Identity lifecycle, JWT tokens, corporate directory sync, RBAC | Business logic for travel/expense/approval |
| **travel-service** | Travel request CRUD, itinerary status, visa tracking, date validation | Approval routing logic, expense creation |
| **approval-service** | Multi-level routing, SLA timers, escalation workers, delegation proxies | Expense content validation, payment processing |
| **expense-service** | Expense forms, receipt upload, duplicate detection, per-diem enforcement, currency normalization | Approval decision logic, bank transfers |
| **reimbursement-service** | ACH batch generation, bank verification, error tracking | Expense content creation, approval routing |
| **frontend** | All UI rendering, user interactions, client-side validation, dashboard visualization | Database schema, server-side business logic, direct ERP integration |

### 4.3 Integration Boundaries
| External System | Boundary Owner | Data Flow Direction | Protocol/Mechanism |
|-----------------|---------------|---------------------|-------------------|
| Concur/Amadeus/Sabre GDS | travel-service | Bidirectional | REST API (to be specified) |
| SAP/Oracle/Workday ERP | reimbursement-service, approval-service | Outbound (finance tx), Inbound (GL confirmations) | Enterprise Service Bus (ESB) |
| IAM / Active Directory | user-service | Inbound (user sync) | LDAP / SAML / OIDC (to be specified) |
| Security Event Bus | All services | Outbound (audit logs) | Event streaming (to be specified) |
| Banking (NACHA/ACH/SEPA) | reimbursement-service | Outbound (payment files) | File-based / API (to be specified) |
| PowerBI / Tableau | Analytics Store | Read-only | BI connector (to be specified) |

### 4.4 Data Boundaries
- **Travel Requests Store:** Managed by travel-service, consumed by approval-service and dashboards
- **Expense Claims Database:** Managed by expense-service, consumed by approval-service, reimbursement-service, and dashboards
- **Approval Workflow Engine Logs:** Managed by approval-service, consumed by analytics and audit
- **Finance Transactions Ledger:** Managed by reimbursement-service, synchronized with ERP via ESB
- **User Activity & Security Event Logs:** Produced by all services, consumed by Security Event Bus and analytics
- **Compliance & Audit Ledger:** Produced by expense-service and approval-service, consumed by audit and compliance dashboards

### 4.5 Security Boundaries
- **Authentication Boundary:** JWT access tokens (15-min) passed in code variables; refresh tokens (7-day) in HttpOnly SameSite=Strict Secure cookies
- **Input Validation Boundary:** Joi handlers at all API entry points
- **Data Access Boundary:** Sequelize parameterized queries (no raw SQL from application code)
- **Encryption Boundary:** AES-256 at rest for all database volumes
- **Audit Boundary:** Immutable audit logs for all compliance flag overrides and state transitions

### 4.6 KPI Instrumentation Boundaries
- **Data Collection:** All services emit telemetry events for KPI measurement
- **Storage:** Central T&E Analytics Store aggregates data from all services
- **Visualization:** 4 role-based dashboards consume from Analytics Store
- **Alerting:** Automated Green/Yellow/Red threshold triggers based on operational metric standard deviations

---

## 5. Assumptions

The following assumptions are made based on the explicit information provided:

1. **Assumption A1:** The "enterprise service bus (ESB)" mentioned in KPI Section 7 is the primary integration mechanism between backend microservices and external ERP systems.
2. **Assumption A2:** The "Workflow Engine" referenced in KPI data sources is a component built as part of the approval-service microservice, not a third-party BPM suite.
3. **Assumption A3:** "Mobile/Web Receipts" implies responsive web application upload capability; a native mobile app is explicitly deferred to future enhancements.
4. **Assumption A4:** The 150-day MVP roadmap is a hard constraint; all Phase 1-5 deliverables must fit within this timeline.
5. **Assumption A5:** The organization already has existing corporate relationships with travel vendors (airlines, hotels) and the system will integrate with those existing negotiated rates.
6. **Assumption A6:** "Real-time" data sync for Finance Operations Dashboard implies sub-minute refresh, while "Near real-time (5-minute refresh)" for Department Managers Dashboard is an acceptable compromise.
7. **Assumption A7:** The duplicate detection logic (EM-05) uses rule-based matching on transaction_date, amount, and category as the primary mechanism in MVP; ML-based enhancement is deferred.
8. **Assumption A8:** The Central T&E Analytics Store is a separate data warehouse/lake component, not the primary transactional MySQL database.
9. **Assumption A9:** Each microservice has its own database schema within the shared MySQL instance (schema-per-service pattern), rather than a single shared schema.
10. **Assumption A10:** The "notification systems" mentioned in PRD Phase 2 are built in-house as part of the backend services, not a third-party notification service.

---

## 6. Recommendations

1. **Recommendation R1:** Resolve Q1 (repository structure) and Q2 (naming conventions) before Phase 1 begins, as these decisions affect all subsequent development workflows.

2. **Recommendation R2:** Produce Technical Design Documents (TDDs) for each external integration point (GDS, ERP, IAM, Banking) before Phase 1 infrastructure work begins.

3. **Recommendation R3:** Establish a KPI instrumentation working group during Phase 1 to define telemetry schema, data pipeline architecture, and dashboard query patterns.

4. **Recommendation R4:** Clarify OCR strategy (Q6) in Phase 1. If third-party vendor is selected, procurement and legal review must complete before Phase 3 begins.

5. **Recommendation R5:** Define a formal Change Management Plan for the 95% adoption target (EX-02). Technical system alone will not drive adoption.

6. **Recommendation R6:** Review the 150-day timeline against the 4-phase dashboard delivery (Phase 5). If all 4 role-based dashboards are in-scope, ensure BI/visualization resources are allocated in Phase 5.

7. **Recommendation R7:** Document "Future Enhancements" (PRD Section 17) as a formal Phase 2 roadmap to prevent scope creep during MVP delivery.

8. **Recommendation R8:** Define database schema boundaries (schema-per-service vs. shared schema) before Phase 1 infrastructure schema generation begins.

---

## 7. Document Control

| Attribute | Value |
|-----------|-------|
| **Source Documents** | `personas/03-06-2026/prd.md` v1.0.0, `personas/03-06-2026/kpi.md` v1.0.0, `personas/03-06-2026/scope.md` v1.0.0 |
| **Boundary Document Version** | 1.0.0 |
| **Status** | Draft for Review |
| **Prepared By** | Boundary Analysis |
| **Next Review** | Upon resolution of Clarification Questions |

---

*End of Project Boundary Document*
