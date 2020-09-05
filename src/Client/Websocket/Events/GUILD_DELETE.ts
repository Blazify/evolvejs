import { EvolveClient, EVENTS, Payload } from "../../..";

export default class {
	constructor(client: EvolveClient, payload: Payload, shard: number) {
		const guild = payload.d;
		client.api.getGuild(guild.id).then((o) => {
			client.emit(EVENTS.GUILD_DELETE, o, shard);
		});
	}
}
