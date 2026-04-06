import { createFileRoute } from "@tanstack/react-router";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useState, useEffect, createContext, useContext, type ReactNode } from "react";
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
  Moon,
  Sun,
  Globe,
  Download,
  Smartphone,
  Mail,
} from "lucide-react";
import phoneMockup from "@/assets/phone-mockup.png";
import laptopMockup from "@/assets/laptop-mockup.png";
import phoneAiChat from "@/assets/phone-ai-chat.png";
import logoImg from "@/assets/logowithoutbg.png";

export const Route = createFileRoute("/")({
  component: FinanceLandingPage,
  head: () => ({
    meta: [
      { title: "Finewa — Your Smart Financial Assistant" },
      {
        name: "description",
        content:
          "Take control of your money with AI-powered insights, smart budgets, and personalized financial advice.",
      },
      { property: "og:title", content: "Finewa — Your Smart Financial Assistant" },
      {
        property: "og:description",
        content: "AI-powered personal finance app. Track spending, set budgets, get smart advice.",
      },
    ],
  }),
});

const APP_URL = "https://finwine.netlify.app/";

/* ─── i18n ──────────────────────────────────────────── */
type Lang = "en" | "fr";
const LangCtx = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({ lang: "en", setLang: () => {} });
const useLang = () => useContext(LangCtx);

