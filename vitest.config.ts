import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";

const vitestConfig = mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: "happy-dom",
      clearMocks: true,
      silent: true,
      setupFiles: "./src/setupTests.ts",
      coverage: {
        reporter: ["text", "json", "html"],
      },
      reporters: ["default", "json", "html"],
    },
  })
);

export default vitestConfig;
