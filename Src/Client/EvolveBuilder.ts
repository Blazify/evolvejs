import { EvolveClient } from "./EvolveClient";
import { EvolveSocket } from "../Websocket/Websocket";

export class EvolveBuilder {
    private token!: string;
    private guildCache: boolean = false;
    private channelCache: boolean = false
    private emojiCache: boolean = false;
    private usersCache: boolean = false;
    private messageCache: boolean = false;
    private promiseRejection: boolean = false;


    public constructor(token?: string) {
        if(token) {
            this.token = token
        }
    }

    
    public setToken(token: string) {
        this.token = token
        return this
    }

    public enableGuildCache(option: boolean) {
        this.guildCache = option
        return this
    }

    public enableChannelCache(option: boolean) {
        this.channelCache = option
        return this
    }

    public enableEmojiCache(option: boolean) {
        this.emojiCache = option
        return this
    }

    public enableUsersCache(option: boolean) {
        this.usersCache = option
        return this
    }

    public enableMessageCache(option: boolean) {
        this.messageCache = option
        return this
    }

    public capturePromiseRejection(option: boolean) {
        this.promiseRejection = option
        return this
    }

    public build() {
        if(!this.token) {
            throw Error("EvolveBuilder#build Error.. -> No token Provided for EvolveClient to be initialized")
        }

        let builtClient: EvolveClient = new EvolveClient(this.token, {
            enableGuildCache: this.guildCache,
            enableChannelCache: this.channelCache,
            enableEmojiCache: this.emojiCache,
            enableUsersCache: this.usersCache,
            enableMessageCache: this.messageCache,
            capturePromiseRejection: this.promiseRejection
            })
            new EvolveSocket(builtClient).init()
            
            return builtClient;
    }

}

