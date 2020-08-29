import { EvolveClient } from '../Client/EvolveClient';
import { Payload } from '../Interfaces/Interfaces';
import { EVENTS } from '../Constants/Events';
import { Objex } from '@evolvejs/objex';
import { Snowflake } from '../Constants/Constants';
import Emoji from '../Structures/Guild/Emoji';

export default class {
	constructor(client: EvolveClient, payload: Payload, shard: number) {
		const { guild_id, emojis } = payload.d

		(async() => {
			let guild = await client.api.getGuild(guild_id)
			let emojiObjex: Objex<Snowflake | null, Emoji> = new Objex()
			for(let emoji of emojis) {
				emojiObjex.set(emoji.id, new Emoji(emoji))
			}
			client.emit(EVENTS.GUILD_EMOJIS_UPDATE, emojiObjex, guild)
		})
	}
}
