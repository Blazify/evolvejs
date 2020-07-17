/// <reference types="node" />
import { EventEmitter } from 'events';
import { ClientUser } from './ClientUser';
import { Snowflake } from '../Constants/Constants';
import Guild from '../Structures/Guild';
import { Objex } from '@evolvejs/objex';
export declare class Client extends EventEmitter {
    token: string;
    guilds: Objex<string, Guild>;
    private ws;
    private api;
    private _user?;
    constructor(token: string);
    defaultMaxListeners: number;
    get user(): ClientUser;
    set user(user: ClientUser);
    init(): Promise<void>;
    shutdown(): Promise<void>;
    getGuild(guildID: Snowflake): Promise<any>;
    sendMessage(content: string, channelID: Snowflake, tts?: boolean): Promise<any>;
    deleteMessage(messageID: Snowflake, channelID: Snowflake): Promise<any>;
    banAdd(userID: Snowflake, guildID: Snowflake): Promise<any>;
    banRemove(userID: Snowflake, guildID: Snowflake): Promise<any>;
}
