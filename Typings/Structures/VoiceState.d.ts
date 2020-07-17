import Guild from './Guild';
import Channel from './Channel';
import User from './User';
import GuildMember from './GuildMember';
export default class {
    private guild;
    private channel;
    private user;
    private member;
    private sessionID;
    private deaf;
    private mute;
    private selfDeaf;
    private selfMute;
    private selfStream;
    private selfVideo;
    private supress;
    constructor(guild: Guild, channel: Channel, user: User, member: GuildMember, sessionID: string, deaf: boolean, mute: boolean, selfDeaf: boolean, selfMute: boolean, selfStream: boolean, selfVideo: boolean, supress: boolean);
}
