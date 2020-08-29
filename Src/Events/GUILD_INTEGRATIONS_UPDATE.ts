import { EvolveClient } from '../Client/EvolveClient';
import { Payload } from '../Interfaces/Interfaces';
import { EVENTS } from '../Constants/Events';

export default class {
	constructor(client: EvolveClient, payload: Payload, shard: number) {
		(async() => {
			let guild = await client.api.getGuild(payload.d.guild)
			client.emit(EVENTS.GUILD_INTEGRATIONS_UPDATE, guild)
		});
	}
}
