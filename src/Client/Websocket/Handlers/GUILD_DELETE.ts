import { EvolveClient, EVENTS, Payload } from "../../..";
import { GuildEvents } from "../../Events/GuildEvents";

export default class {
	constructor(client: EvolveClient, payload: Payload, shard: number) {
		const guild = payload.d;
		client.api.getGuild(guild.id).then((o) => {
			client.emit(EVENTS.GUILD_DELETE, new GuildEvents(client, o, shard));
		});
	}
}
