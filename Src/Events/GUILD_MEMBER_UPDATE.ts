import { EvolveClient } from '../Client/EvolveClient';
import { Payload } from '../Interfaces/Interfaces';
import { EVENTS } from '../Constants/Events';

export default class {
	constructor(client: EvolveClient, payload: Payload) {
		client.emit(EVENTS.GUILD_MEMBER_UPDATE, payload.d);
	}
}
