import { Objex } from "@evolvejs/objex";
import { promisify } from "util";
import { EventListener } from "../../Utils/EventListener";
import { EvolveBuilder } from "../EvolveBuilder";
import { EvolveSocket } from "./Websocket";

export class ShardManager extends EventListener {
  public builder: EvolveBuilder;
  public connections: Objex<number, EvolveSocket> = new Objex();
  constructor(builder: EvolveBuilder) {
  	super();
  	this.builder = builder;
  }

  public spawnAll(): void {
  	for (let i = 0; i < this.builder.shards; i++) {
  		promisify(setTimeout)(5000 * i).then(() => {
  			const socket = new EvolveSocket(this, i);
  			this.connections.set(i, socket);
  		});
  	}
  }

  public destroy(id: number): void {
    this.connections.get(id)?.gateway.destroy();
  }

  public respawn(id: number): void {
    this.connections.get(id)?.gateway.reconnect();
  }

  public destroyAll(code = 0): void {
  	const initialLastShardConnection = this.connections.size - 1;
  	for (const [k, v] of this.connections) {
  		v.gateway.destroy();

  		if (k === initialLastShardConnection) {
  			process.exit(code);
  		}
  	}
  }

  get ping(): number {
  	return (
  		this._reduceConnections<number>((a, b) => a + b.shardPing) /
      this.connections.size
  	);
  }

  public getguildShardId(guildID: string): number {
  	return (Number(guildID) >> 22) % this.connections.size;
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
