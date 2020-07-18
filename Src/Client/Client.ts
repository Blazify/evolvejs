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
import RestAPIHandler from '../API/RestAPIHandler';

export class Client extends EventEmitter {
	public token: string;
	public guilds: Objex<Snowflake, Guild> = new Objex();
	public roles: Objex<Snowflake, Role> = new Objex();
	public channels: Objex<Snowflake, Channel> = new Objex()
	public users: Objex<Snowflake, User> = new Objex();
	public emojis: Objex<Snowflake, Emoji> = new Objex()
	private ws: Websocket = new Websocket(this);
	private _user?: ClientUser;

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

	public async init() {
		this.ws.init(this.token);
	}

	public async shutdown() {
		this.ws.socket.close();
		process.exit();
	}

	public async getGuild(guildID: Snowflake) {
		return await RestAPIHandler(this, {
			"endpoint": `guilds/${guildID}`,
			"method": "GET",
		})
	}

	public async getGuildChannels(guildID: Snowflake) {
		return await RestAPIHandler(this, {
			"endpoint": `guilds/${guildID}/channels`,
			"method": "GET",
		})
	}

	public async getUser(userID: Snowflake) {
		return await RestAPIHandler(this, {
			"endpoint": `users/${userID}`,
			"method": "GET",
		})
	}

	public async getGuildMembers(guildID: Snowflake) {
		return await RestAPIHandler(this, {
			"endpoint": `guilds/${guildID}/members`,
			"method": "GET",
		})
	}

	public async sendMessage(content: string, channelID: Snowflake) {
		return await RestAPIHandler(this, {
			"endpoint": `channels/${channelID}/messages`,
			"method": "GET",
			"content": content
		})
	}

	public async deleteMessage(messageID: Snowflake, channelID: Snowflake) {
		return await RestAPIHandler(this, {
			"endpoint": `/channels/${channelID}/messages/${messageID}`,
			"method": "DELETE",
		})
	}

	public async banAdd(guildID: Snowflake, userID: Snowflake) {
		return await RestAPIHandler(this, {
			"endpoint": `guilds/${guildID}/bans/${userID}`,
			"method": "PUT",
		})
	}

	public async banRemove(userID: Snowflake, guildID: Snowflake) {
		return await RestAPIHandler(this, {
			"endpoint": `guilds/${guildID}/bans/${userID}`,
			"method": "DELETE",
		})
	}
}
