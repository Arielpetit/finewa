import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/movements")({
  component: MovementsPage,
});

function MovementsPage() {
  return (
    <div className="flex items-center justify-center py-20">
      <h1 className="text-2xl font-semibold text-foreground">Movements</h1>
    </div>
  );
}
