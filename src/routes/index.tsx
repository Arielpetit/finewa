import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useDemo } from "@/hooks/useDemo";
import { Package } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { enterDemoMode } = useDemo();
  const navigate = useNavigate();

  const handleTryDemo = () => {
    enterDemoMode();
    navigate({ to: "/app/dashboard" });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background p-4">
      <div className="flex items-center gap-3">
        <Package className="h-10 w-10 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Stackwise</h1>
      </div>
      <p className="max-w-md text-center text-muted-foreground">
        Inventory management, simplified. Try the interactive demo to explore.
      </p>
      <button
        type="button"
        onClick={handleTryDemo}
        className="rounded-lg bg-amber-accent px-6 py-2.5 text-sm font-semibold text-foreground shadow-sm transition-colors hover:brightness-95"
      >
        Try Demo
      </button>
    </div>
  );
}
