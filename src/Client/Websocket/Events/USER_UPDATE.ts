
import { EvolveClient, EVENTS, Payload, User } from "../../..";

export default class {
	constructor(client: EvolveClient, payload: Payload) {
		client.emit(EVENTS.USER_UPDATE, new User(payload.d));
	}
}
