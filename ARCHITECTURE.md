# SariStore Architecture

## Approach

Standalone web application outside `northman-web-v2`. The initial release is a responsive browser app with a local-first transaction layer and a small server API for authenticated backup and synchronization.

## Technology Stack

- **Frontend:** Next.js with TypeScript.
- **API:** Fastify with TypeScript.
- **Shared contracts:** TypeScript types and schemas shared between frontend and API.
- **Authentication:** Google sign-in interface. During the demo phase, authentication is mocked behind the same application boundary; real Google OAuth credentials and token verification are deferred until deployment planning.
- **Local data:** IndexedDB for cached catalog data and pending offline transactions.
- **Development persistence:** SQLite stored at `SARISTORE_DATABASE_PATH`; this is for local development and demo data only.
- **Development process:** PM2 manages the Next.js and Fastify dev processes through `ecosystem.config.cjs`.
- **Development network:** processes bind to `SARISTORE_TAILSCALE_IP` so the app can be reached over Tailscale. The exact address remains environment-specific.

## Styling Architecture

Visual styling may use colocated plain CSS, CSS Modules, Tailwind utilities, or reusable component primitives. The current landing page uses `apps/web/app/styles.css`. The chosen approach must keep responsive behavior, theme tokens, focus states, animations, and reduced-motion handling maintainable and component-owned; React remains responsible for state and semantic structure, not visual timing.

## Maintainability and Localization

Frontend code should remain readable to a human maintainer: prefer descriptive names, focused components, typed props and state, predictable file structure, and small functions over compressed or clever code. Landing-page copy is represented by a typed locale model so English and Bisaya labels share the same keys. New visible text must be added to every supported locale, and language switching should change copy through the locale model rather than scattered conditional expressions.

The demo auth adapter must expose the same user/store identity shape expected by the eventual Google OAuth adapter. Demo accounts must be clearly marked as non-production and must not be treated as secure authentication.

## Landing and Authentication Architecture

The landing page is public and contains the product introduction, key POS benefits, responsive mobile/desktop preview, and the primary Google sign-in action. Authenticated routes are protected by a shared session boundary. The demo provider returns a test identity through the same adapter contract planned for Google OAuth, including user ID, display name, email placeholder, store membership, role, and effective permissions.

After authentication, route selection is role-aware: staff defaults to POS, managers default to Dashboard, and admins default to Administration/Settings. Route guards handle loading, expired sessions, sign-out, denied access, missing store membership, and direct deep links to protected routes.

## Experience Architecture

The client has two layout modes selected by viewport and interaction context:

- **Mobile POS:** bottom or compact navigation, large touch targets, quick-sale grid, sticky cart/payment action, and concise status feedback.
- **Desktop operations:** persistent navigation, dashboard panels, dense tables, side-by-side editing, keyboard-friendly search, and report filters.
- **Desktop counter POS:** a two-column workspace with product discovery on the left and a persistent order summary on the right. The product column supports category browsing, search, barcode entry, and quick-add buttons. The summary column owns line-item editing, subtotal/discount/total, payment selection, amount received, change, and the final sale action.

Both modes use the same domain components, permissions, API contracts, validation, and local sync engine. Presentation components may differ where mobile speed or desktop data density requires it. A user can continue a task after resizing or switching devices without creating a separate workflow or duplicate record.

## Mobile POS Interaction Contract

Mobile checkout follows `Browse products → Add items → Open cart → Review → Pay → Success`. Product discovery uses search, optional barcode scanning, category chips, and a quick-sale grid. The cart is opened through a persistent bottom action and becomes a focused full-screen view on small devices. It must preserve items and entered payment values through validation errors, reloads, and temporary offline states.

The mobile surface uses cards and focused detail screens for products, inventory, customers, and reports. Desktop-style dense tables are reserved for the desktop operations surface.

## Boundaries

- Web client: checkout, catalog, inventory, utang, expenses, reports, offline queue, and sync status.
- API: authentication, store data, idempotent sale ingestion, synchronization, exports, and audit history.
- Persistence: relational store for canonical records; browser IndexedDB for local catalog cache and pending transactions.

## Core Data

Store, owner, product, product unit, inventory movement, sale, sale item, customer, credit entry, payment, expense, cash session, and sync operation.

## Roles and Authorization

- **Staff:** checkout, view permitted sales activity, and record customer payments assigned to the sales workflow.
- **Manager:** all store operations, including catalog, pricing, inventory adjustments, expenses, utang, reconciliation, reports, and staff management within the store.
- **Admin:** platform administration, account and role management, per-user permission grants, support operations, and system configuration.

Authorization uses role defaults plus explicit per-user permission grants or revocations. The API remains authoritative; UI controls may be hidden or disabled for clarity but are never the security boundary. Every store-scoped request resolves an active store, verifies membership, evaluates effective permissions, and records sensitive authorization changes in an audit trail.

Permission examples include `sales.create`, `sales.refund`, `products.edit`, `inventory.adjust`, `expenses.manage`, `utang.manage`, `reports.view`, `users.manage`, and `permissions.manage`. The permission catalog should be explicit and versioned rather than accepting arbitrary strings.

## Data Flow

The client writes a transaction locally with a stable idempotency key, updates the local view, and queues synchronization. The API accepts each key once, validates the transaction, persists it, and returns the canonical result. Failed sync remains retryable without losing user input.

## Navigation Model

Mobile navigation exposes POS, activity, utang, and more/settings. Desktop navigation exposes Dashboard, POS, Products, Inventory, Customers/Utang, Expenses, Reports, and Settings. The exact labels may be localized, but route ownership and permission checks remain consistent.

## Settings Area

Settings is a first-class route, not a miscellaneous overflow screen. Store settings include profile and store identity, business preferences, receipt and payment preferences, backup/export, account profile, staff/user management, and session/security controls. Platform settings and permission management are separated by authorization and clearly labeled. Settings mutations use explicit save actions, preserve unsaved input on validation or network errors, prevent duplicate submissions, and show confirmation for destructive changes.

## Printer Dialog

Printing is a post-sale presentation step, not part of sale persistence. The receipt flow is `Sale success → Receipt preview → Printer dialog → Print, Skip, or Retry`. The dialog supports browser/system printer selection, receipt paper size, copy count, and test print from Settings. A cancelled dialog, unavailable printer, blocked browser print permission, or failed print must leave the sale completed and offer a retry or skip path. The UI must never submit the sale again when printing is retried.

## Desktop POS Layout Contract

The summary column remains available while browsing products and must not be displaced below the product list at supported desktop widths. At narrower widths, the layout may collapse into a product view plus an explicit cart view, provided the active cart and totals remain accessible and no items are lost.

## Deployment Impact

No v2 services, packages, routes, environment files, or production units are changed by this project. Deployment will require a separate approval and a separately documented host/domain plan.

