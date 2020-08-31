
import fetch from "node-fetch";
import { EvolveClient, IAPIParams, CONSTANTS } from "../..";
import { promisify } from "util";


export class RestAPIHandler {
	private limiting: Set<number> = new Set()  
	constructor(public client: EvolveClient) {
	} 

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public async fetch(options: IAPIParams): Promise<any> {
		if(this.limiting.has(5000)) {
			promisify(setTimeout)(5000).then(async () => {
				try {
					this.limiting.clear();
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

				} catch (e) {
					throw Error(e);
				}
			});
		} else {
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
}
