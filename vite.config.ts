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
        ref: true,
        exportType: "default",
        expandProps: true,
        dimensions: false,
        svgProps: {
          role: "img",
          className: "{props.className ?? props.class ?? undefined}",
          fill: "{props.fill ?? 'currentColor'}",
          color: "{props.color ?? 'currentColor'}",
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
    react(),
  ],
});

export default viteConfig;
