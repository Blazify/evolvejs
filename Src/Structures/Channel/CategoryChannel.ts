import Channel from './Channel';
import { ICategoryChannel } from '../../Interfaces/CategoryChannelOptions';
import { CHANNELTYPES, Snowflake } from '../../Constants/Constants';
import Overwrite from './Overwrite';
import { Client } from '../../Client/Client';
import Guild from '../Guild/Guild';
import { Objex } from '@evolvejs/objex';

export default class extends Channel {
	public overwrites: Objex<Snowflake, Overwrite> = new Objex();

	public guild: Guild;
	public position: number;
	public name: string;

	constructor(data: ICategoryChannel, client: Client) {
		super(data.id, CHANNELTYPES.Category, client);

		this.setCache(data);

		this.guild = this.client.guilds.get(data.guild_id)!;
		this.position = data.position;
		this.name = data.name;
	}

	private setCache(data: ICategoryChannel) {
		for (let raw of data.permission_overwrites)
			this.overwrites.set(raw.id, new Overwrite(raw));
	}
}
