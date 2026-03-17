# Progress

## Current State

- Phase: PRD-05 — RBAC
- Status: Ready to start

## Last Completed

- PRD-04 — Authentication & User Profiles — all 8 stories passed

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
- Route guard in layout: navigate away before clearing auth/demo state to avoid redirect race
- Auth stubs return error strings so forms display meaningful messages pre-Cloud
