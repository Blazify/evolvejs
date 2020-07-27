import GuildMember from './GuildMember';
import User from './User';
import Guild from './Guild/Guild';

export class Message {
	constructor(
		public sentAt: string,
		public id: string,
		public pinned: boolean,
		public mentions: Array<string>,
		public rolementions: Array<string>,
		public mentionEveryone: boolean,
		public member: GuildMember,
		public author: User,
		public editedTimestamp: number | null,
		public attachments: Array<string>,
		public content: string,
		public guild: Guild,
		public send: (content: string) => Promise<Message>,
		public purge: (time: number) => Promise<void>
	) {}
}
