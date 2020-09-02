import { Guild, Channel, User, Emoji, Role, Message, ClientUser, TokenAccessOptions, EvolveLogger, Oauth2Token, ClientOptions, API } from "..";
import { Objex } from "@evolvejs/objex";
import { EventEmitter } from "events";
import { Gateway } from "./Websocket/Gateway";

export class EvolveClient extends EventEmitter {
	public token: string;
	public options: ClientOptions;
	public guilds: Objex<string, Guild> = new Objex();
	public channels: Objex<string, Channel> = new Objex();
	public users: Objex<string, User> = new Objex();
	public emojis: Objex<string | null, Emoji> = new Objex();
	public roles: Objex<string, Role> = new Objex()
	public messages: Objex<string, Message> = new Objex()
	private _user!: ClientUser;
	public api: API = new API(this)
	public ws: Gateway = new Gateway()
	public secret!: string;

	public constructor (
		token: string,
		options: ClientOptions
	) {
		super();
		this.token = token;
		this.options = options;
		if (!this.token) throw Error("TOKEN_ERROR");
	}


	public get user(): ClientUser {
		return this._user;
	}

	public set user(user: ClientUser) {
		this._user = user;
	}

	public requestOauth2Token(options: TokenAccessOptions): Promise<void> | undefined {
		if(!this.secret) return EvolveLogger.error("You need to use EvolveBuilder#setSecret to get the oauth2 token");
		Oauth2Token(this, options).then(fetched => {
			return fetched;
		});
	}
}
