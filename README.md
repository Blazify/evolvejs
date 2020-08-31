<div align="center">
  <br />
  <p>
   <img src="https://cdn.discordapp.com/attachments/712948948343455856/734829166821900438/EvolveJS.png" alt="EvolveJS Logo" />
  </p>
  <br />
  <p>
<a href="https://discord.gg/9bnpjqY"><img src="https://discordapp.com/api/guilds/714874374070599720/widget.png?style=shield" alt="Discord" /></a>
    <a href="https://twitter.com/ABlazify"><img src="https://img.shields.io/twitter/follow/ABlazify?label=Follow&style=social" alt="Twitter" /></a>
    <a href="https://github.com/EvolveJS/EvolveJS/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/@evolvejs/evolvejs" alt="License" /></a>
    <a href="https://npmjs.com/package/@evolvejs/evolvejs"><img src="https://img.shields.io/npm/dt/@evolvejs/evolvejs" alt="Downloads" /></a>
    <a href="https://david-dm.org/EvolveJS/EvolveJS"><img src="https://img.shields.io/david/EvolveJS/EvolveJS" alt="Dependencies" /></a>
  </p>
  <br />
  <p>
    <a href="https://nodei.co/npm/EvolveJS/"><img src="https://nodei.co/npm/@evolvejs/evolvejs.png?downloads=true&stars=true" alt="Status Banner"></a>
  </p>
</div>



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

- [**Node Installed**](https://www.nodejs.org)

**Currently it isn't documented as it's alpha version, during proper release it will be documented**


# Documentation and Support

- **For any further query and support join us at [EvolveJS](https://discord.gg/9bnpjqY) discord.**

# Current Features 
- **API Class, All Websocket Events, Sharding, API Ratelimiting, Collectors, Embeds, All Structures**

# Upcoming Features
- **Voice Support, All API Endpoints and basically everything more advanced stuff**

# Basic Startup Guide

**Example code for running the client

```js
const { EvolveBuilder, GatewayIntents, CacheOptions } = require("@evolvejs/evolvejs")
const client = new EvolveBuilder()
                    .setToken("")
                    .setShards(2)
                    .enableIntents(GatewayIntent.GUILD)
                    .enableCache(CacheOptions.GUILD)
                    .build()

client.on("clientReady", () => {
  console.log(client.user.username)
})

client.on("newMessage", (msg) => {
  if(msg.content == "ping") {
    message.channel.send("Pong")
  }
})
```

# Author

- **Echo-3-1 (GoD)**
- **Links: [GitHub](https://github.com/Echo-3-1)**
- [**Donate The Development**](https://paypal.me/roahgaming)