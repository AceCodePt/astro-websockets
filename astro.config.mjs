import { defineConfig } from "astro/config";
import node from "@astrojs/node";
import { loadEnv } from "vite";
const { PORT } = loadEnv(process.env.NODE_ENV, process.cwd(), "");

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: node({
    mode: "middleware",
  }),

  server: {
    port: +(PORT || process.env.PORT || 5000),
  },
});
