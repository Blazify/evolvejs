import { Guild } from './Guild';
import Channel from '../Channel/VoiceChannel';
import {User} from '../User/User';
import {GuildMember} from './GuildMember';

export default class {
	constructor(
		public guild: Guild,
		public channel: Channel,
		public user: User,
		public member: GuildMember,
		public sessionID: string,
		public deaf: boolean,
		public mute: boolean,
		public selfDeaf: boolean,
		public selfMute: boolean,
		public selfStream: boolean,
		public selfVideo: boolean,
		public supress: boolean
	) {}
}
