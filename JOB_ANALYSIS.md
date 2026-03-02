# Job Analysis — Palaka Fermentation

**Job Title**: Full-Stack Developer – Scientific Web App Pre-MVP | Python Backend | US Only
**Posted**: 8 hours ago | Fixed price $800–$1,500 | Expert level

---

## Analysis Brief

```json
{
  "domain": "tech",
  "subDomain": "biotech-ai",
  "clientName": null,
  "features": [
    "fermentation model input/output interface",
    "bidirectional prediction results view",
    "user registration and login (email-gated uploads)",
    "data upload portal (structured file upload for registered users)",
    "feedback submission form",
    "open-access model query (no login required)"
  ],
  "challenges": [
    {
      "title": "Bidirectional model I/O interface design",
      "vizType": "flow-diagram",
      "outcome": "Could reduce round-trip from parameter input to prediction display to under 3 seconds, with clear error states when model returns unexpected outputs"
    },
    {
      "title": "Dual-access model (open vs. registered user)",
      "vizType": "before-after",
      "outcome": "Could eliminate friction for casual users while preserving data quality for registered uploads — same model, two access tiers"
    },
    {
      "title": "Python ML backend API integration",
      "vizType": "architecture-sketch",
      "outcome": "Could decouple the frontend entirely from the model runtime — clean FastAPI contract means the ML backend can be swapped or scaled without touching the UI"
    }
  ],
  "portfolioProjects": [
    "WMF Agent Dashboard",
    "Data Intelligence Platform",
    "Lead Intake CRM",
    "MedRecord AI"
  ],
  "coverLetterHooks": [
    "bidirectional predictive fermentation model",
    "pre-MVP build — dependable, easy to use, minimum frill",
    "open access for model use vs. email required for data submission",
    "MVP phase will expand to handle genomic, microbiome, and chemical panel results",
    "documentation for clean handoff"
  ],
  "screeningQuestion": null,
  "screeningAnswer": null,
  "aestheticProfile": {
    "aesthetic": "linear",
    "demoFormat": "multi-screen-walkthrough",
    "formatRationale": "The job describes a multi-page web app with distinct functional surfaces: a model I/O interface, a user registration flow, a data upload portal, and a feedback form. These are distinct screens in a user workflow, not dashboard views. A browser frame walkthrough with 4-5 screen tabs lets the client see each functional surface without the overhead of a sidebar dashboard architecture — which would be the wrong metaphor for a scientific tool with a workflow, not a monitoring use case.",
    "mood": "precise, minimal, scientific — tool for domain experts, not general public",
    "colorDirection": "slate-teal at oklch(0.50 0.10 195) — low chroma, professional restraint, scientific instrument feel",
    "densityPreference": "standard",
    "justification": "The founder explicitly wrote 'clean, functional, minimum frill. No unnecessary complexity.' This is a direct aesthetic mandate — linear/minimal is the correct choice. The domain is AI-driven scientific tooling (fermentation prediction, genomic/microbiome data) used by technical/scientific practitioners. These users equate visual restraint with scientific credibility. A warm, rounded, or consumer-facing aesthetic would undermine trust immediately. The correct visual reference is tools like Observable, Weights & Biases, or Streamlit — functional, information-forward, precise."
  },
  "clientVocabulary": {
    "primaryEntities": ["fermentation run", "prediction", "model input", "model output", "data submission", "registered user"],
    "kpiLabels": ["prediction accuracy", "model confidence", "fermentation yield", "batch completion rate"],
    "statusLabels": ["Pending", "Processing", "Complete", "Failed", "Awaiting Review"],
    "workflowVerbs": ["submit", "predict", "upload", "validate", "query", "register"],
    "sidebarNavCandidates": ["Model Interface", "Prediction History", "Data Upload", "Feedback", "Account"],
    "industryTerms": ["sake fermentation", "bidirectional model", "predictive fermentation", "genomic data", "microbiome results", "chemical panel", "pre-MVP", "ML backend", "FastAPI", "Flask"]
  },
  "designSignals": "The founder is a technical domain expert — 'AI-driven sake fermentation technology startup' — who wrote precisely and clinically about the spec. They use terms like 'bidirectional predictive fermentation model' and 'genomic, microbiome, and chemical panel results'. They would evaluate this demo the way a scientist evaluates a lab instrument: does it do the job without noise? They would recognize Streamlit, Observable, or a clean FastAPI-backed UI as 'quality' — and immediately distrust anything that feels like a SaaS marketing page. Visual weight and decoration are credibility liabilities here.",
  "accentColor": "teal",
  "signals": ["HIGH_BUDGET", "DETAILED_SPEC", "NEW_CLIENT"],
  "coverLetterVariant": "A",
  "domainResearcherFocus": "Focus on sake fermentation and food biotech terminology: koji (Aspergillus oryzae), moromi (main mash), shubo (starter mash), SMV (sake meter value), amino acid content, seimaibuai (rice polishing ratio), fermentation temperature curves, brix readings. Entity names: fermentation batches typically identified by lot numbers or brew codes. Metric ranges: fermentation duration 20-60 days, temperature 5-18°C, SMV range -5 to +15. Edge cases: failed fermentation runs (contamination, temperature excursion), incomplete batch data, partial panel results. Industry tools these researchers use: Streamlit (rapid ML dashboards), FastAPI (Python model serving), Jupyter notebooks for data exploration. The MVP phase mentions genomic and microbiome data — familiarize with OTU tables, 16S rRNA sequencing outputs, and how these are typically uploaded (CSV, JSON, BIOM format). Chemical panel results would include ethanol concentration, acidity, glucose/fructose levels."
}
```

