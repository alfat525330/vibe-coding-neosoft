# Project Workflow: Abandoned Cart Recovery System

This document outlines the end-to-end user journeys, system automation triggers, and data state transitions for the Abandoned Cart Recovery System.

---

## 1. System Components Interaction Flow

```
+------------------+                   +--------------------+                   +--------------------+
|  Shopper Client  | ──(HTTP API)───>  |  Express Backend   | ──(Sequelize)──>  |   MySQL Database   |
|   (Vite React)   | <──(JSON Res)───  |    (Controller)    | <──(Data Row)───  |      (Tables)      |
+------------------+                   +--------------------+                   +--------------------+
                                                 ▲
                                                 │ (Scans & Dispatches)
                                                 ▼
                                       +--------------------+
                                       | Background Worker  |
                                       | (Scheduler Task)   |
                                       +--------------------+
```

---

## 2. Core Workflow Stages

### Stage 1: Cart Initialization & Product Catalog
1. **Shopper Lands on Catalog:** The shopper visits the landing page (`/`). The frontend displays the product catalog.
2. **Add to Cart Action:** When the shopper clicks "Add to Cart":
   - If no cart exists in local state, the frontend calls `POST /api/cart` to initialize a new active cart in the database.
   - The frontend saves the returned `cartId` in Redux and `localStorage`.
   - The frontend calls `POST /api/cart/:cartId/items` to insert the product.
   - The database updates the cart's `lastActivityAt` timestamp to the current time.

### Stage 2: Email Capture & Auto-Saving
1. **Checkout Access:** The shopper goes to the `/checkout` page.
2. **Inputting Email:** The shopper types their email in the checkout form field.
3. **Auto-Save Trigger (Blur Event):** When the shopper clicks outside the field (blur event), the frontend triggers `PUT /api/cart/:cartId/email`.
4. **Activity Update:** The backend validates the email structure, saves it to the cart record in the database, and updates the cart's `lastActivityAt` timestamp.

### Stage 3: Inactivity Detection & Promotion
1. **Shopper Exits:** The shopper closes the tab or remains inactive.
2. **Periodic Check:** Every 10 seconds, the Express background worker executes `checkAndProcessAbandonedCarts`.
3. **Inactivity Threshold:** The worker queries active carts with email addresses where:
   - `status` is `'active'`.
   - `lastActivityAt` is older than **2 minutes**.
4. **Promotion:** For all matching records, the database updates `status` to `'abandoned'`.

### Stage 4: Email Reminder Dispatch
1. **Deduplication Check:** The background worker checks the `EmailLog` table for the corresponding `cartId`. If a log already exists, the worker skips sending to prevent duplicate notifications.
2. **Compilation:** The worker creates a `pending` log in `EmailLog` and formats the reminder layout (customer email, product items list, unit/total prices, and recovery link).
3. **Outbound Dispatch (Simulated):** The worker outputs the formatted email to the console log, sets `EmailLog` status to `'sent'`, and updates the `sentAt` timestamp.

### Stage 5: Cart Recovery & Restoration
1. **Clicking Link:** The customer opens the recovery link: `http://localhost:5173/checkout?cartId=1`.
2. **Session Interceptor:** The React application intercepts the `cartId` parameter, dispatches it to Redux/localStorage, clears the query parameters from the URL address, and redirects the customer to `/checkout`.
3. **State Restored:** The checkout view renders all previously abandoned products, allowing the shopper to resume where they left off.

### Stage 6: Purchase & Completion
1. **Simulate Purchase:** The shopper clicks "Complete Purchase".
2. **Checkout Finalization:** The frontend triggers `POST /api/cart/:cartId/checkout`.
3. **State Update:** The backend updates the cart status to `'completed'` in the database.
4. **Local Clear:** The frontend dispatches `resetCart()`, clearing all cart parameters from Redux and `localStorage`.

### Stage 7: Admin Observation
1. **Metrics Dashboard:** The admin logs into `/admin`.
2. **Real-time Monitoring:** The admin page polls `GET /api/admin/abandoned` every 5 seconds, displaying cart values, items lists, abandonment timestamps, and email reminder logs.

---

## 3. Database State Machine

```
              ┌────────────────────────────────┐
              │                                │
              ▼                                │
      [ State: active ] ───────────────────────┼───────► [ State: completed ]
              │                                │         (Simulated Checkout)
              │ (2 mins Inactivity + Email)    │
              ▼                                │
      [ State: abandoned ] ────────────────────┘
              │
              ├───► [ EmailLog: pending ] ───► [ EmailLog: sent ]
```
