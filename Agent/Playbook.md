/////////////////////Raw Problem Statement
Project Name: Enterprise Employee Travel & Expense Management System
Client Background
We are a large organization with approximately 10,000+ employees operating across multiple locations. Employees frequently travel for client meetings, training programs, audits, conferences, and internal business activities.
Currently, travel requests, approvals, expense claims, and reimbursements are managed through emails, Excel sheets, phone calls, and paper documents. This process is time-consuming, lacks visibility, and creates operational challenges.

/// prompt to genrate PRD

Act as a Senior Business Analyst and Product Manager.

Based on the following project: 

**Project Name:** Enterprise Employee Travel & Expense Management System

**Organization Size:** 10,000+ employees across multiple locations

**Business Context:** Employees frequently travel for client meetings, training programs, audits, conferences, and internal business activities. Currently, travel requests, approvals, expense claims, and reimbursements are managed through emails, Excel sheets, phone calls, and paper documents, resulting in delays, lack of visibility, compliance issues, and operational inefficiencies.
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
* Virtual Scrolling for large datasets
* Responsive UI
* Role-Based Navigation
* Protected Routes
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
* Microservice Architecture
* JWT Authentication
* Role-Based Access Control (RBAC)
* Middleware-based Authorization
* Sequelize ORM
* MySQL
* Database Migrations
* Seeders
* Centralized Error Handling
* Request Validation
* Logging
* API Versioning
Security Requirements:
* SQL Injection Prevention
* Input Sanitization
* JWT Refresh Strategy
* Secure Password Hashing
* Rate Limiting
* CORS Configuration
* Helmet Security Headers
* Audit Logging
Backend Standards:
* Controller Layer
* Service Layer
* Repository Layer
* Middleware Layer
* Validation Layer
## Database
Use:
* MySQL
Database Requirements:
* Proper Normalization
* Foreign Keys
* Indexing Strategy
* Relationship Mapping
* Query Optimization
* Soft Deletes
* Audit Columns
* Performance Optimization
Required Relationship Types:
* One-to-One
* One-to-Many
* Many-to-Many
Include:
* ER Diagram
* Table Definitions
* Index Strategy
* Foreign Key Definitions

By refering [prd.md] template need to generate prd.md file In @project folder.


// ------------------prompt to generate kpi.md -----------------------------------------
Act as a Senior Product Manager with 10+years of experience in IT Industry. 

create kpi.md file in `Agent/Project` folder. 

by refering [prd.md] and [kpi.md] template file 

please genrate Kpi.md File

//--------------- prompt to generate scope.md ----------
act as a Business Analyst with 10+years of experience in IT Industry.

create scope.md file in `Agent/Project` folder.

by refering [prd.md],[kpi.md] and [scope.md]. 

Do NOT invent: Features,
Requirements,Business rules,KPIs,Constraints,Assumptions,Dependencies,
Create a complete scope.md,Save it in: Agent/Project/scope.md,Must strictly follow template structure,Must include traceability to PRD and KPI

//----------------promt to genrate project_boundry.md

act as a Business Analyst with 10+years of experience in IT Industry.Generate project_boundry.md file.Follow structure from [project_boundry.md](file;file:///c%3A/Users/Client/OneDrive/Desktop/Vibe-coding-project/Agent/Template/project_boundry.md)and by refering this two files [kpi.md](file;file:///c%3A/Users/Client/OneDrive/Desktop/Vibe-coding-project/Agent/Project/kpi.md), [scope.md](file;file:///c%3A/Users/Client/OneDrive/Desktop/Vibe-coding-project/Agent/Project/scope.md). please generate project_boundry.md file inside `Agent/project`. Do NOT invent: features,requirements,business rules,constraints,dependencies,assumptions,
scope items,.