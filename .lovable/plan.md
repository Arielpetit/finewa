

## Plan: Polish Internal App UI to Match Premium Dashboard Mockup

The current internal app (`/app/*`) is functional but visually plain — flat white cards with only border styling, a basic sidebar, and minimal visual hierarchy. The goal is to elevate it to match the polished SaaS aesthetic shown in the mockup image.

### Changes

**1. Dark sidebar (`src/components/layout/Sidebar.tsx` + `src/styles.css`)**
- Change sidebar background to a dark teal-charcoal (`oklch(0.18 0.03 160)`) with light text
- Update `--sidebar`, `--sidebar-foreground`, `--sidebar-accent` tokens in `:root` to create a contrasting dark sidebar even in light mode
- Active nav item gets a teal highlight with white text instead of the current subtle tint
- Add a subtle separator line between groups

**2. Elevated cards with shadow (`src/styles.css`)**
- Add `shadow-sm` to card surfaces globally via a base layer style on `.bg-card` borders, or update individual card components
- Adjust border from hard `1px` to a softer, lighter border for the elevated look

**3. Enhanced MetricCard (`src/components/dashboard/MetricCard.tsx`)**
- Add a subtle tinted background fill per accent color (e.g., light green tint for "healthy", light amber for "warning")
- Add an icon per metric type (Package for Total SKUs, CheckCircle for In Stock, AlertTriangle for Low Stock, XCircle for Out of Stock)
- Make the accent left-border thicker (4px) and more prominent
- Accept an optional `icon` prop from the dashboard page

**4. Dashboard layout refinements (`src/routes/app.dashboard.tsx`)**
- Pass icons to MetricCard instances
- Remove the inline DashboardSearch (it duplicates the header CMD+K search)
- Tighten heading area — smaller subtitle, less vertical gap

**5. Better card headers (`NeedsAttention.tsx`, `RecentActivity.tsx`)**
- Use slightly bolder section headings (text-base instead of text-sm)
- Add subtle card shadows to match the elevated style

**6. Header refinements (`src/components/layout/Header.tsx`)**
- Add a page title/breadcrumb area on the left (after the mobile menu button, before search) showing the current section name
- Slightly increase header height from `h-14` to `h-16` for more breathing room

### Files to modify
- `src/styles.css` — sidebar token overrides, card shadow base style
- `src/components/layout/Sidebar.tsx` — dark bg styling, refined spacing
- `src/components/dashboard/MetricCard.tsx` — icon prop, tinted backgrounds
- `src/routes/app.dashboard.tsx` — pass icons, remove DashboardSearch
- `src/components/dashboard/NeedsAttention.tsx` — shadow, heading size
- `src/components/dashboard/RecentActivity.tsx` — shadow, heading size
- `src/components/layout/Header.tsx` — height bump, breadcrumb area

