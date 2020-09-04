/* eslint-disable no-mixed-spaces-and-tabs */
import { EvolveClient, EvolveLogger, CacheOptions, GatewayIntents, Identify } from "..";
import { EvolveSocket } from "./Websocket/Websocket";
import { Oauth2 } from "../Oauth2/Oauth2";


export class EvolveBuilder {
    private token!: string;
    public shards = 1
    public intents = 0;
    private dontChange = false;
    private guildCache = true;
    private channelCache = true;
    private emojiCache = false;
    private usersCache = false;
    private messageCache = false;
    private promiseRejection = false;
    public activity: typeof Identify.d.activity;
    private secret!: string;

    public constructor(token?: string) {
    	if(token) {
    		this.token = token;
    	}
    }

    /**
     *
     * @param token
     * @returns The EvolveBuilder Class
     */
    public setToken(token: string): EvolveBuilder {
    	this.token = token;
    	return this;
    }

    /**
     *
     * @param totalShards
     * @note It must be greater than 0
     * @returns The EvolveBuilder Class
     */
    public setShards(totalShards: number): EvolveBuilder {
    	if(totalShards <= 0) EvolveLogger.error("Total shards must be more than 0!");
    	this.shards = totalShards;
    	return this;
    }

    /**
     *
     * @param activity
     * @note The input should be the same as given in the discord api docs
     * @returns The EvolveBuilder Class
     */
    public setActivity(activity: typeof Identify.d.activity): EvolveBuilder {
    	this.activity = activity;
    	return this;
    }

    /**
     *
     * @param cache
     * @enables The Cache Options for the library
     * @returns The EvolveBuilder Client
     */
    public enableCache(...cache: CacheOptions[]): EvolveBuilder {
    	if(cache.includes(CacheOptions.GUILD)) this.guildCache = true;
    	if(cache.includes(CacheOptions.USERS)) this.usersCache = true;
    	if(cache.includes(CacheOptions.CHANNELS)) this.channelCache = true;
    	if(cache.includes(CacheOptions.MESSAGES)) this.messageCache = true;
    	if(cache.includes(CacheOptions.ALL)) {
    		this.messageCache = true;
    		this.channelCache = true;
    		this.guildCache = true;
    		this.usersCache = true;
    	}
    	return this;
    }


    /**
     *
     * @param cache
     * @disables The Cache Options for the Library
     * @returns EvolveBuilder Class
     */
    public disableCache(...cache: CacheOptions[]): EvolveBuilder {
    	if(cache.includes(CacheOptions.GUILD)) this.guildCache = false;
    	if(cache.includes(CacheOptions.USERS)) this.usersCache = false;
    	if(cache.includes(CacheOptions.CHANNELS)) this.channelCache = false;
    	if(cache.includes(CacheOptions.MESSAGES)) this.messageCache = false;
    	if(cache.includes(CacheOptions.ALL)) {
    		this.messageCache = false;
    		this.channelCache = false;
    		this.guildCache = false;
    		this.usersCache = false;
    	}
    	return this;
    }

    /**
     *
     * @param intents
     * @enables The Required Intents for the Bot
     * @returns EvolveBuilder Class
     * @warning No intents are applied at default so you wont receive any events except some exceptions
     */
    public enableIntents(...intents: GatewayIntents[]): EvolveBuilder {
    	for(const intent of intents) {
    		this.intents = ((this.intents) + (intent));
    	}
    	return this;
    }

    /**
     *
     * @param intents
     * @disables The Intents for your bot
     * @returns EvolveBuilder Class
     */
    public disableIntents(...intents: GatewayIntents[]): EvolveBuilder {
    	for(const intent of intents) {
    		this.intents = ((this.intents) - (intent));
    	}
    	this.dontChange = true;
    	return this;
    }

    public setSecret(clientSecret: string): EvolveBuilder {
    	this.secret = clientSecret;
    	return this;
    }

    /**
     *
     * @param option
     * @enables The capturePromiseRejection for the EventEmitter
     * @returns EvolveBuilderClass
     */
    public capturePromiseRejection(option: boolean): EvolveBuilder {
    	this.promiseRejection = option;
    	return this;
    }

    /**
     * @param none
     * @returns {EvolveClient} A Initialized EvolveClient Instance
     */
    public build(): EvolveClient {
    	if(!this.token) {
    		EvolveLogger.error("EvolveBuilder#build Error.. -> No token Provided for EvolveClient to be initialized");
    	}

    	if(!this.guildCache) {
    		EvolveLogger.warn("The Guild Cache is disabled so the READY event guilds will be emmited again in GUILD_CREATE Event and to avoid this use the EvolveBuilder#enableGuildCache");
    	}

    	if(this.intents == 0) {
    		EvolveLogger.warn("No Intents are given, you will not get any events except some...");
    	}

    	const builtClient: EvolveClient = new EvolveClient(this.token, {
    		enableGuildCache: this.guildCache,
    		enableChannelCache: this.channelCache,
    		enableEmojiCache: this.emojiCache,
    		enableUsersCache: this.usersCache,
    		enableMessageCache: this.messageCache,
    		capturePromiseRejection: this.promiseRejection
    	});
        
    	if(this.intents == 0 && !this.dontChange) {
    		this.intents = ((GatewayIntents.GUILD) + (GatewayIntents.GUILD_MESSAGES) + (GatewayIntents.DIRECT_MESSAGES));
    	}
        
    	if(this.secret) {
    		builtClient.secret = this.secret;
    		builtClient.oauth2 = new Oauth2(builtClient);
    	}

    	new EvolveSocket(builtClient, this).init();
    	builtClient.secret = this.secret;
    	return builtClient;
    }

}

