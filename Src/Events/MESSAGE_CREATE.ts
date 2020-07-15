import { Client, Payload } from ".."

export default class {
    constructor(client: Client, payload: Payload) {
    const { d } = payload

    const SendMessage = async (content: string): Promise<Message> => {
        let msg = await client.sendMessage(content, d.channel_id)
        msg = new Message(
            msg.timestamp,
            msg.id,
            msg.pinned,
            msg.mentions,
            msg.mention_roles,
            msg.mention_everyone,
            msg.member,
            msg.author,
            msg.edited_timestamp,
            msg.attachments,
            msg.content,
            {
               "id": d.guild_id,
               "send": SendMessage,
               "delete": async (time: number = 0) => {
                   setTimeout(async () => {
                    return await client.deleteMessage(msg.id, msg.channel_id);
                   }, time)
               }
            }
        )
        return msg;
    }

    const message: Message = new Message(
        d.timestamp,
        d.id,
        d.pinned,
        d.mentions,
        d.mention_roles,
        d.mention_everyone,
        d.member,
        d.author,
        d.edited_timestamp,
        d.attachments,
        d.content,
        {
           "id": d.guild_id,
           "send": SendMessage,
           "delete": async (time: number = 0) => {
            setTimeout(async () => {
             return await client.deleteMessage(d.id, d.channel_id);
            }, time)
        }
        }
    )
    client.emit("messageSent", (message))
}
}

export class Message {
    constructor(
        public sentAt: string,
        public id: string,
        public pinned: boolean,
        public mentions: Array<string>,
        public rolementions: Array<string>,
        public mentionEveryone: boolean,
        public member: Member,
        public author: Author,
        public editedTimestamp: number | null,
        public attachments: Array<string>,
        public content: string,
        public guild: Guild,
    ) {

    }
}

interface Member {
    roles: Array<string>,
    muted: boolean,
    joinedAt: string,
    hoistedRole: string,
    deaf: boolean
}

interface Author {
    username: string,
    flags: number,
    id: string,
    discriminator: string,
    avatar: string
}

interface Guild {
    id: string,
    send: (content: string) => Promise<Message>,
    delete: (time: number) => Promise<void>
}