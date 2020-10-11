/* eslint-disable @typescript-eslint/no-explicit-any */
import fetch, { Headers } from "node-fetch";
import { EvolveClient, IAPIParams, CONSTANTS } from "../..";
import { promisify } from "util";
import DiscordRejection from "./DiscordRejection";
import { EVENTS } from "../..";
import { posix } from "path";

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
      let body;
      if (options.postType == "Message") {
        body = JSON.stringify(options.message);
      } else if (options.postType == "Channel") {
        body = JSON.stringify(options.channel);
      } else if (options.postType == "Integration") {
        body = JSON.stringify(options.integration);
      } else if (options.postType == "[Message]") {
        body = JSON.stringify(options.messages);
      } else if (options.postType == "JSON") {
        body = JSON.stringify(options.json_params);
      } else body = null;

      if (!body)
        throw this.client.logger.error("No Post Type Given in POST fetching");

      const fetched = await fetch(
        `${CONSTANTS.Api}/${options.endpoint}`,
        body !== null
          ? {
              method: options.method,
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bot ${this.client.token}`,
              },
              body,
            }
          : {
              method: options.method,
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bot ${this.client.token}`,
              },
            }
      );

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
      if (fetched.status.toString().startsWith("20")) {
        const err = await fetched.json();
        const rejection = new DiscordRejection({
          code: err.code,
          msg: err.msg,
          http: fetched.status,
          path: options.endpoint,
        });

        this.client.emit(EVENTS.API_ERROR, rejection);
        if (this.client.listenerCount(EVENTS.API_ERROR) < 1) throw rejection;
      } else return fetched.json();
    } catch (e) {
      throw this.client.logger.error(e);
    }
  }
}
