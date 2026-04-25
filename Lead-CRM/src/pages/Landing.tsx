import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import {
  ArrowRight,
  Flame,
  Inbox,
  CheckCircle2,
  ShieldCheck,
  MessageSquare,
  Calendar,
  Zap,
  Users,
  BarChart3,
  Sparkles,
  Code2,
} from "lucide-react";

const Landing = () => {
  const { user } = useAuth();

  useEffect(() => {
    document.title = "Wanga's CRM — Turn website leads into customers";
    const meta = document.querySelector('meta[name="description"]');
    const description =
      "Wanga's CRM is a focused CRM for capturing leads from your website, tracking statuses, and never missing a follow-up. Dark mode by default.";
    if (meta) meta.setAttribute("content", description);
  }, []);

  const ctaTo = user ? "/dashboard" : "/login";
  const ctaLabel = user ? "Open dashboard" : "Sign in";

  return (
    <div className="min-h-screen">
      {/* Nav */}
      <header className="sticky top-0 z-30 border-b border-border/60 glass">
        <div className="container flex h-16 items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary shadow-glow">
              <Flame className="h-4 w-4 text-primary-foreground" />
            </div>
            <div className="font-display text-lg font-semibold tracking-tight">
              Wanga's <span className="text-muted-foreground">CRM</span>
            </div>
          </Link>

          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            <a href="#features" className="transition-smooth hover:text-foreground">Features</a>
            <a href="#workflow" className="transition-smooth hover:text-foreground">Workflow</a>
            <a href="#pricing" className="transition-smooth hover:text-foreground">Pricing</a>
            <a href="#faq" className="transition-smooth hover:text-foreground">FAQ</a>
          </nav>

          <div className="flex items-center gap-2">
            {!user && (
              <>
                <Link
                  to="/login"
                  className="hidden text-sm text-muted-foreground transition-smooth hover:text-foreground sm:inline"
                >
                  Sign in
                </Link>
                <Button asChild variant="outline" className="hidden border-border/60 sm:inline-flex">
                  <Link to="/signup">Sign up</Link>
                </Button>
              </>
            )}
            <Button asChild className="gap-1.5 shadow-md">
              <Link to={user ? "/dashboard" : "/signup"}>
                {user ? "Open dashboard" : "Get started"}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-hero opacity-80" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />

        <div className="container relative grid gap-12 py-20 md:py-28 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/40 px-3 py-1 text-xs font-medium text-muted-foreground">
              <Sparkles className="h-3 w-3 text-accent" />
              Built for small teams that hate losing leads
            </div>

            <h1 className="mt-5 font-display text-5xl font-semibold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
              Every lead.
              <br />
              <span className="bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
                One focused inbox.
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              Wanga's CRM captures contact-form submissions, tracks status from
              <em className="text-foreground"> new </em> to <em className="text-foreground">converted</em>,
              and keeps every follow-up note pinned to the right person.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="gap-1.5 shadow-glow">
                <Link to={ctaTo}>
                  {user ? "Open dashboard" : "Get started — free"}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-border/60">
                <a href="#features">See how it works</a>
              </Button>
            </div>

            <div className="mt-8 flex items-center gap-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                No credit card
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                2-minute setup
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                Role-based access
              </div>
            </div>
          </div>

          {/* Hero mock */}
          <div className="relative animate-fade-in">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-primary opacity-20 blur-2xl" />
            <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-card shadow-lg">
              <div className="flex items-center gap-1.5 border-b border-border/60 bg-background/40 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-warning/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-success/60" />
                <span className="ml-3 font-mono text-xs text-muted-foreground">
                  wanga's.crm/dashboard
                </span>
              </div>

              <div className="space-y-3 p-5">
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { l: "New", v: 12, c: "text-primary bg-primary/10" },
                    { l: "Contacted", v: 7, c: "text-warning bg-warning/10" },
                    { l: "Converted", v: 4, c: "text-success bg-success/10" },
                  ].map((s) => (
                    <div key={s.l} className="rounded-lg border border-border/60 bg-card/40 p-3">
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                        {s.l}
                      </div>
                      <div className={`mt-1 inline-flex rounded-md px-1.5 font-display text-2xl font-semibold ${s.c}`}>
                        {s.v}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-1.5">
                  {[

                    { n: "Wanga Somhlaba", e: "wanga@gmail.com", s: "new", c: "bg-status-new-bg text-status-new" },
                    { n: "Samkelo Njiva", e: "samkelo@gmail.com", s: "contacted", c: "bg-status-contacted-bg text-status-contacted" },
                    { n: "Keem Sobele", e: "Keem@gmail.com", s: "converted", c: "bg-status-converted-bg text-status-converted" },
                    { n: "Chrisdayday Masulasi", e: "chris@gmail.com", s: "contacted", c: "bg-status-contacted-bg text-status-contacted" },

                  ].map((l, i) => (
                    <div
                      key={l.e}
                      className="flex items-center gap-3 rounded-lg border border-border/60 bg-card/40 px-3 py-2.5"
                      style={{ animationDelay: `${i * 80}ms` }}
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-primary text-[10px] font-semibold text-primary-foreground">
                        {l.n.split(" ").map((p) => p[0]).join("")}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-medium">{l.n}</div>
                        <div className="truncate text-xs text-muted-foreground">{l.e}</div>
                      </div>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium capitalize ${l.c}`}>
                        {l.s}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logos / trust strip */}
      <section className="border-y border-border/60 bg-card/20">
        <div className="container py-8">
          <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Trusted by indie teams shipping fast
          </p>
          <div className="mt-5 grid grid-cols-2 gap-6 opacity-70 sm:grid-cols-3 md:grid-cols-6">
            {["Yoco", "SweepSouth", "Pineapple Insurance", "JUMO", "Acalytica", "Rikatec"].map((n) => (
              <div
                key={n}
                className="text-center font-display text-lg font-semibold tracking-tight text-muted-foreground"
              >
                {n}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="container py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/40 px-3 py-1 text-xs font-medium text-muted-foreground">
            Features
          </div>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-5xl">
            Everything you need.
            <br />
            <span className="text-muted-foreground">Nothing you don't.</span>
          </h2>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: Inbox,
              title: "Lead inbox",
              body: "Every form submission lands in one tidy queue with name, email, source, and message.",
              accent: "text-primary bg-primary/10",
            },
            {
              icon: Zap,
              title: "Status pipeline",
              body: "Move leads through new → contacted → converted with a single click. Lost ones archived cleanly.",
              accent: "text-accent bg-accent/10",
            },
            {
              icon: MessageSquare,
              title: "Threaded notes",
              body: "Keep call summaries, objections, and next steps stitched to each lead. Never lose context again.",
              accent: "text-warning bg-warning/10",
            },
            {
              icon: Calendar,
              title: "Follow-up reminders",
              body: "Schedule the next touch directly on a lead so nothing slips through the cracks.",
              accent: "text-success bg-success/10",
            },
            {
              icon: ShieldCheck,
              title: "Role-based access",
              body: "Admins manage records and pipeline. Agents read leads and add notes. Clean separation, by design.",
              accent: "text-primary bg-primary/10",
            },
            {
              icon: BarChart3,
              title: "At-a-glance stats",
              body: "Total, new, contacted, converted — your pipeline health in four numbers, always visible.",
              accent: "text-accent bg-accent/10",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="group relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-card p-6 transition-smooth hover:border-border hover:shadow-md"
            >
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${f.accent}`}>
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold tracking-tight">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Workflow */}
      <section id="workflow" className="border-y border-border/60 bg-card/20">
        <div className="container py-20 md:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/40 px-3 py-1 text-xs font-medium text-muted-foreground">
              Workflow
            </div>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-5xl">
              From form submit to closed deal.
            </h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Lead lands",
                body: "Your website form posts to Lumen. The lead appears in the inbox tagged as New.",
              },
              {
                step: "02",
                title: "Agent works it",
                body: "Reach out, log the call, and pin notes. Mark the lead Contacted and set a follow-up.",
              },
              {
                step: "03",
                title: "Admin closes",
                body: "When the deal lands, an admin moves it to Converted. The pipeline stats update instantly.",
              },
            ].map((s) => (
              <div
                key={s.step}
                className="relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-card p-6"
              >
                <div className="font-mono text-xs font-medium tracking-widest text-primary">
                  STEP {s.step}
                </div>
                <h3 className="mt-3 font-display text-xl font-semibold tracking-tight">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="container py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/40 px-3 py-1 text-xs font-medium text-muted-foreground">
            Pricing
          </div>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-5xl">
            Simple, honest pricing.
          </h2>
          <p className="mt-3 text-muted-foreground">
            Start free. Upgrade when your team grows.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-border/60 bg-gradient-card p-7">
            <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Solo
            </div>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="font-display text-5xl font-semibold tracking-tight">$0</span>
              <span className="text-sm text-muted-foreground">/forever</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">For founders running their own pipeline.</p>
            <ul className="mt-6 space-y-2.5 text-sm">
              {["Unlimited leads", "Status & follow-ups", "Notes per lead", "1 user"].map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  {f}
                </li>
              ))}
            </ul>
            <Button asChild variant="outline" className="mt-7 w-full border-border/60">
              <Link to={ctaTo}>{ctaLabel}</Link>
            </Button>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-primary/40 bg-gradient-card p-7 shadow-glow">
            <div className="absolute right-5 top-5 rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground">
              Popular
            </div>
            <div className="text-xs font-medium uppercase tracking-wider text-primary">
              Team
            </div>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="font-display text-5xl font-semibold tracking-tight">$19</span>
              <span className="text-sm text-muted-foreground">/user / month</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">For teams that close together.</p>
            <ul className="mt-6 space-y-2.5 text-sm">
              {[
                "Everything in Solo",
                "Admin & Agent roles",
                "Unlimited team members",
                "Priority support",
              ].map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  {f}
                </li>
              ))}
            </ul>
            <Button asChild className="mt-7 w-full">
              <Link to={ctaTo}>Start free trial</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t border-border/60 bg-card/20">
        <div className="container py-20 md:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
              Questions, answered.
            </h2>
          </div>
          <div className="mx-auto mt-12 max-w-3xl space-y-3">
            {[
              {
                q: "Can I connect my existing website form?",
                a: "Yes. Wanga's CRM exposes a clean REST API. Point your form's POST endpoint at /api/leads and submissions show up instantly.",
              },
              {
                q: "What's the difference between Admin and Agent?",
                a: "Admins create, edit, and delete leads, change statuses, and manage the pipeline. Agents read leads and add notes — perfect for SDRs.",
              },
              {
                q: "Do you offer a dark mode?",
                a: "Wanga's CRM is dark by default — designed to be easy on the eyes during long pipeline-grooming sessions.",
              },
              {
                q: "Can I export my data?",
                a: "Always. Your leads belong to you. CSV export is one click away.",
              },
            ].map((f) => (
              <details
                key={f.q}
                className="group rounded-xl border border-border/60 bg-gradient-card p-5 transition-smooth hover:border-border"
              >
                <summary className="flex cursor-pointer items-center justify-between font-medium">
                  {f.q}
                  <span className="text-muted-foreground transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container py-20 md:py-28">
        <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-card p-10 text-center md:p-16">
          <div className="pointer-events-none absolute inset-0 bg-gradient-hero opacity-80" />
          <div className="relative">
            <Users className="mx-auto h-10 w-10 text-primary" />
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-5xl">
              Stop losing leads to spreadsheets.
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Sign in with the demo account and try the full pipeline in under a minute.
            </p>
            <Button asChild size="lg" className="mt-7 gap-1.5 shadow-glow">
              <Link to={ctaTo}>
                {ctaLabel}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/60">
        <div className="container flex flex-col items-center justify-between gap-4 py-8 text-sm text-muted-foreground md:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-primary">
              <Flame className="h-3 w-3 text-primary-foreground" />
            </div>
            <span>© {new Date().getFullYear()} Wanga's CRM</span>
          </div>
          <div className="flex items-center gap-5">
            <a href="#features" className="hover:text-foreground">Features</a>
            <a href="#pricing" className="hover:text-foreground">Pricing</a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 hover:text-foreground"
            >
              <Code2 className="h-3.5 w-3.5" />
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
