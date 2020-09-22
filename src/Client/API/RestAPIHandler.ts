/* eslint-disable @typescript-eslint/no-explicit-any */
import { EvolveClient, IAPIParams, CONSTANTS } from "../../mod.ts";
import { sleep } from "https://deno.land/x/sleep/mod.ts";

export class RestAPIHandler {
  private ratelimited = 0;
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

  			if (fetched.status === 429) {
  				const json = await fetched.json();
  				this.client.logger.warn(
  					`Rate Limited. Reason: ${json.body}, Global: ${json.global}\n Don't Worry, your request will be retried after ${json.retry_after}`
  				);
  				this.ratelimited += 1;
  				if (this.ratelimited === 50) {
  					this.client.sharder.shutdown();
  				}
  				sleep(json.retry_after).then(() => {
  					return this.fetch(options);
  				});
  			}

  			return fetched.json();
  		} else {
  			let body;
  			if (options.postType == "Message") {
  				body = JSON.stringify(options.message);
  			} else if (options.postType == "Channel") {
  				body = JSON.stringify(options.channel);
  			}

  			if (!body)
  				throw this.client.logger.error("No Post Type Given in POST fetching");

  			const fetched = await fetch(`${CONSTANTS.Api}/${options.endpoint}`, {
  				method: options.method,
  				headers: {
  					"Content-Type": "application/json",
  					Authorization: `Bot ${this.client.token}`,
  				},
  				body: body,
  			});

  			if (fetched.status === 429) {
  				const json = await fetched.json();
  				this.client.logger.warn(
  					`Rate Limited. Reason: ${json.body}, Global: ${json.global}\n Don't Worry, your request will be retried after ${json.retry_after}`
  				);
  				sleep(json.retry_after).then(() => {
  					return this.fetch(options);
  				});
  			}

  			return fetched.json();
  		}
  	} catch (e) {
  		throw this.client.logger.error(e);
  	}
  }
}
