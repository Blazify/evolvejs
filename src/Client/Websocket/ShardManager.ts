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

  public shutdown(): void {
  	const initialLastShardConnection = this.connections.lastKey(1);
  	for (const [k, v] of this.connections) {
  		v.gateway.destroy();

  		if (k === initialLastShardConnection) {
  			process.exit();
  		}
  	}
  }
}
