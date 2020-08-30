import { EvolveClient, CONSTANTS } from "../..";
import { IAPIParams } from "../../Interfaces/Interfaces";
import fetch from "node-fetch";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function(client: EvolveClient, options: IAPIParams): Promise<any> {
	try {
		if(options.method !== "POST") {
			const fetched = await fetch(`${CONSTANTS.Api}/${options.endpoint}`, {
				method: options.method,
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bot ${client.token}`
				},
			});
			return fetched.json();
		} else {
			const fetched = await fetch(`${CONSTANTS.Api}/${options.endpoint}`, {
				method: options.method,
				headers: {
					"Content-Type": "application/json",
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
