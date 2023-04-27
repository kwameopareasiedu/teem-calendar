import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/teem-calendar",
  build: {
    outDir: "./docs"
  },
  server: {
    host: "localhost",
    port: 8000
  }
});
