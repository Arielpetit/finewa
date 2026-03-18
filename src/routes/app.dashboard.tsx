import { createFileRoute } from "@tanstack/react-router";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { NeedsAttention } from "@/components/dashboard/NeedsAttention";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { DashboardSearch } from "@/components/dashboard/DashboardSearch";
import { useStockSummary } from "@/hooks/useInventoryData";
import { useAlertGenerator } from "@/hooks/useStockAlertGenerator";

export const Route = createFileRoute("/app/dashboard")({
  component: DashboardPage,
  head: () => ({
    meta: [{ title: "Dashboard — Stackwise" }],
  }),
});

function DashboardPage() {
  const { data: summary } = useStockSummary();
  useStockAlertGenerator();

  return (
    <div className="mx-auto max-w-[1400px] space-y-6">
      {/* Heading */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Welcome back — here's your inventory overview.</p>
      </div>

      {/* Search */}
      <DashboardSearch />

      {/* Metric cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard label="Total SKUs" value={summary.total} accentColor="neutral" />
        <MetricCard label="In Stock" value={summary.inStock} accentColor="healthy" />
        <MetricCard label="Low Stock" value={summary.lowStock} accentColor="warning" />
        <MetricCard label="Out of Stock" value={summary.outOfStock} accentColor="danger" />
      </div>

      {/* Two-column: Needs Attention + Recent Activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[3fr_2fr]">
        <NeedsAttention />
        <RecentActivity />
      </div>
    </div>
  );
}
