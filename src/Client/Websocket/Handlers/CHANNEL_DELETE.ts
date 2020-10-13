import { EvolveClient, EVENTS, Payload } from "../../..";
import { ChannelEvents } from "../../Events/ChannelEvents";

export default class {
  constructor(client: EvolveClient, payload: Payload, shard: number) {
    (async () => {
      const o = client.channels.get(payload.d.id);
      if (client.options.enableChannelCache)
        client.channels.delete(o!!.id, true);
      client.emit(EVENTS.CHANNEL_DELETE, new ChannelEvents(client, o!!, shard));
    })();
  }
}
