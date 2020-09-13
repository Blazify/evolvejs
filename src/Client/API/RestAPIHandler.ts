/* eslint-disable @typescript-eslint/no-explicit-any */
import fetch from "node-fetch";
import { EvolveClient, IAPIParams, CONSTANTS } from "../..";
import { promisify } from "util";

export class RestAPIHandler {
	constructor(public client: EvolveClient) {}

	public async fetch(options: IAPIParams): Promise<any> {
		try {
			if (options.method !== "POST") {
				const fetched = await fetch(`${CONSTANTS.Api}/${options.endpoint}`, {
					method: options.method,
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bot ${this.client.token}`,
					},
				});

				if(fetched.status === 429) {
					const json = await fetched.json();
					this.client.logger.warn(`Rate Limited. Reason: ${json.body}, Global: ${json.global}\n Don't Worry, your request will be retried after ${json.retry_after}`);
					promisify(setTimeout)(json.retry_after).then(() => {
						return this.fetch(options);
					});
				}

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

				if(fetched.status === 429) {
					const json = await fetched.json();
					this.client.logger.warn(`Rate Limited. Reason: ${json.body}, Global: ${json.global}\n Don't Worry, your request will be retried after ${json.retry_after}`);
					promisify(setTimeout)(json.retry_after).then(() => {
						return this.fetch(options);
					});
				}
				
				return fetched.json();
			}
		} catch (e) {
			this.client.logger.error(e);
		}
	}
}
