import { EvolveClient, EVENTS } from '..';
import { Payload } from '../Interfaces/Interfaces';

export default class {
	constructor(client: EvolveClient, payload: Payload, shard: number) {
		client.api.getChannel(payload.d.id).then(o =>
		client.emit(EVENTS.CHANNEL_CREATE, o)
	);
	}
}
