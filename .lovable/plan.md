

## Plan: Modernize Cards and Containers UI

The current UI uses tight `rounded-md` (6px) radii, flat `border-border` outlines, and minimal shadows. To achieve a more modern, premium feel we'll increase border radii globally, soften borders, add layered shadows, and refine spacing across all card-like surfaces.

### Changes

**1. Global radius bump (`src/styles.css`)**
- Change `--radius: 0.375rem` (6px) to `--radius: 0.625rem` (10px) — this cascades through `--radius-sm/md/lg/xl` automatically
- Soften `--border` to a lighter value: `oklch(0.94 0.005 80)` for less harsh lines

**2. Card component (`src/components/ui/card.tsx`)**
- Update base class from `rounded-xl border shadow` to `rounded-2xl border border-border/60 shadow-sm` — rounder corners, softer border, subtle shadow
- Add a `backdrop-blur-sm` or just cleaner spacing for a glassmorphism-lite feel (optional, keep it subtle)

**3. MetricCard (`src/components/dashboard/MetricCard.tsx`)**
- Change `rounded-md` to `rounded-2xl` for consistency
- Update shadow from `shadow-sm` to `shadow-md shadow-black/[0.04]` for a soft elevated look
- Soften border to `border-border/50`

**4. Dashboard containers (`NeedsAttention.tsx`, `RecentActivity.tsx`)**
- Update `rounded-md` to `rounded-2xl`
- Update shadow to `shadow-md shadow-black/[0.04]`
- Soften border to `border-border/50`

**5. POSummaryStats pills (`src/components/purchase-orders/POSummaryStats.tsx`)**
- Update `rounded-md` to `rounded-xl` for the stat pills

**6. Button radius (`src/components/ui/button.tsx`)**
- Update base `rounded-md` to `rounded-lg` for slightly rounder buttons
- Update `size.sm` and `size.lg` inner `rounded-md` to `rounded-lg`

**7. Input/Badge/Badge radius refinements**
- `badge.tsx`: `rounded-md` → `rounded-lg`
- `input.tsx`, `textarea.tsx`: these inherit from `--radius` so they auto-update

### Files to modify
- `src/styles.css` — radius token, border color
- `src/components/ui/card.tsx` — rounder, softer
- `src/components/ui/button.tsx` — rounder buttons
- `src/components/ui/badge.tsx` — rounder badges
- `src/components/dashboard/MetricCard.tsx` — rounded-2xl, softer shadow
- `src/components/dashboard/NeedsAttention.tsx` — rounded-2xl, softer shadow
- `src/components/dashboard/RecentActivity.tsx` — rounded-2xl, softer shadow
- `src/components/purchase-orders/POSummaryStats.tsx` — rounder pills

