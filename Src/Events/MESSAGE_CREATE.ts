import { EvolveClient } from '../Client/EvolveClient';
import { Payload } from '../Interfaces/Interfaces';
import { EVENTS } from '../Constants/Events';
import { Message } from '../Structures/Message/Message';

export default class {
	constructor(client: EvolveClient, payload: Payload, shard: Array<number>) {
		let message = new Message(payload.d, client)
		message.channel.send = async (content: string) => {
			return await client.api.sendMessage(content, message.channel.id);
		}

		message.channel.purge = async (time: number = 0) => {
			return await client.api.deleteMessage(message.id, message.channel.id, time)
		}

		if(client.options.enableMessageCache) {
			client.messages.set(message.id, message)
		}

		client.emit(EVENTS.MESSAGE_CREATE, message, shard);
	}
}
