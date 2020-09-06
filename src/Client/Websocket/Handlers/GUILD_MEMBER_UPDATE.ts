import { EvolveClient, EVENTS, Payload, GuildMember } from "../../..";
import { GuildMemberEvent } from "../../Events/GuildMemberEvents";
export default class {
	constructor(client: EvolveClient, payload: Payload, shard: number) {
		const { guild_id, roles, user, nick, joined_at, premium_since } = payload.d;
		const member = new GuildMember({
			user,
			nick,
			roles,
			joined_at,
			premium_since,
			deaf: false,
			mute: false,
		});

		(async () => {
			const o = await client.api.getGuild(guild_id);
			client.emit(
				EVENTS.GUILD_MEMBER_UPDATE,
				new GuildMemberEvent(client, member, o, shard)
			);
		})();
	}
}
