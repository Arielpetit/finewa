import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useDemo } from "@/hooks/useDemo";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
  Package,
  BarChart3,
  Bell,
  Truck,
  ScanLine,
  TrendingUp,
  Users,
  ArrowRight,
  CheckCircle2,
  Zap,
  Shield,
  Globe,
} from "lucide-react";
import mockupDashboard from "@/assets/mockup-dashboard.png.asset.json";
import mockupCatalog from "@/assets/mockup-catalog.png.asset.json";
import mockupAnalytics from "@/assets/mockup-analytics.png.asset.json";

export const Route = createFileRoute("/")({
  component: LandingPage,
  head: () => ({
    meta: [
      { title: "Stackwise — Inventory Command Center" },
      {
        name: "description",
        content:
          "Real-time inventory management for businesses of any size. Track stock, manage suppliers, automate reorders, and keep your team aligned.",
      },
      { property: "og:title", content: "Stackwise — Inventory Command Center" },
      {
        property: "og:description",
        content:
          "Real-time inventory management for businesses of any size. Track stock, manage suppliers, automate reorders, and keep your team aligned.",
      },
    ],
  }),
});

/* ─── Data ──────────────────────────────────────────── */
const stats = [
  { value: "847+", label: "Items Tracked" },
  { value: "99.2%", label: "Accuracy Rate" },
  { value: "6", label: "Modules" },
  { value: "<1s", label: "Real-time Sync" },
];

const features = [
  {
    icon: BarChart3,
    title: "Real-Time Tracking",
    description:
      "Monitor stock levels across every location as changes happen, with instant dashboards and live status indicators.",
  },
  {
    icon: Bell,
    title: "Smart Reorder Alerts",
    description:
      "Get notified before you run out — automated thresholds and AI-powered forecasting keep shelves stocked.",
  },
  {
    icon: Truck,
    title: "Supplier Management",
    description:
      "Organize contacts, lead times, and purchase history in one unified view with performance scoring.",
  },
  {
    icon: ScanLine,
    title: "Barcode Scanning",
    description:
      "Speed up receiving and cycle counts with built-in barcode support and quick-entry mode.",
  },
  {
    icon: TrendingUp,
    title: "Analytics & Reports",
    description:
      "Turn movement data into insights with trend charts, turnover analysis, and exportable reports.",
  },
  {
    icon: Users,
    title: "Team Roles & Permissions",
    description:
      "Control who can view, edit, or approve with granular role-based access and approval workflows.",
  },
];

const showcaseSections = [
  {
    badge: "Command Center",
    title: "Your entire inventory at a glance",
    description:
      "See what matters most — stock levels, pending orders, recent movements, and alerts that need attention. The dashboard surfaces critical insights so you never miss a beat.",
    bullets: [
      "Live metric cards with real-time updates",
      "Attention-needed alerts for low and out-of-stock items",
      "Recent activity timeline across all modules",
    ],
    image: mockupDashboard.url,
  },
  {
    badge: "Catalog",
    title: "Every item, perfectly organized",
    description:
      "Powerful search, filters, and bulk actions let you manage hundreds of SKUs without breaking a sweat. Custom fields adapt to your business.",
    bullets: [
      "Advanced filtering by category, status, and location",
      "Bulk edit, export, and barcode printing",
      "Custom fields for any data you need to track",
    ],
    image: mockupCatalog.url,
  },
  {
    badge: "Analytics",
    title: "Data-driven inventory decisions",
    description:
      "From stock trends to supplier performance, turn raw data into actionable insights. Spot patterns, forecast demand, and optimize your supply chain.",
    bullets: [
      "Stock movement trends and turnover analysis",
      "Supplier spend and performance scoring",
      "Demand forecasting with AI-powered suggestions",
    ],
    image: mockupAnalytics.url,
  },
];

/* ─── Components ────────────────────────────────────── */

function RevealSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "translate-y-8 opacity-0"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function CTAButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:shadow-xl hover:brightness-110"
    >
      Try Demo
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </button>
  );
}

