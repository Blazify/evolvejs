import {
	ITextChannel,
	IDMChannel,
	IVoiceChannel,
	IGroupChannel,
	ICategoryChannel,
	INewsChannel,
	IStoreChannel,
	Payload,
} from "..";
import { TextChannel } from "../Structures/Channel/TextChannel";
import { VoiceChannel } from "../Structures/Channel/VoiceChannel";
import { DMChannel } from "../Structures/Channel/DMChannel";
import { CategoryChannel } from "../Structures/Channel/CategoryChannel";
import { GroupChannel } from "../Structures/Channel/GroupChannel";
import { NewsChannel } from "../Structures/Channel/NewsChannel";
import { StoreChannel } from "../Structures/Channel/StoreChannel";

export enum CONSTANTS {
  Gateway = "wss://gateway.discord.gg/?v=6&encoding=",
  Api = "https://discord.com/api/v6",
}

export enum CHANNELTYPES {
  Text = 0,
  Direct = 1,
  Voice = 2,
  Group = 3,
  Category = 4,
  News = 5,
  Store = 6,
}

export enum ACTIVITY {
  Game = 0,
  Stream = 1,
  Listening = 2,
  Custom = 3,
}

export const NITRO = {
	0: "None",
	1: "Nitro Classic",
	2: "Nitro",
};

export enum WEBHOOKTYPE {
  Incoming = 1,
  Channel_Follower = 2,
}

export type Visibility = "idle" | "dnd" | "online" | "offline";
export type ChannelResolvable =
  | ITextChannel
  | IDMChannel
  | IVoiceChannel
  | IGroupChannel
  | ICategoryChannel
  | INewsChannel
  | IStoreChannel;

export type ChannelTypes =
  | TextChannel
  | VoiceChannel
  | DMChannel
  | CategoryChannel
  | GroupChannel
  | NewsChannel
  | StoreChannel;

export const ChannelResolver = [
	TextChannel,
	DMChannel,
	VoiceChannel,
	GroupChannel,
	CategoryChannel,
	NewsChannel,
	StoreChannel,
];

export enum ActivityTypes {
  PLAYING = 0,
  STREAMING = 1,
  LISTENING = 2,
  CUSTOM = 4,
}

export enum CacheOptions {
  GUILD = 1,
  CHANNELS = 2,
  USERS = 3,
  MESSAGES = 4,
  ALL = 5,
}

export enum EVENTS {
  HELLO = "hello", // Defines the heartbeat interval
  READY = "clientReady", // Contains the initial state information
  RESUMED = "resumed", // Response to the "Resume" payload sent
  RECONNECT = "reconnect", // Server is going away, client should reconnect to gateway and resume
  INVALID_SESSION = "invalidSession", // Failure response to Identify or Resume or invalid active session
  CHANNEL_CREATE = "newChannel", // New channel created
  CHANNEL_UPDATE = "channelUpdate", // Channel was updated
  CHANNEL_DELETE = "removeChannel", // Channel was deleted
  CHANNEL_PINS_UPDATE = "channelPinsUpdate", // Message was pinned or unpinned
  GUILD_CREATE = "addedGuild", // Lazy-load for unavailable guild, guild became available, or user joined a new guild
  GUILD_UPDATE = "guildUpdate", // Guild was updated
  GUILD_DELETE = "removeGuild", // Guild became unavailable, or user left/was removed from a guild
  GUILD_BAN_ADD = "userBanned", // User was banned from a guild
  GUILD_BAN_REMOVE = "userUnbanned", // User was unbanned from a guild
  GUILD_EMOJIS_UPDATE = "guildEmojisUpdate", // Guild emojis were updated
  GUILD_INTEGRATIONS_UPDATE = "guildIntegrationsUpdate", // Guild integration was updated
  GUILD_MEMBER_ADD = "memberJoined", // New user joined a guild
  GUILD_MEMBER_REMOVE = "memberLeft", // User was removed from a guild
  GUILD_MEMBER_UPDATE = "memberUpdate", // Guild member was updated
  GUILD_MEMBERS_CHUNK = "memberChunk", // Response to Request Guild Members
  GUILD_ROLE_CREATE = "newRole", // Guild role was created
  GUILD_ROLE_UPDATE = "roleUpdated", // Guild role was updated
  GUILD_ROLE_DELETE = "removeRole", // Guild role was deleted
  INVITE_CREATE = "addInvite", // Invite to a channel was created
  INVITE_DELETE = "removeInvite", // Invite to a channel was deleted
  MESSAGE_CREATE = "newMessage", // Message was created
  MESSAGE_UPDATE = "updateMessage", // Message was edited
  MESSAGE_DELETE = "removeMessage", // Message was deleted
  MESSAGE_DELETE_BULK = "bulkMessageRemove", // Multiple messages were deleted at once
  MESSAGE_REACTION_ADD = "reactionAdd", // User reacted to a message
  MESSAGE_REACTION_REMOVE = "reactionRemove", // User removed a reaction from a message
  MESSAGE_REACTION_REMOVE_All = "reactionRemoveAll", // All reactions were explicitly removed from a message
  MESSAGE_REACTION_REMOVE_EMOJI = "removeReactionEmoji", // All reactions for a given emoji were removed from a message
  PRESENCE_UPDATE = "userPresenceUpdate", // User was updated
  TYPING_START = "typing", // User started typing in a channel
  USER_UPDATE = "userUpdate", // Properties about the user changed
  VOICE_STATE_UPDATE = "voiceStateUpdate", // Someone joined, left, or moved a voice channel
  VOICE_SERVER_UPDATE = "voiceServerUpdate", // Guild's voice server was updated
  WEBHOOKS_UPDATE = "webhookUpdate", // Guild channel webhook was created, update, or deleted
}

