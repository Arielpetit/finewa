import { useState, useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { PurchaseOrdersTable } from "@/components/purchase-orders/PurchaseOrdersTable";
import { PurchaseOrdersFilters } from "@/components/purchase-orders/PurchaseOrdersFilters";
import { PurchaseOrderFormSheet } from "@/components/purchase-orders/PurchaseOrderFormSheet";
import { usePurchaseOrders, useSuppliers, useItems } from "@/hooks/useInventoryData";
import { usePermissions } from "@/hooks/usePermissions";
import { Button } from "@/components/ui/button";
import type { PurchaseOrder } from "@/types/inventory";
import type { POFilters } from "@/components/purchase-orders/po-filter-types";
import { EMPTY_PO_FILTERS } from "@/components/purchase-orders/po-filter-types";

export const Route = createFileRoute("/app/purchase-orders")({
  component: PurchaseOrdersPage,
  head: () => ({ meta: [{ title: "Purchase Orders — Stackwise" }] }),
});

function PurchaseOrdersPage() {
  const { data: purchaseOrders } = usePurchaseOrders();
  const { data: suppliers } = useSuppliers();
  const { can } = usePermissions();
  const canManagePOs = can("create_po");
  const [filters, setFilters] = useState<POFilters>(EMPTY_PO_FILTERS);
  const [formOpen, setFormOpen] = useState(false);
  const [editPO, setEditPO] = useState<PurchaseOrder | null>(null);

  const filtered = useMemo(() => {
    return purchaseOrders.filter((po) => {
      if (filters.statuses.length > 0 && !filters.statuses.includes(po.status)) return false;
      if (filters.supplierId && po.supplierId !== filters.supplierId) return false;
      if (filters.dateFrom && po.createdAt < new Date(filters.dateFrom).toISOString()) return false;
      if (filters.dateTo) {
        const toEnd = new Date(filters.dateTo);
        toEnd.setDate(toEnd.getDate() + 1);
        if (po.createdAt >= toEnd.toISOString()) return false;
      }
      return true;
    });
  }, [purchaseOrders, filters]);

  function openCreate() {
    setEditPO(null);
    setFormOpen(true);
  }

  function handleRowClick(po: PurchaseOrder) {
    // Detail sheet wired in US-11-007/009
    console.log("PO row clicked:", po.orderNumber);
  }

  return (
    <div className="mx-auto max-w-[1400px] space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Purchase Orders</h1>
          <p className="text-sm text-muted-foreground">{filtered.length} orders</p>
        </div>
        {canManagePOs && (
          <Button size="sm" onClick={openCreate}>
            <Plus className="mr-1.5 h-4 w-4" />
            New PO
          </Button>
        )}
      </div>

      <PurchaseOrdersFilters filters={filters} onChange={setFilters} suppliers={suppliers} />

      <PurchaseOrdersTable
        purchaseOrders={filtered}
        suppliers={suppliers}
        onRowClick={handleRowClick}
      />

      <PurchaseOrderFormSheet
        open={formOpen}
        onOpenChange={setFormOpen}
        purchaseOrder={editPO}
        suppliers={suppliers}
      />
    </div>
  );
}
