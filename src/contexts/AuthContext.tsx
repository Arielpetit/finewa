import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from "react";

/** Minimal user shape (compatible with Supabase User later) */
export interface AuthUser {
  id: string;
  email: string;
}

/** Profile row from future profiles table */
export interface Profile {
  id: string;
  fullName: string;
  avatarUrl?: string;
}

export interface AuthContextValue {
  user: AuthUser | null;
  profile: Profile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error?: string }>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate initial auth check
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 50);
    return () => clearTimeout(timer);
  }, []);

  const signIn = useCallback(async (email: string, _password: string): Promise<{ error?: string }> => {
    console.log("[AuthContext] signIn stub called:", email);
    // Stub — will be replaced with Supabase auth
    return { error: "Authentication not yet configured. Enable Lovable Cloud to sign in." };
  }, []);

  const signUp = useCallback(async (email: string, _password: string, fullName: string): Promise<{ error?: string }> => {
    console.log("[AuthContext] signUp stub called:", email, fullName);
    return { error: "Authentication not yet configured. Enable Lovable Cloud to create accounts." };
  }, []);

  const signOut = useCallback(async () => {
    console.log("[AuthContext] signOut stub called");
    setUser(null);
    setProfile(null);
  }, []);

  const resetPassword = useCallback(async (email: string): Promise<{ error?: string }> => {
    console.log("[AuthContext] resetPassword stub called:", email);
    return {};
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      profile,
      isLoading,
      isAuthenticated: user !== null,
      signIn,
      signUp,
      signOut,
      resetPassword,
    }),
    [user, profile, isLoading, signIn, signUp, signOut, resetPassword],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
