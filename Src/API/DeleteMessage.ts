import { Client } from ".."
import { Constants } from "../Constants/Constants"
import fetch from "node-fetch"

export async function deleteMessage(client: Client, channelID: string, messageID: string) {

await fetch(`${Constants.API}/channels/${channelID}/messages/${messageID}`, {
    method: "DELETE",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bot ${client.token}`
    }
})
}