
import { EvolveClient, EVENTS, Payload, Invite } from "../../..";

export default class {
	constructor(client: EvolveClient, payload: Payload) {
		const invite = new Invite(payload.d, client);
		client.emitEvent(EVENTS.INVITE_DELETE, invite);
	}
}
