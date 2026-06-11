# Scope Document
## Abandoned Cart Recovery System
**Version:** 1.0
**Date:** 10 June 2026

---

## 1. Project Phases

| Phase | Name | Deliverable |
|-------|------|-------------|
| Phase 1 | MVP Abandoned-Cart Recovery System | Full functional POC containing product catalog, cart management, 2-minute inactivity tracking, single email reminder dispatch, and admin tracking dashboard. |
| Phase 2 | Production Release | Integration of user authentication, real payment gateways, rich email template customization, and live production SMTP email delivery. |

---

## 2. Phase 1 Scope (What You Build Now)

### IN SCOPE

| Area | Included | Traceability |
|------|----------|--------------|
| **Product Catalog** | Display grid of products with names, descriptions, prices, detail views, and functional Add to Cart button. | PRD: F-01, F-02, F-03 |
| **Cart Management** | Display active cart items, subtotal, and total cart value. Allow modifying quantity, deleting items, and capturing shopper email. | PRD: F-04, F-05, F-06 |
| **Inactivity Tracking** | Log and update cart activity status and update `lastActivityAt` timestamp on every mutation. | PRD: F-07, F-08 |
| **Abandonment Processing** | Detect carts inactive for 2 minutes and promote their status to `abandoned`. Exclude carts marked `completed`. | PRD: F-09, F-10, F-11; KPI: Inactivity Detection, Completion Integrity |
| **Email Template Compiler** | Generate email containing customer details, cart items list, pricing, total cart value, and recovery checkout link. | PRD: F-12; KPI: Data Consistency |
| **Email Dispatcher & Log** | Send exactly one reminder email per abandoned cart, log status in `EmailLog`, and prevent duplicates. | PRD: F-13, F-14, F-15; KPI: Single Reminder Delivery |
| **Background Job** | Scheduled background task executor running at periodic short intervals to check inactive carts and dispatch reminders. | PRD: F-16, F-17, F-18; KPI: Inactivity Detection, Email Dispatch Latency |
| **Admin Dashboard** | Display all abandoned carts, customer email, cart item details, total cart value, and recovery email status. | PRD: F-19, F-20, F-21; KPI: Admin Dashboard Visibility |
| **Validation & Security** | RFC 5322 email regex, sanitization, rate limiting, and SQL injection prevention. | PRD: F-22, F-23; KPI: Mobile Usability |
| **Error Handling** | Standardized JSON API responses, React error boundaries, log server errors without worker crashes. | PRD: F-24, F-25, F-26 |

### OUT OF SCOPE (Phase 1)

| Area | Reason | Traceability |
|------|--------|--------------|
| **User Authentication for Shoppers** | Adds system complexity; not required to test the core abandonment and recovery POC. | PRD: Out of Scope (v1) |
| **Payment Gateway Integration** | Simulated checkout workflow completes with a mock action button. | PRD: Out of Scope (v1) |
| **Rich Email Template Editor** | Static pre-built HTML/text email layouts suffice for the recovery trigger verification. | PRD: Out of Scope (v1) |
| **Production SMTP Email Delivery** | Replaced with local logs or fake SMTP server testing (e.g. Mailtrap / Ethereal). | PRD: Out of Scope (v1) |

---

## 3. Phase 2 Scope (Future — Not Started)

| Feature | Description |
|---------|-------------|
| **User Identity & Auth** | Cookie or account-based shopper identity across sessions and devices. |
| **Payment Gateways** | Real checkout payments using Stripe, PayPal, or card processors. |
| **Custom Email Layouts** | Content management system for admin to build and edit rich custom email templates. |
| **Production Email Service** | Production email dispatch service integration using Resend or Sendgrid. |

---

## 4. Deliverables Checklist

### Documentation
- [x] `prd.md` — Product requirements
- [x] `kpi.md` — Success metrics
- [ ] `scope.md` — This document
- [ ] `project_boundary.md` — Integration boundaries
- [ ] `README.md` — Setup instructions for client or team

### Core Build
- [ ] Product Catalog UI (Listing & Detail components)
- [ ] Cart Management component with email capture & state mutations
- [ ] Inactivity tracker database updates & checkout completion hook
- [ ] Email reminder template formatter
- [ ] Background job worker for check & status update
- [ ] Email dispatch mechanism with logs & deduplication check
- [ ] Admin Dashboard UI table (Cart details & Email status)
- [ ] API validation middleware & sanitize filter layer
- [ ] Centralized express error handler & React error boundary

### Quality & Handoff
- [ ] Manual verification against POC KPIs (Inactivity, Single reminder, Dashboard update)
- [ ] Environment configuration file (`.env.example`)
- [ ] Screen recording showing complete recovery loop (2-min checkout checkout flow)
- [ ] Local server running instructions

---

## 5. Effort Estimate (Phase 1)

| Task | Estimate |
|------|----------|
| Project Initialization & Database (MySQL, Sequelize Setup, Migrations) | 2 hours |
| Backend API Design (Controllers, Services, Repositories, Middlewares) | 4 hours |
| Cart Abandonment Detection Logic & Background Job Worker | 3 hours |
| Email Compilation & Dispatch Logger Service | 2 hours |
| React UI Core Setup & State Integration (Redux, React Query, Axios) | 3 hours |
| Frontend Catalog & Cart Components with Email Capture | 4 hours |
| Admin Dashboard UI & Email Log Table | 3 hours |
| Sanitization, API Request Validation & Security Config | 2 hours |
| Centralized Error Handling & Testing/QA | 3 hours |
| Documentation (Project Boundary, README) | 1 hour |
| **Total** | **~27 hours** |

---

## 6. Dependencies

| Dependency | Required For | Notes |
|------------|-------------|-------|
| **Node.js (LTS)** | Backend development runtime environment | Express and worker tasks. |
| **MySQL Database Server** | Storing User, Product, Cart, CartItem, and EmailLog models | Schema setup. |
| **React 19 & Redux & React Query** | Frontend single page application framework | Global client and server state. |
| **Sequelize CLI** | Handling database table migrations and seeding mock products | CLI operations. |
| **Mailtrap / Ethereal Mail Credentials** | Mocking email sending for development verification | Free tier verification environment. |