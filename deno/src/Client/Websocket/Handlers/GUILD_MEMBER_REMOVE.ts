import { EvolveClient, EVENTS, Payload, User, Endpoints } from "../../../mod.ts";
import { IGuild } from "../../../Interfaces/GuildOptions.ts";
import { Guild } from "../../../Structures/Guild/Guild.ts";
import { GuildMemberEvent } from "../../Events/GuildMemberEvents.ts";

export default class {
 constructor(client: EvolveClient, payload: Payload, shard: number) {
 (async () => {
 const guild = await client.rest
 .endpoint(Endpoints.GUILD)
 .get<IGuild>(payload.d.guild_id);
 if (client.options.enableUsersCache)
 client.users.delete(payload.d.user.id);
 client.emit(
 EVENTS.GUILD_MEMBER_REMOVE,
 new GuildMemberEvent(
 client,
 new User(payload.d.user),
 new Guild(guild, client),
 shard
 )
 );
 })();
 }
}
