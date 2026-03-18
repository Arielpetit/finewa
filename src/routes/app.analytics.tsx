import { useState, useMemo } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Download } from "lucide-react";
import { toast } from "sonner";
import { subDays } from "date-fns";
import { usePermissions } from "@/hooks/usePermissions";
import { useItems, useCategories, useSuppliers, useLocations, useMovements } from "@/hooks/useInventoryData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ErrorBoundary } from "@/components/shared/ErrorBoundary";
import { StockSummaryCards } from "@/components/analytics/StockSummaryCards";
import { StockByCategoryChart } from "@/components/analytics/StockByCategoryChart";
import { StockStatusChart } from "@/components/analytics/StockStatusChart";
import { MovementTrendsChart } from "@/components/analytics/MovementTrendsChart";
import { TurnoverAnalysis } from "@/components/analytics/TurnoverAnalysis";
import { AnalyticsFilters, type AnalyticsFilterValues } from "@/components/analytics/AnalyticsFilters";

export const Route = createFileRoute("/app/analytics")({
  component: AnalyticsPage,
  head: () => ({ meta: [{ title: "Analytics — Stackwise" }] }),
});

function AnalyticsPage() {
  const { can } = usePermissions();
  const navigate = useNavigate();

  useEffect(() => {
    if (!can("view_analytics")) {
      toast.error("Access denied");
      navigate({ to: "/app/dashboard" });
    }
  }, [can, navigate]);

  const [filters, setFilters] = useState<AnalyticsFilterValues>({ categoryId: null, supplierId: null, locationId: null, days: 30 });
  const [stockOpen, setStockOpen] = useState(true);
  const [movementOpen, setMovementOpen] = useState(true);
  const [turnoverOpen, setTurnoverOpen] = useState(true);

  const { data: allItems } = useItems();
  const { data: categories } = useCategories();
  const { data: suppliers } = useSuppliers();
  const { data: locations } = useLocations();
  const { data: allMovements } = useMovements();

  const items = useMemo(() => {
    let result = allItems;
    if (filters.categoryId) result = result.filter((i) => i.categoryId === filters.categoryId);
    if (filters.supplierId) result = result.filter((i) => i.supplierId === filters.supplierId);
    if (filters.locationId) result = result.filter((i) => i.locationId === filters.locationId);
    return result;
  }, [allItems, filters]);

  const movements = useMemo(() => {
    const cutoff = subDays(new Date(), filters.days);
    let result = allMovements.filter((m) => new Date(m.createdAt) >= cutoff);
    if (filters.categoryId || filters.supplierId || filters.locationId) {
      const itemIds = new Set(items.map((i) => i.id));
      result = result.filter((m) => itemIds.has(m.itemId));
    }
    return result;
  }, [allMovements, items, filters]);

  const handleExport = () => {
    if (items.length === 0 && movements.length === 0) { toast.error("No data to export"); return; }
    const rows: string[] = ["Section,Name,SKU,Qty,Cost,Value,Status"];
    items.forEach((i) => rows.push(`Stock,${i.name},${i.sku},${i.currentStock},${i.costPrice},${(i.currentStock * i.costPrice).toFixed(2)},${i.status}`));
    rows.push("", "Section,Date,Item,Type,Qty,Reference");
    movements.forEach((m) => rows.push(`Movement,${m.createdAt},${m.itemId},${m.type},${m.quantity},${m.reference}`));
    const blob = new Blob([rows.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `stackwise-analytics-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Analytics exported");
  };

  if (!can("view_analytics")) return null;

  return (
    <div className="mx-auto max-w-[1400px] space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Analytics</h1>
          <p className="text-sm text-muted-foreground">Stock and movement reports</p>
        </div>
        <Button size="sm" variant="outline" onClick={handleExport}>
          <Download className="mr-1.5 h-4 w-4" /> Export CSV
        </Button>
      </div>

      <AnalyticsFilters filters={filters} onChange={setFilters} categories={categories} suppliers={suppliers} locations={locations} />

      <ErrorBoundary>
        <StockSummaryCards items={items} />
      </ErrorBoundary>

      <Collapsible open={stockOpen} onOpenChange={setStockOpen}>
        <Card>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-muted/30 transition-colors">
              <CardTitle className="text-base">Stock Overview</CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="space-y-6">
              <ErrorBoundary>
                <div className="grid gap-6 lg:grid-cols-2">
                  <div>
                    <h3 className="mb-3 text-sm font-medium text-muted-foreground">Items by Category</h3>
                    <StockByCategoryChart items={items} categories={categories} />
                  </div>
                  <div>
                    <h3 className="mb-3 text-sm font-medium text-muted-foreground">Stock Status Distribution</h3>
                    <StockStatusChart items={items} />
                  </div>
                </div>
              </ErrorBoundary>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      <Collapsible open={movementOpen} onOpenChange={setMovementOpen}>
        <Card>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-muted/30 transition-colors">
              <CardTitle className="text-base">Movement Trends</CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent>
              <ErrorBoundary>
                <MovementTrendsChart movements={movements} days={filters.days} />
              </ErrorBoundary>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      <Collapsible open={turnoverOpen} onOpenChange={setTurnoverOpen}>
        <Card>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-muted/30 transition-colors">
              <CardTitle className="text-base">Turnover & Reorder Analysis</CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent>
              <ErrorBoundary>
                <TurnoverAnalysis items={items} movements={movements} />
              </ErrorBoundary>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>
    </div>
  );
}
