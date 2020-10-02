import { BaseEvent } from "./BaseEvent.ts";
import { EvolveClient } from "../EvolveClient.ts";
import { GuildMember } from "../../Structures/Guild/GuildMember.ts";
import { Guild } from "../../Structures/Guild/Guild.ts";
import { User } from "../../Structures/User/User.ts";

export class GuildMemberEvent extends BaseEvent {
	constructor(
		client: EvolveClient,
 public member: GuildMember | User,
 public guild: Guild,
 shard: number
	) {
		super(shard, client);

		if (member instanceof GuildMember) {
			this.member = new (this.client.structures.get("GuildMember"))(
				member.data
			);
		} else if (member instanceof User) {
			this.member = new (this.client.structures.get("User"))(member.data);
		}
	}
}
