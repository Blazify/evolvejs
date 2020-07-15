/// <reference types="node" />
import { EventEmitter } from "events";
import { ClientUser } from "..";
export declare class Client extends EventEmitter {
    private ws;
    token: string;
    private _user;
    init(token: string): Promise<void>;
    shutdown(): Promise<void>;
    set user(user: ClientUser);
    get member(): ClientUser;
    getGuild(guild: string): Promise<any>;
    sendMessage(content: any, channelID: any, tts?: boolean): Promise<any>;
    deleteMessage(messageID: string, channelID: string): Promise<any>;
    banAdd(userID: string, guildID: string): Promise<any>;
    banRemove(userID: string, guildID: string): Promise<any>;
}
