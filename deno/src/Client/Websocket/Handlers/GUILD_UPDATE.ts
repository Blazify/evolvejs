import { EvolveClient, EVENTS, Payload, Guild } from "../../../mod.ts";
import { GuildEvents } from "../../Events/GuildEvents.ts";

export default class {
 constructor(client: EvolveClient, payload: Payload, shard: number) {
 let guild = payload.d;
 guild = new Guild(guild, client);
 if (client.options.enableGuildCache) client.guilds.set(guild.id, guild);
 client.emit(EVENTS.GUILD_UPDATE, new GuildEvents(client, guild, shard));
 }
}