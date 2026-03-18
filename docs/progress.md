# Progress

## Current State

- Phase: PRD-15 — Database Schema
- Status: Starting

## Last Completed

- PRD-14 — Locations & Warehouses — ALL 7 stories passed ✅

## Known Issues

(none)

## Learnings

- Avoid nested <button> elements — use <div role="button"> or <span role="button"> for inner clickables
- Use role="combobox" locator for Radix Select triggers in Playwright
- Zod .default() causes type mismatch with zodResolver — use plain types with explicit defaults in useForm
- DemoBanner has role switcher buttons for testing
- Playwright page.goto() resets demo mode (localStorage) — use SPA navigation via sidebar links instead
- Nested treeitems cause locator ambiguity — use > div[role="button"] to target direct child row
