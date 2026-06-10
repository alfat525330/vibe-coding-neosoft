# Product Requirements Document (PRD)

**Product Name:** Voyager: Enterprise Employee Travel & Expense Management System  
**Version:** 1.0.0  
**Author:** Senior Product Manager & Business Analyst  
**Date:** 2026-06-09  
**Status:** In Review  

--- 

## 1. Problem Statement

Enterprise travel and expense management is currently managed via a fragmented system of emails, Excel sheets, manual phone calls, and physical paper documents. This manual approach is error-prone, slow, and lacks visibility, leading to high administrative overhead, compliance leaks, and employee frustration.

### Pain Points
- **Employees (Travelers):** Delayed reimbursements due to slow, manual approval chains; risk of losing physical receipts; tedious manual data entry for each expense item.
- **Approvers (Managers):** Flooded with email approval requests; no real-time visibility into department budget utilization or project travel caps when deciding on approvals.
- **Travel Desk Operators:** Manual tracking of travel booking requests, coordination of flights/hotels via email, and high effort to reconcile corporate credit card billing against actual travel requests.
- **Finance Auditors & Accountants:** Huge burden of manually verifying physical receipts against expense forms, checking tax/VAT/GST details, manually copying data into the ERP (SAP/Oracle), and dealing with policy compliance issues after bookings have already occurred.

### Impact of Not Solving
- **Financial Leakage:** Out-of-policy bookings and expense inflation are estimated to cost the organization 12% to 15% more in annual travel spend compared to a policy-enforced baseline.
- **Operational Inefficiency:** High processing cost per expense report (estimated at $35 per manual report) and a long reimbursement cycle of 30–45 days.
- **Compliance & Audit Risks:** Incomplete paper records and missing receipts create tax auditing liabilities and non-compliance with regional travel regulations.
- **Loss of Corporate Discounts:** Fragmented booking prevents consolidation of corporate discounts with key airline and hotel partners.

### Product Vision
To establish a unified, automated, and mobile-friendly enterprise travel and expense platform that simplifies pre-trip planning, guarantees 100% compliance with travel policies, and accelerates reimbursement cycles to under 5 business days.

---

## 2. Solution Overview

### What We Are Building
Voyager is an enterprise web and mobile application designed to digitize and automate the entire travel and expense lifecycle. Voyager allows employees to submit pre-trip travel requests, receive automated policy checks and hierarchical approvals, submit post-trip expense claims via OCR-powered receipt uploads, and track reimbursement status in real-time. It provides Travel Desk operators with a central booking fulfillment board and gives Finance teams tools for automated policy auditing, ERP export generation, and budget analytics.

### Why This Approach
A custom, integrated platform allows us to embed our specific enterprise hierarchy and travel policies directly into the submission flow. By validating policies and checking budget limits *before* expenses are incurred (pre-trip) and utilizing OCR to automate data entry *after* (post-trip), we minimize compliance violations and reduce the administrative overhead of manual reviews.

### Alternatives Considered
| Alternative | Reason Rejected |
|-------------|-----------------|
| **Commercial Off-The-Shelf SaaS (e.g., SAP Concur)** | Denied due to extremely high seat licensing costs, complex customization requirements for our custom internal booking desk, and lack of flexibility in integrating with legacy regional HR systems. |
| **Custom Integration on Slack / Teams** | While useful for quick approvals, a chat-based interface cannot support the heavy data grid requirements for finance auditing, OCR receipt archiving, policy engine management, and detailed reporting. |

