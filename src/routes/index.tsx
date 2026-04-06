import { createFileRoute } from "@tanstack/react-router";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useState, useEffect } from "react";
import {
  ArrowRight,
  Wallet,
  PieChart,
  Target,
  BrainCircuit,
  BellRing,
  TrendingUp,
  ShieldCheck,
  Lightbulb,
  Heart,
  Zap,
  BarChart3,
  Menu,
  X,
  Star,
  ChevronRight,
} from "lucide-react";
import phoneMockup from "@/assets/phone-mockup.png";
import laptopMockup from "@/assets/laptop-mockup.png";
import phoneAiChat from "@/assets/phone-ai-chat.png";

export const Route = createFileRoute("/")({
  component: FinanceLandingPage,
  head: () => ({
    meta: [
      { title: "FinWise — Your Smart Financial Assistant" },
      {
        name: "description",
        content:
          "Take control of your money with AI-powered insights, smart budgets, and personalized financial advice. Track expenses, reach savings goals, and make smarter decisions.",
      },
      { property: "og:title", content: "FinWise — Your Smart Financial Assistant" },
      {
        property: "og:description",
        content:
          "AI-powered personal finance app. Track spending, set budgets, get smart advice, and reach your financial goals faster.",
      },
    ],
  }),
});

/* ─── Data ──────────────────────────────────────────── */
const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Dashboard", href: "#dashboard" },
  { label: "AI Advisor", href: "#ai-advisor" },
  { label: "Benefits", href: "#benefits" },
];

const features = [
  {
    icon: Wallet,
    title: "Expense & Income Tracking",
    description: "Automatically categorize transactions and see exactly where your money goes each month.",
  },
  {
    icon: PieChart,
    title: "Category Budgets",
    description: "Set spending limits per category and get alerts before you overspend.",
  },
  {
    icon: BarChart3,
    title: "Financial Dashboard",
    description: "Beautiful charts and analytics that make complex finances simple to understand.",
  },
  {
    icon: BrainCircuit,
    title: "AI Financial Advisor",
    description: "Get personalized, actionable advice based on your spending patterns and goals.",
  },
  {
    icon: Target,
    title: "Savings Goals",
    description: "Set goals, track progress, and watch your savings grow with smart automation.",
  },
  {
    icon: BellRing,
    title: "Smart Notifications",
    description: "Timely alerts for unusual spending, bill reminders, and milestone achievements.",
  },
];

const benefits = [
  { icon: TrendingUp, title: "Save More Money", description: "Users save an average of 23% more in their first 3 months." },
  { icon: Lightbulb, title: "Gain Financial Clarity", description: "See the full picture of your finances in one clean dashboard." },
  { icon: BrainCircuit, title: "Smarter Decisions", description: "AI-powered insights help you make better financial choices daily." },
  { icon: Target, title: "Reach Goals Faster", description: "Automated savings and tracking keep you on pace to hit every goal." },
  { icon: Heart, title: "Reduce Financial Stress", description: "Know exactly where you stand — no surprises, no anxiety." },
  { icon: Zap, title: "Effortless Control", description: "Smart automation means less manual work, more financial confidence." },
];

const testimonials = [
  {
    name: "Sarah K.",
    role: "Freelance Designer",
    text: "FinWise helped me finally understand where my money was going. I've saved $2,400 in just 4 months.",
    rating: 5,
  },
  {
    name: "Marcus T.",
    role: "Software Engineer",
    text: "The AI advisor is like having a personal financial coach. It spotted spending patterns I never noticed.",
    rating: 5,
  },
  {
    name: "Priya R.",
    role: "Small Business Owner",
    text: "Clean, simple, and actually useful. The budget alerts alone have saved me from overspending countless times.",
    rating: 5,
  },
];

/* ─── Components ────────────────────────────────────── */

function RevealSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function StickyNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-card/95 border-b border-border shadow-sm backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <a href="#" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Wallet className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold tracking-tight">FinWise</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector(l.href)?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <a href="#cta" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Sign In
          </a>
          <a
            href="#cta"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
          >
            Get Started
          </a>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 text-foreground md:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-card px-4 pb-4 md:hidden">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={(e) => {
                e.preventDefault();
                setMobileOpen(false);
                document.querySelector(l.href)?.scrollIntoView({ behavior: "smooth" });
              }}
              className="block py-3 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#cta"
            onClick={() => setMobileOpen(false)}
            className="mt-2 block w-full rounded-lg bg-primary px-5 py-2.5 text-center text-sm font-semibold text-primary-foreground"
          >
            Get Started
          </a>
        </div>
      )}
    </nav>
  );
}

