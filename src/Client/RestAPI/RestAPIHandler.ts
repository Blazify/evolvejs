/* eslint-disable @typescript-eslint/no-explicit-any */
import fetch from "node-fetch";
import { EvolveClient, IAPIParams, CONSTANTS } from "../..";
import { promisify } from "util";
import DiscordRejection from "./DiscordRejection";
import { EVENTS } from "../..";

export class RestAPIHandler {
  private _cooldown: number = 0;
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

      await promisify(setTimeout)(this._cooldown);
      this._cooldown = 0;

      const fetched = await fetch(`${CONSTANTS.Api}/${options.endpoint}`, {
        method: options.method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bot ${this.client.token}`,
        },
        body,
      });
      const json = await fetched.json();
      if (fetched.headers && !fetched.ok) {
        this._cooldown =
          Number(
            fetched.headers.get("x-ratelimit-reset-after") ?? json.retry_after
          ) * 1000;
        const check: boolean = this._cooldown !== 0;
        const loop: () => Promise<boolean> = async (): Promise<boolean> => {
          if (check) {
            await promisify(setTimeout)(this._cooldown);
            return loop();
          } else return true;
        };

        if (await loop()) return await this.fetch(options);
      }

      if (!fetched.ok) {
        const rejection = new DiscordRejection({
          code: json.code,
          msg: json.message,
          http: fetched.status,
          path: options.endpoint,
        });

        if (this.client.listenerCount(EVENTS.API_ERROR) < 1) {
          throw rejection;
        } else throw this.client.emit(EVENTS.API_ERROR, rejection);
      }
      return json;
    } catch (e) {
      if (this.client.listenerCount(EVENTS.API_ERROR) < 1)
        throw this.client.logger.error(e);
      else throw this.client.emit(EVENTS.API_ERROR, e);
    }
  }
}
