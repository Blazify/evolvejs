
import { Payload } from "../../../Interfaces/Interfaces";
import { EvolveClient, EVENTS } from "../../..";
import { Guild } from "../../../Structures/Guild/Guild";

export default class {
	constructor(client: EvolveClient, payload: Payload) {
		let guild = payload.d;
		guild = new Guild(guild, client);
		client.emitEvent(EVENTS.GUILD_UPDATE, guild);
	}
}
