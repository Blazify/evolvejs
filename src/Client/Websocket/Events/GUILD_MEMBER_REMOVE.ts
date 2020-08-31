
import { EvolveClient, EVENTS, Payload, User } from "../../..";

export default class {
	constructor(client: EvolveClient, payload: Payload) {
		(async() => {
			const guild = await client.api.getGuild(payload.d.guild_id);
			client.emitEvent(EVENTS.GUILD_MEMBER_REMOVE, guild, new User(payload.d.user));
		})();
	}
}
