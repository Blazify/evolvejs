import { Client } from '../Client/Client';
import { Payload } from '../Constants/Interfaces';
import { EVENTS } from '../Constants/Constants';

export default class {
	constructor(client: Client, payload: Payload) {
		client.emit(EVENTS.GUILD_BAN_ADD, payload.d);
	}
}
