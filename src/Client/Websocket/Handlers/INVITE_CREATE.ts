import { EvolveClient, EVENTS, Payload, Invite } from "../../mod.ts";

export default class {
	constructor(client: EvolveClient, payload: Payload, shard: number) {
		const invite = new Invite(payload.d, client);
		client.emit(EVENTS.INVITE_CREATE, invite, shard);
	}
}
