import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useDemo } from "@/hooks/useDemo";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useState, useEffect } from "react";
import {
  Package,
  BarChart3,
  Bell,
  Truck,
  ScanLine,
  TrendingUp,
  Users,
  ArrowRight,
  Shield,
  Globe,
  Zap,
  Menu,
  X,
} from "lucide-react";
import heroProductShot from "@/assets/hero-product-shot.png.asset.json";
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
const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Solutions", href: "#solutions" },
  { label: "Analytics", href: "#analytics" },
];

const solutions = [
  {
    icon: BarChart3,
    title: "Real-Time Tracking",
    description: "Monitor stock levels across every location with live dashboards and instant status updates.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Bell,
    title: "Smart Reorders",
    description: "Automated thresholds and AI-powered forecasting prevent stockouts before they happen.",
    color: "bg-secondary/10 text-secondary",
  },
  {
    icon: Truck,
    title: "Supplier Management",
    description: "Unified view of contacts, lead times, purchase history, and performance scoring.",
    color: "bg-accent/20 text-accent-foreground",
  },
  {
    icon: TrendingUp,
    title: "Analytics & Reports",
    description: "Turn movement data into insights with trend charts, turnover analysis, and exports.",
    color: "bg-primary/10 text-primary",
  },
];

const featureTabs = [
  {
    label: "Dashboard",
    description: "See what matters most — stock levels, pending orders, recent movements, and alerts that need attention.",
    image: mockupDashboard.url,
  },
  {
    label: "Catalog",
    description: "Powerful search, filters, bulk actions, and custom fields let you manage hundreds of SKUs effortlessly.",
    image: mockupCatalog.url,
  },
  {
    label: "Analytics",
    description: "From stock trends to supplier performance, turn raw data into actionable insights and forecasts.",
    image: mockupAnalytics.url,
  },
];

const features = [
  {
    icon: BarChart3,
    title: "Real-Time Tracking",
    description: "Monitor stock levels across every location as changes happen, with instant dashboards and live status indicators.",
  },
  {
    icon: Bell,
    title: "Smart Reorder Alerts",
    description: "Get notified before you run out — automated thresholds and AI-powered forecasting keep shelves stocked.",
  },
  {
    icon: Truck,
    title: "Supplier Management",
    description: "Organize contacts, lead times, and purchase history in one unified view with performance scoring.",
  },
  {
    icon: ScanLine,
    title: "Barcode Scanning",
    description: "Speed up receiving and cycle counts with built-in barcode support and quick-entry mode.",
  },
  {
    icon: TrendingUp,
    title: "Analytics & Reports",
    description: "Turn movement data into insights with trend charts, turnover analysis, and exportable reports.",
  },
  {
    icon: Users,
    title: "Team Roles & Permissions",
    description: "Control who can view, edit, or approve with granular role-based access and approval workflows.",
  },
];

const capabilities = [
  { icon: Shield, text: "Role-Based Access" },
  { icon: Globe, text: "Multi-Location Support" },
  { icon: ScanLine, text: "Barcode Ready" },
  { icon: Zap, text: "AI-Powered Insights" },
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
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function StickyNav({ onTryDemo }: { onTryDemo: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 border-b border-border shadow-sm backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <Package className="h-6 w-6 text-primary" />
          <span className="text-lg font-semibold tracking-tight">Stackwise</span>
        </a>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector(l.href)?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <button
          type="button"
          onClick={onTryDemo}
          className="hidden items-center gap-2 rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:brightness-110 md:inline-flex"
        >
          Try Demo
          <ArrowRight className="h-3.5 w-3.5" />
        </button>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-foreground"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="border-t border-border bg-background px-4 pb-4 md:hidden">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={(e) => {
                e.preventDefault();
                setMobileOpen(false);
                document.querySelector(l.href)?.scrollIntoView({ behavior: "smooth" });
              }}
              className="block py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              onTryDemo();
            }}
            className="mt-2 w-full rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            Try Demo →
          </button>
        </div>
      )}
    </nav>
  );
}

