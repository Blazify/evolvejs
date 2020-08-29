
import { Payload } from '../Interfaces/Interfaces';
import { EvolveClient, EVENTS } from '..';

export default class {
	constructor(client: EvolveClient, payload: Payload, shard: number) {
		const { user_id, channel_id, message_id, guild_id, emoji } = payload.d

		let user = client.users.get(user_id)
		let channel = client.channels.get(channel_id)
		let message = client.messages.get(message_id)
		let guild = client.guilds.get(guild_id)
		let nEmoji = client.emojis.get(emoji.id)
		client.emit(EVENTS.MESSAGE_REACTION_REMOVE, nEmoji, message, user, channel, guild)
	}
}
