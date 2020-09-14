/* eslint-disable @typescript-eslint/ban-types */
import { BaseCollector } from "./BaseCollector";
import { TextChannel } from "../../Structures/Channel/TextChannel";
import { Message } from "../../Structures/Message/Message";
import { Objex } from "@evolvejs/objex";
import { MessageReaction } from "../../Structures/Message/MessageReaction";

export class MessageCollector extends BaseCollector {
	constructor(public channel: TextChannel, public filter: Function) {
		super(channel.client, filter);
		this.channel.client.on("newMessage", this.listener = (msg: Message) => {
			filter(msg);
		});
	}

	public end(): Objex<string, Message | MessageReaction> {
		this.channel.client.off("newMessage", this.listener);
		return this.collected;
	}

	public handle(message: Message): void {
		this.collected.set(message.id, message);
	}
}
