
import { Payload } from "../../../Interfaces/Interfaces";
import { EvolveClient, EVENTS } from "../../..";
import { Role } from "../../../Structures/Guild/Role";

export default class {
	constructor(client: EvolveClient, payload: Payload) {
		(async() => {
			const { guild_id, role } = payload.d;
			const guild = await client.api.getGuild(guild_id);

			client.emitEvent(EVENTS.GUILD_ROLE_UPDATE, new Role(role), guild);
		});
	}
}
