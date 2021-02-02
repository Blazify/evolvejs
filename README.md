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

# Node and Deno Support
**Often times people ask node and deno are different in many ways so how can a library be present in both? Well in our case we have a [simple script](https://github.com/EvolveJS/EvolveJS/blob/master/scripts/nodetodeno.js) which just changes some of the internals of the library and pushed to the [deno-master](https://github.com/EvolveJS/EvolveJS/blob/deno-master) branch... Note: The Docs are valid for both node and deno as the user experience is same...**

# Installation

**Node Usage**

```shell script
npm install @evolvejs/evolvejs
```
**Deno Usage**
- **Import from `https://deno.land/x/evolvejs`**

# Important

**You need the following things before you can kick off with EvolveJS:**

**Node:**
- [**NodeJS v15 Installed**](https://www.nodejs.org)

**Deno**
- [**Deno Installed**](https://deno.land)

# Documentation and Support

- **[Official Docs](https://evolve.js.org)**
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
```
**Incase of Deno use https://deno.land/x/evolvejs instead of @evolvejs/evolvejs**

# More Information
- **If you want to use ETF for Payloads Sending, just use EvolveBuilder#setEncoding, make sure to install erlpack, as it's a dev dependency of the package**
- **If you want to contribute, you can star the repo or make pull request, but the pull request should be on the development branch, id you are adding anything from [#4](https://github.com/EvolveJS/EvolveJS/issues/4), just comment saying *feature* has been implemented**

# Author(s)

- [**RoMeAh**](https://github.com/RoMeAh)

- [**Collbrothers**](https://github.com/Collbrothers)

- **[nerdthatnoonelikes](https://github.com/nerdthatnoonelikes)**

## Contributor

- **[Olyno](https://github.com/Olyno)**
