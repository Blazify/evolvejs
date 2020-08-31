
import { EvolveClient, EVENTS, Payload } from "../../..";

export default class {
	constructor(client: EvolveClient, payload: Payload) {
		client.emitEvent(EVENTS.WEBHOOKS_UPDATE, (payload.d));
	}
}
