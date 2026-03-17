// ─── Enums ───────────────────────────────────────────────

export enum MovementType {
  Received = "received",
  Shipped = "shipped",
  Adjusted = "adjusted",
  Transferred = "transferred",
}

export enum OrderStatus {
  Draft = "draft",
  Submitted = "submitted",
  Partial = "partial",
  Received = "received",
  Cancelled = "cancelled",
}

export enum RequestStatus {
  Pending = "pending",
  Approved = "approved",
  Fulfilled = "fulfilled",
  Declined = "declined",
}

export enum ItemStatus {
  Active = "active",
  Discontinued = "discontinued",
  Archived = "archived",
}

export enum UserRoleType {
  Admin = "admin",
  Manager = "manager",
  Requestor = "requestor",
}

// ─── Interfaces ──────────────────────────────────────────

export interface Category {
  id: string;
  name: string;
  description: string;
  parentId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CustomFieldDefinition {
  id: string;
  name: string;
  fieldType: "text" | "number" | "boolean" | "date" | "select";
  options: string[];
  required: boolean;
  createdAt: string;
}

export interface Item {
  id: string;
  sku: string;
  name: string;
  description: string;
  categoryId: string | null;
  status: ItemStatus;
  unit: string;
  currentStock: number;
  reorderPoint: number;
  reorderQuantity: number;
  costPrice: number;
  sellingPrice: number;
  locationId: string | null;
  supplierId: string | null;
  imageUrl: string | null;
  customFields: Record<string, string | number | boolean>;
  createdAt: string;
  updatedAt: string;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  type: "warehouse" | "store" | "office";
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Supplier {
  id: string;
  name: string;
  contactName: string;
  email: string;
  phone: string;
  address: string;
  leadTimeDays: number;
  rating: number;
  isActive: boolean;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface StockMovement {
  id: string;
  itemId: string;
  type: MovementType;
  quantity: number;
  fromLocationId: string | null;
  toLocationId: string | null;
  reference: string;
  notes: string;
  performedBy: string;
  createdAt: string;
}

export interface PurchaseOrderItem {
  id: string;
  purchaseOrderId: string;
  itemId: string;
  quantityOrdered: number;
  quantityReceived: number;
  unitCost: number;
}

export interface PurchaseOrder {
  id: string;
  orderNumber: string;
  supplierId: string;
  status: OrderStatus;
  items: PurchaseOrderItem[];
  totalCost: number;
  expectedDelivery: string | null;
  notes: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface RequestItem {
  id: string;
  requestId: string;
  itemId: string;
  quantity: number;
  notes: string;
}

export interface InventoryRequest {
  id: string;
  requestNumber: string;
  title: string;
  status: RequestStatus;
  priority: "normal" | "urgent";
  items: RequestItem[];
  requestedBy: string;
  approvedBy: string | null;
  reason: string;
  declineReason?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: "info" | "warning" | "error" | "success";
  isRead: boolean;
  link: string | null;
  createdAt: string;
}

export interface UserRole {
  id: string;
  userId: string;
  role: UserRoleType;
}
