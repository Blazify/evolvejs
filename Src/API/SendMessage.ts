import fetch from "node-fetch"
import { Client } from ".."
import { Constants } from "../Constants/Constants"

export async function sendMessage(client: Client, content: string, channelID: string, tts: boolean = false) {
const message = {
    "content": content,
    "tts": tts,
}
let fetched = await fetch(`${Constants.API}/channels/${channelID}/messages`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bot ${client.token}`
    },
    body: JSON.stringify(message)
})
return await fetched.json()
}