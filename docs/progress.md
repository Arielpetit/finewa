# Progress

## Current State

- Phase: PRD-02 — Demo Mode Infrastructure
- Status: Build loop in progress

## Last Completed

- US-02-007 — Mutation hooks for demo store — verified

## Known Issues

(none)

## Learnings

- Seed data: split across files, barrel re-export
- DemoStore: version counter for change detection, movements auto-update item stock
- Each new DemoStore() gets fresh seed data (constructor calls generateSeedData)
- DemoContext exposes bumpVersion() so mutation hooks can trigger re-renders
- Data hooks use useMemo keyed on context version for reactivity
