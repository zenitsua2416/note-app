/// <reference types="vitest" />
/// <reference types="vite/client" />

import path from "node:path";

import { defineConfig, loadEnv, UserConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteCompression from "vite-plugin-compression";
import { visualizer } from "rollup-plugin-visualizer";

/* Common Config for both PROD and DEV mode */
const commonConfig: UserConfig = {
  plugins: [
    react(),
    viteCompression({
      algorithm: "gzip",
      deleteOriginFile: false,
    }),
    visualizer({
      brotliSize: true,
      gzipSize: true,
      open: true,
      sourcemap: false,
      filename: "dist/stats.html",
    }),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/vitest.setup.ts"],
    css: true,
    testTimeout: 5000,
    reporters: ["verbose"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html", "lcov"],
      reportsDirectory: "./coverage",
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
};

export default defineConfig(({ mode }): UserConfig => {
  /* Load environment variables based on the mode */
  const env = loadEnv(mode, process.cwd(), "");
  const PORT = parseInt(env.PORT) || undefined;

  /* Production-specific configuration */
  if (mode === "production") {
    return {
      ...commonConfig,
      plugins: [commonConfig.plugins],
      build: {
        ...commonConfig.build,
        sourcemap: "hidden", // Do not expose sourcemaps
        minify: "esbuild",
      },
      server: {
        strictPort: true,
        port: PORT,
      },
    };
    /* Development-specific configuration */
  } else if (mode === "development") {
    return {
      ...commonConfig,
      build: {
        ...commonConfig.build,
        sourcemap: "inline",
      },
      server: {
        strictPort: true,
        port: PORT,
      },
    };
  } else return commonConfig;
});
