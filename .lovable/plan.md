

## Plan: Deposco-Style Landing Page Rebuild

Rebuild `src/routes/index.tsx` into a Deposco-inspired professional SaaS layout with sticky nav, split hero, interactive feature tabs, and streamlined sections. No pricing, testimonials, or customer logos.

### Sections

1. **Sticky Nav** -- Logo left, anchor links center (Features, Solutions, Analytics), "Try Demo →" button right. Transparent over hero, solid `bg-background` on scroll (via `useState` + scroll listener). Collapses to logo + CTA on mobile.

2. **Split Hero** -- Two-column layout. Left: badge pill, large headline ("The Inventory Platform Built to Scale"), subtext, "Try Demo →" CTA + "No signup required" note. Right: dashboard mockup in a browser frame. White/light background (no warehouse image here -- save it for later). Stacks vertically on mobile.

3. **Solution Cards** (4 cards) -- Section title "Built for modern inventory teams". Four cards with colored icon backgrounds: Real-Time Tracking, Smart Reorders, Supplier Management, Analytics & Reports. Clean grid, hover lift effect.

4. **Feature Tabs** -- Interactive tabbed section. Left: vertical tab list (Dashboard, Catalog, Analytics). Right: corresponding product screenshot in browser frame. Uses `useState` for active tab. Reuses existing mockup assets. On mobile, tabs become horizontal pills above the image.

5. **Feature Grid** (6 cards) -- Keep existing 6-card grid with icons, slightly refined styling.

6. **Capabilities Row** -- Keep existing inline capability badges.

7. **Final CTA** -- "Ready to take control?" + Try Demo button.

8. **Footer** -- Minimal branding footer (existing).

### Assets
- Generate a new hero illustration/image: clean product shot of laptop showing the Stackwise dashboard on a light gradient background (to replace the dark warehouse hero for the new split layout).
- Keep existing mockup assets for the feature tabs.

### Technical Details

**Files changed:**
- `src/routes/index.tsx` -- Full rewrite with new layout structure
- `src/styles.css` -- Add `scroll-behavior: smooth` to html if not present
- New asset: hero product shot via AI image generation + `create_asset`

**New internal components (within index.tsx):**
- `StickyNav` -- uses `useState` + `useEffect` scroll listener, renders `<nav>` with `fixed top-0`
- `SplitHero` -- flex row, text left, mockup right
- `SolutionCards` -- 4-card grid
- `FeatureTabs` -- `useState<number>` for active tab, maps tab index to mockup image
- Keep existing `RevealSection`, `CTAButton`

**Scroll anchors:** Each section gets an `id` prop. Nav links use `<a href="#features">` for smooth scroll.

