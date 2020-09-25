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

client.on("newMessage", async (event: MessageEvents) => {
	if (!(event.message instanceof Message)) return;
	if (!event.message.content.startsWith("!")) return;
	if (event.message.content === "test") {
		await event.message.channel.send(
			new EmbedBuilder()
				.setAuthor("Test")
				.setColor(0xff0000)
				.setDescription("This is a Test")
				.build()
		);

		client.sharder.destroyAll();
	}
});
