import * as fsPromises from "fs/promises";
import copy from "rollup-plugin-copy";
import scss from "rollup-plugin-scss";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    sourcemap: true,
    minify: false,
    rollupOptions: {
      input: "src/macros/index.ts",
      output: {
        dir: "dist/macros/",
        entryFileNames: "[name].js",
        format: "es",
      },
    },
  }
});

