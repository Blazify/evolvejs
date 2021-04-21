import { Objex } from "@evolvejs/objex.ts";
import { Guild } from "../../Structures/Guild/Guild.ts";
import { Endpoints } from "../../Utils/Endpoints.ts";
import { EvolveClient } from "../EvolveClient.ts";

export class GuildsManager extends Objex<string, Guild> {
	constructor(public client: EvolveClient) {
		super();
	}

	public async resolve(id: string): Promise<Guild> {
		return new Guild(
			await this.client.rest.endpoint(Endpoints.GUILD).get(id),
			this.client
		);
	}
}
