import {
	EvolveClient,
	EVENTS,
	Payload,
	GuildMember,
	PresenceUpdate,
} from "../../../mod.ts";
import { GuildMembersChunkUpdate } from "../../Events/GuildMembersChunkEvents.ts";

export default class {
	constructor(client: EvolveClient, payload: Payload, shard: number) {
		(async () => {
			const {
				members,
				chunk_index,
				chunk_count,
				not_found,
				presences,
				nonce,
			} = payload.d;
			const memberObjex: Map<string, GuildMember> = new Map();
			for (const member of members) {
				memberObjex.set(member.user.id, new GuildMember(member));
			}

			const presenceObjex: Map<string, PresenceUpdate> = new Map();
			for (const presence of presences) {
				presenceObjex.set(
					presence.user.id,
					new PresenceUpdate(presence, client)
				);
			}

			client.emit(
				EVENTS.GUILD_MEMBERS_CHUNK,
				new GuildMembersChunkUpdate(
					client,
					memberObjex,
					presenceObjex,
					[chunk_index, chunk_count],
					not_found,
					nonce,
					shard
				)
			);
		})();
	}
}
