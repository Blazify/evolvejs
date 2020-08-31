
import { EvolveClient, EVENTS, Payload, GuildMember, PresenceUpdate } from "../../..";
import { Objex } from "@evolvejs/objex";

export default class {
	constructor(client: EvolveClient, payload: Payload) {
		(async() => {
			const { guild_id, members, chunk_index, chunk_count, not_found, presences, nonce } = payload.d;
			const guild = await client.api.getGuild(guild_id);
			const memberObjex: Objex<string, GuildMember> = new Objex();
			for(const member of members) {
				memberObjex.set(member.user.id, new GuildMember(member));
			}

			const presenceObjex: Objex<string, PresenceUpdate> = new Objex();
			for(const presence of presences) {
				presenceObjex.set(presence.user.id, new PresenceUpdate(presence, client));
			}

			client.emitEvent(EVENTS.GUILD_MEMBERS_CHUNK, guild, memberObjex, presenceObjex, [chunk_index, chunk_count], not_found, nonce);
		})();
	}
}
/*
guild_id	snowflake	the id of the guild
members	array of guild member objects	set of guild members
chunk_index	integer	the chunk index in the expected chunks for this response (0 <= chunk_index < chunk_count)
chunk_count	integer	the total number of expected chunks for this response
not_found?	array	if passing an invalid id to REQUEST_GUILD_MEMBERS, it will be returned here
presences?	array of presence objects	if passing true to REQUEST_GUILD_MEMBERS, presences of the returned members will be here
nonce?

*/
