import { EvolveClient, EVENTS, Payload } from "../../mod.ts";
import { ChannelEvents } from "../../Events/ChannelEvents.ts";

export default class {
	constructor(client: EvolveClient, payload: Payload, shard: number) {
		(async () => {
			const channel = await client.rest.getChannel(payload.d.channel.id);
			client.emit(
				EVENTS.CHANNEL_UPDATE,
				new ChannelEvents(client, channel, shard)
			);
		})();
	}
}
