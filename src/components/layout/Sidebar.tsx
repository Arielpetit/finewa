import { useState } from "react";
import {
  LayoutDashboard,
  Package,
  ArrowLeftRight,
  Truck,
  ClipboardList,
  Inbox,
  BarChart3,
  Sparkles,
  Settings,
  ChevronRight,
} from "lucide-react";
import { Link, useLocation } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    label: "Operations",
    items: [
      { label: "Dashboard", href: "/app/dashboard", icon: LayoutDashboard },
      { label: "Catalog", href: "/app/catalog", icon: Package },
      { label: "Movements", href: "/app/movements", icon: ArrowLeftRight },
    ],
  },
  {
    label: "Procurement",
    items: [
      { label: "Suppliers", href: "/app/suppliers", icon: Truck },
      { label: "Purchase Orders", href: "/app/purchase-orders", icon: ClipboardList },
    ],
  },
  {
    label: "Intelligence",
    items: [
      { label: "Analytics", href: "/app/analytics", icon: BarChart3 },
      { label: "AI Insights", href: "/app/ai-insights", icon: Sparkles },
    ],
  },
  {
    label: "Admin",
    items: [
      { label: "Settings", href: "/app/settings", icon: Settings },
    ],
  },
];

const standaloneLinks: NavItem[] = [
  { label: "Requests", href: "/app/requests", icon: Inbox },
];

interface SidebarProps {
  onNavigate?: () => void;
}

export function Sidebar({ onNavigate }: SidebarProps) {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const toggleGroup = (label: string) => {
    setCollapsed((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const isActive = (href: string) => location.pathname === href;

  return (
    <nav className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      {/* Wordmark */}
      <div className="flex h-14 items-center px-5">
        <span className="text-xl font-semibold tracking-tight text-primary">
          Stackwise
        </span>
      </div>

      {/* Nav groups */}
      <div className="flex-1 overflow-y-auto px-3 py-2">
        {navGroups.map((group) => {
          const isCollapsed = collapsed[group.label] ?? false;
          return (
            <div key={group.label} className="mb-1">
              <button
                type="button"
                onClick={() => toggleGroup(group.label)}
                className="flex w-full items-center gap-1 px-2 py-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground"
              >
                <ChevronRight
                  className={cn(
                    "h-3 w-3 transition-transform duration-150",
                    !isCollapsed && "rotate-90"
                  )}
                />
                {group.label}
              </button>

              {!isCollapsed && (
                <div>
                  {group.items.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={onNavigate}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                        isActive(item.href)
                          ? "bg-primary/10 font-medium text-primary"
                          : "text-sidebar-foreground hover:bg-sidebar-accent"
                      )}
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
          );
        })}

        {/* Standalone links */}
        <div className="mb-1 mt-2">
          {standaloneLinks.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                isActive(item.href)
                  ? "bg-primary/10 font-medium text-primary"
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
