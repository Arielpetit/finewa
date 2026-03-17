# Progress

## Current State

- Phase: PRD-10 — Suppliers
- Status: 6 of 7 stories passed

## Last Completed

- US-10-006 — Delete/archive supplier with safety check — e2e passed

## Known Issues

(none)

## Learnings

- Spread arrays from demoStore getters in hooks to ensure useMemo detects changes
- Use getByRole('heading') to avoid strict mode violations when button text matches heading text
- Enter demo mode via SPA click (not page.goto) since demo state is in-memory React context
- Use `[role="alertdialog"] button` locator to target AlertDialog action buttons specifically
