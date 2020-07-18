import Guild from './Guild';
import Channel from './Channel';
import User from './User';
import GuildMember from './GuildMember';
export default class {
    guild: Guild;
    channel: Channel;
    user: User;
    member: GuildMember;
    sessionID: string;
    deaf: boolean;
    mute: boolean;
    selfDeaf: boolean;
    selfMute: boolean;
    selfStream: boolean;
    selfVideo: boolean;
    supress: boolean;
    constructor(guild: Guild, channel: Channel, user: User, member: GuildMember, sessionID: string, deaf: boolean, mute: boolean, selfDeaf: boolean, selfMute: boolean, selfStream: boolean, selfVideo: boolean, supress: boolean);
}