### Scope
| In Scope | Out of Scope |
|----------|--------------|
| Enterprise Single Sign-On (SSO) integration (SAML/OIDC). | Live integration with GDS APIs (Amadeus/Sabre) for automated booking fulfillment (Phase 1 will use Travel Desk manual bookings). |
| Pre-Trip Travel Authorization Requests & multi-level approval workflows. | Live tracking of flights, delay alerts, or automated compensation claims. |
| OCR-enabled receipt scanning (extracting date, amount, tax, and merchant). | Reconciling personal credit card statements (corporate cards only). |
| Dynamic policy engine (validating limits by employee grade, location, and expense category). | Processing direct bank payouts (system will export payout batches to ERP for processing). |
| Travel Desk booking dashboard for fulfillment. | Direct mileage tracking via GPS integration (manual mileage log is supported). |
| Multi-currency support and automated daily exchange rate conversions. | |
| Finance Audit dashboard and batch ERP exporting (CSV/JSON). | |

### User Personas

#### Persona 1 — Regular Employee / Traveler (Sarah Jenkins)
| Field | Detail |
|-------|--------|
| **Who they are** | Sales Director, travels frequently for client pitches, conferences, and internal meetings. |
| **Primary goal** | Submit travel requests and expense receipts quickly on-the-go, and get reimbursed within a week. |
| **Pain points** | Storing physical paper receipts; manual input of long expense spreadsheets; lack of status updates on pending payments. |
| **Technical proficiency** | High |
| **Usage frequency** | High (several times per week during travel) |

#### Persona 2 — Line Manager / Approver (David Chen)
| Field | Detail |
|-------|--------|
| **Who they are** | Engineering Manager with a team of 15 engineers who travel for customer deployments and audits. |
| **Primary goal** | Review, approve, or reject team travel requests and expenses quickly, with assurance of policy compliance and budget availability. |
| **Pain points** | Sifting through email chains for approvals; checking travel policies manually; lack of visibility into team budget consumption. |
| **Technical proficiency** | Medium |
| **Usage frequency** | Weekly (approving reports and requests) |

#### Persona 3 — Finance Auditor (Linda Martinez)
| Field | Detail |
|-------|--------|
| **Who they are** | Senior Accountant responsible for auditing and reconciling corporate expense claims. |
| **Primary goal** | Ensure 100% compliance with tax regulations and internal travel guidelines before authorizing payouts. |
| **Pain points** | Deciphering illegible receipts; tracking down employees for clarification on out-of-policy claims; duplicate data entry into ERP. |
| **Technical proficiency** | Medium |
| **Usage frequency** | Daily (primary workspace) |

### High-Level Features
| # | Feature | Priority | Notes |
|---|---------|----------|-------|
| 1 | **SSO & Role-Based Access Control** | P0 | Integrated with Azure AD / Okta. Defines roles: Admin, Traveler, Approver, Travel Desk, Finance Auditor. |
| 2 | **Travel Request Workflow (Pre-Trip)** | P0 | Submission form for trips including estimates, itinerary, destination, and purpose. Hierarchical approval router. |
| 3 | **Policy Configuration & Engine** | P0 | Centralized rule settings (e.g., flight class caps, daily meal limits). Blocks or flags violations on submission. |
| 4 | **Expense Claim Creator & Mobile OCR** | P0 | Upload receipt files; OCR extracts date, amount, tax, and merchant. Automatic matching to an approved Pre-Trip Request. |
| 5 | **Travel Booking Board** | P1 | Dashboard for corporate Travel Desk to view approved requests and mark bookings as "Booked" with ticket details. |
| 6 | **Finance Audit Portal** | P1 | Dedicated UI for Linda to filter, audit, approve/reject individual line items, and view OCR receipt matches. |
| 7 | **ERP Payout Exporter** | P1 | Exports approved claims in formatted JSON/CSV compatible with SAP and Oracle financial modules. |
| 8 | **Analytics & Reporting Dashboard** | P2 | Visual reports tracking travel spending by department, policy violation trends, and booking leakage. |

