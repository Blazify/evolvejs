/* eslint-disable no-mixed-spaces-and-tabs */

import { RestAPIHandler } from "./RestAPIHandler";
import { EvolveClient } from "../EvolveClient";
import { Objex } from "@evolvejs/objex";
import { Endpoints } from "../../Utils/Endpoints";

/**
 * RestAPI Class
 *
 * @param {client} - Your EvolveClient
 */
export class RestAPI {
  private _client!: EvolveClient;
  private _handler!: Objex<string, RestAPIHandler>;

  constructor(client: EvolveClient) {
    Object.defineProperty(this, "_client", {
      value: client,
      enumerable: false,
      writable: false,
      configurable: false,
    });
    Object.defineProperty(this, "_handler", {
      value: new Objex<string, RestAPIHandler>(),
      enumerable: false,
      writable: false,
      configurable: false,
    });
  }

  /**
   *
   * @param endpoint
   * Gets a Handler for the specific endpoint or creates a new one
   */
  public endpoint(endpoint: string): RestAPIHandler {
    if (this._handler.has(endpoint)) return this._handler.get(endpoint)!!;
    else {
      this._handler.set(endpoint, new RestAPIHandler(this._client, endpoint));
      return this._handler.get(endpoint)!!;
    }
  }

  public get active(): boolean {
    return this.activeRequests.length === 0;
  }

  public get activeRequests(): RestAPIHandler[] {
    const activeArray: RestAPIHandler[] = [];
    for (const [_, v] of this._handler.filter(
      (handler) => handler.active === true
    )) {
      activeArray.push(v);
    }

    return activeArray;
  }
}
