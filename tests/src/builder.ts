import { EvolveBuilder, EvolveClient } from "../../dist";
import { argv } from "process";

const client: EvolveClient = new EvolveBuilder("", true)
  .setToken(
    argv[2] ??
      process.env.DISCORD_TOKEN ??
      "NzUwMDMyNTk2OTYzOTUwNjIy.X00oSg.vjn5DFvhEj3IbYnSJp3kj49tdaA"
  )
  .build();

client.sharder.on("shardSpawn", (id: number) => {
  console.log(`[Shard: ${id}] => Spawned`);
});

client.sharder.on("shardDestroy", (id: number) => {
  console.log(`[Shard: ${id}] => Destroyed`);
});

client.on("clientReady", () => {
  console.log("[Client: EvolveClient] => Ready");
  for (const [k, _] of client.guilds) {
    client.logger.debug(client.sharder.getguildShardId(k).toString());
  }
  /*
  client.sharder.destroyAll(0);
  process.exit(0);
  */ // due to idiot github, that they always respawn, you dont need to do this
});
