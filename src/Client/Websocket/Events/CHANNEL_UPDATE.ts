
import { Payload } from '../../../Interfaces/Interfaces';
import { EvolveClient, EVENTS } from '../../..';

export default class {
	constructor(client: EvolveClient, payload: Payload, shard: number) {
		(async() => {
			let channel = await client.api.getChannel(payload.d.channel.id)
		client.emit(EVENTS.CHANNEL_UPDATE, channel);
	})
	}
}
