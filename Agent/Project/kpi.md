# KPI Document

**Product / Project Name:** Voyager: Enterprise Employee Travel & Expense Management System  
**Version:** 1.0.0  
**Author:** Senior Product Manager  
**Date:** 2026-06-09  
**Review Cycle:** Monthly  
**Status:** Draft  

---

## 1. Executive Summary & Core Stack

### 1.1 Application Tech Stack
The foundational technologies powering the system. Operational and technical performance KPIs are baseline-tested against this specific stack configuration.

| Layer | Technology / Framework | Version | Notes / Constraints |
| :--- | :--- | :--- | :--- |
| **Frontend** | React.js v19 | v19.0.0 | Affects Core Web Vitals / Bundle Size KPIs; utilizes Redux Toolkit & React Query. |
| **Backend** | Node.js (Express.js) | v20.x (LTS) | Dictates baseline API latency & concurrency thresholds; microservices setup. |
| **Database** | MySQL | v8.0 | Dictates connection scaling and query execution KPIs; managed via Sequelize ORM. |
| **Caching/Queue**| Redis (with BullMQ) | v7.x | Used for performance optimization tracking, scheduler, and background OCR task execution. |

### 1.2 North Star Metric
The primary objective of the Voyager platform is to eliminate process delays and operational overhead associated with employee travel and expense reimbursements.

| Field | Detail |
|-------|--------|
| **KPI Name** | Reimbursement Cycle Time |
| **Criteria (Target)** | < 5 Days (reduced from the baseline of 35 Days) |
| **Verification Method** | Automated timestamp difference from expense claim submission (`SUBMITTED_TO_AUDIT`) to ERP payout batch export (`erp_payout_batches`). |

### 1.3 Measurement Philosophy
To monitor performance and adoption effectively, we implement a balanced measurement framework:
- **Leading Indicators:** Metric components like *Expense Submission Time* and *OCR Accuracy* provide real-time indicators of user interface speed and system usability.
- **Lagging Indicators:** Metrics such as *Reimbursement Cycle Time* and *Out-of-Policy Leakage* measure the ultimate business impact of process digitization, compliance enforcement, and operational efficiency gains.

---

## 2. SSO & Role-Based Access Control KPIs

| KPI Number | KPI Name | Criteria | Target | Verification Method | Owner | Frequency |
|------------|----------|----------|--------|---------------------|-------|-----------|
| **KPI-SSO-001** | SSO Authentication Success Rate | Percentage of successful logins via Okta/Azure AD out of total attempts. | >= 99.9% | Identity Provider access logs. | IT Security Lead | Monthly |
| **KPI-SSO-002** | Token Expiry Security Violations | Unauthorized requests flagged due to stale or invalid JWT access tokens. | 0 | Middleware security logs. | IT Security Lead | Monthly |

## 2. Travel Request Workflow (Pre-Trip) KPIs

| KPI Number | KPI Name | Criteria | Target | Verification Method | Owner | Frequency |
|------------|----------|----------|--------|---------------------|-------|-----------|
| **KPI-TR-001** | Pre-Trip Approval Turnaround Time | Time elapsed from initial travel request submission to the manager's review action. | < 48 Hours | SQL query of timestamp difference between travel request creation and status change. | Operations Manager | Weekly |
| **KPI-TR-002** | Travel Request Form Abandonment Rate | Percentage of initiated travel requests that are drafted but never submitted. | < 5% | Frontend event logs. | Product Owner | Monthly |

## 2. Policy Configuration & Engine KPIs

| KPI Number | KPI Name | Criteria | Target | Verification Method | Owner | Frequency |
|------------|----------|----------|--------|---------------------|-------|-----------|
| **KPI-POL-001** | Out-of-Policy Spend Leakage | Measure total travel spend routed outside standard policy restrictions. | < 1% of total spend | Automated tracking of flagged policy overrides vs total expense volume in the analytics dashboard. | Travel & Policy Product Owner | Monthly |
| **KPI-POL-002** | Flagged Policy Override Rate | Percentage of travel requests flagged by the policy engine that require justification. | < 15% | Database statistics. | Travel & Policy Product Owner | Monthly |

## 2. Expense Claim Creator & Mobile OCR KPIs

| KPI Number | KPI Name | Criteria | Target | Verification Method | Owner | Frequency |
|------------|----------|----------|--------|---------------------|-------|-----------|
| **KPI-EXP-001** | OCR Accuracy Rate | Rate of successful metadata extraction without manual correction by the traveler. | > 85% correct extraction | Quality check matching initial OCR output fields against final submitted expense fields. | AI & OCR Lead Engineer | Monthly |
| **KPI-EXP-002** | Expense Submission Time | User-session duration spent inputting and creating a post-trip expense claim. | < 10 Minutes per report | Front-end session tracking on the expense claim creation screen. | Frontend Product Owner | Monthly |

## 2. Travel Booking Board KPIs

| KPI Number | KPI Name | Criteria | Target | Verification Method | Owner | Frequency |
|------------|----------|----------|--------|---------------------|-------|-----------|
| **KPI-TBB-001** | Booking Fulfillment Time | Time elapsed from manager's approval to booking confirmation document upload. | < 24 Hours | System timestamps tracking status changes from `APPROVED_BY_MANAGER` to `BOOKING_COMPLETED`. | Travel Desk Lead | Weekly |
| **KPI-TBB-002** | Booking Confirmation Error Rate | Percentage of booked tickets requiring manual correction/voiding. | < 2% | Travel desk logs. | Travel Desk Lead | Monthly |

