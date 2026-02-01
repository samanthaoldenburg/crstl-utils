import { defineConfig } from "vite";
import * as path from "path";
import { globSync } from "glob";

const macros = globSync(path.join(__dirname, 'src/macros/**/*.ts'), {absolute: false})

const entries = {}

for (const path of macros) {
  if (path.match('-helper\.ts$')) { continue }

  const dest = path.slice(4, -3);

  entries[dest] = path
}

console.log(entries)

export default defineConfig({
  build: {
    emptyOutDir: false,
    minify: false,
    lib: {
      entry: entries,
      formats: ["es"]
    },
  }
});

