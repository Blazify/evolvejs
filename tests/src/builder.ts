import { EvolveBuilder, EvolveClient, EVENTS } from "../../dist";
import { argv } from "process";

const client: EvolveClient = new EvolveBuilder()
	.setToken(argv[2] ?? process.env.DISCORD_TOKEN ?? "...")
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
		client.transformer.debug(client.sharder.getguildShardId(k).toString());
	}
});

client.on(EVENTS.MESSAGE_CREATE, console.log);
