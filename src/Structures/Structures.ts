/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-mixed-spaces-and-tabs */
import { EvolveClient } from "../Client/EvolveClient";
import { CategoryChannel } from "./Channel/CategoryChannel";
import { DMChannel } from "./Channel/DMChannel";
import { NewsChannel } from "./Channel/NewsChannel";
import { StoreChannel } from "./Channel/StoreChannel";
import { TextChannel } from "./Channel/TextChannel";
import { VoiceChannel } from "./Channel/VoiceChannel";
import { Emoji } from "./Guild/Emoji";
import { Guild } from "./Guild/Guild";
import { GuildMember } from "./Guild/GuildMember";
import { Role } from "./Guild/Role";
import { VoiceState } from "./Guild/VoiceState";
import { Message } from "./Message/Message";
import { MessageReaction } from "./Message/MessageReaction";
import { ClientStatus } from "./Miscs/ClientStatus";
import { PresenceUpdate } from "./User/PresenceUpdate";
import { User } from "./User/User";

export class Structures {
	public structures: Classes = {
		Emoji: require("./Guild/Emoji"),
		DMChannel: require("./Channel/DMChannel"),
		TextChannel: require("./Channel/TextChannel"),
		VoiceChannel: require("./Channel/VoiceChannel"),
		CategoryChannel: require("./Channel/CategoryChannel"),
		NewsChannel: require("./Channel/NewsChannel"),
		StoreChannel: require("./Channel/StoreChannel"),
		GuildMember: require("./Guild/GuildMember"),
		Guild: require("./Guild/Guild"),
		Message: require("./Message/Message"),
		MessageReaction: require("./Message/MessageReaction"),
		Presence: require("./User/PresenceUpdate"),
		ClientPresence: require("./Miscs/ClientStatus"),
		VoiceState: require("./Guild/VoiceState"),
		Role: require("./Guild/Role"),
		User: require("./User/User"),
	}
	constructor(private client: EvolveClient) {}

	public get<K extends keyof Classes>(name: K): Classes[K] {
		if (!this.structures[name])
			this.client.logger.error(
				"Invalid Structure Name"
			);
		return this.structures[name];
	}

	public extend<K extends keyof Classes, 
	T extends keyof Classes[K]>(name: K, extender: (structure: Classes[K]) => T): T {
		try {
			const structure = this.get<K>(name);
			const extended = extender(structure);

			this.structures[name] = Object.getPrototypeOf(extended);
			return extended;
		} catch (e) {
			throw this.client.logger.error(e);
		}
	}

}

export interface Classes {
	Emoji: typeof Emoji,
	DMChannel: typeof DMChannel,
	TextChannel: typeof TextChannel,
	VoiceChannel: typeof VoiceChannel,
	CategoryChannel: typeof CategoryChannel,
	NewsChannel: typeof NewsChannel,
	StoreChannel: typeof StoreChannel,
	GuildMember: typeof GuildMember,
	Guild: typeof Guild,
	Message: typeof Message,
	MessageReaction: typeof MessageReaction,
	Presence: typeof PresenceUpdate,
	ClientPresence: typeof ClientStatus,
	VoiceState: typeof VoiceState,
	Role: typeof Role,
	User: typeof User,
}
