import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useDemo } from "@/hooks/useDemo";
import { ErrorAlert } from "@/components/ErrorAlert";
import { Package, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/signup")({
  component: SignupPage,
  head: () => ({
    meta: [{ title: "Create Account — Stackwise" }],
  }),
});

function SignupPage() {
  const { isAuthenticated, signUp } = useAuth();
  const { isDemo } = useDemo();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (isAuthenticated || isDemo) {
    navigate({ to: "/app/dashboard" });
    return null;
  }

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = "Full name is required";
    if (!email) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Enter a valid email address";
    if (!password) errs.password = "Password is required";
    else if (password.length < 8) errs.password = "Password must be at least 8 characters";
    if (password !== confirmPassword) errs.confirmPassword = "Passwords do not match";
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!validate()) return;
    setLoading(true);
    const result = await signUp(email, password, fullName);
    setLoading(false);
    if (result.error) {
      setError(result.error);
    } else {
      setSuccess(true);
    }
  };

  const clearField = (field: string) => {
    setFieldErrors((p) => ({ ...p, [field]: undefined }));
    setError(null);
  };

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="w-full max-w-sm text-center">
          <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-primary" />
          <h1 className="mb-2 text-lg font-semibold">Check your email</h1>
          <p className="mb-6 text-sm text-muted-foreground">
            We sent a verification link to <strong>{email}</strong>. Click the link to activate your account.
          </p>
          <Link to="/login" className="text-sm font-medium text-primary hover:underline">Back to sign in</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex items-center justify-center gap-2">
          <Package className="h-7 w-7 text-primary" />
          <span className="text-xl font-semibold tracking-tight">Stackwise</span>
        </div>

        <h1 className="mb-6 text-center text-lg font-semibold">Create your account</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <ErrorAlert message={error} />

          <div className="flex flex-col gap-1.5">
            <label htmlFor="fullName" className="text-sm font-medium">Full name</label>
            <input id="fullName" type="text" value={fullName}
              onChange={(e) => { setFullName(e.target.value); clearField("fullName"); }}
              className="h-9 rounded-md border border-input bg-background px-3 text-sm outline-none transition-colors focus:border-primary"
              placeholder="Jane Smith" />
            {fieldErrors.fullName && <p className="text-xs text-destructive">{fieldErrors.fullName}</p>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-medium">Email</label>
            <input id="email" type="email" value={email}
              onChange={(e) => { setEmail(e.target.value); clearField("email"); }}
              className="h-9 rounded-md border border-input bg-background px-3 text-sm outline-none transition-colors focus:border-primary"
              placeholder="you@example.com" />
            {fieldErrors.email && <p className="text-xs text-destructive">{fieldErrors.email}</p>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-sm font-medium">Password</label>
            <input id="password" type="password" value={password}
              onChange={(e) => { setPassword(e.target.value); clearField("password"); }}
              className="h-9 rounded-md border border-input bg-background px-3 text-sm outline-none transition-colors focus:border-primary"
              placeholder="Min. 8 characters" />
            {fieldErrors.password && <p className="text-xs text-destructive">{fieldErrors.password}</p>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="confirmPassword" className="text-sm font-medium">Confirm password</label>
            <input id="confirmPassword" type="password" value={confirmPassword}
              onChange={(e) => { setConfirmPassword(e.target.value); clearField("confirmPassword"); }}
              className="h-9 rounded-md border border-input bg-background px-3 text-sm outline-none transition-colors focus:border-primary"
              placeholder="Repeat password" />
            {fieldErrors.confirmPassword && <p className="text-xs text-destructive">{fieldErrors.confirmPassword}</p>}
          </div>

          <button type="submit" disabled={loading}
            className="h-9 rounded-md bg-primary text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50">
            {loading ? "Creating account…" : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-primary hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
