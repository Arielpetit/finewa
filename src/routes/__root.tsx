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
      { title: "Finewa — Your Smart Financial Assistant" },
      { name: "description", content: "Take control of your money with AI-powered insights, smart budgets, and personalized financial advice." },
      { property: "og:title", content: "Finewa — Your Smart Financial Assistant" },
      { property: "og:description", content: "Take control of your money with AI-powered insights, smart budgets, and personalized financial advice." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://finewa.app" },
      { property: "og:image", content: "https://finewa.app/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Finewa — Your Smart Financial Assistant" },
      { name: "twitter:description", content: "Take control of your money with AI-powered insights, smart budgets, and personalized financial advice." },
      { name: "twitter:image", content: "https://finewa.app/og-image.png" },
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
