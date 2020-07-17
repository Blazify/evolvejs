import { Client, Payload } from '..';

export default class {
	constructor(client: Client, payload: Payload) {
		client.emit('webhookRemove', payload.d);
	}
}
