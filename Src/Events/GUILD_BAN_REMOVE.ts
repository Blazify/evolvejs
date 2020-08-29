
import { Payload } from '../Interfaces/Interfaces';
import { EvolveClient, EVENTS } from '..';
import { User } from '../Structures/User/User';

export default class {
	constructor(client: EvolveClient, payload: Payload, shard: number) {
		(async() => {
			let { guild_id, user } = payload.d
			 let guild = await client.api.getGuild(guild_id)
			 user = new User(user)
			 client.emit(EVENTS.GUILD_BAN_REMOVE, guild, user);
			})
	}
}
