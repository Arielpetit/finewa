

## Plan: Rework Landing Page with SaaS-Focused Copy and Hero Background Image

### Problems to Fix
1. **Stats section** shows instance-specific metrics ("847+ Items Tracked", "99.2% Accuracy Rate") — should show SaaS value props instead
2. **Hero background** is essentially empty (just subtle color blobs) — needs a compelling warehouse/inventory background image with a dark overlay for text contrast

### Changes

**1. Generate hero background image**
- Use AI image generation to create a wide, cinematic warehouse/inventory scene (shelves with boxes, warm lighting, slightly blurred/bokeh feel)
- Upload as a CDN asset
- Apply as a full-bleed background on the hero section with a dark gradient overlay so white text pops

**2. Rework stats to SaaS value propositions**
Replace the current instance metrics with product-level selling points:
- "10x Faster" / "Stock Counts" — speed up inventory ops
- "Zero" / "Stockouts" — never run out again  
- "100%" / "Visibility" — full supply chain transparency
- "6" / "Modules" — keep this one, it's product-level

**3. Update hero section styling**
- Add the background image with `object-cover` and a gradient overlay (dark bottom fade)
- Make text white/light against the dark overlay
- Keep the CTA button prominent with the existing primary color

**4. Update stats bar section** (lower on page)
- Same SaaS-focused stats replace the duplicated instance metrics

**5. Files changed**
- `src/routes/index.tsx` — Update stats data, hero background styling, text colors on hero
- `src/styles.css` — No changes needed
- New asset: hero background image generated and uploaded via `create_asset`

