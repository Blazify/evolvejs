import { EvolveClient, EVENTS, Payload, Endpoints } from "../../../mod.ts";
import { IGuild } from "../../../Interfaces/GuildOptions.ts";
import { Guild } from "../../../Structures/Guild/Guild.ts";
import { GuildIntegrationEvents } from "../../Events/GuildIntegrationEvents.ts";

export default class {
 constructor(client: EvolveClient, payload: Payload, shard: number) {
 (async () => {
 const guild = new Guild(
 await client.rest
 .endpoint(Endpoints.GUILD)
 .get<IGuild>(payload.d.guild),
 client
 );
 client.emit(
 EVENTS.GUILD_INTEGRATIONS_UPDATE,
 new GuildIntegrationEvents(client, guild, shard)
 );
 })();
 }
}
