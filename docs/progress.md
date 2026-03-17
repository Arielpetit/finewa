# Progress

## Current State

- Phase: PRD-09 — Stock Movements
- Status: 2 of 8 stories passed

## Last Completed

- US-09-002 — Movements filter bar — e2e passed

## Known Issues

(none)

## Learnings

- Toaster component must be mounted in __root.tsx RootComponent for toast.success() to render
- TanStack Router validateSearch for type-safe URL search params drives sheet open/close state
- Sidebar has "View All" link to movements too — use getByRole('link', { name: 'Movements' }) for nav
- Use { exact: true } in getByText when text appears in multiple elements
