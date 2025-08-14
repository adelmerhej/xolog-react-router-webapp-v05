import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from 'path';

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './app'),
    },
  },
  ssr: {
    // Bundle DevExtreme on the server to avoid Node ESM directory import issues
    noExternal: ["devextreme", "devextreme-react"],
  },
});