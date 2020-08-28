import Channel from './Channel';
import { ITextChannel } from '../../Interfaces/TextChannelOptions';
import { CHANNELTYPES, Snowflake } from '../../Constants/Constants';
import Overwrite from './Overwrite';
import { EvolveClient } from '../../Client/EvolveClient';
import {Guild} from '../Guild/Guild';
import CategoryChannel from './CategoryChannel';
import { Objex } from '@evolvejs/objex';
import API from '../../API/API';
import { Message } from '../Message/Message';

export default class extends Channel {
	public overwrites: Objex<Snowflake, Overwrite> = new Objex();

	public guild: Guild;
	public position: number;
	public name: string;
	public topic?: string;
	public nsfw: boolean;
	public lastMessage?: Snowflake;
	public rateLimit: number;
	public parent?: CategoryChannel;
	public lastPin?: number;
	public send!:  (content: string) => Promise<Message>;
	public purge!: (time?: number) => Promise<NodeJS.Timeout>;

	constructor(data: ITextChannel, client: EvolveClient) {
		super(data.id, CHANNELTYPES.Text, client);

		this.guild = this.client.guilds.get(data.guild_id)!;
		this.position = data.position;
		this.name = data.name;
		this.topic = data.topic || undefined;
		this.nsfw = data.nsfw;
		this.rateLimit = data.rate_limit_per_user;
		this.parent = data.parent_id
			? this.client.channels.get(data.parent_id) as CategoryChannel
			: undefined;
		this.lastPin = data.last_pin_timestamp;
	}

}
