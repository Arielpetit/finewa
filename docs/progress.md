# Progress

## Current State

- Phase: PRD-16 — CSV Import/Export & Barcode
- Status: 2 of 8 stories passed

## Last Completed

- US-16-002 — CSV export for suppliers and movements — e2e passed

## Known Issues

(none)

## Learnings

- supabase/migrations/ is read-only — store migration SQL in docs/migrations/ instead
- Use getByRole('link', { name: 'Catalog' }) not a[href*="catalog"] to avoid strict mode violations
