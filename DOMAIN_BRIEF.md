# Domain Knowledge Brief — AI-Driven Sake Fermentation Technology (B2B SaaS / Biotech)

## Sub-Domain Classification

**AI-driven sake fermentation analytics platform** — a startup-scale biotech company (1-10 brewmaster users, 5-20 active fermentation batches simultaneously) that hosts a bidirectional predictive fermentation model as a web app. The platform captures real-time sensor readings, accepts structured data uploads (CSV, FASTA, chemical panels), and outputs predictive insights for fermentation optimization. Future scope includes genomic, microbiome, and chemical panel analysis layers. Client is Palaka Fermentation, based in Northern Virginia — regional context is US craft sake market.

---

## Job Analyst Vocabulary — Confirmed and Extended

This brief extends the Job Analyst's vocabulary with verified sake fermentation terminology.

### Confirmed Primary Entity Names

These are the words that must appear in every UI label — sidebar nav, table headers, KPI card titles, status badges, search placeholders.

- **Primary record type**: "Batch" — not "order", not "run", not "session". Each moromi fermentation is a **Batch** (e.g., Batch #B-2024-031).
- **Sub-process records**: "Shubo" (yeast starter stage), "Moromi" (main ferment stage), "Koji" (mold preparation stage)
- **People roles**: "Toji" (master brewer / brewmaster), "Kurabito" (brewery worker / analyst user)
- **The prediction output**: "Fermentation Trajectory" — not "forecast" or "prediction chart"
- **Data input method**: "Panel Upload" — not "file import" or "data import"
- **Model name convention**: "PalakaSake Model v{n}" or "Bidirectional Fermentation Model"
- **Secondary entities**: Strain (yeast strain ID), Lot (rice lot/batch), Profile (saved parameter profile)

### Expanded KPI Vocabulary

| KPI Name | What It Measures | Typical Format |
|---|---|---|
| Nihonshu-do (SMV) | Sake Meter Value — sweetness/dryness scale | Integer ±20 (e.g., +3, -2) |
| Seimaibuai | Rice polishing ratio — how much rice remains after milling | % (e.g., 60%, 50%) |
| San-do (Acidity) | Total titratable acidity — organic acid concentration | Decimal 0.8–2.5 |
| Amino-do | Amino acid content — fullness/richness of flavor | Decimal 0.8–2.5 |
| ABV (Alcohol) | Alcohol by volume of the fermenting moromi | % (e.g., 15.2%, 17.8%) |
| Nihon°C | Mash temperature — tank temperature during moromi | °C (e.g., 8.5°C, 12.3°C) |
| CO₂ Evolution Rate | Fermentation activity proxy — CO₂ gas production | mL/min or relative units |
| Glucose Remaining | Residual sugar in moromi mash | g/L (e.g., 4.2 g/L) |
| Lactic Acid | Protective acid produced by LAB in kimoto/yamahai | g/L (e.g., 0.35 g/L) |
| Predicted ABV at Day 30 | Model output — expected final alcohol content | % (e.g., 16.4%) |
| Fermentation Day | Days elapsed since moromi start | Integer (1–45) |
| Batch Yield | Volume of sake produced per koku of rice | L/koku |
| Model Confidence | Predictive model confidence interval | % (e.g., 92%) |

### Status Label Vocabulary

Exact status strings for batches, panels, and model runs — these go directly into data tables, badges, and filter dropdowns.

**Batch states (active progression):**
- `Koji Preparation` — rice inoculation with A. oryzae mold
- `Shubo Active` — yeast starter is fermenting
- `Moromi Day {N}` — main fermentation (shown dynamically, e.g., "Moromi Day 14")
- `Pressing Scheduled` — fermentation complete, pressing imminent
- `Pressed` — liquid sake extracted

**Batch states (alert/problem):**
- `Contamination Alert` — LAB or wild yeast intrusion detected
- `Temperature Deviation` — tank temp outside target range
- `Stalled Fermentation` — CO₂ rate dropped below threshold unexpectedly
- `Low ABV Warning` — alcohol below predicted trajectory at day milestone

**Terminal states:**
- `Completed` — batch fully processed
- `Archived` — stored in historical record
- `Abandoned` — batch terminated (contamination, failure)

**Panel upload states:**
- `Processing` — file being parsed and validated
- `Validated` — data accepted, ready for model ingestion
- `Ingested` — model has incorporated the data
- `Failed Validation` — file format error or out-of-range values

**Model run states:**
- `Running` — model inference in progress
- `Complete` — prediction ready
- `Diverged` — model could not converge (outlier input)

### Workflow and Action Vocabulary

Verbs used in this domain — these become button labels, action menu items, and empty state messages.

**Primary actions:**
- "Start Batch" — initialize a new moromi fermentation record
- "Log Reading" — enter a new sensor observation
- "Upload Panel" — submit a CSV / FASTA / chemical data file
- "Run Prediction" — trigger the bidirectional model inference
- "Compare Batches" — overlay two batch trajectories on one chart
- "Export Report" — download batch report as PDF or CSV

**Secondary actions:**
- "Flag Anomaly" — mark a data point as a suspected outlier
- "Adjust Profile" — modify target parameters for a batch mid-fermentation
- "Archive Batch" — move completed batch to historical view
- "Calibrate Sensor" — note that a sensor reading was manually verified

### Sidebar Navigation Candidates

Domain-appropriate navigation labels — NOT generic "Dashboard", "Analytics", "Settings".

1. **Brew Monitor** — real-time batch overview dashboard (primary landing)
2. **Active Batches** — list of all batches in moromi stage
3. **Fermentation Predictions** — model inference history and trajectory charts
4. **Panel Uploads** — CSV / FASTA / chemical panel data management
5. **Yeast & Koji Library** — strain and koji profile reference database
6. **Batch Archive** — completed and historical batches
7. **Toji Console** — settings, sensor calibration, model configuration (admin)

---

## Design Context — Visual Language of This Industry

### What "Premium" Looks Like in This Domain

Sake fermentation technology sits at the intersection of two visual worlds: traditional Japanese craft aesthetics and modern scientific SaaS. The apps that practitioners in this space trust are built around precision, data density, and quiet elegance — not flair. Fermentation scientists working with predictive models expect software that resembles research lab tools: clean tabular layouts, monospace numeric readouts, time-series trend lines with precise axis labels, and a general restraint in color use (color carries meaning — anomaly red, healthy green, warning amber — not decoration).

Reference tools in adjacent spaces (Benchling for biotech R&D, LIMS platforms, Yokogawa process control interfaces) all share a common visual grammar: white or very light backgrounds, a cool neutral sidebar, tabular data as the primary surface, and color used sparingly to signal state. Data density is moderate-to-high: a fermentation scientist monitoring 8-12 active batches needs to see all of them at a glance, not paginated through a card carousel.

The Japanese cultural dimension of sake adds a subtle layer. The best sake-tech interfaces (used by toji and kurabito) avoid the loud, consumer-web aesthetic entirely. They feel closer to laboratory software than restaurant POS systems. Clean, functional, information-precise — with occasional deliberate use of Japanese terminology as interface labels for authenticity (Nihonshu-do, not "sweetness score"; Seimaibuai, not "polish ratio").

### Real-World Apps Clients Would Recognize as "Premium"

1. **Benchling** — The gold standard for biotech R&D software. Clean white workspace, structured sidebar navigation, configurable data tables with filter/sort, collaborative chart views. Scientists consider it "the Notion for labs." Visual pattern: light background, left sidebar with icon + text nav, data organized in cards and tables, chart panels embedded in notebook-style views. URL: [benchling.com](https://www.benchling.com/)

2. **Yokogawa Process Control / FAST/TOOLS** — Industrial fermentation monitoring. Dense real-time dashboards with status grid layouts, alarm panels, trend charts with precise timestamp axes. Used by commercial sake breweries and food production facilities. Practitioners value its reliability over aesthetics, but the visual grammar of "industrial precision" is internalized.

3. **Sennos (formerly Precision Fermentation)** — AI-powered fermentation analytics SaaS launched 2025. Built for exactly this use case — sensor data ingestion + AI-guided fermentation control. Represents the "modern biotech SaaS" aesthetic this client is building toward: clean dashboards, real-time sensor feeds, model prediction overlays.

### Aesthetic Validation

- **Job Analyst likely chose**: Linear/Minimal or SaaS Modern
- **Domain validation**: **Confirmed — Linear/Minimal is the correct primary aesthetic for this client.** Sake fermentation technology is precision science wrapped in B2B software. The visual language of Benchling, LatchBio, and fermentation monitoring platforms is restrained, data-first, typographically precise. Monospace fonts for numeric readouts are expected. Dark panels for chart areas feel natural. Heavy decorative elements would undermine scientific credibility.
- **One adjustment**: Introduce a subtle warm-cool tension that reflects the Japanese craft dimension. The primary color should be a cool teal/cyan (evoking fermentation tanks, water, precision) rather than generic blue. Suggestion: `oklch(0.52 0.14 195)` — a muted aqua-teal. This reads as "scientific" while subtly referencing Japanese aesthetic restraint (mizuiro, water blue). Keep sidebar background slightly warmer than pure white — off-white `oklch(0.97 0.01 100)`.

### Format Validation

- **Job Analyst likely chose**: `dashboard-app`
- **Domain validation**: **Confirmed — dashboard-app is correct.** This is an internal operations tool for toji and kurabito to monitor active batches, review model predictions, and upload new data panels. Sidebar + main content area is precisely the right architecture. A phone mockup would be inappropriate — fermentation monitoring is done on desktop workstations or large tablets in a production environment.
- **Format-specific design notes**: The dashboard should feel like a "mission control" for fermentation — not a generic analytics page. Primary screen: batch status grid + trend chart for ABV trajectory + model confidence panel. The sidebar should feel like a LIMS (Laboratory Information Management System) in its organization — hierarchical, functional, not consumer-web decorative.

### Density and Layout Expectations

**Standard-to-compact density.** Fermentation scientists monitoring 8-12 active batches need information density. However, this is not a trading terminal — readability matters for measurements like Nihonshu-do and San-do where precision is critical. Recommend: `--content-padding: 1.25rem`, `--card-padding: 1rem`. Card-to-table balance: the dashboard uses stat cards + a primary trend chart + a batch table. Feature pages (active batches, panel uploads) lean more table-heavy. The model prediction page is chart-heavy with parameter input panels.

**Primarily table-and-chart views** (not card-heavy). A list of active batches is a data table. A model run result is a chart with overlaid trajectories. Data uploads are a queue table with status badges. The only card-heavy view is the "Brew Monitor" dashboard overview where each active batch gets a compact status card.

---

## Entity Names (10+ realistic names)

### Companies / Organizations (sake breweries as reference clients / data sources)
- Palaka Fermentation (the client)
- North American Sake Brewery (Charlottesville, VA)
- SakéOne (Forest Grove, OR)
- Brooklyn Kura (Brooklyn, NY)
- Sequoia Sake (San Francisco, CA)
- True Sake Partners (San Francisco, CA)
- Tengu Sake Labs (R&D reference partner — fictional but plausible)
- Kura No Sato Brewing Co. (fictional but authentic-sounding)
- Cascade Nihonshu Works (fictional)
- Appalachian Shuzo (fictional — appropriate for VA region)
- Blue Ridge Kura (fictional — appropriate for VA region)

### People Names (Toji and Kurabito roles)
- Kenji Watanabe — Toji (master brewer)
- Yuki Tanaka — Senior Kurabito
- Marcus Webb — Data Analyst
- Aiko Mori — Fermentation Scientist
- James Caldwell — Lab Technician
- Sora Nakamura — R&D Lead
- Lisa Hoffman — Process Engineer
- Ryo Yamamoto — Koji Specialist
- David Park — Biotech Consultant
- Mei Suzuki — Toji Apprentice

### Yeast Strains / Koji Profiles / Batch Identifiers
- K7 (Kyokai No. 7) — most common industrial sake yeast
- K9 (Kyokai No. 9) — high isoamyl acetate, fruity aroma
- K901 — non-foaming variant of K9
- K1801 — high ester-producing strain, ginjo-grade
- Association No. 14 — known for high malic acid
- Association No. 77 — used for daiginjo production
- Hiroshima No. 6 — regional heritage strain
- Yamahai Wild Culture — kimoto-style natural inoculation
- Batch IDs: `B-2025-001` through `B-2025-024` (sequential annual numbering)
- Koji profiles: `AO-Standard-I`, `AO-Ginjo-II`, `AO-High-Protease-III`

---

## Realistic Metric Ranges

| Metric | Low | Typical | High | Notes |
|--------|-----|---------|------|-------|
| Batch duration (moromi) | 18 days | 28 days | 45 days | Low temp = longer; premium ginjo can take 35-45 days |
| Fermentation temperature | 5°C | 10°C | 18°C | Lower = more aromatic, longer duration |
| Final ABV | 14% | 16.5% | 20% | Unfiltered genshu can reach 20%; nigori typically 12-14% |
| Nihonshu-do (SMV) | -12 (sweet) | +2 (dry) | +15 (very dry) | Most commercial sake: -4 to +7 |
| San-do (Acidity) | 0.8 | 1.4 | 2.2 | >1.5 = rich/dry; <1.0 = light/sweet |
| Amino-do | 0.8 | 1.3 | 2.4 | >2.0 = full-flavored; <1.0 = tanrei (light) |
| Seimaibuai (polishing) | 35% | 60% | 80% | Daiginjo ≤50%; Junmai no floor rule |
| Rice used per batch | 150 kg | 400 kg | 2,000 kg | Small craft batch vs. commercial scale |
| Batch yield | 800 L | 2,100 L | 12,000 L | Proportional to rice; ~5 L/kg typical |
| CO₂ evolution rate (peak) | 0.8 mL/min | 3.2 mL/min | 7.5 mL/min | Peak at days 5-12 of moromi |
| Glucose remaining at Day 10 | 0.5 g/L | 8.3 g/L | 45 g/L | High early = normal; high late = concern |
| Model confidence | 72% | 89% | 97% | Drops when input data is sparse or anomalous |
| Panel upload file size | 8 KB | 240 KB | 12 MB | Genomic FASTA files are largest |
| Active concurrent batches | 3 | 9 | 20 | For startup-scale operation |

---

## Industry Terminology Glossary (15+ terms)

| Term | Definition | Usage Context |
|------|-----------|---------------|
| Moromi | The main mash — fermented mixture of rice, koji, water, and yeast | Primary fermentation vessel; the entity being modeled |
| Shubo / Moto | Yeast starter — concentrated mix prepared before moromi | Phase before moromi; builds yeast population |
| Koji / Koji-kin | Aspergillus oryzae mold grown on steamed rice; produces enzymes | Koji stage precedes shubo; enzyme source |
| Toji | Master brewer; responsible for all fermentation decisions | Primary user role in the app |
| Kurabito | Brewery worker; operates under toji direction | Secondary user role |
| Nihonshu-do (SMV) | Sake Meter Value; measures density relative to water; dryness indicator | KPI card, chart Y-axis label, table column |
| Seimaibuai | Rice polishing ratio; percentage of rice grain remaining after milling | Batch parameter input field |
| San-do | Acidity measurement; titratable organic acids | KPI card; tracked through moromi |
| Amino-do | Amino acid level; fullness/umami indicator | KPI card; final product quality metric |
| Koshiki | Traditional steaming vessel for rice preparation | Equipment reference in batch setup |
| Shikomi | The addition of ingredients; batches go through 3 shikomi stages (soe, naka, tome) | Stage marker in fermentation timeline |
| Tanrei | Light, delicate style; low amino acid content | Quality classification output |
| Noujun | Rich, full-flavored style; high amino acid content | Quality classification output |
| Genshu | Undiluted sake (higher ABV); no water added post-pressing | Batch type flag |
| Nigori | Cloudy sake; intentionally unfiltered after pressing | Batch type flag |
| Ginjo | Premium grade; rice polished to ≤60% seimaibuai | Grade classification field |
| Daiginjo | Super-premium grade; polished to ≤50%; low-temp fermentation | Grade classification field |
| Junmai | Pure rice sake; no added distilled alcohol | Type classification field |
| LIMS | Laboratory Information Management System; context for this platform | Architecture reference |
| Bidirectional model | ML model that can both predict future state AND backcast from current state | Core feature naming |
| LAB | Lactic Acid Bacteria; protective and contaminant species | Contamination monitoring |

---

## Common Workflows

### Workflow 1: New Batch Initiation
1. Toji creates new batch record — names it (e.g., B-2025-019), selects sake grade (Junmai Ginjo), rice variety and lot
2. Enters seimaibuai (polishing ratio), planned rice weight, target ABV, target Nihonshu-do
3. Selects yeast strain (e.g., K7) and koji profile (AO-Ginjo-II)
4. Sets target fermentation temperature profile (day-by-day temperature schedule)
5. System initializes model baseline from historical batches with similar parameters
6. Koji stage begins — app enters koji tracking mode (4-6 day window)
7. Shubo stage begins — manual or sensor readings logged every 24h
8. Moromi begins — full monitoring mode activated; model starts generating daily trajectory predictions

### Workflow 2: Daily Fermentation Reading Log
1. Kurabito opens "Active Batches" view
2. Selects active batch (e.g., B-2025-019, Moromi Day 12)
3. Enters daily observations: temperature, ABV (if measured), Nihonshu-do, acidity, visual notes
4. System compares reading to predicted trajectory; flags any deviation >2σ
5. If deviation: system surfaces "Anomaly Detected" with suggested corrective action
6. Model re-runs prediction incorporating new data point; updates trajectory chart
7. Toji reviews model output; optionally adjusts temperature profile for next 3 days

### Workflow 3: Data Panel Upload (Genomic / Microbiome / Chemical)
1. User navigates to "Panel Uploads"
2. Selects upload type: CSV (chemical panel), FASTA (genomic / 16S rRNA microbiome), or structured chemical report
3. Selects associated batch or marks as standalone reference data
4. File validates against schema: column headers checked, value ranges validated, required fields verified
5. If validation passes: status becomes "Ingested"; model incorporates panel data into next prediction run
6. If validation fails: system returns specific error lines with corrective guidance
7. Processed panel data appears as a timeline entry in the batch record

---

## Common Edge Cases

1. **Stalled fermentation** — CO₂ rate drops unexpectedly at Moromi Day 8; ABV plateau below trajectory. Yeast stress indicator. Status badge: "Stalled Fermentation". Model confidence drops to 68%.
2. **Lactic acid contamination (hiochi)** — LAB panel upload shows unusual lactic acid bacteria presence in non-kimoto batch. Status: "Contamination Alert". Batch may need to be abandoned.
3. **Temperature controller failure** — tank temperature reading shows 22°C when target is 10°C. Sensor anomaly flag. Model trajectory invalidated until sensor re-calibration confirmed.
4. **Outlier batch — exceptional yield** — Batch achieves 19.8% ABV with Nihonshu-do of +12; unusual but not invalid. Edge case for chart Y-axis scaling.
5. **Failed panel upload** — FASTA file has incorrect header format or incompatible sequence length; validation returns "Failed Validation" with line-specific error.
6. **Abandoned batch** — Contamination confirmed at Moromi Day 6; batch terminated. Status: "Abandoned". Historical record retained for model training exclusion.
7. **Model divergence** — Bidirectional model cannot converge on a prediction; status: "Diverged". Occurs when batch parameters fall outside training distribution (rare new strain or extreme temperature profile).
8. **Zero glucose reading too early** — Glucose exhausted at Day 7 (typically Day 15+); suggests possible measurement error or unusually active yeast. Flagged as anomaly.

---

## What Would Impress a Domain Expert

1. **Shikomi stage tracking** — The three-addition system (soe, naka, tome) used in traditional sake brewing is rarely implemented in generic fermentation apps. Showing a timeline with labeled shikomi additions signals real sake domain knowledge.

2. **Nihonshu-do trajectory, not just final SMV** — Most dashboards show the final SMV. A domain expert expects to see the SMV evolving day by day through moromi, with a model prediction curve. This is how toji actually monitor fermentation progress.

3. **K7 vs K9 vs K901 strain differentiation** — Naming actual Kyokai (Brewing Society of Japan) strain numbers in dropdown menus is a strong insider signal. Generic "Strain A / Strain B" labeling immediately reads as template.

4. **Temperature schedule as a predictive input** — The bidirectional model should accept a planned day-by-day temperature schedule as a forward-looking input and generate a predicted ABV trajectory. This is exactly what Yokogawa's AI-guided system does and what the client's description implies.

5. **ALCOA+ data integrity note** — Biotech labs that work with regulatory frameworks (TTB for sake in the US, potential FDA pathways for functional fermented products) follow ALCOA+ principles (Attributable, Legible, Contemporaneous, Original, Accurate). A timestamp and user attribution on every log entry is a quiet signal of regulatory awareness.

---

## Common Systems & Tools Used

| Tool / System | Role |
|---|---|
| Benchling | Electronic Lab Notebook (ELN) + LIMS for biotech R&D teams |
| BrewsakeOrg / BreweryDB | Recipe and batch calculation tools for craft sake |
| Sennos (formerly Precision Fermentation) | AI fermentation monitoring — direct competitor reference |
| Yokogawa FAST/TOOLS | Industrial process control used by commercial breweries |
| QIIME2 | Microbiome analysis pipeline (16S rRNA sequencing) — used for microbiome panel data |
| JMP (SAS) | Statistical analysis of fermentation process data |
| LabArchives / Quartzy | ELN and lab management for small biotech teams |
| AWS / GCP | Cloud infrastructure for model training (likely used by Palaka) |
| Python (scikit-learn, PyTorch) | ML model development environment |
| TTB COLA / FDA databases | Regulatory compliance references for US sake production |

---

## Geographic / Cultural Considerations

- **US regulatory context**: Sake in the US is regulated by the TTB (Alcohol and Tobacco Tax and Trade Bureau). Commercial sake must meet labeling and production standards. The app may need to reference "TTB Certificate of Label Approval (COLA)" in compliance views.
- **Virginia-specific**: Northern Virginia is tech-corridor territory. Clients in this region are comfortable with sophisticated B2B SaaS interfaces — they are not a rural craft brewery audience.
- **Units**: Imperial and metric coexist — temperature is typically Celsius for fermentation (international brewing standard), volume in liters, weight in kilograms. Some US craft brewers also use Fahrenheit and gallons. The app should default to metric but may need a unit toggle.
- **Japanese terminology**: Using Japanese terms alongside English translations is appropriate and expected — it signals cultural fluency with the domain (e.g., "Nihonshu-do (SMV)" in KPI card titles, "Shubo / Moto" in stage labels). Do not over-anglicize.
- **Time zone**: Eastern Time (ET) for Northern Virginia primary users; any deployment timestamping should be configurable.

---

## Data Architect Notes

- **Primary entity**: `FermentationBatch` — fields: batchId (e.g., "B-2025-019"), sakeName, grade (Junmai/Ginjo/Daiginjo/Junmai-Ginjo/Junmai-Daiginjo), riceVariety, riceWeightKg, seimaibuai (number, 35-80), yeastStrain (K7/K9/K901/K1801/etc.), kojiProfile, startDate, targetABV, targetSMV, currentDay, status (see Status Label Vocabulary above), toji (person name)
- **Daily readings entity**: `FermentationReading` — fields: batchId (FK), readingDate, fermentationDay, temperature, abv, nihonshudo, sanDo, aminoDo, glucoseGL, co2Rate, anomalyFlag (boolean), notes, loggedBy
- **Model predictions entity**: `ModelPrediction` — fields: batchId (FK), runDate, predictedFinalABV, predictedFinalSMV, confidenceScore, trajectoryPoints (array of {day, predictedABV}), modelVersion, status ("Running"/"Complete"/"Diverged")
- **Panel uploads entity**: `DataPanel` — fields: panelId, batchId (FK, nullable), panelType ("CSV"/"FASTA"/"ChemicalPanel"), fileName, uploadDate, uploadedBy, status ("Processing"/"Validated"/"Ingested"/"Failed Validation"), errorMessage (nullable), recordCount
- **Status labels to use exactly**: "Koji Preparation", "Shubo Active", "Moromi Day {N}", "Pressing Scheduled", "Pressed", "Completed", "Abandoned", "Contamination Alert", "Temperature Deviation", "Stalled Fermentation", "Low ABV Warning"
- **ABV values**: range 13.5–19.8%, decimal precision 1 (e.g., 15.2)
- **Nihonshu-do (SMV)**: range -8 to +12 for typical sake, integer
- **San-do**: range 0.9–2.1, decimal precision 1
- **Amino-do**: range 0.8–1.9, decimal precision 1
- **Temperature**: range 7.0–16.5°C, decimal precision 1
- **Seimaibuai**: 35, 40, 50, 55, 60, 65, 70 (common round percentages)
- **Edge cases to include**: 1 abandoned batch (contamination), 1 stalled fermentation batch, 1 batch with temperature deviation reading, 1 failed panel upload record, 1 model divergence result, 1 exceptional high-ABV batch (19.8% genshu)
- **Date patterns**: Batches started in last 90 days (Oct-Dec for winter brewing season — toji traditionally brew in winter). Use dates from November 2024 – February 2025.
- **Chart time-series**: 12 months of monthly batch counts and average final ABV (Jan 2024 – Dec 2024) for trend charts

## Layout Builder Notes

- **Density**: Standard density (not compact). `--content-padding: 1.25rem`, `--card-padding: 1rem`, `--sidebar-width: 16rem`
- **Primary aesthetic**: Linear/Minimal — clean, precise, data-first. CSS `--radius: 0.375rem` (slightly sharper than default 0.5rem to feel more scientific/clinical)
- **Primary color**: Cool aqua-teal — `oklch(0.52 0.14 195)` — scientific, evokes fermentation tank water/precision equipment. Avoid warm blues that read as generic corporate.
- **Sidebar background**: Slightly warm off-white `oklch(0.97 0.01 100)` — distinguishable from content area without being dramatic
- **Status badge colors**: Use semantic colors rigorously — "Contamination Alert" → `--destructive`, "Stalled Fermentation" → `--warning`, "Moromi Day N" → `--primary`, "Completed" → `--success`
- **Typography**: Geist Sans (default) is appropriate. Use Geist Mono for all numeric readouts (Nihonshu-do values, ABV percentages, temperature readings) — tabular-nums, monospace
- **Key domain pattern**: Every batch card should show a mini sparkline (ABV trajectory, last 7 readings) — this is how fermentation scientists assess batch health at a glance. This is NOT just a colored badge.
- **Motion**: Snappy (100-150ms) — scientists expect responsive, professional tools, not playful animations
- **Border treatment**: `border-border/60` — subtle, not absent. Data tables need clear column separation.

## Demo Screen Builder Notes

- **Hero metric** (largest stat card): "Active Batches" count with sub-label showing "X in moromi stage" — this is what a toji checks first every morning
- **Primary chart**: Area chart — "ABV Trajectory" showing predicted vs. actual ABV over moromi days for the most recent batch. X-axis: fermentation days (1-30), Y-axis: ABV %. Overlay: dashed predicted line (model output), solid actual line (logged readings). This is the core product value visualization.
- **Secondary chart**: Bar chart — "Monthly Batch Completions" for the past 12 months showing batch volume trend
- **Domain-specific panel** that will impress: **"Model Prediction Panel"** — a side-by-side of current readings vs. model predicted readings for the active selected batch, with confidence interval bands around the trajectory. This directly visualizes what the bidirectional model does and is the "wow" moment in the demo.
- **Batch status grid**: Compact cards for each active batch showing: batch ID, sake grade, current moromi day, current ABV vs. predicted ABV, status badge, last-updated timestamp. 8-12 cards in a responsive grid. Each card has a mini sparkline.
- **Important UI pattern**: A dropdown/selector at the top of the main chart that lets the user switch between batches — this simulates the model's core interactivity and shows how the trajectory view updates per batch.
- **One interactive element**: Clicking a batch card navigates to the detail view with full trajectory chart, reading history table, and model prediction panel. This replicates the core workflow of the app.
