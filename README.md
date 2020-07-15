<div align="center">
  <br />
  <p>
   <img src="https://cdn.discordapp.com/avatars/719482391223205918/045ef202ee95380e8e13acab5d3f9d91.webp?size=2048" alt="EvolveJS Logo" />
  </p>
  <br />
  <p>
<a href="https://discord.gg/UDuBXKW"><img src="https://discordapp.com/api/guilds/714874374070599720/widget.png?style=shield" alt="Discord" /></a>
    <a href="https://twitter.com/ABlazify"><img src="https://img.shields.io/twitter/follow/ABlazify?label=Follow&style=social" alt="Twitter" /></a>
    <a href="https://github.com/EvolveJSTS/EvolveJS/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/EvolveJS" alt="License" /></a>
    <a href="https://npmjs.com/package/EvolveJS"><img src="https://img.shields.io/npm/dt/EvolveJS" alt="Downloads" /></a>
    <a href="https://david-dm.org/EvolveJSTS/EvolveJS"><img src="https://img.shields.io/david/EvolveJSTS/EvolveJS" alt="Dependencies" /></a>
  </p>
  <br />
  <p>
    <a href="https://nodei.co/npm/EvolveJS/"><img src="https://nodei.co/npm/EvolveJS.png?downloads=true&stars=true" alt="Status Banner"></a>
  </p>
</div>

## Note
**The module has not been released publicly just the README is made ready**


# Installation

**Using the Node Package Manager (NPM)**

```shell script
npm install EvolveJS
```

# Important

**You need the following things before you can kick off with LavaJS:**

- [**Node Installed**](https://www.nodejs.org)

> The setup has been covered in our official documentation. Do check it out if you have any doubts.

# Documentation and Support

- **The latest changelog can be found [here](#).**
- **Our official documentation is available [here](#).**
- **For any further query and support join us at [Blazify](https://discord.gg/PpaaCJK) discord.**

# Basic Startup Guide

**Example code for running the client:**

```ts
import EvolveJS from "EvolveJS"
const client = new EvolveJS.Client()

/*
 or u can do in the below given way
*/

import { Client } from "EvolveJS"
const client = new Client();

//Initialize the client
client.init("your super secret token")

//Event once the client is ready
client.on("ready", () => {
    console.log(`${client.user.name} is ready to rock!!!`)
});

//other events below :)
```

# Bot Examples

- **[Official Bot](https://github.com/EvolveJSTS/EvolveJS/tree/master/TestBot) - The official example bot from EvolveJS team.**


# Contributor

**Thanks to [Anonymous](https://github.com/ThatAnonymousG) for collaborsting with me in the process of making of the module!**

# Author

- **IamGoDsoIamBest (GoD)**
- **Links: [GitHub](https://github.com/EvolveJSTS) | [Twitter](https://twitter.com/ABlazify)**
- [**Donate The Development**](https://paypal.me/roahgaming)
