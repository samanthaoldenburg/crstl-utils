import * as fsPromises from "fs/promises";
import copy from "rollup-plugin-copy";
import scss from "rollup-plugin-scss";
import { defineConfig, Plugin } from "vite";

export default defineConfig({
  build: {
    sourcemap: true,
    minify: false,
    rollupOptions: {
      input: "src/ts/crstl-utils.ts",
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

function updateModuleManifestPlugin(): Plugin {
 return {
   name: "update-module-manifest",
   async writeBundle(): Promise<void> {
     const moduleVersion = process.env.MODULE_VERSION;
     const manifestContents: string = await fsPromises.readFile(
       "src/module.json",
       "utf-8"
     );
     const manifestJson = JSON.parse(manifestContents) as Record<
       string,
       unknown
     >;

     if (moduleVersion) {
       manifestContents["version"] = moduleVersion;
     }

     await fsPromises.writeFile(
       "dist/module.json",
       JSON.stringify(manifestJson, null, 4)
     );
   },
 };
}
