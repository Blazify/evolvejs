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

		this.guild = new (this.client.structures.get("Guild"))(guild.data, client);
		for(const [k, v] of emoji) {
			this.emoji.delete(k);

			this.emoji.set(k, new (this.client.structures.get("Emoji"))(v.data));
		}
	}
}
