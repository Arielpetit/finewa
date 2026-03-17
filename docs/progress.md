# Progress

## Current State

- Phase: PRD-10 — Suppliers
- Status: Starting

## Last Completed

- US-09-008 — Movement detail expansion row — e2e passed
- PRD-09 complete (8/8 stories passed)

## Known Issues

(none)

## Learnings

- Toaster component must be mounted in __root.tsx RootComponent for toast.success() to render
- TanStack Router validateSearch makes `search` required on all typed Link components
- Use nth() for Radix comboboxes in Playwright when multiple exist in same dialog
- Use data-testid for stats containers to avoid ambiguous locators
- Use Fragment with key (not <>) when rendering multiple sibling elements in .map()
