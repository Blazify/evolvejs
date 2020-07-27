import User from './User';
import Role from './Role';

export default class {
	constructor(
		public user: User,
		public nick: string,
		public roles: Array<Role['id']>,
		public joinedAt: number,
		public premiumFrom: number,
		public deaf: boolean,
		public mute: boolean
	) {}
}
