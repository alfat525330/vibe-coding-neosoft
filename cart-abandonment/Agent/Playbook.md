/////////////////////Raw Problem Statement

An online store loses customers at checkout. Owner wants a simple page that shows abandoned cart items and sends one email reminder automatically.

simpliyfy The Problem, Explained Simply
An online store is bleeding money at one specific moment — the instant a shopper adds items to their cart but doesn't check out. This is called cart abandonment, and it affects ~75% of all e-commerce sessions. The store owner has no automated way to bring those shoppers back. Your job is to build that automation.


/// prompt to genrate PRD
Act as a Senior Business Analyst and Product Manager.

Generate a complete PRD document using the provided prd.md template.

Project Summary

An online store loses customers at checkout.

Build an MVP abandoned-cart recovery system.

POC Goal:
If a customer adds products to a cart, enters an email, and leaves without purchasing for 2 minutes, the system automatically sends one reminder email containing the abandoned cart items.

Admin can view abandoned carts and reminder status.

Roles:
1. Admin (Store Owner)
2. Customer (Shopper)

Core Models:
- User
- Product
- Cart
- CartItem
- EmailLog

Modules:
# Modules

## 1. Product Catalog Module

Purpose: Display products and allow users to add items to cart.

Features:
- Product listing
- Product details
- Product pricing
- Add to cart

## 2. Cart Management Module

Purpose: Manage cart items and customer information.

Features:
- Add item to cart
- Remove item from cart
- Update quantity
- Calculate totals
- Capture customer email

## 3. Cart Abandonment Module

Purpose: Detect inactive carts.

Features:
- Track cart activity
- Detect inactivity after 2 minutes
- Mark cart as abandoned
- Prevent completed carts from being marked abandoned

## 4. Email Reminder Module

Purpose: Send abandoned cart reminder emails.

Features:
- Generate reminder email
- Include abandoned cart items
- Send one reminder email
- Prevent duplicate reminders
- Track email status

## 5. Background Job Module

Purpose: Automate abandonment detection and email sending.

Features:
- Scheduled cart checks
- Identify abandoned carts
- Trigger reminder emails
- Update cart status

## 6. Abandoned Cart Dashboard Module

Purpose: Allow store owner to view abandoned carts.

Features:
- View abandoned carts
- View customer email
- View cart items
- View cart value
- View reminder status

## 7. Validation Module

Purpose: Ensure valid data throughout the system.

Features:
- Email validation
- Cart validation
- API request validation

## 8. Error Handling Module

Purpose: Handle failures gracefully.

Features:
- API error handling
- Email failure handling
- Database error handling
- Logging

---

# MVP Modules

- Product Catalog Module
- Cart Management Module
- Cart Abandonment Module
- Email Reminder Module
- Background Job Module
- Abandoned Cart Dashboard Module
- Validation Module
- Error Handling Module

---

Technology Stack:
# Mandatory Technology Stack
## Frontend
Use:
* React.js v19
* Redux for state management
* Axios for API communication
* React Query for server state management and caching
* Functional Components only
* Custom Error Handling Framework
* Lazy Loading
* Responsive UI
* Reusable Component Architecture
Frontend Requirements:
* Modular architecture
* Feature-based folder structure
* API abstraction layer
* Global error boundary
* Loading and skeleton states
* Pagination support
* Search and filtering
* Form validation
* Optimized rendering
---
## Backend
Use:
* Latest Node.js LTS
* Express.js
* Middleware-based Authorization
* Sequelize ORM
* MySQL
* Database Migrations
* Seeders
* Centralized Error Handling
* Request Validation
* Logging
Security Requirements:
* SQL Injection Prevention
* Input Sanitization
* Secure Password Hashing
* Rate Limiting
* CORS Configuration
* Helmet Security Headers
Backend Standards:
* Controller Layer
* Service Layer
* Repository Layer
* Middleware Layer
* Validation Layer
## Database
Use:
* MySQL
Output Format:
Create prd.md inside @project folder.


// ------------------prompt to generate kpi.md -----------------------------------------
user [save_token.md] strategy. 

Act as a Senior Product Manager with 10+years of experience in IT Industry. 

create kpi.md file in `Agent/Project` folder. 

by refering [prd.md] and [kpi.md] template file.

please genrate Kpi.md File.

//--------------- prompt to generate scope.md ----------
Act as a Business Analyst with 10+years of experience in IT Industry.

create scope.md file in `Agent/Project` folder.

by refering [prd.md],[kpi.md] and Follow structure from [scope.md]. 

Do NOT invent: Features,
Requirements,Business rules,KPIs,Constraints,Assumptions,Dependencies,
Create a complete scope.md,Save it in: Agent/Project/scope.md,Must strictly follow template structure,Must include traceability to PRD and KPI

//----------------promt to genrate project_boundry.md

act as a Business Analyst with 10+years of experience in IT Industry.
Generate project_boundry.md file.
Follow structure from [project_boundry.md] template.  
by refering this two files [kpi.md] (secondary source) ,[scope.md] (primary source). 
please generate project_boundry.md file inside `Agent/project`. Do NOT invent: features,requirements,business rules,constraints,dependencies,assumptions,
scope items.


//-------------------- prompt start code generation----------------
Act as defined in the persona profile located at: `./Agent/Parsonas/backend-parsona.md`

Task: Prepare the backend project initial setup in the root directory under the `server` folder.

Context Documents to Review:
* `./Agent/Project/prd.md`
* `./Agent/Project/kpi.md`
* `./Agent/Project/scope.md`

Execution Protocol:
1. First, verify that ALL specified context source documents exist in the workspace and are fully readable.
2. If any document is missing, unreadable, or incomplete, STOP immediately and report the error.
3. Analyze all documents thoroughly to map out the system boundaries before proposing any implementation.
4. Do NOT generate or write any application code yet.

