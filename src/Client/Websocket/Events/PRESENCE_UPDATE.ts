
import { EvolveClient, EVENTS, Payload, PresenceUpdate } from "../../..";

export default class {
	constructor(client: EvolveClient, payload: Payload) {
		const presence = new PresenceUpdate(payload.d, client);
		client.emit(EVENTS.PRESENCE_UPDATE, presence);
	}
}
