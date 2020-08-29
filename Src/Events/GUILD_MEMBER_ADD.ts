import { EvolveClient } from '../Client/EvolveClient';
import { Payload } from '../Interfaces/Interfaces';
import { EVENTS } from '../Constants/Events';
import { GuildMember } from '../Structures/Guild/GuildMember';

export default class {
	constructor(client: EvolveClient, payload: Payload, shard: number) {
			const guild_member = payload.d
			client.emit(EVENTS.GUILD_MEMBER_ADD, new GuildMember(guild_member))
	}
}
