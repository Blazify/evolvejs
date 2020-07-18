const { Client } = require("./Dist")
const client = new Client("NzE5NDgyMzkxMjIzMjA1OTE4.XxKRzg.AY7uHZVoXdkcMDEA47AguvLegVc")

client.init()

client.once("ready", () => {
    console.log(`Yeea ${client.user.name}`)
})

client.on("guildCreate", (ok) => {
})