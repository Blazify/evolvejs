import {
	EvolveBuilder,
	EvolveClient,
	MessageEvents,
	Message,
	EmbedBuilder,
} from "../../";
import { argv } from "process";

const client: EvolveClient = new EvolveBuilder("", true)
	.setToken(argv[2] ?? process.env.DISCORD_TOKEN)
	.build();

client.sharder.on("shardSpawn", (id: number) => {
	console.log(`[Shard: ${id}] => Spawned`);
});

client.sharder.on("shardDestroy", (id: number) => {
	console.log(`[Shard: ${id}] => Destroyed`);
});

client.on("clientReady", () => {
	console.log("[Client: EvolveClient] => Ready");
	client.sharder.destroyAll(0);
});