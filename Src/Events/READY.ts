import { Client, Payload, ClientMember } from ".."

export default function(client: Client, payload: Payload) {
    const { user } = payload.d;
    client.member = new ClientMember(
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