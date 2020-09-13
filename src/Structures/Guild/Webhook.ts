/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { Guild, Channel, User, IWebhook, EvolveClient } from "../..";

export class Webhook {
  public id!: string;
  public type!: number;
  public guild!: Guild;
  public channel!: Channel;
  public user!: User;
  public name!: string;
  public avatar!: string;
  public token!: string;
  constructor(public data: IWebhook, private client: EvolveClient) {
  	this._handle();
  }

  private _handle() {
  	if(!this.data) return;
  	this.id = this.data.id;
  	this.type = this.data.type;
  	async () => {
  		if (this.data.guild_id)
  			this.guild = await this.client.rest.getGuild(this.data.guild_id);
  		this.channel = await this.client.rest.getChannel(this.data.channel_id);
  	};
  	this.user = new User(this.data.user!);
  	this.name = this.data.name!;
  	this.avatar = this.data.avatar!;
  	this.token = this.data.token!;
  	return this;
  }
}
