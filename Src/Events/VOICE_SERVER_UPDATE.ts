import { Client } from '../Client/Client';
import { Payload } from '../Interfaces/Interfaces';
import { EVENTS } from '../Constants/Events';

export default class {
	constructor(client: Client, payload: Payload) {
		client.emit(EVENTS.VOICE_SERVER_UPDATE, payload.d);
	}
}
