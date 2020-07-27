import Guild from './Guild';
import Channel from '../Channel/Channel';
import User from '../User/User';

export default class {
	constructor(
		public code: string,
		public guild: Guild,
		public channel: Channel,
		public inviter: User,
		public targetUser: User,
		public targetUserType: number,
		public approxPresenceCount: number,
		public approxMemberCount: number
	) {}
}
