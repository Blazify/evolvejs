
import { Payload } from "../../../Interfaces/Interfaces";
import { EvolveClient, EVENTS } from "../../..";

export default class {
	constructor(client: EvolveClient, payload: Payload) {
		(async() => {
			const guild = await client.api.getGuild(payload.d.guild);
			client.emitEvent(EVENTS.GUILD_INTEGRATIONS_UPDATE, guild);
		})();
	}
}
