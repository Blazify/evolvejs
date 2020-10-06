const { version } = require("../package.json");
const { breaking_changes, changes } = require("./publishChanges.json");
const { EmbedBuilder, EvolveBuilder } = require("../dist");

const client = new EvolveBuilder()
	.setToken("NzUwMDMyNTk2OTYzOTUwNjIy.X00oSg.ryrUyVn99jTEGHcQUotwIM7QHs4")
	.build();

client.sharder.on("shardSpawn", (id) => {
	console.log(`[Shard: ${id}] => Spawned`);
});

client.sharder.on("shardDestroy", (id) => {
	console.log(`[Shard: ${id}] => Destroyed`);
});

client.on("clientReady", async () => {
	console.log("[Client: EvolveClient] => Ready");
	const embed = new EmbedBuilder()
		.setTitle(`EvolveJS | ${version} Release`)
		.setDescription("New Version of EvolveJS has been Released!\n\n Breaking Changes!\n")
		.setThumbnail(new URL("https://cdn.discordapp.com/attachments/712948948343455856/734829166821900438/EvolveJS.png"))
		.setFooter(`EvolveJS | ${Date.now()}`);
	if(breaking_changes) {
		for(let change = 0; change < breaking_changes.length; change++) {
			embed.appendDescription(`${change + 1}. ${breaking_changes[change]}\n`);
		}
	}
	embed.appendDescription("\nChanges!\n");
	if(changes) {
		for(let change = 0; change < changes.length; change++) {
			embed.appendDescription(`${change+1}. ${changes[change]}\n`);
		}
	}
	client.rest.sendMessage(embed.build(), "748181874769395712").then(async () => {
		await client.rest.sendMessage("@everyone", "748181874769395712");
		client.sharder.destroyAll(0);
	    process.exit(0);
	});
	
});