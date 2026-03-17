# Progress

## Current State

- Phase: PRD-11 — Purchase Orders CRUD
- Status: 2 of 10 stories passed

## Last Completed

- US-11-002 — Purchase orders filters — e2e passed

## Known Issues

(none)

## Learnings

- Spread arrays from demoStore getters in hooks to ensure useMemo detects changes
- Enter demo mode via SPA click (not page.goto) since demo state is in-memory React context
- Use `[role="alertdialog"] button` locator to target AlertDialog action buttons
- Use validateSearch for URL search params in TanStack Router routes
- Use semantic color tokens (stock-healthy, amber-accent, destructive) for status badges
- Extract filter types to separate file (po-filter-types.ts) for reuse across components
