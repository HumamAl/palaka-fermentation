import type { Challenge } from "@/lib/types";

export interface ExecutiveSummaryData {
  commonApproach: string;
  differentApproach: string;
  accentWord?: string;
}

export const executiveSummary: ExecutiveSummaryData = {
  commonApproach:
    "Most developers building ML-adjacent web apps treat the Python model as an afterthought — they wire a FastAPI endpoint, accept a CSV, and ship a UI that breaks the moment the data schema changes or the model needs a new input type.",
  differentApproach:
    "I'd design the integration contract first — typed API schemas shared between the Next.js frontend and FastAPI backend — so the interface, validation layer, and data pipeline are all built around the model's actual I/O signature, not retrofitted to it.",
  accentWord: "integration contract",
};

export const challenges: Challenge[] = [
  {
    id: "challenge-1",
    title: "Connecting a Bidirectional ML Model to a Clean Web Interface",
    description:
      "The core engineering challenge: making a Python FastAPI backend exchange fermentation parameters with a Next.js frontend in both directions — forward prediction (parameters → outcome) and inverse prediction (target outcome → required parameters) — without latency or schema drift.",
    visualizationType: "architecture",
    outcome:
      "Could reduce model interaction round-trip latency to under 500ms with typed API contracts, edge caching for static inference calls, and streaming for long-running inverse predictions.",
  },
  {
    id: "challenge-2",
    title: "Structured Data Upload Pipeline with Domain-Aware Validation",
    description:
      "The platform needs to accept CSV, TSV, XLSX, and JSON uploads from brewers and researchers. Each file type carries fermentation parameters with different schemas, units, and precision expectations. Without domain-specific validation, garbage data flows silently into the model.",
    visualizationType: "flow",
    outcome:
      "Could reduce data ingestion errors by validating against known fermentation parameter ranges (temperature ±0.5°C, pH 3.5–4.5, nihonshu-do −10 to +15) before the file ever reaches the model pipeline.",
  },
  {
    id: "challenge-3",
    title: "Designing for Growth: Pre-MVP to Genomic Data",
    description:
      "The client wants to start with core fermentation parameters but expand to chemical panels, microbiome profiles, and eventually genomic sequencing data. Bolting on new data dimensions after launch is expensive — the data layer and UI need to be extensible from day one.",
    visualizationType: "timeline",
    outcome:
      "Could enable a smooth expansion to genomic and microbiome data types without rewriting the upload pipeline, the model I/O interface, or the batch tracking schema.",
  },
];
