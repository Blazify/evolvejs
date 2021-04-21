/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
	EvolveClient,
	GuildMember,
	Role,
	Emoji,
	VoiceState,
	PresenceUpdate,
	IGuild,
} from "../../mod.ts";
import { Objex } from "@evolvejs/objex.ts";
import { ChannelsManager } from "../../Client/Managers/ChannelsManger.ts";
import { Endpoints } from "../../Utils/Endpoints.ts";
import { ChannelResolver } from "../../Utils/Constants.ts";
import { IGuildMember } from "../../Interfaces/GuildMemberOptions.ts";
import { UsersManager } from "../../Client/Managers/UsersManager.ts";
import { RolesManager } from "../../Client/Managers/RolesManager.ts";
import { EmojisManager } from "../../Client/Managers/EmojisManager.ts";

export class Guild {
	public client!: EvolveClient;
	public members: Objex<string, GuildMember> = new Objex();
	public channels!: ChannelsManager;
	public roles: RolesManager = new Objex();
	public emojis: EmojisManager = new Objex();
	public voiceStates: Objex<string, VoiceState> = new Objex();
	public presences: Objex<string, PresenceUpdate> = new Objex();
	public features: Array<string> = [];

	public id: string;
	public name!: string;
	public icon!: string;
	public splash?: string;
	public discoverySplash?: string;
	public isOwner?: boolean;
	public ownerId?: string;
	public permissions?: number;
	public region!: string;
	public afkChannelId?: string;
	public afkTimeout!: number;
	public verificationLevel!: number;
	public defMessageNotify!: number;
	public explicitContentFilter!: number;
	public mfaLevel!: number;
	public applicationID?: string;
	public widgetEnabled!: boolean;
	public widgetChannelId?: string;
	public systemChannelId?: string;
	public systemChannelFlag!: number;
	public rulesChannelId?: string;
	public joinedAt?: number;
	public large!: boolean;
	public unavailable!: boolean;
	public memberCount!: number;
	public maxPresences?: number;
	public maxMembers?: number;
	public vanityCode?: string;
	public description?: string;
	public banner?: string;
	public premiumTier!: number;
	public premiumSubCount!: number;
	public preferredLang!: string;
	public updatesChannelId?: string;
	public maxChannelUsers?: number;
	public data!: IGuild;

	constructor(data: IGuild, client: EvolveClient) {
		Object.defineProperty(this, "client", {
			value: client,
			enumerable: false,
			writable: false,
		});
		Object.defineProperty(this, "data", {
			value: data,
			enumerable: false,
			writable: false,
		});
		this.id = data.id;
		this.channels = new ChannelsManager(client, this);
		this._handle();
	}

	private _handle() {
		if (!this.data) return;
		this.data.emojis.forEach((o) => {
			this.emojis.set(o.id, new Emoji(o));
		});

		this.data.roles.forEach((o) => {
			this.roles.set(o.id, new Role(o));
		});

		this.name = this.data.name;
		this.icon = this.data.icon;
		this.splash = this.data.splash || undefined;
		this.discoverySplash = this.data.discovery_splash || undefined;
		this.isOwner = this.data.owner;
		this.ownerId = this.data.owner_id;
		this.permissions = this.data.permissions;
		this.region = this.data.region;
		this.afkChannelId = this.data.afk_channel_id ?? undefined;
		this.afkTimeout = this.data.afk_timeout;
		this.verificationLevel = this.data.verification_level;
		this.defMessageNotify = this.data.default_message_notifications;
		this.explicitContentFilter = this.data.explicit_content_filter;
		this.mfaLevel = this.data.mfa_level;
		this.applicationID = this.data.application_id || undefined;
		this.widgetEnabled = this.data.widget_enabled ?? false;
		this.widgetChannelId = this.data.widget_channel_id ?? undefined;
		this.systemChannelId = this.data.system_channel_id ?? undefined;
		this.systemChannelFlag = this.data.system_channel_flags;
		this.rulesChannelId = this.data.rules_channel_id ?? undefined;
		this.joinedAt = this.data.joined_at ?? undefined;
		this.large = this.data.large ?? false;
		this.unavailable = this.data.unavailable ?? false;
		this.memberCount = this.members.size;
		this.maxPresences = this.data.max_presences ?? undefined;
		this.maxMembers = this.data.max_members;
		this.vanityCode = this.data.vanity_url_code ?? undefined;
		this.description = this.data.description ?? undefined;
		this.banner = this.data.banner ?? undefined;
		this.premiumTier = this.data.premium_tier;
		this.premiumSubCount = this.data.premium_subscription_count ?? 0;
		this.preferredLang = this.data.preferred_locale;
		this.updatesChannelId = this.data.public_updates_channel_id ?? undefined;
		this.maxChannelUsers = this.data.max_video_channel_users;
		return this;
	}
}
