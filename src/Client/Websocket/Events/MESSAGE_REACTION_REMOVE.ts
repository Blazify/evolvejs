
import { EvolveClient, EVENTS, Payload } from "../../..";

export default class {
	constructor(client: EvolveClient, payload: Payload) {
		const { user_id, channel_id, message_id, guild_id, emoji } = payload.d;

		const user = client.users.get(user_id);
		const channel = client.channels.get(channel_id);
		const message = client.messages.get(message_id);
		const guild = client.guilds.get(guild_id);
		const nEmoji = client.emojis.get(emoji.id);
		client.emitEvent(EVENTS.MESSAGE_REACTION_REMOVE, nEmoji, message, user, channel, guild);
	}
}
