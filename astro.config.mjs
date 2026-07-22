import { defineConfig } from "astro/config";

// RezolveIT marketing site — static output, no server adapter needed.
// Deployed as a static export (see vercel.json).
export default defineConfig({
  site: "https://rezolveit.io",
  output: "static",
  trailingSlash: "ignore",
});
