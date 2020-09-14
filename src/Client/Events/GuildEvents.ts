import { BaseEvent } from "./BaseEvent";
import { EvolveClient } from "../EvolveClient";
import { Guild } from "../../Structures/Guild/Guild";

export class GuildEvents extends BaseEvent {
	constructor(client: EvolveClient, public guild: Guild, shard: number) {
		super(shard, client);

		this.guild = new (this.client.structures.get("Guild"))(guild.data, client);
	}
}
