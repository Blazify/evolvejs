import User from './User';
import Role from './Role';
import Guild from './Guild';
import ClientStatus from './ClientStatus';
import Activity from './Activity';

export default class {
	constructor(
		public user: User,
		public roles: Array<Role['id']>,
		public game: Activity,
		public guild: Guild,
		public status: string,
		public activities: Array<Activity>,
		public clientStatus: ClientStatus,
		public premiumFrom: number,
		public nick: string
	) {}
}
