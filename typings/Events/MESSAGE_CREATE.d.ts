import { Client, Payload } from "..";
export default function (client: Client, payload: Payload): void;
export declare class Message {
    sentAt: string;
    id: string;
    pinned: boolean;
    mentions: Array<string>;
    rolementions: Array<string>;
    mentionEveryone: boolean;
    member: Member;
    author: Author;
    editedTimestamp: number | null;
    attachments: Array<string>;
    guild: Guild;
    content: string;
    send: (content: string) => Promise<void>;
    constructor(sentAt: string, id: string, pinned: boolean, mentions: Array<string>, rolementions: Array<string>, mentionEveryone: boolean, member: Member, author: Author, editedTimestamp: number | null, attachments: Array<string>, guild: Guild, content: string, send: (content: string) => Promise<void>);
}
interface Member {
    roles: Array<string>;
    muted: boolean;
    joinedAt: string;
    hoistedRole: string;
    deaf: boolean;
}
interface Author {
    username: string;
    flags: number;
    id: string;
    discriminator: string;
    avatar: string;
}
interface Guild {
    id: string;
}
export {};
