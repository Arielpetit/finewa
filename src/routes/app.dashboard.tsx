import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/dashboard")({
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <div className="flex items-center justify-center py-20">
      <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
    </div>
  );
}
