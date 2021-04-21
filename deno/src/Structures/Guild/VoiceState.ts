/* eslint-disable @typescript-eslint/no-non-null-assertion */

import {
	Guild,
	User,
	GuildMember,
	IVoiceState,
	EvolveClient,
	IUser,
	IGuild,
} from "../../mod.ts";
import { Endpoints } from "../../Utils/Endpoints.ts";
import { Channel } from "../Channel/Channel.ts";

export class VoiceState {
	public guildId?: string;
	public channelId?: string;
	public userId!: string;
	public member?: GuildMember;
	public sessionID!: string;
	public deaf!: boolean;
	public mute!: boolean;
	public selfDeaf!: boolean;
	public selfMute!: boolean;
	public selfStream!: boolean;
	public selfVideo!: boolean;
	public supress!: boolean;
	private client!: EvolveClient;
	public data!: IVoiceState;

	constructor(data: IVoiceState, client: EvolveClient) {
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
		this.guildId = this.data.guild_id;
		this.channelId = this.data.channel_id ?? undefined;
		this.userId = this.data.user_id;
		this.member = this.data.member
			? new GuildMember(this.data.member)
			: undefined;
		this.sessionID = this.data.session_id;
		this.deaf = this.data.deaf;
		this.mute = this.data.mute;
		this.selfDeaf = this.data.self_deaf;
		this.selfMute = this.data.self_mute;
		this.selfStream = this.data.self_stream!;
		this.selfVideo = this.data.self_video;
		this.supress = this.data.suppress;
		return this;
	}
}
