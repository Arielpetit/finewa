import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/catalog")({
  component: CatalogPage,
});

function CatalogPage() {
  return (
    <div className="flex items-center justify-center py-20">
      <h1 className="text-2xl font-semibold text-foreground">Catalog</h1>
    </div>
  );
}
