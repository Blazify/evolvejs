
import { Payload } from "../../../Interfaces/Interfaces";
import { EvolveClient, EVENTS } from "../../..";

export default class {
	constructor(client: EvolveClient, payload: Payload) {
		(async() => {
			const channel = await client.api.getChannel(payload.d.channel.id);
			client.emitEvent(EVENTS.CHANNEL_UPDATE, channel);
		});
	}
}