### Non-Functional Requirements
| Category | Requirement | Notes |
|----------|-------------|-------|
| **Performance** | Page load time < 2 seconds. OCR extraction complete in < 5 seconds. | Targets average office networks and standard mobile data. |
| **Scalability** | Support 10,000+ total users and up to 1,000 concurrent active sessions. | High-concurrency expected during end-of-month expense deadlines. |
| **Availability** | 99.9% availability during business hours (6 AM to 10 PM EST). | Monitored with automated health checks and alerts. |
| **Security** | TLS 1.3 encryption in transit, AES-256 for database storage. SSO-only auth. | Highly sensitive financial and personal travel data. |
| **Accessibility** | WCAG 2.1 AA compliant. | Ensures accessibility for diverse internal employee group. |
| **Browser Support** | Latest versions of Chrome, Safari, Edge, Firefox. | No legacy IE support required. |
| **Mobile Support** | Fully responsive web client. Optimized mobile web views for receipt upload. | Hybrid wrapper or PWA for simple receipt scanning. |
| **Localization** | Multi-currency (USD, EUR, GBP, SGD, CAD) and regional tax tracking (VAT/GST). | Multi-location enterprise support. |
| **Data Retention** | Expense records and receipts must be stored securely for 7 years. | Necessary for regional corporate tax compliance audits. |

---

## 3. Tech Stack

### Frontend
| Layer | Technology | Version | Reason for Choice |
|-------|------------|---------|-------------------|
| Framework | React.js | v19.0.0 | Mandatory core library using **Functional Components only**. Offers optimal rendering engine and ecosystem compatibility. |
| Language | JavaScript | ESNext | Standard scripting language with ESNext features. |
| Styling | Vanilla CSS | N/A | Flexible, high-performance styling using CSS Variables for custom branding. Zero Tailwind dependencies. |
| State Management | Redux / Redux Toolkit | v2.2.0 | Centralized state container for application-wide configurations, session info, and role-based permissions metadata. |
| Data Fetching | React Query & Axios | Query: v5.0.0, Axios: v1.7.0 | Server-state caching via React Query to reduce API overhead. Axios handles communication abstraction. |
| Form Handling | Custom Form Validation | N/A | Built-in React state-based validation framework to keep validation lean and lightweight. |
| Routing | React Router Dom | v7.0.0 | **Role-Based Navigation** and **Protected Routes** to restrict UI sections by role. |
| Testing | Jest & React Testing Library | v29.x / v16.x | Standard Unit and Integration testing framework for React component behavior validation. |
| Build Tool | Vite | v6.0.0 | Ultra-fast bundling, HMR, and optimized production building. |

#### Frontend Architecture & Requirements
- **Modular Feature-based Folder Structure:** Organized by domain features (e.g., `features/travel-requests/`, `features/expenses/`, `features/admin/`) instead of technical types.
- **API Abstraction Layer:** Services isolated under `src/services/api/` with Axios interceptors managing JWT headers, response formatting, and error catching.
- **Loading & Skeleton States:** Premium visual indicators utilizing custom CSS skeletons while React Query fetches data.
- **Pagination Support:** Built-in table pagination for large datasets using limit-offset query parameters.
- **Form Validation:** Client-side input verification using a Custom Validation framework ensuring data cleanliness before submit.
- **Optimized Rendering:** Utilizing `React.memo`, `useMemo`, and `useCallback` to prevent unnecessary component re-renders.
- **Virtual Scrolling:** Employing list virtualization for large tables and dropdowns (e.g., department select, audit grids) to handle massive listings without DOM bloat.
- **Custom Error Handling Framework:** Global error boundary components catching UI crashes and displaying graceful user messages.

### Backend
| Layer | Technology | Version | Reason for Choice |
|-------|------------|---------|-------------------|
| Framework | Express.js | v4.21.x | Minimalist web framework, modular microservice architecture. |
| Language | JavaScript | ES Modules | Standard ES Modules code for modern, maintainable code structures. |
| Runtime | Node.js | v20.x (LTS) | Asynchronous, event-driven runtime standard. |
| API Style | REST | v1 | Route versioning under `/v1/` ensures api backwards compatibility. |
| Authentication | JSON Web Tokens (JWT) | v9.0.0 | Stateless session mechanism. Employs **JWT Refresh Strategy** to rotate security tokens. |
| Task Queue | BullMQ | v5.x | Redis-backed job manager for asynchronous tasks (e.g. OCR processing, email notifications). |
| Testing | Jest / Supertest | v29.x | Integration testing framework for routing, middlewares, and services validation. |

