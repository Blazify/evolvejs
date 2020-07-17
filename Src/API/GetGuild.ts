import { Client } from '../Client/Client';
import { CONSTANTS } from '../Constants/Constants';
import { IAPIParams } from '../Interfaces/APIParams';
import fetch from 'node-fetch';

export default async function GetGuild(client: Client, options: IAPIParams) {
	let fetched = await fetch(`${CONSTANTS.API}/guilds/${options.guildID!}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bot ${client.token}`
		}
	});

	return await fetched.json();
}
