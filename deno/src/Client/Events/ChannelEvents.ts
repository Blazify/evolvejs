import { BaseEvent } from "./BaseEvent.ts";
import { EvolveClient } from "../EvolveClient.ts";
import { Channel } from "../../Structures/Channel/Channel.ts";

export class ChannelEvents extends BaseEvent {
 constructor(client: EvolveClient, public channel: Channel, shard: number) {
 super(shard, client);
 }
}
