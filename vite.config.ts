import { vitePlugin as remix } from "@remix-run/dev";
import { netlifyPlugin } from "@netlify/remix-adapter/plugin";
import { installGlobals } from "@remix-run/node";
import tsconfigpaths from "vite-tsconfig-paths";
import { defineConfig } from "vite";

installGlobals();

export default defineConfig({
  server: {
    port: parseInt(process.env.PORT || "3000", 10),
  },
  plugins: [remix(), netlifyPlugin(), tsconfigpaths()],
});
