import { BaseEvent } from "./BaseEvent";
import { User } from "../../Structures/User/User";
import { Guild } from "../../Structures/Guild/Guild";
import { EvolveClient } from "../EvolveClient";

export class GuildBanEvents extends BaseEvent {
	constructor(
		client: EvolveClient,
    public user: User,
    public guild: Guild,
    shard: number
	) {
		super(shard, client);
		this.guild = new (this.client.structures.get("Guild"))(guild.data, client)
		this.user = new (this.client.structures.get("User"))(user.data)
	}
}
