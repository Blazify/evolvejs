import { Client } from '../Client/Client';
import { CONSTANTS } from '../Constants/Constants';
import { IAPIParams } from '../Interfaces/APIParams';
import fetch from 'node-fetch';

export default async function(client: Client, options: IAPIParams) {
	let fetched = await fetch(`${CONSTANTS.API}/${options.endpoint}`, {
		method: options.method,
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bot ${client.token}`
		},
		body: JSON.stringify(options.content)
	});

	return await fetched.json();
}