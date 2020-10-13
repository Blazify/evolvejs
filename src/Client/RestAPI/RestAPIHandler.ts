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

  public async get<T>(id?: string): Promise<T> {
    let endpoint: string = this._endpoint;
    if (id) endpoint = endpoint.replace(":id", id);
    return this._fetch({ endpoint, method: "GET", json_params: undefined });
  }

  public async put<T>(json: Object, id?: string): Promise<T> {
    let endpoint: string = this._endpoint;
    if (id) endpoint = endpoint.replace(":id", id);
    return this._fetch({
      endpoint,
      method: "PUT",
      json_params: JSON.stringify(json),
    });
  }

  public async delete(id?: string): Promise<void> {
    let endpoint: string = this._endpoint;
    if (id) endpoint = endpoint.replace(":id", id);
    return this._fetch({ endpoint, method: "DELETE", json_params: undefined });
  }

  public async post<T>(json: Object, id?: string): Promise<T> {
    let endpoint: string = this._endpoint;
    if (id) endpoint = endpoint.replace(":id", id);
    return this._fetch({
      endpoint,
      method: "POST",
      json_params: JSON.stringify(json),
    });
  }

  public async patch<T>(json: Object, id?: string): Promise<T> {
    let endpoint: string = this._endpoint;
    if (id) endpoint = endpoint.replace(":id", id);
    return this._fetch({
      endpoint,
      method: "PATCH",
      json_params: JSON.stringify(json),
    });
  }

  private async _fetch<T>(options: NewIAPIParams): Promise<T> {
    await this._queue.delay();
    try {
      await promisify(setTimeout)(this._cooldown);
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
      this._queue.dequeue();
    }
  }
}

interface NewIAPIParams {
  endpoint: string;
  method: "GET" | "POST" | "DELETE" | "PUT" | "PATCH";
  json_params: string | undefined;
}