Required Output Sections:
1. **Document Validation Status:** Explicitly list each file and its readiness.
2. **Architectural Implementation Plan:** High-level blueprint of the `server` directory structure matching the repository/service layer requirement.
3. **Clarifying Questions:** Highlight any conflicting requirements found between the PRD and the Scope.
4. **Permission Request:** Formal request to proceed to code generation and initialization commands (`npm init`, etc.).
5. **Output Location Verification:** Acknowledge target path is explicitly the root `./server/` folder.
6. **Token State Logging:** State the current token/session handshake to be saved into `./Agent/Project/save_token.md`.




----------------------------------------

Act as defined in `Agent/backend_persona.md`.
## Task
Start backend development using the approved project documents.
## Source Documents
* Agent/Project/kpi.md
* Agent/Project/prd.md
* Agent/Project/scope.md
* Agent/Project/project_boundry.md
* Agent/backend_persona.md
## Rules
1. Use ONLY information explicitly present in the source documents.
2. Do NOT invent:
   * APIs
   * database tables
   * database fields
   * business rules
   * workflows
   * user roles
   * permissions
   * integrations
   * configurations
3. If required information is missing:
   * STOP
   * Ask clarification questions
   * Do not generate code
4. Follow all constraints defined in:
   * scope.md
   * project_boundry.md
5. Every implementation must be traceable to:
   * KPI
   * Requirement
   * Scope item
6. Do not implement anything marked:
   * Out of Scope
   * Future Scope
   * Excluded
7. Do not modify unrelated files.
8. Do not create placeholder implementations.
9. Follow token-saving rules if defined in save_token.md.
## Development Process
Step 1:
Analyze all source documents.
Step 2:
Identify:
* modules
* entities
* APIs
* business rules
* dependencies
Step 3:
Report findings.
Output format:
### Information Confirmed
### Missing Information
### Clarification Questions
### Proposed Backend Modules
### Proposed Database Entities
### Proposed API Groups
Do NOT generate code yet.
Wait for approval.

//------------- prompt to start frontend code generation----------




new prompt to genrate prd.md file 

Act as a Senior Business Analyst and Product Manager.
Based on the following project: 
**Project Name:** Enterprise Employee Travel & Expense Management System
**Organization Size:** 10,000+ employees across multiple locations
**Business Context:** Employees frequently travel for client meetings, training programs, audits, conferences, and internal business activities. Currently, travel requests, approvals, expense claims, and reimbursements are managed through emails, Excel sheets, phone calls, and paper documents, resulting in delays, lack of visibility, compliance issues, and operational inefficiencies.
Current Challenges:
- Travel requests managed via emails and phone calls
- Approvals tracked through phone calls and Excel sheets
- Expense claims submitted using paper documents
- Reimbursements are delayed and difficult to track
- Lack of visibility and reporting
- High manual effort
- Poor audit readiness

Required User Roles: (Admin,Management,Employee)

Modules:
Admin Dashboard: ( Full system access,User Management,Travel Request Management,Approval Workflow Monitoring,Expense Claim Monitoring,Reimbursement Monitoring,Receipt Repository,Reports & Analytics,Audit Logs,Policy Management)

Management Dashboard: ( Travel request Management, Multi-Level Approval Workflow, Expense Claim Review, Reimbursement Processing, Receipt Verification, Team Reporting & Analytics, Team User Management)

Employee Dashboard: ( Authentication, Travel Request Submission, Approval Tracking, Expense Claim Submission, Receipt Upload, Reimbursement Tracking)

Business Goals: ( Reduce manual effort by 80%, Reduce travel approval time by 70%, Process reimbursements within 3 working days, Achieve 100% audit readiness, Improve employee satisfaction, Increase process visibility and compliance)

Scalability Requirements: ( 10,000+ registered users, 1,000+ concurrent users, Peak load support up to 3,000 concurrent users,99.95% system availability, API response time < 500ms, Dashboard load time < 3 seconds)

# Mandatory Technology Stack
## Frontend
Use: ( React.js v19, Redux for state management, Axios for API communication, React Query for server state management and caching, Functional Components only,Custom Error Handling Framework,Lazy Loading, Virtual Scrolling for large datasets, Responsive UI, Role-Based Navigation, Protected Routes, Reusable Component Architecture)
Frontend Requirements: ( Modular architecture,Feature-based folder structure,API abstraction layer, Global error boundary,Loading and skeleton states,Pagination support,Search and filtering,Form validation,Optimized rendering)

## Backend
Use: ( Latest Node.js LTS, Express.js, Microservice Architecture, JWT Authentication, Role-Based Access Control (RBAC), Middleware-based Authorization, Sequelize ORM, MySQL, Database Migrations, Seeders, Centralized Error Handling, Request Validation, Logging, API Versioning)
Security Requirements: ( SQL Injection Prevention, Input Sanitization, JWT Refresh Strategy, Secure Password Hashing, Rate Limiting, CORS Configuration, Helmet Security Headers, Audit Logging)
Backend Standards: ( Controller Layer, Service Layer, Repository Layer, Middleware Layer, Validation Layer)

## Database
Use: ( MySQL )
Database Requirements: (Proper Normalization,Foreign Keys,Indexing Strategy,Relationship Mapping,Query Optimization,Soft Deletes,Audit Columns,Performance Optimization)
Required Relationship Types: ( One-to-One,One-to-Many,Many-to-Many)
Include: ( ER Diagram,Table Definitions,Index Strategy,Foreign Key Definitions)

By refering [prd.md] template need to generate prd.md file In @project folder.