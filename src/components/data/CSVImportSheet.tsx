import { useState, useCallback, useMemo, useRef, type DragEvent } from "react";
import { Upload, FileSpreadsheet, AlertCircle, ChevronRight, ChevronLeft } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

// ─── Types ───────────────────────────────────────────────

export interface ImportField {
  key: string;
  label: string;
  required?: boolean;
}

export interface CSVImportSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  fields: ImportField[];
  /** Called with parsed & mapped rows when user confirms import */
  onImport: (rows: Record<string, string>[]) => void;
  entityName?: string;
}

interface ParsedCSV {
  headers: string[];
  rows: string[][];
}

// ─── CSV Parser ──────────────────────────────────────────

function parseCSV(text: string): ParsedCSV {
  const lines: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === '"') {
      if (inQuotes && text[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if ((ch === "\n" || ch === "\r") && !inQuotes) {
      if (current.length > 0 || lines.length > 0) {
        lines.push(current);
        current = "";
      }
      if (ch === "\r" && text[i + 1] === "\n") i++;
    } else {
      current += ch;
    }
  }
  if (current.length > 0) lines.push(current);

  function splitRow(line: string): string[] {
    const cols: string[] = [];
    let col = "";
    let q = false;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (c === '"') {
        if (q && line[i + 1] === '"') { col += '"'; i++; }
        else q = !q;
      } else if (c === "," && !q) {
        cols.push(col.trim());
        col = "";
      } else {
        col += c;
      }
    }
    cols.push(col.trim());
    return cols;
  }

  if (lines.length === 0) return { headers: [], rows: [] };

  // Strip BOM
  let headerLine = lines[0];
  if (headerLine.charCodeAt(0) === 0xfeff) headerLine = headerLine.slice(1);

  const headers = splitRow(headerLine);
  const rows = lines.slice(1).map(splitRow).filter((r) => r.some((c) => c.length > 0));

  return { headers, rows };
}

// ─── Auto-mapping ────────────────────────────────────────

function autoMap(csvHeaders: string[], fields: ImportField[]): Record<string, string> {
  const mapping: Record<string, string> = {};
  for (const field of fields) {
    const normalised = field.label.toLowerCase().replace(/[^a-z0-9]/g, "");
    const match = csvHeaders.find((h) => {
      const n = h.toLowerCase().replace(/[^a-z0-9]/g, "");
      return n === normalised || n.includes(normalised) || normalised.includes(n);
    });
    if (match) mapping[field.key] = match;
  }
  return mapping;
}

