# Progress

## Current State

- Phase: PRD-12 — Purchase Orders Receiving & Print
- Status: 2 of 6 stories passed

## Last Completed

- US-12-002 — Receive confirmation and stock movement creation — e2e passed

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
- Demo banner role switcher uses buttons not combobox
- Route guard must include requestor for PO page since PRD says all authenticated users can view
- Use exact text matching or getByRole('columnheader') to avoid strict mode violations
- Use locator('main').getByText() when detail sheet heading duplicates table cell text
