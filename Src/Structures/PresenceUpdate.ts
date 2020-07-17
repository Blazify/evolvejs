import User from './User';
import Role from './Role';
import Guild from './Guild';
import ClientStatus from './ClientStatus';
import Activity from './Activity';

export default class {
	constructor(
		private user: User,
		private roles: Array<Role['id']>,
		private game: Activity,
		private guild: Guild,
		private status: string,
		private activities: Array<Activity>,
		private clientStatus: ClientStatus,
		private premiumFrom: number,
		private nick: string
	) {}
}
