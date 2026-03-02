"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  TrendingUp,
  Upload,
  FileText,
  Database,
  Server,
  Cpu,
  Monitor,
  ArrowLeftRight,
  FlaskConical,
  Dna,
  Microscope,
  Beaker,
  BarChart2,
} from "lucide-react";
import { challenges, executiveSummary } from "@/data/challenges";

// ── Executive Summary Banner ───────────────────────────────────────────────────

function ExecutiveSummary() {
  const { commonApproach, differentApproach, accentWord } = executiveSummary;

  const renderHighlighted = () => {
    if (!accentWord) return <span>{differentApproach}</span>;
    const escaped = accentWord.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const parts = differentApproach.split(new RegExp(`(${escaped})`, "i"));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === accentWord.toLowerCase() ? (
            <span key={i} className="text-primary font-semibold">
              {part}
            </span>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </>
    );
  };

  return (
    <div
      className="relative overflow-hidden rounded-lg p-6 md:p-8"
      style={{
        background: "oklch(0.10 0.02 var(--primary-h, 175))",
        backgroundImage:
          "radial-gradient(ellipse at 30% 50%, rgba(255,255,255,0.03), transparent 70%)",
      }}
    >
      <p className="text-sm md:text-base leading-relaxed text-white/50">
        {commonApproach}
      </p>
      <hr className="my-4 border-white/10" />
      <p className="text-base md:text-lg leading-relaxed font-medium text-white/90">
        {renderHighlighted()}
      </p>
      <p className="text-xs text-white/40 mt-4">
        {"← "}
        <Link
          href="/"
          className="hover:text-white/60 transition-colors duration-100 underline underline-offset-2"
        >
          See it in action
        </Link>
      </p>
    </div>
  );
}

// ── Outcome Statement ──────────────────────────────────────────────────────────

function OutcomeStatement({ outcome }: { outcome: string }) {
  return (
    <div
      className="flex items-start gap-2 rounded-md px-3 py-2"
      style={{
        backgroundColor: "color-mix(in oklch, var(--success) 6%, transparent)",
        borderColor: "color-mix(in oklch, var(--success) 15%, transparent)",
        borderWidth: "1px",
        borderStyle: "solid",
      }}
    >
      <TrendingUp className="h-4 w-4 mt-0.5 shrink-0 text-[color:var(--success)]" />
      <p className="text-sm font-medium text-[color:var(--success)]">
        {outcome}
      </p>
    </div>
  );
}

// ── Visualization 1: Architecture Diagram (interactive step-through) ───────────

