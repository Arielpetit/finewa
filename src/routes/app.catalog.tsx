import { useState, useMemo, useCallback } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Plus, MoreHorizontal, Pencil, Trash2, Archive } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { useItems, useCategories, useSuppliers, useLocations } from "@/hooks/useInventoryData";
import { useCreateItem, useUpdateItem, useDeleteItem } from "@/hooks/useInventoryMutations";
import { PermissionGate, usePermissions } from "@/hooks/usePermissions";
import { useRole } from "@/hooks/useRole";
import type { Item } from "@/types/inventory";
import { ItemStatus } from "@/types/inventory";
import type { ItemFilters } from "@/lib/demo-store";

export const Route = createFileRoute("/app/catalog")({
  component: CatalogPage,
  head: () => ({ meta: [{ title: "Catalog — Stackwise" }] }),
});

function CatalogPage() {
  const [filters, setFilters] = useState<ItemFilters>({});
  const [sort, setSort] = useState<SortState>({ key: "name", dir: "asc" });
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editItem, setEditItem] = useState<Item | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Item | null>(null);
  const [detailItem, setDetailItem] = useState<Item | null>(null);

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

  // Client-side stock-level filter
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
    let completed = 0;
    ids.forEach((id) => {
      updateItem.mutate({ id, updates }, {
        onSuccess: () => {
          completed++;
          if (completed === ids.length) {
            toast.success(`Updated ${ids.length} items`);
            setSelected(new Set());
          }
        },
      });
    });
  }, [selected, updateItem]);

  const actionRenderer = can("edit_item") ? (item: Item) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Actions">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => openEdit(item)}>
          <Pencil className="mr-2 h-4 w-4" />Edit
        </DropdownMenuItem>
        {isAdmin ? (
          <DropdownMenuItem onClick={() => setDeleteTarget(item)} className="text-destructive">
            <Trash2 className="mr-2 h-4 w-4" />Delete
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={() => setDeleteTarget(item)}>
            <Archive className="mr-2 h-4 w-4" />Archive
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  ) : undefined;

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
        onRowClick={(item) => setDetailItem(item)}
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
        onOpenChange={(v) => { if (!v) setDetailItem(null); }}
        item={detailItem}
        categories={categories}
        suppliers={suppliers}
        locations={locations}
        onEdit={(item) => { setDetailItem(null); openEdit(item); }}
        onArchive={(item) => { setDetailItem(null); setDeleteTarget(item); }}
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
    </div>
  );
}
