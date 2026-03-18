

## Fix: Onboarding Tour Tooltip Hidden When Highlighting Sidebar

### Problem
When the tour highlights the sidebar (step 2), the tooltip positions itself **below** the target element (`top: pos.top + pos.height + 12`). Since the sidebar is full-height (~100vh), the tooltip renders far below the viewport — completely invisible. The user only sees the green ring around the greyed-out sidebar with no tooltip.

### Solution
Update `OnboardingTour.tsx` tooltip positioning logic to be viewport-aware:

1. **Smart positioning**: When the tooltip would overflow below the viewport, position it to the **right** of the target element instead (or centered if it's a tall/wide element).
2. **Clamp vertical position**: Ensure `top` never exceeds `window.innerHeight - tooltipHeight - 16`.
3. **For full-height elements like sidebar**: Detect when target height > 50% of viewport and position tooltip at `top: pos.top + 60, left: pos.left + pos.width + 16` (to the right of the element, near the top).

### Changes

**`src/components/onboarding/OnboardingTour.tsx`**
- Update tooltip style calculation: if target element is taller than half the viewport, place tooltip to the right of the element (vertically centered near top). Otherwise keep current below-target logic but clamp to viewport bounds.
- Add the highlighted element's z-index boost so it appears above the backdrop (currently the sidebar stays behind the dark overlay — needs `z-[10000]` on the highlight or the element itself needs to be visible through the backdrop).

**Fix backdrop blocking the highlighted element:**
- Currently the backdrop (`bg-black/50`) covers everything including the sidebar. The highlight ring is `pointer-events-none` and same z-index as backdrop, so the sidebar appears greyed out.
- Change highlight cutout to have `z-[10001]` and add a `bg-card` or transparent background so the highlighted element shows through. Alternatively, use a CSS clip-path or box-shadow approach for the backdrop to create a true cutout around the target.
- Simplest fix: give the highlight ring `z-[10001]` and set `background: transparent` with the element content cloned or just ensure the element itself gets `z-[10002] relative` via a temporary class.

### Implementation Detail
The cleanest approach:
1. When a step has a target, temporarily add `relative z-[10002]` to the target DOM element (via `el.classList.add(...)` in the useEffect, cleaned up on unmount/step change).
2. Position tooltip smartly based on available space (right-of for tall elements, below for short ones, clamped to viewport).

