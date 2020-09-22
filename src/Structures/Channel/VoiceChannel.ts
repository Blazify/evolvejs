import {
	Overwrite,
	Guild,
	CategoryChannel,
	IVoiceChannel,
	EvolveClient,
	CHANNELTYPES,
} from "../../mod.ts";
import { Channel } from "./Channel.ts";

export class VoiceChannel extends Channel {
  public overwrites: Map<string, Overwrite> = new Map();

  public guild?: Guild;
  public position!: number;
  public name!: string;
  public bitrate!: number;
  public userLimit!: number;
  public parent?: CategoryChannel;

  constructor(public data: IVoiceChannel, client: EvolveClient) {
  	super(data.id, CHANNELTYPES.Voice, client);
  	this._handle();
  }

  private _handle() {
  	if (!this.data) return;
  	this.guild = this.client.guilds.get(this.data.guild_id);
  	this.position = this.data.position;
  	this.name = this.data.name;
  	this.bitrate = this.data.bitrate;
  	this.userLimit = this.data.user_limit;
  	this.parent = this.data.parent_id
  		? (this.client.channels.get(this.data.parent_id) as CategoryChannel)
  		: undefined;
  	return this;
  }
}
