
import { EvolveClient, EVENTS, Payload, Guild } from "../../..";

export default class {
	constructor(client: EvolveClient, payload: Payload) {
		const guild = payload.d;
		if(client.guilds.get(guild.id)) {
			return;
		} else {
			const newGuild = new Guild(guild, client);

			client.emit(EVENTS.GUILD_CREATE, (newGuild));
		}
	}
}
