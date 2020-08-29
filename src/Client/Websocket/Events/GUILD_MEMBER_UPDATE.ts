
import { Payload } from '../../../Interfaces/Interfaces';
import { EvolveClient, EVENTS } from '../../..';
import { IGuildMember } from '../../../Interfaces/GuildMemberOptions';
import { GuildMember } from '../../../Structures/Guild/GuildMember';

export default class {
	constructor(client: EvolveClient, payload: Payload, shard: number) {
		const { guild_id, roles, user, nick, joined_at, premium_since } = payload.d
		let member = new GuildMember({
			user,
			nick,
			roles,
			joined_at,
			premium_since,
			deaf: false,
			mute: false
		})

		client.api.getGuild(guild_id).then(o => {

		client.emit(EVENTS.GUILD_MEMBER_UPDATE, member, o);
		})
	}
}
