import { BaseEvent } from "./BaseEvent";
import { EvolveClient } from "../EvolveClient";
import { GuildMember } from "../../Structures/Guild/GuildMember";
import { Guild } from "../../Structures/Guild/Guild";
import { User } from "../../Structures/User/User";

export class GuildMemberEvent extends BaseEvent {
	constructor(
		client: EvolveClient,
    public member: GuildMember | User,
    public guild: Guild,
    shard: number
	) {
		super(shard, client);

		if(member instanceof GuildMember) {
			this.member = new (this.client.structures.get("GuildMember"))(member.data);
		} else if(member instanceof User) {
			this.member = new (this.client.structures.get("User"))(member.data);
		}
	}
}
