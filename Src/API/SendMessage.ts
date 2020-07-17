import { Client } from '../Client/Client';
import { CONSTANTS } from '../Constants/Constants';
import { IAPIParams } from '../Interfaces/APIParams';
import fetch from 'node-fetch';

export default async function sendMessage(client: Client, options: IAPIParams) {
	let fetched = await fetch(
		`${CONSTANTS.API}/channels/${options.channelID!}/messages`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bot ${client.token}`
			},
			body: JSON.stringify({
				content: options.content!,
				tts: options.tts !== undefined ? options.tts : false
			})
		}
	);

	return await fetched.json();
}
