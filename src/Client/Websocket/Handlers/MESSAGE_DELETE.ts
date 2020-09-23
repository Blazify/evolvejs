import { EvolveClient, EVENTS, Payload } from "../../../mod.ts";
import { TextChannel } from "../../../Structures/Channel/TextChannel.ts";
import { MessageEvents } from "../../Events/MessageEvents.ts";

export default class {
	constructor(client: EvolveClient, payload: Payload, shard: number) {
		const { id, guild_id, channel_id } = payload.d;
		const message = client.messages.get(id);
		const guild = client.guilds.get(guild_id);
		const channel = client.channels.get(channel_id) as TextChannel;
		client.emit(
			EVENTS.MESSAGE_DELETE,
			new MessageEvents(client, message, guild, channel, shard)
		);
	}
}
