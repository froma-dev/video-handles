import react from "@vitejs/plugin-react-swc";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@types": resolve(__dirname, "src/types"),
      "@components": resolve(__dirname, "src/components"),
      "@hooks": resolve(__dirname, "src/hooks"),
      "@styles": resolve(__dirname, "src/styles"),
      "@utils": resolve(__dirname, "src/utils"),
      "@src": resolve(__dirname, "src"),
      "@pages": resolve(__dirname, "src/pages"),
      "@routes": resolve(__dirname, "src/routes"),
    },
  },
});
