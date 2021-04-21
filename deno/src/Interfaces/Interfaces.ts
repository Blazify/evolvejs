/* eslint-disable @typescript-eslint/no-explicit-any */
import { OPCODE } from "../mod.ts";
import { ChannelsManager } from "../Client/Managers/ChannelsManger.ts";
import { EmojisManager } from "../Client/Managers/EmojisManager.ts";
import { GuildsManager } from "../Client/Managers/GuildsManager.ts";
import { MessagesManager } from "../Client/Managers/MessagesManager.ts";
import { RolesManager } from "../Client/Managers/RolesManager.ts";
import { UsersManager } from "../Client/Managers/UsersManager.ts";
import { Overwrite } from "../Structures/Channel/Overwrite.ts";
import { CHANNELTYPES } from "../Utils/Constants.ts";
import { MessageEmbed } from "../Utils/Embed/MessageEmbed.ts";
import { ICreateGuildIntegration, IGuildIntegration } from "./Integration.ts";

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
 method: "GET" | "POST" | "DELETE" | "PUT" | "PATCH";
 postType?: "Message" | "Channel" | "Integration" | "[Message]" | "JSON";
 message?: MessageOptions;
 channel?: ChannelOptions;
 integration?: ICreateGuildIntegration;
 messages?: string[];
 json_params?: Object;
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

export interface Payload<D = any> {
 op: OPCODE;
 t?: string;
 s?: number;
 d?: D;
}
