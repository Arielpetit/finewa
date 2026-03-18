# Progress

## Current State

- Phase: PRD-17 — Command Palette & Keyboard Shortcuts
- Status: 1 of 5 stories passed

## Last Completed

- US-17-001 — Command palette dialog — e2e passed

## Known Issues

(none)

## Learnings

- supabase/migrations/ is read-only — store migration SQL in docs/migrations/ instead
- Use getByRole('combobox') to target cmdk input, not getByPlaceholder with special chars
- E2e tests with demo mode + multiple steps can exceed 30s timeout — use shorter waits
