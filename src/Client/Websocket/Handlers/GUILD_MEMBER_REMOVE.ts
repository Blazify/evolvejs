import { EvolveClient, EVENTS, Payload, User } from "../../../mod.ts";
import { GuildMemberEvent } from "../../Events/GuildMemberEvents.ts";

export default class {
	constructor(client: EvolveClient, payload: Payload, shard: number) {
		(async () => {
			const guild = await client.rest.getGuild(payload.d.guild_id);
			client.emit(
				EVENTS.GUILD_MEMBER_REMOVE,
				new GuildMemberEvent(client, new User(payload.d.user), guild, shard)
			);
		})();
	}
}
