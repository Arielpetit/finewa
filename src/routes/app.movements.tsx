import { useState, useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { MovementsTable } from "@/components/movements/MovementsTable";
import { MovementsFilters } from "@/components/movements/MovementsFilters";
import { EMPTY_MOVEMENT_FILTERS } from "@/components/movements/movement-filter-types";
import type { MovementFilters } from "@/components/movements/movement-filter-types";
import { useMovements, useItems } from "@/hooks/useInventoryData";
import type { StockMovement } from "@/types/inventory";

export const Route = createFileRoute("/app/movements")({
  component: MovementsPage,
  head: () => ({ meta: [{ title: "Movements — Stackwise" }] }),
});

function applyFilters(movements: StockMovement[], f: MovementFilters): StockMovement[] {
  let result = movements;
  if (f.types.length > 0) result = result.filter((m) => f.types.includes(m.type));
  if (f.itemId) result = result.filter((m) => m.itemId === f.itemId);
  if (f.performedBy) result = result.filter((m) => m.performedBy === f.performedBy);
  if (f.dateFrom) {
    const from = new Date(f.dateFrom);
    from.setHours(0, 0, 0, 0);
    result = result.filter((m) => new Date(m.createdAt) >= from);
  }
  if (f.dateTo) {
    const to = new Date(f.dateTo);
    to.setHours(23, 59, 59, 999);
    result = result.filter((m) => new Date(m.createdAt) <= to);
  }
  return result;
}

function MovementsPage() {
  const [filters, setFilters] = useState<MovementFilters>(EMPTY_MOVEMENT_FILTERS);
  const { data: movements } = useMovements();
  const { data: items } = useItems();

  const itemNameMap = useMemo(
    () => new Map(items.map((i) => [i.id, i.name])),
    [items],
  );

  const performers = useMemo(
    () => [...new Set(movements.map((m) => m.performedBy))].sort(),
    [movements],
  );

  const filtered = useMemo(() => applyFilters(movements, filters), [movements, filters]);

  return (
    <div className="mx-auto max-w-[1400px] space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Stock Movements</h1>
        <p className="text-sm text-muted-foreground">{filtered.length} movements</p>
      </div>

      <MovementsFilters
        filters={filters}
        onChange={setFilters}
        items={items}
        performers={performers}
      />

      <MovementsTable movements={filtered} itemNameMap={itemNameMap} />
    </div>
  );
}
