
import { EvolveClient, EVENTS, Payload } from "../../..";

export default class {
	constructor(client: EvolveClient, payload: Payload) {
		client.emit(EVENTS.VOICE_STATE_UPDATE, (payload.d));
	}
}
