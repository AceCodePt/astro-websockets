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
  // integrations: [
  //   {
  //     name: "sockets",
  //     hooks: {
  //       "astro:server:setup": ({ server }) => {
  //         server.
  //         server.middlewares.use(apiProxy);
  //       },
  //     },
  //   },
  // ],

  server: {
    port: +(PORT || process.env.PORT || 5000),
  },
});
