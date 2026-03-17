import { createFileRoute, Outlet, useLocation, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { DemoBanner } from "@/components/layout/DemoBanner";
import { useDemo } from "@/hooks/useDemo";
import { useAuth } from "@/hooks/useAuth";
import { useRole } from "@/hooks/useRole";
import { canAccessRoute } from "@/lib/route-guard";
import { toast } from "sonner";

export const Route = createFileRoute("/app")({
  component: AppLayout,
});

function AppLayout() {
  const { isDemo } = useDemo();
  const { isAuthenticated, isLoading } = useAuth();
  const { role } = useRole();
  const navigate = useNavigate();
  const location = useLocation();

  // Auth guard
  if (!isDemo && !isAuthenticated) {
    if (isLoading) {
      return (
        <div className="flex h-screen items-center justify-center bg-background">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      );
    }
    navigate({ to: "/login" });
    return null;
  }

  // Role-based route guard
  useEffect(() => {
    if (!canAccessRoute(location.pathname, role)) {
      toast.error("You don't have permission to access that page.");
      navigate({ to: "/app/dashboard" });
    }
  }, [location.pathname, role, navigate]);

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      <DemoBanner />
      <div className="flex flex-1 overflow-hidden">
        <aside className="hidden w-[260px] shrink-0 border-r border-border md:block">
          <Sidebar />
        </aside>
        <div className="flex flex-1 flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-4 md:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
