# SariStore Agent Instructions

SariStore is a standalone project outside `northman-web-v2`. Do not modify or deploy v2 services while working here unless the user explicitly expands the scope.

## Working Rules

- Keep the app focused on a sole-proprietorship sari-sari store.
- Prefer simple workflows and Filipino retail terminology where it improves clarity.
- Styling may use plain CSS, CSS Modules, Tailwind utilities, or reusable component-library primitives. Keep styles maintainable and component-owned; avoid ad hoc inline style objects and JavaScript timers for visual behavior. Use CSS or the selected styling system for animations, transitions, responsive layouts, and visual effects.
- Include purposeful, restrained CSS animation or transition feedback in new interactive surfaces. Every animation must support `prefers-reduced-motion: reduce`, avoid infinite motion unless it communicates active progress, and keep routine interactions under 300ms.
- Keep code human-readable and maintainable: use descriptive names, small focused components/functions, typed data structures, consistent formatting, and comments only where they explain a non-obvious decision.
- Keep translations in typed copy dictionaries or dedicated locale modules. Reuse translation keys instead of duplicating conditional language logic throughout JSX, and ensure every visible label has a translation entry.
- Use semantic, keyboard-accessible UI with visible focus states and 44px minimum touch targets.
- Put visual effects and animations in plain, colocated CSS files; support reduced motion.
- Verify responsive widths at 320px, 375px, 768px, 1024px, and 1440px.
- Test loading, empty, error, retry, disabled, duplicate-action, offline, and sync-conflict cases.
- Do not store secrets in the repository.

## Documentation

Keep `PRD.md`, `ARCHITECTURE.md`, and `ARCHITECTURE_ESSENTIALS.md` current as scope or design changes.

## Release

No deployment target is defined yet. Do not deploy, create DNS, create systemd units, or modify shared infrastructure without explicit user approval and a written release plan.

## Development Runtime

Development uses SQLite, PM2, and the Tailscale address in `SARISTORE_TAILSCALE_IP`. Copy `.env.example` to `.env`, set the host address for the current machine, install dependencies with `pnpm install --ignore-workspace`, and run PM2 with `ecosystem.config.cjs`. Do not use these development settings as a production deployment plan.

