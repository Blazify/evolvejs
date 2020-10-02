import { EvolveBuilder } from "../Client/EvolveBuilder.ts";
import { EvolveClient } from "../Client/EvolveClient.ts";
import { CacheProviders } from "../Interfaces/Interfaces.ts";
import { Structures } from "../Structures/Structures.ts";
import { CacheOptions, GatewayIntents } from "../Utils/Constants.ts";

let built = false;

export function Builder(options: BuilderDecoratorOptions) {
	return (target: typeof EvolveClient): void => {
		const builder: EvolveBuilder = new EvolveBuilder(
			options.token,
			options.useDefaultSetting ?? true
		).setClientClass(target);

		if (options.intents) builder.enableIntents(...options.intents);
		if (options.cache) builder.enableCache(...options.cache);
		if (options.secret) builder.setSecret(options.secret);
		if (options.activity) builder.setActivity(options.activity);
		if (options.encoding) builder.setEncoding(options.encoding);
		if (options.shards) builder.setShards(options.shards);
		if (options.structure) builder.setStructureClass(options.structure);
		if (options.cacheProvider) builder.setCacheProviders(options.cacheProvider);

		if (built) throw new Error("Decorator Builder Error");
		builder.build();
		built = true;
	};
}

interface BuilderDecoratorOptions {
 intents?: GatewayIntents[];
 cache?: CacheOptions[];
 useDefaultSetting?: boolean;
 token: string;
 secret?: string;
 activity?: Object;
 encoding?: "json" | "etf";
 shards?: number;
 structure?: Structures;
 cacheProvider?: CacheProviders;
}
