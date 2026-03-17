# Progress

## Current State

- Phase: PRD-10 — Suppliers
- Status: 2 of 7 stories passed

## Last Completed

- US-10-002 — Supplier form sheet — e2e passed

## Known Issues

(none)

## Learnings

- Toaster component must be mounted in __root.tsx RootComponent for toast.success() to render
- Spread arrays from demoStore getters in hooks (e.g. `[...demoStore.getSuppliers()]`) to ensure useMemo detects changes
- Use getByRole('heading') to avoid strict mode violations when button text matches heading text
- Enter demo mode via SPA click (not page.goto) since demo state is in-memory React context
