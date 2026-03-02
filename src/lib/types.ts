import type { LucideIcon } from "lucide-react";

// Sidebar navigation
export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

// ── Fermentation Domain Types ──────────────────────────────────

export type FermentationStage =
  | "shubo"        // Yeast starter
  | "hatsuzoe"     // First addition
  | "nakazoe"      // Second addition
  | "tomezoe"      // Third addition
  | "moromi"       // Main mash fermentation
  | "pressing"     // Filtration
  | "complete";

export type BatchStatus =
  | "active"
  | "monitoring"
  | "complete"
  | "flagged"
  | "archived";

export interface FermentationBatch {
  id: string;
  batchName: string;
  riceVariety: string;
  kojiStrain: string;
  yeastStrain: string;
  stage: FermentationStage;
  status: BatchStatus;
  startDate: string;
  targetEndDate: string;
  currentTemp: number;       // Celsius
  targetTemp: number;
  currentPh: number;
  alcoholContent: number;    // % ABV
  nihonshuDo: number;        // Sake Meter Value (sweetness/dryness)
  sanDo: number;             // Acidity
  aminoDo: number;           // Amino acid content
  notes: string;
  lastUpdated: string;
}

export interface PredictionInput {
  id: string;
  batchId: string;
  inputType: "forward" | "inverse";
  timestamp: string;
  parameters: Record<string, number>;
  status: "pending" | "complete" | "error";
}

export interface PredictionResult {
  id: string;
  predictionInputId: string;
  batchId: string;
  direction: "forward" | "inverse";
  timestamp: string;
  predictedValues: Record<string, number>;
  confidence: number;        // 0-1
  modelVersion: string;
  notes: string;
}

export interface TimeSeriesPoint {
  date: string;
  temperature: number;
  ph: number;
  alcohol: number;
  nihonshuDo: number;
}

export interface MonthlyBatchCount {
  month: string;
  batches: number;
  avgAlcohol: number;
  avgNihonshuDo: number;
}

export interface DataUpload {
  id: string;
  fileName: string;
  fileType: "csv" | "tsv" | "xlsx" | "json";
  uploadedBy: string;
  uploadedAt: string;
  rowCount: number;
  status: "processing" | "validated" | "error" | "archived";
  dataType: "sensor-log" | "lab-panel" | "batch-parameters" | "koji-culture" | "chemical-analysis";
  errorMessage?: string;
  batchId?: string;
}

export interface FeedbackEntry {
  id: string;
  submittedBy: string;
  email: string;
  batchId?: string;
  category: "model-accuracy" | "feature-request" | "data-quality" | "ui-ux" | "general";
  message: string;
  submittedAt: string;
  status: "new" | "reviewed" | "resolved";
}

export interface AppUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "brewer" | "researcher" | "viewer";
  registeredAt: string;
  lastActive: string;
  uploadsCount: number;
  feedbackCount: number;
}

// ── Stat Card Type ─────────────────────────────────────────────

export interface StatCard {
  label: string;
  value: number | string;
  change?: number;
  unit?: string;
  trend?: "up" | "down" | "flat";
}

// Challenge visualization types
export type VisualizationType =
  | "flow"
  | "before-after"
  | "metrics"
  | "architecture"
  | "risk-matrix"
  | "timeline"
  | "dual-kpi"
  | "tech-stack"
  | "decision-flow";

export interface Challenge {
  id: string;
  title: string;
  description: string;
  visualizationType: VisualizationType;
  outcome?: string;
}

// Proposal types
export interface Profile {
  name: string;
  tagline: string;
  bio: string;
  approach: { title: string; description: string }[];
  skillCategories: { name: string; skills: string[] }[];
}

export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  tech: string[];
  relevance?: string;
  outcome?: string;
  liveUrl?: string;
}

// Screen definition for frame-based demo formats
export interface DemoScreen {
  id: string;
  label: string;
  icon?: LucideIcon;
  href: string;
}

// Conversion element variant types
export type ConversionVariant = "sidebar" | "inline" | "floating" | "banner";