const t: Record<string, Record<Lang, string>> = {
  trustedBy: { en: "Trusted by 50,000+ users", fr: "Adopté par plus de 50 000 utilisateurs" },
  heroTitle1: { en: "Your money,", fr: "Votre argent," },
  heroTitle2: { en: "intelligently managed", fr: "géré intelligemment" },
  heroSub: {
    en: "Not just a finance tracker — a smart financial assistant that analyzes your habits, gives personalized advice, and helps you build lasting wealth.",
    fr: "Plus qu'un suivi financier — un assistant intelligent qui analyse vos habitudes, donne des conseils personnalisés et vous aide à bâtir votre patrimoine.",
  },
  getStarted: { en: "Get the App", fr: "Obtenir l'App" },
  learnMore: { en: "Learn More", fr: "En savoir plus" },
  appStore: { en: "App Store", fr: "App Store" },
  playStore: { en: "Play Store", fr: "Play Store" },
  countries: { en: "Countries", fr: "Pays" },
  users: { en: "Users", fr: "Utilisateurs" },
  whyFinwise: { en: "Why Finewa?", fr: "Pourquoi Finewa ?" },
  aboutTitle: { en: "Financial clarity in a world of complexity", fr: "La clarté financière dans un monde complexe" },
  aboutSub: {
    en: "Most people don't overspend because they're careless — they simply lack visibility. Finewa gives you a clear, intelligent view of your entire financial life.",
    fr: "La plupart des gens ne dépensent pas trop par négligence — ils manquent simplement de visibilité. Finewa vous offre une vue claire et intelligente de vos finances.",
  },
  aboutCard1Title: { en: "Track every dollar", fr: "Suivez chaque euro" },
  aboutCard1Desc: { en: "Automatic categorization & real-time insights", fr: "Catégorisation automatique et analyses en temps réel" },
  aboutCard2Title: { en: "AI-powered advice", fr: "Conseils propulsés par l'IA" },
  aboutCard2Desc: { en: "Personalized tips based on your actual habits", fr: "Conseils personnalisés basés sur vos habitudes" },
  aboutCard3Title: { en: "Reach goals faster", fr: "Atteignez vos objectifs plus vite" },
  aboutCard3Desc: { en: "Smart automation keeps you on pace", fr: "L'automatisation intelligente vous maintient sur la bonne voie" },
  coreFeatures: { en: "Core Features", fr: "Fonctionnalités clés" },
  featuresTitle: { en: "Everything you need to master your finances", fr: "Tout ce qu'il faut pour maîtriser vos finances" },
  featuresSub: { en: "Powerful tools designed to be simple. No financial degree required.", fr: "Des outils puissants conçus pour être simples. Aucun diplôme en finance requis." },
  feat1Title: { en: "Expense & Income Tracking", fr: "Suivi des dépenses & revenus" },
  feat1Desc: { en: "Automatically categorize transactions and see exactly where your money goes.", fr: "Catégorisez automatiquement vos transactions et voyez où va votre argent." },
  feat2Title: { en: "Category Budgets", fr: "Budgets par catégorie" },
  feat2Desc: { en: "Set spending limits per category and get alerts before you overspend.", fr: "Fixez des limites de dépenses par catégorie et recevez des alertes." },
  feat3Title: { en: "Financial Dashboard", fr: "Tableau de bord financier" },
  feat3Desc: { en: "Beautiful charts that make complex finances simple to understand.", fr: "De beaux graphiques qui rendent les finances complexes simples à comprendre." },
  feat4Title: { en: "AI Financial Advisor", fr: "Conseiller financier IA" },
  feat4Desc: { en: "Get personalized, actionable advice based on your spending patterns.", fr: "Recevez des conseils personnalisés basés sur vos habitudes de dépenses." },
  feat5Title: { en: "Savings Goals", fr: "Objectifs d'épargne" },
  feat5Desc: { en: "Set goals, track progress, and watch your savings grow.", fr: "Fixez des objectifs, suivez vos progrès et regardez votre épargne croître." },
  feat6Title: { en: "Smart Notifications", fr: "Notifications intelligentes" },
  feat6Desc: { en: "Timely alerts for unusual spending, bill reminders, and milestones.", fr: "Alertes pour dépenses inhabituelles, rappels de factures et étapes." },
  dashboard: { en: "Dashboard", fr: "Tableau de bord" },
  dashboardTitle: { en: "Your finances, beautifully organized", fr: "Vos finances, magnifiquement organisées" },
  dashboardSub: { en: "A clean, intuitive dashboard that turns complex data into clear insights.", fr: "Un tableau de bord clair et intuitif qui transforme les données en informations exploitables." },
  aiPowered: { en: "AI-Powered", fr: "Propulsé par l'IA" },
  aiTitle: { en: "Your intelligent financial companion", fr: "Votre compagnon financier intelligent" },
  aiSub: { en: "More than analytics — Finewa understands your financial behavior and gives you personalized advice.", fr: "Plus que de l'analytique — Finewa comprend votre comportement financier et vous donne des conseils personnalisés." },
  aiBullet1: { en: "Analyzes your spending habits automatically", fr: "Analyse automatiquement vos habitudes de dépenses" },
  aiBullet2: { en: "Gives personalized advice to save more", fr: "Donne des conseils personnalisés pour économiser plus" },
  aiBullet3: { en: "Detects unusual spending patterns", fr: "Détecte les habitudes de dépenses inhabituelles" },
  aiBullet4: { en: "Suggests optimizations for subscriptions & bills", fr: "Suggère des optimisations pour abonnements et factures" },
  aiBullet5: { en: "Answers your financial questions instantly", fr: "Répond instantanément à vos questions financières" },
  outcomes: { en: "Outcomes", fr: "Résultats" },
  benefitsTitle: { en: "Real results, not just features", fr: "De vrais résultats, pas seulement des fonctionnalités" },
  benefitsSub: { en: "Finewa isn't about tracking numbers — it's about transforming your relationship with money.", fr: "Finewa ne se limite pas au suivi des chiffres — il transforme votre relation avec l'argent." },
  ben1Title: { en: "Save More Money", fr: "Économisez plus" },
  ben1Desc: { en: "Users save an average of 23% more in their first 3 months.", fr: "Les utilisateurs économisent en moyenne 23 % de plus en 3 mois." },
  ben2Title: { en: "Gain Financial Clarity", fr: "Gagnez en clarté financière" },
  ben2Desc: { en: "See the full picture of your finances in one clean dashboard.", fr: "Voyez l'ensemble de vos finances dans un tableau de bord clair." },
  ben3Title: { en: "Smarter Decisions", fr: "Décisions plus intelligentes" },
  ben3Desc: { en: "AI-powered insights help you make better choices daily.", fr: "Les analyses IA vous aident à faire de meilleurs choix quotidiennement." },
  ben4Title: { en: "Reach Goals Faster", fr: "Atteignez vos objectifs plus vite" },
  ben4Desc: { en: "Automated savings keep you on pace to hit every goal.", fr: "L'épargne automatisée vous maintient sur la bonne voie." },
  ben5Title: { en: "Reduce Financial Stress", fr: "Réduisez le stress financier" },
  ben5Desc: { en: "Know exactly where you stand — no surprises, no anxiety.", fr: "Sachez exactement où vous en êtes — sans surprise, sans anxiété." },
  ben6Title: { en: "Effortless Control", fr: "Contrôle sans effort" },
  ben6Desc: { en: "Smart automation means less manual work, more confidence.", fr: "L'automatisation signifie moins d'effort, plus de confiance." },
  testimonials: { en: "Testimonials", fr: "Témoignages" },
  lovedBy: { en: "Loved by thousands", fr: "Aimé par des milliers" },
  test1Name: { en: "Sarah K.", fr: "Sarah K." },
  test1Role: { en: "Freelance Designer", fr: "Designer freelance" },
  test1Text: { en: "Finewa helped me finally understand where my money was going. I've saved $2,400 in just 4 months.", fr: "Finewa m'a enfin aidée à comprendre où allait mon argent. J'ai économisé 2 400 $ en 4 mois." },
  test2Name: { en: "Marcus T.", fr: "Marcus T." },
  test2Role: { en: "Software Engineer", fr: "Ingénieur logiciel" },
  test2Text: { en: "The AI advisor is like having a personal financial coach. It spotted spending patterns I never noticed.", fr: "Le conseiller IA, c'est comme avoir un coach financier personnel. Il a repéré des habitudes que je n'avais jamais remarquées." },
  test3Name: { en: "Priya R.", fr: "Priya R." },
  test3Role: { en: "Small Business Owner", fr: "Propriétaire de PME" },
  test3Text: { en: "Clean, simple, and actually useful. The budget alerts alone have saved me from overspending countless times.", fr: "Propre, simple et vraiment utile. Les alertes budget m'ont évité de dépasser mon budget d'innombrables fois." },
  ctaTitle: { en: "Start your journey to financial freedom", fr: "Commencez votre parcours vers la liberté financière" },
  faqLabel: { en: "FAQ", fr: "FAQ" },
  faqTitle: { en: "Frequently asked questions", fr: "Questions fréquentes" },
  faqSub: { en: "Everything you need to know about Finewa.", fr: "Tout ce que vous devez savoir sur Finewa." },
  faq1Q: { en: "Is Finewa free to use?", fr: "Finewa est-il gratuit ?" },
  faq1A: { en: "Yes, Finewa is completely free to download and use. No credit card required.", fr: "Oui, Finewa est entièrement gratuit à télécharger et à utiliser. Aucune carte de crédit requise." },
  faq2Q: { en: "How does the AI advisor work?", fr: "Comment fonctionne le conseiller IA ?" },
  faq2A: { en: "Our AI analyzes your transaction history and spending patterns to give you personalized, actionable financial advice in real time.", fr: "Notre IA analyse votre historique de transactions et vos habitudes pour vous donner des conseils financiers personnalisés en temps réel." },
  faq3Q: { en: "Is my financial data secure?", fr: "Mes données financières sont-elles sécurisées ?" },
  faq3A: { en: "Absolutely. We use bank-level 256-bit encryption and never sell your data to third parties.", fr: "Absolument. Nous utilisons un chiffrement 256 bits de niveau bancaire et ne vendons jamais vos données à des tiers." },
  faq4Q: { en: "Which platforms is Finewa available on?", fr: "Sur quelles plateformes Finewa est-il disponible ?" },
  faq4A: { en: "Finewa is available on iOS, Android, and as a web app — all synced in real time.", fr: "Finewa est disponible sur iOS, Android et en application web — tous synchronisés en temps réel." },
  faq5Q: { en: "Can I connect my bank account?", fr: "Puis-je connecter mon compte bancaire ?" },
  faq5A: { en: "Yes, Finewa supports secure bank connections to automatically import and categorize your transactions.", fr: "Oui, Finewa prend en charge les connexions bancaires sécurisées pour importer et catégoriser automatiquement vos transactions." },
  stillNeedHelp: { en: "Still need help?", fr: "Besoin d'aide ?" },
  stillNeedHelpSub: { en: "Reach out and we will get back to you as soon as possible.", fr: "Contactez-nous et nous vous répondrons dès que possible." },
  ctaSub: { en: "Join 50+ users who are already making smarter financial decisions with Finewa.", fr: "Rejoignez plus de 50 utilisateurs qui prennent déjà de meilleures décisions financières avec Finewa." },
  downloadApp: { en: "Download the App", fr: "Télécharger l'App" },
  noCreditCard: { en: "Free — No credit card required", fr: "Gratuit — Aucune carte de crédit requise" },
  product: { en: "Product", fr: "Produit" },
  features: { en: "Features", fr: "Fonctionnalités" },
  aiAdvisor: { en: "AI Advisor", fr: "Conseiller IA" },
  company: { en: "Company", fr: "Entreprise" },
  about: { en: "About", fr: "À propos" },
  contact: { en: "Contact", fr: "Contact" },
  careers: { en: "Careers", fr: "Carrières" },
  legal: { en: "Legal", fr: "Légal" },
  privacy: { en: "Privacy", fr: "Confidentialité" },
  terms: { en: "Terms", fr: "Conditions" },
  security: { en: "Security", fr: "Sécurité" },
  allRights: { en: "All rights reserved.", fr: "Tous droits réservés." },
  signIn: { en: "Sign In", fr: "Connexion" },
  benefits: { en: "Benefits", fr: "Avantages" },
  navFeatures: { en: "Features", fr: "Fonctionnalités" },
  navDashboard: { en: "Dashboard", fr: "Tableau de bord" },
  navAI: { en: "AI Advisor", fr: "Conseiller IA" },
  navBenefits: { en: "Benefits", fr: "Avantages" },
  getApp: { en: "Get the App", fr: "Obtenir l'App" },
  smartAssistant: { en: "Your smart financial assistant.", fr: "Votre assistant financier intelligent." },
};

