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
		if(guild) this.guild = new (this.client.structures.get("Guild"))(guild.data, client);
		if(channel) this.channel = new (this.client.structures.get("TextChannel"))(channel.data, client);
		if(message) {
			if(message instanceof Message) {
				this.message = new (this.client.structures.get("Message"))(message.data, client);
			} else if(message instanceof Objex) {
				for(const [k, v] of message) {
					if(!v) return;
					message.delete(k);
					message.set(k, new (this.client.structures.get("Message"))(v.data, client));
				}
			}
		}
	}
}
