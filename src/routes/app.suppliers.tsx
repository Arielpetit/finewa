import { createFileRoute } from "@tanstack/react-router";
import { SuppliersTable } from "@/components/suppliers/SuppliersTable";
import { useSuppliers, useItems } from "@/hooks/useInventoryData";

export const Route = createFileRoute("/app/suppliers")({
  component: SuppliersPage,
  head: () => ({ meta: [{ title: "Suppliers — Stackwise" }] }),
});

function SuppliersPage() {
  const { data: suppliers } = useSuppliers();
  const { data: items } = useItems();

  return (
    <div className="mx-auto max-w-[1400px] space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Supplier Directory</h1>
        <p className="text-sm text-muted-foreground">{suppliers.length} suppliers</p>
      </div>

      <SuppliersTable suppliers={suppliers} items={items} />
    </div>
  );
}
