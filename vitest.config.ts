/* eslint-disable lodash/prefer-lodash-method */
import fs from "fs";
import path from "path";
import { defineConfig, mergeConfig } from "vitest/config";

import viteConfig from "./vite.config";

const testsDirectoryPath = path.join(__dirname, "tests", "setup-mocks");

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
      clearMocks: true,
      coverage: {
        exclude: excludedFiles,
        provider: "v8",
        reporter: ["html"],
      },
      environment: "happy-dom",
      exclude: excludedFiles,
      globals: true,
      include: ["**/*.{test,spec}.?(c|m)[jt]s?(x)"],
      passWithNoTests: true,
      reporters: ["default", "html"],
      setupFiles: setupFilesPath,
      silent: true,
    },
  })
);

export default vitestConfig;
