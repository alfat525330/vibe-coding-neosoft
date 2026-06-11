# Product Requirements Document (PRD)
## Abandoned Cart Recovery System
**Version:** 1.0
**Date:** 10 June 2026
**Status:** Draft / In Review
**Stack:** React.js v19, Redux, React Query, Axios, Express.js, Sequelize ORM, MySQL
**Audience:** Development team delivering to e-commerce client
---
## 1. Problem Statement
Online retail stores experience high customer drop-off during the checkout phase, leaving selected products in their shopping carts. Without a proactive intervention mechanism, these high-intent leads are lost permanently, resulting in lost revenue. By building an automated abandoned cart recovery system that triggers a timely email reminder, the store can re-engage customers and recover potential sales.
---
## 2. Goals
| Goal | Description |
|------|-------------|
| G-01 | Re-engage shopper leads who have left items in the cart and entered an email but did not finish checking out within 2 minutes. |
| G-02 | Provide store owners (admins) complete visibility into abandoned carts, their total monetary values, item breakdowns, and recovery email status. |
---
## 3. User Personas
### Shopper — Customer
- Key behaviour or context: Browses products, adds items to the cart, enters an email address during checkout, but leaves or goes inactive before purchasing.
- What they want from this system: A seamless recovery process that remembers their cart items and allows them to resume checkout via a link.
- What frustrates them right now: Having to re-add items or losing their cart composition when their session expires or when switching devices.

### Store Owner — Admin
- Key behaviour or context: Runs store operations and monitors business performance.
- What they want from this system: Automated sales recovery workflows, detailed statistics on which carts were abandoned, and real-time logs of email reminders.
- What frustrates them right now: High cart abandonment rate and lack of visual dashboard tracking of lost sales opportunities.
---

## 4. Functional Requirements

### 4.1 Product Catalog Module

| ID | Requirement |
|----|-------------|
| F-01 | **Product Listing:** Display a grid of products featuring names, descriptions, prices, and images. |
| F-02 | **Product Detail:** Allow viewing of detailed information of a single product. |
| F-03 | **Add to Cart:** Add a product with the specified quantity to the current active cart. |

### 4.2 Cart Management Module

| ID | Requirement |
|----|-------------|
| F-04 | **View Cart:** Display active cart items, quantities, unit prices, subtotal, and total cart value. |
| F-05 | **Update/Remove Items:** Allow updating item quantities or deleting items from the cart. |
| F-06 | **Capture Customer Email:** Capture and validate customer email dynamically in the checkout view, linking it immediately to the active cart. |
| F-07 | **Activity Tracking:** Update the cart's `lastActivityAt` timestamp on any cart mutation or email update. |
| F-08 | **Checkout/Complete Cart:** Provide a "Complete Purchase" action that marks the cart status as `completed` and prevents further abandonment tracking. |

### 4.3 Cart Abandonment Module

| ID | Requirement |
|----|-------------|
| F-09 | **Inactivity Detection:** A cart is flagged for abandonment if status is `active`, has a captured email, and has no activity (`lastActivityAt`) for over 2 minutes. |
| F-10 | **State Update:** Transition eligible carts' status from `active` to `abandoned`. |
| F-11 | **Completion Integrity:** Ensure that a cart marked `completed` is excluded from abandonment checks. |

### 4.4 Email Reminder Module

| ID | Requirement |
|----|-------------|
| F-12 | **Reminder Compilation:** Generate a structured HTML/text email containing the customer email, recovery checkout URL, abandoned items list with quantities, individual pricing, and total value. |
| F-13 | **Single Dispatch:** Automatically trigger exactly one reminder email per abandoned cart. |
| F-14 | **Duplicate Prevention:** Before dispatch, verify if an entry in `EmailLog` exists for the given cart to prevent sending duplicate reminders. |
| F-15 | **Log Status:** Create and update a record in `EmailLog` tracking status (`pending`, `sent`, `failed`), dispatch timestamps, and error details if any. |

### 4.5 Background Job Module

| ID | Requirement |
|----|-------------|
| F-16 | **Scheduled Cart Checks:** Execute background task at a set short interval (e.g. every 30 seconds or 1 minute) to detect abandoned carts. |
| F-17 | **Status Promotion:** Automatically promote carts from `active` to `abandoned` once inactivity limits are breached. |
| F-18 | **Email Dispatch Trigger:** Trigger the Email Reminder Module immediately upon updating a cart's status to `abandoned`. |

