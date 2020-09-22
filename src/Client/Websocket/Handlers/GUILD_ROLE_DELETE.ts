import { EvolveClient, EVENTS, Payload } from "../../mod.ts";
import { GuildRoleEvents } from "../../Events/GuildRoleEvents.ts";

export default class {
	constructor(client: EvolveClient, payload: Payload, shard: number) {
		(async () => {
			const { guild_id, role_id } = payload.d;
			const guild = await client.rest.getGuild(guild_id);
			const role = client.roles.get(role_id);

			client.emit(
				EVENTS.GUILD_ROLE_DELETE,
				new GuildRoleEvents(client, role, guild, shard)
			);
		})();
	}
}
