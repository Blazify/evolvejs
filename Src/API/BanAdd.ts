import { Client } from ".."
import { Constants } from "../Constants/Constants"

export async function banAdd(client: Client, guildID: string, userID: string) {

let fetched = await fetch(`${Constants.API}/guilds/${guildID}/bans/${userID}`, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bot ${client.token}`
    }
})
return await fetched.json()
}