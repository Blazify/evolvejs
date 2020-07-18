import Role from './Role';
import User from './User';

export default class {
	constructor(
		public id: string,
		public name: string,
		public roles: Array<Role['id']>,
		public user: User,
		public reqColons: boolean,
		public managed: boolean,
		public animated: boolean,
		public available: boolean
	) {}
}
