import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useLocationTree } from "@/hooks/useLocations";
import { useItems } from "@/hooks/useInventoryData";
import { LocationTree } from "@/components/locations/LocationTree";

export const Route = createFileRoute("/app/locations")({
  component: LocationsPage,
  head: () => ({ meta: [{ title: "Locations — Stackwise" }] }),
});

function LocationsPage() {
  const tree = useLocationTree();
  const { data: items } = useItems();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <div className="mx-auto max-w-[1400px] space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Locations</h1>
        <p className="text-sm text-muted-foreground">Manage warehouses and storage locations</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr_3fr]">
        <div className="rounded-lg border border-border bg-card p-4">
          <LocationTree
            tree={tree}
            items={items}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          {selectedId ? (
            <p className="text-sm text-muted-foreground">Location details coming soon</p>
          ) : (
            <p className="text-sm text-muted-foreground">Select a location to view details</p>
          )}
        </div>
      </div>
    </div>
  );
}
