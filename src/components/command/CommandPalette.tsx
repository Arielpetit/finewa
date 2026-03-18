import { useEffect, useState, useCallback, useMemo } from "react";
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
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
} from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useItems } from "@/hooks/useInventoryData";
import { usePermissions } from "@/hooks/usePermissions";
import { PAGES } from "./palette-pages";
import { ACTIONS } from "./palette-actions";
import { ItemResultRow } from "./ItemResultRow";

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

  const q = query.toLowerCase().trim();

  // Item search results (max 8)
  const matchedItems = useMemo(() => {
    if (q.length < 1) return [];
    return items
      .filter((i) =>
        i.name.toLowerCase().includes(q) ||
        i.sku.toLowerCase().includes(q) ||
        (i.barcode && i.barcode.toLowerCase().includes(q))
      )
      .slice(0, 8);
  }, [items, q]);

  // Filter pages by query
  const matchedPages = useMemo(() => {
    if (!q) return PAGES;
    return PAGES.filter((p) => p.label.toLowerCase().includes(q));
  }, [q]);

  // Filter actions by query + permissions
  const matchedActions = useMemo(() => {
    const allowed = ACTIONS.filter((a) => !a.permission || can(a.permission));
    if (!q) return allowed;
    return allowed.filter((a) => a.label.toLowerCase().includes(q));
  }, [q, can]);

  const hasResults = matchedItems.length > 0 || matchedPages.length > 0 || matchedActions.length > 0;

  const handleSelect = useCallback(
    (value: string) => {
      onOpenChange(false);

      if (value.startsWith("item:")) {
        const itemId = value.replace("item:", "");
        navigate({ to: "/app/catalog", search: { item: itemId } });
        return;
      }

      if (value.startsWith("page:")) {
        const path = value.replace("page:", "");
        navigate({ to: path as "/app/dashboard" });
        return;
      }

      if (value.startsWith("action:")) {
        const label = value.replace("action:", "");
        const action = ACTIONS.find((a) => a.label === label);
        action?.action(navigate);
      }
    },
    [navigate, onOpenChange],
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden p-0">
        <CommandPrimitive
          shouldFilter={false}
          className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5"
        >
          <CommandInput
            placeholder="Search items, pages, actions…"
            value={query}
            onValueChange={setQuery}
          />
          <CommandList>
            {!hasResults && <CommandEmpty>No results found.</CommandEmpty>}

            {matchedItems.length > 0 && (
              <CommandGroup heading="Items">
                {matchedItems.map((item) => (
                  <CommandItem
                    key={item.id}
                    value={`item:${item.id}`}
                    onSelect={handleSelect}
                  >
                    <ItemResultRow item={item} />
                  </CommandItem>
                ))}
              </CommandGroup>
            )}

            {matchedPages.length > 0 && (
              <CommandGroup heading="Pages">
                {matchedPages.map((page) => (
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
            )}

            {matchedActions.length > 0 && (
              <CommandGroup heading="Actions">
                {matchedActions.map((action) => (
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
        </CommandPrimitive>
      </DialogContent>
    </Dialog>
  );
}
