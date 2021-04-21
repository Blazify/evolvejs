export class Endpoints {
	/* 
 Constant
 */
	static GUILD = "/guilds/:id";
	static GUILD_PREVIEW = "/guilds/:id/preview";
	static GUILD_CHANNELS = "/guilds/:id/channels";
	static GUILD_MEMBERS = "/guilds/:id/members";
	static GUILD_BANS = "/guilds/:id/bans";
	static GUILD_ROLES = "/guilds/:id/roles";
	static GUILD_PRUNE = "/guilds/:id/prune";
	static GUILD_VOICE_REGIONS = "/guilds/:id/regions";
	static GUILD_INVITES = "/guilds/:id/invites";
	static GUILD_INTEGRATIONS = "/guilds/:id/integrations";
	static GUILD_WIDGET = "/guilds/:id/widget";
	static GUILD_WIDGET_JSON = "/guilds/:id/widget.json";
	static GUILD_VANITY_URL = "/guilds/:id/vanity-url";
	static GUILD_ICON = "/guild/:id/widget.png";

	static CLIENT_USER_NICK = "/guilds/:id/members/@me/nick";

	static CHANNEL = "/channels/:id";
	static CHANNEL_MESSAGES = "/channels/:id/messages";
	static CHANNEL_INVITES = "/channels/:id/invites";
	static CHANNEL_FOLLOWERS = "/channels/:id/followers";
	static TYPING = "/channels/:id/typing";
	static CHANNEL_PINS = "/channels/:id/pins";
	static BULK_DELETE = "/channels/:id/messages/bulk-delete";

	static EMOJIS = "/guilds/:id/emojis";

	static INVITE = "/invites/:id";

	static CLIENT_USER = "/users/@me";
	static CLIENT_USER_GUILDS = "/users/@me/guilds";
	static USER = "/users/:id";
	static CLIENT_USER_GUILD = "/users/@me/guilds/:id";
	static CLIENT_USER_DMS = "/users/@me/channels";
	static CLIENT_USER_CONNECTIONS = "/users/@me/connections";

	static VOICE_REGIONS = "/voice/regions";

	static WEBHOOK = "/webhooks/:id";
	static CHANNEL_WEBHOOKS = "/channels/:id/webhooks";
	static GUILD_WEBHOOKS = "/guilds/:id/webhooks";
	/* 
 Dynamic
 */
	static GUILD_MEMBER = (guildId: string) => `/guilds/${guildId}/members/:id`;
	static GUILD_MEMBER_ROLE = (guildId: string, memberId: string) =>
		`/guilds/${guildId}/members/${memberId}/roles/:id`;
	static GUILD_BAN = (guildId: string) => `/guilds/${guildId}/bans/:id`;
	static GUILD_ROLE = (guildId: string) => `/guilds/${guildId}/roles/:id`;
	static GUILD_INTEGRATION = (guildId: string) =>
		`/guilds/${guildId}/integrations/:id`;
	static GUILD_INTEGRATION_SYNC = (guildId: string) =>
		`/guilds/${guildId}/integrations/:id/sync`;

	static CHANNEL_MESSAGE = (channelId: string) =>
		`/channels/${channelId}/messages/:id`;
	static CROSSPOST_MESSAGE = (channelId: string) =>
		`/channels/${channelId}/messages/:id/crosspost`;
	static MESSAGE_REACTION = (channelId: string, emoji: string) =>
		`/channels/${channelId}/messages/:id/reactions/${encodeURI(emoji)}/@me`;
	static USER_REACTION = (
		channelId: string,
		emoji: string,
		messageId: string
	) =>
		`/channels/${channelId}/messages/${messageId}/reactions/${encodeURI(
			emoji
		)}/:id`;
	static MESSAGE_EMOJI_REACTIONS = (channelId: string, emoji: string) =>
		`/channels/${channelId}/messages/:id/reactions/${encodeURI(emoji)}`;
	static MESSAGE_REACTIONS = (channelId: string) =>
		`/channels/${channelId}/messages/:id/reactions`;
	static CHANNEL_PERMISSIONS = (channelId: string) =>
		`/channels/${channelId}/permissions/:id`;
	static CHANNEL_PIN = (channelId: string) => `/channels/${channelId}/pins/:id`;
	static GROUP_DM_RECIPIENT = (channelId: string) =>
		`/channels/${channelId}/recipients/:id`;
	static GUILD_EMOJI = (guildId: string) => `/guilds/${guildId}/emojis/:id`;

	static WEBHOOK_TOKEN = (webhookId: string) => `/webhooks/${webhookId}/:id`;
	static WEBHOOK_SLACK = (webhookId: string) =>
		`/webhooks/${webhookId}/:id/slack`;
	static WEBHOOK_GITHUB = (webhookId: string) =>
		`/webhooks/${webhookId}/:id/github`;
}