#### Backend Security Requirements
- **SQL Injection Prevention:** Enforced via Sequelize ORM parameterized queries. All manual SQL queries are banned.
- **Input Sanitization:** Middleware utilizing libraries like `dompurify` or `express-sanitizer` to clean up payload fields and prevent XSS.
- **JWT Refresh Strategy:** Access tokens expire in 1 hour; Refresh tokens are stored in HTTP-Only, Secure, SameSite=Strict cookies with Rotation active on usage.
- **Secure Password Hashing:** `bcrypt` with salt rounds set to 12.
- **Rate Limiting:** IP-based rate limiting via `express-rate-limit` restricting requests to 100 requests per 15 minutes per IP.
- **CORS Configuration:** Enforced via `cors` middleware, whitelist locked strictly to corporate domains.
- **Helmet Security Headers:** `helmet` middleware loaded to configure strict Content Security Policy (CSP) and security headers.
- **Audit Logging Middleware:** Custom logging tracking all mutations, approvals, and data exports, capturing: `user_id`, `action_type`, `table_name`, `record_id`, `ip_address`, and `timestamp`.

#### Backend Structural Standards
- **Controller Layer:** Parses HTTP requests, validates inputs, and triggers appropriate Services.
- **Service Layer:** Houses the core business logic, policies, and workflows.
- **Repository Layer:** Abstracted data access executing queries via Sequelize models.
- **Middleware Layer:** Manages authentication, RBAC authorization, and error catches.
- **Validation Layer:** Decoupled schemas verifying parameters prior to controller access (e.g., Joi/Zod).
- **Centralized Error Handling:** Global Express error handler returning standardized JSON formats and logging stack traces.

### Infrastructure & DevOps
| Layer | Technology | Purpose |
|-------|------------|---------|
| Cloud Provider | AWS (Amazon Web Services) | General application hosting and database deployment. |
| Containerization | Docker | Standardizing local dev systems and deployment containers. |
| Orchestration | AWS ECS (Fargate) | Serverless container hosting for microservices. |
| CI / CD | GitHub Actions | Automated build, test suites, and deployments to staging/production. |
| Monitoring | AWS CloudWatch & Datadog | Real-time service metrics, load alerts, and health alerts. |
| Logging | ELK Stack | Aggregates microservice logs and audit logs. |
| Error Tracking | Sentry | Real-time frontend and backend runtime exception tracking. |

### Third-Party Services & Integrations
| Service | Purpose | Auth Method | Notes |
|---------|---------|-------------|-------|
| Azure AD / Okta | Single Sign-On (SSO) | OpenID Connect (OIDC) | Core corporate user provisioning. |
| AWS Textract / Google Document AI | Receipt OCR Text Extraction | IAM Role / API Key | Extract receipt merchant, amount, date, and items. |
| Open Exchange Rates | Daily currency conversion rate API | Bearer Token Auth | Daily rates updated via scheduler tasks. |
| Slack / MS Teams | Instant approval notifications | OAuth 2.0 Webhooks | Interactive approval cards. |
| SAP / Oracle Financials | Corporate Finance ERP system sync | Secure SFTP / Mutual TLS REST | Daily payment batch processing exports. |

---

## 3. User Flows

### Flow 1 — Pre-Trip Travel Authorization Workflow

**Actor:** Regular Employee (Traveler)  
**Trigger:** Employee needs to book travel for an upcoming customer deployment.  
**Preconditions:** Employee is authenticated and has an active profile containing department, manager, and corporate grade.  

