import { EvolveClient, EVENTS, Payload } from "../../..";

export default class {
	constructor(client: EvolveClient, payload: Payload, shard: number) {
		(async () => {
			const channel = await client.api.getChannel(payload.d.channel.id);
			client.emit(EVENTS.CHANNEL_UPDATE, channel, shard);
		})();
	}
}
