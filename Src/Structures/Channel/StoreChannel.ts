import Channel from './Channel';
import { IStoreChannel } from '../../Interfaces/StoreChannelOptions';
import { Snowflake, CHANNELTYPES } from '../../Constants/Constants';
import Overwrite from './Overwrite';
import { Client } from '../../Client/Client';
import {Guild} from '../Guild/Guild';
import CategoryChannel from './CategoryChannel';
import { Objex } from '@evolvejs/objex';

export default class extends Channel {
	public overwrites: Objex<Snowflake, Overwrite> = new Objex();

	public guild: Guild;
	public position: number;
	public name: string;
	public nsfw: boolean;
	public rateLimit: number;
	public parent?: CategoryChannel;

	constructor(data: IStoreChannel, client: Client) {
		super(data.id, CHANNELTYPES.Store, client);
		this.guild = this.client.guilds.get(data.guild_id)!;
		this.position = data.position;
		this.name = data.name;
		this.nsfw = data.nsfw;
		this.rateLimit = data.rate_limit_per_user;
		this.parent = data.parent_id
			? this.client.channels.get(data.parent_id) as CategoryChannel
			: undefined;
	}
}
