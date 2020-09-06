import { EvolveClient, EVENTS, Payload, GuildMember } from "../../..";
import { GuildMemberEvent } from "../../Events/GuildMemberEvents";

export default class {
	constructor(client: EvolveClient, payload: Payload, shard: number) {
		const member = new GuildMember(payload.d);
		(async() => {
			const o = await client.api.getGuild(payload.d.guild_id);
			client.emit(
				EVENTS.GUILD_MEMBER_ADD,
				new GuildMemberEvent(client, member, o, shard)
			);
		})();
	}
}
