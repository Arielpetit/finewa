import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useDemo } from "@/hooks/useDemo";
import {
  Package,
  BarChart3,
  Bell,
  Truck,
  ScanLine,
  TrendingUp,
  Users,
} from "lucide-react";

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

/* ─── Metric cards data ──────────────────────────────── */
const metrics = [
  { label: "Items Tracked", value: "847" },
  { label: "Low Stock", value: "12" },
  { label: "On Order", value: "3" },
  { label: "Accuracy", value: "99.2%" },
];

/* ─── Feature highlights data ────────────────────────── */
const features = [
  {
    icon: BarChart3,
    title: "Real-Time Tracking",
    description: "Monitor stock levels across every location as changes happen, with instant dashboards.",
  },
  {
    icon: Bell,
    title: "Smart Reorder Alerts",
    description: "Get notified before you run out — automated thresholds keep shelves stocked.",
  },
  {
    icon: Truck,
    title: "Supplier Management",
    description: "Organize contacts, lead times, and purchase history in one unified view.",
  },
  {
    icon: ScanLine,
    title: "Barcode Scanning",
    description: "Speed up receiving and cycle counts with built-in barcode support.",
  },
  {
    icon: TrendingUp,
    title: "Analytics & Reports",
    description: "Turn movement data into insights with trend charts and exportable reports.",
  },
  {
    icon: Users,
    title: "Team Roles & Permissions",
    description: "Control who can view, edit, or approve with granular role-based access.",
  },
];

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
      {/* ── Hero ─────────────────────────────────────── */}
      <section className="flex min-h-screen flex-col items-center justify-center px-4">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-3">
            <Package className="h-10 w-10 text-primary" />
            <h1 className="text-[32px] font-semibold tracking-tight sm:text-[48px]">
              Stackwise
            </h1>
          </div>

          <p className="max-w-md text-lg text-muted-foreground">
            Your inventory command center
          </p>

          <div className="mt-4">
            <button
              type="button"
              onClick={handleTryDemo}
              className="rounded-lg bg-amber-accent px-7 py-2.5 text-sm font-semibold shadow-sm transition-colors hover:brightness-95"
            >
              Try Demo
            </button>
          </div>
        </div>

        {/* Floating metric cards */}
        <div className="mt-16 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {metrics.map((m, i) => (
            <div
              key={m.label}
              className="animate-fade-in rounded-lg border border-border bg-card px-5 py-3 text-center shadow-sm"
              style={{ animationDelay: `${i * 150}ms`, animationFillMode: "backwards" }}
            >
              <p className="text-xl font-bold text-foreground">{m.value}</p>
              <p className="text-xs text-muted-foreground">{m.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ─────────────────────────────────── */}
      <section className="px-4 py-20">
        <h2 className="mb-12 text-center text-2xl font-semibold tracking-tight sm:text-3xl">
          Everything you need to manage inventory
        </h2>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-md border border-border bg-card p-6"
            >
              <f.icon className="mb-3 h-6 w-6 text-primary" />
              <h3 className="mb-1 text-sm font-semibold">{f.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────── */}
      <footer className="border-t border-border px-4 py-10 text-center text-sm text-muted-foreground">
        Built with Stackwise · {new Date().getFullYear()}
      </footer>
    </div>
  );
}
