
import { build } from "esbuild";
import path from "path";
import fs from "fs";

// サーバー側のビルド
const serverOptions = {
  entryPoints: [path.resolve("./server/server.ts")],
  minify: true,
  bundle: true,
  target: "ES2022",
  platform: "node",
  format: 'esm', // ESMプロジェクトに設定
  outdir: path.resolve("./dist"),
  tsconfig: path.resolve("./tsconfig.json"),
  external: fs.readdirSync("./node_modules")
}
build(serverOptions).catch(err => {
  process.stderr.write(err.stderr)
  process.exit(1)
})