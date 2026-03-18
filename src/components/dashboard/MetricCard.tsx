import { TrendingUp, TrendingDown } from "lucide-react";

type AccentColor = "healthy" | "warning" | "danger" | "neutral";

interface MetricCardProps {
  label: string;
  value: number;
  trend?: { direction: "up" | "down"; percentage: number } | null;
  accentColor?: AccentColor;
  icon?: React.ComponentType<{ className?: string }>;
}

const ACCENT_BORDER: Record<AccentColor, string> = {
  healthy: "border-l-stock-healthy",
  warning: "border-l-stock-low",
  danger: "border-l-stock-out",
  neutral: "border-l-primary",
};

const ACCENT_BG: Record<AccentColor, string> = {
  healthy: "bg-metric-healthy-bg",
  warning: "bg-metric-warning-bg",
  danger: "bg-metric-danger-bg",
  neutral: "bg-metric-neutral-bg",
};

const ICON_COLOR: Record<AccentColor, string> = {
  healthy: "text-stock-healthy",
  warning: "text-stock-low",
  danger: "text-stock-out",
  neutral: "text-primary",
};

export function MetricCard({ label, value, trend, accentColor = "neutral", icon: Icon }: MetricCardProps) {
  return (
    <div className={`rounded-md border border-border shadow-sm ${ACCENT_BG[accentColor]} border-l-4 ${ACCENT_BORDER[accentColor]}`}>
      <div className="p-5">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          {Icon && <Icon className={`h-5 w-5 ${ICON_COLOR[accentColor]} opacity-70`} />}
        </div>
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
    </div>
  );
}
