/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-mixed-spaces-and-tabs */
import { readdirSync } from "fs";
import { join } from "path";
import { Objex } from "@evolvejs/objex";


export class Structures {
	private _structures: Objex<string, unknown> = new Objex()

	constructor() {
		this.load();
	}

	private load() {
		readdirSync(__dirname).filter(file => !file.endsWith(".d.ts") && !file.endsWith(".js")).forEach(dir => {
			const files = readdirSync(join(__dirname, dir)).filter(file => file.endsWith(".js"));
			for(const file of files) {
				const structure = require(`./${dir}/${file}`);
				this._structures.set(file, structure[file.split(".js")[0]]);
			}
		});
	}

	public get(name: string): unknown {
		return this._structures.get(name + ".js");
	}
}