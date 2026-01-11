import copy from "rollup-plugin-copy";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    sourcemap: true,
    rollupOptions: {
      input: "src/ts/module.ts",
      output: {
        dir: "dist/scripts/",
        entryFileNames: "[name].js",
        format: "es",
      },
    },
  },
  plugins: [
    copy({
      targets: [{ src: "src/module.json", dest: "dist" }],
      hook: "writeBundle",
    }),
  ],
});
