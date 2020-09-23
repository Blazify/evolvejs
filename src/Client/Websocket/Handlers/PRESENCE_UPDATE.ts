import { EvolveClient, EVENTS, Payload, PresenceUpdate } from "../../../mod.ts";

export default class {
	constructor(client: EvolveClient, payload: Payload, shard: number) {
		const presence = new PresenceUpdate(payload.d, client);
		client.emit(EVENTS.PRESENCE_UPDATE, presence, shard);
	}
}
