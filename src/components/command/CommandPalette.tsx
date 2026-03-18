import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Package,
  ArrowRightLeft,
  Truck,
  ShoppingCart,
  ClipboardList,
  MapPin,
  Settings,
  Plus,
  FileDown,
} from "lucide-react";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
} from "@/components/ui/command";
import { useItems } from "@/hooks/useInventoryData";
import { usePermissions } from "@/hooks/usePermissions";
import type { Item } from "@/types/inventory";

// ─── Page definitions ────────────────────────────────────

interface PageDef {
  label: string;
  path: string;
  icon: React.ReactNode;
}

const PAGES: PageDef[] = [
  { label: "Dashboard", path: "/app/dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
  { label: "Catalog", path: "/app/catalog", icon: <Package className="h-4 w-4" /> },
  { label: "Movements", path: "/app/movements", icon: <ArrowRightLeft className="h-4 w-4" /> },
  { label: "Suppliers", path: "/app/suppliers", icon: <Truck className="h-4 w-4" /> },
  { label: "Purchase Orders", path: "/app/purchase-orders", icon: <ShoppingCart className="h-4 w-4" /> },
  { label: "Requests", path: "/app/requests", icon: <ClipboardList className="h-4 w-4" /> },
  { label: "Locations", path: "/app/locations", icon: <MapPin className="h-4 w-4" /> },
  { label: "Settings", path: "/app/settings", icon: <Settings className="h-4 w-4" /> },
];

// ─── Action definitions ──────────────────────────────────

interface ActionDef {
  label: string;
  icon: React.ReactNode;
  shortcut?: string;
  action: (navigate: ReturnType<typeof useNavigate>) => void;
  permission?: Parameters<ReturnType<typeof usePermissions>["can"]>[0];
}

const ACTIONS: ActionDef[] = [
  {
    label: "New Item",
    icon: <Plus className="h-4 w-4" />,
    shortcut: "N I",
    action: (nav) => nav({ to: "/app/catalog", search: {} }),
    permission: "create_item",
  },
  {
    label: "New Movement",
    icon: <ArrowRightLeft className="h-4 w-4" />,
    shortcut: "N M",
    action: (nav) => nav({ to: "/app/movements", search: {} }),
    permission: "log_movement",
  },
  {
    label: "New Purchase Order",
    icon: <ShoppingCart className="h-4 w-4" />,
    shortcut: "N P",
    action: (nav) => nav({ to: "/app/purchase-orders", search: {} }),
    permission: "create_po",
  },
  {
    label: "New Request",
    icon: <ClipboardList className="h-4 w-4" />,
    action: (nav) => nav({ to: "/app/requests", search: {} }),
    permission: "create_request",
  },
  {
    label: "New Supplier",
    icon: <Truck className="h-4 w-4" />,
    action: (nav) => nav({ to: "/app/suppliers" }),
    permission: "manage_suppliers",
  },
  {
    label: "Export Items CSV",
    icon: <FileDown className="h-4 w-4" />,
    action: (nav) => nav({ to: "/app/catalog", search: {} }),
    permission: "export_data",
  },
];

// ─── Component ───────────────────────────────────────────

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { data: items } = useItems();
  const { can } = usePermissions();

  // Reset query on close
  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  // Item search results (max 8, debounced via cmdk)
  const matchedItems: Item[] = query.length >= 1
    ? items
        .filter((i) => {
          const q = query.toLowerCase();
          return (
            i.name.toLowerCase().includes(q) ||
            i.sku.toLowerCase().includes(q) ||
            (i.barcode && i.barcode.toLowerCase().includes(q))
          );
        })
        .slice(0, 8)
    : [];

  const filteredActions = ACTIONS.filter((a) => !a.permission || can(a.permission));

  const handleSelect = useCallback(
    (value: string) => {
      onOpenChange(false);

      // Item selection
      if (value.startsWith("item:")) {
        const itemId = value.replace("item:", "");
        navigate({ to: "/app/catalog", search: { item: itemId } });
        return;
      }

      // Page selection
      if (value.startsWith("page:")) {
        const path = value.replace("page:", "");
        navigate({ to: path as "/app/dashboard" });
        return;
      }

      // Action selection
      if (value.startsWith("action:")) {
        const label = value.replace("action:", "");
        const action = ACTIONS.find((a) => a.label === label);
        action?.action(navigate);
      }
    },
    [navigate, onOpenChange],
  );

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput
        placeholder="Search items, pages, actions…"
        value={query}
        onValueChange={setQuery}
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        {/* Items */}
        {matchedItems.length > 0 && (
          <CommandGroup heading="Items">
            {matchedItems.map((item) => (
              <CommandItem
                key={item.id}
                value={`item:${item.id}`}
                onSelect={handleSelect}
              >
                <Package className="h-4 w-4 text-muted-foreground" />
                <span className="flex-1 truncate">{item.name}</span>
                <span className="font-mono text-xs text-muted-foreground">{item.sku}</span>
                <span className="ml-2 rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
                  {item.currentStock}
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {/* Pages */}
        <CommandGroup heading="Pages">
          {PAGES.map((page) => (
            <CommandItem
              key={page.path}
              value={`page:${page.path}`}
              onSelect={handleSelect}
            >
              {page.icon}
              <span>{page.label}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        {/* Actions */}
        {filteredActions.length > 0 && (
          <CommandGroup heading="Actions">
            {filteredActions.map((action) => (
              <CommandItem
                key={action.label}
                value={`action:${action.label}`}
                onSelect={handleSelect}
              >
                {action.icon}
                <span>{action.label}</span>
                {action.shortcut && (
                  <CommandShortcut>{action.shortcut}</CommandShortcut>
                )}
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  );
}
