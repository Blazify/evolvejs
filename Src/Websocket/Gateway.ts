import { EvolveSocket } from './Websocket';
import { OPCODE } from '../Constants/OpCodes';
import { Payload } from '../Interfaces/Interfaces';
import { Heartbeat, Identify } from '../Constants/Payloads';
import { Data } from 'ws';
import { EvolveLogger } from '../Client/EvolveLogger';
import { promisify } from 'util';

export class Gateway {
	public data!: Data;
	public ws!: EvolveSocket;
	public launchedShards: Set<number> = new Set()
	
	public constructor() {}

		public init(data: Data, ws: EvolveSocket) {
			this.data = data;
			this.ws = ws;

			try {
				const payload: Payload = JSON.parse(this.data.toString());
				const { op, t, d } = payload;
				if (!d) return;
		
				if (op === OPCODE.Hello) {
					// Command: Heartbeat
					setInterval(() => {
						if (this.ws.seq) Heartbeat.d = this.ws.seq;
						this.ws.send(JSON.stringify(Heartbeat));
					}, d.heartbeat_interval);
		
					for(let i = 0; i  < this.ws.builder.shards; i++) {
						promisify(setTimeout)(5000 * i).then(() => {
							this.spawn(i)
						})
					}
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
							new handler(this.ws.client, payload);
					} catch (e) {
						throw Error(e);
					}
				}
			} catch (e) {
				throw Error(e);
			}
		}

		public spawn(shard: number) {
			 if(this.launchedShards.has(shard)) {
				 	EvolveLogger.error("Internal Shard Spawning Error (Double Shard Instances)")
				 } else if(!this.launchedShards.has(shard)) {
				 	this.launchedShards.add(shard)
				}

				Identify.d.token = this.ws.client.token
				Identify.d.activity = this.ws.builder.activity
				Identify.d.shard = [shard, this.ws.builder.shards]

				this.ws.send(JSON.stringify(Identify))
		}
	}