## 2. Finance Audit Portal KPIs

| KPI Number | KPI Name | Criteria | Target | Verification Method | Owner | Frequency |
|------------|----------|----------|--------|---------------------|-------|-----------|
| **KPI-AUD-001** | Audit Turnaround Time | Time from claim submission to final Finance approval/rejection. | < 72 Hours | Workflow history timestamps on expense status transition to `APPROVED_BY_FINANCE`. | Finance Auditor Lead | Weekly |
| **KPI-AUD-002** | Audited Report Rejection Rate | Percentage of submitted expense claims sent back to employees for corrections. | < 10% | Database statistics. | Finance Auditor Lead | Monthly |

## 2. ERP Payout Exporter KPIs

| KPI Number | KPI Name | Criteria | Target | Verification Method | Owner | Frequency |
|------------|----------|----------|--------|---------------------|-------|-----------|
| **KPI-ERP-001** | Reimbursement Cycle Time (North Star Metric) | Duration of end-to-end processing from submission to payout file availability. | < 5 Days | SQL database query comparing claim submission date with the ERP export batch completion timestamp. | Finance ERP Systems Team | Weekly |
| **KPI-ERP-002** | ERP Integration Sync Success Rate | Successful batch CSV/JSON exports without formatting/system errors. | 100% | System integration error logging. | Backend Platform Lead | Daily |

## 2. Analytics & Reporting Dashboard KPIs

| KPI Number | KPI Name | Criteria | Target | Verification Method | Owner | Frequency |
|------------|----------|----------|--------|---------------------|-------|-----------|
| **KPI-ANA-001** | Dashboard Query Response Time | Loading time of the analytics report dashboards. | < 3 Seconds | Performance monitoring logs. | Frontend Product Owner | Monthly |
| **KPI-ANA-002** | Reporting Sync Latency | Time elapsed for transactional data changes to reflect in the analytics datastore. | < 24 Hours | System database check. | Backend Platform Lead | Daily |

---

## 3. Thresholds

| KPI Number | 🟢 On Track | 🟡 At Risk | 🔴 Off Track |
|------------|-------------|------------|--------------|
| **KPI-SSO-001** | >= 99.9% success | 98.0% – 99.8% success | < 98.0% success |
| **KPI-SSO-002** | 0 violations | 1 - 2 violations | > 2 violations |
| **KPI-TR-001** | < 48 Hours | 48 – 72 Hours | > 72 Hours |
| **KPI-TR-002** | < 5% abandonment | 5% – 10% abandonment | > 10% abandonment |
| **KPI-POL-001** | < 1% leakage | 1% – 3% leakage | > 3% leakage |
| **KPI-POL-002** | < 15% overrides | 15% – 25% overrides | > 25% overrides |
| **KPI-EXP-001** | >= 85% accuracy | 75% – 84% accuracy | < 75% accuracy |
| **KPI-EXP-002** | < 10 Minutes | 10 – 15 Minutes | > 15 Minutes |
| **KPI-TBB-001** | < 24 Hours | 24 – 48 Hours | > 48 Hours |
| **KPI-TBB-002** | < 2% error rate | 2% – 5% error rate | > 5% error rate |
| **KPI-AUD-001** | < 72 Hours | 72 – 96 Hours | > 96 Hours |
| **KPI-AUD-002** | < 10% reject rate | 10% – 15% reject rate | > 15% reject rate |
| **KPI-ERP-001** | < 5 Days | 5 – 7 Days | > 7 Days |
| **KPI-ERP-002** | 100% success | 95.0% – 99.9% success | < 95.0% success |
| **KPI-ANA-001** | < 3 Seconds | 3 – 5 Seconds | > 5 Seconds |
| **KPI-ANA-002** | < 24 Hours sync | 24 - 48 Hours sync | > 48 Hours sync |

---

## 4. Open Questions & Assumptions

| # | Question / Assumption | Owner | Due Date |
|---|-----------------------|-------|----------|
| 1 | **Assumption:** All employees have access to smartphones or web cameras for receipt scanning. | Product Team | 2026-07-01 |
| 2 | **Assumption:** Active Directory contains accurate and updated manager attributes for hierarchical routing. | IT Department | 2026-07-01 |
| 3 | **Open Question:** What is the precise format and secure transfer mechanism (SFTP or REST API) for the ERP batch file export? | Finance ERP Systems Team | 2026-07-15 |
| 4 | **Open Question:** Which authentication scopes are needed for Azure AD / Okta to retrieve employee grades and locations? | Internal IT Security Team | 2026-07-01 |

---

## Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 0.1     | 2026-06-09 | Senior Product Manager | Initial draft generated based on Voyager Travel & Expense Management PRD. |
| 0.2     | 2026-06-09 | Senior Product Manager | Expanded to define KPI tables for all individual functional modules. |
| 0.3     | 2026-06-09 | Senior Product Manager | Refactored Section 1 to include Application Tech Stack (Section 1.1) and renumbered North Star and Measurement Philosophy. |
