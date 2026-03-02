"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import dynamic from "next/dynamic";
import { Badge } from "@/components/ui/badge";
import {
  dashboardStats,
  batches,
  predictions,
  batchTimeSeries,
} from "@/data/mock-data";
import type { FermentationBatch, PredictionResult, StatCard } from "@/lib/types";
import { APP_CONFIG } from "@/lib/config";

// ── SSR-safe chart import ────────────────────────────────────
const FermentationCurveChart = dynamic(
  () =>
    import("@/components/dashboard/fermentation-curve-chart").then(
      (m) => m.FermentationCurveChart
    ),
  {
    ssr: false,
    loading: () => (
      <div className="h-[280px] bg-muted/30 rounded-lg animate-pulse" />
    ),
  }
);

// ── Animated count-up hook ───────────────────────────────────
function useCountUp(target: number, duration: number = 1200) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const step = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
            else setCount(target);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

// ── Stat Card component ──────────────────────────────────────
function KpiCard({
  stat,
  index,
}: {
  stat: StatCard;
  index: number;
}) {
  const numericValue =
    typeof stat.value === "number"
      ? stat.value
      : parseFloat(stat.value as string);
  const isPercent = typeof stat.value === "string" && (stat.value as string).includes("%");

  const { count, ref } = useCountUp(
    isNaN(numericValue) ? 0 : numericValue
  );

  const trendColor =
    stat.trend === "up"
      ? "text-[color:var(--success)]"
      : stat.trend === "down"
      ? "text-[color:var(--destructive)]"
      : "text-muted-foreground";

  const displayValue = isPercent ? `${count}%` : count;

  return (
    <div
      ref={ref}
      className="aesthetic-card animate-fade-up-in"
      style={{
        padding: "var(--card-padding)",
        animationDelay: `${index * 50}ms`,
        animationDuration: "150ms",
      }}
    >
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
        {stat.label}
      </p>
      <p className="text-3xl font-bold font-mono tabular-nums mt-2 text-foreground">
        {displayValue}
      </p>
      {stat.change !== undefined && (
        <p className={`text-xs mt-1.5 ${trendColor}`}>
          {stat.change > 0 ? "+" : ""}
          {stat.change}
          {stat.trend === "up"
            ? " vs. last month · trending up"
            : stat.trend === "down"
            ? " vs. last month · trending down"
            : " vs. last month"}
        </p>
      )}
    </div>
  );
}

// ── Stage label mapping ──────────────────────────────────────
const STAGE_LABELS: Record<string, string> = {
  shubo: "Shubo (Starter)",
  hatsuzoe: "Hatsuzoe (1st Add.)",
  nakazoe: "Nakazoe (2nd Add.)",
  tomezoe: "Tomezoe (3rd Add.)",
  moromi: "Moromi (Main Mash)",
  pressing: "Pressing",
  complete: "Complete",
};

// ── Status badge styling ─────────────────────────────────────
function StatusBadge({ status }: { status: FermentationBatch["status"] }) {
  const config = {
    active: {
      label: "Active",
      className:
        "bg-[color:var(--success)]/10 text-[color:var(--success)] border-[color:var(--success)]/20",
    },
    monitoring: {
      label: "Monitoring",
      className:
        "bg-primary/10 text-primary border-primary/20",
    },
    flagged: {
      label: "Flagged",
      className:
        "bg-[color:var(--warning)]/10 text-[color:var(--warning)] border-[color:var(--warning)]/20",
    },
    complete: {
      label: "Complete",
      className:
        "bg-muted text-muted-foreground border-border/60",
    },
    archived: {
      label: "Archived",
      className:
        "bg-muted text-muted-foreground border-border/60",
    },
  };

  const { label, className } = config[status];
  return (
    <Badge
      variant="outline"
      className={`text-[10px] font-medium px-1.5 py-0.5 ${className}`}
    >
      {label}
    </Badge>
  );
}

