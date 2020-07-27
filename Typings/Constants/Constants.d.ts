export declare enum CONSTANTS {
    GATEWAY = "wss://gateway.discord.gg/?v=6&encoding=json",
    API = "https://discord.com/api/v6"
}
export declare enum CHANNELTYPES {
    TEXT = 0,
    DM = 1,
    VOICE = 2,
    GROUP = 3,
    CATEGORY = 4,
    NEWS = 5,
    STORE = 6
}
export declare type Visibility = 'idle' | 'dnd' | 'online' | 'offline';
export declare type Snowflake = string;
export declare enum EVENTS {
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
    WEBHOOKS_UPDATE = "webhookUpdate"
}
