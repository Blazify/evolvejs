import Channel from './Channel';
import { INewsChannel } from '../../Interfaces/NewsChannelOptions';
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
	public topic?: string;
	public nsfw: boolean;
	public lastMessage?: Snowflake;
	public rateLimit: number;
	public parentID?: CategoryChannel;
	public lastPin?: Snowflake;

	constructor(data: INewsChannel, client: Client) {
		super(data.id, CHANNELTYPES.News, client);
		this.guild = this.client.guilds.get(data.guild_id)!;
		this.position = data.position;
		this.name = data.name;
		this.topic = data.topic || undefined;
		this.nsfw = data.nsfw;
		this.lastMessage = data.last_message_id || undefined;
		this.rateLimit = data.rate_limit_per_user;
		this.parentID = data.parent_id
			? this.client.channels.get(data.parent_id) as CategoryChannel
			: undefined;
		this.lastPin = data.last_message_id || undefined;
	}

}
