import type {
  StockMovement,
  PurchaseOrder,
  PurchaseOrderItem,
  InventoryRequest,
  RequestItem,
} from "@/types/inventory";
import {
  MovementType,
  OrderStatus,
  RequestStatus,
} from "@/types/inventory";
import { items } from "./seed-items";

const ts = (daysAgo: number, hour = 10) => {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  d.setHours(hour, 0, 0, 0);
  return d.toISOString();
};

const types = [MovementType.Received, MovementType.Shipped, MovementType.Adjusted];

export function generateMovements(): StockMovement[] {
  const movements: StockMovement[] = [];
  for (let i = 0; i < 70; i++) {
    const daysAgo = Math.floor((i / 70) * 30);
    const hour = 8 + (i % 10);
    const itemIdx = i % items.length;
    const type = types[i % 3];
    const qty = type === MovementType.Shipped ? -(5 + (i % 10)) : 5 + (i % 15);
    movements.push({
      id: `mov-${String(i + 1).padStart(3, "0")}`,
      itemId: items[itemIdx].id,
      type,
      quantity: qty,
      fromLocationId: type === MovementType.Shipped ? "loc-01" : null,
      toLocationId: type === MovementType.Received ? "loc-01" : null,
      reference: `REF-${String(2000 + i)}`,
      notes: "",
      performedBy: "demo-user",
      createdAt: ts(daysAgo, hour),
    });
  }
  return movements;
}

export function generatePurchaseOrders(): PurchaseOrder[] {
  const poItems: PurchaseOrderItem[] = [
    { id: "poi-01", purchaseOrderId: "po-01", itemId: "itm-005", quantityOrdered: 20, quantityReceived: 0, unitCost: 22 },
    { id: "poi-02", purchaseOrderId: "po-01", itemId: "itm-014", quantityOrdered: 15, quantityReceived: 0, unitCost: 11 },
    { id: "poi-03", purchaseOrderId: "po-01", itemId: "itm-020", quantityOrdered: 40, quantityReceived: 0, unitCost: 5 },
    { id: "poi-04", purchaseOrderId: "po-01", itemId: "itm-028", quantityOrdered: 10, quantityReceived: 0, unitCost: 30 },
  ];
  return [
    {
      id: "po-01",
      orderNumber: "PO-2024-001",
      supplierId: "sup-01",
      status: OrderStatus.Draft,
      items: poItems,
      totalCost: poItems.reduce((s, i) => s + i.quantityOrdered * i.unitCost, 0),
      expectedDelivery: ts(-7),
      notes: "Restock for out-of-stock items",
      createdBy: "demo-user",
      createdAt: ts(3),
      updatedAt: ts(1),
    },
  ];
}

export function generateRequests(): InventoryRequest[] {
  const mkItems = (rid: string, ids: string[]): RequestItem[] =>
    ids.map((itemId, i) => ({
      id: `ri-${rid}-${i + 1}`,
      requestId: rid,
      itemId,
      quantity: 5 + i * 3,
      notes: "",
    }));

  return [
    {
      id: "req-01",
      requestNumber: "REQ-2024-001",
      status: RequestStatus.Pending,
      items: mkItems("req-01", ["itm-004", "itm-007"]),
      requestedBy: "demo-user",
      approvedBy: null,
      reason: "Running low on electronics",
      createdAt: ts(2),
      updatedAt: ts(2),
    },
    {
      id: "req-02",
      requestNumber: "REQ-2024-002",
      status: RequestStatus.Approved,
      items: mkItems("req-02", ["itm-019", "itm-023"]),
      requestedBy: "demo-user",
      approvedBy: "demo-admin",
      reason: "Cleaning supplies low",
      createdAt: ts(5),
      updatedAt: ts(3),
    },
    {
      id: "req-03",
      requestNumber: "REQ-2024-003",
      status: RequestStatus.Fulfilled,
      items: mkItems("req-03", ["itm-013"]),
      requestedBy: "demo-user",
      approvedBy: "demo-admin",
      reason: "Office markers needed",
      createdAt: ts(10),
      updatedAt: ts(7),
    },
  ];
}
