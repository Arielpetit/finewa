# Progress

## Current State

- Phase: PRD-10 — Suppliers
- Status: 1 of 7 stories passed

## Last Completed

- US-10-001 — Suppliers list table — e2e passed

## Known Issues

(none)

## Learnings

- Toaster component must be mounted in __root.tsx RootComponent for toast.success() to render
- TanStack Router validateSearch makes `search` required on all typed Link components
- Use nth() for Radix comboboxes in Playwright when multiple exist in same dialog
- Use data-testid for stats containers to avoid ambiguous locators
- Use Fragment with key (not <>) when rendering multiple sibling elements in .map()
- Use { exact: true } in getByText when substring matches multiple elements
