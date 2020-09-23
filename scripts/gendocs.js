const fs = require("fs");
const typedoc = require("typedoc");
const path = require("path");

const { version } = require("../package.json");

const app = new typedoc.Application();

app.options.addReader(new typedoc.TSConfigReader());

function getConvertedType(type) {
	if (type.type === "query") {
		if (type.queryType.type === "reference") {
			return {
				...type.queryType,
			};
		}
	}
	return type;
}

function getSignature(signature) {
	if (
		signature.flags &&
    (!signature.flags.isExported || signature.flags.isPrivate)
	) {
		return;
	}

	if (signature.comment && typeof signature.comment !== "string") {
		signature.comment = Object.fromEntries(
			Object.entries(signature.comment)
				.filter(([k, v]) => typeof v == "string")
				.map(([k, v]) => [k, v.replace(/(\r\n|\n|\r)/gm, "")])
		);
	} else if (signature.comment && typeof signature.comment == "string") {
		signature.comment.replace(/(\r\n|n\n|\r)/gm, "");
	}

	if (signature.type) {
		signature.type = getConvertedType(signature.type);
	}

	if (signature.parameters) {
		signature.parameters = getParameters(signature);
	}

	// cleanup
	delete signature.kindString;
	delete signature.flags;
	return signature;
}

function getParameters(object) {
	const parameters = [];
	for (let i = 0; i < object.parameters.length; i++) {
		const parameter = object.parameters[i];
		if (
			parameter.flags &&
      (!parameter.flags.isExported || parameter.flags.isPrivate)
		) {
			continue;
		}

		if (parameter.comment) {
			parameter.comment = Object.fromEntries(
				Object.entries(parameter.comment).map(([k, v]) => [
					k,
					v.replace(/(\r\n|\n|\r)/gm, ""),
				])
			);
		}

		if (parameter.type) {
			parameter.type = getConvertedType(parameter.type);
		}

		if (parameter.flags.isOptional) {
			parameter.optional = true;
		}

		// cleanup
		delete parameter.kindString;
		delete parameter.flags;
		parameters.push(parameter);
	}
	return parameters;
}

function getSignatures(object) {
	const signatures = [];
	for (let i = 0; i < object.signatures.length; i++) {
		let signature = object.signatures[i];
		signature = getSignature(signature);
		if (signature) signatures.push(signature);
	}
	return signatures;
}

function getChildren(object) {
	const children = [];
	for (let i = 0; i < object.children.length; i++) {
		const child = object.children[i];
		if (child.flags && (!child.flags.isExported || child.flags.isPrivate)) {
			continue;
		}
		if (child.children) {
			children.push(...getChildren(child));
			child.children = child.children.map((x) => x.id);
		}
		if (
			child.sources &&
      child.sources.every((x) => x.fileName.startsWith("node_modules"))
		) {
			continue;
		}

		if (child.sources) child.source = child.sources[0];

		if (child.comment && typeof child.comment !== "string") {
			child.comment = Object.fromEntries(
				Object.entries(child.comment)
					.filter(([k, v]) => typeof v == "string")
					.map(([k, v]) => [k, v.replace(/(\r\n|\n|\r)/gm, "")])
			);
		} else if (child.comment && typeof child.comment == "string") {
			child.comment.replace(/(\r\n|\n|\r)/gm, "");
		}

		if (child.type) {
			child.type = getConvertedType(child.type);
		}

		if (child.signatures) {
			child.signatures = getSignatures(child);
		}

		// cleanup
		delete child.kindString;
		delete child.flags;
		delete child.sources;
		if (child.source) delete child.source.character;
		if (child.getSignature) {
			delete child.getSignature;
		}
		if (child.signatures && !child.signatures.length) delete child.signatures;

		children.push(child);
	}
	return children;
}

function cleanNames(json) {
	const newJson = [];

	for (let i = 0; i < json.length; i++) {
		json[i].name = json[i].name.split("/").pop();
		if (json[i].name.endsWith("ts"))
			json[i].name = json[i].name.split(".").pop();

		if (json[i].name.includes("\""))
			json[i].name = json[i].name.replace("\"", "");

		newJson.push(json[i]);
	}
	return newJson;
}

const result = app.bootstrap();
const src = app.expandInputFiles(result.inputFiles);
const project = app.convert(src);
if (project) {
	const outputJson = app.serializer.projectToObject(project);
	let customJson = getChildren(outputJson);
	customJson = cleanNames(customJson);
	fs.writeFile(
		path.join(__dirname, "..", `${process.argv[2] || version}.json`),
		JSON.stringify(customJson),
		(err) => {
			if (err) console.error(err);
			else console.log("Success");
		}
	);
} else {
	throw new Error("Project not found!");
}
