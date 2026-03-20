import { useState } from "react";
import { ArrowRight, Check, X, TrendingDown, AlertTriangle, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ReorderAnalysis, ConfidenceLevel } from "@/lib/reorder-engine";
import { cn } from "@/lib/utils";

interface ReorderSuggestionCardProps {
  analysis: ReorderAnalysis;
  onApply: (analysis: ReorderAnalysis) => void;
  onDismiss: (analysis: ReorderAnalysis) => void;
}

function getUrgencyBar(days: number | null): string {
  if (days === null) return "bg-muted-foreground/30";
  if (days < 7) return "bg-destructive";
  if (days <= 14) return "bg-amber-500";
  return "bg-emerald-500";
}

function getUrgencyBg(days: number | null): string {
  if (days === null) return "text-muted-foreground";
  if (days < 7) return "text-destructive";
  if (days <= 14) return "text-amber-600 dark:text-amber-400";
  return "text-emerald-600 dark:text-emerald-400";
}

const confidenceVariant: Record<ConfidenceLevel, "default" | "secondary" | "outline"> = {
  high: "default",
  medium: "secondary",
  low: "outline",
};

export function ReorderSuggestionCard({ analysis, onApply, onDismiss }: ReorderSuggestionCardProps) {
  const [applied, setApplied] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const delta = analysis.suggestedReorderPoint - analysis.currentReorderPoint;

  return (
    <Card className={cn(
      "relative overflow-hidden p-4 pl-5 transition-all",
      applied && "opacity-75",
    )}>
      <div className={cn(
        "absolute left-1 top-1 bottom-1 w-[3px] rounded-full",
        applied ? "bg-emerald-500" : getUrgencyBar(analysis.daysUntilStockout),
      )} />
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="text-sm font-semibold truncate">{analysis.itemName}</h4>
            <Badge variant={confidenceVariant[analysis.confidence]} className="text-[10px] px-1.5 py-0">
              {analysis.confidence}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">{analysis.sku}</p>
        </div>

        {analysis.daysUntilStockout !== null && (
          <div className={cn("text-right shrink-0", getUrgencyBg(analysis.daysUntilStockout))}>
            {analysis.daysUntilStockout < 7 ? (
              <AlertTriangle className="h-4 w-4 mx-auto" />
            ) : analysis.daysUntilStockout <= 14 ? (
              <TrendingDown className="h-4 w-4 mx-auto" />
            ) : (
              <ShieldCheck className="h-4 w-4 mx-auto" />
            )}
            <p className="text-xs font-bold mt-0.5">
              {analysis.daysUntilStockout}d
            </p>
          </div>
        )}
      </div>

      {/* Metrics */}
      <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
        <div className="text-muted-foreground">Current Stock</div>
        <div className="font-medium text-right">{analysis.currentStock}</div>

        <div className="text-muted-foreground">Reorder Point</div>
        <div className="font-medium text-right flex items-center justify-end gap-1">
          <span className="text-muted-foreground">{analysis.currentReorderPoint}</span>
          <ArrowRight className="h-3 w-3 text-muted-foreground" />
          <span className={cn(delta > 0 ? "text-amber-600 dark:text-amber-400" : "text-emerald-600 dark:text-emerald-400")}>
            {analysis.suggestedReorderPoint}
          </span>
        </div>

        <div className="text-muted-foreground">Order Qty</div>
        <div className="font-medium text-right">{analysis.suggestedReorderQuantity}</div>

        <div className="text-muted-foreground">Avg Daily Use</div>
        <div className="font-medium text-right">{analysis.avgDailyConsumption.toFixed(1)}</div>
      </div>

      {/* Actions */}
      <div className="mt-3 flex items-center gap-2">
        {applied ? (
          <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
            <Check className="h-3.5 w-3.5" />
            Applied
          </div>
        ) : (
          <>
            <Button
              size="sm"
              variant="default"
              className="h-7 text-xs"
              onClick={() => {
                onApply(analysis);
                setApplied(true);
              }}
            >
              Apply
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-7 text-xs"
              onClick={() => {
                onDismiss(analysis);
                setDismissed(true);
              }}
            >
              <X className="h-3 w-3 mr-1" />
              Dismiss
            </Button>
          </>
        )}
      </div>
    </Card>
  );
}
