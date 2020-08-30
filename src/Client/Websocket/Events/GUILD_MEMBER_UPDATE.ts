
import { Payload } from "../../../Interfaces/Interfaces";
import { EvolveClient, EVENTS } from "../../..";
import { GuildMember } from "../../../Structures/Guild/GuildMember";

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

			client.emit(EVENTS.GUILD_MEMBER_UPDATE, member, o);
		});
	}
}
