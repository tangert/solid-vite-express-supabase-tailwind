// src/cli.ts
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
var suppressPath = fileURLToPath(
  new URL("./suppress-warnings.cjs", import.meta.url).href
);
var loaderPath = new URL("./index.js", import.meta.url).href;
var options = (process.env.NODE_OPTIONS ? process.env.NODE_OPTIONS + " " : "") + `-r ${JSON.stringify(suppressPath)} --loader ${loaderPath}`;
var command = process.argv[2];
var args = process.argv.slice(3);
var cp = spawn(command, args, {
  shell: true,
  stdio: "inherit",
  env: {
    ...process.env,
    NODE_OPTIONS: options
  }
});
cp.on("error", (err) => {
  console.error(err);
  process.exit(1);
});
cp.on("exit", (code) => {
  process.exit(code ?? 0);
});
