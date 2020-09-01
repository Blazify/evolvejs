
import { EvolveClient, EVENTS, Payload, GuildMember } from "../../..";

export default class {
	constructor(client: EvolveClient, payload: Payload) {
		const { channel_id, guild_id, user_id, timestamp, member } = payload.d;
		client.emit(EVENTS.TYPING_START, client.channels.get(channel_id), client.guilds.get(guild_id), client.users.get(user_id), timestamp, new GuildMember(member));
	}
}
