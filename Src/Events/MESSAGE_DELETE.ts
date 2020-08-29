import { EvolveClient } from '../Client/EvolveClient';
import { Payload } from '../Interfaces/Interfaces';
import { EVENTS } from '../Constants/Events';

export default class {
	constructor(client: EvolveClient, payload: Payload, shard: number) {
		const { id, guild_id, channel_id } = payload.d
		let message = client.messages.get(id)
		let guild = client.guilds.get(guild_id)
		let channel = client.channels.get(channel_id)
		client.emit(EVENTS.MESSAGE_DELETE, message, guild, channel);
	}
}
