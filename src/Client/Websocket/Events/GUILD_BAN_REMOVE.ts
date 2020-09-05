import { EvolveClient, EVENTS, Payload, User } from "../../..";

export default class {
	constructor(client: EvolveClient, payload: Payload, shard: number) {
		(async () => {
			// eslint-disable-next-line prefer-const
			let { guild_id, user } = payload.d;
			const guild = await client.api.getGuild(guild_id);
			user = new User(user);
			client.emit(EVENTS.GUILD_BAN_REMOVE, guild, user, shard);
		})();
	}
}
