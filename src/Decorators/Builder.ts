import { EvolveBuilder } from "../Client/EvolveBuilder";
import { EvolveClient } from "../Client/EvolveClient";
import { Structures } from "../Structures/Structures";
import { CacheOptions, GatewayIntents } from "../Utils/Constants";

let built = false;

export function Builder(options: BuilderDecoratorOptions) {
	return (target: typeof EvolveClient): void => {
		const builder: EvolveBuilder = new EvolveBuilder(options.token, options.useDefaultSetting ? true : false);
		builder.setClientClass(target);
		if(options.intents) builder.enableIntents(...options.intents);
		if(options.cache) builder.enableCache(...options.cache);
		if(options.secret) builder.setSecret(options.secret);
		if(options.activity) builder.setActivity(options.activity);
		if(options.encoding) builder.setEncoding(options.encoding);
		if(options.shards) builder.setShards(options.shards);
		if(options.structure) builder.setStructureClass(options.structure);

		if(built) throw new Error("Decorator Builder Error");
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
    structure?: Structures
}