import { BaseEvent } from "./BaseEvent";
import { EvolveClient } from "../EvolveClient";
import { Message } from "../../Structures/Message/Message";
import { Objex } from "@evolvejs/objex";
import { Guild } from "../../Structures/Guild/Guild";
import { Channel } from "../../Structures/Channel/Channel";

export class MessageEvents extends BaseEvent {
	constructor(
		client: EvolveClient,
    public message: Message | Objex<string, Message | undefined> | undefined,
    public guild: Guild | undefined,
    public channel: Channel | undefined,
    shard: number
	) {
		super(shard, client);
	}
}
