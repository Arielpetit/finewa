import { createFileRoute } from "@tanstack/react-router";
import { PurchaseOrdersTable } from "@/components/purchase-orders/PurchaseOrdersTable";
import { usePurchaseOrders, useSuppliers } from "@/hooks/useInventoryData";
import type { PurchaseOrder } from "@/types/inventory";

export const Route = createFileRoute("/app/purchase-orders")({
  component: PurchaseOrdersPage,
  head: () => ({ meta: [{ title: "Purchase Orders — Stackwise" }] }),
});

function PurchaseOrdersPage() {
  const { data: purchaseOrders } = usePurchaseOrders();
  const { data: suppliers } = useSuppliers();

  function handleRowClick(po: PurchaseOrder) {
    // Detail sheet will be wired in US-11-007/009
    console.log("PO row clicked:", po.orderNumber);
  }

  return (
    <div className="mx-auto max-w-[1400px] space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Purchase Orders</h1>
        <p className="text-sm text-muted-foreground">{purchaseOrders.length} orders</p>
      </div>

      <PurchaseOrdersTable
        purchaseOrders={purchaseOrders}
        suppliers={suppliers}
        onRowClick={handleRowClick}
      />
    </div>
  );
}
