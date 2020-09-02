
import { EvolveClient, EVENTS, Payload } from "../../..";

export default class {
	constructor(client: EvolveClient, payload: Payload) {
		client.emit(EVENTS.VOICE_SERVER_UPDATE, payload);
	}
}
