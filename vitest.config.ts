import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@pages": path.resolve(__dirname, "./src/pages"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: [path.resolve(__dirname, "./src/test/setup.tsx")],
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "**/.{idea,git,cache,output,temp}/**",
    ],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "**/node_modules/**",
        "**/dist/**",
        "**/*.spec.tsx",
        "**/*.spec.ts",
        "**/test/**",
        "**/main.tsx",
        "**/vite-env.d.ts",
        "**/vite.config.ts",
        "**/vitest.config.ts",
        "**/*.config.js",
      ],
      thresholds: {
        branches: 57,
        functions: 51,
        lines: 45,
        statements: 45,
      },
    },
  },
});
