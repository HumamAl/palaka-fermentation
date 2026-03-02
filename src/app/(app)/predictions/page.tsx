"use client";

import { useState, useMemo } from "react";
import { predictions, batches } from "@/data/mock-data";
import type { PredictionResult } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { FlaskConical, ChevronUp, ChevronDown, ArrowRightLeft, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

type PredictionMode = "forward" | "inverse";
type SortKey = keyof Pick<PredictionResult, "timestamp" | "confidence" | "direction">;
type SortDir = "asc" | "desc";

// ── Helpers ────────────────────────────────────────────────────

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function ConfidenceBadge({ value }: { value: number }) {
  const pct = Math.round(value * 100);
  const color =
    value >= 0.85
      ? "text-[color:var(--success)] bg-[color:var(--success)]/10"
      : value >= 0.7
      ? "text-[color:var(--warning)] bg-[color:var(--warning)]/10"
      : "text-destructive bg-destructive/10";
  return (
    <Badge
      variant="outline"
      className={cn("text-xs font-medium border-0 rounded-full font-mono", color)}
    >
      {pct}%
    </Badge>
  );
}

function DirectionBadge({ direction }: { direction: "forward" | "inverse" }) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "text-xs font-medium border-0 rounded-full",
        direction === "forward"
          ? "text-primary bg-primary/10"
          : "text-[color:var(--warning)] bg-[color:var(--warning)]/10"
      )}
    >
      {direction === "forward" ? "Forward" : "Inverse"}
    </Badge>
  );
}

// ── Forward Prediction Form ────────────────────────────────────

interface ForwardResult {
  alcoholContent: number;
  nihonshuDo: number;
  targetDays: number;
  confidence: number;
}

