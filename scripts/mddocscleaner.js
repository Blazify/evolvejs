const { readFile, writeFile, readdirSync } = require("fs");

function editFile(filename) {
	readFile(`${filename}`, (err, data) => {
		if (err) throw err;
		let stringedData = data.toString();
		if(stringedData.includes("../")) {
			stringedData = stringedData.replace("../", "");
		}
		if(stringedData.includes("classes/")) {
			stringedData = stringedData.replace("classes/", "");
		}
		if(stringedData.includes("enums/")) {
			stringedData = stringedData.replace("enums/", "");
		}
		if(stringedData.includes("interfaces/")) {
			stringedData = stringedData.replace("interfaces/", "");
		}
		if(stringedData.includes("modules/")) {
			stringedData = stringedData.replace("modules/", "");
		}
		if(filename.includes("classes/")) {
			filename = filename.replace("classes/", "");
		}
		if(filename.includes("enums/")) {
			filename = filename.replace("enums/", "");
		}
		if(filename.includes("interfaces/")) {
			filename = filename.replace("interfaces/", "");
		}
		if(filename.includes("modules/")) {
			filename = filename.replace("modules/", "");
		}
		if(stringedData.includes("../_")) {
			stringedData = stringedData.replace("../_", "_");
		}
		if(stringedData.includes("classes/_")) {
			stringedData = stringedData.replace("classes/_", "_");
		}
		if(stringedData.includes("enums/_")) {
			stringedData = stringedData.replace("enums/_", "_");
		}
		if(stringedData.includes("interfaces/_")) {
			stringedData = stringedData.replace("interfaces/_", "_");
		}
		if(stringedData.includes("modules/_")) {
			stringedData = stringedData.replace("modules/_", "_");
		}
		if(filename.includes("classes/_")) {
			filename = filename.replace("classes/_", "_");
		}
		if(filename.includes("enums/_")) {
			filename = filename.replace("enums/_", "_");
		}
		if(filename.includes("interfaces/")) {
			filename = filename.replace("interfaces/_", "_");
		}
		if(filename.includes("modules/")) {
			filename = filename.replace("modules/_", "_");
		}
		//filename = filename.replace("docs/", "proper_docs/");
		writeFile(filename, stringedData, (err) => {
			if (err) throw err;
		});
	});
}
function readDir(dirName) {
	try {
		readdirSync(dirName, { withFileTypes: true }).forEach(file => {
			if (file.isDirectory()) {
				readDir(`${dirName}/${file.name}`);
			} else {
				editFile(`${dirName}/${file.name}`);
			}
		});
	} catch(e) {
		console.error(e);
	}
}

readDir("proper_docs");