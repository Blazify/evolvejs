import { EvolveClient } from "./EvolveClient";
import { EvolveSocket } from "../Websocket/Websocket";
import { GatewayIntents } from "../Constants/GatewayIntents";
import { CacheOptions } from "../Constants/CacheOptions";
import { EvolveLogger } from "./EvolveLogger";
import { Identify } from "../Constants/Payloads";

export class EvolveBuilder {
    private token!: string;
    private shards: number = 1
    private intents: number = 0
    private guildCache: boolean = false;
    private channelCache: boolean = false
    private emojiCache: boolean = false;
    private usersCache: boolean = false;
    private messageCache: boolean = false;
    private promiseRejection: boolean = false;
    private activity: any;


    public constructor(token?: string) {
        if(token) {
            this.token = token
        }
    }

    
    public setToken(token: string) {
        this.token = token
        return this
    }

    public setShards(totalShards: number) {
        if(totalShards >= 0) new EvolveLogger().error("Total shards must be more than 0!")
        this.shards = totalShards
        return this;
    }

    public setActivity(activity: typeof Identify.d.activity) {
        this.activity = activity
        return this
    }


    public enableCache(...cache: CacheOptions[]) {
        if(cache.includes(CacheOptions.GUILD)) this.guildCache = true
        if(cache.includes(CacheOptions.USERS)) this.usersCache = true
        if(cache.includes(CacheOptions.CHANNELS)) this.channelCache = true
        if(cache.includes(CacheOptions.MESSAGES)) this.messageCache = true
        return this
    }

    
    public disableCache(...cache: CacheOptions[]) {
        if(cache.includes(CacheOptions.GUILD)) this.guildCache = false
        if(cache.includes(CacheOptions.USERS)) this.usersCache = false
        if(cache.includes(CacheOptions.CHANNELS)) this.channelCache = false
        if(cache.includes(CacheOptions.MESSAGES)) this.messageCache = false
        return this
    }

    public enableIntents(...intents: GatewayIntents[]) {
        intents.forEach(it => {
            this.intents = ((this.intents) + (it))
        })
        return this
    }

    public disableIntents(...intents: GatewayIntents[]) {
        intents.forEach(it => {
            this.intents = ((this.intents) - (it))
        })
        return this
    }

    public capturePromiseRejection(option: boolean) {
        this.promiseRejection = option
        return this
    }

    public build() {
        let logger: EvolveLogger = new EvolveLogger()
        if(!this.token) {
            logger.error("EvolveBuilder#build Error.. -> No token Provided for EvolveClient to be initialized")
        }

        if(!this.guildCache) {
           logger.warn("The Guild Cache is disabled so the READY event guilds will be emmited again in GUILD_CREATE Event and to avoid this use the EvolveBuilder#enableGuildCache")
        }

        if(this.intents == 0) {
            logger.warn("No Intents are given, you will not get any events except some...")
        }

        let builtClient: EvolveClient = new EvolveClient(this.token, {
            enableGuildCache: this.guildCache,
            enableChannelCache: this.channelCache,
            enableEmojiCache: this.emojiCache,
            enableUsersCache: this.usersCache,
            enableMessageCache: this.messageCache,
            capturePromiseRejection: this.promiseRejection
            })

            for(let i = 1; i < this.shards; i++) {
            new EvolveSocket(builtClient, this.intents, [i - 1, this.shards], this.activity).init()
        }
        
            return builtClient;
    }

}

