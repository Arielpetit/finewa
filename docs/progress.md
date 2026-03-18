# Progress

## Current State

- Phase: PRD-16 — CSV Import/Export & Barcode
- Status: 4 of 8 stories passed

## Last Completed

- US-16-004 — CSV import validation and preview — e2e passed

## Known Issues

(none)

## Learnings

- supabase/migrations/ is read-only — store migration SQL in docs/migrations/ instead
- Use getByRole('link', { name: 'Catalog' }) not a[href*="catalog"] to avoid strict mode violations
