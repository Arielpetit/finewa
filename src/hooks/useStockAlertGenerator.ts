import { useEffect, useRef } from "react";
import { useDemo } from "@/hooks/useDemo";
import { generateStockAlerts } from "@/lib/notification-generators";

/**
 * Runs stock alert generation once on mount (dashboard load).
 * Bumps version so notification hooks re-render.
 */
export function useStockAlertGenerator() {
  const { isDemo, demoStore, bumpVersion } = useDemo();
  const ranRef = useRef(false);

  useEffect(() => {
    if (!isDemo || !demoStore || ranRef.current) return;
    ranRef.current = true;
    generateStockAlerts(demoStore);
    bumpVersion();
  }, [isDemo, demoStore, bumpVersion]);
}