export enum GatewayIntents {
  GUILD = 1 << 0,
  GUILD_MEMBERS = 1 << 1,
  GUILD_BANS = 1 << 2,
  GUILD_EMOJIS = 1 << 3,
  GUILD_INTEGRATIONS = 1 << 4,
  GUILD_WEBHOOKS = 1 << 5,
  GUILD_INVITES = 1 << 6,
  GUILD_VOICE_STATES = 1 << 7,
  GUILD_PRESENCES = 1 << 8,
  GUILD_MESSAGES = 1 << 9,
  GUILD_MESSAGES_REACTIONS = 1 << 10,
  GUILD_MESSAGE_TYPING = 1 << 11,
  DIRECT_MESSAGES = 1 << 12,
  DIRECT_MESSAGES_REACTIONS = 1 << 13,
  DIRECT_MESSAGES_TYPING = 1 << 14,
  ALL = (1 << 0) +
    (1 << 1) +
    (1 << 2) +
    (1 << 3) +
    (1 << 4) +
    (1 << 5) +
    (1 << 6) +
    (1 << 7) +
    (1 << 8) +
    (1 << 9) +
    (1 << 10) +
    (1 << 11) +
    (1 << 12) +
    (1 << 13) +
    (1 << 14),
}

export enum OPCODE {
  Dispatch = 0, // Receive an dispatched event.
  Heartbeat = 1, // Send or receive periodically fired heartbeat which keeps connection alive.
  Identify = 2, // Starts a new session during the initial handshake.
  Presence_Update = 3, // Update the client's presence status.
  Voice_State_Update = 4, // Used to join/leave or move between voice channels.
  Resume = 6, // Resume a previous session that was disconnected.
  Reconnect = 7, // When received	attempt to reconnect and resume should be made immediately.
  Request = 8, // Send or request information about offline guild members in a large guild.
  Invalid = 9, // Received when session has been invalidated. You should reconnect and resume accordingly.
  Hello = 10, // Sent immediately after connecting, contains the heartbeat_interval to use.
  Heartbeat_ACK = 11, // Sent in response to receiving a heartbeat to acknowledge that it has been received.
}

export const Heartbeat: Payload = {
	op: OPCODE.Heartbeat,
	d: null,
};

export const VoiceStateUpdate: Payload = {
	op: OPCODE.Voice_State_Update,
	d: {
		guild_id: "",
		channel_id: "",
		self_mute: false,
		self_deaf: false,
	},
};

export const VoiceIdentify: Payload = {
	op: 0,
	d: {
		server_id: "",
		user_id: "",
		session_id: "",
		token: "",
	},
};

export const Identify: Payload = {
	op: OPCODE.Identify,
	d: {
		token: "",
		intents: 0,
		shard: [0, 1],
		properties: {
			$os: process.platform,
			$browser: "discord",
			$device: "evolvejs",
		},
		presence: {
			since: Date.now(),
			game: {
				name: "EvolveJS",
				type: ActivityTypes.PLAYING,
			},
			status: "",
			afk: false,
		},
	},
};

export interface TokenAccessOptions {
  code: string;
  redirectUri: string;
  scopes: string;
}

export enum PERMISSIONS {
  ADMINISTRATOR = "",
}
