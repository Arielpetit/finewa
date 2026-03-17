import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/analytics")({
  component: AnalyticsPage,
});

function AnalyticsPage() {
  return (
    <div className="flex items-center justify-center py-20">
      <h1 className="text-2xl font-semibold text-foreground">Analytics</h1>
    </div>
  );
}
