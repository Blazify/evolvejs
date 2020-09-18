import { Builder, EvolveClient, Event, MessageEvents, Message, EmbedBuilder } from "@evolvejs/evolvejs";

@Builder({
	token: "",
	shards: 2,
	useDefaultSetting: true
})
export class Client extends EvolveClient {
    @Event("clientReady")
	public onReady(): void {
		for(const [id, connection] of this.shardConnections) {
			connection.gateway.on("shardSpawn", () => {
				console.log(`Shard ${id} has been launched`);
			});
    
			connection.gateway.on("shardDestroy", () => {
				console.log(`Shard ${id} has been destroyed`);
			});
		}
	}
    
    @Event("newMessage")
    public onMessage(event: MessageEvents): void {
    	if(!(event.message instanceof Message)) return;
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
    }
}
