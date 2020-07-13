import { token } from "./Config";

const { Client } = require("../dist");
const client = new Client();
client.init(token)

client.on("ready", (client) => {
    console.log(`${client.member.name + "#" + client.member.discriminator} has logged in`)
})
client.on("messageSent", async (message) => {
    console.log(message);
    if(message.content === "getGuild") {
        client.getGuild(message.guild_id)
    }
    if(message.content === "test") {
    client.sendMessage("https://github.com/ZodiacTS/Zodiac", message.channel_id)
    }
})
client.on("typeStart", (type) => {
    console.log(type.member.user.username)
})