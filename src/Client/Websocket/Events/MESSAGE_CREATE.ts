
import { Payload } from "../../../Interfaces/Interfaces";
import { EvolveClient, EVENTS } from "../../..";
import { Message } from "../../../Structures/Message/Message";

export default class {
	constructor(client: EvolveClient, payload: Payload) {
		const message = new Message(payload.d.message, client);

		if(client.options.enableMessageCache) {
			client.messages.set(message.id, message);
		}

		client.emit(EVENTS.MESSAGE_CREATE, message);
	}
}
