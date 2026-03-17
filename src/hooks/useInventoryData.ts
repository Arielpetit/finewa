import { useMemo, useCallback, useState } from "react";
import { useDemo } from "@/hooks/useDemo";
import type {
  Item,
  Category,
  Supplier,
  Location,
  StockMovement,
  PurchaseOrder,
  InventoryRequest,
} from "@/types/inventory";
import type { ItemFilters, StockSummary } from "@/lib/demo-store";

interface QueryResult<T> {
  data: T;
  isLoading: boolean;
  error: Error | null;
}

function useDemoQuery<T>(getter: () => T, fallback: T): QueryResult<T> {
  const { isDemo, demoStore, version } = useDemo();
  return useMemo(() => {
    if (isDemo && demoStore) {
      return { data: getter(), isLoading: false, error: null };
    }
    return { data: fallback, isLoading: false, error: null };
    // version drives re-computation after mutations
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDemo, demoStore, version]);
}

export function useItems(filters?: ItemFilters): QueryResult<Item[]> {
  return useDemoQuery(() => useDemo().demoStore!.getItems(filters), []);
}

export function useItemById(id: string): QueryResult<Item | undefined> {
  return useDemoQuery(() => useDemo().demoStore!.getItemById(id), undefined);
}

export function useCategories(): QueryResult<Category[]> {
  return useDemoQuery(() => useDemo().demoStore!.getCategories(), []);
}

export function useSuppliers(): QueryResult<Supplier[]> {
  return useDemoQuery(() => useDemo().demoStore!.getSuppliers(), []);
}

export function useLocations(): QueryResult<Location[]> {
  return useDemoQuery(() => useDemo().demoStore!.getLocations(), []);
}

export function useMovements(limit?: number): QueryResult<StockMovement[]> {
  return useDemoQuery(
    () =>
      limit
        ? useDemo().demoStore!.getRecentMovements(limit)
        : useDemo().demoStore!.getMovements(),
    [],
  );
}

export function useStockSummary(): QueryResult<StockSummary> {
  return useDemoQuery(() => useDemo().demoStore!.getStockSummary(), {
    total: 0,
    inStock: 0,
    lowStock: 0,
    outOfStock: 0,
  });
}

export function usePurchaseOrders(): QueryResult<PurchaseOrder[]> {
  return useDemoQuery(() => useDemo().demoStore!.getPurchaseOrders(), []);
}

export function useRequests(): QueryResult<InventoryRequest[]> {
  return useDemoQuery(() => useDemo().demoStore!.getRequests(), []);
}
