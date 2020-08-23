import { EvolveClient } from '../Client/EvolveClient';
import { CONSTANTS } from '../Constants/Constants';
import { IAPIParams } from '../Interfaces/Interfaces';
import fetch from 'node-fetch';
import { EvolveErr } from '../Client/Error';

export default async function(client: EvolveClient, options: IAPIParams) {
	try {
		if(options.method !== "POST") {
			let fetched = await fetch(`${CONSTANTS.Api}/${options.endpoint}`, {
				method: options.method,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bot ${client.token}`
				},
			});
			return await fetched.json();
		} else {
			let fetched = await fetch(`${CONSTANTS.Api}/${options.endpoint}`, {
				method: options.method,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bot ${client.token}`
				},
				body: JSON.stringify(options.content)
			});
			return await fetched.json();
		}
	} catch (e) {
		throw new EvolveErr('APIError', e.message);
	}
}
