import { EvolveClient } from '../Client/EvolveClient';
import { Payload } from '../Interfaces/Interfaces';
import { EVENTS } from '../Constants/Events';
import { Objex } from '@evolvejs/objex';
import { Snowflake } from '../Constants/Constants';
import { Message } from '../Structures/Message/Message';

export default class {
	constructor(client: EvolveClient, payload: Payload, shard: number) {
		const { ids, channel_id, guild_id } = payload.d
		const messageObjex: Objex<Snowflake, Message> = new Objex()
		for(let id of ids) {
			messageObjex.set(id, client.messages.get(id)!)
		}

		client.emit(EVENTS.MESSAGE_DELETE_BULK, messageObjex, client.channels.get(channel_id), client.guilds.get(guild_id));
	}
}
