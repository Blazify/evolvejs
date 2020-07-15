import Role from "./Role";
import Emoji from "./Emoji";
import Channel from "./Channel";
import VoiceState from "./VoiceState";
import GuildMember from "./GuildMember";
import PresenceUpdate from "./PresenceUpdate";

export default class {

    constructor(
        private id: string,
        private name: string,
        private icon: string,
        private splash: string,
        private discoverySplash: string,
        private owner: boolean,
        private ownerID: string,
        private permissions: number,
        private region: string,
        private afkChannelID: string,
        private afkTimeout: number,
        private embedEnabled: boolean,
        private embedChannelID: string,
        private verificationLevel: number,
        private defMessageNotify: number,
        private explicitContentFilter: number,
        private roles: Array<Role>,
        private emojis: Array<Emoji>,
        private features: Array<string>,
        private mfaLevel: number,
        private applicationID: string,
        private widgetEnabled: boolean,
        private widgetChannelID: Channel["id"],
        private systemChannelID: Channel["id"],
        private rulesChannelID: Channel["id"],
        private joinedAt: number,
        private large: boolean,
        private unavailable: boolean,
        private memberCount: number,
        private voiceStates: Array<VoiceState>,
        private members: Array<GuildMember>,
        private channels: Array<Channel>,
        private presences: Array<PresenceUpdate>,
        private maxPresences: number,
        private maxMembers: number,
        private vanityURL: string,
        private description: string,
        private banner: string,
        private premiumTier: number,
        private premiumSubCount: number,
        private preferredlocale: string,
        private updatesChannelID: Channel["id"],
        private maxChannelUsers: number,
        private approxMemberCount: number,
        private approxPresenceCount: number
    ) {

    }
}