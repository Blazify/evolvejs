import {
 EvolveClient,
 EVENTS,
 Payload,
 GuildMember,
 User,
 Endpoints,
} from "../../../mod.ts";
import { IGuild } from "../../../Interfaces/GuildOptions.ts";
import { Guild } from "../../../Structures/Guild/Guild.ts";
import { GuildMemberEvent } from "../../Events/GuildMemberEvents.ts";
export default class {
 constructor(client: EvolveClient, payload: Payload, shard: number) {
 const { guild_id, roles, user, nick, joined_at, premium_since } = payload.d;
 const member = new GuildMember({
 user,
 nick,
 roles,
 joined_at,
 premium_since,
 deaf: false,
 mute: false,
 });
 if (client.options.enableUsersCache)
 client.users.set(member.user?.id as string, member.user as User);

 (async () => {
 const o = await client.rest
 .endpoint(Endpoints.GUILD)
 .get<IGuild>(guild_id);
 client.emit(
 EVENTS.GUILD_MEMBER_UPDATE,
 new GuildMemberEvent(client, member, new Guild(o, client), shard)
 );
 })();
 }
}
