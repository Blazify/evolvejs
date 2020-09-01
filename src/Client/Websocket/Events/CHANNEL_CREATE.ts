import { EvolveClient, EVENTS, Payload } from "../../..";

export default class {
	constructor(client: EvolveClient, payload: Payload) {
		client.api.getChannel(payload.d.id).then(o =>
			client.emit(EVENTS.CHANNEL_CREATE, o)
		);
	}
}
