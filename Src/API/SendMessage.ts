import fetch from "node-fetch"
import { Client } from ".."

export async function sendMessage(client: Client, content: string, channelID: string, tts: boolean = false) {
let API = "https://discord.com/api/v6"

const message = {
    "content": content,
    "tts": tts,
}
const fetched = await fetch(`${API}/channels/${channelID}/messages`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bot ${client.token}`
    },
    "body": JSON.stringify(message)
})

const json = await fetched.json()
console.log(json)
}