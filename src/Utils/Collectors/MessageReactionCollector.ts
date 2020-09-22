/* eslint-disable @typescript-eslint/ban-types */
import { BaseCollector } from "./BaseCollector.ts";
import { Message, MessageReaction } from "../../mod.ts";

export class MessageReactionCollector extends BaseCollector {
	constructor(public message: Message, public filter: Function) {
		super(message.channel.client, filter);
		this.message.channel.client.on(
			"reactionAdd",
			(this.listener = (msg: MessageReaction) => {
				filter(msg);
			})
		);
	}

	public end(): Map<string, Message | MessageReaction> {
		this.message.channel.client.off("reactionAdd", this.listener);
		return this.collected;
	}

	public handle(reaction: MessageReaction): void {
		this.collected.set(reaction.message.id, reaction);
	}
}
