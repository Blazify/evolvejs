/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ClientUser } from "../../ClientUser";
import { Guild } from "../../../Structures/Guild/Guild";
import {Role} from "../../../Structures/Guild/Role";
import Emoji from "../../../Structures/Guild/Emoji";
import { Payload } from "../../../Interfaces/Interfaces";
import { EvolveClient, EVENTS } from "../../..";

export default class {
	public client: EvolveClient;
	public payload: Payload;

	constructor(client: EvolveClient, payload: Payload) {
		this.client = client;
		this.payload = payload;

		(async () => await this.generate(payload))();
		client.emit(EVENTS.READY);
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

		console.log(guilds);
		for (let i = 0; i < guilds.length; i++) {
			const x = guilds[i];

			if(x.unavailable) return;

			const g = await this.client.api.getGuild(x.id);

			const guild = new Guild(x, this.client);
			if(this.client.options.enableGuildCache) this.client.guilds.set(guild.id, guild);

			const channels = await this.client.api.getGuildChannels(g.id);

			console.log(guild);
			for(let i = 0; i < channels.length; i++) guild.channels.set(channels[i].id, channels[i]);
			for (let i = 0; i < x.roles.length; i++) {
				const role = x.roles[i];
				const r = new Role(role);

				g.roles.set(r.id, r);
				this.client.roles.set(r.id, r);
			}

			const members = await this.client.api.getGuildMembers(guild.id);
			for (let i = 0; i < members.length; i++) {
				const m = members[i];

				guild.members.set(m.user!.id, m);


				if (x.emojis.length) {
					for (let i = 0; i < x.emojis.length; i++) {
						const emoji = new Emoji(x.emojis[i]);

						guild.emojis.set(emoji.id, emoji);
						if(this.client.options.enableEmojiCache) this.client.emojis.set(emoji.id, emoji);
					}
				}

				const user = await this.client.api.getUser(m.user!.id);

				m.user = user;
			}
			if(this.client.options.enableUsersCache) this.client.users.set(user.id, user);
		}
	}
}