function ForwardPredictionForm() {
  const [temp, setTemp] = useState("8.5");
  const [ph, setPh] = useState("4.2");
  const [kojiStrain, setKojiStrain] = useState("K-7");
  const [yeastStrain, setYeastStrain] = useState("Kyokai No. 9");
  const [polishRatio, setPolishRatio] = useState("0.40");
  const [result, setResult] = useState<ForwardResult | null>(null);
  const [running, setRunning] = useState(false);

  function runPrediction() {
    setRunning(true);
    setResult(null);
    // Simulate async model call
    setTimeout(() => {
      const tempF = parseFloat(temp) || 8.5;
      const phF = parseFloat(ph) || 4.2;
      const polishF = parseFloat(polishRatio) || 0.4;
      // Deterministic mock formula
      const abv = 14.5 + (10 - tempF) * 0.15 + (4.5 - phF) * 0.2;
      const smv = 3.0 + (polishF - 0.4) * 5 + (tempF - 8.5) * -0.3;
      const days = Math.round(35 - (tempF - 5) * 1.5);
      const conf = 0.78 + (kojiStrain === "K-7" ? 0.08 : 0.04) + Math.random() * 0.05;
      setResult({
        alcoholContent: parseFloat(abv.toFixed(1)),
        nihonshuDo: parseFloat(smv.toFixed(1)),
        targetDays: Math.max(10, days),
        confidence: Math.min(0.99, conf),
      });
      setRunning(false);
    }, 900);
  }

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label className="text-xs font-medium text-muted-foreground">
            Moromi Temperature (°C)
          </Label>
          <Input
            value={temp}
            onChange={(e) => setTemp(e.target.value)}
            placeholder="e.g. 8.5"
            className="font-mono text-sm"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs font-medium text-muted-foreground">
            Current pH
          </Label>
          <Input
            value={ph}
            onChange={(e) => setPh(e.target.value)}
            placeholder="e.g. 4.2"
            className="font-mono text-sm"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs font-medium text-muted-foreground">
            Koji Strain
          </Label>
          <Select value={kojiStrain} onValueChange={setKojiStrain}>
            <SelectTrigger className="text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="K-7">Aspergillus oryzae K-7</SelectItem>
              <SelectItem value="K-1">Aspergillus oryzae K-1</SelectItem>
              <SelectItem value="K-9">Aspergillus oryzae K-9</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs font-medium text-muted-foreground">
            Yeast Strain
          </Label>
          <Select value={yeastStrain} onValueChange={setYeastStrain}>
            <SelectTrigger className="text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Kyokai No. 9">Kyokai No. 9</SelectItem>
              <SelectItem value="Kyokai No. 7">Kyokai No. 7</SelectItem>
              <SelectItem value="Kyokai No. 1801">Kyokai No. 1801</SelectItem>
              <SelectItem value="Kyokai No. 14">Kyokai No. 14</SelectItem>
              <SelectItem value="Kyokai No. 77">Kyokai No. 77</SelectItem>
              <SelectItem value="Natural (wild)">Natural (wild)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <Label className="text-xs font-medium text-muted-foreground">
            Rice Polish Ratio (seimaibuai)
          </Label>
          <Input
            value={polishRatio}
            onChange={(e) => setPolishRatio(e.target.value)}
            placeholder="e.g. 0.40 (daiginjo = 0.50 or less)"
            className="font-mono text-sm"
          />
        </div>
      </div>

      <Button
        onClick={runPrediction}
        disabled={running}
        className="w-full sm:w-auto"
      >
        <Zap className="w-4 h-4 mr-2" />
        {running ? "Running Model…" : "Run Forward Prediction"}
      </Button>

      {result && (
        <div className="linear-card p-4 border-primary/20 bg-primary/[0.03] space-y-3">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Predicted Final Product Profile
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <p className="text-[11px] text-muted-foreground">Final ABV</p>
              <p className="text-xl font-bold font-mono text-primary">
                {result.alcoholContent}%
              </p>
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">Nihonshu-do (SMV)</p>
              <p className="text-xl font-bold font-mono text-primary">
                {result.nihonshuDo > 0 ? "+" : ""}{result.nihonshuDo}
              </p>
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">Days to Press</p>
              <p className="text-xl font-bold font-mono text-primary">
                {result.targetDays}d
              </p>
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">Confidence</p>
              <p className="text-xl font-bold font-mono text-primary">
                {Math.round(result.confidence * 100)}%
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Inverse Prediction Form ────────────────────────────────────

interface InverseResult {
  targetTemp: number;
  kojiRatio: number;
  fermentDuration: number;
  polishRatio: number;
  confidence: number;
}

function InversePredictionForm() {
  const [targetAbv, setTargetAbv] = useState("16.0");
  const [targetSmv, setTargetSmv] = useState("4.5");
  const [targetSanDo, setTargetSanDo] = useState("1.3");
  const [result, setResult] = useState<InverseResult | null>(null);
  const [running, setRunning] = useState(false);

  function runPrediction() {
    setRunning(true);
    setResult(null);
    setTimeout(() => {
      const abvF = parseFloat(targetAbv) || 16;
      const smvF = parseFloat(targetSmv) || 4.5;
      const sanDoF = parseFloat(targetSanDo) || 1.3;
      const temp = 9.5 - (abvF - 14) * 0.3 - (smvF - 3) * 0.2;
      const polish = 0.50 - (smvF - 3) * 0.02;
      const duration = 35 + (abvF - 15) * 3;
      const kojiRatio = 0.22 - (sanDoF - 1.3) * 0.02;
      const conf = 0.82 + Math.random() * 0.08;
      setResult({
        targetTemp: parseFloat(Math.max(5, temp).toFixed(1)),
        kojiRatio: parseFloat(Math.max(0.15, kojiRatio).toFixed(2)),
        fermentDuration: Math.round(Math.max(20, duration)),
        polishRatio: parseFloat(Math.max(0.35, Math.min(0.65, polish)).toFixed(2)),
        confidence: Math.min(0.99, conf),
      });
      setRunning(false);
    }, 900);
  }

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-1.5">
          <Label className="text-xs font-medium text-muted-foreground">
            Target ABV (%)
          </Label>
          <Input
            value={targetAbv}
            onChange={(e) => setTargetAbv(e.target.value)}
            placeholder="e.g. 16.0"
            className="font-mono text-sm"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs font-medium text-muted-foreground">
            Target Nihonshu-do (SMV)
          </Label>
          <Input
            value={targetSmv}
            onChange={(e) => setTargetSmv(e.target.value)}
            placeholder="e.g. +4.5 (dry)"
            className="font-mono text-sm"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs font-medium text-muted-foreground">
            Target San-do (acidity)
          </Label>
          <Input
            value={targetSanDo}
            onChange={(e) => setTargetSanDo(e.target.value)}
            placeholder="e.g. 1.3"
            className="font-mono text-sm"
          />
        </div>
      </div>

      <Button
        onClick={runPrediction}
        disabled={running}
        className="w-full sm:w-auto"
        variant="outline"
      >
        <ArrowRightLeft className="w-4 h-4 mr-2" />
        {running ? "Solving Parameters…" : "Run Inverse Prediction"}
      </Button>

      {result && (
        <div className="linear-card p-4 border-primary/20 bg-primary/[0.03] space-y-3">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Recommended Process Parameters
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <p className="text-[11px] text-muted-foreground">Moromi Temp</p>
              <p className="text-xl font-bold font-mono text-primary">
                {result.targetTemp}°C
              </p>
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">Koji Ratio</p>
              <p className="text-xl font-bold font-mono text-primary">
                {result.kojiRatio}
              </p>
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">Ferment Duration</p>
              <p className="text-xl font-bold font-mono text-primary">
                {result.fermentDuration}d
              </p>
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">Seimaibuai</p>
              <p className="text-xl font-bold font-mono text-primary">
                {result.polishRatio}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 pt-1">
            <p className="text-xs text-muted-foreground">Model confidence:</p>
            <ConfidenceBadge value={result.confidence} />
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────

export default function PredictionsPage() {
  const [mode, setMode] = useState<PredictionMode>("forward");
  const [dirFilter, setDirFilter] = useState<"all" | "forward" | "inverse">("all");
  const [sortKey, setSortKey] = useState<SortKey>("timestamp");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const displayed = useMemo(() => {
    return [...predictions]
      .filter((p) => dirFilter === "all" || p.direction === dirFilter)
      .sort((a, b) => {
        let av: string | number = a[sortKey];
        let bv: string | number = b[sortKey];
        if (sortKey === "confidence") {
          av = a.confidence;
          bv = b.confidence;
        }
        if (av < bv) return sortDir === "asc" ? -1 : 1;
        if (av > bv) return sortDir === "asc" ? 1 : -1;
        return 0;
      });
  }, [dirFilter, sortKey, sortDir]);

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  }

  function batchName(id: string) {
    return batches.find((b) => b.id === id)?.batchName ?? id;
  }

  return (
    <div className="page-container space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Model Predictions</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Run forward or inverse fermentation predictions using the Palaka ML model
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <Badge variant="outline" className="text-xs font-mono border-border/60">
            Model v1.2.3
          </Badge>
        </div>
      </div>

      {/* Mode toggle + form */}
      <div className="linear-card" style={{ padding: "var(--card-padding)" }}>
        <div className="flex items-center gap-1 p-1 bg-muted/50 rounded-lg w-fit mb-5">
          <button
            onClick={() => setMode("forward")}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-100",
              mode === "forward"
                ? "bg-background text-foreground border border-border/60"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <FlaskConical className="w-3.5 h-3.5" />
            Forward Prediction
          </button>
          <button
            onClick={() => setMode("inverse")}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-100",
              mode === "inverse"
                ? "bg-background text-foreground border border-border/60"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
            Inverse Prediction
          </button>
        </div>

        {mode === "forward" ? (
          <>
            <p className="text-xs text-muted-foreground mb-4">
              Input current moromi parameters to predict the final product profile (ABV, Nihonshu-do, days to press).
            </p>
            <ForwardPredictionForm />
          </>
        ) : (
          <>
            <p className="text-xs text-muted-foreground mb-4">
              Define your target product profile and receive recommended process parameters to achieve it.
            </p>
            <InversePredictionForm />
          </>
        )}
      </div>

      {/* Recent prediction history */}
      <div className="space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h2 className="text-base font-semibold">Prediction History</h2>
          <div className="flex items-center gap-2">
            <Select
              value={dirFilter}
              onValueChange={(v) => setDirFilter(v as "all" | "forward" | "inverse")}
            >
              <SelectTrigger className="w-36 h-8 text-xs">
                <SelectValue placeholder="All directions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All directions</SelectItem>
                <SelectItem value="forward">Forward only</SelectItem>
                <SelectItem value="inverse">Inverse only</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-xs text-muted-foreground">
              {displayed.length} result{displayed.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        <div className="linear-card p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground">
                    Batch
                  </TableHead>
                  <TableHead
                    className="bg-muted/50 text-xs font-medium text-muted-foreground cursor-pointer select-none hover:text-foreground transition-colors duration-100"
                    onClick={() => handleSort("direction")}
                  >
                    <div className="flex items-center gap-1">
                      Direction
                      {sortKey === "direction" &&
                        (sortDir === "asc" ? (
                          <ChevronUp className="w-3 h-3" />
                        ) : (
                          <ChevronDown className="w-3 h-3" />
                        ))}
                    </div>
                  </TableHead>
                  <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground">
                    Predicted Values
                  </TableHead>
                  <TableHead
                    className="bg-muted/50 text-xs font-medium text-muted-foreground cursor-pointer select-none hover:text-foreground transition-colors duration-100"
                    onClick={() => handleSort("confidence")}
                  >
                    <div className="flex items-center gap-1">
                      Confidence
                      {sortKey === "confidence" &&
                        (sortDir === "asc" ? (
                          <ChevronUp className="w-3 h-3" />
                        ) : (
                          <ChevronDown className="w-3 h-3" />
                        ))}
                    </div>
                  </TableHead>
                  <TableHead
                    className="bg-muted/50 text-xs font-medium text-muted-foreground cursor-pointer select-none hover:text-foreground transition-colors duration-100"
                    onClick={() => handleSort("timestamp")}
                  >
                    <div className="flex items-center gap-1">
                      Timestamp
                      {sortKey === "timestamp" &&
                        (sortDir === "asc" ? (
                          <ChevronUp className="w-3 h-3" />
                        ) : (
                          <ChevronDown className="w-3 h-3" />
                        ))}
                    </div>
                  </TableHead>
                  <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground">
                    Notes
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayed.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="h-24 text-center text-sm text-muted-foreground"
                    >
                      No predictions match this filter.
                    </TableCell>
                  </TableRow>
                ) : (
                  displayed.map((p) => (
                    <TableRow
                      key={p.id}
                      className="hover:bg-[color:var(--surface-hover)] transition-colors duration-100"
                    >
                      <TableCell className="text-sm font-medium">
                        {batchName(p.batchId)}
                      </TableCell>
                      <TableCell>
                        <DirectionBadge direction={p.direction} />
                      </TableCell>
                      <TableCell className="text-xs font-mono text-muted-foreground max-w-[200px]">
                        {Object.entries(p.predictedValues)
                          .map(([k, v]) => `${k}: ${typeof v === "number" ? v.toFixed(2) : v}`)
                          .join(" · ")}
                      </TableCell>
                      <TableCell>
                        <ConfidenceBadge value={p.confidence} />
                      </TableCell>
                      <TableCell className="text-xs font-mono text-muted-foreground whitespace-nowrap">
                        {formatDate(p.timestamp)}
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground max-w-[240px]">
                        <span className="line-clamp-2">{p.notes}</span>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
