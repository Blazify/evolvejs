import { Overwrite, Guild, CategoryChannel, IStoreChannel, EvolveClient, CHANNELTYPES } from "../..";
import { Objex } from "@evolvejs/objex";
import { Channel } from "./Channel";


export class StoreChannel extends Channel {
	public overwrites: Objex<string, Overwrite> = new Objex();

	public guild?: Guild;
	public position: number;
	public name: string;
	public nsfw: boolean;
	public rateLimit: number;
	public parent?: CategoryChannel;

	constructor(public data: IStoreChannel, client: EvolveClient) {
		super(data.id, CHANNELTYPES.Store, client);
		this.guild = this.client.guilds.get(data.guild_id);
		this.position = data.position;
		this.name = data.name;
		this.nsfw = data.nsfw;
		this.rateLimit = data.rate_limit_per_user;
		this.parent = data.parent_id
			? this.client.channels.get(data.parent_id) as CategoryChannel
			: undefined;
	}
}
