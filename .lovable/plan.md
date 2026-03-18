

## Plan: Beautify Landing Page with Product Screenshots

### Summary
Transform the basic landing page into a premium, scroll-driven marketing page with multiple sections, product screenshots, animated elements, and compelling copy. Generate screenshots of the app's key views to use as visual proof points.

### Approach
The landing page will be rebuilt as a long-scroll marketing page with these sections:

1. **Hero** — Larger, more dramatic. Gradient mesh background accent, bigger tagline, animated counters, single "Try Demo" CTA with arrow icon. Subtle floating grid pattern behind.

2. **Product Screenshot Showcase** — Full-width browser-frame mockup of the dashboard, using the product-shot skill to generate a polished screenshot. This is the "above the fold proof" that the product is real.

3. **Feature Sections (alternating layout)** — 3 sections with alternating image-left/text-right layout. Each highlights 2 features with a screenshot of the relevant app page:
   - **Dashboard + Analytics** — screenshot of dashboard
   - **Catalog + Movements** — screenshot of catalog page  
   - **Purchase Orders + Suppliers** — screenshot of PO page

4. **Feature Grid** — Keep the 6-card grid but make it more polished with hover effects, larger icons, and better spacing.

5. **Social Proof / Stats Bar** — A horizontal band with large numbers: "847+ items tracked", "99.2% accuracy", "6 modules", "Real-time sync"

6. **Final CTA** — Large section with "Ready to take control of your inventory?" heading and prominent "Try Demo" button.

7. **Footer** — Slightly enhanced with Stackwise branding.

### Technical Details

**Screenshots**: Take screenshots of 3-4 key app pages (dashboard, catalog, analytics, purchase orders) using the product-shot skill to wrap them in browser frames with gradient backgrounds. Store as CDN assets.

**File changes**:
- `src/routes/index.tsx` — Complete rewrite with all new sections
- `src/styles.css` — Add a few landing-specific keyframe animations (counter roll-up, parallax-like scroll fade-in)
- New screenshots created via product-shot skill → stored as assets

**Animations**:
- Intersection Observer-based fade-in-up for each section as user scrolls
- Staggered card entrance on the feature grid
- Gentle floating animation on the hero metric cards
- Counter animation on the stats bar numbers

**Responsive**: All sections responsive — stacked on mobile, side-by-side on desktop. Screenshots scale down gracefully.

### Execution Order
1. Navigate to key app pages and take screenshots
2. Generate product shots with browser frames
3. Upload as CDN assets
4. Rewrite `index.tsx` with all sections
5. Add scroll animation CSS/hooks
6. QA the full scroll experience

