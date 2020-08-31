
import { EvolveClient, EVENTS, Payload, Message } from "../../..";
import { Objex } from "@evolvejs/objex";

export default class {
	constructor(client: EvolveClient, payload: Payload) {
		const { ids, channel_id, guild_id } = payload.d;
		const messageObjex: Objex<string, Message | undefined> = new Objex();
		for(const id of ids) {
			messageObjex.set(id, client.messages.get(id));
		}

		client.emitEvent(EVENTS.MESSAGE_DELETE_BULK, messageObjex, client.channels.get(channel_id), client.guilds.get(guild_id));
	}
}
