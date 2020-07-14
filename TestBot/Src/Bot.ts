import { token } from "./Config";

const { Client } = require("../../dist");
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
    await message.guild.send("https://github.com/ZodiacTS/zodiac.ts")
    }
    if(message.content === "shutdown"){
        await message.guild.send("Shutting Down", message.channel_id)
        await client.shutdown()
    }
})
client.on("typeStart", (type) => {
    console.log(type.member.user.username)
})