# Progress

## Current State

- Phase: PRD-11 — Purchase Orders CRUD
- Status: 7 of 10 stories passed

## Last Completed

- US-11-007 — PO detail sheet — e2e passed

## Known Issues

(none)

## Learnings

- Spread arrays from demoStore getters in hooks to ensure useMemo detects changes
- Enter demo mode via SPA click (not page.goto) since demo state is in-memory React context
- Use `[role="alertdialog"] button` locator to target AlertDialog action buttons
- Use validateSearch for URL search params in TanStack Router routes
- Use semantic color tokens (stock-healthy, amber-accent, destructive) for status badges
- Also spread PO arrays in usePurchaseOrders — same pattern as suppliers
- Use ariaSnapshot() to understand component structure for Playwright selectors
- Scope locators to sheet via getByLabel('PO title') to avoid strict mode violations with filters
