import { EvolveClient, EVENTS, Payload, Message } from "../../..";
import { IGuild } from "../../../Interfaces/GuildOptions";
import { ITextChannel } from "../../../Interfaces/TextChannelOptions";
import { TextChannel } from "../../../Structures/Channel/TextChannel";
import { Guild } from "../../../Structures/Guild/Guild";
import { Endpoints } from "../../../Utils/Endpoints";
import { MessageEvents } from "../../Events/MessageEvents";

export default class {
	constructor(
		private client: EvolveClient,
		private payload: Payload,
		private shard: number
	) {
		this._init();
	}

	public async _init(): Promise<void> {
		const message = new Message(this.payload.d, this.client);

		if (this.client.options.enableMessageCache)
			this.client.messages.set(message.id, message);

		this.client.emit(
			EVENTS.MESSAGE_CREATE,
			new MessageEvents<Message>(this.client, message, this.shard)
		);
	}
}
