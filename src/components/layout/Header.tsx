import { useState } from "react";
import { Search, Plus, Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import { Sidebar } from "./Sidebar";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="flex h-14 items-center gap-3 border-b border-border bg-card px-4 md:px-8">
      {/* Mobile hamburger */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={() => setMobileOpen(true)}
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Search trigger */}
      <button
        type="button"
        className="flex h-9 flex-1 items-center gap-2 rounded-md border border-input bg-background px-3 text-sm text-muted-foreground transition-colors hover:border-primary/40 md:max-w-sm"
      >
        <Search className="h-4 w-4 shrink-0" />
        <span>Search…</span>
        <kbd className="ml-auto hidden rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-xs md:inline-block">
          ⌘K
        </kbd>
      </button>

      {/* Quick action */}
      <Button size="icon" variant="default" className="shrink-0" aria-label="Quick action">
        <Plus className="h-4 w-4" />
      </Button>

      {/* User avatar placeholder */}
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
        <User className="h-4 w-4 text-muted-foreground" />
      </div>

      {/* Mobile sidebar sheet */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-[260px] p-0">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <Sidebar onNavigate={() => setMobileOpen(false)} />
        </SheetContent>
      </Sheet>
    </header>
  );
}
