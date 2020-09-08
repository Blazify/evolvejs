<div align="center">
  <br />
  <p>
   <img src="https://cdn.discordapp.com/attachments/712948948343455856/734829166821900438/EvolveJS.png" alt="EvolveJS Logo" />
  </p>
  <br />
  <p>
<a href="https://discord.gg/9bnpjqY"><img src="https://discordapp.com/api/guilds/736450058664411166/widget.png?style=shield" alt="Discord" /></a>
    <a href="https://twitter.com/ABlazify"><img src="https://img.shields.io/twitter/follow/ABlazify?label=Follow&style=social" alt="Twitter" /></a>
    <a href="https://github.com/EvolveJS/EvolveJS/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/@evolvejs/evolvejs" alt="License" /></a>
    <a href="https://npmjs.com/package/@evolvejs/evolvejs"><img src="https://img.shields.io/npm/dt/@evolvejs/evolvejs" alt="Downloads" /></a>
    <a href="https://david-dm.org/EvolveJS/EvolveJS"><img src="https://img.shields.io/david/EvolveJS/EvolveJS" alt="Dependencies" /></a>
  </p>
  <br />
  <p>
    <a href="https://nodei.co/npm/@evolvejs/evolvejs"><img src="https://nodei.co/npm/@evolvejs/evolvejs.png?downloads=true&stars=true" alt="Status Banner"></a>
  </p>
</div>

<iframe src="https://discordapp.com/widget?id=736450058664411166&theme=dark" width="350" height="500" allowtransparency="true" frameborder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>

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

# Documentation and Support

- **[Official Docs](https://evolvejs.github.io)**
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
  console.log(client.user.username)
})

client.on("newMessage", (event) => {
  if(msg.content == "ping") {
    event.channel.send("Pong")
  }
})
```

# Author

- **Echo-3-1 (GoD)**
- **Links: [GitHub](https://github.com/Echo-3-1)**
- [**Donate The Development**](https://paypal.me/roahgaming)