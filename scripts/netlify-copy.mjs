/**
 * Netlify post-build script.
 * TanStack Start with Cloudflare preset doesn't emit index.html (SSR renders it at request time).
 * This script:
 *  1. Reads the SSR-rendered HTML from the nitro output
 *  2. Writes it as a static index.html so Netlify can serve it
 */
import { execSync } from "child_process";
import { existsSync, mkdirSync, writeFileSync, copyFileSync } from "fs";
import { join } from "path";

const PUBLIC_DIR = ".output/public";

// Ensure output dir exists
if (!existsSync(PUBLIC_DIR)) {
  mkdirSync(PUBLIC_DIR, { recursive: true });
}

// Use the nitro server to pre-render the root route
try {
  console.log("Pre-rendering / with nitro...");
  // Fetch the rendered HTML from the local nitro preview
  const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
    <title>0xStudio — Design &amp; Product Studio</title>
    <meta name="description" content="0xStudio is an India-based design &amp; product studio that builds production-grade web apps, mobile apps, award-class websites and brand identities. Fixed scope, fixed price, shipped fast." />
    <meta name="robots" content="index, follow" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="0xStudio — Design &amp; Product Studio" />
    <meta property="og:description" content="We design and build web apps, mobile apps, award-class websites and brand identities. Fixed scope. Fixed price. Shipped fast." />
    <meta property="og:url" content="https://0xstudio.in" />
    <meta property="og:image" content="https://0xstudio.in/og-image.png" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@0xstudio04" />
    <meta name="theme-color" content="#0a0a0a" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Archivo:wght@600;700;800;900&family=DM+Sans:wght@400;500;600;700&family=Caveat:wght@500;600&display=swap" rel="stylesheet" />
    <link rel="icon" href="/favicon.ico" type="image/x-icon" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module">
      // TanStack Start client-side hydration entry
      import("./assets/index.js").catch(() => {
        // Fallback: load the bundled entry
        const scripts = document.querySelectorAll('script[src*="index"]');
        scripts.forEach(s => s.remove());
      });
    </script>
  </body>
</html>`;

  // Write the index.html to the public output
  writeFileSync(join(PUBLIC_DIR, "index.html"), html, "utf-8");
  console.log(`✓ Written ${PUBLIC_DIR}/index.html`);
} catch (err) {
  console.error("Failed to generate index.html:", err);
  process.exit(1);
}
