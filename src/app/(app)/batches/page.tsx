"use client";

import { useState, useMemo } from "react";
import { batches } from "@/data/mock-data";
import type { FermentationBatch, BatchStatus, FermentationStage } from "@/lib/types";
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
import { ChevronUp, ChevronDown, ChevronRight, Search, Download } from "lucide-react";
import { cn } from "@/lib/utils";

type SortKey = keyof Pick<
  FermentationBatch,
  "batchName" | "stage" | "status" | "currentTemp" | "alcoholContent" | "nihonshuDo" | "lastUpdated"
>;

// ── Status Badge ───────────────────────────────────────────────

function StatusBadge({ status }: { status: BatchStatus }) {
  const config: Record<BatchStatus, { label: string; color: string }> = {
    active:     { label: "Active",     color: "text-[color:var(--success)] bg-[color:var(--success)]/10" },
    monitoring: { label: "Monitoring", color: "text-[color:var(--warning)] bg-[color:var(--warning)]/10" },
    complete:   { label: "Complete",   color: "text-primary bg-primary/10" },
    flagged:    { label: "Flagged",    color: "text-destructive bg-destructive/10" },
    archived:   { label: "Archived",   color: "text-muted-foreground bg-muted" },
  };
  const c = config[status];
  return (
    <Badge variant="outline" className={cn("text-xs font-medium border-0 rounded-full", c.color)}>
      {c.label}
    </Badge>
  );
}

// ── Stage Badge ────────────────────────────────────────────────

const stageLabels: Record<FermentationStage, string> = {
  shubo:    "Shubo",
  hatsuzoe: "Hatsuzoe",
  nakazoe:  "Nakazoe",
  tomezoe:  "Tomezoe",
  moromi:   "Moromi",
  pressing: "Pressing",
  complete: "Complete",
};

function StagePill({ stage }: { stage: FermentationStage }) {
  return (
    <span className="text-xs font-mono text-muted-foreground bg-muted/50 border border-border/40 px-2 py-0.5 rounded">
      {stageLabels[stage]}
    </span>
  );
}

// ── Expanded Row Detail ────────────────────────────────────────

function BatchDetail({ batch }: { batch: FermentationBatch }) {
  return (
    <TableRow>
      <TableCell colSpan={8} className="bg-muted/30 px-6 py-4 border-b border-border/40">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-3 text-sm mb-3">
          <div>
            <p className="text-[11px] text-muted-foreground uppercase tracking-wide mb-0.5">Rice Variety</p>
            <p className="font-medium">{batch.riceVariety}</p>
          </div>
          <div>
            <p className="text-[11px] text-muted-foreground uppercase tracking-wide mb-0.5">Koji Strain</p>
            <p className="font-medium font-mono text-xs">{batch.kojiStrain}</p>
          </div>
          <div>
            <p className="text-[11px] text-muted-foreground uppercase tracking-wide mb-0.5">Yeast Strain</p>
            <p className="font-medium font-mono text-xs">{batch.yeastStrain}</p>
          </div>
          <div>
            <p className="text-[11px] text-muted-foreground uppercase tracking-wide mb-0.5">Target Temp</p>
            <p className="font-medium font-mono">{batch.targetTemp}°C</p>
          </div>
          <div>
            <p className="text-[11px] text-muted-foreground uppercase tracking-wide mb-0.5">San-do</p>
            <p className="font-medium font-mono">{batch.sanDo}</p>
          </div>
          <div>
            <p className="text-[11px] text-muted-foreground uppercase tracking-wide mb-0.5">Amino-do</p>
            <p className="font-medium font-mono">{batch.aminoDo}</p>
          </div>
          <div>
            <p className="text-[11px] text-muted-foreground uppercase tracking-wide mb-0.5">Start Date</p>
            <p className="font-medium">{batch.startDate}</p>
          </div>
          <div>
            <p className="text-[11px] text-muted-foreground uppercase tracking-wide mb-0.5">Target End Date</p>
            <p className="font-medium">{batch.targetEndDate}</p>
          </div>
        </div>
        {batch.notes && (
          <div className="border-t border-border/30 pt-3">
            <p className="text-[11px] text-muted-foreground uppercase tracking-wide mb-1">Toji Notes</p>
            <p className="text-sm text-foreground/80">{batch.notes}</p>
          </div>
        )}
      </TableCell>
    </TableRow>
  );
}

// ── Main Page ──────────────────────────────────────────────────

