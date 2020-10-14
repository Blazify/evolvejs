import { EvolveClient, EVENTS, Payload, Channel } from "../../..";
import { ChannelResolver } from "../../../Utils/Constants";
import { Endpoints } from "../../../Utils/Endpoints";
import { ChannelEvents } from "../../Events/ChannelEvents";

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
