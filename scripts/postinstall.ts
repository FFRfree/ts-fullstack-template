import { build } from "tsup";
import { writeJSONSync, readJSONSync } from "fs-extra";

//tsup node_modules/find-up/index.js --format cjs --target node14 --outDir node_modules/find-up/
build({
  entry: ["apps/server/node_modules/find-up/index.js"],
  format: "cjs",
  target: "node14",
  outDir: "node_modules/find-up/",
});

const pkg = readJSONSync("apps/server/node_modules/find-up/package.json");
pkg.module = undefined;
writeJSONSync("apps/server/node_modules/find-up/package.json", pkg);
