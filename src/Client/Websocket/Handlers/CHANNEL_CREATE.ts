import { EvolveClient, EVENTS, Payload } from "../../..";
import { ChannelResolver } from "../../../Utils/Constants";
import { Endpoints } from "../../../Utils/Endpoints";
import { ChannelEvents } from "../../Events/ChannelEvents";

export default class {
  constructor(client: EvolveClient, payload: Payload, shard: number) {
    (async () => {
      const o = await client.rest.get(Endpoints.CHANNEL).get<any>(payload.d.id);
      if (client.options.enableChannelCache)
        client.channels.set(o.id, new ChannelResolver[o.type](o, client));
      client.emit(
        EVENTS.CHANNEL_CREATE,
        new ChannelEvents(client, new ChannelResolver[o.type](o, client), shard)
      );
    })();
  }
}
