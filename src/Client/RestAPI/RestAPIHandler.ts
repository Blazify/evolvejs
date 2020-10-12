/* eslint-disable @typescript-eslint/no-explicit-any */
import fetch from "node-fetch";
import { EvolveClient, IAPIParams, CONSTANTS } from "../..";
import { promisify } from "util";
import DiscordRejection from "./DiscordRejection";
import { EVENTS } from "../..";

export class RestAPIHandler {
  private _cooldown: number | null = null;
  constructor(public client: EvolveClient) {}

  public async fetch<T>(options: IAPIParams): Promise<T> {
    try {
      let body;
      if (options.postType == "Message") {
        body = JSON.stringify(options.message);
      } else if (options.postType === "Channel") {
        body = JSON.stringify(options.channel);
      } else if (options.postType === "Integration") {
        body = JSON.stringify(options.integration);
      } else if (options.postType === "[Message]") {
        body = JSON.stringify(options.messages);
      } else if (options.postType === "JSON") {
        body = JSON.stringify(options.json_params);
      } else body = undefined;

      if (this._cooldown) {
        await promisify(setTimeout)(this._cooldown);
        this._cooldown = null;
      }

      const fetched = await fetch(`${CONSTANTS.Api}/${options.endpoint}`, {
        method: options.method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bot ${this.client.token}`,
        },
        body,
      });
      if (fetched.headers && fetched.status === 429) {
        const json = await fetched.json();
        const remaining = Number(
          fetched.headers.get("x-ratelimit-remaining") ?? "1"
        );
        let resetAfter: number =
          Number(
            fetched.headers.get("x-ratelimit-reset-after") ?? json.retry_after
          ) * 1000;
        if (remaining == 0) {
          this._cooldown = resetAfter;
          await promisify(setTimeout)(resetAfter);
          this._cooldown = null;
          return await this.fetch(options);
        }
      }

      if (!fetched.status.toString().startsWith("20")) {
        const err = await fetched.json();
        const rejection = new DiscordRejection({
          code: err.code,
          msg: err.message,
          http: fetched.status,
          path: options.endpoint,
        });

        if (this.client.listenerCount(EVENTS.API_ERROR) < 1) {
          throw rejection;
        } else throw this.client.emit(EVENTS.API_ERROR, rejection);
      }
      if (!(await fetched.json())) {
        const rejection =
          "Fetched JSON returned undefined! This should NOT occur under any circumstance";
        if (this.client.listenerCount(EVENTS.API_ERROR) < 1) {
          throw rejection;
        } else throw this.client.emit(EVENTS.API_ERROR, rejection);
      }
      return await fetched.json();
    } catch (e) {
      this.client.emit(EVENTS.API_ERROR, e);
      if (this.client.listenerCount(EVENTS.API_ERROR) < 1)
        throw this.client.logger.error(e);
    }

    return this.fetch(options);
  }
}
