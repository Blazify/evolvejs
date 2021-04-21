import { EvolveClient, EVENTS, Payload, Channel } from "../../../mod.ts";
import { ChannelResolver } from "../../../Utils/Constants.ts";
import { Endpoints } from "../../../Utils/Endpoints.ts";
import { ChannelEvents } from "../../Events/ChannelEvents.ts";

export default class {
 constructor(client: EvolveClient, payload: Payload, shard: number) {
 (async () => {
 const channel = await client.rest
 .endpoint(Endpoints.CHANNEL)
 .get<any>(payload.d.channel.id);
 if (client.options.enableChannelCache)
 client.channels.set(
 channel.id,
 new ChannelResolver[channel.type](channel, client)
 );
 client.emit(
 EVENTS.CHANNEL_UPDATE,
 new ChannelEvents(client, channel, shard)
 );
 })();
 }
}
