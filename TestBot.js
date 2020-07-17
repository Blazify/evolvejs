const { Client } = require("./Dist")
const client = new Client("NzE5NDgyMzkxMjIzMjA1OTE4.XxGgNg.fASStqmReNIUb__UbPRgqwnjuXo")

client.init()

client.once("ready", () => {
})

client.on("guildCreate", (ok) => {
    console.log(client.guilds.get("714874374070599720"))
})