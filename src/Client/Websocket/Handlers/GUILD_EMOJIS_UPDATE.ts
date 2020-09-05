import { EvolveClient, EVENTS, Payload, Emoji } from "../../..";
import { Objex } from "@evolvejs/objex";
import { GuildEmojiEvents } from "../../Events/GuildEmojiEvents";

export default class {
	constructor(client: EvolveClient, payload: Payload, shard: number) {
		const { guild_id, emojis } = payload.d;

		(async () => {
			const guild = await client.api.getGuild(guild_id);
			const emojiObjex: Objex<string | null, Emoji> = new Objex();
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
