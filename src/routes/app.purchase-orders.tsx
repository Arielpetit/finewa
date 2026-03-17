import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/purchase-orders")({
  component: PurchaseOrdersPage,
});

function PurchaseOrdersPage() {
  return (
    <div className="flex items-center justify-center py-20">
      <h1 className="text-2xl font-semibold text-foreground">Purchase Orders</h1>
    </div>
  );
}
