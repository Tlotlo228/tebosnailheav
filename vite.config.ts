import { defineConfig } from "@lovable.dev/vite-tanstack-config";

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
    ...(STATIC_BUILD ? { nitro: false as const } : {}),
  },
});
