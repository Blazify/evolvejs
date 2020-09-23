import { EvolveClient, EVENTS, Payload, Message } from "../../../mod.ts";
import { MessageEvents } from "../../Events/MessageEvents.ts";

export default class {
	constructor(client: EvolveClient, payload: Payload, shard: number) {
		let message: Message;
		async () => {
			message = await Message.handle(payload.d, client);
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
