
import { EvolveClient, EVENTS, Payload, Message } from "../../..";

export default class {
	constructor(client: EvolveClient, payload: Payload) {
		(async() => {
			const channel = await client.api.getTextChannel(payload.d.channel_id);
			const guild = await client.api.getGuild(payload.d.guild_id);
			const message = new Message(payload.d, channel, guild);
			if(client.options.enableMessageCache) {
				client.messages.set(message.id, message);
			}
	
			client.emit(EVENTS.MESSAGE_CREATE, message);
		})();
	}
}
