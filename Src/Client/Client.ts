import { EventEmitter } from 'events';
import { Websocket } from '../Websocket/Websocket';
import { API } from '../API/API';
import { ClientUser } from './ClientUser';
import { EvolveErr } from './Error';
import { Snowflake } from '../Constants/Constants';

export class Client extends EventEmitter {
	public token: string;
	private ws: Websocket = new Websocket(this);
	private api: API = new API(this);
	private _user?: ClientUser;

	public constructor(token: string) {
		super();
		this.token = token;
		if (!this.token) throw new EvolveErr('TOKEN_ERROR');
	}

	get user() {
		return this._user!;
	}

	set user(user: ClientUser) {
		this._user = user;
	}

	async init() {
		this.ws.init(this.token);
	}

	async shutdown() {
		this.ws.socket.close();
		process.exit();
	}

	async getGuild(guildID: Snowflake) {
		return await this.api.request('GetGuild', { guildID });
	}

	async sendMessage(content: string, channelID: Snowflake, tts?: boolean) {
		return await this.api.request('SendMessage', { content, channelID, tts });
	}

	async deleteMessage(messageID: Snowflake, channelID: Snowflake) {
		return await this.api.request('DeleteMessage', { channelID, messageID });
	}

	async banAdd(userID: Snowflake, guildID: Snowflake) {
		return await this.api.request('BanAdd', { guildID, userID });
	}

	async banRemove(userID: Snowflake, guildID: Snowflake) {
		return await this.api.request('BanRemove', { guildID, userID });
	}
}
