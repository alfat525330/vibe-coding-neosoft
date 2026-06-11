# KPI Document
## Abandoned Cart Recovery System

**Version:** 1.0
**Date:** 10 June 2026

---

## 1. What We're Measuring

This document defines two levels of key performance indicators (KPIs) to measure the success of the Abandoned Cart Recovery System:
- **Layer 1: POC Acceptance KPIs (Technical)** - Binary pass/fail metrics that guarantee the technical implementation satisfies the core system design, data flow integrity, and performance guidelines before project handoff.
- **Layer 2: Product KPIs (Business)** - Business outcomes to evaluate the actual impact of the recovery workflow in production, specifically tracking user interaction, email engagement, recovered sales revenue, and conversion optimization.

---

## 2. POC Acceptance KPIs (Technical — must pass before handoff)

| KPI | Target | How to Verify |
|-----|--------|----------------|
| Inactivity Detection | Carts flagged as abandoned within 2 mins 10 secs of last activity | Create cart, add item, input email, wait 2 mins. Verify DB status is changed to `abandoned`. |
| Single Reminder Delivery | Exactly 1 email sent per abandoned cart | Verify database logs and test inbox logs show only one dispatch action; ensure no duplicate entries in `EmailLog`. |
| Data Consistency | Email contains correct items and total | Cross-reference mock email items and total against the database values for the corresponding cart ID. |
| Checkout Recovery Work | State restored correctly via recovery link | Click recovery link in the mock email; confirm shopper is routed to the checkout view with all previous cart items intact. |
| Completion Integrity | Completed carts excluded from reminders | Add item, enter email, trigger "Complete Purchase" checkout action. Wait 2 minutes; verify cart is NOT marked as abandoned and no email is sent. |
| Admin Dashboard Visibility | Carts and email status visible in Admin View | Log in as admin, verify listing shows the customer's email, exact cart items, total cart value, and accurate reminder status (`pending` / `sent` / `failed`). |
| Mobile Usability | Layout is fully responsive | Test application UI elements (catalog, cart, admin table) at a 375px mobile viewport using browser developer tools. |

---

## 3. Product KPIs (Business — measure after going live)

### 3.1 Cart Recovery Rate

**Definition:** The percentage of abandoned carts that are successfully recovered (shopper clicked recovery link and completed checkout).

**Target:** ≥ 10% within the first 30 days of production release.

**Formula:**
```
Cart Recovery Rate = (Recovered Carts Completed / Total Carts Marked Abandoned) * 100
```

---

### 3.2 Reminder Email Open Rate

**Definition:** The percentage of sent recovery emails that are opened by recipients.

**Target:** ≥ 45% (based on standard e-commerce email benchmark).

**Formula:**
```
Email Open Rate = (Unique Emails Opened / Total Emails Sent) * 100
```

---

### 3.3 Email Click-Through Rate (CTR)

**Definition:** The percentage of recovery emails where the shopper clicked the checkout recovery URL.

**Target:** ≥ 15%

**Formula:**
```
Email Click-Through Rate = (Unique Recovery Clicks / Total Emails Sent) * 100
```

---

### 3.4 Recovered Revenue

**Definition:** The absolute monetary value of orders processed from recovered carts.

**Target:** Measurable positive monetary value within 30 days of launch.

**Formula:**
```
Recovered Revenue = Sum(Total value of completed carts that were previously abandoned and received a reminder)
```

---

### 3.5 Overall Cart Abandonment Rate

**Definition:** The proportion of total created carts that are abandoned by shoppers.

**Why track it:** Establishes the baseline abandonment metric for the client to measure conversion improvements over time.

**Formula:**
```
Overall Cart Abandonment Rate = (Total Abandoned Carts / Total Created Carts) * 100
```

**Typical baseline:** 70–80% for standard retail platforms.

---

### 3.6 Email Dispatch Latency

**Definition:** The duration between a cart crossing the 2-minute inactivity threshold and the corresponding email record status changing to `sent`.

**Target:** < 30 seconds.

---

## 4. KPI Tracking Plan

| KPI | Tool | Owner |
|-----|------|-------|
| Technical Acceptance (All Layer 1) | Manual test suites & backend application logs | Lead Developer |
| Email Open Rate & CTR | Email service dashboard (e.g. Mailtrap / Resend analytics) | Marketing Specialist |
| Cart Recovery & Abandonment Rates | Application Database queries | Data Analyst |
| Recovered Revenue | Admin dashboard & order management module reports | Store Owner |

---

## 5. Reporting Cadence

| Period | Review |
|--------|--------|
| Week 1 | Daily checks to ensure background jobs are running and emails are delivering successfully. |
| Weeks 2–4 | Weekly reports assessing email open and click-through rates. |
| Month 1 End | Comprehensive business review matching recovered revenue and recovery rates against the pre-launch baseline. |
| Ongoing | Monthly reviews to identify drops in metrics or catalog performance. |
