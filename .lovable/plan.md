

## Fix: Double Scrollbar and Scroll Jank on Landing Page

### Problem
1. **Two scrollbars**: The landing page wrapper `div` has `overflow-x-hidden` which creates a second scrollable container alongside the `html`/`body` scroll. Both `html` and the wrapper div are independently scrollable.
2. **Scroll gets stuck**: `scroll-behavior: smooth` on `html` causes the browser to animate all scroll movements, which conflicts with manual scrolling — when you scroll past an anchor point or through reveal animations, the smooth behavior fights your input and feels "hung up."

### Fix

**`src/styles.css`**
- Remove `scroll-behavior: smooth` from `html`. Smooth scrolling should only apply programmatically to anchor clicks, not globally (it makes manual scrolling feel laggy/stuck).

**`src/routes/index.tsx`**
- Remove `overflow-x-hidden` from the landing page wrapper div. If overflow hiding is needed, apply it to `html`/`body` in CSS instead so there's only one scroll container.
- Change the wrapper from `<div className="min-h-screen bg-background text-foreground overflow-x-hidden">` to `<div className="min-h-screen bg-background text-foreground">`.
- Add smooth scroll behavior only to anchor link clicks via JavaScript (`element.scrollIntoView({ behavior: 'smooth' })`) in the `StickyNav` component's anchor click handlers, instead of relying on the CSS property.

### Changes
- **`src/styles.css`**: Remove `scroll-behavior: smooth` from `html` block, add `overflow-x: hidden` to `body`.
- **`src/routes/index.tsx`**: Remove `overflow-x-hidden` from wrapper div. Update nav anchor links to use `onClick` with `scrollIntoView({ behavior: 'smooth' })` + `e.preventDefault()` for smooth anchor scrolling without the global CSS property.

