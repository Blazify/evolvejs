import { BaseEvent } from "./BaseEvent";
import { EvolveClient } from "../EvolveClient";
import { Message } from "../../Structures/Message/Message";
import { Objex } from "@evolvejs/objex";
import { Guild } from "../../Structures/Guild/Guild";
import { TextChannel } from "../../Structures/Channel/TextChannel";

export class MessageEvents<
	K = Message | Objex<string, Message>
> extends BaseEvent {
	constructor(client: EvolveClient, public message: K, shard: number) {
		super(shard, client);
	}
}
