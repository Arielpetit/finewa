# Progress

## Current State

- Phase: PRD-02 — Demo Mode Infrastructure
- Status: Build loop in progress

## Last Completed

- US-02-002 — Create demo store with CRUD operations — console-check PASSED

## Known Issues

(none)

## Learnings

- Seed data: split across files, barrel re-export
- DemoStore: version counter for change detection, movements auto-update item stock
- Each new DemoStore() gets fresh seed data (constructor calls generateSeedData)
