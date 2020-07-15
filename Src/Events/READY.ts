import { Client, Payload, ClientUser } from ".."

export default class {
constructor(client: Client, payload: Payload) {
    const { user } = payload.d;
    client.user = new ClientUser(
        user.username,
        user.discriminator,
        user.verified,
        user.id,
        user.flags,
        user.email,
        user.bot,
        user.avatar
    )
    client.emit("ready")
}
}