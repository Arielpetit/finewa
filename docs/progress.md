# Progress

## Current State

- Phase: PRD-15 — Database Schema & RLS Policies
- Status: 1 of 12 stories passed

## Last Completed

- US-15-001 — Create profiles and user_roles tables migration — database review passed

## Known Issues

(none)

## Learnings

- Avoid nested <button> elements — use <div role="button"> or <span role="button"> for inner clickables
- Use role="combobox" locator for Radix Select triggers in Playwright
- Playwright page.goto() resets demo mode (localStorage) — use SPA navigation via sidebar links
- supabase/migrations/ is read-only — store migration SQL in docs/migrations/ instead
