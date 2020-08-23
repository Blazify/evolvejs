import Role from './Role';
import Emoji from './Emoji';
import Channel from '../Channel/Channel';
import VoiceState from './VoiceState';
import {GuildMember} from './GuildMember';
import PresenceUpdate from '../User/PresenceUpdate';
import { Objex } from '@evolvejs/objex';
import { Snowflake } from '../../Constants/Constants';
import { IGuild } from '../../Interfaces/GuildOptions';
import { EvolveClient } from '../../Client/EvolveClient';

export class Guild {
	public client: EvolveClient;
	public members: Objex<Snowflake, GuildMember> = new Objex();
	public channels: Objex<Snowflake, Channel> = new Objex();
	public roles: Objex<Snowflake, Role> = new Objex();
	public emojis: Objex<Snowflake, Emoji> = new Objex();
	public voiceStates: Objex<Snowflake, VoiceState> = new Objex();
	public presences: Objex<Snowflake, PresenceUpdate> = new Objex();
	public features: Array<string> = new Array();

	public id: Snowflake;
	public name: string;
	public icon: string;
	public splash?: string;
	public discoverySplash?: string;
	public isOwner?: boolean;
	public owner: GuildMember;
	public permissions?: number;
	public region: string;
	public afkChannel?: Channel;
	public afkTimeout: number;
	public verificationLevel: number;
	public defMessageNotify: number;
	public explicitContentFilter: number;
	public mfaLevel: number;
	public applicationID?: Snowflake;
	public widgetEnabled: boolean;
	public widgetChannel?: Channel;
	public systemChannel?: Channel;
	public systemChannelFlag: number;
	public rulesChannel?: Channel;
	public joinedAt?: number;
	public large: boolean;
	public unavailable: boolean;
	public memberCount: number;
	public maxPresences?: number;
	public maxMembers?: number;
	public vanityCode?: string;
	public description?: string;
	public banner?: string;
	public premiumTier: number;
	public premiumSubCount: number;
	public preferredLang: string;
	public updatesChannel?: Channel;
	public maxChannelUsers?: number;

	constructor(data: IGuild, client: EvolveClient) {
		this.client = client;
		this.id = data.id;
		this.name = data.name;
		this.icon = data.icon;
		this.splash = data.splash || undefined;
		this.discoverySplash = data.discovery_splash || undefined;
		this.isOwner = data.owner;
		this.owner = this.members.get(data.owner_id)!;
		this.permissions = data.permissions;
		this.region = data.region;
		this.afkChannel = data.afk_channel_id
			? this.client.channels.get(data.afk_channel_id)
			: undefined;
		this.afkTimeout = data.afk_timeout;
		this.verificationLevel = data.verification_level;
		this.defMessageNotify = data.default_message_notifications;
		this.explicitContentFilter = data.explicit_content_filter;
		this.mfaLevel = data.mfa_level;
		this.applicationID = data.application_id || undefined;
		this.widgetEnabled = data.widget_enabled || false;
		this.widgetChannel = data.widget_channel_id
			? this.client.channels.get(data.widget_channel_id)
			: undefined;
		this.systemChannel = data.system_channel_id
			? this.client.channels.get(data.system_channel_id)
			: undefined;
		this.systemChannelFlag = data.system_channel_flags;
		this.rulesChannel = data.rules_channel_id
			? this.client.channels.get(data.rules_channel_id)
			: undefined;
		this.joinedAt = data.joined_at || undefined;
		this.large = data.large || false;
		this.unavailable = data.unavailable || false;
		this.memberCount = this.members.size;
		this.maxPresences = data.max_presences || undefined;
		this.maxMembers = data.max_members;
		this.vanityCode = data.vanity_url_code || undefined;
		this.description = data.description || undefined;
		this.banner = data.banner || undefined;
		this.premiumTier = data.premium_tier;
		this.premiumSubCount = data.premium_subscription_count || 0;
		this.preferredLang = data.preferred_locale;
		this.updatesChannel = data.public_updates_channel_id
			? this.client.channels.get(data.public_updates_channel_id)
			: undefined;
		this.maxChannelUsers = data.max_video_channel_users;
	}

}
