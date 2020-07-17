import Guild from './Guild';
import Channel from './Channel';
import User from './User';
import GuildMember from './GuildMember';

export default class {
	constructor(
		private guild: Guild,
		private channel: Channel,
		private user: User,
		private member: GuildMember,
		private sessionID: string,
		private deaf: boolean,
		private mute: boolean,
		private selfDeaf: boolean,
		private selfMute: boolean,
		private selfStream: boolean,
		private selfVideo: boolean,
		private supress: boolean
	) {}
}
