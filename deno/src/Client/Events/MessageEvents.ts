import { BaseEvent } from "./BaseEvent.ts";
import { EvolveClient } from "../EvolveClient.ts";
import { Message } from "../../Structures/Message/Message.ts";
import { Objex } from "@evolvejs/objex.ts";
import { Guild } from "../../Structures/Guild/Guild.ts";
import { TextChannel } from "../../Structures/Channel/TextChannel.ts";

export class MessageEvents<
	K = Message | Objex<string, Message>
> extends BaseEvent {
	constructor(client: EvolveClient, public message: K, shard: number) {
		super(shard, client);
	}
}