### 4.6 Abandoned Cart Dashboard Module

| ID | Requirement |
|----|-------------|
| F-19 | **Admin Landing:** Provide an admin-only interface listing abandoned carts. |
| F-20 | **Cart Table View:** Show columns for customer email, cart item details, total cart value, abandonment timestamp, and email reminder status. |
| F-21 | **Email Log Inspector:** Display whether the reminder was successfully sent, failed, or is pending, including the delivery timestamp. |

### 4.7 Validation Module

| ID | Requirement |
|----|-------------|
| F-22 | **Email Validation:** Enforce RFC 5322 compliant regex check on email fields on both frontend inputs and backend API requests. |
| F-23 | **Input Sanitization:** Filter and sanitize client inputs (xss prevention, positive integer enforcement for quantities, valid UUID/ID structure checks). |

### 4.8 Error Handling Module

| ID | Requirement |
|----|-------------|
| F-24 | **Centralized API Errors:** Return standardized JSON error responses containing relevant messages and HTTP status codes. |
| F-25 | **Robust Scheduler Worker:** Log and skip failed cart email dispatches without stopping the background task execution flow. |
| F-26 | **UI Error Boundaries:** Render fallback components instead of crashing the React application. |

---

## 5. Non-Functional Requirements

| ID | Requirement |
|----|-------------|
| NF-01 | **Architecture:** Frontend: Feature-based folder structure with React Query caching and Redux global state. Backend: Controller-Service-Repository layers. |
| NF-02 | **Security Headers & Protection:** Helmet headers integration, CORS configuration, Rate Limiting middleware, and SQL injection prevention using Sequelize parameterized queries. |
| NF-03 | **UI Responsiveness:** Ensure the store catalog, checkout, and admin dashboard scale correctly on mobile, tablet, and desktop screens. |
| NF-04 | **Relational Database Integrity:** Enforce foreign keys between `User`, `Product`, `Cart`, `CartItem`, and `EmailLog` in MySQL schemas. |

---

## 6. User Flow

```
[Shopper Adds Items to Cart]
            │
            ▼
[Enters Email in Checkout Field] ───► (Auto-saves email to Cart; resets lastActivityAt)
            │
            ├─────── [Completes Checkout] ──────────► [Cart Status = 'completed']
            │
            └─────── [Shopper Leaves Page]
                           │
                           ▼ (Inactivity for 2 Minutes)
              [Background Job Runs Check]
                           │
                           ▼
              [Cart Status -> 'abandoned']
                           │
                           ▼
          [Check EmailLog for Existing Entry]
                           │
                           ├── [Found] ─────────────► (Do nothing / exit)
                           │
                           └── [Not Found]
                                   │
                                   ▼
                       [Trigger Email reminder]
                                   │
                                   ▼
                       [Create EmailLog 'sent']
                                   │
                                   ▼
             [Admin viewable on Abandoned Dashboard]
```

---

## 7. Out of Scope (v1)

- **User Authentication for Shoppers:** Customer accounts or login interfaces are excluded.
- **Payment Processing:** Integrated real gateways are out of scope (uses mockup purchase completion).
- **Rich Email Editor:** Admin panel email template customization.
- **Production Delivery Service:** Real SMTP email sending is simulated via local console logger or fake provider configuration (e.g. Ethereal Mail).

---

## 8. Success Criteria

The product is considered successful when:
1. A customer adds items to a cart, enters their email, and goes inactive. After exactly 2 minutes of inactivity, the background worker successfully marks the cart as `abandoned`.
2. A single recovery email detailing the exact items and total price is successfully dispatched and logged in `EmailLog` under status `sent`.
3. If the customer returns and completes the checkout, the cart state updates to `completed` and no recovery emails are sent.
4. The admin dashboard displays a list of abandoned carts with correct email address, item quantities, total cart value, and sending status.

---

## 9. Tech Stack

| Layer | Choice |
|-------|--------|
| Frontend | React.js v19 (Functional Components) |
| State Management | Redux |
| Data Fetching / Caching | React Query & Axios |
| Backend | Node.js LTS with Express.js |
| Database / ORM | MySQL with Sequelize ORM |
| Migrations / Seeders | Sequelize-CLI |
| Security | Helmet, CORS, Express Rate Limit, bcryptjs |
| Deployment | Local Environment (npm run dev) |
