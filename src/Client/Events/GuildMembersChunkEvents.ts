import { BaseEvent } from "./BaseEvent";
import { EvolveClient } from "../EvolveClient";
import { Objex } from "@evolvejs/objex";
import { GuildMember } from "../../Structures/Guild/GuildMember";
import { PresenceUpdate } from "../../Structures/User/PresenceUpdate";

export class GuildMembersChunkUpdate extends BaseEvent {
	constructor(
		client: EvolveClient,
    public members: Objex<string, GuildMember>,
    public presence: Objex<string, PresenceUpdate>,
    public chunk: Array<number>,
    public notFound: boolean,
    public nonce: string,
    shard: number
	) {
		super(shard, client);
    
		for(const [k, v] of members) {
			this.members.delete(k);

			this.members.set(k, new (this.client.structures.get("GuildMember"))(v.data));
		}

		for(const [k, v] of presence) {
			this.presence.delete(k);

			this.presence.set(k, new (this.client.structures.get("PresenceUpdate"))(v.data, client));
		}
	}
}
