import { EvolveClient, EVENTS } from "../../..";
import { Payload } from "../../../Interfaces/Interfaces";

export default class {
	constructor(client: EvolveClient, payload: Payload) {
		client.api.getChannel(payload.d.id).then(o =>
			client.emitEvent(EVENTS.CHANNEL_CREATE, o)
		);
	}
}
