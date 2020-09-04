import { Overwrite, Guild, CategoryChannel, IVoiceChannel, EvolveClient, CHANNELTYPES } from "../..";
import { Objex } from "@evolvejs/objex";
import { Channel } from "./Channel";


export class VoiceChannel extends Channel {
	public overwrites: Objex<string, Overwrite> = new Objex();

	public guild?: Guild;
	public position: number;
	public name: string;
	public bitrate: number;
	public userLimit: number;
	public parent?: CategoryChannel;

	constructor(public data: IVoiceChannel, client: EvolveClient) {
		super(data.id, CHANNELTYPES.Voice, client);
		this.guild = this.client.guilds.get(data.guild_id);
		this.position = data.position;
		this.name = data.name;
		this.bitrate = data.bitrate;
		this.userLimit = data.user_limit;
		this.parent = data.parent_id
			? this.client.channels.get(data.parent_id) as CategoryChannel
			: undefined;
	}
}
