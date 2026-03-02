import type { Profile, PortfolioProject } from "@/lib/types";

export const profile: Profile = {
  name: "Humam",
  tagline:
    "Full-stack developer who ships MVPs fast — from concept to deployed product in days, not months.",
  bio: "I build practical tools that work — dashboards, data pipelines, auth systems, and API integrations. I've already built a working demo of your fermentation prediction interface in Tab 1. The production version starts from there.",
  approach: [
    {
      title: "Understand the Model",
      description:
        "Map the fermentation model's inputs and outputs first — what parameters go in, what predictions come out, and what the API contract looks like. One focused conversation covers everything.",
    },
    {
      title: "Build the Core Loop",
      description:
        "Working model interface from day one. You'll see real progress every few days — no dark periods, no waiting two weeks for a status update.",
    },
    {
      title: "Ship the MVP",
      description:
        "Production-ready on Vercel with clean TypeScript, file upload handling, auth, and a documented structure you can hand off or extend as you add genomic and microbiome data.",
    },
    {
      title: "Iterate Together",
      description:
        "Short feedback cycles as the platform grows. New data types, new prediction endpoints, new user roles — scoped and shipped in focused sprints.",
    },
  ],
  skillCategories: [
    {
      name: "Frontend",
      skills: [
        "TypeScript",
        "React",
        "Next.js (App Router)",
        "Tailwind CSS",
        "shadcn/ui",
        "Recharts",
      ],
    },
    {
      name: "Backend Integration",
      skills: [
        "Python/FastAPI integration",
        "REST API design",
        "File upload handling",
        "Webhook patterns",
      ],
    },
    {
      name: "Data & Auth",
      skills: [
        "Structured data processing",
        "CSV/JSON parsing",
        "Email auth",
        "Role-based access",
      ],
    },
    {
      name: "DevOps",
      skills: [
        "Vercel deployment",
        "GitHub Actions",
        "TypeScript strict mode",
      ],
    },
  ],
};

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "medrecord-ai",
    title: "MedRecord AI",
    description:
      "AI-powered medical record summarization tool that extracts key clinical data, diagnoses, medications, and treatment timelines from unstructured patient records.",
    outcome:
      "Document processing pipeline that extracts structured clinical data and generates a readable timeline summary",
    tech: ["Next.js", "TypeScript", "shadcn/ui", "AI extraction pipeline"],
    relevance:
      "Closest match to scientific data handling — structured extraction from complex domain inputs mirrors what your fermentation model interface needs.",
    liveUrl: "https://medrecord-ai-delta.vercel.app",
  },
  {
    id: "data-intelligence",
    title: "Data Intelligence Platform",
    description:
      "Data analytics and intelligence dashboard with multi-source data aggregation, interactive visualizations, and filterable insight generation.",
    outcome:
      "Unified analytics dashboard pulling data from multiple sources with interactive charts and filterable insights",
    tech: ["Next.js", "TypeScript", "shadcn/ui", "Recharts"],
    relevance:
      "Multi-source data pattern matches your roadmap — you're expanding to genomic, microbiome, and chemical panel data, all needing unified visualization.",
    liveUrl: "https://data-intelligence-platform-sandy.vercel.app",
  },
  {
    id: "wmf-agent",
    title: "WMF Agent Dashboard",
    description:
      "AI-powered customer service agent with email classification, structured RFQ data extraction, confidence scoring, and human-in-the-loop approval workflow.",
    outcome:
      "Replaced a 4-hour manual quote review process with a 20-minute structured extraction and approval flow",
    tech: ["Next.js", "TypeScript", "Claude API", "n8n", "Microsoft Graph"],
    relevance:
      "Shows AI + structured data extraction working in production for a real client — same pattern as your prediction input/output interface.",
    liveUrl: "https://wmf-agent-dashboard.vercel.app",
  },
  {
    id: "fleet-saas",
    title: "Fleet Maintenance SaaS",
    description:
      "Multi-module SaaS platform covering asset tracking, work orders, preventive maintenance scheduling, inspections, parts inventory, and analytics.",
    outcome:
      "6-module SaaS covering the full maintenance lifecycle — from asset registry to work orders to parts inventory",
    tech: ["Next.js", "TypeScript", "shadcn/ui", "Recharts"],
    relevance:
      "Demonstrates building a platform that grows — multiple modules, complex data relationships, designed for expansion. That's your roadmap.",
  },
];
