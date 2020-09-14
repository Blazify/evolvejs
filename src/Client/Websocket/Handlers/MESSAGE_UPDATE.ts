import { EvolveClient, EVENTS, Payload, Message } from "../../..";
import { MessageEvents } from "../../Events/MessageEvents";

export default class {
	constructor(client: EvolveClient, payload: Payload, shard: number) {
		let message: Message;
		async () => {
			message = new Message(payload.d, client);
			client.emit(
				EVENTS.MESSAGE_UPDATE,
				new MessageEvents(
					client,
					message,
					message.guild,
					message.channel,
					shard
				)
			);
		};
	}
}
