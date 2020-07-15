import GuildMember from "./GuildMember";
import User from "./User";
import Guild from "./Guild";

export class Message {
    constructor(
        private sentAt: string,
        private id: string,
        private pinned: boolean,
        private mentions: Array<string>,
        private rolementions: Array<string>,
        private mentionEveryone: boolean,
        private member: GuildMember,
        private author: User,
        private editedTimestamp: number | null,
        private attachments: Array<string>,
        private content: string,
        private guild: Guild,
        private send: (content: string) => Promise<Message>,
        private purge: (time: number) => Promise<void>
    ) {

    }
}