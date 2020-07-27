import Guild from './Guild';
import Channel from './Channel';
import User from './User';
export default class {
    code: string;
    guild: Guild;
    channel: Channel;
    inviter: User;
    targetUser: User;
    targetUserType: number;
    approxPresenceCount: number;
    approxMemberCount: number;
    constructor(code: string, guild: Guild, channel: Channel, inviter: User, targetUser: User, targetUserType: number, approxPresenceCount: number, approxMemberCount: number);
}
