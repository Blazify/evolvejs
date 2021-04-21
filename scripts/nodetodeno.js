const { readFile, readdirSync, appendFile, mkdir } = require("fs");

const nodeDenoReplacement = {
	process: "Deno",
	'import { URL } from "url";': "",
	'import fetch from "node-fetch";': "",
	'import ws from "ws";':
		'import { WebSocket as ws, WebSocketError as Error } from "https://deno.land/x/websocket@v0.0.5/mod";',
	"@evolvejs/objex": "https://deno.land/x/objex/mod",
	"sign-logger": "https://deno.land/x/sign_logger/mod",
	'require("erlpack").unpack(Buffer.from(data.toString(), "binary"))':
		'(await (await import("https://deno.land/std/encoding/toml")).parse(new TextDecoder().decode(data as unknown as ArrayBuffer)))[0] as Payload',
	'require("erlpack").pack(data)': "payload = new TextEncoder().encode(data)",
};

const replaceIfPresent = (stringedData, original, replacer) =>
	stringedData.includes(original)
		? stringedData.replaceAll(original, replacer)
		: stringedData;

function editFile(filename) {
	readFile(`${filename}`, (err, data) => {
		if (err) throw err;
		let stringedData = data.toString();
		const args = stringedData.split(/ +/g);
		for (const [k, v] of Object.entries(nodeDenoReplacement)) {
			stringedData = replaceIfPresent(stringedData, k, v);
		}
		for (let i = 0; i < args.length; i++) {
			if (args[i] === "from") {
				const double = args[i + 1].lastIndexOf('"');
				args[i + 1] =
					args[i + 1].slice(0, double) + ".ts" + args[i + 1].slice(double);
			}
		}
		stringedData = args.join(" ");
		stringedData = replaceIfPresent(stringedData, "...ts", "../mod.ts");
		filename = replaceIfPresent(filename, "index.ts", "mod.ts");
		filename = replaceIfPresent(filename, "src", "deno/src");

		appendFile(filename, stringedData, {}, () => {
			console.log(`Wrote Data to ${filename}`);
		});
	});
}
function readDir(dirName) {
	try {
		readdirSync(dirName, { withFileTypes: true }).forEach((file) => {
			if (file.isDirectory()) {
				mkdir(`${dirName.replace("src", "deno/src")}/${file.name}`, () => {
					readDir(`${dirName}/${file.name}`);
				});
			} else {
				editFile(`${dirName}/${file.name}`);
			}
		});
	} catch (e) {
		console.error(e);
	}
}

mkdir("deno", () => {
	mkdir("deno/src", () => {
		mkdir("deno/.vscode", () => {
			appendFile(
				"deno/.vscode/settings.json",
				JSON.stringify(
					{
						"deno.enable": true,
					},
					null,
					4
				),
				{},
				() => {
					readFile("README.md", (err, data) => {
						if (err) console.error(err);

						appendFile("deno/README.md", data, {}, () => {
							appendFile(
								"deno/src/README.md",
								"# [EvolveJS README](https://github.com/EvolveJS/EvolveJS/blob/deno-master/README.md)",
								{},
								() => {
									readFile("LICENSE", (err, data) => {
										if (err) console.error(err);

										appendFile("LICENSE", data, {}, () => {
											readDir("src");
										});
									});
								}
							);
						});
					});
				}
			);
		});
	});
});
