const { readFile, writeFile, readdirSync } = require("fs");
const { exec } = require("child_process");

function editFile(filename) {
  readFile(`${filename}`, (err, data) => {
    if (err) throw err;
    let stringedData = data.toString();
    if (stringedData.includes('import { URL } from "url";')) {
      stringedData = stringedData.replace('import { URL } from "url";', "");
    }
    if (stringedData.includes('import fetch from "node-fetch";')) {
      stringedData = stringedData.replace(
        'import fetch from "node-fetch";',
        ""
      );
    }
    if (stringedData.includes('import { Data } from "ws"')) {
      stringedData = stringedData.replace(
        'import { Data } from "ws"',
        'import { parse } from "https://deno.land/std/encoding/toml"'
      );
    }
    if (stringedData.includes("data: Data")) {
      stringedData = stringedData.replace("data: Data", "data: string");
    }
    if (stringedData.includes('import ws, { Data } from "ws";')) {
      stringedData = stringedData.replace(
        'import ws, { Data } from "ws";',
        'import { WebSocket as ws, WebSocketError } from "https://deno.land/x/websocket@v0.0.5/mod";'
      );
    }
    if (stringedData.includes('this.on("error", (err: Error) => {')) {
      stringedData = stringedData.replace(
        'this.on("error", (err: Error) => {',
        'this.on("error", (err: WebSocketError) => {'
      );
    }
    if (stringedData.includes("public send(data: Payload): void {")) {
      stringedData = stringedData.replace(
        "public send(data: Payload): void {",
        "public async send(data: any): Promise<void> {"
      );
    }
    if (
      stringedData.includes(
        "public init(data: string, ws: EvolveSocket): void {"
      )
    ) {
      stringedData = stringedData.replace(
        "public init(data: string, ws: EvolveSocket): void {",
        "public async init(data: string, ws: EvolveSocket): Promise<void> {"
      );
    }
    if (stringedData.includes('import { Objex } from "@evolvejs/objex"')) {
      stringedData = stringedData.replace(
        'import { Objex } from "@evolvejs/objex"',
        'import { Objex } from "https://deno.land/x/objex/mod"'
      );
    }
    if (
      stringedData.includes('import { Logger, Colors } from "sign-logger";')
    ) {
      stringedData.replace(
        'import { Logger, Colors } from "sign-logger";',
        'import { Logger, Colors } from "https://deno.land/x/sign-logger/mod";'
      );
    }
    if (
      stringedData.includes(
        'require("erlpack").unpack(Buffer.from(data.toString(), "binary"))'
      )
    ) {
      stringedData = stringedData.replace(
        'require("erlpack").unpack(Buffer.from(data.toString(), "binary"))',
        "(await parse(new TextDecoder().decode(data as unknown as ArrayBuffer)))[0] as Payload"
      );
    }
    if (stringedData.includes('require("erlpack").pack(data)')) {
      stringedData = stringedData.replace(
        'require("erlpack").pack(data)',
        "payload = new TextEncoder().encode(data)"
      );
    }
    const args = stringedData.split(/ +/g);
    for (let i = 0; i < args.length; i++) {
      if (args[i] === "from") {
        const double = args[i + 1].lastIndexOf('"');
        args[i + 1] =
          args[i + 1].slice(0, double) + ".ts" + args[i + 1].slice(double);
      }
    }
    stringedData = args.join(" ");
    if (stringedData.includes("...ts")) {
      stringedData = stringedData.replace("...ts", "../mod.ts");
    }
    if (filename.includes("index.ts")) {
      filename = filename.replace("index.ts", "mod.ts");
    }
    filename = filename.replace("src", "deno/src");
    console.log(`Wrote Data to ${filename}`);
    writeFile(filename, stringedData, (err) => {
      if (err) throw err;
    });
    if (filename == "deno/src/mod.ts") {
      console.log("Deno Conversion Completed! Module Ready for Release!");
    }
  });
}
function readDir(dirName) {
  try {
    readdirSync(dirName, { withFileTypes: true }).forEach((file) => {
      if (file.isDirectory()) {
        exec(
          `mkdir ${dirName.replace(
            "src",
            "deno/src"
          )} && mkdir ${dirName.replace("src", "deno/src")}/${file.name}`
        );
        readDir(`${dirName}/${file.name}`);
      } else {
        exec(
          `mkdir ${dirName.replace("src", "deno/src")} && cd ${dirName.replace(
            "src",
            "deno/src"
          )}/ && touch ${file.name}`
        );
        editFile(`${dirName}/${file.name}`);
      }
    });
  } catch (e) {
    console.error(e);
  }
}

exec("mkdir deno && mkdir deno/src");
exec(
  "mkdir deno/.vscode && cd deno/.vscode && touch settings.json && rm -r settings.json.swp"
);
writeFile(
  "deno/.vscode/settings.json",
  JSON.stringify(
    {
      "deno.enable": true,
    },
    null,
    4
  ),
  (err) => {
    if (err) console.error(err);
  }
);
readFile("README.md", (err, data) => {
  if (err) console.error(err);

  writeFile("deno/README.md", data, (err) => {
    if (err) console.error(err);
  });
});
readFile("LICENSE", (err, data) => {
  if (err) console.error(err);

  writeFile("LICENSE", data, (err) => {
    if (err) console.error(err);
  });
});
readDir("src");
