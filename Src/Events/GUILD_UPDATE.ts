import { EvolveClient } from '../Client/EvolveClient';
import { Payload } from '../Interfaces/Interfaces';
import { EVENTS } from '../Constants/Events';
import { Guild } from '../Structures/Guild/Guild';

export default class {
	constructor(client: EvolveClient, payload: Payload, shard: number) {
		let guild = payload.d
		guild = new Guild(guild, client)
		client.emit(EVENTS.GUILD_UPDATE, guild);
	}
}
