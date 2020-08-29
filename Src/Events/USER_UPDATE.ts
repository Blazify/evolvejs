import { EvolveClient } from '../Client/EvolveClient';
import { Payload } from '../Interfaces/Interfaces';
import { EVENTS } from '../Constants/Events';
import { User } from '../Structures/User/User';

export default class {
	constructor(client: EvolveClient, payload: Payload, shard: number) {
		client.emit(EVENTS.USER_UPDATE, new User(payload.d));
	}
}
