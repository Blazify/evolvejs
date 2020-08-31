
import { EvolveClient, EVENTS, Payload, GuildMember } from "../../..";
export default class {
	constructor(client: EvolveClient, payload: Payload) {
		const { guild_id, roles, user, nick, joined_at, premium_since } = payload.d;
		const member = new GuildMember({
			user,
			nick,
			roles,
			joined_at,
			premium_since,
			deaf: false,
			mute: false
		});

		client.api.getGuild(guild_id).then(o => {

			client.emitEvent(EVENTS.GUILD_MEMBER_UPDATE, member, o);
		});
	}
}
