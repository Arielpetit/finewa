import { createFileRoute } from "@tanstack/react-router";
import { StatusBadge } from "@/components/StatusBadge";

export const Route = createFileRoute("/app/dashboard")({
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <div className="space-y-8 py-10">
      <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>

      {/* Temporary: StatusBadge showcase */}
      <div className="space-y-3">
        <p className="text-sm font-medium text-muted-foreground">Stock Status</p>
        <div className="flex flex-wrap gap-4">
          <StatusBadge status="in-stock" />
          <StatusBadge status="low-stock" />
          <StatusBadge status="out-of-stock" />
        </div>
        <p className="text-sm font-medium text-muted-foreground">Item Status</p>
        <div className="flex flex-wrap gap-4">
          <StatusBadge status="active" />
          <StatusBadge status="discontinued" />
          <StatusBadge status="archived" />
        </div>
      </div>
    </div>
  );
}
