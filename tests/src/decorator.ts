import { Builder, EvolveClient, Event } from "../../dist";
import { argv } from "process";

@Builder({
	token: argv[2] ?? process.env.DISCORD_TOKEN,
	useDefaultSetting: true,
})
class _ extends EvolveClient {
	@Event()
	public clientReady() {
		console.log("[Client: EvolveClient] => Ready");
		this.sharder.destroyAll(0);
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
