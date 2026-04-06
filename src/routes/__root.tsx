import { Outlet, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { DemoProvider } from "@/contexts/DemoContext";
import { RoleProvider } from "@/contexts/RoleContext";
import { Toaster } from "@/components/ui/sonner";
import { ErrorBoundary } from "@/components/shared/ErrorBoundary";

import appCss from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "FinWise — Your Smart Financial Assistant" },
      { name: "description", content: "Take control of your money with AI-powered insights, smart budgets, and personalized financial advice." },
      { property: "og:title", content: "FinWise — Your Smart Financial Assistant" },
      { property: "og:description", content: "Take control of your money with AI-powered insights, smart budgets, and personalized financial advice." },
      { property: "og:type", content: "website" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head suppressHydrationWarning>
        <link rel="stylesheet" href={appCss} />
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <DemoProvider>
      <RoleProvider>
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
        <Toaster position="bottom-right" richColors />
      </RoleProvider>
    </DemoProvider>
  );
}
