const fs = require("fs");
const typedoc = require("typedoc");
const path = require("path");

const { version } = require("../package.json");

const app = new typedoc.Application();

app.options.addReader(new typedoc.TSConfigReader());

const result = app.bootstrap();

const src = app.expandInputFiles(result.inputFiles);
const project = app.convert(src);
if (project) {
	const outputJson = app.serializer.projectToObject(project);
	const customJson = [];
	for (let i = 0; i < outputJson.children.length; i++) {
		const child = outputJson.children[i];
		if (child.flags && !child.flags.isExported) continue;
		if (child.children) {
			child.children = child.children.map((x) => x.id);
		}
		if (/^".+"$/.test(child.name)) child.name = child.name.slice(1, -1);
		customJson.push(child);
	}
	fs.writeFile(
		path.join(__dirname, "..", `${version}.json`),
		JSON.stringify(customJson),
		(err) => {
			if (err) console.error(err);
			else console.log("Docs generated!");
		}
	);
} else {
	throw new Error("Project not found!");
}
