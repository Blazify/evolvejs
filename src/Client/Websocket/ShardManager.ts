import { sleep } from "https://deno.land/x/sleep/mod.ts";
import { EventListener } from "../../Utils/EventListener.ts";
import { EvolveBuilder } from "../EvolveBuilder.ts";
import { EvolveSocket } from "./Websocket.ts";

export class ShardManager extends EventListener {
  public builder: EvolveBuilder;
  public connections: Map<number, EvolveSocket> = new Map();
  constructor(builder: EvolveBuilder) {
  	super();
  	this.builder = builder;
  }

  public spawnAll(): void {
  	for (let i = 0; i < this.builder.shards; i++) {
  		sleep(5000 * i).then(() => {
  			const socket = new EvolveSocket(this, i);
  			this.connections.set(i, socket);
  		});
  	}
  }

  public shutdown(): void {
  	const initialLastShardConnection = this.connections.size - 1;
  	for (const [k, v] of this.connections) {
  		v.gateway.destroy();

  		if (k === initialLastShardConnection) {
  			Deno.exit();
  		}
  	}
  }

  get ping(): number {
	return this._reduceConnections<number>((a, b) => a + b.shardPing) / this.connections.size;
}

private _reduceConnections<T>(
	fn: (accumulator: T, value: EvolveSocket, key: number) => T
): T {
	let accumulator!: T;

	let first = true;
	for (const [key, val] of this.connections) {
		if (first) {
			accumulator = (val as unknown) as T;
			first = false;
			continue;
		}
		accumulator = fn(accumulator, val, key);
	}

	return accumulator;
}
}
