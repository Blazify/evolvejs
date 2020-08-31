
import { EvolveClient, EVENTS, Payload, Message } from "../../..";

export default class {
	constructor(client: EvolveClient, payload: Payload) {
		const message = new Message(payload.d, client);
		client.emitEvent(EVENTS.MESSAGE_UPDATE, message);
	}
}
