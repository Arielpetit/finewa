import { useState, useMemo } from "react";
import {
  PackageCheck,
  PackageMinus,
  PenLine,
  ArrowLeftRight,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MovementType } from "@/types/inventory";
import type { StockMovement } from "@/types/inventory";
import { formatDistanceToNow, format } from "date-fns";

const TYPE_META: Record<MovementType, { icon: typeof PackageCheck; label: string }> = {
  [MovementType.Received]: { icon: PackageCheck, label: "Received" },
  [MovementType.Shipped]: { icon: PackageMinus, label: "Shipped" },
  [MovementType.Adjusted]: { icon: PenLine, label: "Adjusted" },
  [MovementType.Transferred]: { icon: ArrowLeftRight, label: "Transferred" },
};

function directionOf(type: MovementType, qty: number): "in" | "out" {
  if (type === MovementType.Received) return "in";
  if (type === MovementType.Shipped) return "out";
  return qty >= 0 ? "in" : "out";
}

interface MovementsTableProps {
  movements: StockMovement[];
  itemNameMap: Map<string, string>;
  onRowClick?: (m: StockMovement) => void;
}

const PER_PAGE = 25;

export function MovementsTable({ movements, itemNameMap, onRowClick }: MovementsTableProps) {
  const [page, setPage] = useState(0);

  const sorted = useMemo(
    () => [...movements].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    [movements],
  );

  const totalPages = Math.max(1, Math.ceil(sorted.length / PER_PAGE));
  const safePage = Math.min(page, totalPages - 1);
  const paged = sorted.slice(safePage * PER_PAGE, (safePage + 1) * PER_PAGE);
  const start = safePage * PER_PAGE + 1;
  const end = Math.min((safePage + 1) * PER_PAGE, sorted.length);

  if (sorted.length === 0) {
    return <p className="py-16 text-center text-sm text-muted-foreground">No stock movements recorded</p>;
  }

  return (
    <TooltipProvider delayDuration={200}>
      <div>
        <div className="overflow-x-auto rounded-md border border-border">
          <Table>
            <TableHeader className="sticky top-0 bg-card">
              <TableRow>
                <TableHead className="w-[140px]">Type</TableHead>
                <TableHead>Item</TableHead>
                <TableHead className="w-[100px]">Quantity</TableHead>
                <TableHead className="w-[80px]">Direction</TableHead>
                <TableHead>Performed By</TableHead>
                <TableHead>Reference</TableHead>
                <TableHead className="w-[140px]">Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paged.map((m) => {
                const meta = TYPE_META[m.type];
                const Icon = meta.icon;
                const dir = directionOf(m.type, m.quantity);
                const absQty = Math.abs(m.quantity);

                return (
                  <TableRow
                    key={m.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => onRowClick?.(m)}
                  >
                    <TableCell>
                      <span className="inline-flex items-center gap-1.5 text-sm">
                        <Icon className="h-4 w-4 text-muted-foreground" />
                        {meta.label}
                      </span>
                    </TableCell>
                    <TableCell className="font-medium">
                      {itemNameMap.get(m.itemId) ?? m.itemId}
                    </TableCell>
                    <TableCell>
                      <span className={`font-mono text-sm font-medium ${dir === "in" ? "text-emerald-600" : "text-red-500"}`}>
                        {dir === "in" ? "+" : "−"}{absQty}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                        dir === "in"
                          ? "bg-emerald-500/10 text-emerald-600"
                          : "bg-red-500/10 text-red-500"
                      }`}>
                        {dir}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{m.performedBy}</TableCell>
                    <TableCell className="max-w-[180px] truncate text-sm text-muted-foreground">{m.reference || "—"}</TableCell>
                    <TableCell>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="cursor-default text-sm text-muted-foreground">
                            {formatDistanceToNow(new Date(m.createdAt), { addSuffix: true })}
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          {format(new Date(m.createdAt), "PPpp")}
                        </TooltipContent>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        <div className="mt-3 flex items-center justify-between text-sm text-muted-foreground">
          <span>Showing {start}–{end} of {sorted.length} movements</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled={safePage === 0} onClick={() => setPage(safePage - 1)}>Previous</Button>
            <Button variant="outline" size="sm" disabled={safePage >= totalPages - 1} onClick={() => setPage(safePage + 1)}>Next</Button>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
