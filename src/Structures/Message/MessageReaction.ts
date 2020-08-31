/* eslint-disable no-mixed-spaces-and-tabs */
import { User, TextChannel, Message, GuildMember, Guild, Emoji, IMessageReaction, EvolveClient } from "../../";

export class MessageReaction {
    public user?: User;
    public channel!: TextChannel;
    public message!: Message;
    public member?: GuildMember;
    public guild!: Guild;
    public emoji?: Emoji;

    constructor(data: IMessageReaction, client: EvolveClient) {
    	this.message = new Message(data.message, client);
    	this.channel = new TextChannel(data.channel, client);
    	this.emoji = new Emoji(data.emoji);
    	this.user = new User(data.user);
    	this.member = new GuildMember(data.member);
    	this.guild = new Guild(data.guild, client);
    }
}