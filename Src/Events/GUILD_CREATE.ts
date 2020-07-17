import { Client, Payload } from '..';
import Guild from '../Structures/Guild';
import PresenceUpdate from '../Structures/PresenceUpdate';
import User from '../Structures/User';
import Role from '../Structures/Role';
import ClientStatus from '../Structures/ClientStatus';
import Activity from '../Structures/Activity';
import GuildMember from '../Structures/GuildMember';
import Channel from '../Structures/Channel';

export default class {
	constructor(client: Client, payload: Payload) {
		let { d } = payload
		let Apresences: PresenceUpdate[] = new Array()
		let Amembers: GuildMember[] = new Array()
		let { presences } = d
		let { members } = d.members
		let Auser: User[] = new Array();
		let Aactivities: Activity[] = new Array();
		let AclientStatus: ClientStatus[] = new Array();
		let user = presences.user;
		let activities = presences.activities;
		let clientStatus = presences.client_status;
		let ARole: Role[] = new Array()
		let AChannels: Channel[] = new Array()
		let roles = d.roles
		let channels = d.channels
		
		let puck = client.guilds.set(d.id, new Guild(
			d.id,
			d.name,
			d.icon,
			d.splash,
			d.discovery_splash,
			d.owner,
			d.owner_id,
			d.permissions,
			d.region,
			d.afk_channel_id,
			d.afk_timeout,
			d.embed_enabled,
			d.embed_channel_id,
			d.verification_level,
			d.default_message_notifications,
			d.explicit_content_filter,
			roles,
			d.emojis,
			d.features,
			d.mfa_level,
			d.application_id,
			d.widget_enabled,
			d.widget_channel_id,
			d.system_channel_id,
			d.rules_channel_id,
			d.joined_at,
			d.large,
			d.unavailable,
			d.member_count,
			d.voice_states,
			members,
			channels,
			presences,
			d.max_presences,
			d.max_members,
			d.vanity_url_code,
			d.description,
			d.banner,
			d.premium_tier,
			d.premium_subscription_count,
			d.preferred_locale,
			d.public_updates_channel_id,
			d.max_video_channel_users,
			d.approximate_member_count,
			d.approximate_presence_count
		))
		Auser.push(new User(
			user.id,
			user.username,
			user.discriminator,
			user.avatar,
			user.bot,
			user.system,
			user.mfa_enabled,
			user.locale,
			user.verfied,
			user.email,
			user.flags,
			user.premium_type,
			user.public_flags
		))
		ARole.push(new Role(
			roles.id,
			roles.name,
			roles.color,
			roles.hoist,
			roles.position,
			roles.permissions,
			roles.managed,
			roles.mentionable
		))
		AclientStatus.push(new ClientStatus(
			clientStatus.desktop,
			clientStatus.mobile,
			clientStatus.web
		)) 
		Aactivities.push(new Activity(
			activities.name,
			activities.type,
			activities.url,
			activities.created_at,
			activities.timestamp,
			activities.application_id,
			activities.details,
			activities.emoji,
			activities.party,
			activities.assets,
			activities.secrets,
			activities.instance,
			activities.flags
		))
		Apresences.push(new PresenceUpdate(
			user,
			roles,
			presences.status,
			presences.guild,
			presences.stattus,
			presences.activities,
			clientStatus,
			presences.premium_since,
			presences.nick
		))
		Amembers.push(new GuildMember(
			user,
			members.nick,
			roles,
			members.joined_at,
			members.premium_since,
			members.deaf,
			members.mute
		))
		AChannels.push(new Channel(
			channels.id,
			channels.type,
			channels.guild,
			channels.position,
			channels.permission_overwrites,
			channels.name,
			channels.topic,
			channels.nsfw,
			channels.bitrate,
			channels.rate_limit,
			channels.rate_limit_per_user,
			channels.recipients,
			channels.icon,
			channels.owner_id,
			channels.application_id,
			channels.parent_id,
			channels.last_pin_timestamp
		))
		client.emit('guildCreate', (puck));
	}
}
