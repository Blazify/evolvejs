<br />
<p align="center">
 <img src="https://cdn.discordapp.com/attachments/712948948343455856/734829166821900438/EvolveJS.png" alt="EvolveJS Logo" width="500px" heigh="auto"/>
</p>
<p align="center">
  <a href="https://discord.gg/9bnpjqY"><img src="https://discordapp.com/api/guilds/736450058664411166/widget.png?style=shield" alt="Discord" /></a>
  <a href="https://twitter.com/ABlazify"><img src="https://img.shields.io/twitter/follow/ABlazify?label=Follow&style=social" alt="Twitter" /></a>
  <a href="https://github.com/EvolveJS/EvolveJS/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/@evolvejs/evolvejs" alt="License" /></a>
  <a href="https://npmjs.com/package/@evolvejs/evolvejs"><img src="https://img.shields.io/npm/dt/@evolvejs/evolvejs" alt="Downloads" /></a>
  <a href="https://david-dm.org/EvolveJS/EvolveJS"><img src="https://img.shields.io/david/EvolveJS/EvolveJS" alt="Dependencies" /></a>
</p>
<br />
<p align="center">
  <a href="https://nodei.co/npm/@evolvejs/evolvejs"><img src="https://nodei.co/npm/@evolvejs/evolvejs.png?downloads=true&stars=true" alt="Status Banner"></a>
</p>

# What is EvolveJS?
**EvolveJS is a Discord Library in which bots can be made. We provide high control over the module so that the customizability can be the top of the level.
Have fun with the library and happy coding :)**

# Installation

**Using the Node Package Manager (NPM)**

```shell script
npm install @evolvejs/evolvejs
```

# Important

**You need the following things before you can kick off with EvolveJS:**

- [**NodeJS v14 Installed**](https://www.nodejs.org)

# Documentation and Support

- **[Official Docs](https://evolvejs.js.org)**
Note :- The Docs aren't completed
- **For any further query and support join us at [EvolveJS](https://discord.gg/9bnpjqY) discord.**

# Basic Startup Guide

**Example code for running the client**

```js
const { EvolveBuilder, GatewayIntents, CacheOptions } = require("@evolvejs/evolvejs")
const client = new EvolveBuilder()
                    .setToken("")
                    .setShards(2)
                    .enableIntents(GatewayIntent.GUILD)
                    .enableCache(CacheOptions.GUILD)
                    .build()

client.on("clientReady", () => {
  console.log(client.user.username) // logs the client's username when all shard is ready
})

client.sharder.on("shardSpawn", (id) => console.log(`${id} shard is now online`))
client.sharder.on("shardDestroy", (id) => console.log(`${id} shard is destryed`))

client.on("newMessage", (event) => {
  if(event.message.content == "ping") { // checks if the message sent was "ping"
    event.channel.send("Pong") // sends a message with content of "Pong"
    console.log(event.shard) //logs the entire shard websocket in which the event was triggered
  } else if(event.message.content == "shutdown") {
    event.channel.send("Shutting Down");// sends message saying client is shutting down
    client.sharder.shutdown();//proper shard destryoing returns multiple shard destroy event if multiple shards
  })


```

# More Information
- **If you want to use ETF for Payloads Sending, just use EvolveBuilder#setEncoding, make sure to install erlpack, as it's a dev dependency of the package**
- **If you want to contribute, you can star the repo or make pull request, but the pull request should be on the development branch, id you are adding anything from [#4](https://github.com/EvolveJS/EvolveJS/issues/4), just comment saying *feature* has been implemented**

# Author(s)

- [**Echo-3-1**](https://github.com/Echo-3-1) 

- [Creeper](https://github.com/CreeperPlanet26)

- [Zihad](https://github.com/zihadmahiuddin)

# Contributor

- [**Olyno**](https://github.com/Olyno)
