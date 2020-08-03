import { EventEmitter } from 'events';
import { EvolveSocket } from '../Websocket/Websocket';
import RestAPIHandler from '../API/RestAPIHandler';
import { ClientUser } from './ClientUser';
import { Objex } from '@evolvejs/objex';
import Guild from '../Structures/Guild/Guild';
import Channel from '../Structures/Channel/Channel';
import User from '../Structures/User/User';
import Emoji from '../Structures/Guild/Emoji';
import { EvolveErr } from './Error';
import { Snowflake, ChannelResolvable } from '../Constants/Constants';
import { IGuild } from '../Interfaces/GuildOptions';
import API from '../API/API';

export class Client extends EventEmitter {
	public token: string;
	public guilds: Objex<Snowflake, Guild> = new Objex();
	public channels: Objex<Snowflake, Channel> = new Objex();
	public users: Objex<Snowflake, User> = new Objex();
	public emojis: Objex<Snowflake, Emoji> = new Objex();
	private ws: EvolveSocket = new EvolveSocket(this);
	private _user?: ClientUser;
	public api: API = new API(this)

	public constructor(token: string) {
		super();
		this.token = token;
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
