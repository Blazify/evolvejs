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

export class Client extends EventEmitter {
	public token: string;
	public guilds: Objex<Snowflake, Guild> = new Objex();
	public channels: Objex<Snowflake, Channel> = new Objex();
	public users: Objex<Snowflake, User> = new Objex();
	public emojis: Objex<Snowflake, Emoji> = new Objex();
	private ws: EvolveSocket = new EvolveSocket(this);
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

	init() {
		this.ws.init();
	}

	async shutdown() {
		this.ws.close();
		process.exit();
	}

	public async getGuild(guildID: Snowflake): Promise<IGuild> {
		return await RestAPIHandler(this, {
			endpoint: `guilds/${guildID}`,
			method: 'GET'
		});
	}

	public async getChannel(channelID: Snowflake): Promise<ChannelResolvable> {
		return await RestAPIHandler(this, {
			endpoint: `channels/${channelID}`,
			method: 'GET'
		});
	}

	public async getGuildChannels(
		guildID: Snowflake
	): Promise<ChannelResolvable[]> {
		return await RestAPIHandler(this, {
			endpoint: `guilds/${guildID}/channels`,
			method: 'GET'
		});
	}

	public async getUser(userID: Snowflake) {
		return await RestAPIHandler(this, {
			endpoint: `users/${userID}`,
			method: 'GET'
		});
	}

	public async getGuildMembers(guildID: Snowflake) {
		return await RestAPIHandler(this, {
			endpoint: `guilds/${guildID}/members`,
			method: 'GET'
		});
	}

	public async sendMessage(content: string, channelID: Snowflake) {
		return await RestAPIHandler(this, {
			endpoint: `channels/${channelID}/messages`,
			method: 'POST',
			content: content
		});
	}

	public async deleteMessage(messageID: Snowflake, channelID: Snowflake) {
		return await RestAPIHandler(this, {
			endpoint: `/channels/${channelID}/messages/${messageID}`,
			method: 'DELETE'
		});
	}

	public async banAdd(guildID: Snowflake, userID: Snowflake) {
		return await RestAPIHandler(this, {
			endpoint: `guilds/${guildID}/bans/${userID}`,
			method: 'PUT'
		});
	}

	public async banRemove(userID: Snowflake, guildID: Snowflake) {
		return await RestAPIHandler(this, {
			endpoint: `guilds/${guildID}/bans/${userID}`,
			method: 'DELETE'
		});
	}
}
