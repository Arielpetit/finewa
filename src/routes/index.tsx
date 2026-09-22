import { createFileRoute, Link } from "@tanstack/react-router";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useState, useEffect, createContext, useContext, useRef, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  calcTitle: { en: "See how much you can save", fr: "Calculez vos économies" },
  calcSubtitle: { en: "Enter your monthly habits to see how much Finewa can help you put aside.", fr: "Entrez vos habitudes mensuelles pour voir ce que Finewa peut vous aider à épargner." },
  monthlyIncome: { en: "Monthly Income", fr: "Revenu mensuel" },
  discretionarySpending: { en: "Monthly Expenses (discretionary)", fr: "Dépenses mensuelles (variables)" },
  potentialMonthlySavings: { en: "Potential Monthly Savings", fr: "Économie mensuelle potentielle" },
  potentialAnnualSavings: { en: "Potential Annual Savings", fr: "Économie annuelle potentielle" },
  calcCta: { en: "Start saving this amount today", fr: "Commencez à épargner ce montant aujourd'hui" },
  aiChatTitle: { en: "Finewa AI Advisor", fr: "Conseiller IA Finewa" },
  aiChatStatus: { en: "Active now", fr: "En ligne" },
  aiChatPlaceholder: { en: "Tap a question to ask the advisor...", fr: "Appuyez sur une question pour interroger le conseiller..." },
  aiChatPrompt1: { en: "Where can I save this month?", fr: "Où puis-je économiser ce mois-ci ?" },
  aiChatPrompt2: { en: "Analyze grocery budget", fr: "Analyser mon budget courses" },
  aiChatPrompt3: { en: "Can I afford a $150 flight?", fr: "Puis-je m'offrir un vol à 150 $ ?" },
  aiChatAnswer1: {
    en: "I analyzed your spending. You spent **FCFA 12,000** on 3 recurring streaming services, but only used one this month. Canceling the other two will save you **FCFA 8,000/month**! Plus, restaurant spending is 15% higher than usual.",
    fr: "J'ai analysé vos dépenses. Vous payez **12 000 FCFA** pour 3 abonnements de streaming, mais un seul a servi ce mois-ci. En résilier deux vous fera économiser **8 000 FCFA/mois** ! De plus, vos dépenses resto sont 15 % plus élevées."
  },
  aiChatAnswer2: {
    en: "You've spent **FCFA 18,500** out of your **FCFA 25,000** grocery budget (74% used, with 10 days remaining). You are on track to stay within budget if you limit supermarket trips to one more time this week! 🛒",
    fr: "Vous avez dépensé **18 500 FCFA** sur votre budget courses de **25 000 FCFA** (74 % consommés, 10 jours restants). Vous tiendrez le budget en limitant vos courses à une seule fois cette semaine ! 🛒"
  },
  aiChatAnswer3: {
    en: "Yes! Your current monthly savings is **FCFA 42,300** and you are **FCFA 15,000** ahead of your savings goal. If you purchase the flight, your emergency fund remains fully intact. Safe travels! ✈️",
    fr: "Oui ! Votre épargne mensuelle est de **42 300 FCFA** et vous avez **15 000 FCFA** d'avance sur votre objectif. En achetant ce billet, votre épargne de sécurité reste intacte. Bon voyage ! ✈️"
  },
  aiChatResponsePlaceholder: { en: "Finewa is typing...", fr: "Finewa écrit..." },
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
function RevealSection({
  children,
  className = "",
  delay = 0,
  y = 30,
  duration = 0.6
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration, delay: delay / 1000, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StaggerContainer({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.08,
            delayChildren: delay / 1000,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StaggerItem({ children, className = "", y = 20 }: { children: ReactNode; className?: string; y?: number }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function FaqItem({ qKey, aKey, delay }: { qKey: string; aKey: string; delay: number }) {
  const [open, setOpen] = useState(false);
  return (
    <RevealSection delay={delay} className="border-b border-border">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left focus:outline-none cursor-pointer"
        aria-expanded={open}
      >
        <span className="text-sm font-semibold sm:text-base"><T k={qKey} /></span>
        <ChevronRight className={`h-4 w-4 flex-shrink-0 text-muted-foreground transition-transform duration-300 ${open ? "rotate-90" : ""}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm leading-relaxed text-muted-foreground"><T k={aKey} /></p>
          </motion.div>
        )}
      </AnimatePresence>
    </RevealSection>
  );
}

function AnimatedNumber({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(value);
  const displayValRef = useRef(value);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const startValue = displayValRef.current;
    const duration = 400; // ms
    const diff = value - startValue;

    if (diff === 0) return;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(startValue + diff * ease);
      displayValRef.current = current;
      setDisplayValue(current);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [value]);

  return <>{displayValue.toLocaleString()}</>;
}

function formatMessage(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index} className="font-bold text-primary dark:text-secondary">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

interface Message {
  sender: "user" | "ai";
  text: string;
}

function ChatSimulator() {
  const { lang } = useLang();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [activePrompts, setActivePrompts] = useState<number[]>([1, 2, 3]);

  // Set welcome message dynamically
  useEffect(() => {
    setMessages([
      {
        sender: "ai",
        text: lang === "en" 
          ? "Hello! I'm your AI Financial Advisor. Tap one of the questions below to see how I analyze your finances." 
          : "Bonjour ! Je suis votre conseiller financier IA. Choisissez une question ci-dessous pour voir comment j'analyse vos finances."
      }
    ]);
    setActivePrompts([1, 2, 3]);
  }, [lang]);

  const handlePromptClick = (id: number) => {
    const promptText = t[`aiChatPrompt${id}`][lang];
    const answerText = t[`aiChatAnswer${id}`][lang];

    setMessages((prev) => [...prev, { sender: "user", text: promptText }]);
    setActivePrompts([]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, { sender: "ai", text: answerText }]);
      
      setTimeout(() => {
        setActivePrompts([1, 2, 3].filter(num => num !== id));
      }, 500);
    }, 1200);
  };

  return (
    <div className="glass-card flex h-[350px] w-full flex-col overflow-hidden rounded-2xl shadow-xl">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border bg-muted/40 px-4 py-3">
        <div className="relative">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm">
            AI
          </div>
          <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-secondary border-2 border-card" />
        </div>
        <div>
          <span className="block text-xs font-semibold"><T k="aiChatTitle" /></span>
          <span className="block text-[10px] text-muted-foreground"><T k="aiChatStatus" /></span>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed ${m.sender === "user" ? "bg-primary text-primary-foreground rounded-tr-none" : "bg-muted text-foreground rounded-tl-none border border-border"}`}>
              {formatMessage(m.text)}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-muted text-muted-foreground rounded-2xl rounded-tl-none border border-border px-3.5 py-2 text-xs flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" />
              <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}
      </div>

      {/* Suggestion Chips */}
      <div className="border-t border-border bg-muted/20 p-3">
        {activePrompts.length > 0 ? (
          <div className="flex flex-col gap-1.5">
            {activePrompts.map((id) => (
              <button
                key={id}
                onClick={() => handlePromptClick(id)}
                className="w-full text-left rounded-lg border border-primary/20 bg-primary/5 px-3 py-2 text-[11px] font-semibold text-primary transition-all hover:bg-primary hover:text-primary-foreground cursor-pointer"
              >
                <T k={`aiChatPrompt${id}`} />
              </button>
            ))}
          </div>
        ) : !isTyping ? (
          <div className="flex justify-center text-[10px] text-muted-foreground italic">
            <T k="aiChatPlaceholder" />
          </div>
        ) : null}
      </div>
    </div>
  );
}

function SavingsCalculator() {
  const { lang } = useLang();
  const [income, setIncome] = useState(300000);
  const [spending, setSpending] = useState(120000);

  const monthlySavings = Math.floor(spending * 0.23);
  const annualSavings = monthlySavings * 12;

  return (
    <section className="relative px-4 py-12 sm:py-16 overflow-hidden">
      <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-secondary/5 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 -bottom-20 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />

      <div className="mx-auto max-w-4xl rounded-2xl p-6 shadow-xl sm:p-10 glass-card">
        <div className="text-center">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
            <T k="outcomes" />
          </span>
          <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
            <T k="calcTitle" />
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
            <T k="calcSubtitle" />
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-semibold">
                <span><T k="monthlyIncome" /></span>
                <span className="text-primary font-bold">FCFA {income.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="50000"
                max="1500000"
                step="10000"
                value={income}
                onChange={(e) => {
                  const newIncome = Number(e.target.value);
                  setIncome(newIncome);
                  if (spending > newIncome * 0.8) {
                    setSpending(Math.floor(newIncome * 0.5));
                  }
                }}
                className="h-2 w-full cursor-pointer rounded-lg bg-muted accent-primary appearance-none"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground">
                <span>FCFA 50K</span>
                <span>FCFA 1.5M</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm font-semibold">
                <span><T k="discretionarySpending" /></span>
                <span className="text-primary font-bold">FCFA {spending.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="10000"
                max={Math.floor(income * 0.8)}
                step="5000"
                value={spending}
                onChange={(e) => setSpending(Number(e.target.value))}
                className="h-2 w-full cursor-pointer rounded-lg bg-muted accent-primary appearance-none"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground">
                <span>FCFA 10K</span>
                <span>FCFA {Math.floor(income * 0.8).toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center rounded-xl bg-muted/40 p-6 text-center border border-border">
            <div className="grid grid-cols-2 gap-4 divide-x divide-border">
              <div>
                <span className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  <T k="potentialMonthlySavings" />
                </span>
                <span className="mt-2 block text-lg font-extrabold text-primary sm:text-xl md:text-2xl">
                  FCFA <AnimatedNumber value={monthlySavings} />
                </span>
              </div>
              <div>
                <span className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  <T k="potentialAnnualSavings" />
                </span>
                <span className="mt-2 block text-lg font-extrabold text-secondary sm:text-xl md:text-2xl">
                  FCFA <AnimatedNumber value={annualSavings} />
                </span>
              </div>
            </div>

            <div className="mt-6 border-t border-border pt-4">
              <p className="text-[10px] text-muted-foreground leading-relaxed">
                {lang === "en" 
                  ? "Based on average user savings of 23% in discretionary spending categories." 
                  : "Basé sur une économie moyenne de 23 % constatée sur les dépenses variables."}
              </p>
              <a
                href={APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground transition-all hover:brightness-110 shadow-md"
              >
                <T k="calcCta" />
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
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
      <div className="min-h-screen bg-background text-foreground scroll-smooth relative">
        {/* Floating Ambient Background Blobs */}
        <div className="pointer-events-none absolute left-1/4 top-10 h-80 w-80 rounded-full bg-primary/5 blur-[100px] animate-ambient-float-1 z-0" />
        <div className="pointer-events-none absolute right-1/4 top-60 h-[380px] w-[380px] rounded-full bg-secondary/5 blur-[120px] animate-ambient-float-2 z-0" />

        <StickyNav />

        {/* ── Hero ──────────────────────────────────── */}
        <section className="relative overflow-hidden px-4 pt-20 pb-10 sm:px-6 sm:pt-24 sm:pb-14 z-10">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
          <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-8 lg:flex-row lg:gap-16">
            <div className="flex-1 text-center lg:text-left">
              <RevealSection y={20}>
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground">
                  <ShieldCheck className="h-3.5 w-3.5 text-secondary" />
                  <T k="trustedBy" />
                </div>
              </RevealSection>

              <RevealSection y={20} delay={100}>
                <h1 className="mt-4 text-[32px] font-bold leading-[1.1] tracking-tight sm:text-[44px] lg:text-[52px]">
                  <T k="heroTitle1" />{" "}
                  <span className="text-primary"><T k="heroTitle2" /></span>
                </h1>
              </RevealSection>

              <RevealSection y={20} delay={200}>
                <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg lg:mx-0">
                  <T k="heroSub" />
                </p>
              </RevealSection>

              <RevealSection y={20} delay={300}>
                <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row lg:justify-start justify-center">
                  <a href={APP_URL} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:brightness-110 active:scale-[0.98]">
                    <Smartphone className="h-4 w-4" />
                    <T k="getStarted" />
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                  <a href="#features" onClick={(e) => { e.preventDefault(); document.querySelector("#features")?.scrollIntoView({ behavior: "smooth" }); }} className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3 text-base font-medium text-foreground transition-all hover:bg-muted active:scale-[0.98]">
                    <T k="learnMore" />
                  </a>
                </div>
              </RevealSection>

              <RevealSection y={20} delay={400}>
                <div className="mt-8 grid grid-cols-3 gap-2 rounded-xl border border-border bg-card/65 p-4 max-w-sm shadow-sm backdrop-blur-md">
                  <div className="text-center">
                    <span className="block text-xl font-extrabold text-primary sm:text-2xl">4.8★</span>
                    <span className="text-[10px] text-muted-foreground sm:text-xs"><T k="playStore" /></span>
                  </div>
                  <div className="flex justify-center items-center border-x border-border">
                    <div className="text-center">
                      <span className="block text-xl font-extrabold text-primary sm:text-2xl">20+</span>
                      <span className="text-[10px] text-muted-foreground sm:text-xs"><T k="countries" /></span>
                    </div>
                  </div>
                  <div className="text-center">
                    <span className="block text-xl font-extrabold text-primary sm:text-2xl">50+</span>
                    <span className="text-[10px] text-muted-foreground sm:text-xs"><T k="users" /></span>
                  </div>
                </div>
              </RevealSection>
            </div>

            <div className="relative flex-shrink-0 lg:w-[280px]">
              <RevealSection y={30} delay={300}>
                <img src={phoneMockup} alt="Finewa app" className="mx-auto w-48 drop-shadow-2xl sm:w-52 lg:w-full" width={600} height={1024} />
              </RevealSection>
            </div>
          </div>
        </section>

        {/* ── About ─────────────────────────────────── */}
        <section className="relative px-4 py-12 sm:py-16 z-10">
          <div className="mx-auto max-w-3xl text-center">
            <RevealSection>
              <span className="inline-block rounded-full bg-secondary/10 px-4 py-1.5 text-xs font-semibold text-secondary"><T k="whyFinwise" /></span>
              <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl"><T k="aboutTitle" /></h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg"><T k="aboutSub" /></p>
            </RevealSection>
            
            <StaggerContainer className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {(["aboutCard1", "aboutCard2", "aboutCard3"] as const).map((key) => (
                <StaggerItem key={key}>
                  <div className="h-full rounded-xl border border-border bg-card p-5 text-left transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg glow-hover glass-card">
                    <div className="mb-3 h-1 w-8 rounded-full bg-primary" />
                    <h3 className="text-sm font-semibold"><T k={`${key}Title`} /></h3>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed"><T k={`${key}Desc`} /></p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* ── Features Grid ─────────────────────────── */}
        <section id="features" className="relative bg-muted/40 px-4 py-12 sm:py-16 z-10">
          <RevealSection className="text-center">
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary"><T k="coreFeatures" /></span>
            <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl"><T k="featuresTitle" /></h2>
            <p className="mx-auto mt-3 max-w-2xl text-base text-muted-foreground"><T k="featuresSub" /></p>
          </RevealSection>

          <StaggerContainer className="mx-auto mt-8 grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {([
              { icon: Wallet, k: "feat1" },
              { icon: PieChart, k: "feat2" },
              { icon: BarChart3, k: "feat3" },
              { icon: BrainCircuit, k: "feat4" },
              { icon: Target, k: "feat5" },
              { icon: BellRing, k: "feat6" },
            ]).map((f) => (
              <StaggerItem key={f.k} className="h-full">
                <div className="group h-full rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-primary/30 glow-hover glass-card">
                  <div className="mb-4 inline-flex rounded-lg bg-primary p-2.5 transition-transform group-hover:scale-110">
                    <f.icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <h3 className="mb-2 text-sm font-semibold"><T k={`${f.k}Title`} /></h3>
                  <p className="text-sm leading-relaxed text-muted-foreground"><T k={`${f.k}Desc`} /></p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        {/* ── Interactive Savings Calculator ───────── */}
        <SavingsCalculator />

        {/* ── Dashboard Preview ─────────────────────── */}
        <section id="dashboard" className="relative px-4 py-12 sm:py-16 z-10">
          <RevealSection className="text-center">
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary"><T k="dashboard" /></span>
            <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl"><T k="dashboardTitle" /></h2>
            <p className="mx-auto mt-3 max-w-2xl text-base text-muted-foreground"><T k="dashboardSub" /></p>
          </RevealSection>
          <RevealSection delay={150}>
            <div className="mx-auto mt-8 max-w-5xl">
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
        <section id="ai-advisor" className="relative bg-gradient-to-b from-primary/5 via-muted/30 to-background px-4 py-12 sm:py-16 overflow-hidden z-10">
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 lg:flex-row lg:gap-16">
            <RevealSection className="w-full max-w-sm flex-shrink-0 lg:order-1 lg:w-[320px]">
              <ChatSimulator />
            </RevealSection>
            
            <RevealSection className="flex-1 text-center lg:text-left">
              <span className="inline-block rounded-full bg-secondary/10 px-4 py-1.5 text-xs font-semibold text-secondary"><T k="aiPowered" /></span>
              <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl"><T k="aiTitle" /></h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg"><T k="aiSub" /></p>
              <div className="mt-6 space-y-3.5 text-left">
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
        <section id="benefits" className="relative px-4 py-12 sm:py-16 z-10">
          <RevealSection className="text-center">
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary"><T k="outcomes" /></span>
            <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl"><T k="benefitsTitle" /></h2>
            <p className="mx-auto mt-3 max-w-2xl text-base text-muted-foreground"><T k="benefitsSub" /></p>
          </RevealSection>
          
          <StaggerContainer className="mx-auto mt-8 grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {([
              { icon: TrendingUp, k: "ben1" },
              { icon: Lightbulb, k: "ben2" },
              { icon: BrainCircuit, k: "ben3" },
              { icon: Target, k: "ben4" },
              { icon: Heart, k: "ben5" },
              { icon: Zap, k: "ben6" },
            ]).map((b) => (
              <StaggerItem key={b.k} className="h-full">
                <div className="group h-full rounded-xl border border-border bg-card p-6 text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-primary/30 glow-hover glass-card">
                  <div className="mx-auto mb-4 inline-flex rounded-lg bg-primary/10 p-3 transition-transform group-hover:scale-110">
                    <b.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 text-sm font-semibold"><T k={`${b.k}Title`} /></h3>
                  <p className="text-sm leading-relaxed text-muted-foreground"><T k={`${b.k}Desc`} /></p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        {/* ── Testimonials ──────────────────────────── */}
        <section className="relative bg-muted/40 px-4 py-12 sm:py-16 z-10">
          <RevealSection className="text-center">
            <span className="inline-block rounded-full bg-secondary/10 px-4 py-1.5 text-xs font-semibold text-secondary"><T k="testimonials" /></span>
            <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl"><T k="lovedBy" /></h2>
          </RevealSection>
          
          <StaggerContainer className="mx-auto mt-8 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3">
            {(["test1", "test2", "test3"] as const).map((k) => (
              <StaggerItem key={k} className="h-full">
                <div className="h-full rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl glass-card">
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
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        {/* ── FAQ ───────────────────────────────────── */}
        <section id="faq" className="relative px-4 py-12 sm:py-16 z-10">
          <RevealSection className="text-center">
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary"><T k="faqLabel" /></span>
            <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl"><T k="faqTitle" /></h2>
            <p className="mx-auto mt-3 max-w-xl text-base text-muted-foreground"><T k="faqSub" /></p>
          </RevealSection>
          <div className="mx-auto mt-8 max-w-2xl">
            {(["faq1", "faq2", "faq3", "faq4", "faq5"] as const).map((k, i) => (
              <FaqItem key={k} qKey={`${k}Q`} aKey={`${k}A`} delay={i * 60} />
            ))}
          </div>
        </section>

        {/* ── Still need help ───────────────────────── */}
        <section id="contact" className="relative bg-muted/40 px-4 py-10 sm:py-12 z-10">
          <RevealSection className="text-center">
            <h2 className="text-xl font-bold tracking-tight sm:text-2xl"><T k="stillNeedHelp" /></h2>
            <p className="mt-2 text-sm text-muted-foreground"><T k="stillNeedHelpSub" /></p>
            <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 active:scale-[0.98]"
              >
                <Mail className="h-4 w-4" />
                <T k="contact" />
              </Link>
              <a
                href="mailto:support@finewa.app"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium transition-all hover:bg-muted"
              >
                support@finewa.app
              </a>
            </div>
          </RevealSection>
        </section>

        {/* ── Final CTA ─────────────────────────────── */}
        <section id="cta" className="relative px-4 py-14 sm:py-20 z-10">
          <div className="mx-auto max-w-3xl rounded-2xl bg-primary px-6 py-12 text-center sm:px-12 sm:py-16">
            <RevealSection>
              <div className="mx-auto mb-5 inline-flex rounded-xl bg-primary-foreground/10 p-3">
                <img src={logoImg} alt="Finewa" className="h-8 w-8 object-contain" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-primary-foreground sm:text-3xl lg:text-4xl">
                <T k="ctaTitle" />
              </h2>
              <p className="mx-auto mt-3 max-w-md text-base text-primary-foreground/70">
                <T k="ctaSub" />
              </p>
              <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
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
                <Link to="/contact" className="block text-sm text-muted-foreground hover:text-foreground transition-colors"><T k="contact" /></Link>
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