**Happy Path:**
1. User navigates to "Travel Requests" and clicks "New Request".
2. User enters destination, travel dates, business purpose, and estimated costs (flights, hotel, meals).
3. System runs the data through the policy engine in real-time, verifying estimation bounds based on location and employee grade. No violations are found.
4. User clicks "Submit".
5. System saves request in status `PENDING_APPROVAL`, triggers notification to the designated Line Manager, and logs history entry.
6. Line Manager logs in, reviews travel request, and approves it.
7. System updates status to `APPROVED_BY_MANAGER` and routes request to the Travel Desk queue.
8. Travel Desk books travel, uploads reservation document, marks state as `BOOKING_COMPLETED`.
9. Traveler receives notification with booking details.

**End State:** Travel is authorized, booking is locked, and a unique `Travel Request ID` is generated for future expense matching.

**Alternate Paths:**
- *Policy Warning path:* At step 3, if the estimated hotel cost exceeds regional limits, the system flags the violation. The user must provide a text justification (e.g., "Conference venue hotel selected"). The request is allowed to submit but escalates to require both Manager and Department Head approval.

**Error Paths:**
| Error Condition | System Behavior | User Message |
|-----------------|-----------------|--------------|
| Invalid Travel Dates (e.g. End Date before Start Date) | Blocks submission, highlights date fields in red. | "Return date must be on or after the departure date." |
| Exceeding Absolute Budget Cap | Blocks submission. | "The estimated budget exceeds the maximum allowed limit for this trip type ($5,000)." |

---

### Flow 2 — Post-Trip Expense Claim Submission

**Actor:** Regular Employee (Traveler)  
**Trigger:** Trip is completed; traveler wants to file expense claims to get reimbursed.  
**Preconditions:** Traveler has a matching `Travel Request ID` that is in `BOOKING_COMPLETED` or `TRIP_RESOLVED` status.  

**Happy Path:**
1. User logs in, selects "My Expenses", and clicks "Create Expense Claim".
2. User links the claim to the relevant approved `Travel Request ID`.
3. User uploads receipt images (JPEG/PNG/PDF) using their device camera or file explorer.
4. System triggers OCR, parses data (Amount: $120.00, Merchant: Sheraton Hotels, Date: 2026-06-08), and pre-fills expense details.
5. User reviews OCR fields, selects the category "Lodging", and saves the line item.
6. User clicks "Submit Expense Claim".
7. System verifies the sum of claims is within 10% tolerance of the original travel request estimate and submits it. Status becomes `SUBMITTED_TO_AUDIT`.

**End State:** Claim is submitted, receipts are archived, and manager is notified for expense verification.

**Alternate Paths:**
- *Out-of-pocket Multi-Currency:* If the expense is in EUR, the system automatically fetches the historical exchange rate for the receipt date, displays both original currency and home currency (USD), and logs the conversion rate.

**Error Paths:**
| Error Condition | System Behavior | User Message |
|-----------------|-----------------|--------------|
| Duplicate Receipt Detected | Flags that this receipt image matches an existing claim (based on date, amount, and hash). | "Warning: A duplicate receipt has been detected. Please confirm this is a unique expense." |
| File Size Limit Exceeded | Rejects the file upload immediately. | "Receipt file size cannot exceed 5MB." |

---

## 4. API Design

### Conventions
- Base URL: `https://api.voyager.enterprise.com/v1`
- Auth: Bearer JWT Token passed in standard `Authorization` header.
- Response format: JSON
- Error format:
```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable message",
    "details": {}
  }
}
```

### Authentication & Authorization
| Aspect | Detail |
|--------|--------|
| **Auth method** | JWT tokens issued after SSO authentication. |
| **Token expiry** | Access token: 1 hour. Refresh token: 24 hours. |
| **Refresh strategy** | Refresh token rotation on `/v1/auth/refresh` endpoint. |
| **Roles & permissions**| RBAC based on user claim roles (`traveler`, `approver`, `travel_desk`, `finance_auditor`, `admin`). |

