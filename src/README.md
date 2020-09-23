<div align="center">
  <br />
  <p>
   <img src="https://cdn.discordapp.com/attachments/712948948343455856/734829166821900438/EvolveJS.png" alt="EvolveJS Logo" />
  </p>
  <br />
  <p>
<a href="https://discord.gg/9bnpjqY"><img src="https://discordapp.com/api/guilds/736450058664411166/widget.png?style=shield" alt="Discord" /></a>
  </p>
  <br />
  <p>
  <iframe src="https://discordapp.com/widget?id=736450058664411166&theme=dark" width="350" height="500" allowtransparency="true" frameborder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
  </p>
</div>



# What is EvolveJS?
**EvolveJS is a Discord Library in which bots can be made. We provide high control over the module so that the customizability can be the top of the level.
Have fun with the library and happy coding :)**

# Important

**You need the following things before you can kick off with EvolveJS:**

- [**Deno Installed**](https://deno.land)

# Support

- **For NodeJS Suppport read [this](https://github.com/EvolveJS/EvolveJS/blob/master/README.md)**

- **For any further query and support join us at [EvolveJS](https://discord.gg/9bnpjqY) discord.**

# Basic Startup Guide

**Example code for running the client**

```ts
import { EvolveBuilder, EvolveClient, GatewayIntents, CacheOptions, MessageEvents, Message } from "https://deno.land/x/evolvejs@0.2.8-alpha/mod.ts";
const client: EvolveClient = new EvolveBuilder()
  .setToken("")
  .enableIntents(GatewayIntents.GUILD)
  .enableCache(CacheOptions.GUILD)
  .build()

client.on("clientReady", () => {
  console.log(client.user.username) // logs the client's username when all shard is ready
})

client.sharder.on("shardSpawn", (id: number) => console.log(`${id} shard is now online`))
client.sharder.on("shardDestroy", (id: number) => console.log(`${id} shard is destryed`))

client.on("newMessage", (event: MessageEvents) => {
  if(!(event.message instanceof Message)) return;
  if(!event.message) return;
  if(!event.channel) return;

  if(event.message.content == "ping") { // checks if the message sent was "ping"
    event.channel.send(`Pong`) // sends a message with content of "Pong"
    console.log(event.shard) //logs the entire shard websocket in which the event was triggered
  } else if(event.message.content == "shutdown") {
    event.channel.send("Shutting Down");// sends message saying client is shutting down
    client.sharder.shutdown();//proper shard destryoing returns multiple shard destroy event if multiple shards
  }
})
```

# Author(s)

## **[Echo-3-1](https://github.com/Echo-3-1)** 


# Contributor

- **Put ya name here after contributing**