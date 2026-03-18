

## Plan: Remove Authentication, Keep Demo Only

### Summary
Strip all sign-in/sign-up/password-reset flows. The app becomes demo-only: landing page → "Try Demo" → app. Remove AuthProvider/AuthContext entirely.

### Changes

**1. Delete auth route files**
- `src/routes/login.tsx`
- `src/routes/signup.tsx`
- `src/routes/forgot-password.tsx`
- `src/routes/reset-password.tsx`

**2. Delete auth files**
- `src/contexts/AuthContext.tsx`
- `src/hooks/useAuth.ts`

**3. Update `src/routes/__root.tsx`**
- Remove `AuthProvider` import and wrapper. Keep DemoProvider and RoleProvider.

**4. Update `src/routes/index.tsx` (Landing Page)**
- Remove the "Sign In" link/button. Keep only the "Try Demo" button.

**5. Update `src/routes/app.tsx` (App Layout guard)**
- Remove `useAuth` import and usage. Guard becomes `isDemo` only — if not demo, redirect to `/`.

**6. Update `src/components/layout/Header.tsx`**
- Remove `useAuth` import. Remove `signOut` call. The exit button always calls `exitDemoMode()`. Display name always "Demo Admin" (or role-based).

**7. Update `src/components/layout/DemoBanner.tsx`**
- Change "Create Account" link to just navigate to `/` (exit demo), or remove it entirely.