---

## Signal Reasoning

### Job Signals Detected

| Signal | Evidence |
|---|---|
| `HIGH_BUDGET` | Fixed price $800–$1,500, explicitly stated. $1,500 tier includes responsive design, input validation, error handling, and clean handoff documentation. |
| `DETAILED_SPEC` | Client listed specific deliverables: model I/O interface, user auth with email for uploads, data upload portal (structured files), feedback form. Also described two-tier access model. |
| `NEW_CLIENT` | No prior hire history mentioned. First-time Upwork buyer signals possible — client may be exploring. Demo reduces perceived risk significantly. |

### Timing Note

Job posted 8 hours ago. This is outside the ideal 60-minute window but within the 48-hour hard filter. Proceed with full build. If proposal count is under 15 at submission, the demo quality will be the primary differentiator.

### Budget Positioning

At $1,500 (the top of their stated range), the client gets: responsive design, input validation, error handling, and documentation for clean handoff. The demo should communicate clean architecture and documentation-readiness — this isn't a throwaway MVP, it's the foundation for ongoing work. The client explicitly stated: "This is the beginning of an ongoing relationship."

---

## Portfolio Project Rationale

| Project | Relevance |
|---|---|
| **WMF Agent Dashboard** | Primary pick: AI/ML backend integration, structured data I/O, human-in-the-loop workflow — closest structural match to a model query interface |
| **Data Intelligence Platform** | Multi-source data aggregation with interactive filtering — relevant to the prediction history and data visualization surface |
| **Lead Intake CRM** | Shows auth + form submission + data pipeline — directly relevant to the registration + upload portal requirement |
| **MedRecord AI** | Document processing pipeline with file upload and structured extraction — relevant to the data upload portal for genomic/microbiome files |

---

## Cover Letter Hooks (Ranked by Specificity)

1. **"bidirectional predictive fermentation model"** — Lead with this exact phrase. Shows you read the post and understand what makes this technically unusual (most model UIs are unidirectional — input → output).
2. **"open access for model use" vs. "email required for feedback/data submission"** — The two-tier access pattern is a specific design decision worth calling out in the demo.
3. **"pre-MVP build — dependable, easy to use, minimum frill"** — Mirror this language explicitly. The founder is allergic to over-engineering; signal you heard that.
4. **"MVP phase will expand to handle genomic, microbiome, and chemical panel results"** — Shows you understood the future scope and thought ahead about the data upload architecture.
5. **"documentation for clean handoff"** — At the $1,500 tier, this is explicitly valued. Signal that your code ships with comments, typed interfaces, and a README.

---

## Embedded Question Candidates

These are specific enough that they can only be asked by someone who read this exact post:

- **Best**: "Is the fermentation model already deployed as a FastAPI/Flask endpoint, or will I be building the model-serving layer too?"
- **Alt**: "For the structured file upload — are the chemical panel results coming in as CSV/JSON, or is there an existing export format from your lab instruments?"
- **Alt**: "For the open-access model query, are there any rate limits or usage tracking requirements you'd want before the MVP phase?"

The first question is the strongest — it reveals deep reading of the spec (they mentioned FastAPI/Flask by name) and surfaces a legitimate scope ambiguity that affects the build.

---

## Done = Statements (per CLAUDE.md job-scoring.md Section 6)

For the $800 tier:
> Done = model I/O form submits to your Python endpoint, registered user login/logout works with email, file upload accepts structured data and stores submissions, feedback form records to persistent state, all four surfaces render without console errors.

For the $1,500 tier:
> Done = all above + responsive on mobile (375px), form inputs have validation with inline error messages, a README documents the API contract and environment variables, TypeScript types exported for every data shape the frontend touches.

---

## Aesthetic Application Notes

The `linear` aesthetic with `multi-screen-walkthrough` format means:
- Browser frame with realistic chrome (URL bar showing something like `app.palaka.ai/model`)
- 4-5 screens: Model Interface → Prediction Results → Data Upload → Register/Login → Feedback
- Tight spacing (standard density), monospace font accents for model output values
- Teal-slate primary: `oklch(0.50 0.10 195)` — scientific instrument feel, not wellness teal
- No decorative elements: borders are `border-border/60`, no shadows on cards, radius `0.5rem`
- Status badges: use domain-correct labels (Processing, Complete, Failed) in `--success`/`--warning` semantic colors
- The prediction output surface should feel like reading a lab instrument readout — monospace values, precision to 2-3 decimal places, confidence intervals shown

---

## Domain Researcher Handoff Notes

The Domain Researcher should produce:
1. **Realistic batch/lot naming conventions** for sake fermentation (e.g., "BR-2024-047", "Junmai-Batch-12")
2. **Realistic parameter ranges** for the model input form: temperature (°C), rice polishing ratio (%), koji percentage (%), water addition ratio (%)
3. **Realistic output values** for the bidirectional prediction: predicted SMV, predicted acidity, predicted amino acid content, fermentation completion day estimate
4. **Realistic file naming conventions** for data uploads: what would a microbiome CSV or chemical panel export look like in this context?
5. **At least 2 edge cases** in mock fermentation runs: one failed batch (temperature excursion on day 8), one partial batch (upload missing chemical panel data)
