import { EvolveClient, EVENTS, Payload, User } from "../../..";

export default class {
	constructor(client: EvolveClient, payload: Payload, shard: number) {
		client.emit(EVENTS.USER_UPDATE, new User(payload.d), shard);
	}
}
