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
		.setDescription("Breaking Changes!\n")
		.setImage(new URL("https://cdn.discordapp.com/attachments/712948948343455856/734829166821900438/EvolveJS.png"))
		.setFooter(`EvolveJS | ${Date.now()}`);
	if(breaking_changes) {
		for(const change in breaking_changes) {
			embed.appendDescription(`${change}. ${breaking_changes[change]}`);
		}
	}
	embed.appendDescription("Changes!\n");
	if(changes) {
		for(const change in changes) {
			embed.appendDescription(`${change}. ${changes[change]}`);
		}
	}
	await client.channels.get("748181874769395712").send(embed.build());
	client.sharder.destroyAll(0);
});