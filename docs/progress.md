# Progress

## Current State

- Phase: PRD-08 — Catalog Detail & Bulk — COMPLETE (8/8 stories)
- Moving to PRD-09

## Last Completed

- US-08-008 — Wire detail sheet into catalog page — e2e passed

## Known Issues

(none)

## Learnings

- StatusBadge has no `type` prop — just `status`
- DemoStore filters by ItemStatus (active/archived), stock-level filtering done client-side
- zod schemas: avoid `.default()` with `zodResolver` — use explicit `defaultValues` in useForm instead
- CatalogTable: sort state externalized so parent can reset pagination on sort change
- Toaster component must be mounted in __root.tsx RootComponent for toast.success() to render
- TanStack Router validateSearch for type-safe URL search params drives sheet open/close state
