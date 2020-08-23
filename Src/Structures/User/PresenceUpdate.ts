import {User} from './User';
import Role from '../Guild/Role';
import { Guild } from '../Guild/Guild';
import ClientStatus from '../Miscs/ClientStatus';
import Activity from './Activity';
import { Snowflake } from '../../Constants/Constants';

export default class {
	constructor(
		public user: User,
		public roles: Array<Snowflake>,
		public game: Activity,
		public guild: Guild,
		public status: string,
		public activities: Array<Activity>,
		public clientStatus: ClientStatus,
		public premiumFrom: number,
		public nick: string
	) {}
}
