import { EvolveClient, EVENTS, Payload } from "../../../mod.ts";
import { GuildIntegrationEvents } from "../../Events/GuildIntegrationEvents.ts";

export default class {
	constructor(client: EvolveClient, payload: Payload, shard: number) {
		(async () => {
			const guild = await client.rest.getGuild(payload.d.guild);
			client.emit(
				EVENTS.GUILD_INTEGRATIONS_UPDATE,
				new GuildIntegrationEvents(client, guild, shard)
			);
		})();
	}
}
