/* eslint-disable no-constant-condition */
/* eslint-disable no-mixed-spaces-and-tabs */
import { EvolveClient, CacheOptions, GatewayIntents, Identify } from "..";
import { EvolveSocket } from "./Websocket/Websocket";
import { Oauth2 } from "../Oauth2/Oauth2";
import { promisify } from "util";

export class EvolveBuilder {
  private token!: string;
  public shards = 1;
  public intents = 0;
  private cache: Set<CacheOptions> = new Set();
  private promiseRejection = false;
  public activity: typeof Identify.d.activity;
  public secret!: string;
  public encoding: "etf" | "json" = "json";
  public client!: EvolveClient;

  public constructor(token?: string, useDefaultIntents = true) {
  	if (token) {
  		this.token = token;
  	}
    
  	if(useDefaultIntents) {
  	this.enableCache(CacheOptions.GUILD);
  	this.enableIntents(
  		GatewayIntents.GUILD +
      GatewayIntents.GUILD_MESSAGES +
      GatewayIntents.DIRECT_MESSAGES
  		);
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
   * @param encoding
   */

  public setEncoding(encoding: "json" | "etf"): EvolveBuilder {
  	this.encoding = encoding;
  	return this;
  }

  /**
   *
   * @param totalShards
   * @note It must be greater than 0
   * @returns The EvolveBuilder Class
   */
  public setShards(totalShards: number): EvolveBuilder {
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
  public enableCache(...caches: CacheOptions[]): EvolveBuilder {
  	for (const cache of caches) {
  		this.cache.add(cache);
  	}
  	return this;
  }

  /**
   *
   * @param cache
   * @disables The Cache Options for the Library
   * @returns EvolveBuilder Class
   */
  public disableCache(...caches: CacheOptions[]): EvolveBuilder {
  	for (const cache of caches) {
  		this.cache.add(cache);
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
  	for (const intent of intents) {
  		this.intents = this.intents + intent;
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
  	for (const intent of intents) {
  		this.intents = this.intents - intent;
  	}
  	return this;
  }

  public setSecret(clientSecret: string): EvolveBuilder {
  	this.secret = clientSecret;
  	return this;
  }

  /**
   * @param none
   * @returns {EvolveClient} A Initialized EvolveClient Instance
   */
  public build(): EvolveClient {
  	this.client = new EvolveClient(this.token, {
  		enableGuildCache: this.cache.has(CacheOptions.GUILD)
  			? true
  			: this.cache.has(CacheOptions.ALL),
  		enableChannelCache: this.cache.has(CacheOptions.CHANNELS)
  			? true
  			: this.cache.has(CacheOptions.ALL),
  		enableEmojiCache: this.cache.has(CacheOptions.EMOJI)
  			? true
  			: this.cache.has(CacheOptions.ALL),
  		enableUsersCache: this.cache.has(CacheOptions.USERS)
  			? true
  			: this.cache.has(CacheOptions.ALL),
  		enableMessageCache: this.cache.has(CacheOptions.MESSAGES)
  			? true
  			: this.cache.has(CacheOptions.ALL),
  	});
  
  	if (!this.token) {
  		this.client.logger.error(
  			"EvolveBuilder#build Error.. -> No token Provided for EvolveClient to be initialized"
  		);
  	}
  	if (this.shards <= 0)
  		this.client.logger.error("Total shards must be more than 0!");

  	if (this.intents == 0) {
  		this.client.logger.warn(
  			"No Intents are given, you will not get any events except some..."
  		);
  	}

  	if (this.secret) {
  		this.client.secret = this.secret;
  		this.client.oauth2 = new Oauth2(this.client);
  	}

  	for (let i = 0; i < this.shards; i++) {
  		promisify(setTimeout)(5000 * i).then(() => {
  			const socket = new EvolveSocket(this, i);
  			this.client.shardConnections.set(i, socket);
  		});
  	}

  	this.client.secret = this.secret;
  	return this.client;
  }
}
