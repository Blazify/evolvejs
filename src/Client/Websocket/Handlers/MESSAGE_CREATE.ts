import { EvolveClient, EVENTS, Payload, Message } from "../../mod.ts";
import { MessageEvents } from "../../Events/MessageEvents.ts";

export default class {
	constructor(client: EvolveClient, payload: Payload, shard: number) {
		(async () => {
			const message = await Message.handle(payload.d, client);
			if (client.options.enableMessageCache) {
				client.messages.set(message.id, message);
			}

			client.emit(
				EVENTS.MESSAGE_CREATE,
				new MessageEvents(
					client,
					message,
					message.guild,
					message.channel,
					shard
				)
			);
		})();
	}
}
