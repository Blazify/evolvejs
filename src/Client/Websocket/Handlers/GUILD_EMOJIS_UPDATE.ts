import { EvolveClient, EVENTS, Payload, Emoji } from "../../../mod.ts";
import { GuildEmojiEvents } from "../../Events/GuildEmojiEvents.ts";

export default class {
	constructor(client: EvolveClient, payload: Payload, shard: number) {
		const { guild_id, emojis } = payload.d;

		(async () => {
			const guild = await client.rest.getGuild(guild_id);
			const emojiObjex: Map<string | null, Emoji> = new Map();
			for (const emoji of emojis) {
				emojiObjex.set(emoji.id, new Emoji(emoji));
			}
			client.emit(
				EVENTS.GUILD_EMOJIS_UPDATE,
				new GuildEmojiEvents(client, emojiObjex, guild, shard)
			);
		})();
	}
}
