import { EvolveClient, EVENTS, Payload } from "../../..";
import { ChannelEvents } from "../../Events/ChannelEvents";

export default class {
	constructor(client: EvolveClient, payload: Payload, shard: number) {
		const { channel_id } = payload.d(async () => {
			const channel = await client.api.getChannel(channel_id);
			client.emit(
				EVENTS.CHANNEL_PINS_UPDATE,
				new ChannelEvents(client, channel, shard)
			);
		});
	}
}
