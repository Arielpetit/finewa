# Progress

## Current State

- Phase: PRD-12 — Purchase Orders Receiving & Print
- Status: 5 of 6 stories passed

## Last Completed

- US-12-005 — Printable PO summary — e2e passed

## Known Issues

(none)

## Learnings

- Spread arrays from demoStore getters in hooks to ensure useMemo detects changes
- Enter demo mode via SPA click (not page.goto) since demo state is in-memory React context
- Use semantic color tokens (stock-healthy, amber-accent, destructive) for status badges
- Scope locators to sheet via getByLabel('PO title') to avoid strict mode violations
- Demo banner role switcher uses buttons not combobox
- Use locator('main').getByText() when detail sheet heading duplicates table cell text
- Move useMemo hooks before early returns to avoid React hooks order violations
- Print views use hardcoded colors since CSS tokens won't render in print media
