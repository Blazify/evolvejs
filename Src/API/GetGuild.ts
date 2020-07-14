import fetch from "node-fetch"
import { Client } from ".."
import { Constants } from "../Constants/Constants";

export async function GetGuild(client: Client, guildID: string) {
let fetched: fetch = await fetch(`${Constants.API}/guilds/${guildID}`, {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bot ${client.token}`
    },
})

return await fetched.json();
}