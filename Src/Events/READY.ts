import { Client, ClientUser } from '..';
import { Payload } from "../Interfaces/Payload";
import Guild from '../Structures/Guild';
import Role from '../Structures/Role';
import Channel from '../Structures/Channel';
import GuildMember from '../Structures/GuildMember';
import User from '../Structures/User';
import Emoji from '../Structures/Emoji';

export default async function (client: Client, payload: Payload) {
		const { user, guilds } = payload.d;
		client.user = new ClientUser(
			user.username,
			user.discriminator,
			user.verified,
			user.id,
			user.flags,
			user.email,
			user.bot,
			user.avatar
		);

		for(var g of guilds) {
			g = await client.api.getGuild(g.id);
			g = new Guild(
			g.id,
			g.name,
			g.icon,
			g.splash,
			g.discovery_splash,
			g.owner,
			g.owner_id,
			g.permissions,
			g.region,
			g.afk_channel_id,
			g.afk_timeout,
			g.embed_enabled,
			g.embed_channel_id,
			g.verification_level,
			g.default_message_notifications,
			g.explicit_content_filter,
			g.roles,
			g.emojis,
			g.features,
			g.mfa_level,
			g.application_id,
			g.widget_enabled,
			g.widget_channel_id,
			g.system_channel_id,
			g.rules_channel_id,
			g.joined_at,
			g.large,
			g.unavailable,
			g.member_count,
			g.voice_states,
			g.members,
			g.channels,
			g.presences,
			g.max_presences,
			g.max_members,
			g.vanity_url_code,
			g.description,
			g.banner,
			g.premium_tier,
			g.premium_subscription_count,
			g.preferred_locale,
			g.public_updates_channel_id,
			g.max_video_channel_users,
			g.approximate_member_count,
			g.approximate_presence_count
			)
			client.guilds.set(g.id, g)
		}
		if(g.emojis !== []) {
			for(let e of g.emojis) {
				e = new Emoji(
					e.id,
					e.name,
					e.roles,
					e.user,
					e.req_colons,
					e.managed,
					e.animated,
					e.available
				)
				g.emoji.push(e)
				client.emojis.set(e.id, e)
			}
		}
		let members = await client.api.getGuildMembers(g.id)
			for(let m of members) {

				m = new GuildMember(
					m.user,
					m.nick,
					m.roles,
					m.joined_at,
					m.premium_since,
					m.deaf,
					m.mute
				)

				g.members.push(m)
				let user = await client.api.getUser(m.user.id)

				user = new User(
					user.id,
					user.username,
					user.discriminator,
					user.avatar,
					user.bot,
					user.system,
					user.mfa_enabled,
					user.locale,
					user.verified,
					user.email,
					user.flags,
					user.premium_type,
					user.public_flags
				)

				m.user = user
				client.users.set(user.id, user)
			}

		for(let role of g.roles) {
			let r = new Role(
				role.id,
				role.name,
				role.color,
				role.hoist,
				role.position,
				role.permissions,
				role.managed,
				role.metionable
			)


			client.roles.set(role.id, r);
			g.roles.push(r);
		}
		let channels = await client.api.getGuildChannels(g.id);
			for(let c of channels) {
			c = new Channel(
				c.id,
				c.type,
				g,
				c.position,
				c.permission_overwrites,
				c.name,
				c.topic,
				c.nsfw,
				c.bitrate,
				c.rate_limit,
				c.rate_limit_per_user,
				c.recipients,
				c.icon,
				c.owner_id,
				c.application_id,
				c.parent_id,
				c.last_pin_timestamp
			)
			g.channels.push(c)
			client.channels.set(c.id, c)
			}


		client.emit('ready');
	}
