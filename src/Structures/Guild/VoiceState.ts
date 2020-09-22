/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { Guild, User, GuildMember, IVoiceState, EvolveClient } from "../../mod.ts";
import { Channel } from "../Channel/Channel.ts";

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
  	if (!this.data) return;
  	(async () => {
  		if (this.data.guild_id)
  			this.guild = await this.client.rest.getGuild(this.data.guild_id);
  		if (this.data.channel_id)
  			this.channel = await this.client.rest.getChannel(this.data.channel_id);
  		this.user = await this.client.rest.getUser(this.data.user_id);
  	})();
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
