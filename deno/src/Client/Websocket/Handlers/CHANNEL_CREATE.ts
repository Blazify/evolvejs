import { EvolveClient, EVENTS, Payload } from "../../../mod.ts";
import { ChannelResolver } from "../../../Utils/Constants.ts";
import { Endpoints } from "../../../Utils/Endpoints.ts";
import { ChannelEvents } from "../../Events/ChannelEvents.ts";

export default class {
 constructor(client: EvolveClient, payload: Payload, shard: number) {
 (async () => {
 const o = await client.rest
 .endpoint(Endpoints.CHANNEL)
 .get<any>(payload.d.id);
 if (client.options.enableChannelCache)
 client.channels.set(o.id, new ChannelResolver[o.type](o, client));
 client.emit(
 EVENTS.CHANNEL_CREATE,
 new ChannelEvents(client, new ChannelResolver[o.type](o, client), shard)
 );
 })();
 }
}
