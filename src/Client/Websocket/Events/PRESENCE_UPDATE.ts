
import { EvolveClient, EVENTS, Payload, PresenceUpdate } from "../../..";

export default class {
	constructor(client: EvolveClient, payload: Payload) {
		const presence = new PresenceUpdate(payload.d, client);
		client.emitEvent(EVENTS.PRESENCE_UPDATE, presence);
	}
}
