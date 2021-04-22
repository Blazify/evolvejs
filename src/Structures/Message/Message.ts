/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-mixed-spaces-and-tabs */

import {User, GuildMember, Guild, IMessage, Endpoints, Channel, ChannelTypes, ChannelResolver} from "../..";
import { TextChannel } from "../Channel/TextChannel";
import { EvolveClient } from "../../Client/EvolveClient";
import { promisify } from "util";
import { IGuild } from "../../Interfaces/GuildOptions";

export class Message {
	public sentAt!: string;
	public id!: string;
	public pinned!: boolean;
	public mentions: User[] = [];
	public roleMentions?: Array<string>;
	public mentionEveryone!: boolean;
	public member!: GuildMember | undefined;
	public author!: User;
	public editedTimestamp!: number | null;
	public attachments!: Array<string>;
	public content!: string;
	public channel!: Channel;
	public guild?: Guild;
	public channelId!: string;
	public guildId?: string;
	public data!: IMessage;
	private client!: EvolveClient;

	constructor(data: IMessage, client: EvolveClient) {
		Object.defineProperty(this, "client", {
			value: client,
			writable: false,
			enumerable: false,
		});
		Object.defineProperty(this, "data", {
			value: data,
			enumerable: false,
			writable: false,
		});
		if (!this.data) return;
		console.log(this.data.id)
		if (this.data.mentions)
			for (const i of this.data.mentions) {
				this.mentions.push(new User(i));
			}
		/*if (this.data.guild_id){
			this.client.rest.endpoint(Endpoints.GUILD).get<Guild>(this.data.guild_id)
			this.guild = this.client.guilds.get(this.data.guild_id)
			let t = this.guild?.channels.get(this.data.channel_id)
			if(t) this.channel = t as Channel
			else this.channel = this.client.channels.get(this.data.channel_id) as Channel
		}*/
		this.channelId = data.channel_id;
		this.guildId = data.guild_id;
		if (this.data.guild_id)
			this.client.rest.endpoint(Endpoints.GUILD).get<Guild>(this.data.guild_id);
		this.sentAt = this.data.sent_at;
		this.id = this.data.id;
		this.pinned = this.data.pinned;
		this.roleMentions = this.data.mention_roles;
		this.mentionEveryone = this.data.mention_everyone;
		if (this.data.member) this.member = new GuildMember(this.data.member);
		this.author = new User(this.data.author);
		if (this.member) this.member.user = this.author;
		this.editedTimestamp = this.data.edited_timestamp;
		this.attachments = this.data.attachments;
		this.content = this.data.content;
		return this;
	}

	public async delete(time = 0): Promise<void> {
		await promisify(setTimeout)(time);
		return await this.client.rest
			.endpoint(Endpoints.CHANNEL_MESSAGE(this.channel.id))
			.delete(this.id);
	}

	public async edit(content: string, time = 0): Promise<Message> {
		await promisify(setTimeout)(time);
		return await this.client.rest
			.endpoint(Endpoints.CHANNEL_MESSAGE(this.channel.id))
			.patch({ content }, this.id);
	}
}
