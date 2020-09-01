
import { EvolveClient, EVENTS, Payload, Guild } from "../../..";

export default class {
	constructor(client: EvolveClient, payload: Payload) {
		let guild = payload.d;
		guild = new Guild(guild, client);
		client.emit(EVENTS.GUILD_UPDATE, guild);
	}
}
