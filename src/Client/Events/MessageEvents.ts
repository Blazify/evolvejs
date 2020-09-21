import { BaseEvent } from "./BaseEvent";
import { EvolveClient } from "../EvolveClient";
import { Message } from "../../Structures/Message/Message";
import { Objex } from "@evolvejs/objex";
import { Guild } from "../../Structures/Guild/Guild";
import { Channel } from "../../Structures/Channel/Channel";
import { ChannelTypes } from "../../Utils/Constants";
import { TextChannel } from "../../Structures/Channel/TextChannel";

export class MessageEvents extends BaseEvent {
	constructor(
		client: EvolveClient,
    public message: Message | Objex<string, Message | undefined> | undefined,
    public guild: Guild | undefined,
    public channel: TextChannel | undefined,
    shard: number
	) {
		super(shard, client);
		if (guild)
			this.guild = new (this.client.structures.get("Guild"))(
				guild.data,
				client
			);
		if (channel)
			this.channel = new (this.client.structures.get("TextChannel"))(
				channel.data,
				client
			);
		if (message) {
			if (message instanceof Message) {
				(this.client.structures.get("Message")).handle(
					message.data,
					client
				).then((message: Message) => {
					return message;
				}).then((message: Message) => {
					this.message = message;
				});
			} else if (message instanceof Objex) {
				for (const [k, v] of message) {
					if (!v) return;
					message.delete(k);
					(async() => {
						message.set(
							k,
							await (this.client.structures.get("Message")).handle(v.data, client)
						);
					});
				}
			}
		}
	}
}
