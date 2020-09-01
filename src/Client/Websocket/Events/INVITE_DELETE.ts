
import { EvolveClient, EVENTS, Payload, Invite } from "../../..";

export default class {
	constructor(client: EvolveClient, payload: Payload) {
		const invite = new Invite(payload.d, client);
		client.emit(EVENTS.INVITE_DELETE, invite);
	}
}
