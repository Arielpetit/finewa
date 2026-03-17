import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BarcodeDisplayProps {
  barcode: string | null;
  itemName: string;
  sku: string;
  location?: string;
}

/** Generate pseudo-random bar widths from a string for visual effect */
function barsFromString(str: string): number[] {
  const bars: number[] = [];
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);
    bars.push(code % 2 === 0 ? 2 : 1);
    bars.push(code % 3 === 0 ? 3 : 1);
    bars.push(code % 5 === 0 ? 2 : 1);
    bars.push(1); // gap
  }
  return bars;
}

function handlePrint(itemName: string, sku: string, barcode: string, location?: string) {
  const printWindow = window.open("", "_blank", "width=400,height=300");
  if (!printWindow) return;
  printWindow.document.write(`
    <!DOCTYPE html>
    <html><head><title>Label — ${sku}</title>
    <style>
      body { font-family: ui-monospace, monospace; text-align: center; padding: 24px; margin: 0; }
      .name { font-size: 16px; font-weight: 700; margin-bottom: 8px; }
      .sku { font-size: 13px; color: #555; margin-bottom: 4px; }
      .barcode { font-size: 20px; letter-spacing: 4px; font-weight: 700; margin: 16px 0; }
      .location { font-size: 12px; color: #777; }
      @media print { body { padding: 12px; } }
    </style></head><body>
      <div class="name">${itemName}</div>
      <div class="sku">SKU: ${sku}</div>
      <div class="barcode">${barcode}</div>
      ${location ? `<div class="location">Location: ${location}</div>` : ""}
    </body></html>
  `);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
}

export function BarcodeDisplay({ barcode, itemName, sku, location }: BarcodeDisplayProps) {
  if (!barcode) {
    return (
      <div className="rounded-lg border border-dashed border-border p-4 text-center">
        <p className="text-sm text-muted-foreground">No barcode assigned</p>
      </div>
    );
  }

  const bars = barsFromString(barcode);

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <p className="mb-2 text-center text-xs uppercase tracking-wider text-muted-foreground">Barcode</p>

      {/* CSS barcode bars */}
      <div className="mx-auto flex h-14 max-w-[240px] items-end justify-center gap-px" aria-hidden="true">
        {bars.map((w, i) => (
          <div
            key={i}
            className={i % 2 === 0 ? "bg-foreground" : "bg-transparent"}
            style={{ width: `${w}px`, height: `${60 + (w * 7) % 20}%` }}
          />
        ))}
      </div>

      {/* Barcode number */}
      <p className="mt-2 text-center font-mono text-lg font-semibold tracking-widest">{barcode}</p>

      {/* Print button */}
      <div className="mt-3 flex justify-center">
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5"
          onClick={() => handlePrint(itemName, sku, barcode, location)}
        >
          <Printer className="h-3.5 w-3.5" />
          Print Label
        </Button>
      </div>
    </div>
  );
}
