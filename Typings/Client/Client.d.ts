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
import API from '../API/API';
export declare class Client extends EventEmitter {
    token: string;
    guilds: Objex<Snowflake, Guild>;
    roles: Objex<Snowflake, Role>;
    channels: Objex<Snowflake, Channel>;
    users: Objex<Snowflake, User>;
    emojis: Objex<Snowflake, Emoji>;
    private ws;
    user?: ClientUser;
    api: API;
    constructor(token: string);
    init(): Promise<void>;
    shutdown(): Promise<void>;
}
