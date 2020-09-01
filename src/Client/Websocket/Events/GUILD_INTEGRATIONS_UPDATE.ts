
import { EvolveClient, EVENTS, Payload } from "../../..";

export default class {
	constructor(client: EvolveClient, payload: Payload) {
		(async() => {
			const guild = await client.api.getGuild(payload.d.guild);
			client.emit(EVENTS.GUILD_INTEGRATIONS_UPDATE, guild);
		})();
	}
}
