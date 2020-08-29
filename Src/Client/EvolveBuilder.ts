import { EvolveClient, EvolveLogger, CacheOptions, GatewayIntents, Identify } from "..";
import { EvolveSocket } from "../Websocket/Websocket";


export class EvolveBuilder {
    private token!: string;
    public shards: number = 1
    public intents: number = 0
    private guildCache: boolean = false;
    private channelCache: boolean = false
    private emojiCache: boolean = false;
    private usersCache: boolean = false;
    private messageCache: boolean = false;
    private promiseRejection: boolean = false;
    public activity: any;
    private secret!: string;

    public constructor(token?: string) {
        if(token) {
            this.token = token
        }
    }

    /**
     *
     * @param token
     * @returns The EvolveBuilder Class
     */
    public setToken(token: string): EvolveBuilder {
        this.token = token
        return this
    }

    /**
     *
     * @param totalShards
     * @note It must be greater than 0
     * @returns The EvolveBuilder Class
     */
    public setShards(totalShards: number) {
        if(totalShards <= 0) EvolveLogger.error("Total shards must be more than 0!")
        this.shards = totalShards
        return this;
    }

    /**
     *
     * @param activity
     * @note The input should be the same as given in the discord api docs
     * @returns The EvolveBuilder Class
     */
    public setActivity(activity: typeof Identify.d.activity) {
        this.activity = activity
        return this
    }

    /**
     *
     * @param cache
     * @enables The Cache Options for the library
     * @returns The EvolveBuilder Client
     */
    public enableCache(...cache: CacheOptions[]): EvolveBuilder {
        if(cache.includes(CacheOptions.GUILD)) this.guildCache = true
        if(cache.includes(CacheOptions.USERS)) this.usersCache = true
        if(cache.includes(CacheOptions.CHANNELS)) this.channelCache = true
        if(cache.includes(CacheOptions.MESSAGES)) this.messageCache = true
        return this
    }


    /**
     *
     * @param cache
     * @disables The Cache Options for the Library
     * @returns EvolveBuilder Class
     */
    public disableCache(...cache: CacheOptions[]) {
        if(cache.includes(CacheOptions.GUILD)) this.guildCache = false
        if(cache.includes(CacheOptions.USERS)) this.usersCache = false
        if(cache.includes(CacheOptions.CHANNELS)) this.channelCache = false
        if(cache.includes(CacheOptions.MESSAGES)) this.messageCache = false
        return this
    }

    /**
     *
     * @param intents
     * @enables The Required Intents for the Bot
     * @returns EvolveBuilder Class
     * @warning No intents are applied at default so you wont receive any events except some exceptions
     */
    public enableIntents(...intents: GatewayIntents[]) {
        for(let intent of intents) {
            this.intents = ((this.intents) + (intent))
        }
        return this
    }

    /**
     *
     * @param intents
     * @disables The Intents for your bot
     * @returns EvolveBuilder Class
     */
    public disableIntents(...intents: GatewayIntents[]) {
        for(let intent of intents) {
            this.intents = ((this.intents) - (intent))
        }
        return this
    }

    public setSecret(clientSecret: string) {
        this.secret = clientSecret;
        return this
    }

    /**
     *
     * @param option
     * @enables The capturePromiseRejection for the EventEmitter
     * @returns EvolveBuilderClass
     */
    public capturePromiseRejection(option: boolean) {
        this.promiseRejection = option
        return this
    }

    /**
     * @param none
     * @returns {EvolveClient} A Initialized EvolveClient Instance
     */
    public build(): EvolveClient {
        if(!this.token) {
            EvolveLogger.error("EvolveBuilder#build Error.. -> No token Provided for EvolveClient to be initialized")
        }

        if(!this.guildCache) {
            EvolveLogger.warn("The Guild Cache is disabled so the READY event guilds will be emmited again in GUILD_CREATE Event and to avoid this use the EvolveBuilder#enableGuildCache")
        }

        if(this.intents == 0) {
            EvolveLogger.warn("No Intents are given, you will not get any events except some...")
        }

        let builtClient: EvolveClient = new EvolveClient(this.token, {
            enableGuildCache: this.guildCache,
            enableChannelCache: this.channelCache,
            enableEmojiCache: this.emojiCache,
            enableUsersCache: this.usersCache,
            enableMessageCache: this.messageCache,
            capturePromiseRejection: this.promiseRejection
            })

            new EvolveSocket(builtClient, this).init()
            builtClient.secret = this.secret;
            return builtClient;
    }

}

