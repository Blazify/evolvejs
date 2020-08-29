
import { Payload } from '../../../Interfaces/Interfaces';
import { EvolveClient, EVENTS } from '../../..';
import { Role } from '../../../Structures/Guild/Role';

export default class {
	constructor(client: EvolveClient, payload: Payload, shard: number) {
		(async() => {
			const { guild_id, role } = payload.d
			const guild = await client.api.getGuild(guild_id)

			client.emit(EVENTS.GUILD_ROLE_CREATE, new Role(role), guild)
		});
	}
}
