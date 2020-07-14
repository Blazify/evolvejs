import { Client } from ".."
import { Constants } from "../Constants/Constants"

export async function deleteMessage(client: Client, channelID: string, messageID: string) {

let fetched = await fetch(`${Constants.API}/channels/${channelID}/messages/${messageID}`, {
    method: "DELETE",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bot ${client.token}`
    }
})
return await fetched.json()
}