import { EvolveClient, EVENTS, Payload, User } from "../../..";
import { GuildMemberEvent } from "../../Events/GuildMemberEvents";

export default class {
	constructor(client: EvolveClient, payload: Payload, shard: number) {
		(async () => {
			const guild = await client.api.getGuild(payload.d.guild_id);
			client.emit(
				EVENTS.GUILD_MEMBER_REMOVE,
				new GuildMemberEvent(client, new User(payload.d.user), guild, shard)
			);
		})();
	}
}
