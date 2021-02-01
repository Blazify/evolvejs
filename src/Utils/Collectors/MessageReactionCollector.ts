/* eslint-disable @typescript-eslint/ban-types */
import { BaseCollector } from "./BaseCollector";
import { Objex } from "@evolvejs/objex";
import { Message, MessageReaction } from "../..";

export class MessageReactionCollector extends BaseCollector {
	constructor(public message: Message, public filter: Function) {
		super(message["client"], filter);
		this.message["client"].on(
			"reactionAdd",
			(this.listener = (msg: MessageReaction) => {
				filter(msg);
			})
		);
	}

	public end(): Objex<string, Message | MessageReaction> {
		this.message["client"].off("reactionAdd", this.listener);
		return this.collected;
	}

	public handle(reaction: MessageReaction): void {
		this.collected.set(reaction.message.id, reaction);
	}
}