// ── Confidence bar ───────────────────────────────────────────
function ConfidenceBar({ value }: { value: number }) {
  const pct = Math.round(value * 100);
  const color =
    pct >= 85
      ? "var(--success)"
      : pct >= 70
      ? "var(--warning)"
      : "var(--destructive)";
  return (
    <div className="flex items-center gap-2 min-w-0">
      <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
      <span className="text-xs font-mono tabular-nums text-muted-foreground shrink-0">
        {pct}%
      </span>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────
export default function DashboardPage() {
  const [stageFilter, setStageFilter] = useState<"all" | "active" | "flagged">(
    "all"
  );

  // Active batches for the table (exclude complete + archived)
  const displayedBatches: FermentationBatch[] = useMemo(() => {
    const live = batches.filter(
      (b) => b.status !== "archived" && b.status !== "complete"
    );
    if (stageFilter === "active")
      return live.filter((b) => b.status === "active");
    if (stageFilter === "flagged")
      return live.filter((b) => b.status === "flagged");
    return live;
  }, [stageFilter]);

  // Latest predictions (most recent first)
  const recentPredictions: PredictionResult[] = useMemo(
    () =>
      [...predictions]
        .sort(
          (a, b) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        )
        .slice(0, 5),
    []
  );

  return (
    <div className="page-container space-y-6">

      {/* ── Page Header ──────────────────────────────────────── */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight aesthetic-heading">
          Fermentation Control Center
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Live batch status, model predictions, and fermentation curve analysis
          · Batch B-2026-001 active
        </p>
      </div>

      {/* ── KPI Stat Cards ───────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {dashboardStats.map((stat, index) => (
          <KpiCard key={stat.label} stat={stat} index={index} />
        ))}
      </div>

      {/* ── Fermentation Curve + Recent Predictions (2-col) ──── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">

        {/* Primary chart */}
        <div className="aesthetic-card xl:col-span-2 overflow-hidden">
          <div
            style={{ padding: "var(--card-padding)" }}
            className="border-b border-border/60 pb-3"
          >
            <h2 className="text-sm font-semibold text-foreground">
              Moromi Fermentation Curve — B-2026-001
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Junmai Daiginjo #1 · Yamada Nishiki · Kyokai No. 9 · Day 19
            </p>
          </div>
          <div style={{ padding: "var(--card-padding)" }}>
            <FermentationCurveChart data={batchTimeSeries} />
          </div>
        </div>

        {/* Recent Predictions panel */}
        <div className="aesthetic-card overflow-hidden">
          <div
            style={{ padding: "var(--card-padding)" }}
            className="border-b border-border/60 pb-3"
          >
            <h2 className="text-sm font-semibold text-foreground">
              Recent Predictions
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Latest model outputs
            </p>
          </div>
          <div className="divide-y divide-border/50">
            {recentPredictions.map((pred) => {
              const batch = batches.find((b) => b.id === pred.batchId);
              return (
                <div
                  key={pred.id}
                  className="aesthetic-hover px-4 py-3"
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <p className="text-xs font-medium text-foreground leading-tight truncate max-w-[140px]">
                      {batch?.batchName ?? pred.batchId}
                    </p>
                    <Badge
                      variant="outline"
                      className={`text-[10px] font-medium px-1.5 py-0.5 shrink-0 ${
                        pred.direction === "forward"
                          ? "bg-primary/10 text-primary border-primary/20"
                          : "bg-[color:var(--chart-3)]/10 text-[color:var(--chart-5)] border-[color:var(--chart-5)]/20"
                      }`}
                    >
                      {pred.direction === "forward" ? "Forward" : "Inverse"}
                    </Badge>
                  </div>
                  <ConfidenceBar value={pred.confidence} />
                  <p className="text-[10px] text-muted-foreground mt-1 leading-relaxed line-clamp-2">
                    {pred.notes}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Active Batches Table ──────────────────────────────── */}
      <div className="aesthetic-card overflow-hidden">
        <div
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60"
          style={{ padding: "var(--card-padding)" }}
        >
          <div>
            <h2 className="text-sm font-semibold text-foreground">
              Active Moromi Batches
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Live fermentation status with key chemistry parameters
            </p>
          </div>
          {/* Filter tabs */}
          <div className="flex gap-1.5 shrink-0">
            {(
              [
                ["all", "All Batches"],
                ["active", "Active"],
                ["flagged", "Flagged"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                onClick={() => setStageFilter(value)}
                className={`px-3 py-1.5 text-xs rounded-md border transition-colors`}
                style={{
                  transitionDuration: "var(--dur-fast)",
                  backgroundColor:
                    stageFilter === value
                      ? "var(--primary)"
                      : "transparent",
                  color:
                    stageFilter === value
                      ? "var(--primary-foreground)"
                      : "var(--muted-foreground)",
                  borderColor:
                    stageFilter === value ? "var(--primary)" : "var(--border)",
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border/50">
                {[
                  "Batch",
                  "Stage",
                  "Status",
                  "Temp °C",
                  "pH",
                  "ABV %",
                  "SMV (日本酒度)",
                  "San-do",
                ].map((col) => (
                  <th
                    key={col}
                    className="text-left font-medium text-muted-foreground px-4 py-2.5 whitespace-nowrap"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {displayedBatches.map((batch) => {
                const tempDelta = batch.currentTemp - batch.targetTemp;
                const tempWarning = Math.abs(tempDelta) > 0.8;
                return (
                  <tr
                    key={batch.id}
                    className="aesthetic-hover"
                  >
                    <td className="px-4 py-3">
                      <p className="font-medium text-foreground">
                        {batch.batchName}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        {batch.id} · {batch.riceVariety}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                      {STAGE_LABELS[batch.stage] ?? batch.stage}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={batch.status} />
                    </td>
                    <td className="px-4 py-3 font-mono tabular-nums">
                      <span
                        className={
                          tempWarning
                            ? "text-[color:var(--warning)] font-semibold"
                            : "text-foreground"
                        }
                      >
                        {batch.currentTemp.toFixed(1)}
                      </span>
                      {tempWarning && (
                        <span className="ml-1 text-[10px] text-[color:var(--warning)]">
                          ({tempDelta > 0 ? "+" : ""}
                          {tempDelta.toFixed(1)})
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 font-mono tabular-nums text-foreground">
                      {batch.currentPh.toFixed(1)}
                    </td>
                    <td className="px-4 py-3 font-mono tabular-nums text-foreground">
                      {batch.alcoholContent.toFixed(1)}%
                    </td>
                    <td className="px-4 py-3 font-mono tabular-nums">
                      <span
                        className={
                          batch.nihonshuDo > 0
                            ? "text-[color:var(--chart-2)]"
                            : "text-[color:var(--chart-4)]"
                        }
                      >
                        {batch.nihonshuDo > 0 ? "+" : ""}
                        {batch.nihonshuDo.toFixed(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-mono tabular-nums text-foreground">
                      {batch.sanDo.toFixed(1)}
                    </td>
                  </tr>
                );
              })}
              {displayedBatches.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="px-4 py-8 text-center text-muted-foreground"
                  >
                    No batches match the current filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table footer note */}
        <div
          className="border-t border-border/50 text-[10px] text-muted-foreground"
          style={{ padding: "0.625rem var(--card-padding)" }}
        >
          SMV = Nihonshu-do (Sake Meter Value) · San-do = Acidity · Flagged
          batches require manual inspection · Temp delta shown when &gt; ±0.8°C
          from target
        </div>
      </div>

      {/* ── Proposal Banner ───────────────────────────────────── */}
      <div
        className="linear-card border-primary/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
        style={{
          padding: "var(--card-padding)",
          background:
            "linear-gradient(to right, color-mix(in oklch, var(--primary), transparent 92%), transparent)",
        }}
      >
        <div>
          <p className="text-sm font-medium text-foreground">
            This is a live demo built for{" "}
            {APP_CONFIG.clientName ?? APP_CONFIG.projectName}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Humam · Full-Stack Developer · Available now
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="/challenges"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            style={{ transitionDuration: "var(--dur-fast)" }}
          >
            My Approach →
          </a>
          <a
            href="/proposal"
            className="inline-flex items-center gap-1.5 text-xs font-medium bg-primary text-primary-foreground px-3 py-1.5 rounded-md hover:opacity-90 transition-opacity"
            style={{ transitionDuration: "var(--dur-fast)" }}
          >
            Work with me
          </a>
        </div>
      </div>
    </div>
  );
}
