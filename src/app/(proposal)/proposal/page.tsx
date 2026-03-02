import { APP_CONFIG } from "@/lib/config";
import { profile, portfolioProjects } from "@/data/proposal";
import { ProjectCard } from "@/components/proposal/project-card";
import { SkillsGrid } from "@/components/proposal/skills-grid";

export default function ProposalPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-12">

        {/* ── Section 1: Hero — dark panel ── */}
        <section
          className="relative rounded-lg overflow-hidden"
          style={{ background: "oklch(0.10 0.02 var(--primary-h, 185))" }}
        >
          {/* Subtle radial highlight */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(ellipse at 20% 30%, oklch(0.55 0.12 var(--primary-h, 185) / 0.12), transparent 65%)",
            }}
          />

          <div className="relative z-10 px-8 py-10 md:px-12 md:py-12 space-y-6">
            {/* Effort badge — mandatory */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1" style={{ background: "rgb(255 255 255 / 0.08)" }}>
              <span className="relative inline-flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
              </span>
              <span className="font-mono text-xs tracking-wider text-white/70">
                Built this demo for your project
              </span>
            </div>

            {/* Name + value prop */}
            <div className="space-y-2">
              <p className="font-mono text-xs tracking-widest uppercase text-white/40">
                Full-Stack Developer · Next.js Specialist
              </p>
              <h1 className="text-4xl md:text-5xl tracking-tight leading-none">
                <span className="font-light text-white/80">Hi, I&apos;m </span>
                <span className="font-black text-white">{profile.name}</span>
              </h1>
              <p className="text-lg md:text-xl text-white/70 max-w-2xl leading-relaxed">
                I build fermentation platform interfaces that talk to your
                prediction model — forward and inverse queries, structured data
                uploads, and the user management layer. The demo in Tab 1 is
                already built for {APP_CONFIG.projectName}.
              </p>
            </div>
          </div>

          {/* Stats shelf */}
          <div className="relative z-10 border-t border-white/10 px-8 py-5 md:px-12" style={{ background: "rgb(255 255 255 / 0.05)" }}>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <div className="text-2xl font-bold text-white tabular-nums">24+</div>
                <div className="text-xs text-white/50 mt-0.5">Projects Shipped</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white tabular-nums">&lt; 48hr</div>
                <div className="text-xs text-white/50 mt-0.5">Demo Turnaround</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white tabular-nums">15+</div>
                <div className="text-xs text-white/50 mt-0.5">Industries Served</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Section 2: Proof of Work ── */}
        <section className="space-y-4">
          <div>
            <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground">
              Proof of Work
            </p>
            <h2 className="text-2xl font-bold tracking-tight mt-1">
              Relevant Projects
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {portfolioProjects.map((project) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.description}
                tech={project.tech}
                relevance={project.relevance}
                outcome={project.outcome}
                liveUrl={project.liveUrl}
              />
            ))}
          </div>
        </section>

        {/* ── Section 3: How I Work ── */}
        <section className="space-y-4">
          <div>
            <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground">
              Process
            </p>
            <h2 className="text-2xl font-bold tracking-tight mt-1">
              How I Work
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {profile.approach.map((step, i) => (
              <div
                key={step.title}
                className="rounded-lg border border-border/60 bg-card p-5 space-y-2 shadow-[0_1px_2px_0_rgb(0_0_0/0.03)]"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs tracking-widest uppercase text-muted-foreground">
                    Step 0{i + 1}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground/60">
                    {i === 0
                      ? "Day 1"
                      : i === 1
                      ? "Days 2-5"
                      : i === 2
                      ? "Week 1-2"
                      : "Ongoing"}
                  </span>
                </div>
                <h3 className="text-base font-semibold">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Section 4: Skills Grid ── */}
        <section className="space-y-4">
          <div>
            <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground">
              Tech Stack
            </p>
            <h2 className="text-2xl font-bold tracking-tight mt-1">
              What I Build With
            </h2>
          </div>

          <SkillsGrid categories={profile.skillCategories} />
        </section>

        {/* ── Section 5: CTA — dark panel ── */}
        <section
          className="relative rounded-lg overflow-hidden text-center"
          style={{ background: "oklch(0.10 0.02 var(--primary-h, 185))" }}
        >
          <div className="relative z-10 px-8 py-10 md:px-12 md:py-12 space-y-4">
            {/* Pulsing availability indicator */}
            <div className="flex items-center justify-center gap-2">
              <span className="relative inline-flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[color:var(--success)] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[color:var(--success)]" />
              </span>
              <span
                className="text-sm"
                style={{
                  color: "color-mix(in oklch, var(--success) 80%, white)",
                }}
              >
                Currently available for new projects
              </span>
            </div>

            {/* Tailored headline */}
            <h2 className="text-2xl font-bold text-white">
              Ready to ship your fermentation platform MVP.
            </h2>

            {/* Specific body — references the demo */}
            <p className="text-white/70 max-w-lg mx-auto leading-relaxed">
              The demo in Tab 1 is already the hard part — the model interface,
              the data upload flow, the prediction display. The production
              version has auth, your real API endpoint, and a clean handoff.
              That&apos;s a two-week sprint.
            </p>

            {/* Primary action — text, not a dead link */}
            <p className="text-lg font-semibold text-white pt-2">
              Reply on Upwork to start
            </p>

            {/* Back to demo */}
            <a
              href="/"
              className="inline-flex items-center gap-1 text-sm text-white/50 hover:text-white/70 transition-colors duration-100"
            >
              ← Back to the demo
            </a>

            {/* Signature */}
            <p className="pt-4 text-sm text-white/40 border-t border-white/10 mt-4">
              — Humam
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}
