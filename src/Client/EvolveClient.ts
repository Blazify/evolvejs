import { EventEmitter } from 'events';
import { ClientUser } from './ClientUser';
import { Objex } from '@evolvejs/objex';
import { Guild } from '../Structures/Guild/Guild';
import Channel from '../Structures/Channel/Channel';
import { User } from '../Structures/User/User';
import Emoji from '../Structures/Guild/Emoji';
import API from './API/API';
import { ClientOptions } from './ClientOptions';
import { Message } from '../Structures/Message/Message';
import { EvolveLogger, TokenAccessOptions } from "..";
import { Oauth2Token } from '../Oauth2/Oauth2Token';
import { Role } from '../Structures/Guild/Role';

export class EvolveClient extends EventEmitter {
	public token: string;
	public options: ClientOptions;
	public guilds: Objex<string, Guild> = new Objex();
	public channels: Objex<string, Channel> = new Objex();
	public users: Objex<string, User> = new Objex();
	public emojis: Objex<string | null, Emoji> = new Objex();
	public roles: Objex<string, Role> = new Objex()
	public messages: Objex<string, Message> = new Objex()
	private _user?: ClientUser;
	public api: API = new API(this)
	public secret!: string;

	public constructor (
		token: string,
		options: ClientOptions
	) {
		super({ captureRejections: options.capturePromiseRejection });
		this.token = token;
		this.options = options
		if (!this.token) throw Error('TOKEN_ERROR');
	}

	public get user() {
		return this._user!;
	}

	public set user(user: ClientUser) {
		this._user = user;
	}

	public requestOauth2Token(options: TokenAccessOptions) {
		if(!this.secret) return EvolveLogger.error("You need to use EvolveBuilder#setSecret to get the oauth2 token")
		Oauth2Token(this, options).then(fetched => {
			return fetched;
		})
	}
}
