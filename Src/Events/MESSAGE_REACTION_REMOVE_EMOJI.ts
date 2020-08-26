import { EvolveClient } from '../Client/EvolveClient';
import { Payload } from '../Interfaces/Interfaces';
import { EVENTS } from '../Constants/Events';

export default class {
	constructor(client: EvolveClient, payload: Payload, shard: number) {
		client.emit(EVENTS.MESSAGE_REACTION_REMOVE_EMOJI, (payload.d, shard));
	}
}
