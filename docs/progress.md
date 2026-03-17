# Progress

## Current State

- Phase: PRD-01 — Design System & App Shell
- Status: Build loop in progress

## Last Completed

- US-01-005 — Create all app route stubs — e2e PASSED

## Known Issues

(none)

## Learnings

- All CSS tokens must use oklch format
- Geist variable fonts: copy woff2 to public/fonts/, absolute URL in @font-face
- Domain types: 5 enums + 12 interfaces at 174 lines
- Layout: app.tsx layout + app.index.tsx with Navigate component (not beforeLoad redirect — causes hydration warning)
- Sidebar collapsible groups use max-h transition trick
