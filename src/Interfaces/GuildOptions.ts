import { ChannelResolvable } from '..';
import { IEmoji } from './EmojiOptions';
import { IRole } from './RoleOptions';
import { IVoiceState } from './VoiceStateOptions';
import { IGuildMember } from './GuildMemberOptions';
import { IPresenceUpdate } from './PresenceUpdateOptions';

export interface IGuild {
	id: string; // ID of the guild
	name: string; // Guild name (2-100 characters, excluding trailing and leading whitespace)
	icon: string; // Guild icon hash
	splash: string | null; // Guild splash hash
	discovery_splash: string | null; // Discovery splash hash (only present for guilds with the "DISCOVERABLE" feature)
	owner?: boolean; // Only true if the user is the owner of the guild
	owner_id: string; // The user ID of owner
	permissions?: number; // Total permissions for the user in the guild (excludes overrides)
	region: string; // Voice region ID for the guild
	afk_channel_id: string | null; // ID of afk channel
	afk_timeout: number; // AFK timeout in seconds
	verification_level: number; // Verification level required for the guild
	default_message_notifications: number; // Default message notifications level
	explicit_content_filter: number; // explicit content filter level
	roles: IRole[]; // Array of roles in the guild
	emojis: IEmoji[]; // Array of custom guild emojis
	features: string[]; // Array of guild feature strings
	mfa_level: number; // Required MFA level for the guild
	application_id: string | null; // Application ID of the guild creator if it is bot-created
	widget_enabled?: boolean; // "true" if the server widget is enabled
	widget_channel_id?: string | null; // The channel ID that the widget will generate an invite to
	system_channel_id?: string | null; // The ID of the system channel
	system_channel_flags: number; // System channel flags
	rules_channel_id?: string | null; // The ID of the rule channel of guilds with the "PUBLIC" feature
	joined_at?: number; // When this guild was joined at
	large?: boolean; // "true" if this is considered a large guild
	unavailable?: boolean; // "true" if this guild is unavailable due to an outage
	member_count?: number; // Total number of members in this guild
	voice_states?: IVoiceState[]; // States of members currently in voice channels (lacks the guild_id key)
	members?: IGuildMember[]; // Users in the guild
	channels?: ChannelResolvable[]; // Channels in the guild
	presences?: IPresenceUpdate[]; // Presences of the members in the guild
	max_presences?: number | null; // The maximum number of presences for the guild (25000 when null is returned)
	max_members?: number; // The maximum number of members for the guild
	vanity_url_code: string | null; // The vanity url code for the guild
	description: string | null; // The description for the guild, if the guild is discoverable
	banner: string | null; // Guild banner hash
	premium_tier: number; // Premium tier (Server Boost level)
	premium_subscription_count?: number; // The number of boosts this guild currently has
	preferred_locale: string; // The preferred locale of a guild with the "PUBLIC" feature (defaults "en-US")
	public_updates_channel_id?: string; // Where of guilds with the "PUBLIC" feature receive notices from Discord
	max_video_channel_users?: number; // The maximum amount of users in a video channel
	approximate_member_count?: number; // Approximate number of members in this guild
	approximate_presence_count?: number; // Approximate number of non-offline members in this guild
}
