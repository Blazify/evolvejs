import {
	Builder,
	EvolveClient,
	Event,
	MessageEvents,
	Message,
	EmbedBuilder,
} from "../../dist";
import { argv } from "process";

@Builder({
	token: argv[2] ?? require("./config").token ?? process.env.DISCORD_TOKEN,
	useDefaultSetting: true,
})
class Client extends EvolveClient {
  @Event()
	public clientReady() {
		console.log("[Client: EvolveClient] => Ready");
		this.sharder.destroyAll(0);
	}

  @Event()
  public async newMessage(event: MessageEvents) {
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

  		this.sharder.destroyAll();
  	}
  }

  @Event()
  public shardSpawn(id: string) {
  	console.log(`[Shard: ${id}] => Spawned`);
  }

  @Event()
  public shardDestroy(id: string) {
  	console.log(`[Shard: ${id}] => Destroyed`);
  }
}