/* ─── Page ───────────────────────────────────────────── */
function LandingPage() {
  const { enterDemoMode } = useDemo();
  const navigate = useNavigate();

  const handleTryDemo = () => {
    enterDemoMode();
    navigate({ to: "/app/dashboard" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* ── Hero ─────────────────────────────────────── */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-4 overflow-hidden">
        {/* Background decoration */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute right-0 top-1/3 h-[400px] w-[400px] rounded-full bg-secondary/8 blur-3xl" />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-6 text-center">
          {/* Badge */}
          <div className="animate-fade-in inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground shadow-sm">
            <Zap className="h-3.5 w-3.5 text-secondary" />
            Inventory management, reimagined
          </div>

          {/* Wordmark */}
          <div className="flex items-center gap-4">
            <Package className="h-12 w-12 text-primary sm:h-14 sm:w-14" />
            <h1 className="text-[40px] font-semibold tracking-tight sm:text-[64px]">
              Stackwise
            </h1>
          </div>

          {/* Tagline */}
          <p className="max-w-lg text-lg text-muted-foreground sm:text-xl">
            Your inventory command center. Track stock, manage suppliers, automate
            reorders, and keep your team aligned — all in one place.
          </p>

          {/* CTA */}
          <div className="mt-2">
            <CTAButton onClick={handleTryDemo} />
          </div>

          <p className="text-xs text-muted-foreground">
            No account required · Explore with sample data
          </p>
        </div>

        {/* Floating metric cards */}
        <div className="relative z-10 mt-16 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map((m, i) => (
            <div
              key={m.label}
              className="animate-fade-in rounded-lg border border-border bg-card px-6 py-4 text-center shadow-sm"
              style={{
                animationDelay: `${400 + i * 150}ms`,
                animationFillMode: "backwards",
              }}
            >
              <p className="font-mono text-2xl font-bold text-foreground">
                {m.value}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{m.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Product Showcase — Dashboard ─────────────── */}
      <section className="px-4 py-20">
        <RevealSection>
          <div className="mx-auto max-w-5xl">
            <div className="overflow-hidden rounded-xl border border-border bg-card shadow-2xl shadow-primary/5">
              <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-3">
                <div className="h-3 w-3 rounded-full bg-destructive/60" />
                <div className="h-3 w-3 rounded-full bg-secondary/60" />
                <div className="h-3 w-3 rounded-full bg-stock-healthy/60" />
                <span className="ml-3 text-xs text-muted-foreground">
                  stackwise.app/dashboard
                </span>
              </div>
              <img
                src={mockupDashboard.url}
                alt="Stackwise dashboard showing inventory metrics, stock levels chart, and recent activity"
                className="w-full"
                loading="lazy"
              />
            </div>
          </div>
        </RevealSection>
      </section>

      {/* ── Alternating Feature Sections ─────────────── */}
      {showcaseSections.map((section, idx) => (
        <section key={section.badge} className="px-4 py-16 sm:py-24">
          <div
            className={`mx-auto flex max-w-6xl flex-col items-center gap-12 lg:flex-row ${
              idx % 2 === 1 ? "lg:flex-row-reverse" : ""
            }`}
          >
            {/* Text */}
            <RevealSection className="flex-1 space-y-6" delay={100}>
              <span className="inline-block rounded-md bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                {section.badge}
              </span>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
                {section.title}
              </h2>
              <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                {section.description}
              </p>
              <ul className="space-y-3">
                {section.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-stock-healthy" />
                    <span className="text-muted-foreground">{b}</span>
                  </li>
                ))}
              </ul>
            </RevealSection>

            {/* Image */}
            <RevealSection className="flex-1" delay={250}>
              <div className="overflow-hidden rounded-xl border border-border bg-card shadow-xl">
                <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-2.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
                  <div className="h-2.5 w-2.5 rounded-full bg-secondary/60" />
                  <div className="h-2.5 w-2.5 rounded-full bg-stock-healthy/60" />
                </div>
                <img
                  src={section.image}
                  alt={`Stackwise ${section.badge.toLowerCase()} view`}
                  className="w-full"
                  loading="lazy"
                />
              </div>
            </RevealSection>
          </div>
        </section>
      ))}

      {/* ── Stats Bar ────────────────────────────────── */}
      <section className="border-y border-border bg-muted/30 px-4 py-16">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-8 sm:grid-cols-4">
          {stats.map((s, i) => (
            <RevealSection key={s.label} delay={i * 100} className="text-center">
              <p className="font-mono text-3xl font-bold text-primary sm:text-4xl">
                {s.value}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* ── Feature Grid ─────────────────────────────── */}
      <section className="px-4 py-20 sm:py-28">
        <RevealSection className="text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Everything you need to manage inventory
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
            Six powerful modules working together to give you complete control over
            your supply chain.
          </p>
        </RevealSection>

        <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <RevealSection key={f.title} delay={i * 80}>
              <div className="group rounded-lg border border-border bg-card p-6 transition-all duration-200 hover:border-primary/30 hover:shadow-md">
                <div className="mb-4 inline-flex rounded-md bg-primary/10 p-2.5">
                  <f.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-2 text-sm font-semibold">{f.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {f.description}
                </p>
              </div>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* ── Capabilities Row ─────────────────────────── */}
      <section className="px-4 py-16">
        <RevealSection>
          <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
            {[
              { icon: Shield, text: "Role-Based Access" },
              { icon: Globe, text: "Multi-Location Support" },
              { icon: ScanLine, text: "Barcode Ready" },
              { icon: Zap, text: "AI-Powered Insights" },
            ].map((c) => (
              <div key={c.text} className="flex items-center gap-2">
                <c.icon className="h-4 w-4 text-primary" />
                <span>{c.text}</span>
              </div>
            ))}
          </div>
        </RevealSection>
      </section>

      {/* ── Final CTA ────────────────────────────────── */}
      <section className="relative px-4 py-24 sm:py-32">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute bottom-0 left-1/2 h-[400px] w-[600px] -translate-x-1/2 translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
        </div>
        <RevealSection className="relative z-10 text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
            Ready to take control of your inventory?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base text-muted-foreground">
            Explore Stackwise with sample data. No signup required.
          </p>
          <div className="mt-8">
            <CTAButton onClick={handleTryDemo} />
          </div>
        </RevealSection>
      </section>

      {/* ── Footer ───────────────────────────────────── */}
      <footer className="border-t border-border px-4 py-10 text-center">
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Package className="h-4 w-4 text-primary" />
          <span>
            Built with Stackwise · {new Date().getFullYear()}
          </span>
        </div>
      </footer>
    </div>
  );
}
