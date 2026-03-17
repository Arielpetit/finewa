# Progress

## Current State

- Phase: PRD-04 — Authentication
- Status: Ready to start

## Last Completed

- PRD-03 — Landing Page — all 4 stories passed

## Known Issues

(none)

## Learnings

- Seed data: split across files, barrel re-export
- DemoStore: version counter for change detection, movements auto-update item stock
- Each new DemoStore() gets fresh seed data (constructor calls generateSeedData)
- DemoContext exposes bumpVersion() so mutation hooks can trigger re-renders
- Data hooks use useMemo keyed on context version for reactivity
- tw-animate-css provides animate-fade-in with CSS animation support
- TanStack Start route-level head() config for per-page SEO meta tags
