
import { EvolveClient, EVENTS, Payload, User } from "../../..";

export default class {
	constructor(client: EvolveClient, payload: Payload) {
		client.emitEvent(EVENTS.USER_UPDATE, new User(payload.d));
	}
}
