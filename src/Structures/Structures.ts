/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-mixed-spaces-and-tabs */
import { readdirSync } from "fs";
import { join } from "path";
import { Objex } from "@evolvejs/objex";
import { EvolveClient } from "../Client/EvolveClient";

export class Structures {
	private _structures: Objex<string, unknown> = new Objex();

	constructor(private client: EvolveClient) {
		this._load();
	}

	private _load() {
		readdirSync(__dirname)
			.filter((file: string) => !file.endsWith(".d.ts") && !file.endsWith(".js"))
			.forEach((dir: string) => {
				const files = readdirSync(join(__dirname, dir)).filter((file: string) =>
					file.endsWith(".js")
				);
				for (const file of files) {
					const structure = require(`./${dir}/${file}`);
					this._structures.set(
						file.split(".js")[0],
						structure[file.split(".js")[0]]
					);
				}
			});
	}

	public get<K>(name: string, type = "get"): K {
		if (!this._structures.get(name) && type == "get")
			this.client.logger.error(
				"Invalid Structure Name"
			);
			else if(!this._structures.get(name) && type == "extend")
			this.client.logger.error("No New Structure Returned")
		return this._structures.get(name);
	}

	public extend<K>(name: string, extender: Function): K {
		try {
			const structure: K = this.get<K>(name);
			const extended = extender(structure);

			this._structures.delete(name);
			this._structures.set(name, extended);
			return extended;
		} catch (e) {
			this.client.logger.error(e);
			return this.get<K>(name);
		}
	}

}
