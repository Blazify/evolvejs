import { BaseEvent } from "./BaseEvent.ts";
import { User } from "../../Structures/User/User.ts";
import { Guild } from "../../Structures/Guild/Guild.ts";
import { EvolveClient } from "../EvolveClient.ts";

export class GuildBanEvents extends BaseEvent {
	constructor(
		client: EvolveClient,
    public user: User,
    public guild: Guild,
    shard: number
	) {
		super(shard, client);
		this.guild = new (this.client.structures.get("Guild"))(guild.data, client);
		this.user = new (this.client.structures.get("User"))(user.data);
	}
}
