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
  API_ERROR = "API_ERROR",
  EVENTS = "EVENTS",
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
  GUILD,
  CHANNELS,
  USERS,
  MESSAGES,
  EMOJI,
  ALL,
}

export enum EVENTS {
  RAW = "rawEvent",
  PACKET_READY = "packetReady",
  HELLO = "hello",
  READY = "clientReady",
  RESUMED = "resumed",
  RECONNECT = "reconnect",
  INVALID_SESSION = "invalidSession",
  CHANNEL_CREATE = "newChannel",
  CHANNEL_UPDATE = "channelUpdate",
  CHANNEL_DELETE = "removeChannel",
  CHANNEL_PINS_UPDATE = "channelPinsUpdate",
  GUILD_CREATE = "addedGuild",
  GUILD_UPDATE = "guildUpdate",
  GUILD_DELETE = "removeGuild",
  GUILD_BAN_ADD = "userBanned",
  GUILD_BAN_REMOVE = "userUnbanned",
  GUILD_EMOJIS_UPDATE = "guildEmojisUpdate",
  GUILD_INTEGRATIONS_UPDATE = "guildIntegrationsUpdate",
  GUILD_MEMBER_ADD = "memberJoined",
  GUILD_MEMBER_REMOVE = "memberLeft",
  GUILD_MEMBER_UPDATE = "memberUpdate",
  GUILD_MEMBERS_CHUNK = "memberChunk",
  GUILD_ROLE_CREATE = "newRole",
  GUILD_ROLE_UPDATE = "roleUpdated",
  GUILD_ROLE_DELETE = "removeRole",
  INVITE_CREATE = "addInvite",
  INVITE_DELETE = "removeInvite",
  MESSAGE_CREATE = "newMessage",
  MESSAGE_UPDATE = "updateMessage",
  MESSAGE_DELETE = "removeMessage",
  MESSAGE_DELETE_BULK = "bulkMessageRemove",
  MESSAGE_REACTION_ADD = "reactionAdd",
  MESSAGE_REACTION_REMOVE = "reactionRemove",
  MESSAGE_REACTION_REMOVE_All = "reactionRemoveAll",
  MESSAGE_REACTION_REMOVE_EMOJI = "removeReactionEmoji",
  PRESENCE_UPDATE = "userPresenceUpdate",
  TYPING_START = "typing",
  USER_UPDATE = "userUpdate",
  VOICE_STATE_UPDATE = "voiceStateUpdate",
  VOICE_SERVER_UPDATE = "voiceServerUpdate",
  WEBHOOKS_UPDATE = "webhookUpdate",
  SHARD_SPAWN = "shardSpawn",
  SHARD_DESTROY = "shardDestroy",
  API_ERROR = "restError",
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
  ALL = GUILD +
    GUILD_MEMBERS +
    GUILD_BANS +
    GUILD_EMOJIS +
    GUILD_INTEGRATIONS +
    GUILD_WEBHOOKS +
    GUILD_INVITES +
    GUILD_VOICE_STATES +
    GUILD_PRESENCES +
    GUILD_MESSAGES +
    GUILD_MESSAGES_REACTIONS +
    GUILD_MESSAGE_TYPING +
    DIRECT_MESSAGES +
    DIRECT_MESSAGES_REACTIONS +
    DIRECT_MESSAGES_TYPING,
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
