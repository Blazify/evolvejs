import {User} from '../User/User';
import { Snowflake } from '../../Constants/Constants';

export default class {
	constructor(
		public id: Snowflake,
		public name: string,
		public roles: Snowflake[],
		public user: User,
		public reqColons: boolean,
		public managed: boolean,
		public animated: boolean,
		public available: boolean
	) {}
}
