/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { EvolveClient, Payload, EVENTS, ClientUser, Endpoints } from "../../../mod.ts";
import { IGuild } from "../../../Interfaces/GuildOptions.ts";
import { Guild } from "../../../Structures/Guild/Guild.ts";

export default class {
	public client: EvolveClient;
	public payload: Payload;

	constructor(client: EvolveClient, payload: Payload, shard: number) {
		this.client = client;
		this.payload = payload;

		(async () => await this.generate(payload, shard))();
		this.client.readyAt = Date.now();
		this.client.sessionID = payload.d.session_id;
	}

	private async generate(payload: Payload, shard: number) {
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

		for (const guild of guilds) {
			const fetched: Guild = new Guild(
				await this.client.rest.endpoint(Endpoints.GUILD).get<IGuild>(guild.id),
				this.client
			);

			for (const [k, v] of fetched.members) {
				if (this.client.options.enableUsersCache)
					if (v.user) this.client.users.set(k, v.user);
			}

			for (const [k, v] of fetched.channels) {
				if (this.client.options.enableChannelCache)
					this.client.channels.set(k, v);
			}

			for (const [k, v] of fetched.emojis) {
				if (this.client.options.enableEmojiCache) this.client.emojis.set(k, v);
			}

			for (const [k, v] of fetched.roles) {
				this.client.roles.set(k, v);
			}

			if (this.client.options.enableGuildCache)
				this.client.guilds.set(fetched.id, fetched);
		}

		this.client.emit(EVENTS.READY, shard);
	}
}
