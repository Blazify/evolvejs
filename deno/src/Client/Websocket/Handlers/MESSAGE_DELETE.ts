import { EvolveClient, EVENTS, Payload } from "../../../mod.ts";
import { TextChannel } from "../../../Structures/Channel/TextChannel.ts";
import { MessageEvents } from "../../Events/MessageEvents.ts";

export default class {
	constructor(client: EvolveClient, payload: Payload, shard: number) {
		const { id, guild_id, channel_id } = payload.d;
		const message = client.messages.get(id);
		const guild = client.guilds.get(guild_id);
		if (client.options.enableMessageCache) client.messages.delete(id);
		(async () =>
			client.emit(
				EVENTS.MESSAGE_DELETE,
				new MessageEvents(client, message, shard)
			))();
	}
}
