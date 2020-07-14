import { Client, Payload } from ".."

export default function(client: Client, payload: Payload) {
    const { d } = payload

    const SendMessage = async (content: string) => {
        await client.sendMessage(content, d.channel_id)
    }

    const message = new Message(
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
        d.guild_id,
        d.content,
        SendMessage
    )
    client.emit("messageSent", (message))
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
        public guild: Guild,
        public content: string,
        public send: (content: string) => Promise<void>
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
    id: string
}