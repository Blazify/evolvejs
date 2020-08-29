
import { Payload } from '../Interfaces/Interfaces';
import { EvolveClient, EVENTS } from '..';
import PresenceUpdate from '../Structures/User/PresenceUpdate';

export default class {
	constructor(client: EvolveClient, payload: Payload, shard: number) {
		let presence = new PresenceUpdate(payload.d, client)
		client.emit(EVENTS.PRESENCE_UPDATE, (payload.d, shard));
	}
}
