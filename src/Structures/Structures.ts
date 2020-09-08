/* eslint-disable @typescript-eslint/ban-types */
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
			.filter((file) => !file.endsWith(".d.ts") && !file.endsWith(".js"))
			.forEach((dir) => {
				const files = readdirSync(join(__dirname, dir)).filter((file) =>
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

	public get(name: string): any {
		if (!this._structures.get(name))
			this.client.logger.error(
				"Invalid Structure Name or no new Structure returned"
			);
		return this._structures.get(name);
	}

	public extend(name: string, extender: Function): any {
		try {
			const structure = this.get(name);
			const extended = extender(structure);

			this._structures.delete(name);
			this._structures.set(name, extended);
			return extended;
		} catch (e) {
			this.client.logger.error(e);
		}
	}
}
