const { version } = require("../package.json");
const { breaking_changes, changes } = require("./publishChanges.json");
const { EmbedBuilder, EvolveBuilder } = require("../dist");

const client = new EvolveBuilder()
	.setToken(process.env.DISCORD_TOKEN)
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
		.setImage(new URL("https://cdn.discordapp.com/attachments/712948948343455856/734829166821900438/EvolveJS.png"))
		.setFooter(`EvolveJS | ${Date.now()}`);
	if(breaking_changes) {
		for(let change = 1; change < breaking_changes.length; change++) {
			embed.appendDescription(`${change + 1}. ${breaking_changes[change]}`);
		}
	}
	embed.appendDescription("Changes!\n");
	if(changes) {
		for(let change = 1; change <= changes.length; change++) {
			embed.appendDescription(`${change}. ${changes[change]}`);
		}
	}
	await client.rest.getChannel("748181874769395712").send(embed.build());
	client.sharder.destroyAll(0);
	process.exit(0);
});