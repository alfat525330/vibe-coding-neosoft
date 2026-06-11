# Project Boundary Document
## Abandoned Cart Recovery System
**Version:** 1.0
**Date:** 10 June 2026

---

## 0. Working Rules

- No commits without approval.
- No command execution without approval.
- Ask before coding if requirements are unclear.
- No assumptions beyond approved docs.
- Modular code only.
- Follow existing conventions.
- No new dependencies or architecture changes without approval.

---

## 1. Purpose

The purpose of this project is to build an MVP Abandoned-Cart Recovery System. The scope defines a standalone system where shopper interactions (browsing products, modifying carts, entering email details) are tracked to automatically flag inactive sessions after 2 minutes and send a single reminder email, while store owners monitor the recovery status via an admin dashboard.

---

## 2. System Boundary Diagram

User/Admin → Frontend (React v19, Redux, React Query) → Backend (Express.js APIs) → Mailtrap / Ethereal Mail (Mock Email)
                                                  ↘ Database (MySQL, Sequelize ORM)

---

## 3. Ownership

| Area | Responsibility |
|--------|---------------|
| Frontend | Product Catalog UI, Cart UI with email capture field, Admin Dashboard table, UI route validation, React Query cache, and global Redux state management. |
| Backend | API routing, cart activity tracking logic, abandonment status promotion state machine, background job runner, and email dispatcher. |
| Database | MySQL schema definitions, migrations, and model persistence for User, Product, Cart, CartItem, and EmailLog models. |
| Integrations | Configuration of Mailtrap/Ethereal Mail SMTP transport for mock email dispatch. |

---

## 4. Exclusions

| Area | Owner | Our Stance |
|------|-------|------------|
| Shopper Authentication | Client / Future Phase | Standalone MVP — no shopper accounts or shopper login routes are created. Shopper identity is captured via the email input field. |
| Payment Gateway Integration | Client / Future Phase | No real transaction processors. Checkout completion is simulated via a mock action button. |
| Rich Email Template Editor | Client / Future Phase | Static pre-built HTML/text layouts are compiled; no custom customization dashboard. |
| Production SMTP Delivery | Client / Future Phase | Simulated using local logs or mock provider sandbox configurations (Mailtrap / Ethereal Mail). |

---

## 5. Integrations

| Service | Direction | Data In/Out | Secrets | Failure Handling |
|----------|-----------|-------------|----------|------------------|
| Mailtrap / Ethereal Mail | Outbound | Sends compiled recovery checkout URL, customer email, item list with prices, and cart total values. | SMTP login and password credentials configured in `.env`. | Logs email failures and flags `EmailLog` status as `failed` without crashing background worker threads. |

---

## 6. Constraints

| Area | Constraint |
|--------|-----------|
| Infrastructure | Standard Node.js (LTS) environment with MySQL Database Server. |
| Security | Enforces RFC 5322 email validation, server input sanitization, rate limiting, and SQL injection prevention via Sequelize parameterized query engine. |
| Compatibility | Frontend must scale and remain fully functional down to 375px+ mobile viewports. |

---

## 7. Assumptions

| Assumption | Impact if Wrong |
|------------|----------------|
| Email sending is mocked via local console logs or sandbox SMTP credentials (Mailtrap/Ethereal). | The client will expect actual shoppers to receive real external production emails, requiring production DNS/Resend keys. |
| Checkout flow completion is simulated using a mock button rather than active payment gateway integrations. | The client will attempt to run live transactions, requiring payment gateway integration architecture. |
| Shoppers do not need authenticated profiles or login credentials to initiate cart abandonment flows. | Shoppers cannot track session histories, requiring user credentials and account logic. |

---

## 8. Change Control

Changes to scope, architecture, integrations, security, infrastructure, or timelines require approval.

---

## 9. Quality Standards

- SRP (Single Responsibility).
- Clear naming and documentation.
- Tests for critical logic.
- Review before merge.
- No breaking changes without approval.
