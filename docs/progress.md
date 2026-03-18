# Progress

## Current State

- Phase: PRD-19 — AI Smart Reorder & Demand Forecasting
- Status: 7 of 8 stories passed (US-19-008 deferred — requires OpenAI API key)

## Last Completed

- US-19-007 — Insights page composition — passed

## Known Issues

- US-19-008: AI edge function deferred — requires OPENAI_API_KEY integration

## Learnings

- Nested Radix sheets/dialogs cause issues — close parent first with setTimeout before opening child
- E2e tests with demo mode need >16s warmup, exceeds 30s timeout easily