// ─── Step Indicator ──────────────────────────────────────

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold transition-colors ${
            i + 1 === current
              ? "bg-primary text-primary-foreground"
              : i + 1 < current
                ? "bg-primary/20 text-primary"
                : "bg-muted text-muted-foreground"
          }`}
        >
          {i + 1}
        </div>
      ))}
    </div>
  );
}

// ─── Component ───────────────────────────────────────────

export function CSVImportSheet({
  open,
  onOpenChange,
  fields,
  onImport,
  entityName = "items",
}: CSVImportSheetProps) {
  const [step, setStep] = useState(1);
  const [parsed, setParsed] = useState<ParsedCSV | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [mapping, setMapping] = useState<Record<string, string>>({});
  const [isDragOver, setIsDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const totalSteps = 2; // upload + mapping (validation & execute come in US-16-004/005)

  const reset = useCallback(() => {
    setStep(1);
    setParsed(null);
    setFileError(null);
    setFileName("");
    setMapping({});
    setIsDragOver(false);
  }, []);

  const handleFile = useCallback(
    (file: File) => {
      setFileError(null);
      if (!file.name.toLowerCase().endsWith(".csv")) {
        setFileError("Only .csv files are accepted.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setFileError("File exceeds 5 MB limit.");
        return;
      }
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        const csv = parseCSV(text);
        if (csv.headers.length === 0) {
          setFileError("Could not detect any columns. Check the file format.");
          return;
        }
        setParsed(csv);
        setMapping(autoMap(csv.headers, fields));
        setStep(2);
      };
      reader.onerror = () => setFileError("Failed to read file.");
      reader.readAsText(file);
    },
    [fields],
  );

  const handleDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      const file = e.dataTransfer.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile],
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile],
  );

  const requiredFields = useMemo(() => fields.filter((f) => f.required), [fields]);

  const unmappedRequired = useMemo(() => {
    return requiredFields.filter((f) => !mapping[f.key]);
  }, [requiredFields, mapping]);

  const mappedRows = useMemo(() => {
    if (!parsed) return [];
    return parsed.rows.map((row) => {
      const obj: Record<string, string> = {};
      for (const field of fields) {
        const csvHeader = mapping[field.key];
        if (csvHeader) {
          const idx = parsed.headers.indexOf(csvHeader);
          obj[field.key] = idx >= 0 ? (row[idx] ?? "") : "";
        }
      }
      return obj;
    });
  }, [parsed, mapping, fields]);

  return (
    <Sheet
      open={open}
      onOpenChange={(v) => {
        if (!v) reset();
        onOpenChange(v);
      }}
    >
      <SheetContent className="w-full sm:max-w-[600px]">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <SheetTitle>Import {entityName}</SheetTitle>
            <StepIndicator current={step} total={totalSteps} />
          </div>
          <SheetDescription>
            {step === 1 && "Upload a CSV file to import."}
            {step === 2 && "Map CSV columns to fields."}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 flex flex-1 flex-col gap-4">
          {/* ── Step 1: File Upload ── */}
          {step === 1 && (
            <>
              <div
                role="button"
                tabIndex={0}
                className={`flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed p-10 text-center transition-colors cursor-pointer ${
                  isDragOver
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
                onClick={() => inputRef.current?.click()}
                onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={handleDrop}
              >
                <Upload className="h-10 w-10 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Drop a CSV file here or click to browse
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">.csv only, max 5 MB</p>
                </div>
                <input
                  ref={inputRef}
                  type="file"
                  accept=".csv"
                  className="hidden"
                  onChange={handleInputChange}
                />
              </div>

              {fileError && (
                <div className="flex items-center gap-2 rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {fileError}
                </div>
              )}
            </>
          )}

          {/* ── Step 2: Column Mapping ── */}
          {step === 2 && parsed && (
            <>
              <div className="flex items-center gap-2 rounded-md bg-muted/50 px-3 py-2">
                <FileSpreadsheet className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-foreground font-medium">{fileName}</span>
                <span className="text-xs text-muted-foreground">
                  — {parsed.rows.length} rows, {parsed.headers.length} columns
                </span>
              </div>

              <ScrollArea className="max-h-[50vh]">
                <div className="space-y-3 pr-4">
                  {fields.map((field) => (
                    <div key={field.key} className="flex items-center gap-3">
                      <div className="flex w-[140px] shrink-0 items-center gap-1.5">
                        <span className="text-sm font-medium text-foreground truncate">
                          {field.label}
                        </span>
                        {field.required && (
                          <Badge variant="destructive" className="text-[10px] px-1 py-0">
                            Required
                          </Badge>
                        )}
                      </div>

                      <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />

                      <Select
                        value={mapping[field.key] ?? "__skip__"}
                        onValueChange={(v) =>
                          setMapping((prev) => ({
                            ...prev,
                            [field.key]: v === "__skip__" ? "" : v,
                          }))
                        }
                      >
                        <SelectTrigger className="flex-1">
                          <SelectValue placeholder="Skip" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="__skip__">— Skip —</SelectItem>
                          {parsed.headers.map((h) => (
                            <SelectItem key={h} value={h}>
                              {h}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {unmappedRequired.length > 0 && (
                <div className="flex items-center gap-2 rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  Required fields not mapped: {unmappedRequired.map((f) => f.label).join(", ")}
                </div>
              )}
            </>
          )}
        </div>

        {/* ── Footer ── */}
        <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
          {step > 1 ? (
            <Button variant="ghost" size="sm" onClick={() => setStep((s) => s - 1)}>
              <ChevronLeft className="mr-1 h-4 w-4" /> Back
            </Button>
          ) : (
            <div />
          )}

          {step === 2 && (
            <Button
              size="sm"
              disabled={unmappedRequired.length > 0}
              onClick={() => {
                onImport(mappedRows);
                reset();
                onOpenChange(false);
              }}
            >
              Import {parsed?.rows.length ?? 0} Rows
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
