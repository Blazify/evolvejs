import { Client } from '../Client/Client';
import { Payload } from '../Interfaces/Payload';

export function handler(client: Client, payload: Payload) {
	client.emit('botJoin', payload.d);
}
