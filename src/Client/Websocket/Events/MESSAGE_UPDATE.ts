
import { EvolveClient, EVENTS, Payload, Message } from "../../..";
import { TextChannel } from "../../../Structures/Channel/TextChannel";

export default class {
	constructor(client: EvolveClient, payload: Payload) {
		let message: Message;
		(async() => {
			const channel: TextChannel = await client.api.getTextChannel(payload.d.channel_id);
			message = new Message(payload.d, channel, channel.guild);
			client.emit(EVENTS.MESSAGE_UPDATE, message);
		});
	}
}
