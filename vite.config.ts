import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig(async (_configEnv) => ({
  plugins: [react()],
  resolve: {
    alias: [{ find: "~", replacement: "src" }],
  },
}));
