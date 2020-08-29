import { EvolveClient } from '../Client/EvolveClient';
import { Payload } from '../Interfaces/Interfaces';
import { EVENTS } from '../Constants/Events';
import { GuildMember } from '../Structures/Guild/GuildMember';

export default class {
	constructor(client: EvolveClient, payload: Payload, shard: number) {
		const { channel_id, guild_id, user_id, timestamp, member } = payload.d
		client.emit(EVENTS.TYPING_START, client.channels.get(channel_id), client.guilds.get(guild_id), client.users.get(user_id), timestamp, new GuildMember(member));
	}
}
