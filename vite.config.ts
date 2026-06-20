import { defineConfig } from "@lovable.dev/vite-tanstack-config";

process.env.LOVABLE_SANDBOX = "true";

const isLovableBuild = true;
const STATIC_BUILD = false;

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
});