### Role Permissions Matrix
| Endpoint | Method | traveler | approver | travel_desk | finance_auditor | admin |
|----------|--------|----------|----------|-------------|-----------------|-------|
| `/v1/travel-requests` | POST | ✅ | ✅ | ❌ | ❌ | ✅ |
| `/v1/travel-requests/{id}/approve` | POST | ❌ | ✅ | ❌ | ❌ | ✅ |
| `/v1/bookings` | POST | ❌ | ❌ | ✅ | ❌ | ✅ |
| `/v1/expenses` | POST | ✅ | ❌ | ❌ | ❌ | ✅ |
| `/v1/expenses/{id}/audit` | POST | ❌ | ❌ | ❌ | ✅ | ✅ |
| `/v1/admin/policies` | PUT | ❌ | ❌ | ❌ | ❌ | ✅ |

---

## 5. Edge Cases

### Core Edge Cases & Fail-safes

| # | Edge Case | Trigger Condition | Expected System Behavior |
|---|-----------|-------------------|--------------------------|
| 1 | **Split Approval Hierarchy** | An employee reports to Manager A, but the trip is funded by Manager B's department project budget. | The travel request must route to Manager B for budget approval, and Manager A for operational approval. The request remains `PENDING_APPROVAL` until both approve. |
| 2 | **OCR Parser Failure** | User uploads a blurry, handwritten, or crumpled receipt. | System alerts user that OCR extraction failed, prompts them to enter details manually, and flags the record for manual validation by the Finance Auditor. |
| 3 | **Concurrent Expense Edits** | Two finance auditors access and edit/approve the same expense report at the same time. | Optimistic locking is used. The user whose request reaches the database second receives an error: `Conflict: This record has been updated. Please refresh.` |
| 4 | **Exceeding Budget mid-workflow** | A manager approves a travel request, but during the booking phase, the price has risen, exceeding the department's monthly budget limit. | System alerts travel desk operator. Operator can request budget override from Department Head or prompt user to resubmit with an updated estimate. |
| 5 | **Missing / Revoked Manager** | Traveler's manager is deleted or marked inactive in HR database mid-workflow. | Fallback routing occurs. The request is auto-routed to the department head or the Admin's queue for reassignment to avoid blockages. |
| 6 | **Double Submission Retry** | Traveler double-clicks the "Submit Claim" button on a slow mobile connection. | Client generates a client-side idempotency key for the request payload. Subsequent requests with the same key within 10 seconds are rejected as duplicates. |

---

## 6. KPIs — Success Metrics & Acceptance Criteria

### Success Metrics
| Metric | Current Baseline | Target | Measurement Method | Timeframe |
|--------|-----------------|--------|--------------------|-----------|
| **Reimbursement Cycle Time** | 35 Days | < 5 Days | Timestamp diff from claim submission to ERP payout batch export. | 3 Months post-launch |
| **Out-of-Policy Leakage** | ~15% of travel spend | < 1% of travel spend | Automated report tracking flagged policy overrides vs total spend. | 6 Months post-launch |
| **Expense Submission Time** | 45 minutes / report | < 10 minutes / report | User session tracking on expense creation screen. | 3 Months post-launch |
| **OCR Accuracy** | N/A | > 85% correct extraction | Periodic audit matching OCR-populated values against manual edits. | 3 Months post-launch |

### Acceptance Criteria

