import { EvolveClient, EVENTS, Payload, Message } from "../../..";

export default class {
	constructor(client: EvolveClient, payload: Payload, shard: number) {
		let message: Message;
		async () => {
			message = new Message(payload.d, client);
			client.emit(EVENTS.MESSAGE_UPDATE, message, shard);
		};
	}
}
