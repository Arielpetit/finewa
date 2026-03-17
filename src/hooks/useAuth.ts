import { useContext } from "react";
import { AuthContext, type AuthContextValue } from "@/contexts/AuthContext";

/**
 * Convenience hook for AuthContext.
 * Throws if used outside <AuthProvider>.
 */
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an <AuthProvider>. Wrap your app in <AuthProvider>.");
  }
  return ctx;
}
