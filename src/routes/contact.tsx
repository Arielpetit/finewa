import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, type FormEvent } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { toast } from "sonner";
import { ArrowLeft, Mail, MapPin, Clock, Send, Moon, Sun, Globe, MessageSquare, Loader2 } from "lucide-react";
import logoImg from "@/assets/logowithoutbg.png";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact Finewa — Talk to our team" },
      { name: "description", content: "Questions about Finewa? Send us a message and our team will reply within one business day." },
      { property: "og:title", content: "Contact Finewa — Talk to our team" },
      { property: "og:description", content: "Questions about Finewa? Send us a message and our team will reply within one business day." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

type Lang = "en" | "fr";

const copy = {
  back: { en: "Back to home", fr: "Retour à l'accueil" },
  label: { en: "Contact", fr: "Contact" },
  title: { en: "Let's talk", fr: "Parlons-en" },
  sub: {
    en: "Questions, feedback or partnership ideas — our team usually replies within one business day.",
    fr: "Questions, retours ou idées de partenariat — notre équipe répond généralement sous un jour ouvré.",
  },
  emailLabel: { en: "Email us", fr: "Écrivez-nous" },
  hoursLabel: { en: "Support hours", fr: "Heures de support" },
  hoursValue: { en: "Mon–Fri, 9:00–18:00 (GMT+1)", fr: "Lun–Ven, 9h00–18h00 (GMT+1)" },
  locationLabel: { en: "Based in", fr: "Basé à" },
  locationValue: { en: "Douala, Cameroon", fr: "Douala, Cameroun" },
  formTitle: { en: "Send a message", fr: "Envoyer un message" },
  name: { en: "Full name", fr: "Nom complet" },
  namePh: { en: "Jane Doe", fr: "Marie Dupont" },
  email: { en: "Email address", fr: "Adresse e-mail" },
  emailPh: { en: "jane@example.com", fr: "marie@exemple.com" },
  subject: { en: "Subject", fr: "Objet" },
  subjectPh: { en: "How can we help?", fr: "Comment pouvons-nous aider ?" },
  message: { en: "Message", fr: "Message" },
  messagePh: { en: "Tell us a bit more...", fr: "Dites-nous en un peu plus..." },
  send: { en: "Send message", fr: "Envoyer le message" },
  sending: { en: "Sending...", fr: "Envoi..." },
  success: { en: "Message sent. We'll get back to you soon.", fr: "Message envoyé. Nous vous répondrons bientôt." },
  privacyNote: {
    en: "We only use your details to answer your message. Never shared.",
    fr: "Nous utilisons vos coordonnées uniquement pour vous répondre. Jamais partagées.",
  },
  errName: { en: "Please enter your name", fr: "Veuillez saisir votre nom" },
  errEmail: { en: "Please enter a valid email", fr: "Veuillez saisir un e-mail valide" },
  errSubject: { en: "Please enter a subject", fr: "Veuillez saisir un objet" },
  errMessage: { en: "Message must be at least 10 characters", fr: "Le message doit contenir au moins 10 caractères" },
  tooLong: { en: "Too long", fr: "Trop long" },
} satisfies Record<string, Record<Lang, string>>;

type Key = keyof typeof copy;

const SUPPORT_EMAIL = "support@finewa.app";

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

function ContactPage() {
  const { dark, toggle } = useTheme();
  const [lang, setLang] = useState<Lang>("en");
  const [values, setValues] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("fw-lang");
    if (saved === "fr" || saved === "en") setLang(saved);
  }, []);

  const T = (k: Key) => copy[k][lang];

  const schema = z.object({
    name: z.string().trim().min(1, T("errName")).max(100, T("tooLong")),
    email: z.string().trim().email(T("errEmail")).max(255, T("tooLong")),
    subject: z.string().trim().min(1, T("errSubject")).max(150, T("tooLong")),
    message: z.string().trim().min(10, T("errMessage")).max(2000, T("tooLong")),
  });

  const setField = (key: keyof typeof values, value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: "" }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    toast.success(T("success"));
    setValues({ name: "", email: "", subject: "", message: "" });
  };

  const inputClass =
    "w-full rounded-lg border border-border bg-card px-3.5 py-2.5 text-sm outline-none transition-all placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/20";

  const info = [
    { icon: Mail, label: T("emailLabel"), value: SUPPORT_EMAIL, href: `mailto:${SUPPORT_EMAIL}` },
    { icon: Clock, label: T("hoursLabel"), value: T("hoursValue") },
    { icon: MapPin, label: T("locationLabel"), value: T("locationValue") },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="border-b border-border bg-card/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <Link to="/" className="flex items-center gap-2">
            <img src={logoImg} alt="Finewa" className="h-8 w-8 object-contain" />
            <span className="text-lg font-semibold tracking-tight">Finewa</span>
          </Link>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                const next: Lang = lang === "en" ? "fr" : "en";
                setLang(next);
                localStorage.setItem("fw-lang", next);
              }}
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-semibold transition-colors hover:bg-muted"
              aria-label="Change language"
            >
              <Globe className="h-3.5 w-3.5" />
              {lang.toUpperCase()}
            </button>
            <button
              type="button"
              onClick={toggle}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border transition-colors hover:bg-muted"
              aria-label="Toggle theme"
            >
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          {T("back")}
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="mt-6 max-w-2xl"
        >
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
            {T("label")}
          </span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">{T("title")}</h1>
          <p className="mt-3 text-base text-muted-foreground">{T("sub")}</p>
        </motion.div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="space-y-4"
          >
            {info.map((item) => {
              const content = (
                <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-5 transition-colors hover:bg-muted/40">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <item.icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {item.label}
                    </span>
                    <span className="mt-1 block break-words text-sm font-medium">{item.value}</span>
                  </div>
                </div>
              );
              return item.href ? (
                <a key={item.label} href={item.href} className="block">
                  {content}
                </a>
              ) : (
                <div key={item.label}>{content}</div>
              );
            })}

            <div className="rounded-xl border border-border bg-muted/40 p-5">
              <MessageSquare className="h-4 w-4 text-primary" />
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{T("privacyNote")}</p>
            </div>
          </motion.div>

          <motion.form
            onSubmit={onSubmit}
            noValidate
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8"
          >
            <h2 className="text-lg font-semibold">{T("formTitle")}</h2>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-medium">{T("name")}</label>
                <input
                  id="name"
                  value={values.name}
                  maxLength={100}
                  onChange={(e) => setField("name", e.target.value)}
                  placeholder={T("namePh")}
                  className={inputClass}
                />
                {errors.name && <p className="mt-1.5 text-xs text-destructive">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium">{T("email")}</label>
                <input
                  id="email"
                  type="email"
                  value={values.email}
                  maxLength={255}
                  onChange={(e) => setField("email", e.target.value)}
                  placeholder={T("emailPh")}
                  className={inputClass}
                />
                {errors.email && <p className="mt-1.5 text-xs text-destructive">{errors.email}</p>}
              </div>
            </div>

            <div className="mt-5">
              <label htmlFor="subject" className="mb-1.5 block text-sm font-medium">{T("subject")}</label>
              <input
                id="subject"
                value={values.subject}
                maxLength={150}
                onChange={(e) => setField("subject", e.target.value)}
                placeholder={T("subjectPh")}
                className={inputClass}
              />
              {errors.subject && <p className="mt-1.5 text-xs text-destructive">{errors.subject}</p>}
            </div>

            <div className="mt-5">
              <label htmlFor="message" className="mb-1.5 block text-sm font-medium">{T("message")}</label>
              <textarea
                id="message"
                rows={6}
                value={values.message}
                maxLength={2000}
                onChange={(e) => setField("message", e.target.value)}
                placeholder={T("messagePh")}
                className={`${inputClass} resize-none`}
              />
              {errors.message && <p className="mt-1.5 text-xs text-destructive">{errors.message}</p>}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-60 sm:w-auto"
            >
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              {submitting ? T("sending") : T("send")}
            </button>
          </motion.form>
        </div>
      </main>

      <footer className="border-t border-border px-4 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 sm:flex-row">
          <span className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Finewa.
          </span>
          <a href={`mailto:${SUPPORT_EMAIL}`} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            {SUPPORT_EMAIL}
          </a>
        </div>
      </footer>
    </div>
  );
}
