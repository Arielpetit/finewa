import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { ErrorAlert } from "@/components/ErrorAlert";
import { Package, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/forgot-password")({
  component: ForgotPasswordPage,
  head: () => ({
    meta: [{ title: "Reset Password — Stackwise" }],
  }),
});

function ForgotPasswordPage() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFieldError("Enter a valid email address");
      return;
    }
    setLoading(true);
    const result = await resetPassword(email);
    setLoading(false);
    if (result.error) setError(result.error);
    else setSuccess(true);
  };

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="w-full max-w-sm text-center">
          <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-primary" />
          <h1 className="mb-2 text-lg font-semibold">Check your email</h1>
          <p className="mb-6 text-sm text-muted-foreground">
            If an account exists with that email, you'll receive a reset link.
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

        <h1 className="mb-2 text-center text-lg font-semibold">Reset your password</h1>
        <p className="mb-6 text-center text-sm text-muted-foreground">Enter your email and we'll send a reset link.</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <ErrorAlert message={error} />
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-medium">Email</label>
            <input id="email" type="email" value={email}
              onChange={(e) => { setEmail(e.target.value); setFieldError(null); setError(null); }}
              className="h-9 rounded-md border border-input bg-background px-3 text-sm outline-none transition-colors focus:border-primary"
              placeholder="you@example.com" />
            {fieldError && <p className="text-xs text-destructive">{fieldError}</p>}
          </div>

          <button type="submit" disabled={loading}
            className="h-9 rounded-md bg-primary text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50">
            {loading ? "Sending…" : "Send Reset Link"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          <Link to="/login" className="font-medium text-primary hover:underline">Back to sign in</Link>
        </p>
      </div>
    </div>
  );
}
