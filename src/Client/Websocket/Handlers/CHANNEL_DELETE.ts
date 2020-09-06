import { EvolveClient, EVENTS, Payload } from "../../..";
import { ChannelEvents } from "../../Events/ChannelEvents";

export default class {
	constructor(client: EvolveClient, payload: Payload, shard: number) {
		(async() => {
			const o = await client.api.getChannel(payload.d.id);
			client.emit(EVENTS.CHANNEL_DELETE, new ChannelEvents(client, o, shard));
		})();
	}
}
