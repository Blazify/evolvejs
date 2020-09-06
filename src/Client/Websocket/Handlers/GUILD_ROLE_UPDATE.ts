import { EvolveClient, EVENTS, Payload, Role } from "../../..";
import { GuildRoleEvents } from "../../Events/GuildRoleEvents";

export default class {
	constructor(client: EvolveClient, payload: Payload, shard: number) {
		(async () => {
			const { guild_id, role } = payload.d;
			const guild = await client.api.getGuild(guild_id);

			client.emit(
				EVENTS.GUILD_ROLE_UPDATE,
				new GuildRoleEvents(client, new Role(role), guild, shard)
			);
		})();
	}
}
