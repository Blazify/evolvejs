
import { Payload } from "../../../Interfaces/Interfaces";
import { EvolveClient, EVENTS } from "../../..";
import { User } from "../../../Structures/User/User";

export default class {
	constructor(client: EvolveClient, payload: Payload) {
		(async() => {
			const guild = await client.api.getGuild(payload.d.guild_id);
			client.emit(EVENTS.GUILD_MEMBER_REMOVE, guild, new User(payload.d.user));
		});
	}
}
