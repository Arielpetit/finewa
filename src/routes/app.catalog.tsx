import { useState, useMemo, useCallback, useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { CatalogTable, type SortState } from "@/components/catalog/CatalogTable";
import { CatalogFilters } from "@/components/catalog/CatalogFilters";
import { ItemFormSheet } from "@/components/catalog/ItemFormSheet";
import { BulkActionBar } from "@/components/catalog/BulkActionBar";
import { ItemDetailSheet } from "@/components/catalog/ItemDetailSheet";
import { RowActionsMenu } from "@/components/catalog/RowActionsMenu";
import { MovementFormSheet } from "@/components/movements/MovementFormSheet";
import { useItems, useCategories, useSuppliers, useLocations } from "@/hooks/useInventoryData";
import { useCreateItem, useUpdateItem, useDeleteItem } from "@/hooks/useInventoryMutations";
import { PermissionGate, usePermissions } from "@/hooks/usePermissions";
import { useRole } from "@/hooks/useRole";
import type { Item } from "@/types/inventory";
import { ItemStatus } from "@/types/inventory";
import type { ItemFilters } from "@/lib/demo-store";

interface CatalogSearch {
  item?: string;
}

export const Route = createFileRoute("/app/catalog")({
  component: CatalogPage,
  head: () => ({ meta: [{ title: "Catalog — Stackwise" }] }),
  validateSearch: (search: Record<string, unknown>): CatalogSearch => ({
    item: typeof search.item === "string" ? search.item : undefined,
  }),
});

function CatalogPage() {
  const { item: itemId } = Route.useSearch();
  const navigate = useNavigate();

  const [filters, setFilters] = useState<ItemFilters>({});
  const [sort, setSort] = useState<SortState>({ key: "name", dir: "asc" });
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editItem, setEditItem] = useState<Item | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Item | null>(null);

  // Strip stock-level status before passing to store
  const storeFilters = useMemo(() => {
    const { status, ...rest } = filters;
    return rest;
  }, [filters]);

  const { data: allItems } = useItems(storeFilters);
  const { data: categories } = useCategories();
  const { data: suppliers } = useSuppliers();
  const { data: locations } = useLocations();
  const createItem = useCreateItem();
  const updateItem = useUpdateItem();
  const deleteItem = useDeleteItem();
  const { can } = usePermissions();
  const { isAdmin } = useRole();

  // Derive detail item from URL search param
  const detailItem = useMemo(() => {
    if (!itemId) return null;
    return allItems.find((i) => i.id === itemId) ?? null;
  }, [itemId, allItems]);

  const openDetail = useCallback((item: Item) => {
    navigate({ to: "/app/catalog", search: { item: item.id } });
  }, [navigate]);

  const closeDetail = useCallback(() => {
    navigate({ to: "/app/catalog", search: {} });
  }, [navigate]);
  const items = useMemo(() => {
    let result = allItems.filter((i) => i.status !== ItemStatus.Archived);
    if (filters.status === "in-stock") result = result.filter((i) => i.currentStock > i.reorderPoint);
    else if (filters.status === "low-stock") result = result.filter((i) => i.currentStock > 0 && i.currentStock <= i.reorderPoint);
    else if (filters.status === "out-of-stock") result = result.filter((i) => i.currentStock === 0);
    return result;
  }, [allItems, filters.status]);

  const existingSkus = useMemo(() => allItems.map((i) => i.sku), [allItems]);

  const handleSave = useCallback((data: Partial<Item>) => {
    if (editItem) {
      updateItem.mutate({ id: editItem.id, updates: data }, {
        onSuccess: () => { toast.success("Item updated"); setSheetOpen(false); setEditItem(null); },
      });
    } else {
      const newItem: Item = {
        id: `item-${Date.now()}`,
        sku: data.sku ?? "",
        name: data.name ?? "",
        description: data.description ?? "",
        categoryId: data.categoryId ?? null,
        status: data.status ?? ItemStatus.Active,
        unit: data.unit ?? "each",
        currentStock: data.currentStock ?? 0,
        reorderPoint: data.reorderPoint ?? 0,
        reorderQuantity: data.reorderQuantity ?? 0,
        costPrice: data.costPrice ?? 0,
        sellingPrice: data.sellingPrice ?? 0,
        locationId: data.locationId ?? null,
        supplierId: data.supplierId ?? null,
        imageUrl: null,
        customFields: {},
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      createItem.mutate(newItem, {
        onSuccess: () => { toast.success("Item created"); setSheetOpen(false); },
      });
    }
  }, [editItem, createItem, updateItem]);

  const handleDelete = useCallback(() => {
    if (!deleteTarget) return;
    if (isAdmin) {
      deleteItem.mutate(deleteTarget.id, {
        onSuccess: () => { toast.success(`${deleteTarget.name} deleted`); setDeleteTarget(null); },
      });
    } else {
      updateItem.mutate({ id: deleteTarget.id, updates: { status: ItemStatus.Archived } }, {
        onSuccess: () => { toast.success(`${deleteTarget.name} archived`); setDeleteTarget(null); },
      });
    }
  }, [deleteTarget, isAdmin, deleteItem, updateItem]);

  const openEdit = (item: Item) => { setEditItem(item); setSheetOpen(true); };
  const openCreate = () => { setEditItem(null); setSheetOpen(true); };

  const handleBulkUpdate = useCallback((updates: Partial<Item>) => {
    const ids = Array.from(selected);
    const count = ids.length;
    ids.forEach((id) => {
      updateItem.mutate({ id, updates });
    });
    toast.success(`Updated ${count} items`);
    setSelected(new Set());
  }, [selected, updateItem]);

  const actionRenderer = (item: Item) => (
    <RowActionsMenu
      item={item}
      onViewDetails={(i) => openDetail(i)}
      onEdit={(i) => openEdit(i)}
      onLogMovement={(i) => { window.location.href = `/app/movements?item=${i.id}`; }}
      onDelete={(i) => setDeleteTarget(i)}
    />
  );

  return (
    <div className="mx-auto max-w-[1400px] space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Product Catalog</h1>
          <p className="text-sm text-muted-foreground">{items.length} items</p>
        </div>
        <PermissionGate permission="create_item">
          <Button onClick={openCreate} className="hidden gap-1.5 sm:inline-flex">
            <Plus className="h-4 w-4" />New Item
          </Button>
        </PermissionGate>
      </div>

      <CatalogFilters filters={filters} onChange={setFilters} categories={categories} suppliers={suppliers} locations={locations} />

      <CatalogTable
        items={items}
        categories={categories}
        suppliers={suppliers}
        locations={locations}
        sort={sort}
        onSortChange={setSort}
        selected={selected}
        onSelectedChange={setSelected}
        onRowClick={(item) => openDetail(item)}
        actionRenderer={actionRenderer}
        showCheckboxes={can("edit_item")}
      />

      <ItemFormSheet
        open={sheetOpen}
        onOpenChange={(v) => { setSheetOpen(v); if (!v) setEditItem(null); }}
        item={editItem}
        categories={categories}
        suppliers={suppliers}
        locations={locations}
        existingSkus={existingSkus}
        onSave={handleSave}
        loading={createItem.isLoading || updateItem.isLoading}
      />

      <ItemDetailSheet
        open={!!detailItem}
        onOpenChange={(v) => { if (!v) closeDetail(); }}
        item={detailItem}
        categories={categories}
        suppliers={suppliers}
        locations={locations}
        onEdit={(item) => { closeDetail(); openEdit(item); }}
        onArchive={(item) => { closeDetail(); setDeleteTarget(item); }}
      />

      <AlertDialog open={!!deleteTarget} onOpenChange={(v) => !v && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{isAdmin ? "Delete" : "Archive"} {deleteTarget?.name}?</AlertDialogTitle>
            <AlertDialogDescription>
              {isAdmin
                ? "This action cannot be undone. Movement history will be preserved but the item will be removed."
                : "The item will be archived and hidden from the default view."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>{isAdmin ? "Delete" : "Archive"}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <PermissionGate permission="create_item">
        <button
          type="button"
          onClick={openCreate}
          className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-amber-accent shadow-lg transition-transform hover:scale-105 sm:hidden"
          aria-label="New Item"
        >
          <Plus className="h-6 w-6" />
        </button>
      </PermissionGate>

      <PermissionGate permission="edit_item">
        <BulkActionBar
          selectedCount={selected.size}
          categories={categories}
          suppliers={suppliers}
          locations={locations}
          onUpdateCategory={(id) => handleBulkUpdate({ categoryId: id })}
          onUpdateSupplier={(id) => handleBulkUpdate({ supplierId: id })}
          onUpdateLocation={(id) => handleBulkUpdate({ locationId: id })}
          onUpdateStatus={(s) => handleBulkUpdate({ status: s })}
          onDeselectAll={() => setSelected(new Set())}
        />
      </PermissionGate>
    </div>
  );
}
