# Progress

## Current State

- Phase: PRD-11 — Purchase Orders CRUD
- Status: 0 of ? stories passed

## Last Completed

- US-10-007 — Suppliers page composition — e2e passed (PRD-10 complete!)

## Known Issues

(none)

## Learnings

- Spread arrays from demoStore getters in hooks to ensure useMemo detects changes
- Enter demo mode via SPA click (not page.goto) since demo state is in-memory React context
- Use `[role="alertdialog"] button` locator to target AlertDialog action buttons
- Use validateSearch for URL search params in TanStack Router routes
