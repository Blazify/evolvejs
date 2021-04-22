/* eslint-disable no-constant-condition */
/* eslint-disable no-mixed-spaces-and-tabs */

import { Oauth2 } from "../Oauth2/Oauth2";
import { Structures } from "../Structures/Structures";
import { CacheOptions, GatewayIntents, Identify } from "../Utils/Constants";
import { EvolveClient } from "./EvolveClient";
import { ShardManager } from "./Websocket/ShardManager";
import { CacheProviders } from "../Interfaces/Interfaces";

export class EvolveBuilder {
	private token!: string;
	public shards = 1;
	public intents = 0;
	private cache: Set<CacheOptions> = new Set();
	public activity: typeof Identify.d.activity;
	public secret!: string;
	public encoding: "etf" | "json" = "json";
	public client!: EvolveClient;
	private structure!: Structures;
	private typeOfclient!: typeof EvolveClient;
	private _providers!: CacheProviders;

	public constructor(token?: string, useDefaultSettings: boolean = true) {
		if (token) {
			this.token = token;
		}

		if (useDefaultSettings) {
			this.enableCache(
				CacheOptions.GUILD,
				CacheOptions.CHANNELS,
				CacheOptions.USERS
			);
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
	 * @param caches
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
	 * @param caches
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

	public setStructureClass(structure: Structures): EvolveBuilder {
		this.structure = structure;
		return this;
	}

	public setClientClass(client: typeof EvolveClient): EvolveBuilder {
		this.typeOfclient = client;
		return this;
	}

	public setCacheProviders(providers: CacheProviders): EvolveBuilder {
		this._providers = providers;
		return this;
	}

	/**
	 * @param none
	 * @returns {EvolveClient} A Initialized EvolveClient Instance
	 */
	public build(): EvolveClient {
		if (!this.typeOfclient) {
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
		} else {
			this.client = new this.typeOfclient(this.token, {
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
		}

		if (this._providers) {
			if (this._providers.guilds) {
				this.client.guilds = this._providers.guilds;
			}
			if (this._providers.channels) {
				this.client.channels = this._providers.channels;
			}
			if (this._providers.emojis) {
				this.client.emojis = this._providers.emojis;
			}
			if (this._providers.users) {
				this.client.users = this._providers.users;
			}
			if (this._providers.messages) {
				this.client.messages = this._providers.messages;
			}
			if (this._providers.roles) {
				this.client.roles = this._providers.roles;
			}
		}

		if (!this.token) {
			throw this.client.transformer.error(
				"EvolveBuilder#build Error.. -> No token Provided for EvolveClient to be initialized"
			);
		}
		if (this.shards <= 0)
			throw this.client.transformer.error("Total shards must be more than 0!");

		if (this.intents == 0) {
			throw this.client.transformer.error(
				"No Intents are given, you will not get any events except some..."
			);
		}

		if (this.secret) {
			this.client.secret = this.secret;
			this.client.oauth2 = new Oauth2(this.client);
		}

		if (this.structure) this.client.structures = this.structure;

		this.client.sharder = new ShardManager(this);
		this.client.sharder.spawnAll();

		return this.client;
	}
}