#### Feature: Travel Request Workflow (Pre-Trip)
| ID | Criteria | Priority | Verification Method |
|----|----------|----------|---------------------|
| **AC-001** | Given an employee enters valid travel dates, estimated costs, and trip details, when they click "Submit", then the system must evaluate regional policy rules and route the request to their manager. | Must Have | Automated integration test with mock traveler profile. |
| **AC-002** | Given an employee requests a booking that exceeds the daily lodging cap for the destination, when they attempt to submit, then the system must display a policy warning and block submission until a business justification is entered. | Must Have | Manual QA verification using out-of-policy inputs. |
| **AC-003** | Given a manager approves a travel request, when the action completes, then the travel request status changes to `APPROVED_BY_MANAGER` and the travel desk queue updates in real-time. | Must Have | Websocket dashboard verification / Database status check. |

#### Feature: Expense Claim & Receipt Management (Post-Trip)
| ID | Criteria | Priority | Verification Method |
|----|----------|----------|---------------------|
| **AC-004** | Given a traveler uploads a receipt image, when the OCR process runs, then it must correctly extract the Total Amount, Merchant Name, and Date, and populate the expense fields. | Must Have | OCR Accuracy validation suite using 100 sample receipt files. |
| **AC-005** | Given a traveler submits expenses in EUR, when saved, then the system must query the historical exchange rate API for the receipt date and display both home currency (USD) and foreign currency (EUR). | Should Have | API integration test verifying conversion rate from Open Exchange Rates. |

---

## 7. Limitations & Assumptions

### Known Technical Limitations
| # | Limitation | Impact | Workaround / Mitigation |
|---|------------|--------|-------------------------|
| 1 | **Static Daily Exchange Rates** | Conversion rates are updated daily at midnight, rather than real-time. | Low impact. Minor fluctuations are acceptable for monthly accounting reconciliations. |
| 2 | **No Direct Booking API Integration** | The Travel Desk must book via their external systems (e.g. travel portal) and manually upload receipt records. | Minor delay in booking speed. Booking details are linked manually via traveler dashboard files. |

### Business / Scope Limitations
| # | Limitation | Reason | Future Consideration |
|---|------------|--------|----------------------|
| 1 | **No Cash Advance Management** | Adding cash advances increases double-entry accounting risks in v1. | Plan to add Cash Advance modules in Phase 2 once ERP sync is stable. |
| 2 | **Single Currency Payouts** | All payouts are routed in the employee's home currency based on their profile location. | Multilateral wire capabilities are planned for international offices in v2. |

### Third-Party / Integration Limitations
| Service | Limitation | Impact |
|---------|------------|--------|
| **HR Sync API** | Updates manager hierarchy daily at 2:00 AM. | Promotions or reporting changes may take 24 hours to reflect in system workflows. |
| **OCR Text Extraction Engine** | Lower accuracy on handwritten or crumpled receipts. | Requires manual validation by finance audits for non-printed invoices. |

### Assumptions
| # | Assumption | Owner | Validation Method |
|---|------------|-------|-------------------|
| 1 | Users have access to smartphones or web cameras to capture receipt images. | Product Team | Verified in user study showing 98% mobile ownership among sales/travel staff. |
| 2 | Active Directory contains up-to-date manager/approver attributes for all employees. | IT Dept | Run audit scripts on Active Directory hierarchy prior to launch. |

---

## 8. Risks & Dependencies

### Risks
| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| **Low Employee Adoption** | Medium | High | Conduct training webinars; run pilot programs for high-travel groups (Sales team first). |
| **OCR Error Rate High** | Medium | Medium | Implement intuitive manual override UI and auto-flag low confidence scores for fast routing to audit. |
| **ERP Sync Failures** | Low | High | Build a retry queue and dead-letter queue for failed ERP exports, notifying finance administrators immediately. |

### Dependencies
| Dependency | External Team | Deadline | Contingency |
|------------|---------------|----------|-------------|
| **SSO OIDC Authentication** | Internal IT Security Team | 2026-07-01 | Fallback to secure email-activation token system for pilot group. |
| **ERP Integration Endpoint** | Finance ERP Systems Team | 2026-07-15 | Use manual batch CSV exports via secure SFTP folder in Phase 1. |