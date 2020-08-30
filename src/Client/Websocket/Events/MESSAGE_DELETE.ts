
import { Payload } from "../../../Interfaces/Interfaces";
import { EvolveClient, EVENTS } from "../../..";

export default class {
	constructor(client: EvolveClient, payload: Payload) {
		const { id, guild_id, channel_id } = payload.d;
		const message = client.messages.get(id);
		const guild = client.guilds.get(guild_id);
		const channel = client.channels.get(channel_id);
		client.emit(EVENTS.MESSAGE_DELETE, message, guild, channel);
	}
}
