/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-mixed-spaces-and-tabs */

import { User, Role, IGuildMember } from "../..";

export class GuildMember {
  public user!: User | undefined;
  public nick!: string | null;
  public roles!: Array<Role["id"]>;
  public joinedAt!: number;
  public premiumFrom!: number | undefined | null;
  public deaf!: boolean;
  public mute!: boolean;
  constructor(public data: IGuildMember) {
  	this._handle();
  }

  private _handle() {
  	if (!this.data) return;
  	if (this.data.user) this.user = new User(this.data.user);
  	this.nick = this.data.nick;
  	this.roles = this.data.roles;
  	this.joinedAt = this.data.joined_at;
  	this.premiumFrom = this.data.premium_since;
  	this.deaf = this.data.deaf;
  	this.mute = this.data.mute;

  	return this;
  }
}
