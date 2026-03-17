# Progress

## Current State

- Phase: PRD-09 — Stock Movements
- Status: 1 of 8 stories passed

## Last Completed

- US-09-001 — Movements log table — e2e passed

## Known Issues

(none)

## Learnings

- Toaster component must be mounted in __root.tsx RootComponent for toast.success() to render
- TanStack Router validateSearch for type-safe URL search params drives sheet open/close state
- Sidebar has "View All" link to movements too — use getByRole('link', { name: 'Movements' }) for nav
