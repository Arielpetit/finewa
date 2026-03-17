import { TrendingUp, TrendingDown } from "lucide-react";

type AccentColor = "healthy" | "warning" | "danger" | "neutral";

interface MetricCardProps {
  label: string;
  value: number;
  trend?: { direction: "up" | "down"; percentage: number } | null;
  accentColor?: AccentColor;
}

const ACCENT_BORDER: Record<AccentColor, string> = {
  healthy: "border-l-stock-healthy",
  warning: "border-l-stock-low",
  danger: "border-l-stock-out",
  neutral: "border-l-primary",
};

export function MetricCard({ label, value, trend, accentColor = "neutral" }: MetricCardProps) {
  return (
    <div className={`rounded-md border border-border bg-card p-5 border-l-[3px] ${ACCENT_BORDER[accentColor]}`}>
      <p className="text-sm text-muted-foreground">{label}</p>
      <div className="mt-1 flex items-baseline gap-2">
        <span className="font-mono text-[32px] font-bold leading-tight text-foreground">
          {value.toLocaleString()}
        </span>
        {trend && (
          <span className={`flex items-center gap-0.5 text-xs font-medium ${trend.direction === "up" ? "text-stock-healthy" : "text-stock-out"}`}>
            {trend.direction === "up" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {trend.percentage}%
          </span>
        )}
      </div>
    </div>
  );
}
