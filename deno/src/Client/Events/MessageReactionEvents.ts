import { BaseEvent } from "./BaseEvent.ts";
import { EvolveClient } from "../EvolveClient.ts";
import { MessageReaction } from "../../Structures/Message/MessageReaction.ts";

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
