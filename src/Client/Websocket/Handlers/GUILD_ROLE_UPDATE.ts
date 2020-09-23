import { EvolveClient, EVENTS, Payload, Role } from "../../../mod.ts";
import { GuildRoleEvents } from "../../Events/GuildRoleEvents.ts";

export default class {
	constructor(client: EvolveClient, payload: Payload, shard: number) {
		(async () => {
			const { guild_id, role } = payload.d;
			const guild = await client.rest.getGuild(guild_id);

			client.emit(
				EVENTS.GUILD_ROLE_UPDATE,
				new GuildRoleEvents(client, new Role(role), guild, shard)
			);
		})();
	}
}
