# Progress

## Current State

- Phase: PRD-08 — Catalog Detail & Bulk
- Status: 6 of 8 stories passed

## Last Completed

- US-08-006 — Bulk action floating bar — e2e passed

## Known Issues

(none)

## Learnings

- StatusBadge has no `type` prop — just `status`
- DemoStore filters by ItemStatus (active/archived), stock-level filtering done client-side
- zod schemas: avoid `.default()` with `zodResolver` — use explicit `defaultValues` in useForm instead
- ItemFormSheet: use `z.coerce.number()` for numeric inputs from HTML forms
- CatalogTable: sort state externalized so parent can reset pagination on sort change
- Toaster component must be mounted in __root.tsx RootComponent for toast.success() to render
