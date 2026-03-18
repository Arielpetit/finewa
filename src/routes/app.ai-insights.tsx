import { useState, useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { ForecastSummary } from "@/components/insights/ForecastSummary";
import { DemandForecastChart } from "@/components/insights/DemandForecastChart";
import { ReorderSuggestionCard } from "@/components/insights/ReorderSuggestionCard";
import { useDemo } from "@/hooks/useDemo";
import { useUpdateItem } from "@/hooks/useInventoryMutations";
import { analyzeAllItems, type ReorderAnalysis } from "@/lib/reorder-engine";
import { usePermissions } from "@/hooks/usePermissions";

export const Route = createFileRoute("/app/ai-insights")({
  component: AiInsightsPage,
  head: () => ({
    meta: [{ title: "Insights — Stackwise" }],
  }),
});

type UrgencyFilter = "all" | "critical" | "moderate" | "low";
type ConfidenceFilter = "all" | "high" | "medium" | "low";
type SortBy = "stockout" | "delta";

function AiInsightsPage() {
  const { demoStore } = useDemo();
  const { can } = usePermissions();
  const updateItem = useUpdateItem();

  const [urgency, setUrgency] = useState<UrgencyFilter>("all");
  const [confidence, setConfidence] = useState<ConfidenceFilter>("all");
  const [sortBy, setSortBy] = useState<SortBy>("stockout");

  const items = demoStore?.getItems() ?? [];
  const movements = demoStore?.getMovements() ?? [];
  const suppliers = demoStore?.getSuppliers() ?? [];

  const allAnalyses = useMemo(
    () => analyzeAllItems(items, movements, suppliers),
    [items, movements, suppliers],
  );

  const filtered = useMemo(() => {
    let result = [...allAnalyses];

    if (urgency !== "all") {
      result = result.filter((a) => {
        if (a.daysUntilStockout === null) return urgency === "low";
        if (a.daysUntilStockout < 7) return urgency === "critical";
        if (a.daysUntilStockout <= 14) return urgency === "moderate";
        return urgency === "low";
      });
    }

    if (confidence !== "all") {
      result = result.filter((a) => a.confidence === confidence);
    }

    if (sortBy === "delta") {
      result.sort(
        (a, b) =>
          Math.abs(b.suggestedReorderPoint - b.currentReorderPoint) -
          Math.abs(a.suggestedReorderPoint - a.currentReorderPoint),
      );
    }
    // default sort is already by stockout from analyzeAllItems

    return result;
  }, [allAnalyses, urgency, confidence, sortBy]);

  if (!can("view_analytics")) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-muted-foreground">You don't have permission to view this page.</p>
      </div>
    );
  }

  const handleApply = (a: ReorderAnalysis) => {
    updateItem.mutate(
      { id: a.itemId, updates: { reorderPoint: a.suggestedReorderPoint, reorderQuantity: a.suggestedReorderQuantity } },
      {
        onSuccess: () => toast.success(`Reorder settings updated for ${a.itemName}`),
        onError: (e) => toast.error(e.message || "Failed to update reorder settings."),
      },
    );
  };

  const handleDismiss = (_a: ReorderAnalysis) => {};

  return (
    <div className="mx-auto max-w-[1400px] space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Sparkles className="h-5 w-5 text-primary" />
        <h1 className="text-2xl font-semibold text-foreground">AI Insights</h1>
        <Badge variant="secondary" className="text-xs">Beta</Badge>
      </div>

      {/* Summary Metrics */}
      <ForecastSummary analyses={allAnalyses} />

      {/* Demand Chart */}
      <DemandForecastChart items={items} movements={movements} />

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <Select value={urgency} onValueChange={(v) => setUrgency(v as UrgencyFilter)}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Urgency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Urgency</SelectItem>
            <SelectItem value="critical">Critical (&lt;7d)</SelectItem>
            <SelectItem value="moderate">Moderate (7-14d)</SelectItem>
            <SelectItem value="low">Low (&gt;14d)</SelectItem>
          </SelectContent>
        </Select>

        <Select value={confidence} onValueChange={(v) => setConfidence(v as ConfidenceFilter)}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Confidence" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Confidence</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortBy)}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="stockout">Days to Stockout</SelectItem>
            <SelectItem value="delta">Reorder Delta</SelectItem>
          </SelectContent>
        </Select>

        <span className="text-xs text-muted-foreground ml-auto">
          {filtered.length} suggestion{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Suggestion Cards */}
      {filtered.length === 0 ? (
        <p className="text-center text-sm text-muted-foreground py-8">
          No reorder suggestions match the current filters.
        </p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((a) => (
            <ReorderSuggestionCard
              key={a.itemId}
              analysis={a}
              onApply={handleApply}
              onDismiss={handleDismiss}
            />
          ))}
        </div>
      )}
    </div>
  );
}
