import { BaseEvent } from "./BaseEvent";
import { EvolveClient } from "../EvolveClient";
import { Emoji } from "../../Structures/Guild/Emoji";
import { Guild } from "../../Structures/Guild/Guild";
import { Objex } from "@evolvejs/objex";

export class GuildEmojiEvents extends BaseEvent {
	constructor(
		client: EvolveClient,
    public emoji: Objex<string | null, Emoji>,
    public guild: Guild,
    shard: number
	) {
		super(shard, client);
	}
}
