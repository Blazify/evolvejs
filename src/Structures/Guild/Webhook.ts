/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { User, IWebhook, EvolveClient } from "../..";

export class Webhook {
	public id!: string;
	public type!: number;
	public guildId!: string;
	public channelId!: string;
	public user!: User;
	public name!: string;
	public avatar!: string;
	public token!: string;
	public data!: IWebhook;
	constructor(data: IWebhook, public client: EvolveClient) {
		Object.defineProperty(this, "data", {
			value: data,
			enumerable: false,
			writable: false,
		});
		Object.defineProperty(this, "client", {
			value: client,
			enumerable: false,
			writable: false,
		});
		this._handle();
	}

	private _handle() {
		if (!this.data) return;
		this.id = this.data.id;
		this.type = this.data.type;
		if (this.data.guild_id) this.guildId = this.data.guild_id;
		this.channelId = this.data.channel_id;
		this.user = new User(this.data.user!);
		this.name = this.data.name!;
		this.avatar = this.data.avatar!;
		this.token = this.data.token!;
		return this;
	}
}
