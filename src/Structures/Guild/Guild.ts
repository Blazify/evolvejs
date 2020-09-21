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
} from "../..";
import { Objex } from "@evolvejs/objex";
import { ChannelTypes } from "../../Utils/Constants";
import { Channel } from "../Channel/Channel";
import { ChannelsManager } from "../../Client/Managers/ChannelsManger";
import { clear } from "console";

export class Guild {
  public client: EvolveClient;
  public members: Objex<string, GuildMember> = new Objex();
  public channels!: ChannelsManager;
  public roles: Objex<string, Role> = new Objex();
  public emojis: Objex<string | null, Emoji> = new Objex();
  public voiceStates: Objex<string, VoiceState> = new Objex();
  public presences: Objex<string, PresenceUpdate> = new Objex();
  public features: Array<string> = [];

  public id: string;
  public name!: string;
  public icon!: string;
  public splash?: string;
  public discoverySplash?: string;
  public isOwner?: boolean;
  public owner?: GuildMember;
  public permissions?: number;
  public region!: string;
  public afkChannel?: Channel;
  public afkTimeout!: number;
  public verificationLevel!: number;
  public defMessageNotify!: number;
  public explicitContentFilter!: number;
  public mfaLevel!: number;
  public applicationID?: string;
  public widgetEnabled!: boolean;
  public widgetChannel?: Channel;
  public systemChannel?: Channel;
  public systemChannelFlag!: number;
  public rulesChannel?: Channel;
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
  public updatesChannel?: Channel;
  public maxChannelUsers?: number;

  constructor(public data: IGuild, client: EvolveClient) {
  	this.client = client;
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

  	(async () => {
  		const cArray = await this.client.rest.getGuildChannels(this.data.id);
  		for (const c of cArray) {
  			this.channels.set(c.id, c);
  		}

  		const mArray = await this.client.rest.getGuildMembers(this.data.id);
  		for (const m of mArray) {
  			if (m.user) this.members.set(m.user.id, m);
  		}
  	})();

  	this.name = this.data.name;
  	this.icon = this.data.icon;
  	this.splash = this.data.splash || undefined;
  	this.discoverySplash = this.data.discovery_splash || undefined;
  	this.isOwner = this.data.owner;
  	this.owner = this.members.get(this.data.owner_id);
  	this.permissions = this.data.permissions;
  	this.region = this.data.region;
  	this.afkChannel = this.data.afk_channel_id
  		? this.client.channels.get(this.data.afk_channel_id)
  		: undefined;
  	this.afkTimeout = this.data.afk_timeout;
  	this.verificationLevel = this.data.verification_level;
  	this.defMessageNotify = this.data.default_message_notifications;
  	this.explicitContentFilter = this.data.explicit_content_filter;
  	this.mfaLevel = this.data.mfa_level;
  	this.applicationID = this.data.application_id || undefined;
  	this.widgetEnabled = this.data.widget_enabled || false;
  	this.widgetChannel = this.data.widget_channel_id
  		? this.client.channels.get(this.data.widget_channel_id)
  		: undefined;
  	this.systemChannel = this.data.system_channel_id
  		? this.client.channels.get(this.data.system_channel_id)
  		: undefined;
  	this.systemChannelFlag = this.data.system_channel_flags;
  	this.rulesChannel = this.data.rules_channel_id
  		? this.client.channels.get(this.data.rules_channel_id)
  		: undefined;
  	this.joinedAt = this.data.joined_at || undefined;
  	this.large = this.data.large || false;
  	this.unavailable = this.data.unavailable || false;
  	this.memberCount = this.members.size;
  	this.maxPresences = this.data.max_presences || undefined;
  	this.maxMembers = this.data.max_members;
  	this.vanityCode = this.data.vanity_url_code || undefined;
  	this.description = this.data.description || undefined;
  	this.banner = this.data.banner || undefined;
  	this.premiumTier = this.data.premium_tier;
  	this.premiumSubCount = this.data.premium_subscription_count || 0;
  	this.preferredLang = this.data.preferred_locale;
  	this.updatesChannel = this.data.public_updates_channel_id
  		? this.client.channels.get(this.data.public_updates_channel_id)
  		: undefined;
  	this.maxChannelUsers = this.data.max_video_channel_users;
  	return this;
  }
}
