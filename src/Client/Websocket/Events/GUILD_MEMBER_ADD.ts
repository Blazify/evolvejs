
import { EvolveClient, EVENTS, Payload, GuildMember } from "../../..";

export default class {
	constructor(client: EvolveClient, payload: Payload) {
		const guild_member = payload.d;
		client.emit(EVENTS.GUILD_MEMBER_ADD, new GuildMember(guild_member));
	}
}
