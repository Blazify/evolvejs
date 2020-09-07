import { EvolveClient, EVENTS, Payload, User } from "../../..";
import { GuildBanEvents } from "../../Events/GuildBanEvents";

export default class {
	constructor(client: EvolveClient, payload: Payload, shard: number) {
		(async () => {
			// eslint-disable-next-line prefer-const
			let { guild_id, user } = payload.d;
			const guild = await client.rest.getGuild(guild_id);
			user = new User(user);
			client.emit(
				EVENTS.GUILD_BAN_REMOVE,
				new GuildBanEvents(client, user, guild, shard)
			);
		})();
	}
}
