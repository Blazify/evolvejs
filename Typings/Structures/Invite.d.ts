import Guild from "./Guild";
import Channel from "./Channel";
import User from "./User";
export default class {
    private code;
    private guild;
    private channel;
    private inviter;
    private targetUser;
    private targetUserType;
    private approxPresenceCount;
    private approxMemberCount;
    constructor(code: string, guild: Guild, channel: Channel, inviter: User, targetUser: User, targetUserType: number, approxPresenceCount: number, approxMemberCount: number);
}
