import { EventEmitter } from 'events';
import { Websocket } from '../Websocket/Websocket';
import { ClientUser } from './ClientUser';
import { EvolveErr } from './Error';
import { Snowflake } from '../Constants/Constants';
import Guild from '../Structures/Guild';
import { Objex } from '@evolvejs/objex';
import Role from '../Structures/Role';
import Channel from '../Structures/Channel';
import User from '../Structures/User';
import Emoji from '../Structures/Emoji';
import API from '../API/API';

export class Client extends EventEmitter {
	public token: string;
	public guilds: Objex<Snowflake, Guild> = new Objex();
	public roles: Objex<Snowflake, Role> = new Objex();
	public channels: Objex<Snowflake, Channel> = new Objex()
	public users: Objex<Snowflake, User> = new Objex();
	public emojis: Objex<Snowflake, Emoji> = new Objex()
	private ws: Websocket = new Websocket(this);
	public user?: ClientUser;
	public api: API = new API(this);

	public constructor(token: string) {
		super();
		this.token = token;
		if (!this.token) throw new EvolveErr('TOKEN_ERROR');
	}

	public async init() {
		this.ws.init(this.token);
	}

	public async shutdown() {
		this.ws.socket.close();
		process.exit();
	}

}
