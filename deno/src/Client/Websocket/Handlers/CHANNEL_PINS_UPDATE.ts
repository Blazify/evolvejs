import { EvolveClient, EVENTS, Payload } from "../../../mod.ts";
import { ChannelResolver } from "../../../Utils/Constants.ts";
import { Endpoints } from "../../../Utils/Endpoints.ts";
import { ChannelEvents } from "../../Events/ChannelEvents.ts";

export default class {
 constructor(client: EvolveClient, payload: Payload, shard: number) {
 const { channel_id } = payload.d(async () => {
 const channel = await client.rest
 .endpoint(Endpoints.CHANNEL)
 .get<any>(channel_id);
 client.emit(
 EVENTS.CHANNEL_PINS_UPDATE,
 new ChannelEvents(
 client,
 new ChannelResolver[channel.type](channel, client),
 shard
 )
 );
 });
 }
}
