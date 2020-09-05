import { EvolveClient, EVENTS, Payload, Message } from "../../..";

export default class {
	constructor(client: EvolveClient, payload: Payload, shard: number) {
		(async () => {
			const message = new Message(payload.d, client);
			if (client.options.enableMessageCache) {
				client.messages.set(message.id, message);
			}

			client.emit(EVENTS.MESSAGE_CREATE, message, shard);
		})();
	}
}
