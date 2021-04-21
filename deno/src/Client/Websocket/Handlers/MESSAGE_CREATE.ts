import { EvolveClient, EVENTS, Payload, Message } from "../../../mod.ts";
import { IGuild } from "../../../Interfaces/GuildOptions.ts";
import { ITextChannel } from "../../../Interfaces/TextChannelOptions.ts";
import { TextChannel } from "../../../Structures/Channel/TextChannel.ts";
import { Guild } from "../../../Structures/Guild/Guild.ts";
import { Endpoints } from "../../../Utils/Endpoints.ts";
import { MessageEvents } from "../../Events/MessageEvents.ts";

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
