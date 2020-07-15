import { token } from "./Config";

import { Client } from "../../dist";
const client = new Client();
client.init(token)


client.on("ready", () => {
    console.log(`${client.user.name + "#" + client.user.discriminator} has logged in`)
})
client.on("messageSent", async (message) => {
    console.log(message);
    
    if(message.content === "getGuild") {
        let guild = await client.getGuild(message.guild_id)

        console.log(guild)
    }
    if(message.content === "test") {
    await message.guild.send("https://github.com/EvolveJS/EvolveJS")
    }
    if(message.content === "shutdown"){
        await message.guild.send("Shutting Down", message.channel_id)
        await client.shutdown()
    }
})
client.on("typeStart", (type) => {
    console.log(type.member.user.username)
})