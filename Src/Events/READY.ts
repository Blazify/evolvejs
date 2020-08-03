import { Client } from '../Client/Client';
import { ClientUser } from '../Client/ClientUser';
import Guild from '../Structures/Guild/Guild';
import Role from '../Structures/Guild/Role';
import Channel from '../Structures/Channel/Channel';
import GuildMember from '../Structures/Guild/GuildMember';
import User from '../Structures/User/User';
import Emoji from '../Structures/Guild/Emoji';
import { IGuild } from '../Interfaces/GuildOptions';
import { Payload } from '../Interfaces/Interfaces';
import { EVENTS } from '../Constants/Events';
import { CHANNELTYPES } from '../Constants/Constants';
import CategoryChannel from '../Structures/Channel/CategoryChannel';
import DMChannel from '../Structures/Channel/DMChannel';
import GroupChannel from '../Structures/Channel/GroupChannel';
import NewsChannel from '../Structures/Channel/NewsChannel';
import StoreChannel from '../Structures/Channel/StoreChannel';
import TextChannel from '../Structures/Channel/TextChannel';
import VoiceChannel from '../Structures/Channel/VoiceChannel';

export default class {
	public client: Client;
	public payload: Payload;

	constructor(client: Client, payload: Payload) {
		this.client = client;
		this.payload = payload;

		(async () => await this.generate(payload))();
		client.emit(EVENTS.READY);
	}

	private async generate(payload: Payload) {
		const { user, guilds }: { user: any; guilds: IGuild[] } = payload.d;

		this.client.user = new ClientUser(
			user.username,
			user.discriminator,
			user.verified,
			user.id,
			user.flags,
			user.email,
			user.bot,
			user.avatar
		);

		for (let x of guilds) {
			const g = await this.client.api.getGuild(x.id);
			const afkChannel = g.afk_channel_id
				? this.client.api.getChannel(g.afk_channel_id)
				: null;

			const guild = new Guild(g, this.client);
			this.client.guilds.set(guild.id, guild);

			let channels = await this.client.api.getGuildChannels(g.id);
			for (let c of channels) {
				if(c.type === CHANNELTYPES.Category) {
				guild.channels.set(c.id, new CategoryChannel(c, this.client));
				} else if(c.type === CHANNELTYPES.Direct) {
					guild.channels.set(c.id, new DMChannel(c, this.client));
				}
				else if(c.type === CHANNELTYPES.Group) {
					guild.channels.set(c.id, new GroupChannel(c, this.client));
				} else if(c.type === CHANNELTYPES.News) {
					guild.channels.set(c.id, new NewsChannel(c, this.client));
				} else if(c.type === CHANNELTYPES.Store) {
					guild.channels.set(c.id, new StoreChannel(c, this.client));
				} else if(c.type === CHANNELTYPES.Text) {
					guild.channels.set(c.id, new TextChannel(c, this.client));
				} else if(c.type === CHANNELTYPES.Voice) {
					guild.channels.set(c.id, new VoiceChannel(c, this.client));
				}
			}

			for (let role of g.roles) {
				let r = new Role(
					role.id,
					role.name,
					role.color,
					role.hoist,
					role.position,
					role.permissions,
					role.managed,
					role.mentionable
				);

				g.roles.push(r);
			}

			let members = await this.client.api.getGuildMembers(guild.id);
			for (var m of members) {
				const member = new GuildMember(
					m.user,
					m.nick,
					m.roles,
					m.joined_at,
					m.premium_since,
					m.deaf,
					m.mute
				);
				guild.members.set(m.id, member);
			}

			if (g.emojis.length) {
				for (let e of g.emojis) {
					const emoji = new Emoji(
						e.id,
						e.name,
						e.roles,
						e.user,
						e.req_colons,
						e.managed,
						e.animated,
						e.available
					);
					guild.emojis.set(emoji.id, emoji);
					this.client.emojis.set(emoji.id, emoji);
				}
			}

			let user = await this.client.api.getUser(m.user.id);

			user = new User(user)

			m.user = user;
			this.client.users.set(user.id, user);
		}
	}
}
