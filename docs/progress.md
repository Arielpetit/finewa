# Progress

## Current State

- Phase: PRD-07 — Catalog CRUD
- Status: Ready to start

## Last Completed

- PRD-06 — Dashboard — all 7 stories passed

## Known Issues

(none)

## Learnings

- Seed data: split across files, barrel re-export
- DemoStore: version counter for change detection, movements auto-update item stock
- DemoContext exposes bumpVersion() so mutation hooks can trigger re-renders
- Data hooks use useMemo keyed on context version for reactivity
- tw-animate-css provides animate-fade-in with CSS animation support
- TanStack Start route-level head() config for per-page SEO meta tags
- Route guard: navigate away before clearing auth/demo state to avoid redirect race
- Auth stubs return error strings so forms display meaningful messages pre-Cloud
- RBAC: permissions derived from role in centralized roles.ts, sidebar filters by permKey
- StatusBadge has no `type` prop — just `status` with union of stock + item statuses
- Dashboard search uses click-outside + escape to close dropdown
