/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { Guild, Channel, User, IInvite, EvolveClient } from "../..";


export class Invite {
   public code: string;
		public guild: Guild;
		public channel: Channel;
		public inviter: User;
		public targetUser: User;
		public targetUserType?: number;
		public approxPresenceCount?: number;
		public approxMemberCount?: number;
		constructor(
			data: IInvite,
			client: EvolveClient
		) {
			this.code = data.code;
			this.guild = new Guild(data.guild!, client);
			this.channel = new Channel(data.channel.id, data.channel.type, client);
			this.inviter = new User(data.inviter!);
			this.targetUser = new User(data.target_user!);
			this.targetUserType = data.target_user_type;
			this.approxPresenceCount = data.approximate_presence_count;
			this.approxMemberCount = data.approximate_member_count;
		}
}
