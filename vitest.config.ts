import fs from "fs";
import path from "path";
import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";

const testsDirectoryPath = path.join(__dirname, "tests");

const setupFilesPath = fs
  .readdirSync(testsDirectoryPath)
  .map((filename) => path.join(testsDirectoryPath, filename));

const vitestConfig = mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: "happy-dom",
      clearMocks: true,
      silent: true,
      setupFiles: setupFilesPath,
      coverage: {
        provider: "v8",
        reporter: ["html"],
      },
      reporters: ["default", "html"],
    },
  })
);

export default vitestConfig;
