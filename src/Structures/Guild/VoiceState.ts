/* eslint-disable @typescript-eslint/no-non-null-assertion */

import {
	Guild,
	Channel,
	User,
	GuildMember,
	IVoiceState,
	EvolveClient,
} from "../..";

export class VoiceState {
  public guild!: Guild;
  public channel!: Channel;
  public user!: User;
  public member!: GuildMember;
  public sessionID!: string;
  public deaf!: boolean;
  public mute!: boolean;
  public selfDeaf!: boolean;
  public selfMute!: boolean;
  public selfStream!: boolean;
  public selfVideo!: boolean;
  public supress!: boolean;

  constructor(public data: IVoiceState, private client: EvolveClient) {
  	this._handle();
  }

  private _handle() {
  	if (this.data.guild_id)
  		this.client.api
  			.getGuild(this.data.guild_id)
  			.then((o) => (this.guild = o));
  	if (this.data.channel_id)
  		this.client.api
  			.getChannel(this.data.channel_id)
  			.then((o) => (this.channel = o));
  	this.client.api.getUser(this.data.user_id).then((o) => (this.user = o));
  	this.member = new GuildMember(this.data.member!);
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
