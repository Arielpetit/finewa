import type { Item, Notification } from "@/types/inventory";
import type { DemoStore } from "@/lib/demo-store";

/**
 * Scan items and generate low_stock / zero_stock notifications.
 * Deduplicates: skips if an unread alert for the same item already exists.
 */
export function generateStockAlerts(store: DemoStore): void {
  const items = store.getItems();
  const existing = store.getNotifications();

  for (const item of items) {
    if (item.status !== "active") continue;

    const isLow = item.currentStock > 0 && item.currentStock <= item.reorderPoint;
    const isOut = item.currentStock <= 0;

    if (!isLow && !isOut) continue;

    const type = isOut ? "zero_stock" : "low_stock";

    // Dedup: skip if unread alert for same item + type exists
    const alreadyExists = existing.some(
      (n) => !n.isRead && n.type === type && n.referenceId === item.id,
    );
    if (alreadyExists) continue;

    const notification: Notification = {
      id: `notif-auto-${type}-${item.id}-${Date.now()}`,
      type,
      title: isOut
        ? `Out of Stock: ${item.name}`
        : `Low Stock: ${item.name}`,
      message: isOut
        ? `${item.name} (${item.sku}) has reached zero stock. Reorder immediately.`
        : `${item.name} (${item.sku}) stock is at ${item.currentStock} units, below reorder point of ${item.reorderPoint}.`,
      isRead: false,
      link: `/app/catalog?item=${item.id}`,
      referenceId: item.id,
      createdAt: new Date().toISOString(),
    };

    store.addNotification(notification);
  }
}
