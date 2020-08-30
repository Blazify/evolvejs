
import { Payload } from "../../../Interfaces/Interfaces";
import { EvolveClient, EVENTS } from "../../..";
import { Message } from "../../../Structures/Message/Message";

export default class {
	constructor(client: EvolveClient, payload: Payload) {
		const message = new Message(payload.d, client);
		client.emitEvent(EVENTS.MESSAGE_UPDATE, message);
	}
}
