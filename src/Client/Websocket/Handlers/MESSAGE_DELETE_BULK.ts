import { EvolveClient, EVENTS, Payload, Message } from "../../../mod.ts";
import { MessageEvents } from "../../Events/MessageEvents.ts";
import { TextChannel } from "../../../Structures/Channel/TextChannel.ts";

export default class {
	constructor(client: EvolveClient, payload: Payload, shard: number) {
		const { ids, channel_id, guild_id } = payload.d;
		const messageObjex: Map<string, Message | undefined> = new Map();
		for (const id of ids) {
			messageObjex.set(id, client.messages.get(id));
		}

		client.emit(
			EVENTS.MESSAGE_DELETE_BULK,
			new MessageEvents(
				client,
				messageObjex,
				client.guilds.get(guild_id),
        client.channels.get(channel_id) as TextChannel,
        shard
			)
		);
	}
}
