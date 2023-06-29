/// <reference types="vitest" />
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
const viteConfig = defineConfig({
  plugins: [
    tsconfigPaths(),
    /**
     * @see https://github.com/vitejs/awesome-vite#loaders-2
     */
    svgr({
      exportAsDefault: true,
    }),
    react(),
  ],
});

export default viteConfig;
