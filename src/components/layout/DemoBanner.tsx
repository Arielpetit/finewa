import { useState } from "react";
import { useDemo } from "@/hooks/useDemo";
import { useRole } from "@/hooks/useRole";
import { X } from "lucide-react";
import type { UserRoleType } from "@/lib/roles";

const roles: { value: UserRoleType; label: string }[] = [
  { value: "admin", label: "Admin" },
  { value: "manager", label: "Manager" },
  { value: "requestor", label: "Requestor" },
];

export function DemoBanner() {
  const { isDemo } = useDemo();
  const { role, setDemoRole } = useRole();
  const [dismissed, setDismissed] = useState(false);

  if (!isDemo || dismissed) return null;

  return (
    <div className="sticky top-0 z-50 flex h-10 w-full items-center justify-between gap-2 bg-primary px-3 text-sm font-medium text-primary-foreground">
      <span className="truncate">
        <span className="hidden sm:inline">
          You're exploring Stackwise in demo mode. Data resets each session.
        </span>
        <span className="sm:hidden">Demo Mode</span>
      </span>

      {/* Role switcher */}
      <div className="flex shrink-0 items-center gap-1 rounded-md border border-foreground/15 bg-background/50 p-0.5">
        {roles.map((r) => (
          <button
            key={r.value}
            type="button"
            onClick={() => setDemoRole(r.value)}
            className={`rounded px-2 py-0.5 text-xs font-semibold transition-colors ${
              role === r.value ? "bg-background text-foreground shadow-sm" : "text-foreground/60 hover:text-foreground"
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>

      <div className="flex shrink-0 items-center gap-1">
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
