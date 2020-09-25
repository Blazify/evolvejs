/* eslint-disable @typescript-eslint/no-explicit-any */
import { OPCODE } from "..";
import { ChannelsManager } from "../Client/Managers/ChannelsManger";
import { EmojisManager } from "../Client/Managers/EmojisManager";
import { GuildsManager } from "../Client/Managers/GuildsManager";
import { MessagesManager } from "../Client/Managers/MessagesManager";
import { RolesManager } from "../Client/Managers/RolesManager";
import { UsersManager } from "../Client/Managers/UsersManager";
import { Overwrite } from "../Structures/Channel/Overwrite";
import { CHANNELTYPES } from "../Utils/Constants";
import { MessageEmbed } from "../Utils/Embed/MessageEmbed";

export interface CacheProviders {
  guilds?: GuildsManager;
  channels?: ChannelsManager;
  users?: UsersManager;
  messages?: MessagesManager;
  roles?: RolesManager;
  emojis: EmojisManager;
}

export interface IAPIParams {
  endpoint: string;
  method: "GET" | "POST" | "DELETE" | "PUT";
  postType?: "Message" | "Channel";
  message?: MessageOptions;
  channel?: ChannelOptions;
}

export interface MessageOptions {
  content?: string;
  tts?: boolean;
  embed?: MessageEmbed;
}

export interface ChannelOptions {
  name: string;
  type?: CHANNELTYPES;
  topic?: string;
  bitrate?: string;
  user_limit?: number;
  rate_limit_per_user?: number;
  position?: number;
  permission_overwrites?: Array<Overwrite>;
  parent_id?: string;
  nsfw?: boolean;
}

export interface Payload {
  op: OPCODE;
  t?: string;
  s?: number;
  d?: any;
}
