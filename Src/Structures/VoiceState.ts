import Guild from "./Guild";
import Channel from "./Channel";
import User from "./User";
import GuildMember from "./GuildMember";

export default class {

    constructor(
        private guildID: Guild["id"],
        private channelID: Channel["id"],
        private userID: User["id"],
        private member: GuildMember,
        private sessionID: string,
        private deaf: boolean,
        private mute: boolean,
        private selfDeaf: boolean,
        private selfMute: boolean,
        private selfStream: boolean,
        private selfVideo: boolean,
        private supress: boolean,
    ) {

    }
}