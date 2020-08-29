import { EvolveClient } from '../Client/EvolveClient';
import { Payload } from '../Interfaces/Interfaces';
import { EVENTS } from '../Constants/Events';
import { User } from '../Structures/User/User';

export default class {
	constructor(client: EvolveClient, payload: Payload, shard: number) {
		(async() => {
			let guild = await client.api.getGuild(payload.d.guild_id)
			client.emit(EVENTS.GUILD_MEMBER_REMOVE, guild, new User(payload.d.user))
		});
	}
}
