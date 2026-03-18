# Progress

## Current State

- Phase: PRD-16 — CSV Import/Export & Barcode
- Status: 3 of 8 stories passed

## Last Completed

- US-16-003 — CSV import file upload and column mapping — e2e passed

## Known Issues

(none)

## Learnings

- supabase/migrations/ is read-only — store migration SQL in docs/migrations/ instead
- Use getByRole('link', { name: 'Catalog' }) not a[href*="catalog"] to avoid strict mode violations
