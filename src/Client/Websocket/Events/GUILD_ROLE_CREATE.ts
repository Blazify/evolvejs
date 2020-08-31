
import { EvolveClient, EVENTS, Payload, Role } from "../../..";

export default class {
	constructor(client: EvolveClient, payload: Payload) {
		(async() => {
			const { guild_id, role } = payload.d;
			const guild = await client.api.getGuild(guild_id);

			client.emitEvent(EVENTS.GUILD_ROLE_CREATE, new Role(role), guild);
		})();
	}
}
