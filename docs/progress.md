# Progress

## Current State

- Phase: PRD-08 — Catalog Detail & Bulk
- Status: Ready to start

## Last Completed

- PRD-07 — Product Catalog CRUD & Browse — all 8 stories passed

## Known Issues

(none)

## Learnings

- StatusBadge has no `type` prop — just `status`
- DemoStore filters by ItemStatus (active/archived), stock-level filtering done client-side
- zod schemas: avoid `.default()` with `zodResolver` — use explicit `defaultValues` in useForm instead
- ItemFormSheet: use `z.coerce.number()` for numeric inputs from HTML forms
- CatalogTable: sort state externalized so parent can reset pagination on sort change
