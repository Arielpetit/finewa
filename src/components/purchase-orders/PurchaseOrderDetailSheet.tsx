import { useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { format } from "date-fns";
import { Pencil, ExternalLink } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { OrderStatus } from "@/types/inventory";
import type { PurchaseOrder, Supplier, Item } from "@/types/inventory";
import { POStatusActions } from "./POStatusActions";

const STATUS_LABEL: Record<OrderStatus, string> = {
  [OrderStatus.Draft]: "Draft",
  [OrderStatus.Submitted]: "Submitted",
  [OrderStatus.Partial]: "Partially Received",
  [OrderStatus.Received]: "Fully Received",
  [OrderStatus.Cancelled]: "Cancelled",
};

const STATUS_CLASS: Record<OrderStatus, string> = {
  [OrderStatus.Draft]: "bg-muted text-muted-foreground",
  [OrderStatus.Submitted]: "bg-primary/15 text-primary border-primary/20",
  [OrderStatus.Partial]: "bg-amber-accent/15 text-amber-accent border-amber-accent/20",
  [OrderStatus.Received]: "bg-stock-healthy/15 text-stock-healthy border-stock-healthy/20",
  [OrderStatus.Cancelled]: "bg-destructive/15 text-destructive border-destructive/20",
};

interface PurchaseOrderDetailSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  purchaseOrder: PurchaseOrder | null;
  suppliers: Supplier[];
  items: Item[];
  canEdit: boolean;
  onEdit: (po: PurchaseOrder) => void;
}

export function PurchaseOrderDetailSheet({
  open,
  onOpenChange,
  purchaseOrder,
  suppliers,
  items,
  canEdit,
  onEdit,
}: PurchaseOrderDetailSheetProps) {
  const supplierMap = useMemo(
    () => new Map(suppliers.map((s) => [s.id, s])),
    [suppliers],
  );
  const itemMap = useMemo(
    () => new Map(items.map((i) => [i.id, i])),
    [items],
  );

  if (!purchaseOrder) return null;

  const supplier = supplierMap.get(purchaseOrder.supplierId);
  const isDraft = purchaseOrder.status === OrderStatus.Draft;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-[600px]">
        <SheetHeader>
          <SheetTitle>{purchaseOrder.orderNumber}</SheetTitle>
          <SheetDescription>Purchase order details</SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-5">
          {/* Header info */}
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="outline" className={STATUS_CLASS[purchaseOrder.status]}>
              {STATUS_LABEL[purchaseOrder.status]}
            </Badge>
            {isDraft && canEdit && (
              <Button
                size="sm"
                variant="outline"
                className="gap-1.5"
                onClick={() => onEdit(purchaseOrder)}
              >
                <Pencil className="h-3.5 w-3.5" />
                Edit
              </Button>
            )}
          </div>

          {/* Supplier link */}
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground">Supplier</p>
            {supplier ? (
              <Link
                to="/app/suppliers"
                search={{ supplier: supplier.id }}
                className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                {supplier.name}
                <ExternalLink className="h-3 w-3" />
              </Link>
            ) : (
              <p className="text-sm text-foreground">Unknown</p>
            )}
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-medium text-muted-foreground">Created</p>
              <p className="text-sm text-foreground">
                {format(new Date(purchaseOrder.createdAt), "MMM d, yyyy")}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">Expected Delivery</p>
              <p className="text-sm text-foreground">
                {purchaseOrder.expectedDelivery
                  ? format(new Date(purchaseOrder.expectedDelivery), "MMM d, yyyy")
                  : "—"}
              </p>
            </div>
          </div>

          {purchaseOrder.notes && (
            <div>
              <p className="text-xs font-medium text-muted-foreground">Notes</p>
              <p className="text-sm text-foreground">{purchaseOrder.notes}</p>
            </div>
          )}

          <Separator />

          {/* Line items */}
          <div>
            <p className="mb-2 text-sm font-medium text-foreground">
              Line Items ({purchaseOrder.items.length})
            </p>
            <div className="overflow-x-auto rounded-md border border-border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead className="w-[70px]">SKU</TableHead>
                    <TableHead className="w-[60px] text-right">Qty</TableHead>
                    <TableHead className="w-[90px] text-right">Unit Cost</TableHead>
                    <TableHead className="w-[90px] text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {purchaseOrder.items.map((li) => {
                    const item = itemMap.get(li.itemId);
                    return (
                      <TableRow key={li.id}>
                        <TableCell className="text-sm font-medium">
                          {item?.name ?? li.itemId}
                        </TableCell>
                        <TableCell className="font-mono text-xs text-muted-foreground">
                          {item?.sku ?? "—"}
                        </TableCell>
                        <TableCell className="text-right font-mono text-sm">
                          {li.quantityOrdered}
                        </TableCell>
                        <TableCell className="text-right font-mono text-sm">
                          ${li.unitCost.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-right font-mono text-sm font-medium">
                          ${(li.quantityOrdered * li.unitCost).toFixed(2)}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Total */}
          <div className="flex justify-end">
            <span className="text-sm font-medium text-foreground">
              Total:{" "}
              <span className="font-mono text-base">
                ${purchaseOrder.totalCost.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </span>
          </div>

          <Separator />

          {/* Status actions */}
          <POStatusActions purchaseOrder={purchaseOrder} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
