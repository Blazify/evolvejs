import { EvolveClient, EVENTS, Payload } from "../../..";
import { ChannelEvents } from "../../Events/ChannelEvents";

export default class {
	constructor(client: EvolveClient, payload: Payload, shard: number) {
		client.api
			.getChannel(payload.d.id)
			.then((o) =>
				client.emit(EVENTS.CHANNEL_CREATE, new ChannelEvents(client, o, shard))
			);
	}
}
