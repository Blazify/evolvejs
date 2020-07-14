import { token } from "./Config";

const { Client } = require("../../dist");
const client = new Client();
client.init(token)


client.on("ready", () => {
    console.log(`${client.member.name + "#" + client.member.discriminator} has logged in`)
})
client.on("messageSent", async (message) => {
    console.log(message);
    
    if(message.content === "getGuild") {
        let guild = await client.getGuild(message.guild_id)

        console.log(guild)
    }
    if(message.content === "test") {
    await message.send("https://github.com/zodiac.tsTS/zodiac.ts")
    }
    if(message.content === "shutdown"){
        await message.send("Shutting Down", message.channel_id)
        await client.shutdown()
    }
})
client.on("typeStart", (type) => {
    console.log(type.member.user.username)
})