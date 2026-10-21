import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";

// base "./" + singlefile: hasil build (dist/index.html) satu file mandiri,
// bisa dibuka langsung dari folder (offline) maupun di-host di GitHub Pages.
export default defineConfig({
  base: "./",
  plugins: [react(), viteSingleFile()],
});
