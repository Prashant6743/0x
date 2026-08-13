import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },

      // ── Primary SEO ──────────────────────────────────────────────────────────
      { title: "0xStudio — Design & Product Studio" },
      {
        name: "description",
        content:
          "0xStudio is an India-based design & product studio that builds production-grade web apps, mobile apps, award-class websites and brand identities. Fixed scope, fixed price, shipped fast.",
      },
      {
        name: "keywords",
        content:
          "web design studio, product design, UI UX design, React development, web app development, mobile app design, brand identity, Shopify development, Next.js, India design studio, 0xStudio",
      },
      { name: "author", content: "0xStudio" },
      {
        name: "robots",
        content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
      },
      { name: "googlebot", content: "index, follow" },

      // ── Open Graph ───────────────────────────────────────────────────────────
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "0xStudio" },
      { property: "og:title", content: "0xStudio — Design & Product Studio" },
      {
        property: "og:description",
        content:
          "We design and build web apps, mobile apps, award-class websites and brand identities. Fixed scope. Fixed price. Shipped fast.",
      },
      { property: "og:url", content: "https://0xstudio.in" },
      { property: "og:image", content: "https://0xstudio.in/og-image.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "0xStudio — Design & Product Studio" },
      { property: "og:locale", content: "en_IN" },

      // ── Twitter / X ──────────────────────────────────────────────────────────
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@0xstudio04" },
      { name: "twitter:creator", content: "@0xstudio04" },
      { name: "twitter:title", content: "0xStudio — Design & Product Studio" },
      {
        name: "twitter:description",
        content:
          "We design and build web apps, mobile apps, award-class websites and brand identities. Fixed scope. Fixed price. Shipped fast.",
      },
      { name: "twitter:image", content: "https://0xstudio.in/og-image.png" },
      { name: "twitter:image:alt", content: "0xStudio — Design & Product Studio" },

      // ── PWA / Mobile ─────────────────────────────────────────────────────────
      { name: "theme-color", content: "#0a0a0a" },
      { name: "color-scheme", content: "dark" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
      { name: "apple-mobile-web-app-title", content: "0xStudio" },
      { name: "application-name", content: "0xStudio" },
      { name: "msapplication-TileColor", content: "#0a0a0a" },

      // ── Schema.org JSON-LD ───────────────────────────────────────────────────
      {
        "script:ld+json": JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "0xStudio",
          description:
            "India-based design & product studio building production-grade web apps, mobile apps, award-class websites and brand identities.",
          url: "https://0xstudio.in",
          logo: "https://0xstudio.in/favicon.ico",
          sameAs: [
            "https://www.instagram.com/0xstudio_",
            "https://x.com/0xstudio04",
            "https://www.linkedin.com/company/0-x-studio/",
          ],
          address: {
            "@type": "PostalAddress",
            addressCountry: "IN",
          },
          areaServed: "Worldwide",
          serviceType: [
            "Web App Development",
            "Mobile App Development",
            "UX & Product Design",
            "Brand Identity",
            "Shopify Development",
            "Award-Class Web Design",
          ],
          priceRange: "$$",
        }),
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Archivo:wght@600;700;800;900&family=DM+Sans:wght@400;500;600;700&family=Caveat:wght@500;600&display=swap",
      },
      { rel: "canonical", href: "https://0xstudio.in" },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "apple-touch-icon", href: "/favicon.ico" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
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
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
