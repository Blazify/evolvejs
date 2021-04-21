/* eslint-disable no-mixed-spaces-and-tabs */
import {
	User,
	TextChannel,
	Message,
	GuildMember,
	Guild,
	Emoji,
	IMessageReaction,
	EvolveClient,
} from "../../.ts";

export class MessageReaction {
	public user?: User;
	public channel!: TextChannel;
	public message!: Message;
	public member?: GuildMember;
	public guild!: Guild;
	public emoji?: Emoji;
	private client!: EvolveClient;
	public data!: IMessageReaction;

	constructor(data: IMessageReaction, client: EvolveClient) {
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
		this.message = new Message(this.data.message, this.client);
		this.channel = new TextChannel(this.data.channel, this.client);
		this.emoji = new Emoji(this.data.emoji);
		this.user = new User(this.data.user);
		this.member = new GuildMember(this.data.member);
		this.guild = new Guild(this.data.guild, this.client);
		return this;
	}
}
