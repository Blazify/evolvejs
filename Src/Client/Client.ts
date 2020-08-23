import { EventEmitter } from 'events';
import { EvolveSocket } from '../Websocket/Websocket';
import { ClientUser } from './ClientUser';
import { Objex } from '@evolvejs/objex';
import { Guild } from '../Structures/Guild/Guild';
import Channel from '../Structures/Channel/Channel';
import { User } from '../Structures/User/User';
import Emoji from '../Structures/Guild/Emoji';
import { EvolveErr } from './Error';
import { Snowflake } from '../Constants/Constants';
import API from '../API/API';
import { ClientOptions } from './ClientOptions';
import { Message } from '../Structures/Message/Message';

export class Client extends EventEmitter {
	public token: string;
	public options: ClientOptions;
	public guilds: Objex<Snowflake, Guild> = new Objex();
	public channels: Objex<Snowflake, Channel> = new Objex();
	public users: Objex<Snowflake, User> = new Objex();
	public emojis: Objex<Snowflake, Emoji> = new Objex();
	public messages: Objex<Snowflake, Message> = new Objex()
	private ws: EvolveSocket = new EvolveSocket(this);
	private _user?: ClientUser;
	public api: API = new API(this)

	public constructor (
		token: string, 
		options: ClientOptions = {
		enableGuildCache: true,
		enableChannelCache: true,
		enableEmojiCache: true,
		enableUsersCache: true,
		enableMessageCache: false,
		capturePromiseRejection: true
		}
	) {
		super({ captureRejections: options.capturePromiseRejection });
		this.token = token;
		this.options = options
		if (!this.token) throw new EvolveErr('TOKEN_ERROR');
	}

	public get user() {
		return this._user!;
	}

	public set user(user: ClientUser) {
		this._user = user;
	}

	init() {
		this.ws.init();
	}

	async shutdown() {
		this.ws.close();
		process.exit();
	}
}
