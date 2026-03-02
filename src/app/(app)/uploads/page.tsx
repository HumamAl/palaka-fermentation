"use client";

import { useState, useMemo } from "react";
import { uploads, batches } from "@/data/mock-data";
import type { DataUpload } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Upload,
  Search,
  FileText,
  ChevronUp,
  ChevronDown,
  AlertCircle,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";

type UploadStatus = DataUpload["status"];
type DataType = DataUpload["dataType"];
type SortKey = keyof Pick<DataUpload, "fileName" | "uploadedBy" | "uploadedAt" | "rowCount" | "status">;

// ── Status Badge ───────────────────────────────────────────────

function StatusBadge({ status }: { status: UploadStatus }) {
  const config: Record<UploadStatus, { label: string; color: string; icon: React.ReactNode }> = {
    validated:  {
      label: "Validated",
      color: "text-[color:var(--success)] bg-[color:var(--success)]/10",
      icon: <CheckCircle2 className="w-3 h-3" />,
    },
    processing: {
      label: "Processing",
      color: "text-[color:var(--warning)] bg-[color:var(--warning)]/10",
      icon: <Loader2 className="w-3 h-3 animate-spin" />,
    },
    error:      {
      label: "Error",
      color: "text-destructive bg-destructive/10",
      icon: <AlertCircle className="w-3 h-3" />,
    },
    archived:   {
      label: "Archived",
      color: "text-muted-foreground bg-muted",
      icon: null,
    },
  };
  const c = config[status];
  return (
    <Badge
      variant="outline"
      className={cn("text-xs font-medium border-0 rounded-full flex items-center gap-1", c.color)}
    >
      {c.icon}
      {c.label}
    </Badge>
  );
}

// ── Data Type Badge ────────────────────────────────────────────

function DataTypeBadge({ type }: { type: DataType }) {
  const labels: Record<DataType, string> = {
    "sensor-log":       "Sensor Log",
    "lab-panel":        "Lab Panel",
    "batch-parameters": "Batch Params",
    "koji-culture":     "Koji Culture",
    "chemical-analysis":"Chem Analysis",
  };
  return (
    <span className="text-xs font-mono text-muted-foreground bg-muted/50 border border-border/40 px-2 py-0.5 rounded">
      {labels[type]}
    </span>
  );
}

// ── File type icon label ───────────────────────────────────────

function FileTypePill({ type }: { type: DataUpload["fileType"] }) {
  const colors: Record<DataUpload["fileType"], string> = {
    csv:  "text-primary bg-primary/8",
    tsv:  "text-primary bg-primary/8",
    xlsx: "text-[color:var(--success)] bg-[color:var(--success)]/10",
    json: "text-[color:var(--warning)] bg-[color:var(--warning)]/10",
  };
  return (
    <span
      className={cn(
        "text-[10px] font-bold font-mono uppercase px-1.5 py-0.5 rounded",
        colors[type]
      )}
    >
      {type}
    </span>
  );
}

// ── Simulated upload area ──────────────────────────────────────

function UploadDropzone({ onUpload }: { onUpload: (name: string, type: DataUpload["fileType"]) => void }) {
  const [dragging, setDragging] = useState(false);

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    setDragging(true);
  }

  function handleDragLeave() {
    setDragging(false);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (!file) return;
    const ext = file.name.split(".").pop()?.toLowerCase();
    const validTypes: DataUpload["fileType"][] = ["csv", "tsv", "xlsx", "json"];
    if (ext && validTypes.includes(ext as DataUpload["fileType"])) {
      onUpload(file.name, ext as DataUpload["fileType"]);
    }
  }

  function handleSimulate() {
    const sampleFiles = [
      { name: "sensor_log_batch_007.csv", type: "csv" as const },
      { name: "lab_panel_q2_2026.xlsx", type: "xlsx" as const },
      { name: "koji_culture_may.csv", type: "csv" as const },
      { name: "batch_params_spring.json", type: "json" as const },
    ];
    const pick = sampleFiles[Math.floor(Math.random() * sampleFiles.length)];
    onUpload(pick.name, pick.type);
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        "border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-100",
        dragging
          ? "border-primary bg-primary/5"
          : "border-border/50 hover:border-primary/40 hover:bg-muted/30"
      )}
    >
      <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
      <p className="text-sm font-medium mb-1">
        Drag &amp; drop sensor logs, lab panels, or batch data
      </p>
      <p className="text-xs text-muted-foreground mb-4">
        Supported formats: CSV, TSV, XLSX, JSON &mdash; max 100 MB per file
      </p>
      <div className="flex items-center justify-center gap-2 flex-wrap">
        <Button size="sm" onClick={handleSimulate}>
          <FileText className="w-4 h-4 mr-2" />
          Simulate Upload
        </Button>
        <span className="text-xs text-muted-foreground">or drag a file above</span>
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────

let nextId = 11;

