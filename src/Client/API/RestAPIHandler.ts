import fetch from "node-fetch";
import { EvolveClient, IAPIParams, CONSTANTS } from "../..";

export class RestAPIHandler {
	constructor(public client: EvolveClient) { }

	public async fetch(options: IAPIParams): Promise<void> {
		try {
			if (options.method !== "POST") {
				const fetched = await fetch(`${CONSTANTS.Api}/${options.endpoint}`, {
					method: options.method,
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bot ${this.client.token}`,
					},
				});
				return fetched.json();
			} else {
				const fetched = await fetch(`${CONSTANTS.Api}/${options.endpoint}`, {
					method: options.method,
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bot ${this.client.token}`,
					},
					body: JSON.stringify(options.message),
				});
				return fetched.json();
			}
		} catch (e) {
			this.client.logger.error(e);
		}
	}
}
