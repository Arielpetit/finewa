import { useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { MovementsTable } from "@/components/movements/MovementsTable";
import { useMovements, useItems } from "@/hooks/useInventoryData";

export const Route = createFileRoute("/app/movements")({
  component: MovementsPage,
  head: () => ({ meta: [{ title: "Movements — Stackwise" }] }),
});

function MovementsPage() {
  const { data: movements } = useMovements();
  const { data: items } = useItems();

  const itemNameMap = useMemo(
    () => new Map(items.map((i) => [i.id, i.name])),
    [items],
  );

  return (
    <div className="mx-auto max-w-[1400px] space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Stock Movements</h1>
        <p className="text-sm text-muted-foreground">{movements.length} movements</p>
      </div>

      <MovementsTable movements={movements} itemNameMap={itemNameMap} />
    </div>
  );
}
