import { Client, Payload } from ".."

export default function(client: Client, payload: Payload) {
    client.emit("integrationRemove", (payload.d))
}