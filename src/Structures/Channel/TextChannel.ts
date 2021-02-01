import { Channel } from "./Channel";
import { Objex } from "@evolvejs/objex";
import { Overwrite } from "./Overwrite";
import { Guild } from "../Guild/Guild";
import { CategoryChannel } from "./CategoryChannel";
import { MessageEmbed } from "../../Utils/Embed/MessageEmbed";
import { Message } from "../Message/Message";
import { ITextChannel } from "../../Interfaces/TextChannelOptions";
import { CHANNELTYPES } from "../../Utils/Constants";
import { EvolveClient } from "../../Client/EvolveClient";
import { Endpoints } from "../../Utils/Endpoints";
import { IMessage } from "../../Interfaces/MessageOptions";

export class TextChannel extends Channel {
	public overwrites: Objex<string, Overwrite> = new Objex();

	public guild?: Guild;
	public position!: number;
	public name!: string;
	public topic?: string;
	public nsfw!: boolean;
	public lastMessage?: string;
	public rateLimit!: number;
	public parentId?: string;
	public lastPin?: number;
	public data!: ITextChannel;

	constructor(data: ITextChannel, client: EvolveClient) {
		super(data.id, CHANNELTYPES.Text, client);
		Object.defineProperty(this, "data", {
			value: data,
			enumerable: false,
			writable: false,
		});
		this._handle();
	}

	private _handle() {
		if (!this.data) return;
		this.guild = this.client.guilds.get(this.data.guild_id);
		this.position = this.data.position;
		this.name = this.data.name;
		this.topic = this.data.topic ?? "";
		this.nsfw = this.data.nsfw;
		this.rateLimit = this.data.rate_limit_per_user;
		this.parentId = this.data.parent_id ?? undefined;
		this.lastPin = this.data.last_pin_timestamp;
	}

	public async send(content: string | MessageEmbed): Promise<Message> {
		return new Message(
			await this.client.rest
				.endpoint(Endpoints.CHANNEL_MESSAGES)
				.post<IMessage>(
					typeof content === "string" ? { content } : { embed: content },
					this.id
				),
			this.client
		);
	}
}
