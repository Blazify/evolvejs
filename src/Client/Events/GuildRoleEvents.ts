import { BaseEvent } from "./BaseEvent.ts";
import { EvolveClient } from "../EvolveClient.ts";
import { Role } from "../../Structures/Guild/Role.ts";
import { Guild } from "../../Structures/Guild/Guild.ts";

export class GuildRoleEvents extends BaseEvent {
	constructor(
		client: EvolveClient,
    public role: Role | undefined,
    public guild: Guild,
    shard: number
	) {
		super(shard, client);

		if (role) this.role = new (this.client.structures.get("Role"))(role.data);
		this.guild = new (this.client.structures.get("Guild"))(guild.data, client);
	}
}
