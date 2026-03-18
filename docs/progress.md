# Progress

## Current State

- Phase: PRD-16 — CSV Import/Export & Barcode — **COMPLETE** 🎉
- Status: 8 of 8 stories passed

## Last Completed

- US-16-008 — Quick-entry barcode mode — e2e passed

## Known Issues

(none)

## Learnings

- supabase/migrations/ is read-only — store migration SQL in docs/migrations/ instead
- Use getByRole('link', { name: 'Catalog' }) not a[href*="catalog"] to avoid strict mode violations
- E2e tests with demo mode + multiple steps can exceed 30s timeout — use shorter waits
