/* eslint-disable no-mixed-spaces-and-tabs */

import {
	Overwrite,
	Guild,
	EvolveClient,
	CHANNELTYPES,
	ICategoryChannel,
} from "../../mod.ts";
import { Channel } from "./Channel.ts";

export class CategoryChannel extends Channel {
  public overwrites: Map<string, Overwrite> = new Map();

  public guild?: Guild;
  public position!: number;
  public name!: string;

  constructor(public data: ICategoryChannel, client: EvolveClient) {
  	super(data.id, CHANNELTYPES.Category, client);
  	this._handle();
  }

  private _handle() {
  	if (!this.data) return;
  	this.guild = this.client.guilds.get(this.data.guild_id);
  	this.position = this.data.position;
  	this.name = this.data.name;

  	return this;
  }
}
