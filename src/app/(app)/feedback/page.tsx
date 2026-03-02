"use client";

import { useState, useMemo } from "react";
import { feedback, batches } from "@/data/mock-data";
import type { FeedbackEntry } from "@/lib/types";
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
import { Textarea } from "@/components/ui/textarea";
import { ChevronUp, ChevronDown, Send, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

type FeedbackCategory = FeedbackEntry["category"];
type FeedbackStatus = FeedbackEntry["status"];
type SortKey = keyof Pick<FeedbackEntry, "submittedBy" | "category" | "status" | "submittedAt">;

// ── Category Badge ─────────────────────────────────────────────

function CategoryBadge({ category }: { category: FeedbackCategory }) {
  const config: Record<FeedbackCategory, { label: string; color: string }> = {
    "model-accuracy":  { label: "Model Accuracy",  color: "text-primary bg-primary/10" },
    "feature-request": { label: "Feature Request", color: "text-[color:var(--warning)] bg-[color:var(--warning)]/10" },
    "data-quality":    { label: "Data Quality",    color: "text-[color:var(--success)] bg-[color:var(--success)]/10" },
    "ui-ux":           { label: "UI / UX",         color: "text-muted-foreground bg-muted" },
    "general":         { label: "General",         color: "text-muted-foreground bg-muted" },
  };
  const c = config[category];
  return (
    <Badge variant="outline" className={cn("text-xs font-medium border-0 rounded-full", c.color)}>
      {c.label}
    </Badge>
  );
}

// ── Status Badge ───────────────────────────────────────────────

function StatusBadge({ status }: { status: FeedbackStatus }) {
  const config: Record<FeedbackStatus, { label: string; color: string }> = {
    new:      { label: "New",      color: "text-[color:var(--warning)] bg-[color:var(--warning)]/10" },
    reviewed: { label: "Reviewed", color: "text-primary bg-primary/10" },
    resolved: { label: "Resolved", color: "text-[color:var(--success)] bg-[color:var(--success)]/10" },
  };
  const c = config[status];
  return (
    <Badge variant="outline" className={cn("text-xs font-medium border-0 rounded-full", c.color)}>
      {c.label}
    </Badge>
  );
}

// ── Feedback Form ──────────────────────────────────────────────

interface FeedbackFormProps {
  onSubmit: (entry: Omit<FeedbackEntry, "id" | "submittedAt" | "status">) => void;
}

function FeedbackForm({ onSubmit }: FeedbackFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [batchId, setBatchId] = useState("none");
  const [category, setCategory] = useState<FeedbackCategory>("general");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit() {
    if (!name.trim() || !email.trim() || !message.trim()) return;
    onSubmit({
      submittedBy: name.trim(),
      email: email.trim(),
      batchId: batchId !== "none" ? batchId : undefined,
      category,
      message: message.trim(),
    });
    setName("");
    setEmail("");
    setBatchId("none");
    setCategory("general");
    setMessage("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  }

  return (
    <div className="linear-card" style={{ padding: "var(--card-padding)" }}>
      <h2 className="text-base font-semibold mb-4">Submit Feedback</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label className="text-xs font-medium text-muted-foreground">Name</Label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="text-sm"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs font-medium text-muted-foreground">Email</Label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="text-sm"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs font-medium text-muted-foreground">
            Related Batch (optional)
          </Label>
          <Select value={batchId} onValueChange={setBatchId}>
            <SelectTrigger className="text-sm">
              <SelectValue placeholder="Select batch" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">No specific batch</SelectItem>
              {batches.map((b) => (
                <SelectItem key={b.id} value={b.id}>
                  {b.batchName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs font-medium text-muted-foreground">Category</Label>
          <Select value={category} onValueChange={(v) => setCategory(v as FeedbackCategory)}>
            <SelectTrigger className="text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="model-accuracy">Model Accuracy</SelectItem>
              <SelectItem value="feature-request">Feature Request</SelectItem>
              <SelectItem value="data-quality">Data Quality</SelectItem>
              <SelectItem value="ui-ux">UI / UX</SelectItem>
              <SelectItem value="general">General</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <Label className="text-xs font-medium text-muted-foreground">Message</Label>
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Describe your observation, request, or issue in detail…"
            className="text-sm resize-none"
            rows={4}
          />
        </div>
      </div>
      <div className="flex items-center gap-3 mt-4">
        <Button
          onClick={handleSubmit}
          disabled={!name.trim() || !email.trim() || !message.trim()}
        >
          <Send className="w-4 h-4 mr-2" />
          Submit Feedback
        </Button>
        {submitted && (
          <p className="text-sm text-[color:var(--success)] font-medium transition-opacity duration-150">
            Feedback submitted — thank you.
          </p>
        )}
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────

let nextId = 9;

export default function FeedbackPage() {
  const [categoryFilter, setCategoryFilter] = useState<"all" | FeedbackCategory>("all");
  const [statusFilter, setStatusFilter] = useState<"all" | FeedbackStatus>("all");
  const [sortKey, setSortKey] = useState<SortKey>("submittedAt");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [entries, setEntries] = useState<FeedbackEntry[]>(feedback);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  function handleNewFeedback(data: Omit<FeedbackEntry, "id" | "submittedAt" | "status">) {
    const newEntry: FeedbackEntry = {
      ...data,
      id: `F-00${nextId++}`,
      submittedAt: new Date().toISOString(),
      status: "new",
    };
    setEntries((prev) => [newEntry, ...prev]);
  }

  function markStatus(id: string, status: FeedbackStatus) {
    setEntries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status } : e))
    );
  }

  const displayed = useMemo(() => {
    return [...entries]
      .filter((e) => {
        const matchesCat = categoryFilter === "all" || e.category === categoryFilter;
        const matchesSt = statusFilter === "all" || e.status === statusFilter;
        return matchesCat && matchesSt;
      })
      .sort((a, b) => {
        const av = a[sortKey] ?? "";
        const bv = b[sortKey] ?? "";
        if (av < bv) return sortDir === "asc" ? -1 : 1;
        if (av > bv) return sortDir === "asc" ? 1 : -1;
        return 0;
      });
  }, [entries, categoryFilter, statusFilter, sortKey, sortDir]);

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

  function batchLabel(id?: string) {
    if (!id) return null;
    return batches.find((b) => b.id === id)?.batchName ?? id;
  }

  // Summary stats
  const newCount = entries.filter((e) => e.status === "new").length;
  const reviewedCount = entries.filter((e) => e.status === "reviewed").length;
  const resolvedCount = entries.filter((e) => e.status === "resolved").length;

  return (
    <div className="page-container space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Feedback</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Collect and track model accuracy reports, feature requests, and data quality observations
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs border-border/60">
            <MessageSquare className="w-3 h-3 mr-1" />
            {entries.length} total
          </Badge>
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "New", value: newCount, color: "text-[color:var(--warning)]" },
          { label: "Reviewed", value: reviewedCount, color: "text-primary" },
          { label: "Resolved", value: resolvedCount, color: "text-[color:var(--success)]" },
        ].map((s) => (
          <div key={s.label} className="linear-card" style={{ padding: "var(--card-padding)" }}>
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className={cn("text-xl font-bold font-mono mt-0.5", s.color)}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Submission form */}
      <FeedbackForm onSubmit={handleNewFeedback} />

      {/* Table of entries */}
      <div className="space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h2 className="text-base font-semibold">All Submissions</h2>
          <div className="flex items-center gap-2 flex-wrap">
            <Select
              value={categoryFilter}
              onValueChange={(v) => setCategoryFilter(v as "all" | FeedbackCategory)}
            >
              <SelectTrigger className="w-40 h-8 text-xs">
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All categories</SelectItem>
                <SelectItem value="model-accuracy">Model Accuracy</SelectItem>
                <SelectItem value="feature-request">Feature Request</SelectItem>
                <SelectItem value="data-quality">Data Quality</SelectItem>
                <SelectItem value="ui-ux">UI / UX</SelectItem>
                <SelectItem value="general">General</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={statusFilter}
              onValueChange={(v) => setStatusFilter(v as "all" | FeedbackStatus)}
            >
              <SelectTrigger className="w-32 h-8 text-xs">
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="reviewed">Reviewed</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-xs text-muted-foreground shrink-0">
              {displayed.length} {displayed.length === 1 ? "entry" : "entries"}
            </span>
          </div>
        </div>

        <div className="linear-card p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead
                    className="bg-muted/50 text-xs font-medium text-muted-foreground cursor-pointer select-none hover:text-foreground transition-colors duration-100"
                    onClick={() => handleSort("submittedBy")}
                  >
                    <div className="flex items-center gap-1">
                      Submitted By <SortIcon col="submittedBy" />
                    </div>
                  </TableHead>
                  <TableHead
                    className="bg-muted/50 text-xs font-medium text-muted-foreground cursor-pointer select-none hover:text-foreground transition-colors duration-100"
                    onClick={() => handleSort("category")}
                  >
                    <div className="flex items-center gap-1">
                      Category <SortIcon col="category" />
                    </div>
                  </TableHead>
                  <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground">
                    Batch
                  </TableHead>
                  <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground">
                    Message
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
                    className="bg-muted/50 text-xs font-medium text-muted-foreground cursor-pointer select-none hover:text-foreground transition-colors duration-100"
                    onClick={() => handleSort("submittedAt")}
                  >
                    <div className="flex items-center gap-1">
                      Date <SortIcon col="submittedAt" />
                    </div>
                  </TableHead>
                  <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground">
                    Actions
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
                      No feedback entries match this filter.
                    </TableCell>
                  </TableRow>
                ) : (
                  displayed.flatMap((entry) => [
                    <TableRow
                      key={entry.id}
                      className="cursor-pointer hover:bg-[color:var(--surface-hover)] transition-colors duration-100"
                      onClick={() =>
                        setExpandedId(expandedId === entry.id ? null : entry.id)
                      }
                    >
                      <TableCell>
                        <div>
                          <p className="text-sm font-medium">{entry.submittedBy}</p>
                          <p className="text-xs font-mono text-muted-foreground">{entry.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <CategoryBadge category={entry.category} />
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {batchLabel(entry.batchId) ?? (
                          <span className="text-muted-foreground/40">—</span>
                        )}
                      </TableCell>
                      <TableCell className="max-w-[260px]">
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {entry.message}
                        </p>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={entry.status} />
                      </TableCell>
                      <TableCell className="text-xs font-mono text-muted-foreground whitespace-nowrap">
                        {formatDate(entry.submittedAt)}
                      </TableCell>
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center gap-1">
                          {entry.status === "new" && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 text-xs px-2"
                              onClick={() => markStatus(entry.id, "reviewed")}
                            >
                              Mark Reviewed
                            </Button>
                          )}
                          {entry.status === "reviewed" && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 text-xs px-2 text-[color:var(--success)] hover:text-[color:var(--success)]"
                              onClick={() => markStatus(entry.id, "resolved")}
                            >
                              Resolve
                            </Button>
                          )}
                          {entry.status === "resolved" && (
                            <span className="text-xs text-[color:var(--success)] font-medium px-2">
                              Resolved
                            </span>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>,
                    expandedId === entry.id ? (
                      <TableRow key={`${entry.id}-expanded`}>
                        <TableCell
                          colSpan={7}
                          className="bg-muted/30 px-6 py-4 border-b border-border/40"
                        >
                          <p className="text-[11px] text-muted-foreground uppercase tracking-wide mb-2">
                            Full Message
                          </p>
                          <p className="text-sm text-foreground/80 leading-relaxed">
                            {entry.message}
                          </p>
                        </TableCell>
                      </TableRow>
                    ) : null,
                  ])
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
