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
      svgrOptions: {
        dimensions: false,
        expandProps: true,
        exportType: "default",
        ref: true,
        svgProps: {
          className: "{props.className ?? props.class ?? undefined}",
          color: "{props.color ?? 'currentColor'}",
          fill: "{props.fill ?? 'currentColor'}",
          role: "img",
        },
        svgo: true,
        svgoConfig: {
          plugins: [
            {
              name: "preset-default",
              params: {
                overrides: {
                  removeViewBox: false,
                },
              },
            },
            "prefixIds",
            "removeDimensions",
          ],
        },
      },
    }),
    react({
      plugins: [["@swc-jotai/debug-label", {}]],
    }),
  ],
});

export default viteConfig;
