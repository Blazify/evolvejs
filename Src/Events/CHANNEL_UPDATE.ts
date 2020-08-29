import { EvolveClient } from '../Client/EvolveClient';
import { Payload } from '../Interfaces/Interfaces';
import { EVENTS } from '../Constants/Events';

export default class {
	constructor(client: EvolveClient, payload: Payload, shard: number) {
		(async() => {
			let channel = await client.api.getChannel(payload.d.channel.id)
		client.emit(EVENTS.CHANNEL_UPDATE, channel);
	})
	}
}
