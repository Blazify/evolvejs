import { EvolveClient, EVENTS, Payload, Guild } from "../../../mod.ts";
import { GuildEvents } from "../../Events/GuildEvents.ts";

export default class {
 constructor(client: EvolveClient, payload: Payload, shard: number) {
 const guild = payload.d;
 if (client.guilds.has(guild.id)) {
 return;
 } else {
 const newGuild = new Guild(guild, client);
 if (client.options.enableGuildCache)
 client.guilds.set(newGuild.id, newGuild);

 client.emit(
 EVENTS.GUILD_CREATE,
 new GuildEvents(client, newGuild, shard)
 );
 }
 }
}
