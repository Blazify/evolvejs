/* eslint-disable @typescript-eslint/no-non-null-assertion */

import {
  Guild,
  User,
  GuildMember,
  IVoiceState,
  EvolveClient,
  IUser,
  IGuild,
} from "../..";
import { Endpoints } from "../../Utils/Endpoints";
import { Channel } from "../Channel/Channel";

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
    (async () => {
      if (this.data.guild_id)
        this.guild = new Guild(
          await this.client.rest
            .get(Endpoints.GUILD)
            .get<IGuild>(this.data.guild_id),
          this.client
        );
      if (this.data.channel_id)
        this.channel = await this.client.rest
          .get(Endpoints.CHANNEL)
          .get<Channel>(this.data.channel_id);
      this.user = new User(
        await this.client.rest.get(Endpoints.USER).get<IUser>(this.data.user_id)
      );
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