export default function UploadsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | UploadStatus>("all");
  const [sortKey, setSortKey] = useState<SortKey>("uploadedAt");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [localUploads, setLocalUploads] = useState<DataUpload[]>(uploads);

  function handleUpload(fileName: string, fileType: DataUpload["fileType"]) {
    const newEntry: DataUpload = {
      id: `U-0${nextId++}`,
      fileName,
      fileType,
      uploadedBy: "Current User",
      uploadedAt: new Date().toISOString(),
      rowCount: 0,
      status: "processing",
      dataType: "sensor-log",
    };
    setLocalUploads((prev) => [newEntry, ...prev]);

    // Simulate processing completion
    setTimeout(() => {
      setLocalUploads((prev) =>
        prev.map((u) =>
          u.id === newEntry.id
            ? { ...u, status: "validated" as UploadStatus, rowCount: Math.floor(Math.random() * 2000) + 100 }
            : u
        )
      );
    }, 2500);
  }

  const displayed = useMemo(() => {
    return [...localUploads]
      .filter((u) => {
        const matchesStatus = statusFilter === "all" || u.status === statusFilter;
        const q = search.toLowerCase();
        const matchesSearch =
          !q ||
          u.fileName.toLowerCase().includes(q) ||
          u.uploadedBy.toLowerCase().includes(q) ||
          u.dataType.toLowerCase().includes(q);
        return matchesStatus && matchesSearch;
      })
      .sort((a, b) => {
        const av = a[sortKey] ?? "";
        const bv = b[sortKey] ?? "";
        if (av < bv) return sortDir === "asc" ? -1 : 1;
        if (av > bv) return sortDir === "asc" ? 1 : -1;
        return 0;
      });
  }, [localUploads, search, statusFilter, sortKey, sortDir]);

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  }

  function SortIcon({ col }: { col: SortKey }) {
    if (sortKey !== col) return null;
    return sortDir === "asc" ? (
      <ChevronUp className="w-3 h-3" />
    ) : (
      <ChevronDown className="w-3 h-3" />
    );
  }

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  function batchName(id?: string) {
    if (!id) return null;
    return batches.find((b) => b.id === id)?.batchName ?? id;
  }

  // Summary stats
  const validated = localUploads.filter((u) => u.status === "validated").length;
  const processing = localUploads.filter((u) => u.status === "processing").length;
  const errors = localUploads.filter((u) => u.status === "error").length;

  return (
    <div className="page-container space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Data Upload Portal</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Ingest sensor logs, lab panels, batch parameters, and koji culture data for model training
          </p>
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Validated", value: validated, color: "text-[color:var(--success)]" },
          { label: "Processing", value: processing, color: "text-[color:var(--warning)]" },
          { label: "Errors", value: errors, color: "text-destructive" },
        ].map((s) => (
          <div key={s.label} className="linear-card" style={{ padding: "var(--card-padding)" }}>
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className={cn("text-xl font-bold font-mono mt-0.5", s.color)}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Upload dropzone */}
      <UploadDropzone onUpload={handleUpload} />

      {/* Filter bar */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search files, uploader, data type…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 text-sm"
          />
        </div>
        <Select
          value={statusFilter}
          onValueChange={(v) => setStatusFilter(v as "all" | UploadStatus)}
        >
          <SelectTrigger className="w-36 text-sm">
            <SelectValue placeholder="All statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="validated">Validated</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="error">Error</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
        <span className="text-sm text-muted-foreground shrink-0">
          {displayed.length} {displayed.length === 1 ? "file" : "files"}
        </span>
      </div>

      {/* Table */}
      <div className="linear-card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead
                  className="bg-muted/50 text-xs font-medium text-muted-foreground cursor-pointer select-none hover:text-foreground transition-colors duration-100"
                  onClick={() => handleSort("fileName")}
                >
                  <div className="flex items-center gap-1">
                    File Name <SortIcon col="fileName" />
                  </div>
                </TableHead>
                <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground">
                  Data Type
                </TableHead>
                <TableHead
                  className="bg-muted/50 text-xs font-medium text-muted-foreground cursor-pointer select-none hover:text-foreground transition-colors duration-100"
                  onClick={() => handleSort("uploadedBy")}
                >
                  <div className="flex items-center gap-1">
                    Uploaded By <SortIcon col="uploadedBy" />
                  </div>
                </TableHead>
                <TableHead
                  className="bg-muted/50 text-xs font-medium text-muted-foreground cursor-pointer select-none hover:text-foreground transition-colors duration-100 text-right"
                  onClick={() => handleSort("rowCount")}
                >
                  <div className="flex items-center justify-end gap-1">
                    Rows <SortIcon col="rowCount" />
                  </div>
                </TableHead>
                <TableHead
                  className="bg-muted/50 text-xs font-medium text-muted-foreground cursor-pointer select-none hover:text-foreground transition-colors duration-100"
                  onClick={() => handleSort("status")}
                >
                  <div className="flex items-center gap-1">
                    Status <SortIcon col="status" />
                  </div>
                </TableHead>
                <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground">
                  Linked Batch
                </TableHead>
                <TableHead
                  className="bg-muted/50 text-xs font-medium text-muted-foreground cursor-pointer select-none hover:text-foreground transition-colors duration-100"
                  onClick={() => handleSort("uploadedAt")}
                >
                  <div className="flex items-center gap-1">
                    Uploaded <SortIcon col="uploadedAt" />
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayed.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="h-24 text-center text-sm text-muted-foreground"
                  >
                    No uploads match this filter.
                  </TableCell>
                </TableRow>
              ) : (
                displayed.map((u) => (
                  <TableRow
                    key={u.id}
                    className="hover:bg-[color:var(--surface-hover)] transition-colors duration-100"
                  >
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <FileTypePill type={u.fileType} />
                        <span className="text-sm font-mono text-foreground/80 truncate max-w-[200px]">
                          {u.fileName}
                        </span>
                      </div>
                      {u.errorMessage && (
                        <p className="text-[11px] text-destructive mt-0.5 font-mono">
                          {u.errorMessage}
                        </p>
                      )}
                    </TableCell>
                    <TableCell>
                      <DataTypeBadge type={u.dataType} />
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {u.uploadedBy}
                    </TableCell>
                    <TableCell className="text-right font-mono text-sm tabular-nums">
                      {u.rowCount > 0 ? u.rowCount.toLocaleString() : "—"}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={u.status} />
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {batchName(u.batchId) ?? (
                        <span className="text-muted-foreground/50">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-xs font-mono text-muted-foreground whitespace-nowrap">
                      {formatDate(u.uploadedAt)}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
