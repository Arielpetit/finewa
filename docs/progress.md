# Progress

## Current State

- Phase: PRD-16 — CSV Import/Export & Barcode
- Status: 6 of 8 stories passed

## Last Completed

- US-16-006 — Barcode display on item detail — console-check passed

## Known Issues

(none)

## Learnings

- supabase/migrations/ is read-only — store migration SQL in docs/migrations/ instead
- Use getByRole('link', { name: 'Catalog' }) not a[href*="catalog"] to avoid strict mode violations
- E2e tests with demo mode + multiple steps can exceed 30s timeout — use shorter waits
