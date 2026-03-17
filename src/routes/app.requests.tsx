import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RequestFormSheet } from "@/components/requests/RequestFormSheet";
import { RequestsTable } from "@/components/requests/RequestsTable";
import { useItems, useRequests } from "@/hooks/useInventoryData";
import type { InventoryRequest } from "@/types/inventory";

export const Route = createFileRoute("/app/requests")({
  component: RequestsPage,
  head: () => ({ meta: [{ title: "Requests — Stackwise" }] }),
});

function RequestsPage() {
  const { data: catalogItems } = useItems();
  const { data: requests } = useRequests();
  const [formOpen, setFormOpen] = useState(false);
  const [_detailRequest, setDetailRequest] = useState<InventoryRequest | null>(null);

  function handleRowClick(req: InventoryRequest) {
    setDetailRequest(req);
    // Detail sheet will be wired in US-13-004
  }

  return (
    <div className="mx-auto max-w-[1400px] space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Inventory Requests</h1>
          <p className="text-sm text-muted-foreground">{requests.length} requests</p>
        </div>
        <Button size="sm" onClick={() => setFormOpen(true)}>
          <Plus className="mr-1.5 h-4 w-4" />
          New Request
        </Button>
      </div>

      <RequestsTable requests={requests} onRowClick={handleRowClick} />

      <RequestFormSheet open={formOpen} onOpenChange={setFormOpen} items={catalogItems} />
    </div>
  );
}
