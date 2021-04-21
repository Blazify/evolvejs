import {
 EvolveClient,
 EVENTS,
 Payload,
 User,
 Endpoints,
 Guild,
} from "../../../mod.ts";
import { IGuild } from "../../../Interfaces/GuildOptions.ts";
import { GuildBanEvents } from "../../Events/GuildBanEvents.ts";

export default class {
 constructor(client: EvolveClient, payload: Payload, shard: number) {
 (async () => {
 // eslint-disable-next-line prefer-const
 let { guild_id, user } = payload.d;
 const guild = new Guild(
 await client.rest.endpoint(Endpoints.GUILD).get<IGuild>(guild_id),
 client
 );
 user = new User(user);
 client.emit(
 EVENTS.GUILD_BAN_ADD,
 new GuildBanEvents(client, user, guild, shard)
 );
 })();
 }
}
