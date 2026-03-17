import { useState } from "react";
import { useDemo } from "@/hooks/useDemo";
import { X } from "lucide-react";

export function DemoBanner() {
  const { isDemo } = useDemo();
  const [dismissed, setDismissed] = useState(false);

  if (!isDemo || dismissed) return null;

  return (
    <div className="sticky top-0 z-50 flex h-10 w-full items-center justify-between bg-amber-accent px-3 text-sm font-medium text-foreground">
      <span className="truncate">
        <span className="hidden sm:inline">
          You're exploring Stackwise in demo mode. Data resets each session.
        </span>
        <span className="sm:hidden">Demo Mode</span>
      </span>

      <div className="flex shrink-0 items-center gap-2">
        <a
          href="/"
          className="rounded-md border border-foreground/20 bg-background/80 px-3 py-0.5 text-xs font-semibold transition-colors hover:bg-background"
        >
          Create Account
        </a>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="rounded p-0.5 transition-colors hover:bg-foreground/10"
          aria-label="Dismiss demo banner"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
