import fs from "fs";
import path from "path";
import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";

const testsDirectoryPath = path.join(__dirname, "tests");

const setupFilesPath = fs
  .readdirSync(testsDirectoryPath)
  .map((filename) => path.join(testsDirectoryPath, filename));

const excludedFiles = [
  "**/node_modules/**",
  "**/dist/**",
  "**/cypress/**",
  "**/.{idea,git,cache,output,temp}/**",
  "**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*",
  "**/*.mock.ts",
];

const vitestConfig = mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: "happy-dom",
      clearMocks: true,
      setupFiles: setupFilesPath,
      silent: true,
      coverage: {
        provider: "v8",
        reporter: ["html"],
        exclude: excludedFiles,
      },
      reporters: ["default", "html"],
      include: ["**/*.{test,spec}.?(c|m)[jt]s?(x)"],
      exclude: excludedFiles,
    },
  })
);

export default vitestConfig;
