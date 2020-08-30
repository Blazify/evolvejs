
import { Payload } from "../../../Interfaces/Interfaces";
import { EvolveClient, EVENTS } from "../../..";

export default class {
	constructor(client: EvolveClient, payload: Payload) {
		const guild = payload.d;
		client.api.getGuild(guild.id).then(o => {
			client.emit(EVENTS.GUILD_DELETE, o);
		});
	}
}
