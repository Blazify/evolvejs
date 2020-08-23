import { User } from '../User/User';
import Role from './Role';
import {IGuildMember} from "../../Interfaces/GuildMemberOptions"
import { IUser } from '../../Interfaces/UserOptions';
export class GuildMember {
	    public user!: User | undefined;
		public nick!: string | null;
		public roles!: Array<Role['id']>;
		public joinedAt!: number;
		public premiumFrom!: number | undefined | null;
		public deaf!: boolean;
		public mute!: boolean;
	constructor(data: IGuildMember) {
		this.user = data.user
		this.nick = data.nick
		this.roles = data.roles
		this.joinedAt = data.joined_at
		this.premiumFrom = data.premium_since
		this.deaf = data.deaf
		this.mute = data.mute
	}
}
