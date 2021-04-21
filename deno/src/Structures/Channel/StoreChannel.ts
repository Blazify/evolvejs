import {
	Overwrite,
	Guild,
	CategoryChannel,
	IStoreChannel,
	EvolveClient,
	CHANNELTYPES,
} from "../../mod.ts";
import { Objex } from "@evolvejs/objex.ts";
import { Channel } from "./Channel.ts";

export class StoreChannel extends Channel {
	public overwrites: Objex<string, Overwrite> = new Objex();

	public guildId?: string;
	public position!: number;
	public name!: string;
	public nsfw!: boolean;
	public rateLimit!: number;
	public parentId?: string;
	public data!: IStoreChannel;

	constructor(data: IStoreChannel, client: EvolveClient) {
		super(data.id, CHANNELTYPES.Store, client);
		Object.defineProperty(this, "data", {
			value: data,
			enumerable: false,
			writable: false,
		});
		this._handle();
	}

	private _handle() {
		if (!this.data) return;
		this.guildId = this.data.guild_id;
		this.position = this.data.position;
		this.name = this.data.name;
		this.nsfw = this.data.nsfw;
		this.rateLimit = this.data.rate_limit_per_user;
		this.parentId = this.data.parent_id ?? undefined;
		return this;
	}
}
