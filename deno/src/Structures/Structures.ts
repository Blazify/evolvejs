import { EvolveClient } from "../Client/EvolveClient.ts";
import { CategoryChannel } from "./Channel/CategoryChannel.ts";
import { DMChannel } from "./Channel/DMChannel.ts";
import { NewsChannel } from "./Channel/NewsChannel.ts";
import { StoreChannel } from "./Channel/StoreChannel.ts";
import { TextChannel } from "./Channel/TextChannel.ts";
import { VoiceChannel } from "./Channel/VoiceChannel.ts";
import { Emoji } from "./Guild/Emoji.ts";
import { Guild } from "./Guild/Guild.ts";
import { GuildMember } from "./Guild/GuildMember.ts";
import { Role } from "./Guild/Role.ts";
import { VoiceState } from "./Guild/VoiceState.ts";
import { Message } from "./Message/Message.ts";
import { MessageReaction } from "./Message/MessageReaction.ts";
import { ClientStatus } from "./Miscs/ClientStatus.ts";
import { PresenceUpdate } from "./User/PresenceUpdate.ts";
import { User } from "./User/User.ts";

export class Structures {
	public structures: Classes = {
		Emoji,
		DMChannel,
		TextChannel,
		VoiceChannel,
		CategoryChannel,
		NewsChannel,
		StoreChannel,
		GuildMember,
		Guild,
		Message,
		MessageReaction,
		PresenceUpdate,
		ClientStatus,
		VoiceState,
		Role,
		User,
	};
	private client!: EvolveClient;
	constructor(client: EvolveClient) {
		Object.defineProperty(this, "client", {
			value: client,
			enumerable: false,
			writable: false,
		});
	}

	public get<K extends keyof Classes>(name: K): Classes[K] {
		if (!this.structures[name])
			throw this.client.transformer.error("Invalid Structure Name");
		return this.structures[name];
	}

	public extend<K extends keyof Classes, T extends Classes[K]>(
		name: K,
		extender: (structure: Classes[K]) => T
	): T {
		try {
			const structure = this.get<K>(name);
			const extended = extender(structure);

			this.structures[name] = extended;
			return extended;
		} catch (e) {
			throw this.client.transformer.error(e);
		}
	}
}

export interface Classes {
	Emoji: typeof Emoji;
	DMChannel: typeof DMChannel;
	TextChannel: typeof TextChannel;
	VoiceChannel: typeof VoiceChannel;
	CategoryChannel: typeof CategoryChannel;
	NewsChannel: typeof NewsChannel;
	StoreChannel: typeof StoreChannel;
	GuildMember: typeof GuildMember;
	Guild: typeof Guild;
	Message: typeof Message;
	MessageReaction: typeof MessageReaction;
	PresenceUpdate: typeof PresenceUpdate;
	ClientStatus: typeof ClientStatus;
	VoiceState: typeof VoiceState;
	Role: typeof Role;
	User: typeof User;
}
