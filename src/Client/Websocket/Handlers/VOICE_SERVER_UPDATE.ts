import { EvolveClient, EVENTS, Payload } from "../../../mod.ts";

export default class {
	constructor(client: EvolveClient, payload: Payload, shard: number) {
		client.emit(EVENTS.VOICE_SERVER_UPDATE, payload, shard);
	}
}
