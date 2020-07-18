import Role from './Role';
import Emoji from './Emoji';
import Channel from './Channel';
import VoiceState from './VoiceState';
import GuildMember from './GuildMember';
import PresenceUpdate from './PresenceUpdate';

export default class {
	constructor(
		public id: string,
		public name: string,
		public icon: string,
		public splash: string,
		public discoverySplash: string,
		public owner: boolean,
		public ownerID: string,
		public permissions: number,
		public region: string,
		public afkChannel: Channel,
		public afkTimeout: number,
		public embedEnabled: boolean,
		public embedChannel: Channel,
		public verificationLevel: number,
		public defMessageNotify: number,
		public explicitContentFilter: number,
		public roles: Array<Role> = new Array(),
		public emojis: Array<Emoji> = new Array(),
		public features: Array<string> = new Array(),
		public mfaLevel: number,
		public applicationID: string,
		public widgetEnabled: boolean,
		public widgetChannel: Channel,
		public systemChannel: Channel,
		public rulesChannel: Channel,
		public joinedAt: number,
		public large: boolean,
		public unavailable: boolean,
		public memberCount: number,
		public voiceStates: Array<VoiceState> = new Array(),
		public members: Array<GuildMember> = new Array(),
		public channels: Array<Channel> = new Array(),
		public presences: Array<PresenceUpdate> = new Array(),
		public maxPresences: number,
		public maxMembers: number,
		public vanityURL: string,
		public description: string,
		public banner: string,
		public premiumTier: number,
		public premiumSubCount: number,
		public preferredlocale: string,
		public updatesChannel: Channel,
		public maxChannelUsers: number,
		public approxMemberCount: number,
		public approxPresenceCount: number
	) {}
}
