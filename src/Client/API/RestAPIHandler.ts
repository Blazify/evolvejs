
import fetch from "node-fetch";
import { EvolveClient, IAPIParams, CONSTANTS } from "../..";


export class RestAPIHandler {
	constructor(public client: EvolveClient) {
	} 

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public async fetch(options: IAPIParams): Promise<any> {
		try {
			if(options.method !== "POST") {
				const fetched = await fetch(`${CONSTANTS.Api}/${options.endpoint}`, {
					method: options.method,
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bot ${this.client.token}`
					},
				});
				return fetched.json();
			} else {
				const fetched = await fetch(`${CONSTANTS.Api}/${options.endpoint}`, {
					method: options.method,
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bot ${this.client.token}`
					},
					body: JSON.stringify(options.content)
				});
				return fetched.json();
			}
		} catch(e) {
			throw Error(e);
		}
	}
}
