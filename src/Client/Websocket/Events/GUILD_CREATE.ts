
import { Payload } from "../../../Interfaces/Interfaces";
import { EvolveClient, EVENTS } from "../../..";
import { Guild } from "../../../Structures/Guild/Guild";

export default class {
	constructor(client: EvolveClient, payload: Payload) {
		const guild = payload.d;
		if(client.guilds.get(guild.id)) {
			return;
		} else {
			const newGuild = new Guild(guild, client);

			client.emitEvent(EVENTS.GUILD_CREATE, (newGuild));
		}
	}
}
