import { Snowflake } from '../../Constants/Constants';
import { Guild } from './Guild';
import Channel from '../Channel/Channel';
import {User} from '../User/User';
import { IWebhook } from '../../Interfaces/WebhookOptions';
import { EvolveClient } from '../../Client/EvolveClient';

export default class {
	public id!: Snowflake;
	public type!: number;
	public guild!: Guild;
	public channel!: Channel;
	public user!: User;
	public name!: string;
	public avatar!: string;
	public token!: string;
	constructor(
		data: IWebhook,
		client: EvolveClient
	) {
		this.id = data.id
		this.type = data.type
		client.api.getGuild(data.guild_id!).then(o => this.guild = o)
		client.api.getChannel(data.channel_id).then(o => this.channel = o)
		this.user = new User(data.user!)
		this.name = data.name!
		this.avatar = data.avatar!
		this.token = data.token!
	}
}
