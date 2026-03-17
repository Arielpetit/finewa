# Progress

## Current State

- Phase: PRD-14 — Locations & Warehouses
- Status: 3 of 7 stories passed

## Last Completed

- US-14-003 — Location create/edit form — e2e passed

## Known Issues

(none)

## Learnings

- Avoid nested <button> elements — use <div role="button"> or <span role="button"> for inner clickables
- Use role="combobox" locator for Radix Select triggers in Playwright
- Zod .default() causes type mismatch with zodResolver — use plain types with explicit defaults in useForm
- DemoBanner has role switcher buttons for testing