function T({ k }: { k: string }) {
  const { lang } = useLang();
  return <>{t[k]?.[lang] ?? k}</>;
}
function useT(k: string) {
  const { lang } = useLang();
  return t[k]?.[lang] ?? k;
}

/* ─── Theme ─────────────────────────────────────────── */
function useTheme() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem("fw-theme");
    if (saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      setDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);
  const toggle = () => {
    setDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("fw-theme", next ? "dark" : "light");
      return next;
    });
  };
  return { dark, toggle };
}

/* ─── Components ────────────────────────────────────── */
function RevealSection({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function FaqItem({ qKey, aKey, delay }: { qKey: string; aKey: string; delay: number }) {
  const [open, setOpen] = useState(false);
  return (
    <RevealSection delay={delay}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
        aria-expanded={open}
      >
        <span className="text-sm font-semibold sm:text-base"><T k={qKey} /></span>
        <ChevronRight className={`h-4 w-4 flex-shrink-0 text-muted-foreground transition-transform duration-200 ${open ? "rotate-90" : ""}`} />
      </button>
      {open && (
        <p className="pb-5 text-sm leading-relaxed text-muted-foreground"><T k={aKey} /></p>
      )}
    </RevealSection>
  );
}


function StickyNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { dark, toggle } = useTheme();
  const { lang, setLang } = useLang();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const navItems = [
    { label: useT("navFeatures"), href: "#features" },
    { label: useT("navDashboard"), href: "#dashboard" },
    { label: useT("navAI"), href: "#ai-advisor" },
    { label: useT("navBenefits"), href: "#benefits" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-card/95 border-b border-border shadow-sm backdrop-blur-md" : "bg-transparent"}`}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <a href="#" className="flex items-center gap-2">
          <img src={logoImg} alt="Finewa" className="h-8 w-8 object-contain" />
          <span className="text-lg font-semibold tracking-tight">Finewa</span>
        </a>

        <div className="hidden items-center gap-6 md:flex">
          {navItems.map((l) => (
            <a key={l.href} href={l.href} onClick={(e) => { e.preventDefault(); document.querySelector(l.href)?.scrollIntoView({ behavior: "smooth" }); }} className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <button type="button" onClick={() => setLang(lang === "en" ? "fr" : "en")} className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground" aria-label="Switch language">
            <Globe className="h-3.5 w-3.5" />
            {lang === "en" ? "FR" : "EN"}
          </button>
          <button type="button" onClick={toggle} className="inline-flex items-center justify-center rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground" aria-label="Toggle theme">
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <a href={APP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110">
            <Download className="h-3.5 w-3.5" />
            <T k="getApp" />
          </a>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <button type="button" onClick={() => setLang(lang === "en" ? "fr" : "en")} className="rounded-lg p-2 text-muted-foreground hover:bg-muted" aria-label="Switch language">
            <Globe className="h-4 w-4" />
          </button>
          <button type="button" onClick={toggle} className="rounded-lg p-2 text-muted-foreground hover:bg-muted" aria-label="Toggle theme">
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button type="button" onClick={() => setMobileOpen(!mobileOpen)} className="rounded-lg p-2 text-foreground" aria-label="Toggle menu">
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="animate-fade-in border-t border-border bg-card px-4 pb-4 md:hidden">
          {navItems.map((l) => (
            <a key={l.href} href={l.href} onClick={(e) => { e.preventDefault(); setMobileOpen(false); document.querySelector(l.href)?.scrollIntoView({ behavior: "smooth" }); }} className="block py-3 text-sm font-medium text-muted-foreground hover:text-foreground">
              {l.label}
            </a>
          ))}
          <a href={APP_URL} target="_blank" rel="noopener noreferrer" onClick={() => setMobileOpen(false)} className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
            <Download className="h-4 w-4" />
            <T k="getApp" />
          </a>
        </div>
      )}
    </nav>
  );
}

/* ─── Page ───────────────────────────────────────────── */
function FinanceLandingPage() {
  const [lang, setLang] = useState<Lang>("en");

  return (
    <LangCtx.Provider value={{ lang, setLang }}>
      <div className="min-h-screen bg-background text-foreground scroll-smooth">
        <StickyNav />

        {/* ── Hero ──────────────────────────────────── */}
        <section className="relative overflow-hidden px-4 pt-24 pb-16 sm:px-6 sm:pt-32 sm:pb-24">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
          <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-10 lg:flex-row lg:gap-16">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5 text-secondary" />
                <T k="trustedBy" />
              </div>

              <h1 className="mt-6 text-[32px] font-bold leading-[1.1] tracking-tight sm:text-[44px] lg:text-[56px]">
                <T k="heroTitle1" />{" "}
                <span className="text-primary"><T k="heroTitle2" /></span>
              </h1>

              <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg lg:mx-0">
                <T k="heroSub" />
              </p>

              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start justify-center">
                <a href={APP_URL} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:brightness-110 active:scale-[0.98]">
                  <Smartphone className="h-4 w-4" />
                  <T k="getStarted" />
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a href="#features" onClick={(e) => { e.preventDefault(); document.querySelector("#features")?.scrollIntoView({ behavior: "smooth" }); }} className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3 text-base font-medium text-foreground transition-all hover:bg-muted active:scale-[0.98]">
                  <T k="learnMore" />
                </a>
              </div>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-6 lg:justify-start">
                <div className="text-center lg:text-left">
                  <span className="block text-2xl font-bold">4.8★</span>
                  <span className="text-xs text-muted-foreground"><T k="playStore" /></span>
                </div>
                <div className="h-8 w-px bg-border" />
                <div className="text-center lg:text-left">
                  <span className="block text-2xl font-bold">20+</span>
                  <span className="text-xs text-muted-foreground"><T k="countries" /></span>
                </div>
                <div className="h-8 w-px bg-border" />
                <div className="text-center lg:text-left">
                  <span className="block text-2xl font-bold">50+</span>
                  <span className="text-xs text-muted-foreground"><T k="users" /></span>
                </div>
              </div>
            </div>

            <div className="relative flex-shrink-0 lg:w-[280px]">
              <div className="animate-fade-in" style={{ animationDelay: "300ms", animationFillMode: "backwards" }}>
                <img src={phoneMockup} alt="Finewa app" className="mx-auto w-48 drop-shadow-2xl sm:w-56 lg:w-full" width={600} height={1024} />
              </div>
            </div>
          </div>
        </section>

        {/* ── About ─────────────────────────────────── */}
        <section className="px-4 py-20 sm:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <RevealSection>
              <span className="inline-block rounded-full bg-secondary/10 px-4 py-1.5 text-xs font-semibold text-secondary"><T k="whyFinwise" /></span>
              <h2 className="mt-5 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl"><T k="aboutTitle" /></h2>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg"><T k="aboutSub" /></p>
              <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {(["aboutCard1", "aboutCard2", "aboutCard3"] as const).map((key) => (
                  <div key={key} className="rounded-xl border border-border bg-card p-5 text-left transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
                    <div className="mb-2 h-1 w-8 rounded-full bg-primary" />
                    <h3 className="text-sm font-semibold"><T k={`${key}Title`} /></h3>
                    <p className="mt-1 text-sm text-muted-foreground"><T k={`${key}Desc`} /></p>
                  </div>
                ))}
              </div>
            </RevealSection>
          </div>
        </section>

        {/* ── Features Grid ─────────────────────────── */}
        <section id="features" className="bg-muted/40 px-4 py-20 sm:py-28">
          <RevealSection className="text-center">
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary"><T k="coreFeatures" /></span>
            <h2 className="mt-5 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl"><T k="featuresTitle" /></h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground"><T k="featuresSub" /></p>
          </RevealSection>
          <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {([
              { icon: Wallet, k: "feat1" },
              { icon: PieChart, k: "feat2" },
              { icon: BarChart3, k: "feat3" },
              { icon: BrainCircuit, k: "feat4" },
              { icon: Target, k: "feat5" },
              { icon: BellRing, k: "feat6" },
            ]).map((f, i) => (
              <RevealSection key={f.k} delay={i * 80}>
                <div className="group h-full rounded-xl border border-border bg-card p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
                  <div className="mb-4 inline-flex rounded-lg bg-primary p-2.5">
                    <f.icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <h3 className="mb-2 text-sm font-semibold"><T k={`${f.k}Title`} /></h3>
                  <p className="text-sm leading-relaxed text-muted-foreground"><T k={`${f.k}Desc`} /></p>
                </div>
              </RevealSection>
            ))}
          </div>
        </section>

        {/* ── Dashboard Preview ─────────────────────── */}
        <section id="dashboard" className="px-4 py-20 sm:py-28">
          <RevealSection className="text-center">
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary"><T k="dashboard" /></span>
            <h2 className="mt-5 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl"><T k="dashboardTitle" /></h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground"><T k="dashboardSub" /></p>
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
                <img src={laptopMockup} alt="Finewa dashboard" className="w-full" loading="lazy" width={1280} height={800} />
              </div>
            </div>
          </RevealSection>
        </section>

        {/* ── AI Advisor ────────────────────────────── */}
        <section id="ai-advisor" className="bg-gradient-to-b from-primary/5 via-muted/30 to-background px-4 py-20 sm:py-28">
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-12 lg:flex-row lg:gap-20">
            <RevealSection className="flex-shrink-0 lg:order-1 lg:w-[240px]">
              <img src={phoneAiChat} alt="AI financial advisor chat" className="mx-auto w-44 drop-shadow-2xl sm:w-52 lg:w-full" loading="lazy" width={600} height={1024} />
            </RevealSection>
            <RevealSection className="flex-1 text-center lg:text-left">
              <span className="inline-block rounded-full bg-secondary/10 px-4 py-1.5 text-xs font-semibold text-secondary"><T k="aiPowered" /></span>
              <h2 className="mt-5 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl"><T k="aiTitle" /></h2>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg"><T k="aiSub" /></p>
              <div className="mt-8 space-y-4 text-left">
                {(["aiBullet1", "aiBullet2", "aiBullet3", "aiBullet4", "aiBullet5"] as const).map((k) => (
                  <div key={k} className="flex items-start gap-3">
                    <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary">
                      <ChevronRight className="h-3 w-3 text-card" />
                    </div>
                    <span className="text-sm"><T k={k} /></span>
                  </div>
                ))}
              </div>
            </RevealSection>
          </div>
        </section>

        {/* ── Benefits ──────────────────────────────── */}
        <section id="benefits" className="px-4 py-20 sm:py-28">
          <RevealSection className="text-center">
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary"><T k="outcomes" /></span>
            <h2 className="mt-5 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl"><T k="benefitsTitle" /></h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground"><T k="benefitsSub" /></p>
          </RevealSection>
          <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {([
              { icon: TrendingUp, k: "ben1" },
              { icon: Lightbulb, k: "ben2" },
              { icon: BrainCircuit, k: "ben3" },
              { icon: Target, k: "ben4" },
              { icon: Heart, k: "ben5" },
              { icon: Zap, k: "ben6" },
            ]).map((b, i) => (
              <RevealSection key={b.k} delay={i * 80}>
                <div className="group h-full rounded-xl border border-border bg-card p-6 text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
                  <div className="mx-auto mb-4 inline-flex rounded-lg bg-primary/10 p-3">
                    <b.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 text-sm font-semibold"><T k={`${b.k}Title`} /></h3>
                  <p className="text-sm leading-relaxed text-muted-foreground"><T k={`${b.k}Desc`} /></p>
                </div>
              </RevealSection>
            ))}
          </div>
        </section>

        {/* ── Testimonials ──────────────────────────── */}
        <section className="bg-muted/40 px-4 py-20 sm:py-28">
          <RevealSection className="text-center">
            <span className="inline-block rounded-full bg-secondary/10 px-4 py-1.5 text-xs font-semibold text-secondary"><T k="testimonials" /></span>
            <h2 className="mt-5 text-2xl font-bold tracking-tight sm:text-3xl"><T k="lovedBy" /></h2>
          </RevealSection>
          <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3">
            {(["test1", "test2", "test3"] as const).map((k, i) => (
              <RevealSection key={k} delay={i * 100}>
                <div className="h-full rounded-xl border border-border bg-card p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
                  <div className="mb-3 flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-secondary text-secondary" />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed">&ldquo;<T k={`${k}Text`} />&rdquo;</p>
                  <div className="mt-4 border-t border-border pt-4">
                    <span className="text-sm font-semibold"><T k={`${k}Name`} /></span>
                    <span className="block text-xs text-muted-foreground"><T k={`${k}Role`} /></span>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────── */}
        <section id="faq" className="px-4 py-20 sm:py-28">
          <RevealSection className="text-center">
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary"><T k="faqLabel" /></span>
            <h2 className="mt-5 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl"><T k="faqTitle" /></h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground"><T k="faqSub" /></p>
          </RevealSection>
          <div className="mx-auto mt-12 max-w-2xl divide-y divide-border">
            {(["faq1", "faq2", "faq3", "faq4", "faq5"] as const).map((k, i) => (
              <FaqItem key={k} qKey={`${k}Q`} aKey={`${k}A`} delay={i * 60} />
            ))}
          </div>
        </section>

        {/* ── Still need help ───────────────────────── */}
        <section id="contact" className="bg-muted/40 px-4 py-16 sm:py-20">
          <RevealSection className="text-center">
            <h2 className="text-xl font-bold tracking-tight sm:text-2xl"><T k="stillNeedHelp" /></h2>
            <p className="mt-3 text-sm text-muted-foreground"><T k="stillNeedHelpSub" /></p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="mailto:support@finewa.app"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium transition-all hover:bg-muted"
              >
                <Mail className="h-4 w-4 opacity-60" />
                support@finewa.app
              </a>
            </div>
          </RevealSection>
        </section>

        {/* ── Final CTA ─────────────────────────────── */}
        <section id="cta" className="px-4 py-24 sm:py-32">
          <div className="mx-auto max-w-3xl rounded-2xl bg-primary px-6 py-16 text-center sm:px-12 sm:py-20">
            <RevealSection>
              <div className="mx-auto mb-6 inline-flex rounded-xl bg-primary-foreground/10 p-3">
                <img src={logoImg} alt="Finewa" className="h-8 w-8 object-contain" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-primary-foreground sm:text-3xl lg:text-4xl">
                <T k="ctaTitle" />
              </h2>
              <p className="mx-auto mt-4 max-w-md text-base text-primary-foreground/70">
                <T k="ctaSub" />
              </p>
              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <a href={APP_URL} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 rounded-lg bg-card px-6 py-3 text-base font-semibold text-foreground shadow-lg transition-all hover:bg-card/90 active:scale-[0.98]">
                  <Download className="h-4 w-4" />
                  <T k="downloadApp" />
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
                <span className="text-sm text-primary-foreground/60"><T k="noCreditCard" /></span>
              </div>
            </RevealSection>
          </div>
        </section>

        {/* ── Footer ────────────────────────────────── */}
        <footer className="border-t border-border px-4 py-12">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 sm:grid-cols-4">
            <div className="col-span-2 sm:col-span-1">
              <div className="flex items-center gap-2">
                <img src={logoImg} alt="FinWise" className="h-7 w-7 object-contain" />
                <span className="text-base font-semibold">FinWise</span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground"><T k="smartAssistant" /></p>
            </div>
            <div>
              <h4 className="mb-3 text-sm font-semibold"><T k="product" /></h4>
              <div className="space-y-2">
                <a href="#features" className="block text-sm text-muted-foreground hover:text-foreground transition-colors"><T k="features" /></a>
                <a href="#dashboard" className="block text-sm text-muted-foreground hover:text-foreground transition-colors"><T k="dashboard" /></a>
                <a href="#ai-advisor" className="block text-sm text-muted-foreground hover:text-foreground transition-colors"><T k="aiAdvisor" /></a>
              </div>
            </div>
            <div>
              <h4 className="mb-3 text-sm font-semibold"><T k="company" /></h4>
              <div className="space-y-2">
                <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors"><T k="about" /></a>
                <a href="#contact" className="block text-sm text-muted-foreground hover:text-foreground transition-colors"><T k="contact" /></a>
                <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors"><T k="careers" /></a>
              </div>
            </div>
            <div>
              <h4 className="mb-3 text-sm font-semibold"><T k="legal" /></h4>
              <div className="space-y-2">
                <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors"><T k="privacy" /></a>
                <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors"><T k="terms" /></a>
                <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors"><T k="security" /></a>
              </div>
            </div>
          </div>
          <div className="mx-auto mt-10 max-w-6xl border-t border-border pt-6">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <span className="text-sm text-muted-foreground">© {new Date().getFullYear()} FinWise. <T k="allRights" /></span>
              <a href={APP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 active:scale-[0.98]">
                <Download className="h-3.5 w-3.5" />
                <T k="getApp" />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </LangCtx.Provider>
  );
}
