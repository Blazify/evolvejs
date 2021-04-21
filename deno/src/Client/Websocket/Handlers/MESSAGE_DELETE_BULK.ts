import { EvolveClient, EVENTS, Payload, Message } from "../../../mod.ts";
import { Objex } from "@evolvejs/objex.ts";
import { MessageEvents } from "../../Events/MessageEvents.ts";
import { TextChannel } from "../../../Structures/Channel/TextChannel.ts";

export default class {
	constructor(client: EvolveClient, payload: Payload, shard: number) {
		const { ids, channel_id, guild_id } = payload.d;
		const messageObjex: Objex<string, Message | undefined> = new Objex();
		for (const id of ids) {
			messageObjex.set(id, client.messages.get(id));
			if (client.options.enableMessageCache) client.messages.delete(id);
		}

		(async () => {
			client.emit(
				EVENTS.MESSAGE_DELETE_BULK,
				new MessageEvents(client, messageObjex, shard)
			);
		})();
	}
}
