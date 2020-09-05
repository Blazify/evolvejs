import { EvolveClient, EVENTS, Payload } from "../../..";

export default class {
	constructor(client: EvolveClient, payload: Payload, shard: number) {
		client.api
			.getChannel(payload.d.id)
			.then((o) => client.emit(EVENTS.CHANNEL_DELETE, o, shard));
	}
}
