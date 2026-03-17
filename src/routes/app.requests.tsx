import { useState, useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RequestFormSheet } from "@/components/requests/RequestFormSheet";
import { RequestsTable } from "@/components/requests/RequestsTable";
import { RequestsFilters } from "@/components/requests/RequestsFilters";
import { useItems, useRequests } from "@/hooks/useInventoryData";
import { useRole } from "@/hooks/useRole";
import { RequestStatus } from "@/types/inventory";
import type { InventoryRequest } from "@/types/inventory";
import type { RequestFilters } from "@/components/requests/request-filter-types";
import { EMPTY_REQUEST_FILTERS } from "@/components/requests/request-filter-types";

export const Route = createFileRoute("/app/requests")({
  component: RequestsPage,
  head: () => ({ meta: [{ title: "Requests — Stackwise" }] }),
});

function applyFilters(requests: InventoryRequest[], filters: RequestFilters): InventoryRequest[] {
  return requests.filter((r) => {
    if (filters.statuses.length > 0 && !filters.statuses.includes(r.status)) return false;
    if (filters.requestor && !r.requestedBy.toLowerCase().includes(filters.requestor.toLowerCase())) return false;
    if (filters.dateFrom && r.createdAt < new Date(filters.dateFrom).toISOString()) return false;
    if (filters.dateTo) {
      const toEnd = new Date(filters.dateTo);
      toEnd.setDate(toEnd.getDate() + 1);
      if (r.createdAt >= toEnd.toISOString()) return false;
    }
    return true;
  });
}

function RequestsPage() {
  const { data: catalogItems } = useItems();
  const { data: requests } = useRequests();
  const { role } = useRole();
  const isManagerOrAdmin = role === "admin" || role === "manager";
  const [formOpen, setFormOpen] = useState(false);
  const [filters, setFilters] = useState<RequestFilters>(EMPTY_REQUEST_FILTERS);
  const [_detailRequest, setDetailRequest] = useState<InventoryRequest | null>(null);

  const pendingCount = useMemo(
    () => requests.filter((r) => r.status === RequestStatus.Pending).length,
    [requests],
  );

  const pendingRequests = useMemo(
    () =>
      applyFilters(
        requests.filter((r) => r.status === RequestStatus.Pending),
        filters,
      ).sort((a, b) => {
        if (a.priority === "urgent" && b.priority !== "urgent") return -1;
        if (b.priority === "urgent" && a.priority !== "urgent") return 1;
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }),
    [requests, filters],
  );

  const allFiltered = useMemo(() => applyFilters(requests, filters), [requests, filters]);

  function handleRowClick(req: InventoryRequest) {
    setDetailRequest(req);
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

      {isManagerOrAdmin ? (
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Requests</TabsTrigger>
            <TabsTrigger value="pending" className="gap-1.5">
              Pending Approval
              {pendingCount > 0 && (
                <Badge variant="secondary" className="ml-1 h-5 min-w-5 px-1.5 text-xs">
                  {pendingCount}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <div className="mt-4">
            <RequestsFilters filters={filters} onChange={setFilters} />
          </div>

          <TabsContent value="all" className="mt-4">
            <RequestsTable requests={allFiltered} onRowClick={handleRowClick} showRequestor />
          </TabsContent>
          <TabsContent value="pending" className="mt-4">
            <RequestsTable requests={pendingRequests} onRowClick={handleRowClick} showRequestor />
          </TabsContent>
        </Tabs>
      ) : (
        <RequestsTable requests={requests} onRowClick={handleRowClick} />
      )}

      <RequestFormSheet open={formOpen} onOpenChange={setFormOpen} items={catalogItems} />
    </div>
  );
}
