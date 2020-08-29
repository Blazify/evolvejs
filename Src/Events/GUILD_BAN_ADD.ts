import { EvolveClient } from '../Client/EvolveClient';
import { Payload } from '../Interfaces/Interfaces';
import { EVENTS } from '../Constants/Events';
import { User } from '../Structures/User/User';


export default class {
	constructor(client: EvolveClient, payload: Payload, shard: number) {
		(async() => {
			let { guild_id, user } = payload.d
			 let guild = await client.api.getGuild(guild_id)
			 user = new User(user)
			client.emit(EVENTS.GUILD_BAN_ADD, guild, user)
		})
	}
}
