import { EvolveClient } from '../Client/EvolveClient';
import { ClientUser } from '../Client/ClientUser';
import { Guild } from '../Structures/Guild/Guild';
import Role from '../Structures/Guild/Role';
import { GuildMember } from '../Structures/Guild/GuildMember';
import { User } from '../Structures/User/User';
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
	public client: EvolveClient;
	public payload: Payload;

	constructor(client: EvolveClient, payload: Payload, shard: number) {
		this.client = client;
		this.payload = payload;

		(async () => await this.generate(payload))();
		client.emit(EVENTS.READY, shard);
	}

	private async generate(payload: Payload) {
		const { user, guilds } = payload.d;

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

			const guild = new Guild(x, this.client);
			if(this.client.options.enableGuildCache) this.client.guilds.set(guild.id, guild);

			let channels = await this.client.api.getGuildChannels(g.id);
			  for(let c of channels) {
				  guild.channels.set(c.id, c)
			  }

			for (let role of x.roles) {
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

				g.roles.set(r.id, r);
			}

			let members = await this.client.api.getGuildMembers(guild.id);
			for (let m of members) {
				guild.members.set(m.user!.id, m);
			

			if (x.emojis.length) {
				for (let e of x.emojis) {
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
					if(this.client.options.enableEmojiCache) this.client.emojis.set(emoji.id, emoji);
				}
			}

			let user = await this.client.api.getUser(m.user!.id);

			m.user = user;
		}
			if(this.client.options.enableUsersCache) this.client.users.set(user.id, user);
		}
	}
}
