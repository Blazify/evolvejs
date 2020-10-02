import { EvolveClient, EVENTS, Payload, Message } from "../../../mod.ts";
import { MessageEvents } from "../../Events/MessageEvents.ts";

export default class {
	constructor(
 private client: EvolveClient,
 private payload: Payload,
 private shard: number
	) {}

	public async _init(): Promise<void> {
		const message = await Message.handle(this.payload.d, this.client);

		if (this.client.options.enableMessageCache) {
			this.client.messages.set(message.id, message);
		}

		this.client.emit(
			EVENTS.MESSAGE_CREATE,
			new MessageEvents<Message>(
				this.client,
				message,
				message.guild,
				message.channel,
				this.shard
			)
		);
	}
}
