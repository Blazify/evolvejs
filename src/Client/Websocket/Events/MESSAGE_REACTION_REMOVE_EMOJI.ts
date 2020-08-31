
import { EvolveClient, EVENTS, Payload, MessageReaction } from "../../..";

export default class {
	constructor(client: EvolveClient, payload: Payload) {
		client.emitEvent(EVENTS.MESSAGE_REACTION_REMOVE_EMOJI, new MessageReaction(payload.d, client));
	}
}

