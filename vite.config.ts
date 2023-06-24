import react from "@vitejs/plugin-react-swc";
import path from "path";
import { AliasOptions, defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import tsConfig from "./tsconfig.json";

const tsConfigPaths = tsConfig.compilerOptions.paths;
const alias: AliasOptions = Object.entries(tsConfigPaths).map(
  ([pathKey, [replacement]]) => ({
    find: pathKey.replace("/*", ""),
    replacement: path.resolve(__dirname, replacement.replace("/*", "")),
  })
);

// https://vitejs.dev/config/
export default defineConfig(async (_configEnv) => ({
  plugins: [
    /**
     * @see https://github.com/vitejs/awesome-vite#loaders-2
     */
    svgr({
      exportAsDefault: true,
    }),
    react(),
  ],
  resolve: {
    alias,
  },
}));
