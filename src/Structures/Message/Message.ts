/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-mixed-spaces-and-tabs */

import { User, GuildMember, Guild, IMessage, MessageEmbed } from "../..";
import { TextChannel } from "../Channel/TextChannel";


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
	public delete: (time: number) => Promise<NodeJS.Timeout> = ((time = 0) => this.guild.client.api.deleteMessage(this.id, this.channel.id, time));


	constructor(data: IMessage, channel?: TextChannel, guild?: Guild) {
    	 if(data.mentions) for (const it of data.mentions) {
    	 	this.mentions.push(new User(it));
    	 }
    	if(guild) this.guild = guild;
    	if(channel) this.channel = channel;
    	this.sentAt = data.sent_at;
    	this.id = data.id;
    	this.pinned = data.pinned;
    	this.rolementions = data.mention_roles;
    	this.mentionEveryone = data.mention_everyone;
    	if(data.member) this.member = new GuildMember(data.member);
    	this.author = new User(data.author);
    	if(this.member) this.member.user = this.author;
    	this.editedTimestamp = data.edited_timestamp;
    	this.attachments = data.attachments;
    	this.content = data.content;
		
    	this.channel.send = async(content: string | MessageEmbed): Promise<Message> => {
    		return channel!.client.api.sendMessage(content, this.channel.id);
		};
	}
}