/* ─── Page ───────────────────────────────────────────── */
function FinanceLandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <StickyNav />

      {/* ── Hero ─────────────────────────────────────── */}
      <section className="relative overflow-hidden px-4 pt-24 pb-16 sm:px-6 sm:pt-32 sm:pb-24">
        {/* Subtle gradient bg */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />

        <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-12 lg:flex-row lg:gap-16">
          {/* Left content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5 text-secondary" />
              Trusted by 50,000+ users
            </div>

            <h1 className="mt-6 text-[36px] font-bold leading-[1.08] tracking-tight sm:text-[48px] lg:text-[56px]">
              Your money,{" "}
              <span className="text-primary">
                intelligently managed
              </span>
            </h1>

            <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg lg:mx-0 mx-auto">
              Not just a finance tracker — a smart financial assistant that analyzes your habits, gives personalized advice, and helps you build lasting wealth.
            </p>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start justify-center">
              <a
                href="#cta"
                className="group inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:brightness-110"
              >
                Get Started Free
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#features"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3 text-base font-medium text-foreground transition-all hover:bg-muted"
              >
                Learn More
              </a>
            </div>

            {/* Trust metrics */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 lg:justify-start">
              <div className="text-center lg:text-left">
                <span className="block text-2xl font-bold text-foreground">4.9★</span>
                <span className="text-xs text-muted-foreground">App Store</span>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="text-center lg:text-left">
                <span className="block text-2xl font-bold text-foreground">$140M+</span>
                <span className="text-xs text-muted-foreground">Tracked</span>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="text-center lg:text-left">
                <span className="block text-2xl font-bold text-foreground">50K+</span>
                <span className="text-xs text-muted-foreground">Users</span>
              </div>
            </div>
          </div>

          {/* Right — phone mockup */}
          <div className="relative flex-shrink-0 lg:w-[400px]">
            <div className="animate-fade-in" style={{ animationDelay: "300ms", animationFillMode: "backwards" }}>
              <img
                src={phoneMockup}
                alt="FinWise app showing financial dashboard with expense tracking and category breakdown"
                className="mx-auto w-72 drop-shadow-2xl sm:w-80 lg:w-full"
                width={600}
                height={1024}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── About Section ────────────────────────────── */}
      <section className="px-4 py-20 sm:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <RevealSection>
            <span className="inline-block rounded-full bg-secondary/10 px-4 py-1.5 text-xs font-semibold text-secondary">
              Why FinWise?
            </span>
            <h2 className="mt-5 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
              Financial clarity in a world of complexity
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Most people don't overspend because they're careless — they simply lack visibility.
              FinWise gives you a clear, intelligent view of your entire financial life so you can
              make confident decisions every day.
            </p>
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                { label: "Track every dollar", desc: "Automatic categorization & real-time insights" },
                { label: "AI-powered advice", desc: "Personalized tips based on your actual habits" },
                { label: "Reach goals faster", desc: "Smart automation keeps you on pace" },
              ].map((item) => (
                <div key={item.label} className="rounded-xl border border-border bg-card p-5 text-left">
                  <div className="mb-2 h-1 w-8 rounded-full bg-primary" />
                  <h3 className="text-sm font-semibold">{item.label}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── Features Grid ────────────────────────────── */}
      <section id="features" className="bg-muted/40 px-4 py-20 sm:py-28">
        <RevealSection className="text-center">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
            Core Features
          </span>
          <h2 className="mt-5 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
            Everything you need to master your finances
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
            Powerful tools designed to be simple. No financial degree required.
          </p>
        </RevealSection>

        <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <RevealSection key={f.title} delay={i * 80}>
              <div className="group h-full rounded-xl border border-border bg-card p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
                <div className="mb-4 inline-flex rounded-lg bg-primary p-2.5">
                  <f.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <h3 className="mb-2 text-sm font-semibold">{f.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{f.description}</p>
              </div>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* ── Dashboard Preview ────────────────────────── */}
      <section id="dashboard" className="px-4 py-20 sm:py-28">
        <RevealSection className="text-center">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
            Dashboard
          </span>
          <h2 className="mt-5 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
            Your finances, beautifully organized
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
            A clean, intuitive dashboard that turns complex financial data into clear, actionable insights.
          </p>
        </RevealSection>

        <RevealSection delay={200}>
          <div className="mx-auto mt-14 max-w-5xl">
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-primary/5">
              <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-2.5">
                <div className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
                <div className="h-2.5 w-2.5 rounded-full bg-secondary/60" />
                <div className="h-2.5 w-2.5 rounded-full bg-stock-healthy/60" />
                <div className="ml-3 h-5 flex-1 rounded bg-muted/80" />
              </div>
              <img
                src={laptopMockup}
                alt="FinWise dashboard showing financial overview, spending analytics, savings goals, and budget categories"
                className="w-full"
                loading="lazy"
                width={1280}
                height={800}
              />
            </div>
          </div>
        </RevealSection>
      </section>

      {/* ── AI Advisor Section ───────────────────────── */}
      <section id="ai-advisor" className="bg-gradient-to-b from-primary/5 via-muted/30 to-background px-4 py-20 sm:py-28">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-14 lg:flex-row lg:gap-20">
          {/* Phone mockup */}
          <RevealSection className="flex-shrink-0 lg:order-1 lg:w-[340px]">
            <img
              src={phoneAiChat}
              alt="AI financial advisor chat showing personalized savings advice"
              className="mx-auto w-64 drop-shadow-2xl sm:w-72 lg:w-full"
              loading="lazy"
              width={600}
              height={1024}
            />
          </RevealSection>

          {/* Content */}
          <RevealSection className="flex-1 text-center lg:text-left">
            <span className="inline-block rounded-full bg-secondary/10 px-4 py-1.5 text-xs font-semibold text-secondary">
              AI-Powered
            </span>
            <h2 className="mt-5 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
              Your intelligent financial companion
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              More than analytics — FinWise understands your financial behavior and gives you
              personalized, actionable advice to improve your financial health.
            </p>

            <div className="mt-8 space-y-4 text-left">
              {[
                "Analyzes your spending habits automatically",
                "Gives personalized advice to save more",
                "Detects unusual spending patterns",
                "Suggests optimizations for subscriptions & bills",
                "Answers your financial questions instantly",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary">
                    <ChevronRight className="h-3 w-3 text-card" />
                  </div>
                  <span className="text-sm text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── Benefits Section ─────────────────────────── */}
      <section id="benefits" className="px-4 py-20 sm:py-28">
        <RevealSection className="text-center">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
            Outcomes
          </span>
          <h2 className="mt-5 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
            Real results, not just features
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
            FinWise isn't about tracking numbers — it's about transforming your relationship with money.
          </p>
        </RevealSection>

        <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b, i) => (
            <RevealSection key={b.title} delay={i * 80}>
              <div className="group h-full rounded-xl border border-border bg-card p-6 text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
                <div className="mx-auto mb-4 inline-flex rounded-lg bg-primary/10 p-3">
                  <b.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-sm font-semibold">{b.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{b.description}</p>
              </div>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────── */}
      <section className="bg-muted/40 px-4 py-20 sm:py-28">
        <RevealSection className="text-center">
          <span className="inline-block rounded-full bg-secondary/10 px-4 py-1.5 text-xs font-semibold text-secondary">
            Testimonials
          </span>
          <h2 className="mt-5 text-2xl font-bold tracking-tight sm:text-3xl">
            Loved by thousands
          </h2>
        </RevealSection>

        <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3">
          {testimonials.map((t, i) => (
            <RevealSection key={t.name} delay={i * 100}>
              <div className="h-full rounded-xl border border-border bg-card p-6">
                <div className="mb-3 flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-secondary text-secondary" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-foreground">&ldquo;{t.text}&rdquo;</p>
                <div className="mt-4 border-t border-border pt-4">
                  <span className="text-sm font-semibold">{t.name}</span>
                  <span className="block text-xs text-muted-foreground">{t.role}</span>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────── */}
      <section id="cta" className="px-4 py-24 sm:py-32">
        <div className="mx-auto max-w-3xl rounded-2xl bg-primary px-6 py-16 text-center sm:px-12 sm:py-20">
          <RevealSection>
            <div className="mx-auto mb-6 inline-flex rounded-xl bg-primary-foreground/10 p-3">
              <Wallet className="h-8 w-8 text-primary-foreground" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-primary-foreground sm:text-3xl lg:text-4xl">
              Start your journey to financial freedom
            </h2>
            <p className="mx-auto mt-4 max-w-md text-base text-primary-foreground/70">
              Join 50,000+ users who are already making smarter financial decisions with FinWise.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                className="group inline-flex items-center gap-2 rounded-lg bg-card px-6 py-3 text-base font-semibold text-foreground shadow-lg transition-all hover:bg-card/90"
              >
                Get Started Free
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <span className="text-sm text-primary-foreground/60">No credit card required</span>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────── */}
      <footer className="border-t border-border px-4 py-12">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
                <Wallet className="h-3.5 w-3.5 text-primary-foreground" />
              </div>
              <span className="text-base font-semibold">FinWise</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Your smart financial assistant.
            </p>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold">Product</h4>
            <div className="space-y-2">
              <a href="#features" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
              <a href="#dashboard" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Dashboard</a>
              <a href="#ai-advisor" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">AI Advisor</a>
            </div>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold">Company</h4>
            <div className="space-y-2">
              <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">About</a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Careers</a>
            </div>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold">Legal</h4>
            <div className="space-y-2">
              <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Security</a>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-6xl border-t border-border pt-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} FinWise. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
