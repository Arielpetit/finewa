import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ErrorAlert } from "@/components/ErrorAlert";
import { Package, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/reset-password")({
  component: ResetPasswordPage,
  head: () => ({
    meta: [{ title: "Set New Password — Stackwise" }],
  }),
});

function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
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
    // Stub — will call supabase.auth.updateUser({ password })
    console.log("[ResetPassword] updateUser stub called");
    setLoading(false);
    setSuccess(true);
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
          <h1 className="mb-2 text-lg font-semibold">Password updated</h1>
          <p className="mb-6 text-sm text-muted-foreground">Your password has been updated successfully.</p>
          <Link to="/login" className="text-sm font-medium text-primary hover:underline">Sign in</Link>
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

        <h1 className="mb-6 text-center text-lg font-semibold">Set new password</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <ErrorAlert message={error} />

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-sm font-medium">New password</label>
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
            {loading ? "Updating…" : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
