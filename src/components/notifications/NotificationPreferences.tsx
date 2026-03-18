import { useState } from "react";
import { Settings2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useDemo } from "@/hooks/useDemo";
import { toast } from "sonner";
import type { NotificationPrefs } from "@/lib/demo/index";

const PREF_LABELS: { key: keyof NotificationPrefs; label: string; description: string }[] = [
  { key: "low_stock", label: "Low Stock Alerts", description: "When an item drops below its reorder point" },
  { key: "zero_stock", label: "Zero Stock Alerts", description: "When an item reaches zero stock" },
  { key: "po_reminder", label: "PO Reminders", description: "When a PO delivery date is within 3 days" },
  { key: "po_overdue", label: "PO Overdue", description: "When a PO passes its expected delivery date" },
  { key: "request_update", label: "Request Updates", description: "When an inventory request status changes" },
];

interface NotificationPreferencesProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NotificationPreferences({ open, onOpenChange }: NotificationPreferencesProps) {
  const { demoStore, bumpVersion } = useDemo();
  const [prefs, setPrefs] = useState<NotificationPrefs>(() =>
    demoStore?.getNotificationPrefs() ?? {
      low_stock: true, zero_stock: true, po_reminder: true, po_overdue: true, request_update: true,
    },
  );

  const handleToggle = (key: keyof NotificationPrefs) => {
    setPrefs((p) => ({ ...p, [key]: !p[key] }));
  };

  const handleSave = () => {
    demoStore?.setNotificationPrefs(prefs);
    bumpVersion();
    toast.success("Notification preferences saved.");
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:w-[400px]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 text-base">
            <Settings2 className="h-4 w-4" />
            Notification Preferences
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          {PREF_LABELS.map(({ key, label, description }) => (
            <div key={key} className="flex items-center justify-between gap-4 rounded-lg border border-border p-3">
              <div className="min-w-0">
                <Label htmlFor={`pref-${key}`} className="text-sm font-medium">{label}</Label>
                <p className="text-xs text-muted-foreground">{description}</p>
              </div>
              <Switch
                id={`pref-${key}`}
                checked={prefs[key]}
                onCheckedChange={() => handleToggle(key)}
              />
            </div>
          ))}
        </div>

        <div className="mt-6">
          <Button onClick={handleSave} className="w-full">Save Preferences</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
