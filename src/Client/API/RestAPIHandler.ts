import { EvolveClient, CONSTANTS } from '../..';
import { IAPIParams } from '../../Interfaces/Interfaces';
import fetch from 'node-fetch';


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
			return fetched.json();
		} else {
			let fetched = await fetch(`${CONSTANTS.Api}/${options.endpoint}`, {
				method: options.method,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bot ${client.token}`
				},
				body: JSON.stringify(options.content)
			});
			return fetched.json();
		}
	} catch (e) {
		throw Error(e);
	}
}
