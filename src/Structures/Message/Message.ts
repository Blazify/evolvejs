/* eslint-disable no-mixed-spaces-and-tabs */

import { User, GuildMember, Guild, TextChannel, IMessage, EvolveClient, MessageEmbed } from "../..";


export class Message {
    public sentAt!: string;
    public id!: string;
    public pinned!: boolean;
    public mentions: User[] = [];
    public rolementions?: Array<string>;
    public mentionEveryone!: boolean;
    public member!: GuildMember | undefined;
    public author!: User;
    public editedTimestamp!: number | null;
    public attachments!: Array<string>;
    public content!: string;
    public guild!: Guild;
    public channel!: TextChannel

    constructor(data: IMessage, client: EvolveClient) {
    	this.sentAt = data.sent_at;
    	this.id = data.id;
    	this.pinned = data.pinned;
    	for (const it of data.mentions) {
    		this.mentions.push(new User(it));
    	}
    	this.rolementions = data.mention_roles;
    	this.mentionEveryone = data.mention_everyone;
    	this.member = data.member;
    	this.author = data.author;
    	this.editedTimestamp = data.edited_timestamp;
    	this.attachments = data.attachments;
    	this.content = data.content;
    	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    	client.api.getGuild(data.guild_id!).then(it => this.guild = it);
    	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
    	//@ts-ignore
    	client.api.getChannel(data.channel_id).then(it => this.channel = it);
    	this.channel.send = (content: string | MessageEmbed): Promise<Message> => {
    		return client.api.sendMessage(content, this.channel.id);
    	};

    	this.channel.purge = (time = 0): Promise<NodeJS.Timeout> => {
    		return client.api.deleteMessage(this.id, this.channel.id, time);
    	};
    }
}
