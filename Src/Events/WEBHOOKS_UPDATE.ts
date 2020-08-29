
import { Payload } from '../Interfaces/Interfaces';
import { EvolveClient, EVENTS } from '..';

export default class {
	constructor(client: EvolveClient, payload: Payload, shard: number) {
		client.emit(EVENTS.WEBHOOKS_UPDATE, (payload.d, shard));
	}
}
