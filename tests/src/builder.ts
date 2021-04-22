// @ts-ignore
import {EvolveBuilder, EvolveClient, EVENTS, Message, MessageEvents} from "../../dist";
import { argv } from "process";

const client: EvolveClient = new EvolveBuilder()
	.setToken("" ?? process.env.DISCORD_TOKEN ?? "...")
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
		console.log(client.transformer.debug(client.sharder.getGuildShardId(k).toString()))
	}
});
	client.on(EVENTS.MESSAGE_CREATE, (m: MessageEvents<Message>) => console.log(m.message.content))
