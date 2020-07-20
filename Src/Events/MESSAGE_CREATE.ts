import { Client } from '../Client/Client';
import { Payload } from '../Interfaces/Payload';
import GuildMember from '../Structures/GuildMember';
import Guild from '../Structures/Guild';
import User from '../Structures/User';
import { Message } from '../Structures/Message';

export default class {
	constructor(client: Client, payload: Payload) {
		const { d } = payload;

		const SendMessage = async (content: string): Promise<Message> => {
			let msg = await client.api.sendMessage(content, d.channel_id);
			msg = new Message(
				msg.timestamp,
				msg.id,
				msg.pinned,
				msg.mentions,
				msg.mention_roles,
				msg.mention_everyone,
				msg.member,
				msg.author,
				msg.edited_timestamp,
				msg.attachments,
				msg.content,
				d.guild_id,
				SendMessage,
				async (time: number = 0) => {
					setTimeout(async () => {
						return await client.api.deleteMessage(msg.id, msg.channel_id);
					}, time);
				}
			);
			return msg;
		};

		const message: Message = new Message(
			d.timestamp,
			d.id,
			d.pinned,
			d.mentions,
			d.mention_roles,
			d.mention_everyone,
			d.member,
			d.author,
			d.edited_timestamp,
			d.attachments,
			d.content,
			d.guild_id,
			SendMessage,
			async (time: number = 0) => {
				setTimeout(async () => {
					return await client.api.deleteMessage(d.id, d.channel_id);
				}, time);
			}
		);
		client.emit('messageSent', message);
	}
}
