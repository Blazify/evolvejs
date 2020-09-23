import { EvolveClient, EVENTS, Payload } from "../../../mod.ts";
import { ChannelEvents } from "../../Events/ChannelEvents.ts";

export default class {
	constructor(client: EvolveClient, payload: Payload, shard: number) {
		(async () => {
			const o = await client.rest.getChannel(payload.d.id);
			client.emit(EVENTS.CHANNEL_DELETE, new ChannelEvents(client, o, shard));
		})();
	}
}
