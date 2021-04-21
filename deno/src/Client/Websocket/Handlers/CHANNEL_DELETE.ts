import { EvolveClient, EVENTS, Payload } from "../../../mod.ts";
import { ChannelEvents } from "../../Events/ChannelEvents.ts";

export default class {
	constructor(client: EvolveClient, payload: Payload, shard: number) {
		(async () => {
			const o = await client.channels.resolve(payload.d.id);
			if (client.options.enableChannelCache)
				client.channels.delete(o!!.id, true);
			client.emit(EVENTS.CHANNEL_DELETE, new ChannelEvents(client, o!!, shard));
		})();
	}
}