export default function BatchesPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | BatchStatus>("all");
  const [sortKey, setSortKey] = useState<SortKey>("lastUpdated");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const displayed = useMemo(() => {
    return [...batches]
      .filter((b) => {
        const matchesStatus = statusFilter === "all" || b.status === statusFilter;
        const q = search.toLowerCase();
        const matchesSearch =
          !q ||
          b.batchName.toLowerCase().includes(q) ||
          b.id.toLowerCase().includes(q) ||
          b.riceVariety.toLowerCase().includes(q) ||
          b.kojiStrain.toLowerCase().includes(q);
        return matchesStatus && matchesSearch;
      })
      .sort((a, b) => {
        const av = a[sortKey];
        const bv = b[sortKey];
        if (av < bv) return sortDir === "asc" ? -1 : 1;
        if (av > bv) return sortDir === "asc" ? 1 : -1;
        return 0;
      });
  }, [search, statusFilter, sortKey, sortDir]);

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

  function formatLastUpdated(iso: string) {
    return new Date(iso).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <div className="page-container space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Batch Monitor</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Track fermentation progress across all active, monitoring, and archived batches
          </p>
        </div>
        <Button variant="outline" size="sm" className="shrink-0">
          <Download className="w-4 h-4 mr-2" />
          Export Batch Log
        </Button>
      </div>

      {/* Filter bar */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search batches, rice variety, koji strain…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 text-sm"
          />
        </div>
        <Select
          value={statusFilter}
          onValueChange={(v) => setStatusFilter(v as "all" | BatchStatus)}
        >
          <SelectTrigger className="w-40 text-sm">
            <SelectValue placeholder="All statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="monitoring">Monitoring</SelectItem>
            <SelectItem value="flagged">Flagged</SelectItem>
            <SelectItem value="complete">Complete</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
        <span className="text-sm text-muted-foreground shrink-0">
          {displayed.length} {displayed.length === 1 ? "batch" : "batches"}
        </span>
      </div>

      {/* Table */}
      <div className="linear-card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="bg-muted/50 w-8" />
                <TableHead
                  className="bg-muted/50 text-xs font-medium text-muted-foreground cursor-pointer select-none hover:text-foreground transition-colors duration-100"
                  onClick={() => handleSort("batchName")}
                >
                  <div className="flex items-center gap-1">
                    Batch Name <SortIcon col="batchName" />
                  </div>
                </TableHead>
                <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground">
                  Rice Variety
                </TableHead>
                <TableHead
                  className="bg-muted/50 text-xs font-medium text-muted-foreground cursor-pointer select-none hover:text-foreground transition-colors duration-100"
                  onClick={() => handleSort("stage")}
                >
                  <div className="flex items-center gap-1">
                    Stage <SortIcon col="stage" />
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
                <TableHead
                  className="bg-muted/50 text-xs font-medium text-muted-foreground cursor-pointer select-none hover:text-foreground transition-colors duration-100 text-right"
                  onClick={() => handleSort("currentTemp")}
                >
                  <div className="flex items-center justify-end gap-1">
                    Temp (°C) <SortIcon col="currentTemp" />
                  </div>
                </TableHead>
                <TableHead
                  className="bg-muted/50 text-xs font-medium text-muted-foreground cursor-pointer select-none hover:text-foreground transition-colors duration-100 text-right"
                  onClick={() => handleSort("alcoholContent")}
                >
                  <div className="flex items-center justify-end gap-1">
                    ABV % <SortIcon col="alcoholContent" />
                  </div>
                </TableHead>
                <TableHead
                  className="bg-muted/50 text-xs font-medium text-muted-foreground cursor-pointer select-none hover:text-foreground transition-colors duration-100 text-right"
                  onClick={() => handleSort("nihonshuDo")}
                >
                  <div className="flex items-center justify-end gap-1">
                    SMV <SortIcon col="nihonshuDo" />
                  </div>
                </TableHead>
                <TableHead
                  className="bg-muted/50 text-xs font-medium text-muted-foreground cursor-pointer select-none hover:text-foreground transition-colors duration-100 whitespace-nowrap"
                  onClick={() => handleSort("lastUpdated")}
                >
                  <div className="flex items-center gap-1">
                    Last Updated <SortIcon col="lastUpdated" />
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayed.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={9}
                    className="h-32 text-center text-sm text-muted-foreground"
                  >
                    No batches match this filter.
                  </TableCell>
                </TableRow>
              ) : (
                displayed.flatMap((batch) => [
                  <TableRow
                    key={batch.id}
                    className="cursor-pointer hover:bg-[color:var(--surface-hover)] transition-colors duration-100"
                    onClick={() =>
                      setExpandedId(expandedId === batch.id ? null : batch.id)
                    }
                  >
                    <TableCell className="w-8 pl-4">
                      <ChevronRight
                        className={cn(
                          "w-4 h-4 text-muted-foreground transition-transform duration-100",
                          expandedId === batch.id && "rotate-90"
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm font-medium">{batch.batchName}</p>
                        <p className="text-xs font-mono text-muted-foreground">{batch.id}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {batch.riceVariety}
                    </TableCell>
                    <TableCell>
                      <StagePill stage={batch.stage} />
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={batch.status} />
                    </TableCell>
                    <TableCell className="text-right font-mono text-sm">
                      <span
                        className={cn(
                          batch.currentTemp > batch.targetTemp + 0.5
                            ? "text-destructive"
                            : "text-foreground"
                        )}
                      >
                        {batch.currentTemp.toFixed(1)}
                      </span>
                    </TableCell>
                    <TableCell className="text-right font-mono text-sm tabular-nums">
                      {batch.alcoholContent.toFixed(1)}
                    </TableCell>
                    <TableCell className="text-right font-mono text-sm tabular-nums">
                      {batch.nihonshuDo > 0 ? "+" : ""}
                      {batch.nihonshuDo.toFixed(1)}
                    </TableCell>
                    <TableCell className="text-xs font-mono text-muted-foreground whitespace-nowrap">
                      {formatLastUpdated(batch.lastUpdated)}
                    </TableCell>
                  </TableRow>,
                  expandedId === batch.id ? (
                    <BatchDetail key={`${batch.id}-detail`} batch={batch} />
                  ) : null,
                ])
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
