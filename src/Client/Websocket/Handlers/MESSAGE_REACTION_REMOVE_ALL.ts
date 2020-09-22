import { EvolveClient, EVENTS, Payload, MessageReaction } from "../../mod.ts";
import { MessageReactionEvents } from "../../Events/MessageReactionEvents.ts";

export default class {
	constructor(client: EvolveClient, payload: Payload, shard: number) {
		client.emit(
			EVENTS.MESSAGE_REACTION_REMOVE_All,
			new MessageReactionEvents(
				client,
				new MessageReaction(payload.d, client),
				shard
			)
		);
	}
}
