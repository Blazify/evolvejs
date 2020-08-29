
import { Payload } from '../../../Interfaces/Interfaces';
import { EvolveClient, EVENTS } from '../../..';
import { Message } from '../../../Structures/Message/Message';

export default class {
	constructor(client: EvolveClient, payload: Payload, shard: number) {
		let message = new Message(payload.d.message, client)

		if(client.options.enableMessageCache) {
			client.messages.set(message.id, message)
		}

		client.emit(EVENTS.MESSAGE_CREATE, message, shard);
	}
}
