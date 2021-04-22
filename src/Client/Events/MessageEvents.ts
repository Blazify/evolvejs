import { BaseEvent } from "./BaseEvent";
import { EvolveClient } from "../EvolveClient";
import { Message } from "../../Structures/Message/Message";
import { Objex } from "@evolvejs/objex";
import { Guild } from "../../Structures/Guild/Guild";
import { TextChannel } from "../../Structures/Channel/TextChannel";

export class MessageEvents<
	K = Message | Objex<string, Message>
	> extends BaseEvent {
	public message!: K;
	constructor(client: EvolveClient,message: K, shard: number) {
		super(shard, client);
		if(message instanceof Message) this.message = new (this.client.structures.get("Message"))(message.data, client) as unknown as K
		else if (message instanceof Objex) {
			for (const [k,v] of message) {
				message.set(k, new (this.client.structures.get("Message"))(v.data, client))
			}
			this.message = message as K;
		}
	}
}