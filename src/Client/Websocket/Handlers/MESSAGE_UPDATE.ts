import {
	EvolveClient,
	EVENTS,
	Payload,
	Message,
	Guild,
	Endpoints,
	IGuild,
	ITextChannel,
	TextChannel,
} from "../../..";
import { MessageEvents } from "../../Events/MessageEvents";

export default class {
	constructor(client: EvolveClient, payload: Payload, shard: number) {
		let message: Message;
		async () => {
			message = new Message(payload.d, client);
			if (client.options.enableMessageCache)
				client.messages.set(message.id, message);
			client.emit(
				EVENTS.MESSAGE_UPDATE,
				new MessageEvents<Message>(client, message, shard)
			);
		};
	}
}
