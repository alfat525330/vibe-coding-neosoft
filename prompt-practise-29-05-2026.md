# Backend Admin Dashboard

## Overview
This document describes the backend requirements and implementation plan for the Chatorbit admin dashboard. The backend is built on **Node.js**, **Express.js**, and **Sequelize** with MySQL.

## Goal
Provide admin-specific API support for managing users, posts, chat rooms, and video chat sessions. The admin panel must support user impersonation / proxy login, active/inactive/unverified status filtering, and related data details.

## Required Functionality

### 1. Dashboard Metrics
Create endpoints to return aggregated admin dashboard statistics:
- Total user count
- Active user count
- Inactive user count
- Unverified user count

### 2. User Management Module
Provide admin user management endpoints:
- List users with filters: all, active, inactive, unverified
- Support pagination, search, and sorting
- Return user profile details and status fields
- Return associated user posts when a user is selected

### 3. Post Management Module
Provide admin endpoints for posts:
- List all posts
- Filter by status and user
- Return post metadata and media references
- Support post moderation actions (update/delete)

### 4. Chat Room Management Module
Provide admin endpoints for chat rooms:
- List chat rooms between users
- Return latest message preview, participants, and room status
- Support filtering and pagination

### 5. Video Chat Management Module
Provide admin endpoints for video chat sessions:
- List video chat sessions or active video rooms
- Return participant info and session metadata
- Support filtering by status or user

### 6. Admin Proxy Login
Provide an admin impersonation endpoint:
- Admin logs in as a specific user
- Generate a temporary JWT for the selected user
- Maintain admin audit details in logs

## Suggested Backend API Structure

### Admin Routes
- `GET /api/admin/dashboard` — aggregated counts and quick stats
- `GET /api/admin/users` — list users with status filters
- `GET /api/admin/users/:id` — user detail + posts
- `GET /api/admin/posts` — list all posts
- `GET /api/admin/chatrooms` — list chat rooms
- `GET /api/admin/video-chats` — list video chat sessions
- `POST /api/admin/proxy-login/:userId` — impersonate a user

### Example Response Shape

#### Dashboard
```json
{
  "totalUsers": 1024,
  "activeUsers": 760,
  "inactiveUsers": 180,
  "unverifiedUsers": 84
}
```

#### User Detail
```json
{
  "user": {
    "id": 12,
    "name": "Jane Doe",
    "email": "jane@example.com",
    "role_id": 3,
    "isActive": true,
    "isVerified": false,
    "accountStatus": "active"
  },
  "posts": [ /* user posts */ ]
}
```

## Data Model Notes
Use the existing Sequelize models and relationships:
- `User` for user profile and status fields
- `UserPost` for user posts
- `ChatRoom` and `Chat` for messaging data
- `Blog` / `BlogCategory` only if admin dashboard includes blog moderation

## Implementation Notes
- Reuse existing middleware and JWT auth for admin protection
- Add new admin-only middleware if needed
- Keep response shapes consistent with current API design
- Leverage current `UserPost`, `ChatRoom`, and `Chat` models for admin list views

## Project Structure Integration
Maintain the same structure and techniques as the existing backend docs and codebase:
- Document in Markdown with clear headings
- Use root-level admin docs file alongside `README.md`
- Keep backend-specific details separate from frontend admin docs

## Next Steps
1. Add admin controller and route files under `src/controllers/admin.*` and `src/routes/admin.routes.js`
2. Update middleware to support admin roles
3. Implement dashboard and management APIs
4. Add seeder / role checks for admin access
