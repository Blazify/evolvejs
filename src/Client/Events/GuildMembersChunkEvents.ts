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
	}
}
