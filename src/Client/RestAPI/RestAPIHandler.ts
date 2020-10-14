import fetch from "node-fetch";
import { EvolveClient, IAPIParams, CONSTANTS } from "../..";
import { promisify } from "util";
import DiscordRejection from "./DiscordRejection";
import { EVENTS } from "../..";
import { AsyncronousQueue } from "../../Utils/AsyncronousQueue";

export class RestAPIHandler {
  private _cooldown: number = 0;
  private _queue!: AsyncronousQueue;
  private _endpoint!: string;
  private _client!: EvolveClient;

  constructor(client: EvolveClient, endpoint: string) {
    Object.defineProperty(this, "_client", {
      value: client,
      enumerable: false,
      writable: false,
      configurable: false,
    });
    Object.defineProperty(this, "_endpoint", {
      value: endpoint,
      enumerable: false,
      writable: false,
      configurable: false,
    });
    Object.defineProperty(this, "_queue", {
      value: new AsyncronousQueue(),
      enumerable: false,
      writable: false,
      configurable: false,
    });
  }

  public get active(): boolean {
    return this._queue.resolved;
  }

  public async get<T>(id?: string): Promise<T> {
    let endpoint: string = this._endpoint;
    if (id) endpoint = endpoint.replace(":id", id);
    return this._fetch({ endpoint, method: "GET", json_params: undefined });
  }

  public async put<T>(json: object | string, id?: string): Promise<T> {
    let endpoint: string = this._endpoint;
    if (id) endpoint = endpoint.replace(":id", id);
    return this._fetch({
      endpoint,
      method: "PUT",
      json_params: typeof json == "object" ? JSON.stringify(json) : json,
    });
  }

  public async delete(id?: string): Promise<void> {
    let endpoint: string = this._endpoint;
    if (id) endpoint = endpoint.replace(":id", id);
    return this._fetch({ endpoint, method: "DELETE", json_params: undefined });
  }

  public async post<T>(json: object | string, id?: string): Promise<T> {
    let endpoint: string = this._endpoint;
    if (id) endpoint = endpoint.replace(":id", id);
    return this._fetch({
      endpoint,
      method: "POST",
      json_params: typeof json == "object" ? JSON.stringify(json) : json,
    });
  }

  public async patch<T>(json: object | string, id?: string): Promise<T> {
    let endpoint: string = this._endpoint;
    if (id) endpoint = endpoint.replace(":id", id);
    return this._fetch({
      endpoint,
      method: "PATCH",
      json_params: typeof json == "object" ? JSON.stringify(json) : json,
    });
  }

  private async _fetch<T>(options: NewIAPIParams): Promise<T> {
    await this._queue.delay();
    const whileExectued = RestAPIHandler.globalTimeout;
    await promisify(setTimeout)(whileExectued);
    RestAPIHandler.globalTimeout -= whileExectued;
    try {
      await promisify(setTimeout)(this._cooldown);
      this._cooldown = 1;
      const res = await fetch(`${CONSTANTS.Api}${options.endpoint}`, {
        method: options.method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bot ${this._client.token}`,
        },
        body: options.json_params,
      });

      const json = await res.json();

      if (res.headers) {
        const resetAfter =
          Number(
            res.headers.get("x-ratelimit-reset-after") ?? json.retry_after
          ) * 1000;
        if (this._cooldown !== 0) {
          this._cooldown += resetAfter;
        } else this._cooldown = resetAfter;
      }

      if (res.status === 429) {
        if (json.global) RestAPIHandler.globalTimeout += this._cooldown;
        await promisify(setTimeout)(this._cooldown);
        return this._fetch<T>(options);
      }

      if (!res.ok) {
        const rejection = new DiscordRejection({
          code: json.code,
          msg: json.message,
          http: res.status,
          path: options.endpoint,
        });

        if (this._client.listenerCount(EVENTS.API_ERROR) < 1) {
          throw rejection;
        } else throw this._client.emit(EVENTS.API_ERROR, rejection);
      }
      return json;
    } catch (e) {
      if (this._client.listenerCount(EVENTS.API_ERROR) < 1)
        throw this._client.logger.error(e);
      else throw this._client.emit(EVENTS.API_ERROR, e);
    } finally {
      this._cooldown = 1;
      this._queue.dequeue();
    }
  }

  public dequeueAll(logging = true) {
    try {
      for (let i = 0; i < this._queue.notResolved; i++) {
        try {
          this._queue.dequeue();
          if (logging)
            this._client.logger.info(
              `Promise with index ${i} in the ${this._endpoint} rest endpoint...`
            );
        } catch (e) {
          throw new Error(e);
        }
      }
    } catch (e) {
      throw this._client.logger.error(e);
    }
  }

  static globalTimeout = 1;
}

interface NewIAPIParams {
  endpoint: string;
  method: "GET" | "POST" | "DELETE" | "PUT" | "PATCH";
  json_params: string | undefined;
}
