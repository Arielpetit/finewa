import type {
  Item,
  Category,
  Supplier,
  Location,
  StockMovement,
  PurchaseOrder,
  InventoryRequest,
  Notification,
} from "@/types/inventory";
import { categories, suppliers, locations } from "./seed-base";
import { items } from "./seed-items";
import { generateMovements, generatePurchaseOrders, generateRequests } from "./seed-activity";
import { generateNotifications } from "./seed-notifications";

export interface SeedData {
  categories: Category[];
  items: Item[];
  suppliers: Supplier[];
  locations: Location[];
  movements: StockMovement[];
  purchaseOrders: PurchaseOrder[];
  requests: InventoryRequest[];
  notifications: Notification[];
}

export function generateSeedData(): SeedData {
  return {
    categories: [...categories],
    items: items.map((i) => ({ ...i })),
    suppliers: [...suppliers],
    locations: [...locations],
    movements: generateMovements(),
    purchaseOrders: generatePurchaseOrders(),
    requests: generateRequests(),
    notifications: generateNotifications(),
  };
}
