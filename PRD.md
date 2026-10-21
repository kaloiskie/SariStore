# SariStore Product Requirements

## Summary

SariStore is a mobile-first web POS for a sole-proprietorship sari-sari store. It helps the owner record sales, manage inventory, track expenses, and manage customer credit (utang) with minimal training.

## Users

- **Staff:** records sales, views the active cart, and handles assigned customer payments. Staff cannot change prices, edit inventory history, manage users, or view restricted financial settings.
- **Manager:** manages products, prices, inventory, expenses, customer credit, cash reconciliation, and store reports. A sole proprietor will normally use this role.
- **Admin:** manages platform-level configuration, accounts, role assignment, per-user permission grants, support access, and system health. Admin is not a normal store cashier and does not replace the manager role.

All records are scoped to a store. A user may belong to one or more stores in a future multi-store phase, but the MVP should keep the active store explicit.

Admins can grant or remove specific permissions for an individual user in addition to that user’s base role. Permission changes must show the affected user, permission, actor, reason or note, timestamp, and resulting access.

## Two-Surface Product Design

SariStore is one web application with two deliberate responsive surfaces:

- **Mobile POS surface:** touch-first checkout for a phone used beside the store counter. It prioritizes large product actions, cart visibility, quick payment, offline status, and minimal navigation.
- **Desktop operations surface:** information-dense management workspace for a larger screen. It prioritizes inventory tables, product editing, customer ledgers, expenses, reports, filters, and exports.

The desktop POS checkout specifically follows a fast-food counter pattern: a broad left product area for categories, search, and item buttons; and a fixed right order-summary area for selected items, quantities, totals, payment, and completion. The summary remains visible while products are browsed.

The surfaces share accounts, data, permissions, and domain rules. They are not separate products or separate codebases. The layout, navigation, density, and interaction patterns may change at responsive breakpoints while preserving the same task outcomes.

## Mobile POS Layout

The mobile POS is a one-handed quick-sale surface rather than a compressed desktop layout:

- Top bar with store identity, offline/sync status, and menu access.
- Large search field with optional barcode scanning.
- Horizontally scrollable category chips.
- Product grid with large touch-friendly buttons, price, and frequently sold items prioritized.
- Fixed cart action showing item count and current total.
- Full-screen cart/payment view on small phones with quantity controls, remove actions, discount, total, payment type, amount received, change, and completion.

The cart remains available from every POS screen and survives reloads or temporary connectivity loss. Dense inventory tables are not used on mobile; management data uses cards, summaries, and focused detail screens.

## Color Direction

SariStore uses a warm green and cream light theme with a deep green-black dark theme. Green is reserved for primary actions, sales, and success; mango yellow is an accent for attention and highlights. Error, warning, and status states also use text or icons so color is never the only signal.

## Primary Flows

### Landing and authentication

1. Visitor opens the public landing page and sees the product value, mobile/desktop POS concept, and a clear sign-in action.
2. Visitor selects **Continue with Google**.
3. Demo authentication presents a clearly labeled demo account chooser or controlled sign-in state; no real Google credentials are required yet.
4. After sign-in, the app resolves the user’s store, role, and effective permissions.
5. Staff lands on POS, managers land on the dashboard, and admins land on administration/settings. If no store is assigned, the user sees a safe setup or access-pending state.
6. User can sign out and return to the landing page without stale private data remaining visible.

### Mobile checkout

1. Owner opens the POS and sees frequently sold items or searches by name/barcode.
2. Owner adds one or many items, adjusts quantities, and reviews the cart.
3. Owner chooses cash, credit/utang, or another configured payment method.
4. App validates stock, calculates total and change, and prevents duplicate submission.
5. App records the sale locally or remotely, updates stock, and shows receipt/sync status.

### Desktop counter checkout

1. Cashier selects a category or searches from the left product area.
2. Cashier clicks an item to add it to the right-side order summary.
3. Cashier adjusts quantity or removes items without losing the product browsing context.
4. Cashier selects payment and completes the order from the right-side action area.
5. The completed order clears the active cart and leaves a visible success/receipt state.

### Desktop store management

1. Owner opens the dashboard and reviews sales, cash, low stock, and outstanding utang.
2. Owner manages products, prices, units, suppliers, and inventory movements.
3. Owner records expenses, customer payments, and cash reconciliation.
4. Owner filters reports by date and exports a backup when needed.

### Settings

Settings is a dedicated area available from desktop navigation and mobile menu. It includes store profile, business preferences, receipt preferences, payment methods, data backup/export, account profile, staff and user management, and security/session controls. Permission management is visible only to admins and authorized managers, with admin-only platform settings clearly separated from store settings.

Receipt settings include a printer dialog where an authorized user can choose the browser/system printer, configure receipt paper size and copies, preview the receipt, and run a test print. Printing is optional: a completed sale must remain successful even when a printer is unavailable or cancelled.


## MVP Scope

- Product catalog with units, cost, selling price, stock, and low-stock threshold.
- Fast checkout with search, quick-add products, quantity changes, discounts, and cash change calculation.
- Sales history and daily sales summary.
- Inventory adjustments for restocking, spoilage, damage, and corrections.
- Expense records and end-of-day cash reconciliation.
- Customer list and utang ledger with payments and balances.
- Offline-capable transaction capture with safe sync when online.
- CSV backup/export.
- Demo Google sign-in entry point for owner access, with no production OAuth credentials required during prototyping.

## Non-goals

- Multi-branch operations, payroll, full accounting, e-commerce, delivery, and BIR-certified receipts in the MVP.
- Automatic supplier ordering or payment processing in the MVP.

## Acceptance Criteria

- A sale can be completed in under one minute on a phone.
- The owner can see sales, expenses, cash, inventory changes, and outstanding utang for a selected day.
- Duplicate taps do not create duplicate sales.
- The app remains usable during temporary internet loss and clearly reports sync state.
- Empty, loading, error, retry, disabled, and large-inventory states are handled.
- Layout remains usable at 320px, 375px, 768px, 1024px, and 1440px widths.
- Settings has clear sections, role-appropriate access, unsaved-change protection, success/error feedback, and a safe recovery path for destructive actions.
- After a completed sale, the user can open a receipt preview and printer dialog, print, skip printing, or retry without creating another sale.

