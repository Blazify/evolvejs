import { EvolveClient, EVENTS, Payload } from "../../..";

export default class {
	constructor(client: EvolveClient, payload: Payload, shard: number) {
		const { guild_id, channel_id, last_pin_timestamp } = payload.d(async () => {
			const guild = await client.api.getGuild(guild_id);
			const channel = await client.api.getChannel(channel_id);
			client.emit(
				EVENTS.CHANNEL_PINS_UPDATE,
				guild,
				channel,
				last_pin_timestamp,
				shard
			);
		});
	}
}
