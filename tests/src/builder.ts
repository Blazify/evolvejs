import { EvolveBuilder, EvolveClient, MessageEvents, Message, EmbedBuilder } from "@evolvejs/evolvejs";

const client: EvolveClient = new EvolveBuilder("", true)
	.setToken("")
	.setShards(2)
	.build();

client.on("clientReady", () => {
	for(const [id, connection] of client.shardConnections) {
		connection.gateway.on("shardSpawn", () => {
			console.log(`Shard ${id} has been launched`);
		});

		connection.gateway.on("shardDestroy", () => {
			console.log(`Shard ${id} has been destroyed`);
		});
	}
});

client.on("newMessage", (event: MessageEvents) => {
	if(!(event.message instanceof Message)) return;
	if(!event.message.content.startsWith("!")) return;
	const args: string[] = event.message.content.replace("!", "").split(" ");
	if(args[0] === "test") {
		event.message.channel.send(
			new EmbedBuilder()
				.setAuthor("Test")
				.setColor(0xFF0000)
				.setDescription("This is a Test")
				.build()
		);
	}
});