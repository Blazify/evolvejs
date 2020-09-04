import { Overwrite, Guild, CategoryChannel, INewsChannel, EvolveClient, CHANNELTYPES } from "../..";
import { Objex } from "@evolvejs/objex";
import { Channel } from "./Channel";


export class NewsChannel extends Channel {
	public overwrites: Objex<string, Overwrite> = new Objex();

	public guild?: Guild;
	public position: number;
	public name: string;
	public topic?: string;
	public nsfw: boolean;
	public lastMessage?: string;
	public rateLimit: number;
	public parentID?: CategoryChannel;
	public lastPin?: string;

	constructor(public data: INewsChannel, client: EvolveClient) {
		super(data.id, CHANNELTYPES.News, client);
		this.guild = this.client.guilds.get(data.guild_id);
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
