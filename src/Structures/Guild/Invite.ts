/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { Guild, Channel, User, IInvite, EvolveClient } from "../..";

export class Invite {
  public code!: string;
  public guild!: Guild;
  public channel!: Channel;
  public inviter!: User;
  public targetUser!: User;
  public targetUserType?: number;
  public approxPresenceCount?: number;
  public approxMemberCount?: number;
  constructor(public data: IInvite, private client: EvolveClient) {
  	this._handle();
  }

  private _handle() {
<<<<<<< HEAD
  	if(!this.data) return;
=======
       if(!this.data) return;
>>>>>>> b859af299254f7553c2530743ab846a13638de61
  	this.code = this.data.code;
  	this.guild = new Guild(this.data.guild!, this.client);
  	this.channel = new Channel(
  		this.data.channel.id,
  		this.data.channel.type,
  		this.client
  	);
  	this.inviter = new User(this.data.inviter!);
  	this.targetUser = new User(this.data.target_user!);
  	this.targetUserType = this.data.target_user_type;
  	this.approxPresenceCount = this.data.approximate_presence_count;
  	this.approxMemberCount = this.data.approximate_member_count;
  	return this;
  }
}
