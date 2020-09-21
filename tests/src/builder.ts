import { EvolveBuilder, EvolveClient, MessageEvents, Message, EmbedBuilder } from "@evolvejs/evolvejs";
import { env } from "process";
import { token } from "./config";

const client: EvolveClient = new EvolveBuilder("", true)
	.setToken(token)
	.setShards(2)
	.build();

client.structures.extend("Message", Message => {
	class newMessage extends Message {
		get args() {
			return this.content.replace("!", "").split(" ");
		}
	}
	return newMessage;
});

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
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	//@ts-ignore
	if(event.message.args[0] === "test") {
		event.message.channel.send(
			new EmbedBuilder()
				.setAuthor("Test")
				.setColor(0xFF0000)
				.setDescription("This is a Test")
				.build()
		);
	}
});