function BrowserFrame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-xl border border-border bg-card shadow-xl ${className}`}>
      <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-2.5">
        <div className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
        <div className="h-2.5 w-2.5 rounded-full bg-secondary/60" />
        <div className="h-2.5 w-2.5 rounded-full bg-stock-healthy/60" />
      </div>
      {children}
    </div>
  );
}

function FeatureTabsSection() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="analytics" className="px-4 py-20 sm:py-28">
      <RevealSection className="text-center">
        <span className="inline-block rounded-md bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          Product Tour
        </span>
        <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
          Drive your business forward
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
          Explore the modules that give you complete control over your supply chain.
        </p>
      </RevealSection>

      <div className="mx-auto mt-14 flex max-w-6xl flex-col gap-8 lg:flex-row lg:gap-12">
        {/* Tab list */}
        <div className="flex gap-2 overflow-x-auto lg:w-80 lg:shrink-0 lg:flex-col lg:gap-3">
          {featureTabs.map((tab, i) => (
            <button
              key={tab.label}
              type="button"
              onClick={() => setActiveTab(i)}
              className={`whitespace-nowrap rounded-lg px-5 py-3 text-left text-sm font-medium transition-all lg:px-6 lg:py-4 ${
                activeTab === i
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <span className="block font-semibold">{tab.label}</span>
              <span
                className={`mt-1 hidden text-xs lg:block ${
                  activeTab === i ? "text-primary-foreground/80" : "text-muted-foreground"
                }`}
              >
                {tab.description}
              </span>
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="flex-1">
          <BrowserFrame>
            <img
              src={featureTabs[activeTab].image}
              alt={`Stackwise ${featureTabs[activeTab].label} view`}
              className="w-full transition-opacity duration-300"
            />
          </BrowserFrame>
          <p className="mt-4 text-sm text-muted-foreground lg:hidden">
            {featureTabs[activeTab].description}
          </p>
        </div>
      </div>
    </section>
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
    <div className="min-h-screen bg-background text-foreground">
      <StickyNav onTryDemo={handleTryDemo} />

      {/* ── Split Hero ─────────────────────────────────── */}
      <section className="relative flex min-h-screen items-center px-4 pt-20 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-12 lg:flex-row lg:gap-16">
          {/* Left — copy */}
          <div className="flex-1 text-center lg:text-left">
            <div className="animate-fade-in inline-flex items-center gap-2 rounded-full border border-border bg-muted/60 px-4 py-1.5 text-xs font-medium text-muted-foreground">
              <Zap className="h-3.5 w-3.5 text-primary" />
              AI-Powered Inventory Management
            </div>

            <h1 className="mt-6 text-[36px] font-semibold leading-[1.1] tracking-tight sm:text-[48px] lg:text-[56px]">
              The Inventory Platform{" "}
              <span className="text-primary">Built to Scale</span> Your Business
            </h1>

            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg lg:max-w-md">
              Track stock, manage suppliers, automate reorders, and keep your
              team aligned — all from one powerful command center.
            </p>

            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
              <button
                type="button"
                onClick={handleTryDemo}
                className="group inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:shadow-xl hover:brightness-110"
              >
                Try Demo
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <span className="text-xs text-muted-foreground">
                No account required · Explore with sample data
              </span>
            </div>
          </div>

          {/* Right — product shot */}
          <div className="flex-1 animate-fade-in" style={{ animationDelay: "300ms", animationFillMode: "backwards" }}>
            <img
              src={heroProductShot.url}
              alt="Stackwise inventory management dashboard on a laptop"
              className="w-full max-w-xl mx-auto lg:max-w-none"
            />
          </div>
        </div>
      </section>

      {/* ── Solutions Grid ─────────────────────────────── */}
      <section id="solutions" className="px-4 py-20 sm:py-28">
        <RevealSection className="text-center">
          <span className="inline-block rounded-md bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            Solutions
          </span>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
            Built for modern inventory teams
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
            Four powerful modules working together to give you complete visibility and control.
          </p>
        </RevealSection>

        <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {solutions.map((s, i) => (
            <RevealSection key={s.title} delay={i * 100}>
              <div className="group rounded-xl border border-border bg-card p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
                <div className={`mb-4 inline-flex rounded-lg p-3 ${s.color}`}>
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="mb-2 text-sm font-semibold">{s.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{s.description}</p>
              </div>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* ── Product Showcase — Browser Frame ────────────── */}
      <section className="px-4 py-16">
        <RevealSection>
          <div className="mx-auto max-w-5xl">
            <BrowserFrame className="shadow-2xl shadow-primary/5">
              <img
                src={mockupDashboard.url}
                alt="Stackwise dashboard showing inventory metrics, stock levels chart, and recent activity"
                className="w-full"
                loading="lazy"
              />
            </BrowserFrame>
          </div>
        </RevealSection>
      </section>

      {/* ── Feature Tabs ───────────────────────────────── */}
      <FeatureTabsSection />

      {/* ── Feature Grid ─────────────────────────────── */}
      <section id="features" className="px-4 py-20 sm:py-28">
        <RevealSection className="text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Everything you need to manage inventory
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
            Six powerful modules working together to give you complete control over your supply chain.
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
                <p className="text-sm leading-relaxed text-muted-foreground">{f.description}</p>
              </div>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* ── Capabilities Row ─────────────────────────── */}
      <section className="px-4 py-16">
        <RevealSection>
          <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
            {capabilities.map((c) => (
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
            <button
              type="button"
              onClick={handleTryDemo}
              className="group inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:shadow-xl hover:brightness-110"
            >
              Try Demo
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </RevealSection>
      </section>

      {/* ── Footer ───────────────────────────────────── */}
      <footer className="border-t border-border px-4 py-10 text-center">
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Package className="h-4 w-4 text-primary" />
          <span>Built with Stackwise · {new Date().getFullYear()}</span>
        </div>
      </footer>
    </div>
  );
}
