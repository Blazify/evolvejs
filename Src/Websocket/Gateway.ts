import { EvolveSocket } from './Websocket';
import { OPCODE } from '../Constants/OpCodes';
import { Payload } from '../Interfaces/Interfaces';
import { Heartbeat, Identify } from '../Constants/Payloads';
import { Data } from 'ws';
import { EvolveLogger } from '../Client/EvolveLogger';


export class Gateway {
	public launchedShards: Set<number> = new Set()
	constructor(
		public data: Data, 
		public ws: EvolveSocket, 
		) {
			for(let i = 0; i  < ws.builder.shards; i++) {
				setTimeout(() => {
				this.spawn(i)
				}, (5000 * i))
			}
		}
		public spawn(shard: number) {
			try {
				if(this.launchedShards.has(shard)) {
					EvolveLogger.error("Internal Shard Spawning Error (Double Shard Instances)")
				} else if(!this.launchedShards.has(shard)) {
					this.launchedShards.add(shard)
				}
				let payload: Payload = JSON.parse(this.data.toString());
				const { op, t, d } = payload;
				if (!d) return;
		
				if (op === OPCODE.Hello) {
					// Command: Heartbeat
					setInterval(() => {
						if (this.ws.seq) Heartbeat.d = this.ws.seq;
						this.ws.send(JSON.stringify(Heartbeat));
					}, d.heartbeat_interval);
		
					// Command: Identify

					Identify.d.token = this.ws.client.token 
					Identify.d.intents = this.ws.builder.intents
					Identify.d.shards = [shard, this.ws.builder.shards]
		
					if(this.ws.builder.activity) {
						Identify.d.activity = this.ws.builder.activity
					}

					this.ws.send(JSON.stringify(Identify));
					this.ws.client.emit("shardReady", shard, this.ws.builder.shards)
					
				}
				else if (op === OPCODE.Reconnect) {
					//console.log(payload);
				}
				else if (op === OPCODE.Invalid) {
					//console.log(payload);
				}
				else if (t) {
					try {
							const { default: handler } = require(`../Events/${t}`);
							new handler(this.ws.client, payload, shard);
					} catch (e) {
						throw Error(e);
					}
				}
			} catch (e) {
				throw Error(e);
			}
		}
}