import { BaseEvent } from "./BaseEvent.ts";
import { EvolveClient } from "../EvolveClient.ts";
import { Guild } from "../../Structures/Guild/Guild.ts";

export class GuildEvents extends BaseEvent {
	constructor(client: EvolveClient, public guild: Guild, shard: number) {
		super(shard, client);

		this.guild = new (this.client.structures.get("Guild"))(guild.data, client);
	}
}
