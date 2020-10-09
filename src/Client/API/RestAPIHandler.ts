/* eslint-disable @typescript-eslint/no-explicit-any */
import fetch, { Headers } from "node-fetch";
import { EvolveClient, IAPIParams, CONSTANTS } from "../..";
import { promisify } from "util";

export class RestAPIHandler {
  private _ratelimited = 0;
  private _lastFetchReturnHeader!: Headers;
  constructor(public client: EvolveClient) {}

  public async fetch(options: IAPIParams): Promise<any> {
  	try {
  		if (this._lastFetchReturnHeader) {
  			const remaining = this._lastFetchReturnHeader.get(
  				"X-RateLimit-Remaining"
  			);
  			let resetAfter: unknown = this._lastFetchReturnHeader.get(
  				"X-RateLimit-Reset-After"
  			);
  			if (resetAfter) resetAfter = Number(resetAfter) * 1000;
  			if (remaining == "0") {
  				await promisify(setTimeout)((resetAfter as unknown) as number);
  			}
  		}
  		if (options.method !== "POST" && options.method !== "PATCH") {
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
  				this._ratelimited += 1;
  				if (this._ratelimited === 50) {
  					this.client.sharder.destroyAll();
  				}
  				await promisify(setTimeout)(json.retry_after);
  				return this.fetch(options);
  			}
  			this._lastFetchReturnHeader = fetched.headers;

  			return fetched.json();
  		} else {
  			let body;
  			if (options.postType == "Message") {
  				body = JSON.stringify(options.message);
  			} else if (options.postType == "Channel") {
  				body = JSON.stringify(options.channel);
  			} else if (options.postType == "Integration") {
  				body = JSON.stringify(options.integration);
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
  				this._ratelimited += 1;
  				if (this._ratelimited === 50) {
  					this.client.sharder.destroyAll();
  				}
  				await promisify(setTimeout)(json.retry_after);
  				return this.fetch(options);
  			}

  			this._lastFetchReturnHeader = fetched.headers;

  			return fetched.json();
  		}
  	} catch (e) {
  		throw this.client.logger.error(e);
  	}
  }
}
