# Progress

## Current State

- Phase: PRD-01 — Design System & App Shell
- Status: Build loop in progress

## Last Completed

- US-01-004 — Create app layout route with sidebar and header — console-check PASSED

## Known Issues

(none)

## Learnings

- All CSS tokens must use oklch format
- Geist variable fonts: copy woff2 to public/fonts/, absolute URL in @font-face
- Domain types: 5 enums + 12 interfaces at 174 lines
- Layout: app.tsx layout + app.index.tsx redirect pattern for TanStack Router
- Sidebar collapsible groups use max-h transition trick
