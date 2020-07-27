import { Client } from '../Client/Client';
import { Payload } from '../Interfaces/Interfaces';
import { EVENTS } from '../Constants/Events';

export default class {
	constructor(client: Client, payload: Payload) {
		client.emit(EVENTS.GUILD_BAN_REMOVE, payload.d);
	}
}
