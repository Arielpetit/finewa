# Lisa Loops — Lessons Learned

This file is read before every test run and updated after. It accumulates practical knowledge about testing this specific app. Lisa never makes the same mistake twice.

## App-Specific Quirks

- The app uses demo mode (no real auth). All `/app/*` routes require demo mode to be active — without it, users are redirected to `/`.
- Demo mode is entered by clicking "Try Demo" on the landing page, which calls `enterDemoMode()` and navigates to `/app/dashboard`.
- An onboarding tour auto-starts on first demo dashboard visit (500ms delay). Tests should account for this overlay and dismiss it when testing other dashboard features.
- Role switching is done via the demo banner (Admin/Manager/Requestor buttons), not through a settings page.
- The sidebar is only visible on `md:` breakpoints and above (≥768px). On mobile, a bottom nav + "More" sheet is used instead.
- Permissions gate both UI visibility (PermissionGate component) and route access (useEffect redirects in Settings/Analytics).

## Timing & Loading

- Onboarding tour appears after a 500ms setTimeout on first demo visit.
- Page transitions use framer-motion AnimatePresence — slight animation delays between route changes.
- Demo data is generated synchronously in-memory (no async loading), so pages should render quickly.

## Selectors & DOM Notes

- Dashboard metric cards are wrapped in `[data-tour="metrics"]`.
- The needs-attention section uses `[data-tour="needs-attention"]`.
- Demo banner contains role switcher buttons with text "Admin", "Manager", "Requestor".
- Demo banner dismiss button has `aria-label="Dismiss demo banner"`.
- Catalog uses a standard `<table>` with `<thead>` and `<tbody>` elements.
- The onboarding tour uses an overlay component — look for "Welcome to Stackwise!" text.
- Command palette is triggered by `Ctrl+K` / `Meta+K` keyboard shortcut.
- User dropdown is in the Header component — contains "Exit Demo" option.

## Common Failure Patterns

None yet — will be populated during test execution.

## Fix Patterns

When a bug is found and fixed, document the pattern here so similar bugs can be fixed faster.
