import type {
  Item,
  Category,
  Supplier,
  Location,
  StockMovement,
  PurchaseOrder,
  InventoryRequest,
} from "@/types/inventory";
import { MovementType } from "@/types/inventory";
import { generateSeedData, type SeedData } from "./demo/index";

export interface ItemFilters {
  categoryId?: string;
  supplierId?: string;
  locationId?: string;
  status?: string;
  search?: string;
}

export interface StockSummary {
  total: number;
  inStock: number;
  lowStock: number;
  outOfStock: number;
}

export class DemoStore {
  private data: SeedData;
  private version = 0;

  constructor() {
    this.data = generateSeedData();
  }

  getVersion() {
    return this.version;
  }

  reset() {
    this.data = generateSeedData();
    this.version++;
  }

  // ─── Categories ────────────────────────────────────────
  getCategories(): Category[] {
    return this.data.categories;
  }

  // ─── Items ─────────────────────────────────────────────
  getItems(filters?: ItemFilters): Item[] {
    let result = this.data.items;
    if (filters?.categoryId) result = result.filter((i) => i.categoryId === filters.categoryId);
    if (filters?.supplierId) result = result.filter((i) => i.supplierId === filters.supplierId);
    if (filters?.locationId) result = result.filter((i) => i.locationId === filters.locationId);
    if (filters?.status) result = result.filter((i) => i.status === filters.status);
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      result = result.filter((i) => i.name.toLowerCase().includes(q) || i.sku.toLowerCase().includes(q));
    }
    return result;
  }

  getItemById(id: string): Item | undefined {
    return this.data.items.find((i) => i.id === id);
  }

  createItem(item: Item): Item {
    this.data.items.push(item);
    this.version++;
    return item;
  }

  updateItem(id: string, updates: Partial<Item>): Item | undefined {
    const idx = this.data.items.findIndex((i) => i.id === id);
    if (idx === -1) return undefined;
    this.data.items[idx] = { ...this.data.items[idx], ...updates, updatedAt: new Date().toISOString() };
    this.version++;
    return this.data.items[idx];
  }

  deleteItem(id: string): boolean {
    const len = this.data.items.length;
    this.data.items = this.data.items.filter((i) => i.id !== id);
    if (this.data.items.length < len) { this.version++; return true; }
    return false;
  }

  getStockSummary(): StockSummary {
    const items = this.data.items;
    return {
      total: items.length,
      inStock: items.filter((i) => i.currentStock > i.reorderPoint).length,
      lowStock: items.filter((i) => i.currentStock > 0 && i.currentStock <= i.reorderPoint).length,
      outOfStock: items.filter((i) => i.currentStock === 0).length,
    };
  }

  // ─── Movements ─────────────────────────────────────────
  getMovements(): StockMovement[] {
    return this.data.movements;
  }

  getRecentMovements(limit: number): StockMovement[] {
    return [...this.data.movements]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);
  }

  createMovement(movement: StockMovement): StockMovement {
    this.data.movements.push(movement);
    // Update item quantity
    const item = this.data.items.find((i) => i.id === movement.itemId);
    if (item) {
      if (movement.type === MovementType.Received) {
        item.currentStock += Math.abs(movement.quantity);
      } else if (movement.type === MovementType.Shipped) {
        item.currentStock = Math.max(0, item.currentStock - Math.abs(movement.quantity));
      } else if (movement.type === MovementType.Adjusted) {
        item.currentStock = Math.max(0, item.currentStock + movement.quantity);
      } else if (movement.type === MovementType.Transferred) {
        // Transfer doesn't change total stock, just location
        if (movement.toLocationId) {
          item.locationId = movement.toLocationId;
        }
      }
    }
    this.version++;
    return movement;
  }

  // ─── Suppliers ─────────────────────────────────────────
  getSuppliers(): Supplier[] {
    return this.data.suppliers;
  }

  getSupplierById(id: string): Supplier | undefined {
    return this.data.suppliers.find((s) => s.id === id);
  }

  createSupplier(supplier: Supplier): Supplier {
    this.data.suppliers.push(supplier);
    this.version++;
    return supplier;
  }

  updateSupplier(id: string, updates: Partial<Supplier>): Supplier | undefined {
    const idx = this.data.suppliers.findIndex((s) => s.id === id);
    if (idx === -1) return undefined;
    this.data.suppliers[idx] = { ...this.data.suppliers[idx], ...updates };
    this.version++;
    return this.data.suppliers[idx];
  }

  deleteSupplier(id: string): boolean {
    const len = this.data.suppliers.length;
    this.data.suppliers = this.data.suppliers.filter((s) => s.id !== id);
    if (this.data.suppliers.length < len) { this.version++; return true; }
    return false;
  }

  // ─── Locations ─────────────────────────────────────────
  getLocations(): Location[] {
    return this.data.locations;
  }

  getLocationById(id: string): Location | undefined {
    return this.data.locations.find((l) => l.id === id);
  }

  createLocation(location: Location): Location {
    this.data.locations.push(location);
    this.version++;
    return location;
  }

  updateLocation(id: string, updates: Partial<Location>): Location | undefined {
    const idx = this.data.locations.findIndex((l) => l.id === id);
    if (idx === -1) return undefined;
    this.data.locations[idx] = { ...this.data.locations[idx], ...updates };
    this.version++;
    return this.data.locations[idx];
  }

  deleteLocation(id: string): boolean {
    const len = this.data.locations.length;
    this.data.locations = this.data.locations.filter((l) => l.id !== id);
    if (this.data.locations.length < len) { this.version++; return true; }
    return false;
  }

  // ─── Purchase Orders ───────────────────────────────────
  getPurchaseOrders(): PurchaseOrder[] {
    return this.data.purchaseOrders;
  }

  getPurchaseOrderById(id: string): PurchaseOrder | undefined {
    return this.data.purchaseOrders.find((po) => po.id === id);
  }

  createPurchaseOrder(po: PurchaseOrder): PurchaseOrder {
    this.data.purchaseOrders.push(po);
    this.version++;
    return po;
  }

  updatePurchaseOrder(id: string, updates: Partial<PurchaseOrder>): PurchaseOrder | undefined {
    const idx = this.data.purchaseOrders.findIndex((po) => po.id === id);
    if (idx === -1) return undefined;
    this.data.purchaseOrders[idx] = { ...this.data.purchaseOrders[idx], ...updates };
    this.version++;
    return this.data.purchaseOrders[idx];
  }

  deletePurchaseOrder(id: string): boolean {
    const idx = this.data.purchaseOrders.findIndex((po) => po.id === id);
    if (idx === -1) return false;
    this.data.purchaseOrders.splice(idx, 1);
    this.version++;
    return true;
  }

  // ─── Requests ──────────────────────────────────────────
  getRequests(): InventoryRequest[] {
    return this.data.requests;
  }

  getRequestById(id: string): InventoryRequest | undefined {
    return this.data.requests.find((r) => r.id === id);
  }

  createRequest(request: InventoryRequest): InventoryRequest {
    this.data.requests.push(request);
    this.version++;
    return request;
  }

  updateRequest(id: string, updates: Partial<InventoryRequest>): InventoryRequest | undefined {
    const idx = this.data.requests.findIndex((r) => r.id === id);
    if (idx === -1) return undefined;
    this.data.requests[idx] = { ...this.data.requests[idx], ...updates };
    this.version++;
    return this.data.requests[idx];
  }
}
