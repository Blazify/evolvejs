import { BaseEvent } from "./BaseEvent";
import { EvolveClient } from "../EvolveClient";
import { MessageReaction } from "../../Structures/Message/MessageReaction";

export class MessageReactionEvents extends BaseEvent {
	constructor(
		client: EvolveClient,
    public reaction: MessageReaction,
    shard: number
	) {
		super(shard, client);

		this.reaction = new (client.structures.get("MessageReaction"))(
			reaction.data,
			client
		);
	}
}
