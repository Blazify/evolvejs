/* eslint-disable no-mixed-spaces-and-tabs */

import {
  Channel,
  ChannelOptions,
  ChannelResolver,
  ChannelTypes,
  Emoji,
  Guild,
  GuildMember,
  Invite,
  Message,
  MessageEmbed,
  TextChannel,
  User,
  IRole,
  Webhook,
  IGuild,
  Role,
  ChannelResolvable,
  IUser,
  IGuildMember,
  IMessage,
  IEmoji,
  IInvite,
  IWebhook,
  MessageReaction,
  IMessageReaction,
  INewsChannel,
} from "../..";
import { RestAPIHandler } from "./RestAPIHandler";
import { EvolveClient } from "../EvolveClient";
import { IGuildIntegration } from "../../Interfaces/Integration";
import { Overwrite } from "../..";
import { NewsChannel } from "../..";
import { promisify } from "util";
import { Objex } from "@evolvejs/objex";

/**
 * RestAPI Class
 *
 * @param {client} - Your EvolveClient
 */
export class RestAPI {
  private client!: EvolveClient;
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
  public get(endpoint: string): RestAPIHandler {
    if (this._handler.has(endpoint)) return this._handler.get(endpoint)!!;
    else {
      this._handler.set(endpoint, new RestAPIHandler(this.client, endpoint));
      return this._handler.get(endpoint)!!;
    }
  }
}
