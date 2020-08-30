
import { Payload } from "../../../Interfaces/Interfaces";
import { EvolveClient, EVENTS } from "../../..";
import { GuildMember } from "../../../Structures/Guild/GuildMember";

export default class {
	constructor(client: EvolveClient, payload: Payload) {
		const guild_member = payload.d;
		client.emitEvent(EVENTS.GUILD_MEMBER_ADD, new GuildMember(guild_member));
	}
}
