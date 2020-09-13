import {
	Overwrite,
	Guild,
	CategoryChannel,
	IStoreChannel,
	EvolveClient,
	CHANNELTYPES,
} from "../..";
import { Objex } from "@evolvejs/objex";
import { Channel } from "./Channel";

export class StoreChannel extends Channel {
  public overwrites: Objex<string, Overwrite> = new Objex();

  public guild?: Guild;
  public position!: number;
  public name!: string;
  public nsfw!: boolean;
  public rateLimit!: number;
  public parent?: CategoryChannel;

  constructor(public data: IStoreChannel, client: EvolveClient) {
  	super(data.id, CHANNELTYPES.Store, client);
  	this._handle();
  }

  private _handle() {
       if(!this.data) return;
  	this.guild = this.client.guilds.get(this.data.guild_id);
  	this.position = this.data.position;
  	this.name = this.data.name;
  	this.nsfw = this.data.nsfw;
  	this.rateLimit = this.data.rate_limit_per_user;
  	this.parent = this.data.parent_id
  		? (this.client.channels.get(this.data.parent_id) as CategoryChannel)
  		: undefined;
  	return this;
  }
}