function ArchitectureViz() {
  const [activeStep, setActiveStep] = useState(0);

  const nodes: {
    id: string;
    label: string;
    sublabel: string;
    type: "frontend" | "backend" | "ai";
    icon: typeof Monitor;
    detail: string;
  }[] = [
    {
      id: "ui",
      label: "Next.js UI",
      sublabel: "React form + typed hooks",
      type: "frontend",
      icon: Monitor,
      detail:
        "The form collects fermentation parameters with typed inputs. Both forward (parameters \u2192 outcome) and inverse (target \u2192 parameters) prediction modes are supported in the same interface.",
    },
    {
      id: "api-route",
      label: "API Route",
      sublabel: "/api/predict",
      type: "backend",
      icon: Server,
      detail:
        "A thin proxy layer in Next.js handles request validation against a shared Zod schema and forwards to FastAPI. No business logic lives here \u2014 it is purely a typed bridge with caching headers.",
    },
    {
      id: "fastapi",
      label: "FastAPI",
      sublabel: "Python 3.11 + pydantic",
      type: "backend",
      icon: Server,
      detail:
        "FastAPI receives the validated payload, applies preprocessing transforms (unit normalization, feature scaling), and invokes the trained model. Pydantic schemas on both ends prevent silent schema drift.",
    },
    {
      id: "model",
      label: "ML Model",
      sublabel: "Bidirectional inference",
      type: "ai",
      icon: Cpu,
      detail:
        "The model supports forward prediction (koji strain, temperature, rice variety \u2192 nihonshu-do, acidity, alcohol) and inverse prediction (target quality profile \u2192 required input parameters).",
    },
    {
      id: "result",
      label: "Prediction Result",
      sublabel: "Typed response + confidence",
      type: "frontend",
      icon: BarChart2,
      detail:
        "Results are returned with confidence intervals and model version metadata. The UI renders the prediction inline alongside historical batch data so the brewer can compare against past runs.",
    },
  ];

  const typeStyles: Record<string, string> = {
    frontend: "border-primary/30 bg-primary/8",
    backend: "border-border/60 bg-card",
    ai: "border-primary/40",
  };

  const activeNode = nodes[activeStep];

  return (
    <div className="space-y-3">
      {/* Node strip */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1.5 overflow-x-auto pb-1">
        {nodes.map((node, i) => {
          const Icon = node.icon;
          const isActive = i === activeStep;
          return (
            <div key={node.id} className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => setActiveStep(i)}
                className={[
                  "flex items-start gap-2 rounded-lg border px-2.5 py-2 text-left transition-all duration-100 cursor-pointer",
                  isActive
                    ? typeStyles[node.type] +
                      (node.type === "ai"
                        ? " bg-gradient-to-br from-primary/10 to-accent/10 ring-1 ring-primary/30"
                        : " ring-1 ring-primary/30")
                    : "border-border/60 bg-card hover:border-primary/20",
                ].join(" ")}
              >
                <Icon
                  className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${isActive ? "text-primary" : "text-muted-foreground"}`}
                />
                <div>
                  <p
                    className={`text-xs font-medium leading-tight ${isActive ? "text-foreground" : "text-muted-foreground"}`}
                  >
                    {node.label}
                  </p>
                  <p className="text-[10px] text-muted-foreground font-mono leading-tight mt-0.5">
                    {node.sublabel}
                  </p>
                </div>
              </button>
              {i < nodes.length - 1 && (
                <ArrowRight className="w-3 h-3 text-muted-foreground/40 shrink-0 hidden sm:block" />
              )}
            </div>
          );
        })}
      </div>

      {/* Detail panel */}
      <div
        className="rounded-lg px-4 py-3 border"
        style={{
          backgroundColor: "color-mix(in oklch, var(--primary) 4%, transparent)",
          borderColor: "color-mix(in oklch, var(--primary) 15%, transparent)",
        }}
      >
        <div className="flex items-center gap-2 mb-1.5">
          <span className="font-mono text-xs font-medium text-primary">
            {String(activeStep + 1).padStart(2, "0")}
          </span>
          <span className="text-sm font-semibold">{activeNode.label}</span>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {activeNode.detail}
        </p>
        <div className="flex items-center gap-3 mt-3">
          <button
            onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
            disabled={activeStep === 0}
            className="text-xs font-mono text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors duration-100"
          >
            &larr; prev
          </button>
          <span className="text-xs font-mono text-muted-foreground/50">
            {activeStep + 1} / {nodes.length}
          </span>
          <button
            onClick={() =>
              setActiveStep(Math.min(nodes.length - 1, activeStep + 1))
            }
            disabled={activeStep === nodes.length - 1}
            className="text-xs font-mono text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors duration-100"
          >
            next &rarr;
          </button>
        </div>
      </div>

      {/* Bidirectional note */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <ArrowLeftRight className="w-3.5 h-3.5 shrink-0" />
        <span>
          Supports both forward and inverse prediction over the same typed API
          contract
        </span>
      </div>
    </div>
  );
}

// ── Visualization 2: Upload Pipeline Flow with Validation Rules ───────────────

function UploadPipelineViz() {
  const steps: {
    id: string;
    label: string;
    sublabel: string;
    icon: typeof Upload;
    highlight: boolean;
  }[] = [
    {
      id: "upload",
      label: "File Upload",
      sublabel: "CSV / TSV / XLSX / JSON",
      icon: Upload,
      highlight: false,
    },
    {
      id: "detect",
      label: "Type Detection",
      sublabel: "MIME + extension",
      icon: FileText,
      highlight: false,
    },
    {
      id: "validate",
      label: "Schema Validation",
      sublabel: "Domain range checks",
      icon: FlaskConical,
      highlight: true,
    },
    {
      id: "normalize",
      label: "Normalization",
      sublabel: "Units \u2192 model format",
      icon: BarChart2,
      highlight: false,
    },
    {
      id: "link",
      label: "Batch Linkage",
      sublabel: "Attach to batch record",
      icon: Database,
      highlight: false,
    },
  ];

  const validationRules: {
    param: string;
    range: string;
    status: "success" | "warning" | "error";
  }[] = [
    { param: "Temperature (\u00b0C)", range: "4.0 \u2013 18.0", status: "success" },
    { param: "pH", range: "3.5 \u2013 4.5", status: "success" },
    { param: "Nihonshu-do (SMV)", range: "\u221210 to +15", status: "success" },
    { param: "San-do (acidity)", range: "1.0 \u2013 2.5", status: "warning" },
    { param: "Alcohol (%ABV)", range: "12 \u2013 22", status: "success" },
    { param: "Amino-do", range: "0.8 \u2013 2.0", status: "error" },
  ];

  const statusDot: Record<string, string> = {
    success: "bg-[color:var(--success)]",
    warning: "bg-[color:var(--warning)]",
    error: "bg-destructive",
  };

  const statusText: Record<string, string> = {
    success: "text-[color:var(--success)]",
    warning: "text-[color:var(--warning)]",
    error: "text-destructive",
  };

  return (
    <div className="space-y-3">
      {/* Step flow */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1.5 flex-wrap">
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <div key={step.id} className="flex items-center gap-1.5 shrink-0">
              <div
                className={`flex items-start gap-2 rounded-lg border px-2.5 py-2 ${
                  step.highlight
                    ? "border-primary/30 bg-primary/8"
                    : "border-border/60 bg-card"
                }`}
              >
                <Icon
                  className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${step.highlight ? "text-primary" : "text-muted-foreground"}`}
                />
                <div>
                  <p
                    className={`text-xs font-medium leading-tight ${step.highlight ? "text-foreground" : "text-muted-foreground"}`}
                  >
                    {step.label}
                  </p>
                  <p className="text-[10px] text-muted-foreground font-mono leading-tight mt-0.5">
                    {step.sublabel}
                  </p>
                </div>
              </div>
              {i < steps.length - 1 && (
                <ArrowRight className="w-3 h-3 text-muted-foreground/40 shrink-0 hidden sm:block" />
              )}
            </div>
          );
        })}
      </div>

      {/* Validation rules panel */}
      <div className="rounded-lg border border-border/60 bg-card overflow-hidden">
        <div className="px-3 py-2 border-b border-border/60 bg-muted/20">
          <p className="text-[10px] font-mono font-medium text-muted-foreground uppercase tracking-wide">
            Domain Validation Rules &mdash; Step 03
          </p>
        </div>
        <div className="divide-y divide-border/40">
          {validationRules.map((rule) => (
            <div
              key={rule.param}
              className="flex items-center justify-between px-3 py-1.5 text-xs"
            >
              <div className="flex items-center gap-2">
                <span
                  className={`w-1.5 h-1.5 rounded-full shrink-0 ${statusDot[rule.status]}`}
                />
                <span className="text-muted-foreground">{rule.param}</span>
              </div>
              <span className={`font-mono ${statusText[rule.status]}`}>
                {rule.range}
              </span>
            </div>
          ))}
        </div>
        <div className="px-3 py-2 border-t border-border/60 bg-muted/10">
          <p className="text-[10px] text-muted-foreground">
            <span className="text-destructive font-medium">Amino-do</span>
            {" "}out-of-range value triggers upload rejection with a structured error before reaching the model pipeline.
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Visualization 3: Expansion Timeline ──────────────────────────────────────

function ExpansionTimelineViz() {
  const phases: {
    id: string;
    title: string;
    duration: string;
    status: "active" | "upcoming";
    description: string;
    deliverables: string[];
    icon: typeof FlaskConical;
  }[] = [
    {
      id: "phase-1",
      title: "Phase 1 \u2014 Core Fermentation Model",
      duration: "Pre-MVP",
      status: "active",
      description:
        "Basic fermentation parameters: temperature, pH, nihonshu-do, san-do, amino-do, alcohol. Forward and inverse prediction. CSV / XLSX upload portal. Email-based feedback loop.",
      deliverables: [
        "Bidirectional model API",
        "Upload portal with validation",
        "Batch tracking dashboard",
        "Feedback submission form",
      ],
      icon: FlaskConical,
    },
    {
      id: "phase-2",
      title: "Phase 2 \u2014 Chemical Panels",
      duration: "Post-MVP",
      status: "upcoming",
      description:
        "Expand the data layer to accept detailed chemical analysis panels: organic acids, amino acid profiles, volatile compounds. The upload schema extends with new dataType values with no breaking changes.",
      deliverables: [
        "Extended upload schema",
        "Chemical panel visualizations",
        "Cross-batch chemical comparisons",
      ],
      icon: Beaker,
    },
    {
      id: "phase-3",
      title: "Phase 3 \u2014 Microbiome Integration",
      duration: "Future",
      status: "upcoming",
      description:
        "Microbiome sequencing data from koji and yeast cultures. 16S rRNA and ITS amplicon data require a new input adapter in the FastAPI layer. The Next.js interface picks it up automatically via schema versioning.",
      deliverables: [
        "Microbiome file adapter",
        "Taxonomic profile viewer",
        "Fermentation correlation analysis",
      ],
      icon: Microscope,
    },
    {
      id: "phase-4",
      title: "Phase 4 \u2014 Genomic Sequencing",
      duration: "Long-term",
      status: "upcoming",
      description:
        "Full WGS or targeted sequencing for yeast and koji strains. Large file sizes require chunked upload support. The pipeline\u2019s validation layer is designed for variable-payload formats from day one.",
      deliverables: [
        "Chunked upload for large files",
        "Strain fingerprinting viewer",
        "Genotype-to-fermentation correlations",
      ],
      icon: Dna,
    },
  ];

  return (
    <div className="space-y-0">
      {phases.map((phase, i) => {
        const Icon = phase.icon;
        const isActive = phase.status === "active";
        const isLast = i === phases.length - 1;
        return (
          <div key={phase.id} className="flex gap-3">
            {/* Left: dot + connector line */}
            <div className="flex flex-col items-center pt-1 shrink-0">
              <div
                className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                  isActive
                    ? "bg-primary ring-2 ring-primary/25 ring-offset-1"
                    : "bg-muted border border-border/60"
                }`}
              />
              {!isLast && (
                <div
                  className={`w-px flex-1 mt-1 min-h-[2rem] ${
                    isActive ? "bg-primary/30" : "bg-border/40"
                  }`}
                />
              )}
            </div>
            {/* Right: content */}
            <div className={`flex-1 ${isLast ? "pb-0" : "pb-5"}`}>
              <div className="flex items-center gap-2 flex-wrap">
                <Icon
                  className={`w-3.5 h-3.5 shrink-0 ${isActive ? "text-primary" : "text-muted-foreground"}`}
                />
                <p
                  className={`text-sm font-medium ${isActive ? "text-foreground" : "text-muted-foreground"}`}
                >
                  {phase.title}
                </p>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {phase.duration}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                {phase.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {phase.deliverables.map((d) => (
                  <span
                    key={d}
                    className="text-[10px] font-mono text-muted-foreground border border-border/60 rounded px-1.5 py-0.5"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Challenge Card ─────────────────────────────────────────────────────────────

function ChallengeCard({
  index,
  title,
  description,
  outcome,
  children,
}: {
  index: number;
  title: string;
  description: string;
  outcome: string;
  children: React.ReactNode;
}) {
  const stepNumber = String(index + 1).padStart(2, "0");
  return (
    <div className="bg-card border border-border/60 rounded-lg p-5 md:p-6 space-y-4 hover:border-primary/25 transition-all duration-150">
      <div className="space-y-1">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-sm font-medium text-primary/60 w-6 shrink-0 tabular-nums">
            {stepNumber}
          </span>
          <h3 className="text-base font-semibold leading-snug">{title}</h3>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed pl-9">
          {description}
        </p>
      </div>
      <div className="pl-9">{children}</div>
      <div className="pl-9">
        <OutcomeStatement outcome={outcome} />
      </div>
    </div>
  );
}

// ── CTA Closer ─────────────────────────────────────────────────────────────────

function CtaCloser() {
  return (
    <section
      className="rounded-lg border border-primary/20 p-5 md:p-6"
      style={{
        background:
          "linear-gradient(135deg, color-mix(in oklch, var(--primary) 5%, transparent), transparent)",
      }}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold mb-1">
            Ready to discuss the approach?
          </h3>
          <p className="text-sm text-muted-foreground max-w-md">
            I&apos;ve thought through the integration contract, the validation
            pipeline, and the expansion path. Happy to walk through any of this
            in a call.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/proposal"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-100"
          >
            See the proposal &rarr;
          </Link>
          <span className="text-xs font-medium border border-primary/20 text-primary px-3 py-1.5 rounded-lg bg-primary/8">
            Reply on Upwork to start
          </span>
        </div>
      </div>
    </section>
  );
}

// ── Visualization Map ──────────────────────────────────────────────────────────

const visualizations: Record<string, React.ReactNode> = {
  "challenge-1": <ArchitectureViz />,
  "challenge-2": <UploadPipelineViz />,
  "challenge-3": <ExpansionTimelineViz />,
};

// ── Page ───────────────────────────────────────────────────────────────────────

export default function ChallengesPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8 md:px-6 space-y-8">
        {/* Page header */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Approach</h1>
          <p className="text-sm text-muted-foreground mt-1">
            How I would tackle the key technical challenges in this project
          </p>
        </div>

        {/* Executive summary */}
        <ExecutiveSummary />

        {/* Challenge cards */}
        <div className="flex flex-col gap-4">
          {challenges.map((challenge, index) => (
            <ChallengeCard
              key={challenge.id}
              index={index}
              title={challenge.title}
              description={challenge.description}
              outcome={challenge.outcome ?? ""}
            >
              {visualizations[challenge.id]}
            </ChallengeCard>
          ))}
        </div>

        {/* CTA closer */}
        <CtaCloser />
      </div>
    </div>
  );
}
