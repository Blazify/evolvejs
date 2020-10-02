import { BaseEvent } from "./BaseEvent.ts";
import { EvolveClient } from "../EvolveClient.ts";
import { Emoji } from "../../Structures/Guild/Emoji.ts";
import { Guild } from "../../Structures/Guild/Guild.ts";
import { Objex } from "@evolvejs/objex.ts";

export class GuildEmojiEvents extends BaseEvent {
	constructor(
		client: EvolveClient,
 public emoji: Objex<string | null, Emoji>,
 public guild: Guild,
 shard: number
	) {
		super(shard, client);

		this.guild = new (this.client.structures.get("Guild"))(guild.data, client);
		for (const [k, v] of emoji) {
			this.emoji.delete(k);

			this.emoji.set(k, new (this.client.structures.get("Emoji"))(v.data));
		}
	}
}
