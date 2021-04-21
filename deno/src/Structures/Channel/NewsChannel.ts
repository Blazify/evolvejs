import {
	Overwrite,
	Guild,
	CategoryChannel,
	INewsChannel,
	EvolveClient,
	CHANNELTYPES,
} from "../../mod.ts";
import { Objex } from "@evolvejs/objex.ts";
import { Channel } from "./Channel.ts";

export class NewsChannel extends Channel {
	public overwrites: Objex<string, Overwrite> = new Objex();

	public guild?: Guild;
	public position!: number;
	public name!: string;
	public topic?: string;
	public nsfw = false;
	public lastMessage?: string;
	public rateLimit!: number;
	public parentID?: string;
	public lastPin?: string;
	public data!: INewsChannel;

	constructor(data: INewsChannel, client: EvolveClient) {
		super(data.id, CHANNELTYPES.News, client);
		Object.defineProperty(this, "data", {
			value: data,
			enumerable: false,
			writable: false,
		});
		this._handle();
	}

	private _handle() {
		if (!this.data) return;
		this.guild = this.client.guilds.get(this.data.guild_id);
		this.position = this.data.position;
		this.name = this.data.name;
		this.topic = this.data.topic ?? "";
		this.nsfw = this.data.nsfw;
		this.lastMessage = this.data.last_message_id || undefined;
		this.rateLimit = this.data.rate_limit_per_user;
		this.parentID = this.data.parent_id;
		this.lastPin = this.data.last_message_id || undefined;
		return this;
	}
}
