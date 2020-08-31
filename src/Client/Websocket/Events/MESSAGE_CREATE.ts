
import { EvolveClient, EVENTS, Payload, Message } from "../../..";

export default class {
	constructor(client: EvolveClient, payload: Payload) {
		const message = new Message(payload.d.message, client);

		if(client.options.enableMessageCache) {
			client.messages.set(message.id, message);
		}

		client.emitEvent(EVENTS.MESSAGE_CREATE, message);
	}
}
