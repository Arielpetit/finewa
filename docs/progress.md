# Progress

## Current State

- Phase: PRD-14 — Locations & Warehouses
- Status: 4 of 7 stories passed

## Last Completed

- US-14-004 — Location inventory summary — e2e passed

## Known Issues

(none)

## Learnings

- Avoid nested <button> elements — use <div role="button"> or <span role="button"> for inner clickables
- Use role="combobox" locator for Radix Select triggers in Playwright
- Zod .default() causes type mismatch with zodResolver — use plain types with explicit defaults in useForm
- DemoBanner has role switcher buttons for testing
- Playwright page.goto() resets demo mode (localStorage) — use SPA navigation via sidebar links instead
