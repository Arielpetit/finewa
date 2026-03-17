import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/ai-insights")({
  component: AiInsightsPage,
});

function AiInsightsPage() {
  return (
    <div className="flex items-center justify-center py-20">
      <h1 className="text-2xl font-semibold text-foreground">AI Insights</h1>
    </div>
  );
}
