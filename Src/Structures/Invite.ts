import Guild from "./Guild";
import Channel from "./Channel";
import User from "./User";

export default class {
    constructor(
        private code: string,
        private guild: Guild,
        private channel: Channel,
        private inviter: User,
        private targetUser: User,
        private targetUserType: number,
        private approxPresenceCount: number,
        private approxMemberCount: number,
    ){

    }
}