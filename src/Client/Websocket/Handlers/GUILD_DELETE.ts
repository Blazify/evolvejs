import { EvolveClient, EVENTS, Payload } from "../../../mod.ts";
import { GuildEvents } from "../../Events/GuildEvents.ts";

export default class {
	constructor(client: EvolveClient, payload: Payload, shard: number) {
		(async () => {
			const o = await client.rest.getGuild(payload.d);
			client.emit(EVENTS.GUILD_DELETE, new GuildEvents(client, o, shard));
		})();
	}
}
