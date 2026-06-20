// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Outside Lovable (i.e. on Vercel) we build as a pure SPA: skip the
// Lovable Cloudflare nitro plugin, prerender a single shell HTML, and
// let the client router take over for every route. Inside Lovable the
// normal SSR build is untouched so the editor preview keeps working.
const isLovableBuild =
  !!process.env.LOVABLE_SANDBOX || !!process.env.DEV_SERVER__PROJECT_PATH;
const STATIC_BUILD = !isLovableBuild;

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
    ...(STATIC_BUILD
      ? {
          spa: {
            enabled: true,
            maskPath: "/",
            prerender: { outputPath: "/index" },
          },
        }
      : {}),
  },
  ...(STATIC_BUILD ? { nitro: false as const } : {}),
});
