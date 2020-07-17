import GuildMember from './GuildMember';
import User from './User';
import Guild from './Guild';
export declare class Message {
    private sentAt;
    private id;
    private pinned;
    private mentions;
    private rolementions;
    private mentionEveryone;
    private member;
    private author;
    private editedTimestamp;
    private attachments;
    private content;
    private guild;
    private send;
    private purge;
    constructor(sentAt: string, id: string, pinned: boolean, mentions: Array<string>, rolementions: Array<string>, mentionEveryone: boolean, member: GuildMember, author: User, editedTimestamp: number | null, attachments: Array<string>, content: string, guild: Guild, send: (content: string) => Promise<Message>, purge: (time: number) => Promise<void>);
}
