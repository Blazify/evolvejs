import Role from './Role';
import User from './User';

export default class {
	constructor(
		private id: string,
		private name: string,
		private roles: Array<Role['id']>,
		private user: User,
		private reqColons: boolean,
		private managed: boolean,
		private animated: boolean,
		private available: boolean
	) {}
}
