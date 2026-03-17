import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/requests")({
  component: RequestsPage,
});

function RequestsPage() {
  return (
    <div className="flex items-center justify-center py-20">
      <h1 className="text-2xl font-semibold text-foreground">Requests</h1>
    </div>
  );
}
