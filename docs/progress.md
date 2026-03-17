# Progress

## Current State

- Phase: PRD-01 — Design System & App Shell
- Status: Build loop in progress

## Last Completed

- US-01-007 — Sidebar nav section collapse/expand — e2e PASSED

## Known Issues

(none)

## Learnings

- All CSS tokens must use oklch format
- Geist variable fonts: copy woff2 to public/fonts/
- Layout: Navigate component for redirect (not beforeLoad)
- Mobile sidebar: Sheet from left with onNavigate callback
- Collapse: use conditional render, not max-h-0 trick (Playwright can't detect max-h hidden elements)
