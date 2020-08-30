
import { Payload } from "../../../Interfaces/Interfaces";
import { EvolveClient, EVENTS } from "../../..";
import { User } from "../../../Structures/User/User";


export default class {
	constructor(client: EvolveClient, payload: Payload) {
		(async() => {
			// eslint-disable-next-line prefer-const
			let { guild_id, user } = payload.d;
			const guild = await client.api.getGuild(guild_id);
			user = new User(user);
			client.emitEvent(EVENTS.GUILD_BAN_ADD, guild, user);
		});
	}
}
