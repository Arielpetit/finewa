import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useCreatePurchaseOrder, useUpdatePurchaseOrder } from "@/hooks/useInventoryMutations";
import { OrderStatus } from "@/types/inventory";
import type { PurchaseOrder, Supplier, PurchaseOrderItem } from "@/types/inventory";

const STATUS_LABEL: Record<OrderStatus, string> = {
  [OrderStatus.Draft]: "Draft",
  [OrderStatus.Submitted]: "Submitted",
  [OrderStatus.Partial]: "Partially Received",
  [OrderStatus.Received]: "Fully Received",
  [OrderStatus.Cancelled]: "Cancelled",
};

const schema = z.object({
  supplierId: z.string().min(1, "Supplier is required"),
  expectedDelivery: z.string().min(1, "Expected delivery date is required"),
  notes: z.string(),
});

type FormValues = z.infer<typeof schema>;

function generatePONumber(): string {
  const year = new Date().getFullYear();
  const seq = String(Math.floor(Math.random() * 9000) + 1000);
  return `PO-${year}-${seq}`;
}

interface PurchaseOrderFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  purchaseOrder?: PurchaseOrder | null;
  suppliers: Supplier[];
}

export function PurchaseOrderFormSheet({
  open,
  onOpenChange,
  purchaseOrder,
  suppliers,
}: PurchaseOrderFormSheetProps) {
  const isEdit = !!purchaseOrder;
  const createPO = useCreatePurchaseOrder();
  const updatePO = useUpdatePurchaseOrder();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      supplierId: "",
      expectedDelivery: "",
      notes: "",
    },
  });

  useEffect(() => {
    if (open) {
      if (purchaseOrder) {
        form.reset({
          supplierId: purchaseOrder.supplierId,
          expectedDelivery: purchaseOrder.expectedDelivery
            ? purchaseOrder.expectedDelivery.slice(0, 10)
            : "",
          notes: purchaseOrder.notes ?? "",
        });
      } else {
        form.reset({ supplierId: "", expectedDelivery: "", notes: "" });
      }
    }
  }, [open, purchaseOrder, form]);

  function onSubmit(values: FormValues) {
    const now = new Date().toISOString();

    if (isEdit && purchaseOrder) {
      updatePO.mutate(
        {
          id: purchaseOrder.id,
          updates: {
            supplierId: values.supplierId,
            expectedDelivery: new Date(values.expectedDelivery).toISOString(),
            notes: values.notes,
            updatedAt: now,
          },
        },
        {
          onSuccess: () => {
            toast.success(`${purchaseOrder.orderNumber} updated`);
            onOpenChange(false);
          },
        },
      );
    } else {
      const orderNumber = generatePONumber();
      const newPO: PurchaseOrder = {
        id: crypto.randomUUID(),
        orderNumber,
        supplierId: values.supplierId,
        status: OrderStatus.Draft,
        items: [] as PurchaseOrderItem[],
        totalCost: 0,
        expectedDelivery: new Date(values.expectedDelivery).toISOString(),
        notes: values.notes,
        createdBy: "demo-user",
        createdAt: now,
        updatedAt: now,
      };
      createPO.mutate(newPO, {
        onSuccess: () => {
          toast.success(`${orderNumber} created`);
          onOpenChange(false);
        },
      });
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-[600px]">
        <SheetHeader>
          <SheetTitle>
            {isEdit ? `Edit ${purchaseOrder?.orderNumber}` : "New Purchase Order"}
          </SheetTitle>
          <SheetDescription>
            {isEdit
              ? "Update purchase order details."
              : "Create a new purchase order for a supplier."}
          </SheetDescription>
        </SheetHeader>

        {isEdit && purchaseOrder && (
          <div className="mt-4 flex items-center gap-3">
            <span className="text-sm font-medium text-muted-foreground">Status</span>
            <Badge variant="outline">{STATUS_LABEL[purchaseOrder.status]}</Badge>
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-4">
            <FormField
              control={form.control}
              name="supplierId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Supplier *</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a supplier" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {suppliers
                        .filter((s) => s.isActive)
                        .map((s) => (
                          <SelectItem key={s.id} value={s.id}>
                            {s.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="expectedDelivery"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expected Delivery *</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={3} placeholder="Additional notes…" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {isEdit ? "Save Changes" : "Create PO"}
              </Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
