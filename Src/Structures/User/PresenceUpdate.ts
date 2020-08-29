import {User} from './User';
import { Guild } from '../Guild/Guild';
import ClientStatus from '../Miscs/ClientStatus';
import Activity from './Activity';
import { Role } from '../Guild/Role';
import { IPresenceUpdate } from '../../Interfaces/PresenceUpdateOptions';
import { Objex } from '@evolvejs/objex';
import { Snowflake } from '../../Constants/Constants';
import { EvolveClient } from '../../Client/EvolveClient';

export default class {
	    public user!: User;
		public roles: Objex<Snowflake, Role> = new Objex();
		public game!: Activity;
		public guild!: Guild;
		public status!: string;
		public activities!: Array<Activity>;
		public clientStatus!: ClientStatus;
		public premiumFrom!: number;
		public nick!: string;
	constructor(
		data: IPresenceUpdate,
		client: EvolveClient
	) {
		this.user = new User(data.user)
		data.roles.forEach(o => this.roles.set(o, client.roles.get(o)!))
		data.game?.forEach(o => this.game = new Activity(o))
		client.api.getGuild(data.guild_id).then(o => this.guild = o)
		this.status = data.status
		this.activities = data.activities
		this.clientStatus = new ClientStatus(data.client_status)
		this.premiumFrom = data.premium_since!
		this.nick = data.nick!
	}
}
