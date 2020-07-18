/// <reference types="node" />
import { EventEmitter } from 'events';
import { ClientUser } from './ClientUser';
import { Snowflake } from '../Constants/Constants';
import Guild from '../Structures/Guild';
import { Objex } from '@evolvejs/objex';
import Role from '../Structures/Role';
import Channel from '../Structures/Channel';
import User from '../Structures/User';
import Emoji from '../Structures/Emoji';
export declare class Client extends EventEmitter {
    token: string;
    guilds: Objex<Snowflake, Guild>;
    roles: Objex<Snowflake, Role>;
    channels: Objex<Snowflake, Channel>;
    users: Objex<Snowflake, User>;
    emojis: Objex<Snowflake, Emoji>;
    private ws;
    private _user?;
    constructor(token: string);
    get user(): ClientUser;
    set user(user: ClientUser);
    init(): Promise<void>;
    shutdown(): Promise<void>;
    getGuild(guildID: Snowflake): Promise<any>;
    getGuildChannels(guildID: Snowflake): Promise<any>;
    getUser(userID: Snowflake): Promise<any>;
    getGuildMembers(guildID: Snowflake): Promise<any>;
    sendMessage(content: string, channelID: Snowflake): Promise<any>;
    deleteMessage(messageID: Snowflake, channelID: Snowflake): Promise<any>;
    banAdd(guildID: Snowflake, userID: Snowflake): Promise<any>;
    banRemove(userID: Snowflake, guildID: Snowflake): Promise<any>;
}
